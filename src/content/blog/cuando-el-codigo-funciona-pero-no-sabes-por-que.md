---
title: "Cuando el código funciona pero no sabes por qué"
description: "Hay un tipo de éxito en programación que da más miedo que el fracaso: ese momento en que algo funciona y no tienes ni idea de cómo."
pubDate: 2026-06-27
category: "Opinión"
tags: ["debugging", "experiencias", "desarrollo"]
author: "Luis Gómez"
---

Hay un momento muy concreto en la vida de todo desarrollador en el que algo deja de fallar sin que tú hayas hecho nada para arreglarlo. Y en lugar de alegrarte, sientes un frío en el estómago.

## El peor tipo de éxito

No me refiero al código que funciona porque lo entiendes. Me refiero al que funciona _a pesar_ de que no lo entiendes. Ese `undefined is not a function` que desaparece después de reordenar dos imports. Esa query que tarda 300ms en lugar de 4 segundos después de que reinicias el servidor.

> El código que funciona sin razón aparente es una deuda técnica disfrazada de victoria.

Lo celebras, haces el commit, cierras el ticket. Y lo olvidas. Hasta que vuelve.

## Por qué lo dejamos pasar

La presión existe. Los _deadlines_ existen. Y cuando algo pasa de rojo a verde, el cerebro humano tiene un sesgo muy poderoso hacia el "ya está, siguiente".

Además, investigar por qué algo funciona cuando ya funciona es difícil de justificar en una _pull request_. "Añadí tests para entender el comportamiento que ya era correcto" no queda bien en el _changelog_.

Pero el problema es que ese comportamiento que no entiendes tarde o temprano cambia. Y entonces no solo tienes un bug — tienes un bug que no sabes cómo reproducir porque nunca supiste cómo se evitaba.

## Lo que hago ahora (la mayoría de las veces)

Cuando algo funciona y no sé por qué, me obligo a hacer una cosa antes de mover el ticket: escribir una hipótesis. Aunque sea en un comentario. Aunque sea mal redactada.

```
// Funciona porque el estado se reinicializa antes de que llegue la respuesta.
// Pendiente: verificar si es race condition o comportamiento esperado.
```

No es elegante. Pero tres meses después, cuando vuelve el bug, ese comentario vale oro.

La ignorancia en el código no es el problema. El problema es la ignorancia que no se documenta.
