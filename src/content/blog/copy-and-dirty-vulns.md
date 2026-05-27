---
title: "Copy Fail and Dirty Frag: writing where you could only read"
description: "A practical note on Copy Fail, Dirty Frag, and why page-cache writes are a dangerous boundary failure in the Linux kernel."
publishedAt: 2026-05-23
tags: ["linux-kernel", "vulnerability-research", "page-cache", "lpe", "dirty-frag", "copy-fail"]
draft: false
---

> **Note:** this post is educational. It intentionally avoids exploit steps and simplifies some kernel internals.

Some bugs look like isolated mistakes. Others look like warnings.

Copy Fail and Dirty Frag belong to the second group.

At first glance, they can be summarized in a dry way: two Linux kernel issues that may lead to local privilege escalation. Another LPE, another proof of concept, another day on the internet.

That summary is technically useful, but it misses the part that makes them interesting.

What matters here is not only that the bugs can end in root. What matters is **where they break the model**: in the space where the kernel moves data efficiently, avoids copies, reuses memory pages, and assumes that every subsystem still remembers what those pages represent.

Sometimes that assumption is wrong.

<div class="callout callout-warning">
  <strong>The core idea</strong>
  <p>A user can only read a file, but manages to make a legitimate kernel path write to the cached in-memory version of that file.</p>
</div>

It does not necessarily write to disk.

It does not open the file with write permissions.

It does not break the front door.

It convinces the building to paint the wall from the inside.

That wall, in this case, is the **page cache**.

## The page cache, where too many things happen

The page cache exists to make file access fast. If a binary, a shared library, or a frequently read file is already in memory, Linux can serve future reads without going back to disk.

So far, so good.

The problem starts when those cached pages move through kernel paths that stop treating them as "file content this user can only read" and start treating them as ordinary buffers.

And once a buffer can be modified, the security boundary gets blurry.

<div class="flow-diagram" aria-label="Simplified page-cache write path">
  <div class="flow-node">unprivileged user</div>
  <div class="flow-arrow">reads</div>
  <div class="flow-node">read-only file</div>
  <div class="flow-arrow">cached as</div>
  <div class="flow-node flow-hot">page cache</div>
  <div class="flow-arrow">passed through</div>
  <div class="flow-node">crypto / network / other subsystem</div>
  <div class="flow-arrow">unexpected in-place write</div>
  <div class="flow-node flow-danger">modified cached page</div>
</div>

The important part is not write access to the file. The important part is making the kernel write into a page that represents the file.

## Copy Fail: the bug that shows the shape

Copy Fail sits at the intersection of `splice()`, `AF_ALG`, and the kernel crypto subsystem.

The rough shape is elegant in the way kernel bugs often are: `splice()` can connect file-backed page-cache pages to a path that was built for efficient data movement. Later, a crypto operation that should not mutate that file content ends up producing a controlled write into the page cache.

Four bytes do not sound like much.

But four bytes in the right place are a lever.

In security, "I can only write four bytes" often means "I can write four bytes where nobody expected me to write anything at all". That difference is huge.

<div class="mini-trace">
  <span>splice()</span>
  <span>page-cache pages</span>
  <span>AF_ALG socket</span>
  <span>crypto path</span>
  <span>in-place write</span>
  <span class="trace-alert">oops</span>
</div>

The most interesting part of Copy Fail is not just the bug. It is how the research was framed.

The starting point was a human hypothesis: what happens when `AF_ALG`, `splice()`, and pages whose real origin matters are combined? Automation then helped scale that hypothesis across a code surface that would be painful to review manually.

That is a realistic version of AI-assisted vulnerability research.

Not:

> "The AI found root."

More like:

> "Someone had a concrete intuition, turned it into a searchable hypothesis, and used tooling to look for variants."

Less cinematic. Much more useful.

## Dirty Frag: when the question changes

Dirty Frag is the natural follow-up question.

After seeing Copy Fail, the important question is not only:

> "How do we patch this one bug?"

It is:

> "Where else does the kernel do something similar?"

That is where the real vulnerability research starts.

Dirty Frag brings the same class of concern into networking-related paths, especially `xfrm/ESP` and `RxRPC`.

It is not the same bug. It does not live in the same subsystem. It is not exploited in exactly the same way.

But it rhymes.

And when two kernel bugs rhyme, you should listen.

<div class="bug-grid">
  <section>
    <h3>Copy Fail</h3>
    <p><code>splice()</code> + <code>AF_ALG</code> + crypto path</p>
    <strong>Result:</strong>
    <span>page-cache write primitive</span>
  </section>
  <section>
    <h3>Dirty Frag</h3>
    <p><code>xfrm/ESP</code> and <code>RxRPC</code> paths</p>
    <strong>Result:</strong>
    <span>similar write-where-read-only-breaks pattern</span>
  </section>
</div>

The deep connection is not a single function name. It is the pattern:

<ol class="pattern-list">
  <li>A user can read something.</li>
  <li>The kernel represents that content in the page cache.</li>
  <li>An efficient path avoids copying data.</li>
  <li>Another subsystem receives those pages as normal buffers.</li>
  <li>That subsystem writes in-place.</li>
  <li>The boundary between "read" and "modify" breaks.</li>
</ol>

That pattern matters more than any individual CVE, because once you understand the pattern, you can start looking for variants.

## Not just memory. Not just disk.

This is the part I find especially interesting.

When we talk about memory corruption, we usually imagine the heap, the stack, pointers, freed objects, or internal kernel structures.

When we talk about file permissions, we think about disk: owners, mode bits, setuid binaries, hashes, integrity checks.

These bugs live between those two worlds.

<div class="bridge-card">
  <span>not just a file</span>
  <strong>page cache</strong>
  <span>not just anonymous memory</span>
</div>

The page cache is a bridge. Attacking the bridge can be more interesting than attacking either side.

The file on disk may remain intact. Tools that only verify disk hashes may see nothing suspicious. Permissions may look normal. But the cached view the system actually uses may have been modified.

That detail is why these issues inevitably remind people of Dirty Pipe. They are not the same bug, but they force the same uncomfortable lesson: the page cache is not a passive implementation detail. It is an attack surface.

## Composition failures

There is a simple way to write bugs in C: make a mistake by yourself.

Then there is the more interesting way: two subsystems are reasonable separately and dangerous together.

Copy Fail and Dirty Frag smell like that.

One mechanism says:

> "I will avoid a copy, because copying is expensive."

Another says:

> "I will process this data in-place, because it is efficient."

Another had already decided:

> "This user can only read this file."

Each decision can make sense in isolation. The problem appears when they meet.

<div class="equation-box">
  <span>performance</span>
  <span>+</span>
  <span>reusable abstractions</span>
  <span>+</span>
  <span>permissions decided earlier</span>
  <span>+</span>
  <span>ambiguous buffer origin</span>
  <span>=</span>
  <strong>boundary failure</strong>
</div>

This kind of failure is attractive to a researcher because it is rarely in the obvious place. It is not necessarily a suspicious `memcpy()` screaming for attention.

It is an emergent property of the system.

And emergent properties are where the kernel gets interesting.

## Publishing is also part of the bug

The publication of these vulnerabilities tells a second story.

Copy Fail had a relatively clean narrative: research, report, patch, and write-up. The AI-assisted search angle made it especially visible, but the security lesson is older and deeper than the tooling.

Dirty Frag was messier. Public information describes a disclosure process that became more urgent than expected, which changed the dynamics for maintainers, distributions, vendors, and defenders.

The life of a vulnerability does not end when someone gets root on a test machine.

Then comes the social part of the bug:

<div class="mini-trace mini-trace-muted">
  <span>researcher</span>
  <span>maintainers</span>
  <span>distros</span>
  <span>vendors</span>
  <span>detections</span>
  <span>admins trying to sleep</span>
</div>

When a kernel bug is practical, affects common configurations, and has public technical details, disclosure stops being a formality. It becomes a race between patches, mitigations, proof-of-concept code, detections, and people copying commands from GitHub with too much confidence.

## An uncomfortable note on impact

The tempting way to think about these bugs is as a quick path to "edit something sensitive and make it work".

A privileged binary, a library used by root, an authentication decision, or any other trust point in the system can look like a natural target when you have a page-cache write primitive.

But the trick is not necessarily to change disk forever.

Sometimes the interesting part is the opposite: temporarily altering the cached view the system uses at that moment while the real file still appears untouched. The attacker does not need the change to be elegant or durable if it only needs to cross a boundary once.

From a defensive point of view, the question should not only be:

> "Has this file changed on disk?"

It should also be:

> "Which process made the kernel treat read-only content as a writable buffer?"

That difference matters.

The disk may look clean. Permissions may look normal. Hashes may match. And still, observed behavior may make no sense.

That is the uncomfortable part.

## Defensive takeaways

<div class="takeaway-grid">
  <section>
    <h3>For kernel reviewers</h3>
    <p>Track whether a page is merely bytes to process or file-backed content with permission semantics attached.</p>
  </section>
  <section>
    <h3>For defenders</h3>
    <p>Do not rely only on disk integrity when the suspicious behavior may come from a transient cached view.</p>
  </section>
  <section>
    <h3>For researchers</h3>
    <p>Look for efficient paths that pass file-backed pages into subsystems capable of in-place mutation.</p>
  </section>
</div>

## Conclusion

Copy Fail and Dirty Frag are useful reminders that the most interesting bugs do not always live on a single line. Sometimes they live between boundaries.

Between crypto and filesystems.

Between networking and memory.

Between performance and security.

Between "this only avoids a copy" and "we just wrote where we could only read".

The page cache is not just a transparent optimization. It is a shared, hot, sensitive area of the kernel.

Every time a cached page enters a path that can write in-place, the uncomfortable question is worth asking:

> Are we modifying a buffer, or are we modifying something that represents a file nobody should be able to touch?

Copy Fail made the question visible.

Dirty Frag showed that it was worth asking again.

## Further reading

- [Copy Fail write-up](https://copy.fail/)
- [Dirty Frag advisory](https://dirtyfrag.com/)
