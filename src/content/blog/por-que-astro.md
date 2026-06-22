---
title: "Por qué elegí Astro para este blog"
description: "Un blog personal no necesita un framework de 200 KB de JavaScript. Te cuento por qué Astro encaja como un guante para contenido estático."
pubDate: 2026-06-20
category: "Tecnología"
tags: ["astro", "frontend", "performance"]
author: "Luis Gómez"
---

Cuando decidí montar este blog tenía claro una cosa: **nada de dashboards, nada
de bases de datos, nada de JavaScript que no haga falta**. Solo contenido.

## El problema del JavaScript de más

Muchos blogs se construyen sobre frameworks pensados para aplicaciones. El
resultado es que mandas al navegador kilobytes de JS para renderizar... texto.

Astro le da la vuelta a esto con su filosofía de **islas**: el HTML se genera
en build y solo hidrata el JavaScript de los componentes que realmente lo
necesitan.

## Lo que me convenció

1. **Cero JS por defecto.** Las páginas se sirven como HTML estático.
2. **Islas a la carta.** Puedo meter un componente de React puntual sin pagar
   el coste en toda la web.
3. **Content collections.** Escribo en Markdown y Astro me da tipos y validación.

```ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({ title: z.string(), pubDate: z.coerce.date() }),
});
```

Para un blog estático con estética retro, la combinación es casi perfecta.
