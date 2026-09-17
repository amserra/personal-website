import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Entry id is "<locale>/<filename>", and that filename is what pairs a post
  // with its translation. Without this, a `slug` in the frontmatter would
  // replace the id and break the pairing.
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    // The post's URL segment. Optional: defaults to the filename. Set it on a
    // translation whose URL should be in its own language.
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).optional(),
    date: z.coerce.date(),
    summary: z.string(),
    // The three subject filters on the blog tab. Nothing else is allowed —
    // file a post under the closest of the three rather than adding a fourth.
    category: z.enum(["software", "travel", "personal"]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
