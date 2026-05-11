---
title: "Paper: modelado de amenazas para IoT con clasificación de audio"
description: "Una nota sobre el paper de seguridad para nodos IoT con micrófono, clasificación de audio y una arquitectura pensada para proteger datos, firmware y comunicaciones."
locale: es
publishedAt: 2025-09-18
tags: ["paper", "iot-security", "threat-modeling", "pqc"]
draft: false
---

El paper parte de un caso muy concreto: dispositivos IoT con micrófono que clasifican audio. Ese tipo de sistema parece pequeño desde fuera, pero junta varias superficies delicadas a la vez: captura de datos sensibles, procesamiento local, comunicación con servicios externos, actualizaciones de firmware y exposición física del dispositivo.

El trabajo se centró en modelar amenazas y proponer una arquitectura de seguridad razonable para ese contexto. La idea no era añadir controles por añadir, sino pensar qué puede salir mal y qué medidas tienen sentido para reducir riesgo. Entran piezas como TLS mutuo, attestation remota, gestión segura de actualizaciones, protección de datos y una mirada a resiliencia post-cuántica.

Me parece un tema bonito porque obliga a bajar la seguridad a algo muy tangible. No basta con decir "ciframos la comunicación" si luego el dispositivo puede arrancar firmware manipulado, filtrar audio sensible o aceptar una actualización sin garantías. En IoT, las decisiones pequeñas de diseño suelen acabar pesando mucho.

También fue una buena excusa para conectar criptografía, ingeniería de sistemas y privacidad. La parte post-cuántica no aparece como una etiqueta de moda, sino como una consideración de diseño cuando se piensa en vida útil del dispositivo, datos que puedan necesitar protección a largo plazo y migraciones criptográficas que no deberían improvisarse tarde.
