// Pure route rules with no Astro imports, so astro.config.mjs can share them
// with the site code (the sitemap builds its hreflang links from these).

export type Locale = "en" | "pt";

export const LOCALES: Locale[] = ["en", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

// Routes are written once, in English, and that spelling is the canonical
// path everywhere in the code ("/photography"). A locale's own URL is that
// path with its first segment renamed here; anything unlisted keeps its
// English name. Blog post slugs are not in this table — they come from each
// post (see src/lib/blog.ts). The matching file lives under src/pages/pt/.
export const SECTION_SLUGS: Record<Locale, Record<string, string>> = {
  en: {},
  pt: { photography: "fotografia", me: "eu", resume: "curriculo" },
};

// Every URL ends in a slash: that is the form the host serves, so a link
// without one costs a redirect and disagrees with the canonical and sitemap.
// `path` is a canonical route, e.g. "/" or "/blog".
export function localizePath(path: string, locale: Locale): string {
  const [, first = "", ...rest] = path.split("/");
  const localized = [SECTION_SLUGS[locale][first] ?? first, ...rest].filter(Boolean).join("/");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return localized ? `${prefix}/${localized}/` : `${prefix}/`;
}

// The inverse: a URL pathname to its locale and canonical, locale-free route.
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const locale: Locale = normalized === "/pt" || normalized.startsWith("/pt/") ? "pt" : "en";
  const [, first = "", ...rest] = (locale === "pt" ? normalized.slice(3) || "/" : normalized).split("/");
  const canonical =
    Object.entries(SECTION_SLUGS[locale]).find(([, local]) => local === first)?.[0] ?? first;
  return { locale, path: ["", canonical, ...rest].join("/") || "/" };
}
