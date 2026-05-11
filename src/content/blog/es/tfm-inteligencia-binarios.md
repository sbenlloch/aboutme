---
title: "Mi TFM: inteligencia de archivos binarios"
description: "Una explicación cercana del TFM: caracterizar ejecutables y usar aprendizaje automático como apoyo para tareas de ciberinteligencia."
locale: es
publishedAt: 2023-07-10
tags: ["tfm", "binary-analysis", "machine-learning", "ciberinteligencia"]
draft: false
---

El TFM fue una continuación natural de mi interés por los binarios, pero llevado a un contexto más cercano a la ciberinteligencia. La idea era trabajar con ejecutables no solo como ficheros que se abren en un desensamblador, sino como objetos de los que se puede extraer información útil de forma sistemática.

El proyecto se centró en caracterizar archivos binarios mediante rasgos extraídos automáticamente y estudiar hasta qué punto esos rasgos podían alimentar modelos de aprendizaje automático. No lo planteé como una sustitución del análisis manual, porque eso sería vender humo. Lo planteé más bien como una capa de apoyo: algo que ayuda a ordenar, priorizar y encontrar señales cuando hay volumen.

Una parte importante fue decidir qué información tenía sentido extraer. En binarios hay muchos datos disponibles, pero no todos aportan lo mismo. Cabeceras, secciones, imports, tamaños, permisos y otros indicadores pueden dar pistas sobre familia, empaquetado, intención o rarezas. El valor aparece cuando esas pistas se combinan y se interpretan con cuidado.

Lo que más me interesó del trabajo fue esa frontera entre automatización y criterio humano. Un modelo puede ayudar a clasificar o agrupar, pero sigue haciendo falta entender qué se le está dando, qué sesgos tiene el dataset y cuándo una predicción no debería aceptarse sin más. Para mí, ese equilibrio encaja muy bien con cómo entiendo la seguridad aplicada.
