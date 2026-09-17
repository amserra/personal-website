import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    // The three subject filters on the blog tab. Nothing else is allowed —
    // file a post under the closest of the three rather than adding a fourth.
    category: z.enum(["software", "travel", "personal"]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
