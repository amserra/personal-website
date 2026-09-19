// One social card per post per locale, at /og/<locale>/<slug>.png.
import type { APIContext } from "astro";
import { getPosts, postSlug } from "@/lib/blog";
import { renderOgCard } from "@/lib/og-card";
import { LOCALES, type Locale } from "@/lib/site";

export async function getStaticPaths() {
  const paths = await Promise.all(
    LOCALES.map(async (locale) =>
      (await getPosts(locale)).map((post) => ({
        params: { locale, slug: postSlug(post) },
        props: { post },
      })),
    ),
  );
  return paths.flat();
}

export async function GET({ params, props, site }: APIContext) {
  const png = await renderOgCard(props.post.data, params.locale as Locale, site!);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}
