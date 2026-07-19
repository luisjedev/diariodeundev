---
name: new-post
description: >
  Creates a well-structured, beautifully formatted blog post for the diariodeundev Astro blog from raw text provided by the user. Use this skill whenever the user wants to write a new blog post, says "escribe un post sobre X", "crea una entrada", "nuevo artículo", "quiero publicar algo sobre", or just pastes raw text and asks to turn it into a post. Even if the user only gives a topic or a rough idea, use this skill to produce the full .md file ready to publish.
---

# new-post — Crear un post para diariodeundev

The user will give you raw text, a rough idea, bullet points, or a topic. Your job is to turn it into a polished, publish-ready Markdown file that fits the voice and style of this blog.

## The blog's voice

This is a personal dev blog written in first person Spanish. The tone is direct, honest, and slightly irreverent — like explaining something to a colleague over coffee, not writing a textbook. The author has opinions and isn't afraid to voice them.

## Output file

Save to: `src/content/blog/[slug].md`

- Slug: lowercase, hyphens, Spanish words (e.g., `aprender-en-publico.md`, `por-que-odio-los-standups.md`)
- Use today's date for `pubDate`

## Frontmatter

```yaml
---
title: ""
description: ""
pubDate: YYYY-MM-DD
category: ""
tags: []
author: "Luis Gómez"
---
```

**title**: Hook-style, not generic. Should make someone stop scrolling. Bad: "Reflexiones sobre el trabajo remoto". Good: "El trabajo remoto me enseñó a no fiarme de los horarios".

**description**: 1-2 sentences that earn the click. Reveal the angle, not just the topic. Should complement the title without repeating it word for word.

**category**: Pick one — `"Tecnología"`, `"Opinión"`, or `"Experiencias"`.

**tags**: 2-4 lowercase, hyphenated tags relevant to the content (e.g., `["carrera", "trabajo-remoto", "soft-skills"]`).

## Post structure

### Opening paragraph (no header)
The very first paragraph is the hook — no `##` title above it. One strong sentence that pulls the reader in, then 1-2 sentences of setup. Don't summarize the post; make them want to keep reading.

### Body sections (## H2)
Use 2-4 sections with clear, descriptive headers. Headers should be informative (`## Lo que nadie te cuenta del código heredado`) rather than generic (`## Introducción`, `## Conclusión`). Avoid a closing section titled "Conclusión" — the post should end naturally.

### Formatting within sections

Use these to create rhythm and hierarchy:

- `**bold**` — key technologies, concepts, or the word you'd stress if speaking aloud
- `_italic_` — foreign terms (_pull request_, _deploy_, _sprint_), or for subtle emphasis
- `> blockquote` — a memorable line, a punchline, or a key takeaway. Max 1-2 per post. Don't overdo it or they lose impact.
- `- list` or `1. numbered list` — when you have 3+ items that read better as a list than as prose. Don't turn every paragraph into a list.
- ` ```lang\n...\n``` ` — code blocks when the post is technical and showing code adds value

### Closing
End the post with a punchy last sentence or short paragraph — no `## Conclusión` header. Could be a callback to the opening, a call to action, or a honest "I don't have all the answers" moment.

## Process

1. Read the raw input carefully — understand the core message the user wants to convey
2. Decide the best structure (how many sections, what angle the title takes)
3. Write the full `.md` with frontmatter + formatted content
4. Save the file
5. Report back: file path + one sentence on what the post is about

## Example structures

**Opinion post** (e.g., "why X is overrated"):
- Hook opening
- `## El problema real` — establish the pain point
- `## Por qué seguimos haciéndolo` — explore the reason/irony
- `## Lo que funciona mejor` — the alternative or lesson
- Punchy close

**Technical post** (e.g., "how I solved X with Y"):
- Hook opening (what problem, what was at stake)
- `## El contexto` — brief setup
- `## La solución` — what you did, with code if relevant
- `## Lo que aprendí` — the insight worth keeping
- Close

**Experience/story post** (e.g., "what happened when I did X"):
- Hook opening (drop into the moment)
- `## Cómo llegué ahí` — backstory
- `## Lo que pasó` — the main story
- `## Por qué importa` — the takeaway
- Close
