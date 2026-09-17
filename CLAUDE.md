# personal-website

Alexandre Serra's personal site: four tabs — blog, photography, me, resume. Astro 7 + Tailwind 4 + shadcn/ui, static output. Content-first and deliberately quiet; whitespace is the layout.

```bash
pnpm dev      # localhost:4321
pnpm build    # 11 pages
pnpm check    # astro check — keep this at 0 errors, 0 warnings
```

Use **pnpm** — `pnpm-lock.yaml` is the lockfile. Note that `node_modules` holds platform-native binaries (`@rolldown/binding-darwin-arm64`, `@astrojs/compiler-binding-darwin-arm64`), so it is valid for macOS only. If a Linux-side agent ever installs into this folder, the bindings get replaced and your local build breaks until you reinstall — run installs on your own machine.

## Design tokens

`src/styles/global.css` is the source of truth: `:root` (Paper) and `.dark` (Ink), mapped to Tailwind in `@theme inline`. The reasoning lives in `docs/`:

- `docs/design-system.md` — the brand book: voice, visual foundations, iconography.
- `docs/tokens.md` — every token with both theme values and a usage note.
- `docs/components.md` — the nine patterns, their rules, and the file implementing each.

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
src/content/blog/<slug>.mdx    # title, date, summary, category, draft?
src/content.config.ts          # schema
src/lib/resume.ts              # resume data, all of it from alexandre-serra-cv.pdf
src/lib/site.ts                # name, tagline, tabs, footer links, formatDate
```

The six posts were migrated from a previous Next.js site; their inline diagrams live in `public/images/blog/<slug>/`.

The resume's facts come from the CV and nothing else — tighten wording, never add a fact. The CV's phone number is deliberately **not** on the public page. Photo captions in `photography.astro` are placeholders awaiting Alexandre's own; the alt text is real.

## Voice

First person. Lower-case navigation, sentence case everywhere else — never title case. A post summary is one sentence saying what the reader gets, not a teaser. Cut adjectives before facts. No emoji in the interface. No exclamation marks on the resume, and never "responsible for". Metric units, euros.

## Environment caveat

`ui.shadcn.com` is unreachable from some networks, so `shadcn add` may fail. The four components in `src/components/ui/` were taken from the `new-york-v4` registry in shadcn's GitHub repo with their placeholder `from "cn"` imports repointed at `@/lib/utils`; they use the unified `radix-ui` package, not `@radix-ui/react-*`. TypeScript is pinned to **6** because `@astrojs/check` rejects 7.

Two edits were made to the stock `button.tsx` and should survive updates: the label is `btn-label` rather than `text-sm`, and the destructive variant uses `text-destructive-foreground` instead of hard-coded `text-white`.

## Before saying it works

`npm run build` and `npm run check` clean, then look at the page in both themes and at 390px wide (no horizontal overflow). The blog filter should go 6 posts → 0 travel with "No travel posts yet." → 5 software, with `?tag=` tracking in the URL.
