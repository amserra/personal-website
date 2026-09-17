// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { LOCALES, localizePath, stripLocale } from './src/lib/routes.ts';

const SITE = 'https://alexandreserra.com';
/** @type {Record<string, string>} */
const HREFLANG = { en: 'en', pt: 'pt-PT' };

// Blog posts pair by filename and carry their own slug, so the sitemap reads
// them from disk: { filename: { en: slug, pt: slug } }, drafts left out.
/** @type {Record<string, Record<string, string>>} */
const postSlugs = {};
for (const locale of LOCALES) {
  const dir = `./src/content/blog/${locale}`;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
    const front = readFileSync(`${dir}/${file}`, 'utf8').split('---')[1] ?? '';
    if (/^draft:\s*true\s*$/m.test(front)) continue;
    const name = file.replace(/\.mdx$/, '');
    const slug = front.match(/^slug:\s*(\S+)\s*$/m)?.[1] ?? name;
    postSlugs[name] ??= {};
    postSlugs[name][locale] = slug;
  }
}

// hreflang alternates for one sitemap URL. Same rules as the page <head>
// (Base.astro): a route exists in every locale, a post only where translated.
/** @param {string} pathname */
function alternates(pathname) {
  const { locale, path } = stripLocale(pathname);
  /** @type {Record<string, string>} */
  let paths = Object.fromEntries(LOCALES.map((l) => [l, localizePath(path, l)]));
  if (path.startsWith('/blog/') && path !== '/blog/') {
    const slug = path.slice('/blog/'.length).replace(/\/$/, '');
    const post = Object.values(postSlugs).find((p) => p[locale] === slug);
    paths = Object.fromEntries(
      LOCALES.flatMap((l) => (post?.[l] ? [[l, localizePath(`/blog/${post[l]}`, l)]] : [])),
    );
  }
  const links = Object.entries(paths).map(([l, p]) => ({ url: SITE + p, lang: HREFLANG[l] }));
  return paths.en ? [...links, { url: SITE + paths.en, lang: 'x-default' }] : links;
}

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        // A page with no translation gets no links at all.
        const links = alternates(new URL(item.url).pathname);
        item.links = links.length > 1 ? links : undefined;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
