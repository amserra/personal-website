import rss from "@astrojs/rss";
import { getPosts, postPath } from "@/lib/blog";
import { SITE } from "@/lib/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getPosts("pt");

  return rss({
    title: SITE.pt.name,
    description: SITE.pt.tagline,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `${postPath(post)}/`,
      categories: [post.data.category],
    })),
  });
}
