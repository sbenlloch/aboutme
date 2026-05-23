---
title: "Copy Fail and Dirty Frag: writing where you could only read"
description: "A note on Copy Fail, Dirty Frag, and how two Linux vulnerabilities show the danger of treating the page cache as if it were just another buffer."
publishedAt: 2026-05-23
tags: ["linux-kernel", "vulnerability-research", "page-cache", "lpe", "dirty-frag", "copy-fail"]
draft: false
---

> **Note:** this post is educational. The explanation simplifies some internal kernel details.

Some bugs look like bugs, and some bugs look like warnings.

Copy Fail and Dirty Frag belong more to the second category.

At first glance, we could summarize them in a fairly boring way: two Linux kernel vulnerabilities that allow local privilege escalation. Another LPE, another PoC, another day on the internet.

But that description falls short.

What makes Copy Fail and Dirty Frag interesting is not only that they can end in root. What is interesting is **where they break the mental model**: in that uncomfortable area where the kernel moves data efficiently, avoids unnecessary copies, reuses memory pages, and assumes that everyone is playing by the same rules.

Spoiler: not everyone is.

## The short idea

The connection between both vulnerabilities can be explained like this:

> The user can only read a file, but manages to make a legitimate kernel path write to the cached version of that file in memory.

It does not necessarily write to disk.

It does not open the file with write permissions.

It does not break the door.

It convinces the building to let it paint the wall from the inside.

That wall, in this case, is the **page cache**.

## The page cache, where too many things happen

The page cache exists to make file reads fast. If a binary, a library, or a file is read often, Linux can keep pages of that content in memory instead of going back to disk every time.

So far, so good.

The problem appears when those cached pages start moving through kernel subsystems that do not necessarily treat them as “file content this user is only allowed to read”.

Sometimes they treat them as buffers.

And if a buffer can be modified, the party starts.

    unprivileged user
            |
            | reads a file
            v
    +-------------------------+
    | read-only file          |
    +-------------------------+
            |
            | cached pages
            v
    +-------------------------+
    |       PAGE CACHE        |
    +-------------------------+
            |
            | legitimate kernel path
            v
    +-------------------------+
    | crypto / network / ...  |
    | in-place processing     |
    +-------------------------+
            |
            | unexpected write
            v
    +-------------------------+
    | modified page cache     |
    | disk apparently OK      |
    +-------------------------+
            |
            v
         root :)

This figure is very simplified, but it captures the important part: the attack is not about having write permissions on the file. It is about making the kernel write to a page that represents the contents of that file.

## Copy Fail: the bug that shows the shape

Copy Fail lives in an interaction between `splice()`, `AF_ALG`, and the kernel crypto subsystem.

The idea is quite elegant: using `splice()`, an attacker can make page-cache pages from a readable file end up connected to structures used by the crypto path. Later, an operation that should not modify that content ends up causing a controlled write into the page cache.

Four bytes do not sound like much.

But four bytes in the right place are a lever.

In security, “I can only write four bytes” often means “I can write four bytes where nobody expected me to write absolutely anything”. And that difference is huge.

    splice()
       |
       v
    page cache pages
       |
       v
    AF_ALG socket
       |
       v
    crypto path
       |
       v
    in-place write
       |
       v
    "oops"

The most interesting part of Copy Fail is not only the bug itself, but how it was found. The research started from a human hypothesis: looking at what happens when `AF_ALG`, `splice()`, and pages whose real origin matters are combined. Then, automation was used to scale the search across a code surface that was too large to review comfortably by hand.

That is a fairly realistic picture of AI applied to vulnerability research.

It is not:

> “The AI found root.”

It is more like:

> “Someone had a good intuition, formulated a concrete hypothesis, and used tools to search for variants.”

Less spectacular. Much more interesting.

## Dirty Frag: when the question changes

Dirty Frag appears as the natural continuation of that idea.

After seeing Copy Fail, the good question is not only:

> “How do we patch this bug?”

The interesting question is:

> “Where else is the kernel doing something similar?”

That is where the real work starts.

Dirty Frag brings a similar class of problem into networking-related paths, especially `xfrm/ESP` and `RxRPC`.

It is not the same bug. It does not live in the same place. It is not exploited in exactly the same way.

But it rhymes.

And in vulnerability research, when two bugs rhyme, you should listen.

    Copy Fail
      └── crypto / AF_ALG / splice
            └── page-cache write

    Dirty Frag
      ├── xfrm / ESP
      │     └── page-cache write
      |
      └── RxRPC
            └── page-cache write

The deep connection is not in a specific function name. It is in the pattern:

    1. A user can read something.
    2. The kernel represents that something in the page cache.
    3. An efficient path avoids copying data.
    4. Another subsystem receives those pages as if they were normal buffers.
    5. That subsystem writes in-place.
    6. The boundary between "read" and "modify" breaks.

That pattern is more important than the individual CVE.

Because once you understand the pattern, you can start looking for variants.

## Not just memory. Not just disk.

This is the part I find especially beautiful, in the dark sense of the word.

When we talk about memory corruption, we usually imagine the heap, the stack, pointers, freed objects, or internal kernel structures.

When we talk about file permissions, we think about disk: owner, mode bits, setuid, hashes, integrity.

But these bugs live in between.

        not just a file
              |
              v
        +-------------+
        | page cache  |
        +-------------+
              ^
              |
        not just memory

The page cache is a bridge.

And attacking a bridge is often more interesting than attacking either shore.

The file on disk can remain intact. Tools that look at disk checksums may not see anything suspicious. But the cached view that the system uses may have been modified.

That detail is what inevitably makes these vulnerabilities remind us of Dirty Pipe. Not because they are identical, but because they force us to look at the page cache as a first-class attack surface.

## Composition failures

There is a simple way to write bugs in C: make a mistake by yourself.

And then there is the fun way: two subsystems are right separately and wrong together.

Copy Fail and Dirty Frag smell like that.

One mechanism says:

> “I will avoid a copy, because copying is expensive.”

Another says:

> “I will process this data in-place, because it is efficient.”

Another had already decided:

> “This user can only read this file.”

Each decision can make sense in isolation.

The problem appears when they meet.

    performance
        +
    reusable abstractions
        +
    permissions decided earlier
        +
    buffers with ambiguous origin
        =
    very funny bug
    unless you are the kernel team

This kind of failure is especially attractive to a researcher because it is not usually in the obvious place. It is not necessarily a function with a suspicious `memcpy()` screaming “look at me”.

It is an emergent property of the system.

And emergent properties are where the kernel gets interesting.

## Publishing is also part of the bug

The publication of these vulnerabilities also tells a story.

Copy Fail had a fairly clean narrative: research, report, patch, and write-up. It also came with the AI-assisted search component, which made it especially eye-catching.

Dirty Frag was messier. According to public information, the issue was reported under embargo, but publication ended up happening earlier than expected due to external factors. That changed the dynamics: defenders and vendors had to react while technical details were already circulating.

The life of a vulnerability does not end when someone gets root on their machine.

Then comes the social part of the bug:

    researcher
       |
       v
    maintainers
       |
       v
    distros
       |
       v
    vendors
       |
       v
    detections
       |
       v
    admins trying to sleep

When a bug is easy to exploit, affects common configurations, and lives in the kernel, disclosure stops being a formality. It becomes a race between patches, mitigations, PoCs, detections, and people copying commands from GitHub with way too much enthusiasm.

## An uncomfortable note on impact

The tempting part of these bugs is to think of them as a quick way to “edit something sensitive and make it work”.

A privileged binary, a library used by root, an authentication decision, or any other trust point in the system can look like a natural target when you have a page-cache write primitive.

But the trick is not necessarily to change the disk forever.

Sometimes the interesting part is exactly the opposite: temporarily altering the cached view that the system uses at that moment, while the real file still appears untouched. The attacker does not need the change to be elegant or durable if they only need to cross a boundary once.

That is why, from a defensive point of view, the question should not only be:

> “Has this file changed on disk?”

It should also be:

> “Which process managed to make the kernel treat read-only content as a modifiable buffer?”

That difference matters.

The disk may look clean. Permissions may look normal. Hashes may match. And still, the observed behavior may make no sense.

That is the uncomfortable part.

## Conclusion

Copy Fail and Dirty Frag are good reminders that the most interesting bugs do not always live on a single line. Sometimes they live in the seams.

Between crypto and filesystem.

Between networking and memory.

Between performance and security.

Between “this only avoids a copy” and “we just wrote where we could only read”.

The page cache is not just a transparent optimization. It is a shared, hot, and very sensitive area of the kernel.

And every time a cached page enters a path that can write in-place, it is worth asking the uncomfortable question:

> Are we modifying a buffer, or are we modifying something that represents a file nobody should be able to touch?

Copy Fail made the question visible.

Dirty Frag showed that it was worth asking again.