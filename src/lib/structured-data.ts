// JSON-LD builders. Facts come from the same sources as the visible pages
// (site.ts, resume.ts) so there is nothing here that isn't already public.

import type { CollectionEntry } from "astro:content";
import { SITE, FOOTER_LINKS, withLocale, type Locale } from "@/lib/site";
import { EXPERIENCE, EDUCATION } from "@/lib/resume";

function sameAs(locale: Locale): string[] {
  return FOOTER_LINKS[locale].filter((link) => link.external).map((link) => link.href);
}

function inLanguage(locale: Locale): string {
  return locale === "pt" ? "pt-PT" : "en";
}

// Stable @ids let the entities reference each other, and let a crawler see the
// English and Portuguese pages as the same person rather than two.
const personId = (origin: string | URL) => new URL("/#person", origin).href;

export function websiteSchema(locale: Locale, siteUrl: string | URL) {
  const site = SITE[locale];
  const url = new URL(withLocale("/", locale), siteUrl).href;
  return {
    "@type": "WebSite",
    "@id": `${url}#website`,
    name: site.name,
    url,
    publisher: { "@id": personId(siteUrl) },
    description: site.tagline,
    inLanguage: inLanguage(locale),
  };
}

export function personSchema(locale: Locale, personUrl: string | URL, imageUrl?: string | URL) {
  const site = SITE[locale];
  const current = EXPERIENCE[locale][0];
  return {
    "@type": "Person",
    "@id": personId(personUrl),
    name: site.name,
    url: String(personUrl),
    description: site.tagline,
    jobTitle: current?.role,
    worksFor: current?.org ? { "@type": "Organization", name: current.org } : undefined,
    alumniOf: EDUCATION[locale].map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.org,
    })),
    sameAs: sameAs(locale),
    image: imageUrl ? String(imageUrl) : undefined,
  };
}

export function blogPostingSchema(
  post: CollectionEntry<"blog">,
  locale: Locale,
  canonicalUrl: string | URL,
  authorUrl: string | URL,
  imageUrl?: string | URL,
) {
  const site = SITE[locale];
  return {
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.summary,
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    inLanguage: inLanguage(locale),
    articleSection: post.data.category,
    mainEntityOfPage: String(canonicalUrl),
    url: String(canonicalUrl),
    image: imageUrl ? String(imageUrl) : undefined,
    author: { "@type": "Person", "@id": personId(authorUrl), name: site.name, url: String(authorUrl) },
    isPartOf: { "@id": `${new URL(withLocale("/", locale), canonicalUrl).href}#website` },
  };
}
