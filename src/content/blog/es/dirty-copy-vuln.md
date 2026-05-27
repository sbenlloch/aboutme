---
title: "Copy Fail y Dirty Frag: escribir donde solo podías leer"
description: "Una nota práctica sobre Copy Fail, Dirty Frag y por qué las escrituras en page cache rompen una frontera peligrosa dentro del kernel de Linux."
locale: es
publishedAt: 2026-05-23
tags: ["linux-kernel", "vulnerability-research", "page-cache", "lpe", "dirty-frag", "copy-fail"]
draft: false
---

> **Nota:** este post es divulgativo. Evita pasos de explotación y simplifica algunos detalles internos del kernel.

Hay bugs que parecen errores aislados. Otros parecen una advertencia.

Copy Fail y Dirty Frag pertenecen al segundo grupo.

A primera vista, se pueden resumir de forma bastante seca: dos problemas del kernel de Linux que pueden acabar en escalada local de privilegios. Otra LPE, otro proof of concept, otro día en internet.

Ese resumen sirve, pero se queda corto.

Lo importante no es solo que estos bugs puedan terminar en root. Lo interesante es **dónde rompen el modelo mental**: en la zona donde el kernel mueve datos de forma eficiente, evita copias, reutiliza páginas de memoria y asume que cada subsistema sigue recordando qué representan esas páginas.

A veces esa suposición falla.

<div class="callout callout-warning">
  <strong>La idea central</strong>
  <p>El usuario solo puede leer un fichero, pero consigue que una ruta legítima del kernel escriba sobre la versión cacheada de ese fichero en memoria.</p>
</div>

No escribe necesariamente en disco.

No abre el fichero con permisos de escritura.

No rompe la puerta principal.

Convence al edificio de que le deje pintar la pared por dentro.

La pared, en este caso, es la **page cache**.

## La page cache, ese sitio donde pasan demasiadas cosas

La page cache existe para que acceder a ficheros sea rápido. Si un binario, una librería compartida o un fichero leído con frecuencia ya está en memoria, Linux puede servir futuras lecturas sin volver al disco.

Hasta aquí, todo bien.

El problema empieza cuando esas páginas cacheadas circulan por rutas del kernel que dejan de tratarlas como "contenido de un fichero que este usuario solo puede leer" y empiezan a tratarlas como buffers normales.

Y cuando un buffer se puede modificar, la frontera de seguridad se vuelve borrosa.

<div class="flow-diagram" aria-label="Ruta simplificada de escritura en page cache">
  <div class="flow-node">usuario sin privilegios</div>
  <div class="flow-arrow">lee</div>
  <div class="flow-node">fichero solo lectura</div>
  <div class="flow-arrow">se cachea como</div>
  <div class="flow-node flow-hot">page cache</div>
  <div class="flow-arrow">pasa por</div>
  <div class="flow-node">crypto / red / otro subsistema</div>
  <div class="flow-arrow">escritura in-place inesperada</div>
  <div class="flow-node flow-danger">página cacheada modificada</div>
</div>

La parte importante no es tener permisos de escritura sobre el fichero. La parte importante es conseguir que el kernel escriba en una página que representa ese fichero.

## Copy Fail: el bug que enseña la forma

Copy Fail está en la intersección entre `splice()`, `AF_ALG` y el subsistema criptográfico del kernel.

La forma general es elegante, como suelen serlo algunos bugs de kernel: `splice()` puede conectar páginas de la page cache respaldadas por un fichero con una ruta pensada para mover datos de forma eficiente. Después, una operación criptográfica que no debería mutar ese contenido termina provocando una escritura controlada en la page cache.

Cuatro bytes no suenan a mucho.

Pero cuatro bytes en el sitio correcto son una palanca.

En seguridad, "solo puedo escribir cuatro bytes" muchas veces significa "puedo escribir cuatro bytes donde nadie esperaba que pudiera escribir absolutamente nada". Esa diferencia es enorme.

<div class="mini-trace">
  <span>splice()</span>
  <span>páginas de page cache</span>
  <span>socket AF_ALG</span>
  <span>ruta crypto</span>
  <span>escritura in-place</span>
  <span class="trace-alert">ups</span>
</div>

Lo más interesante de Copy Fail no es solo el bug. Es cómo se planteó la investigación.

El punto de partida fue una hipótesis humana: ¿qué ocurre cuando se combinan `AF_ALG`, `splice()` y páginas cuya procedencia real importa? Después, la automatización ayudó a escalar esa hipótesis sobre una superficie de código demasiado grande para revisarla cómodamente a mano.

Esa es una imagen realista de la IA aplicada a vulnerability research.

No es:

> "La IA encontró root."

Es más bien:

> "Alguien tuvo una intuición concreta, la convirtió en una hipótesis buscable y usó herramientas para encontrar variantes."

Menos cinematográfico. Mucho más útil.

## Dirty Frag: cuando cambia la pregunta

Dirty Frag es la continuación natural de esa pregunta.

Después de ver Copy Fail, lo importante no es solo:

> "¿Cómo parcheamos este bug?"

Es:

> "¿Dónde más está haciendo el kernel algo parecido?"

Ahí empieza el trabajo real de investigación.

Dirty Frag lleva una clase de problema similar a rutas relacionadas con networking, especialmente `xfrm/ESP` y `RxRPC`.

No es el mismo bug. No vive en el mismo subsistema. No se explota exactamente igual.

Pero rima.

Y cuando dos bugs de kernel riman, conviene escuchar.

<div class="bug-grid">
  <section>
    <h3>Copy Fail</h3>
    <p><code>splice()</code> + <code>AF_ALG</code> + ruta crypto</p>
    <strong>Resultado:</strong>
    <span>primitiva de escritura en page cache</span>
  </section>
  <section>
    <h3>Dirty Frag</h3>
    <p>rutas <code>xfrm/ESP</code> y <code>RxRPC</code></p>
    <strong>Resultado:</strong>
    <span>patrón similar de escritura donde solo debía haber lectura</span>
  </section>
</div>

La conexión profunda no está en un nombre de función concreto. Está en el patrón:

<ol class="pattern-list">
  <li>Un usuario puede leer algo.</li>
  <li>El kernel representa ese contenido en la page cache.</li>
  <li>Una ruta eficiente evita copiar datos.</li>
  <li>Otro subsistema recibe esas páginas como si fueran buffers normales.</li>
  <li>Ese subsistema escribe in-place.</li>
  <li>La frontera entre "leer" y "modificar" se rompe.</li>
</ol>

Ese patrón importa más que cualquier CVE individual, porque cuando lo entiendes puedes empezar a buscar variantes.

## No es solo memoria. No es solo disco.

Esta es la parte que me parece especialmente interesante.

Cuando hablamos de corrupción de memoria, solemos imaginar heap, stack, punteros, objetos liberados o estructuras internas del kernel.

Cuando hablamos de permisos de ficheros, pensamos en disco: propietarios, mode bits, binarios setuid, hashes, comprobaciones de integridad.

Estos bugs viven entre esos dos mundos.

<div class="bridge-card">
  <span>no es solo un fichero</span>
  <strong>page cache</strong>
  <span>no es solo memoria anónima</span>
</div>

La page cache es un puente. Atacar el puente puede ser más interesante que atacar cualquiera de las dos orillas.

El fichero en disco puede seguir intacto. Las herramientas que solo verifican hashes en disco pueden no ver nada extraño. Los permisos pueden parecer normales. Pero la vista cacheada que el sistema usa realmente puede haber sido modificada.

Ese detalle es lo que hace que estos problemas recuerden inevitablemente a Dirty Pipe. No son el mismo bug, pero obligan a aceptar la misma lección incómoda: la page cache no es un detalle pasivo de implementación. Es una superficie de ataque.

## Fallos de composición

Hay una forma sencilla de escribir bugs en C: equivocarte tú solo.

Luego está la forma más interesante: que dos subsistemas sean razonables por separado y peligrosos juntos.

Copy Fail y Dirty Frag huelen a eso.

Un mecanismo dice:

> "Voy a evitar una copia, porque copiar es caro."

Otro dice:

> "Voy a procesar estos datos in-place, porque es eficiente."

Otro ya había decidido:

> "Este usuario solo puede leer este fichero."

Cada decisión aislada puede tener sentido. El problema aparece cuando se juntan.

<div class="equation-box">
  <span>rendimiento</span>
  <span>+</span>
  <span>abstracciones reutilizables</span>
  <span>+</span>
  <span>permisos decididos antes</span>
  <span>+</span>
  <span>origen ambiguo del buffer</span>
  <span>=</span>
  <strong>fallo de frontera</strong>
</div>

Este tipo de fallo es atractivo para un investigador porque rara vez está en el sitio obvio. No es necesariamente un `memcpy()` sospechoso pidiendo atención.

Es una propiedad emergente del sistema.

Y las propiedades emergentes son donde el kernel se pone interesante.

## Publicar también es parte del bug

La publicación de estas vulnerabilidades cuenta una segunda historia.

Copy Fail tuvo una narrativa relativamente limpia: investigación, reporte, parche y write-up. El ángulo de búsqueda asistida por IA lo hizo especialmente visible, pero la lección de seguridad es más antigua y profunda que la herramienta.

Dirty Frag fue más caótica. La información pública describe un proceso de disclosure que se volvió más urgente de lo esperado, y eso cambió la dinámica para maintainers, distribuciones, vendors y equipos de defensa.

La vida de una vulnerabilidad no acaba cuando alguien consigue root en una máquina de pruebas.

Después viene la parte social del bug:

<div class="mini-trace mini-trace-muted">
  <span>researcher</span>
  <span>maintainers</span>
  <span>distros</span>
  <span>vendors</span>
  <span>detecciones</span>
  <span>admins intentando dormir</span>
</div>

Cuando un bug de kernel es práctico, afecta a configuraciones comunes y tiene detalles técnicos públicos, el disclosure deja de ser un trámite. Se convierte en una carrera entre parches, mitigaciones, proof-of-concept, detecciones y gente copiando comandos de GitHub con demasiada confianza.

## Una nota incómoda sobre impacto

La forma tentadora de pensar en estos bugs es verlos como una ruta rápida para "editar algo sensible y que funcione".

Un binario privilegiado, una librería usada por root, una decisión de autenticación o cualquier otro punto de confianza del sistema pueden parecer objetivos naturales cuando tienes una primitiva de escritura sobre page cache.

Pero el truco no consiste necesariamente en cambiar el disco para siempre.

A veces lo interesante es justo lo contrario: alterar temporalmente la vista cacheada que el sistema usa en ese momento mientras el fichero real sigue pareciendo intacto. El atacante no necesita que el cambio sea elegante ni duradero si solo tiene que cruzar una frontera una vez.

Desde defensa, la pregunta no debería ser solo:

> "¿Ha cambiado este fichero en disco?"

También debería ser:

> "¿Qué proceso ha conseguido que el kernel trate contenido de solo lectura como un buffer escribible?"

Esa diferencia importa.

El disco puede parecer limpio. Los permisos pueden parecer normales. Los hashes pueden encajar. Y aun así el comportamiento observado puede no tener sentido.

Ahí está la parte incómoda.

## Ideas defensivas

<div class="takeaway-grid">
  <section>
    <h3>Para revisar kernel</h3>
    <p>Hay que distinguir si una página son solo bytes a procesar o contenido respaldado por un fichero con semántica de permisos.</p>
  </section>
  <section>
    <h3>Para defender sistemas</h3>
    <p>No basta con mirar integridad en disco si el comportamiento sospechoso puede venir de una vista cacheada y transitoria.</p>
  </section>
  <section>
    <h3>Para investigar</h3>
    <p>Busca rutas eficientes que pasen páginas de fichero a subsistemas capaces de mutarlas in-place.</p>
  </section>
</div>

## Conclusión

Copy Fail y Dirty Frag son buenos recordatorios de que los bugs más interesantes no siempre viven en una línea concreta. A veces viven entre fronteras.

Entre crypto y filesystem.

Entre networking y memoria.

Entre rendimiento y seguridad.

Entre "esto solo evita una copia" y "acabamos de escribir donde solo podíamos leer".

La page cache no es solo una optimización transparente. Es una zona compartida, caliente y sensible del kernel.

Cada vez que una página cacheada entra en una ruta que puede escribir in-place, merece la pena hacerse la pregunta incómoda:

> ¿Estamos modificando un buffer, o estamos modificando algo que representa un fichero que nadie debería poder tocar?

Copy Fail hizo visible la pregunta.

Dirty Frag demostró que merecía la pena seguir preguntando.

## Lecturas

- [Write-up de Copy Fail](https://copy.fail/)
- [Advisory de Dirty Frag](https://dirtyfrag.com/)
