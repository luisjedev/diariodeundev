# diariodeundev

Blog personal de un desarrollador — opinión, experiencias y tecnología.
Sitio estático construido con **Astro**, estilo retro/neobrutalista con el
sistema de diseño de **[RetroUI](https://retroui.dev)**, y desplegado en
**Vercel**.

🌐 [diariodeundev.com](https://diariodeundev.com)

## ⚙️ Stack

- **[Astro](https://astro.build)** — generación estática (cero JS por defecto).
- **[RetroUI](https://retroui.dev)** — componentes vía registro de `shadcn`
  (`@retroui/*`), estética neobrutalista.
- **Tailwind CSS v4** — tema y tokens en `src/styles/global.css`.
- **React** — solo para los componentes de RetroUI (renderizados estáticos,
  sin hidratación).
- **TypeScript** + content collections para los artículos en Markdown.

## ✍️ Escribir un artículo nuevo

Crea un archivo `.md` (o `.mdx`) en `src/content/blog/`. El nombre del archivo
es la URL (`mi-articulo.md` → `/blog/mi-articulo`). Markdown admite HTML inline.

```md
---
title: "Título del artículo"
description: "Resumen corto para listados y SEO."
pubDate: 2026-06-22
category: "Tecnología" # Opinión | Experiencias | Tecnología | ...
tags: ["astro", "frontend"]
author: "Luis"
draft: false # ponlo en true para que no se publique
---

Tu contenido en **Markdown** aquí.
```

El esquema y los valores por defecto están en `src/content.config.ts`.

## 🧞 Comandos

Se ejecutan desde la raíz del proyecto:

| Comando         | Acción                                       |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | Instala dependencias                         |
| `pnpm dev`      | Servidor local en `localhost:4321`           |
| `pnpm build`    | Compila el sitio a `./dist/`                 |
| `pnpm preview`  | Previsualiza el build antes de desplegar     |

### Añadir más componentes de RetroUI

```sh
pnpm dlx shadcn@latest add @retroui/<componente>
```

(El registro `@retroui` ya está configurado en `components.json`.)

## 📁 Estructura

```text
src/
├── components/
│   ├── retroui/         # Componentes de RetroUI (Button, Card, Text, Badge, Avatar)
│   ├── AuthorAvatar.tsx # Wrapper React del Avatar para usarlo en .astro
│   ├── Header.astro
│   ├── Footer.astro
│   └── PostCard.astro
├── content/blog/        # Los artículos en Markdown
├── layouts/BaseLayout.astro
├── lib/                 # utils (cn) y helpers
├── pages/
│   ├── index.astro       # Listado del blog
│   ├── sobre-mi.astro
│   ├── 404.astro
│   └── blog/[...slug].astro  # Página de cada artículo
└── styles/global.css    # Tema RetroUI + estilos del contenido
```

## 🚀 Despliegue en Vercel

El sitio es 100% estático. En Vercel:

1. Importa el repositorio.
2. Framework Preset: **Astro** (autodetectado).
3. Build: `pnpm build` · Output: `dist` (autodetectado).

No hace falta configuración adicional ni variables de entorno.

---

> Estética retro cortesía de [RetroUI](https://retroui.dev). El "bloque de blog
> tipo 2" se puede incorporar más adelante con el MCP de RetroUI; el listado
> actual replica esa disposición (destacado + grid de tarjetas).
