import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(["en", "es"]).default("en"),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(["en", "es"]).default("en"),
    year: z.number(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(["active", "archived"]).default("active"),
    tags: z.array(z.string()).default([]),
    link: z.url().optional(),
    repo: z.url().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = { blog, projects };
