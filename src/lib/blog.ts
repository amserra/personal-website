// Blog posts live in src/content/blog/<locale>/<filename>.mdx. The filename
// pairs a post with its translation; the URL slug is the frontmatter `slug`
// when set, otherwise the filename.

import { getCollection, type CollectionEntry } from "astro:content";
import { LOCALES, withLocale, type Locale } from "@/lib/site";

type Post = CollectionEntry<"blog">;

const localeOf = (post: Post) => post.id.split("/")[0] as Locale;
const filenameOf = (post: Post) => post.id.slice(post.id.indexOf("/") + 1);
export const postSlug = (post: Post) => post.data.slug ?? filenameOf(post);
export const postPath = (post: Post) => withLocale(`/blog/${postSlug(post)}`, localeOf(post));

/** Published posts in one locale, newest first. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    ({ id, data }) => id.startsWith(`${locale}/`) && !data.draft,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** URL of the same post in every locale that has a published translation. */
export async function postAlternates(post: Post): Promise<Partial<Record<Locale, string>>> {
  const alternates: Partial<Record<Locale, string>> = {};
  for (const locale of LOCALES) {
    const sibling = (await getPosts(locale)).find((p) => filenameOf(p) === filenameOf(post));
    if (sibling) alternates[locale] = postPath(sibling);
  }
  return alternates;
}
