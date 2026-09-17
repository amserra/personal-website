import rss from "@astrojs/rss";
import { getPosts, postPath } from "@/lib/blog";
import { SITE } from "@/lib/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getPosts("en");

  return rss({
    title: SITE.en.name,
    description: SITE.en.tagline,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: postPath(post),
      categories: [post.data.category],
    })),
    customData: `<language>en</language>`,
  });
}
