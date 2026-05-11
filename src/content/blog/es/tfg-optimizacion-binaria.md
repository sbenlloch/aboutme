---
title: "Mi TFG: optimizar binarios sin mirar solo una métrica"
description: "Una nota sobre el TFG: exploración multiobjetivo de flags de GCC para entender compromisos entre tamaño, tiempo, memoria, CPU y robustez."
locale: es
publishedAt: 2021-07-15
tags: ["tfg", "gcc", "binarios", "optimizacion"]
draft: false
---

El TFG nació de una pregunta bastante sencilla de formular y algo más incómoda de responder: cuando compilas un programa, ¿qué significa realmente que el binario resultante sea mejor? A veces se quiere que ocupe menos. Otras veces importa que sea más rápido. En otros casos interesa que consuma menos memoria, que use menos CPU o que mantenga cierta robustez frente a transformaciones y análisis posteriores.

La parte interesante estaba precisamente en no escoger una sola métrica como si fuese la verdad absoluta. El trabajo se centró en explorar combinaciones de flags de GCC y comparar cómo cambiaba el comportamiento del binario según varios objetivos a la vez. No era una búsqueda de "la opción mágica", sino una forma de ver el espacio de decisiones con algo más de criterio.

Me gustó porque obligaba a mezclar ingeniería de sistemas, automatización y análisis experimental. Había que compilar, medir, repetir, guardar resultados y después interpretar lo que salía sin forzar conclusiones. Muchas veces una mejora en tamaño venía con coste en tiempo, o una configuración aparentemente buena dejaba de serlo al mirar otra variable.

Visto con distancia, ese trabajo me dejó una idea que sigo usando en seguridad: casi todo compromiso técnico serio es multiobjetivo. En un informe, en una mitigación o en una arquitectura segura, rara vez basta con decir "esto es mejor". Hay que explicar para quién, bajo qué restricciones y qué se está pagando a cambio.
