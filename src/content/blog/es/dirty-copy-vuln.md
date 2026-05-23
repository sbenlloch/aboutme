---
title: "Copy Fail y Dirty Frag: escribir donde solo podías leer"
description: "Una nota sobre Copy Fail, Dirty Frag y cómo dos vulnerabilidades de Linux muestran el peligro de tratar la page cache como si fuera un buffer cualquiera."
publishedAt: 2026-05-23
tags: ["linux-kernel", "vulnerability-research", "page-cache", "lpe", "dirty-frag", "copy-fail"]
draft: false
---

> **Nota:** este post es divulgativo. La explicación simplifica algunos detalles internos del kernel

Hay bugs que parecen bugs, y bugs que parecen una advertencia.

Copy Fail y Dirty Frag pertenecen más a la segunda categoría.

A primera vista, podríamos resumirlos de forma bastante aburrida: dos vulnerabilidades del kernel de Linux que permiten escalada local de privilegios. Otra LPE, otro PoC, otro día en internet.

Pero esa descripción se queda corta.

Lo interesante de Copy Fail y Dirty Frag no es solo que acaben en root. Lo interesante es **dónde rompen el modelo mental**: en esa zona incómoda donde el kernel mueve datos de forma eficiente, evita copias innecesarias, reutiliza páginas de memoria y asume que todo el mundo está respetando las mismas reglas.

Spoiler: no siempre las respeta.

## La idea corta

La conexión entre ambas vulnerabilidades se puede explicar así:

> El usuario solo puede leer un fichero, pero consigue que una ruta legítima del kernel escriba sobre la versión cacheada de ese fichero en memoria.

No escribe necesariamente en disco.

No abre el fichero con permisos de escritura.

No rompe la puerta.

Convence al edificio de que le deje pintar la pared por dentro.

La pared, en este caso, es la **page cache**.

## La page cache, ese sitio donde pasan demasiadas cosas

La page cache está ahí para que leer ficheros sea rápido. Si un binario, una librería o un fichero se lee con frecuencia, Linux puede mantener páginas de ese contenido en memoria para no ir al disco cada vez.

Hasta aquí, todo bien.

El problema aparece cuando esas páginas cacheadas empiezan a circular por subsistemas del kernel que no necesariamente las tratan como “contenido de un fichero que este usuario solo puede leer”.

A veces las tratan como buffers.

Y si un buffer se puede modificar, tenemos fiesta.

    usuario sin privilegios
            |
            | lee un fichero
            v
    +-------------------------+
    | fichero solo lectura    |
    +-------------------------+
            |
            | páginas cacheadas
            v
    +-------------------------+
    |       PAGE CACHE        |
    +-------------------------+
            |
            | ruta legítima del kernel
            v
    +-------------------------+
    | crypto / network / ...  |
    | procesamiento in-place  |
    +-------------------------+
            |
            | escritura inesperada
            v
    +-------------------------+
    | page cache modificada   |
    | disco aparentemente OK  |
    +-------------------------+
            |
            v
         root :)

Esta figura simplifica mucho, pero captura la parte importante: el ataque no consiste en tener permisos de escritura sobre el fichero. Consiste en conseguir que el kernel escriba en una página que representa contenido de ese fichero.

## Copy Fail: el bug que enseña la forma

Copy Fail vive en una interacción entre `splice()`, `AF_ALG` y el subsistema criptográfico del kernel.

La idea es bastante elegante: mediante `splice()`, un atacante puede hacer que páginas de la page cache de un fichero legible acaben conectadas a estructuras usadas por la ruta criptográfica. Después, una operación que no debería modificar ese contenido termina provocando una escritura controlada en la page cache.

Cuatro bytes no suenan a mucho.

Pero cuatro bytes en el sitio correcto son una palanca.

En seguridad, “solo puedo escribir cuatro bytes” muchas veces significa “puedo escribir cuatro bytes donde nadie esperaba que pudiera escribir absolutamente nada”. Y esa diferencia es enorme.

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
    "ups"

Lo más interesante de Copy Fail no es solo el bug en sí, sino la forma de encontrarlo. La investigación partió de una hipótesis humana: mirar qué ocurre cuando se combinan `AF_ALG`, `splice()` y páginas cuya procedencia real importa. Después, se usó automatización para escalar la búsqueda en una superficie de código demasiado grande para revisarla cómodamente a mano.

Eso es una imagen bastante realista de la IA aplicada a vulnerability research.

No es:

> “La IA encontró root.”

Es más bien:

> “Alguien tuvo una buena intuición, formuló una hipótesis concreta y usó herramientas para buscar variantes.”

Menos espectacular. Mucho más interesante.

## Dirty Frag: cuando la pregunta cambia

Dirty Frag aparece como la continuación natural de esa idea.

Después de ver Copy Fail, la pregunta buena no es solo:

> “¿Cómo parcheamos este bug?”

La pregunta interesante es:

> “¿Dónde más está el kernel haciendo algo parecido?”

Ahí empieza el trabajo de verdad.

Dirty Frag lleva una clase de problema similar a rutas relacionadas con networking, especialmente `xfrm/ESP` y `RxRPC`.

No es el mismo bug. No vive en el mismo sitio. No se explota exactamente igual.

Pero rima.

Y en vulnerability research, cuando dos bugs riman, hay que escuchar.

    Copy Fail
      └── crypto / AF_ALG / splice
            └── page-cache write

    Dirty Frag
      ├── xfrm / ESP
      │     └── page-cache write
      |
      └── RxRPC
            └── page-cache write

La conexión profunda no está en un nombre de función concreto. Está en el patrón:

    1. Un usuario puede leer algo.
    2. El kernel representa ese algo en page cache.
    3. Una ruta eficiente evita copiar datos.
    4. Otro subsistema recibe esas páginas como si fueran buffers normales.
    5. Ese subsistema escribe in-place.
    6. La frontera entre "leer" y "modificar" se rompe.

Ese patrón es más importante que el CVE individual.

Porque cuando entiendes el patrón, puedes empezar a buscar variantes.

## No es solo memoria. No es solo disco.

Esta parte me parece especialmente bonita, en el sentido oscuro de la palabra.

Cuando hablamos de corrupción de memoria, solemos imaginar heap, stack, punteros, objetos liberados o estructuras internas del kernel.

Cuando hablamos de permisos de ficheros, pensamos en disco: owner, mode bits, setuid, hashes, integridad.

Pero estos bugs viven en medio.

        no es solo fichero
              |
              v
        +-------------+
        | page cache  |
        +-------------+
              ^
              |
        no es solo memoria

La page cache es puente.

Y atacar un puente suele ser más interesante que atacar una orilla.

El fichero en disco puede seguir intacto. Las herramientas que miran checksums del disco pueden no ver nada raro. Pero la vista cacheada que usa el sistema puede estar modificada.

Ese detalle es lo que hace que estas vulnerabilidades recuerden inevitablemente a Dirty Pipe. No porque sean idénticas, sino porque obligan a mirar la page cache como una superficie de ataque de primer orden.

## Fallos de composición

Hay una forma sencilla de escribir bugs en C: equivocarte tú solo.

Y luego está la forma divertida: que dos subsistemas tengan razón por separado y se equivoquen juntos.

Copy Fail y Dirty Frag huelen a eso.

Un mecanismo dice:

> “Voy a evitar una copia, porque copiar es caro.”

Otro dice:

> “Voy a procesar estos datos in-place, porque es eficiente.”

Otro ya había decidido:

> “Este usuario solo puede leer este fichero.”

Cada decisión aislada puede tener sentido.

El problema aparece cuando se juntan.

    rendimiento
        +
    abstracciones reutilizables
        +
    permisos decididos antes
        +
    buffers con procedencia ambigua
        =
    bug muy gracioso
    excepto si eres el equipo de kernel

Este tipo de fallo es especialmente atractivo para un investigador porque no suele estar en el sitio obvio. No es necesariamente una función con un `memcpy()` sospechoso gritando “mírame”.

Es una propiedad emergente del sistema.

Y las propiedades emergentes son donde el kernel se pone interesante.

## Publicar también es parte del bug

La publicación de estas vulnerabilidades también cuenta una historia.

Copy Fail tuvo una narrativa bastante limpia: investigación, reporte, parche y write-up. Además, venía con el componente de búsqueda asistida por IA, lo que la hizo especialmente llamativa.

Dirty Frag fue más caótica. Según la información pública, el problema se reportó bajo embargo, pero la publicación acabó adelantándose por factores externos. Eso cambió la dinámica: defensores y vendors tuvieron que reaccionar mientras los detalles técnicos ya circulaban.

La vida de una vulnerabilidad no acaba cuando alguien consigue root en su máquina.

Después viene la parte social del bug:

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
    admins intentando dormir

Cuando un bug es fácil de explotar, afecta a configuraciones comunes y vive en el kernel, el disclosure deja de ser un trámite. Se convierte en una carrera entre parches, mitigaciones, PoCs, detecciones y gente copiando comandos de GitHub con demasiada alegría.

## Una nota incómoda sobre impacto

La parte tentadora de este tipo de bugs es pensar en ellos como una forma rápida de “editar algo sensible y funcionar”.

Un binario privilegiado, una librería usada por root, una decisión de autenticación o cualquier otro punto de confianza del sistema pueden parecer objetivos naturales cuando tienes una primitiva de escritura sobre page cache.

Pero la gracia no está necesariamente en cambiar el disco para siempre.

A veces lo interesante es justo lo contrario: alterar temporalmente la vista cacheada que el sistema usa en ese momento, mientras el fichero real sigue pareciendo intacto. El atacante no necesita que el cambio sea elegante ni duradero si solo necesita cruzar una frontera una vez.

Por eso, desde defensa, la pregunta no debería ser solo:

> “¿Ha cambiado este fichero en disco?”

También debería ser:

> “¿Qué proceso ha conseguido que el kernel trate contenido de solo lectura como un buffer modificable?”

Esa diferencia importa.

El disco puede parecer limpio. Los permisos pueden parecer normales. Los hashes pueden encajar. Y aun así el comportamiento observado puede no tener sentido.

Ahí está la parte incómoda.

## Conclusión

Copy Fail y Dirty Frag son buenos recordatorios de que los bugs más interesantes no siempre viven en una línea concreta. A veces viven en las costuras.

Entre crypto y filesystem.

Entre networking y memoria.

Entre rendimiento y seguridad.

Entre “esto solo evita una copia” y “acabamos de escribir donde solo podíamos leer”.

La page cache no es solo una optimización transparente. Es una zona compartida, caliente y muy sensible del kernel.

Y cada vez que una página cacheada entra en una ruta que puede escribir in-place, merece la pena hacerse la pregunta incómoda:

> ¿Estamos modificando un buffer, o estamos modificando algo que representa un fichero que nadie debería poder tocar?

Copy Fail hizo visible la pregunta.

Dirty Frag demostró que merecía la pena seguir preguntando.