---
title: "Bachelor's thesis: binary optimization beyond a single metric"
description: "A short note on my bachelor's thesis: multi-objective GCC flag exploration across size, runtime, memory, CPU use, and binary robustness."
publishedAt: 2021-07-15
tags: ["thesis", "gcc", "binaries", "optimization"]
draft: false
---

The thesis started from a question that is easy to ask and less easy to answer: when a program is compiled, what does it actually mean for the resulting binary to be better? Sometimes smaller is better. Sometimes faster matters more. In other cases memory use, CPU use, or some notion of robustness becomes the relevant part.

The work was about exploring combinations of GCC flags and comparing how the resulting binaries behaved across several objectives at the same time. I was not looking for a universal best configuration. The useful part was mapping the trade-offs and making those decisions visible.

I liked the project because it mixed systems engineering, automation, and experimental analysis. It required compiling, measuring, repeating, storing results, and then reading the output without forcing it to say more than it could. A configuration that improved size could hurt runtime, and an option that looked good under one metric could be less attractive once another one was added.

Looking back, that lesson still maps well to security work. Most technical decisions that matter are multi-objective. In a report, a mitigation, or a secure architecture, it is rarely enough to say that something is better. The useful answer explains for whom, under which constraints, and what is being traded away.
