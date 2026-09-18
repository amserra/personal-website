# personal-website

Alexandre Serra's personal site: four tabs — blog, photography, me, resume. Astro 7 + Tailwind 4 + shadcn/ui, static output. Content-first and deliberately quiet; whitespace is the layout. Bilingual: English (default, unprefixed) and European Portuguese (`/pt/*`).

```bash
pnpm dev      # localhost:4321
pnpm build    # 22 pages (11 English, 11 Portuguese)
pnpm check    # astro check — keep this at 0 errors, 0 warnings
```

Use **pnpm** — `pnpm-lock.yaml` is the lockfile. Note that `node_modules` holds platform-native binaries (`@rolldown/binding-darwin-arm64`, `@astrojs/compiler-binding-darwin-arm64`), so it is valid for macOS only. If a Linux-side agent ever installs into this folder, the bindings get replaced and your local build breaks until you reinstall — run installs on your own machine.

## Design tokens

`src/styles/global.css` is the source of truth: `:root` (Paper) and `.dark` (Ink), mapped to Tailwind in `@theme inline`. The reasoning lives in `docs/`:

- `docs/design-system.md` — the brand book: voice, visual foundations, iconography.
- `docs/tokens.md` — every token with both theme values and a usage note.
- `docs/components.md` — the ten patterns, their rules, and the file implementing each.

Change a value in `global.css` and update `docs/tokens.md` in the same commit, or the reference goes stale.

Tokens follow **shadcn's semantic contract**, which means one thing is counter-intuitive and worth stating plainly:

- `primary` is the clay brand colour — prose links, the active tab underline, the rule under the name, the one solid button per page.
- `accent` is shadcn's **hover surface**, not a brand colour. It equals `secondary` by design.
- `primary-strong` is for hovered/focused text. Do **not** use shadcn's `primary/90` opacity trick on text; it loses contrast against the page.
- `meta-foreground` is one step quieter than `muted-foreground`, for anything in a mono style (dates, tags, inactive tabs, footer).
- `primary-soft`, `primary-strong`, `meta-foreground`, `tag-*`, `container-*` are extensions outside the contract.

Contrast is a requirement, not an aspiration: every text pair holds 4.5:1 in both themes, and borders, focus rings and chart marks hold 3:1. `input` is deliberately darker than shadcn's default so it clears 3:1. Check any new pair before shipping it.

`--radius` is `0.25rem` (shadcn's default is `0.625rem`) — this site is squarer on purpose. Photographs and the header stay `rounded-none`.

Type styles are classes in `global.css`: `display-xl/l/m/s`, `body-l`, `body-base`, `body-s`, `quote`, `nav`, `label`, `btn-label`, `meta`, `tabular`, `code`. `body` is `font-serif` globally — reading text is the default, controls are the exception. `meta` upper-cases its own text, so write it lower-case.

## Conventions that will bite you

- **Links that look like buttons use `ButtonLink.astro`** (`buttonVariants()` on an `<a>`). shadcn's `<Button asChild>` silently drops every class when Astro renders React to static HTML — you get a bare anchor and an invisible button. Never use `asChild` here.
- **Blog categories are exactly `software`, `travel`, `personal`.** The schema enforces it. File a post under the closest of the three rather than adding a fourth.
- **The category dot never travels alone** — always the coloured dot *and* the word, so the filter survives greyscale and colour blindness.
- **Dates are absolute, day-month-year**, via `formatDate` in `src/lib/site.ts`. Never relative ("2 days ago"); these pages get read years later.
- **Import `z` from `zod`**, not from `astro:content` (deprecated in Astro 7).
- **Photographs go in `src/images/`**, never `public/`, so Astro optimises them — a 4.4 MB original ships as 88 kB. Grid crops are 3:2; the lightbox shows the true ratio.
- **Utilities are the interface; `@apply` is not.** A repeating pattern becomes an Astro component, not a CSS class that hides the utilities.
- `tw-animate-css` is not installed. Add it only when a Dialog or Popover actually needs it.

## Content

```
src/content/blog/en/<file>.mdx    # title, date, summary, category, slug?, draft?
src/content/blog/pt/<file>.mdx    # same filename, same schema, PT-PT translation
src/content.config.ts             # schema (glob loader, id = "<locale>/<slug>")
src/lib/resume.ts                 # resume data per locale, all of it from alexandre-serra-cv.pdf
src/lib/site.ts                   # SITE/TABS/FOOTER_LINKS/UI per locale, formatDate, locale-path helpers
```

The six posts were migrated from a previous Next.js site; their inline diagrams live in `public/images/blog/<slug>/` and are shared by both locales (translate the alt text, not the image).

The resume's facts come from the CV and nothing else — tighten wording, never add a fact — and that rule applies to the `pt` entries too: translate, don't embellish. The CV's phone number is deliberately **not** on the public page, and there is only one CV PDF (English), linked from both locales. Photo captions in `photography.astro` are placeholders awaiting Alexandre's own, in both locales; the alt text is real.

## Voice

First person. Lower-case navigation, sentence case everywhere else — never title case. A post summary is one sentence saying what the reader gets, not a teaser. Cut adjectives before facts. No emoji in the interface. No exclamation marks on the resume, and never "responsible for". Metric units, euros. The same rules apply to the `pt` copy — it's a translation of the voice, not a different one.

## Internationalisation

English is the default locale, served unprefixed (`/blog`, `/me`...); Portuguese lives under `/pt/*` with translated section slugs (`/pt/blog`, `/pt/eu`, `/pt/fotografia`, `/pt/curriculo`), configured in `astro.config.mjs`'s `i18n` block with `prefixDefaultLocale: false`.

- **Every route exists in both locales; the code only ever names the English one.** `SECTION_SLUGS` in `src/lib/routes.ts` (pure, no Astro imports, so `astro.config.mjs` can share it) renames a route's first segment per locale (`photography` → `fotografia`, `me` → `eu`, `resume` → `curriculo`); `withLocale("/photography", locale)` and `stripLocale` translate in each direction, so write links as canonical English paths and never hard-code `/pt/...`. The `.astro` file under `src/pages/pt/` must be named to match. A new page needs a file in each locale and, if its PT slug differs, an entry in `SECTION_SLUGS`. If a page exists in only one language, write the translation.
- **Locale is derived from the URL, never passed as a prop.** Shared view components in `src/components/views/` (`Home.astro`, `BlogIndex.astro`, `BlogPost.astro`, `Me.astro`, `Resume.astro`, `Photography.astro`) read `Astro.currentLocale` themselves; the thin files in `src/pages/` and `src/pages/pt/` just render the same view. Keep new pages in this shape rather than duplicating markup per locale.
- **Blog category keys (`software`/`travel`/`personal`) stay in English everywhere** — schema, `data-category`, `?tag=` URLs — so a filtered link works identically in both locales. Only the displayed word is translated, via `UI[locale].blog.categories`.
- Adding a UI string: add it to both `en` and `pt` in the `UI` record in `src/lib/site.ts`, next to the English one, not in a separate file.
- Adding a blog post: write `en/<file>.mdx` and `pt/<file>.mdx` with the same filename and the same `date`/`category`. The filename pairs the translations (the entry id is `<locale>/<file>`, kept that way by `generateId` in `content.config.ts`). The URL is the optional `slug` frontmatter, else the filename — set `slug` on a translation to give it a URL in its own language. `src/lib/blog.ts` (`getPosts`, `postPath`, `postAlternates`) is the only place that reads ids or slugs; post pages pass `alternates` to `Base.astro`, which drives the language switch and `hreflang`. A post with no translation sends the switch to the other locale's blog index and emits no `hreflang` for it. The sitemap's `serialize` hook in `astro.config.mjs` builds the same `hreflang` links from `routes.ts` plus each post's `slug` frontmatter, so `sitemap-0.xml` and the page `<head>` agree; a post with no translation gets none.
- **Every URL ends in a slash.** `withLocale`/`localizePath` always return the slashed form (`/blog/`, `/pt/eu/`), because Cloudflare 307-redirects the bare form and hreflang, canonical and sitemap must all name the same URL. Don't hand-write internal links without the trailing slash.
- **`src/pages/404.astro` is one bilingual page** (Cloudflare serves a single `404.html`). It passes `noindex` to `Base.astro`, which drops canonical and hreflang and adds `robots: noindex`.
- **`<title>` is not the visible heading.** Section pages use `UI[locale].<section>.metaTitle` (a descriptive phrase) for `<title>`/`og:title`, and `title` (capitalised) for the h1. The home title is `SITE[locale].homeTitle`.
- JSON-LD entities carry stable `@id`s (`/#person`, `/<locale>/#website`) so the English and Portuguese pages reference the same person; keep them when editing `src/lib/structured-data.ts`.

## Environment caveat

`ui.shadcn.com` is unreachable from some networks, so `shadcn add` may fail. The four components in `src/components/ui/` were taken from the `new-york-v4` registry in shadcn's GitHub repo with their placeholder `from "cn"` imports repointed at `@/lib/utils`; they use the unified `radix-ui` package, not `@radix-ui/react-*`. TypeScript is pinned to **6** because `@astrojs/check` rejects 7.

Two edits were made to the stock `button.tsx` and should survive updates: the label is `btn-label` rather than `text-sm`, and the destructive variant uses `text-destructive-foreground` instead of hard-coded `text-white`.

## Deployment

Static output, deployed as a **Cloudflare Workers static-assets project** (connected via the dashboard's Workers Git-import flow, not classic Pages) — `wrangler.jsonc`'s `assets.directory` points at `dist/`, no `main` worker script needed.

- Dashboard project settings (Settings → Runtime → Builds): build command `pnpm build`, deploy command `npx wrangler deploy`, root directory `/`.
- `.node-version` pins Node 22 (Astro 7 requires `>=22.12.0`); Cloudflare's build image reads this automatically.
- `sharp` is listed as a direct dependency (not left as Astro's optional dep) — under pnpm's strict hoisting it otherwise isn't resolvable from the chunk `astro build` emits into `dist/.prerender/`, and image optimisation silently breaks in CI.
- `wrangler.jsonc` + the `wrangler` devDependency exist for local parity (`pnpm exec wrangler dev`) and CLI deploys (`pnpm deploy` → `wrangler deploy`); the dashboard Git integration builds independently of these.
- `pnpm approve-builds` / `onlyBuiltDependencies` in `package.json` must list `workerd` (wrangler's runtime) alongside `esbuild`, or its postinstall is skipped and `wrangler dev` fails.
- If the dashboard build fails with "disconnected from your Git account", the GitHub App authorization needs re-linking from Settings → Runtime → Git repository → Manage — that's an account-level OAuth step, not a repo config issue.

## Before saying it works

`npm run build` and `npm run check` clean, then look at the page in both themes and at 390px wide (no horizontal overflow). The blog filter should go 6 posts → 0 travel with "No travel posts yet." → 5 software, with `?tag=` tracking in the URL. Check this on both `/blog` and `/pt/blog` — the PT empty state reads "Ainda não há posts de viagens." Click the language switch from a few different pages (home, a blog post, resume) and confirm it lands on the translated equivalent, not the section root.
