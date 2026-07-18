import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default("General"),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Luis"),
    draft: z.boolean().default(false),
    visible: z.boolean().default(true),
  }),
});

export const collections = { blog };
