---
title: "Paper: threat modeling for audio-classifying IoT devices"
description: "A note on the paper about securing microphone-equipped IoT nodes, audio classification, firmware, data handling, and communications."
publishedAt: 2025-09-18
tags: ["paper", "iot-security", "threat-modeling", "pqc"]
draft: false
---

The paper starts from a concrete system: IoT devices with microphones that classify audio. From the outside that can look like a small node, but it brings several sensitive surfaces together: captured data, local processing, communication with external services, firmware updates, and physical access to the device.

The work focused on threat modeling and on proposing a security architecture that made sense for that context. The goal was not to add controls for decoration, but to ask what can go wrong and which measures reduce risk in a practical way. That includes mutual TLS, remote attestation, secure update handling, data protection, and a view toward post-quantum resilience.

I find the topic interesting because it forces security into something very concrete. Saying that communication is encrypted is not enough if the device can boot modified firmware, leak sensitive audio, or accept updates without proper guarantees. In IoT, small design decisions tend to matter a lot later.

It was also a useful way to connect cryptography, systems engineering, and privacy. The post-quantum part is not there as a buzzword, but as a design consideration when thinking about device lifetime, data that may need longer-term protection, and cryptographic migrations that should not be improvised too late.
