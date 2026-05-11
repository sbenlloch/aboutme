---
title: "Master's thesis: binary file intelligence"
description: "A practical note on my master's thesis: extracting features from executables and using machine learning as support for cyberintelligence workflows."
publishedAt: 2023-07-10
tags: ["master-thesis", "binary-analysis", "machine-learning", "cyberintelligence"]
draft: false
---

The master's thesis was a natural continuation of my interest in binaries, but placed closer to a cyberintelligence workflow. The idea was to treat executables not only as files to open in a disassembler, but as objects that can be described, compared, and prioritized through repeatable extraction.

The project focused on characterizing binary files through automatically extracted features and studying how those features could feed machine-learning models. I did not approach it as a replacement for manual analysis, because that would be the wrong promise. I saw it as a support layer: something that helps sort, prioritize, and find signals when there is too much volume to inspect comfortably by hand.

A relevant part of the work was choosing what information was worth extracting. Binaries contain plenty of data, but not all of it carries the same value. Headers, sections, imports, sizes, permissions, and other indicators can say something about family, packing, intent, or odd behavior. The value comes from combining those clues and interpreting them carefully.

What interested me most was the boundary between automation and human judgement. A model can help classify or cluster, but someone still needs to understand what is being fed into it, where the dataset may be biased, and when a prediction should not be accepted at face value. That balance is close to how I think about applied security.
