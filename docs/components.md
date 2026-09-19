# Component guidelines

What each pattern is for, and the rules that keep it consistent. Each section names the file that implements it in this repo.


## SiteHeader

**Implemented in:** `src/layouts/Base.astro` — the masthead, including the theme toggle and its no-flash script.

The site's masthead: the name in plain type, a clay rule, an optional tagline, the four tabs, and the theme toggle. Every page uses it, unchanged.

The name, tagline, tabs and footer links come from `src/lib/site.ts`, keyed by locale; each page passes `active` to `Base.astro` so the right tab is marked. The theme is the `.dark` class on `html`, set before first paint by the inline script in the layout head and flipped by the toggle, which writes `localStorage.theme`. Remove the toggle button if you ever decide to follow the system preference only. The header also carries `LanguageSwitch`, next to the theme toggle.

Use it when: on every route. There is no alternate header, no condensed variant, no logo slot — there is no wordmark, so the name is set in `display-l` in `foreground` with an `primary` rule under it.

Do:

- Keep the four tab labels lower-case and in the order blog, photography, me, resume.
- Keep each tab a real `<a href>`. The site is static and navigation must work with JavaScript off.
- Keep the tagline to one short sentence in the site's own voice, or leave it out.

Don't:

- Don't add a fifth tab. If a section needs a home, it belongs inside `me` or as a filter on `blog`.
- Don't put a search field, a subscribe box or social icons in the header. Those live in `Footer`.
- Don't make the header sticky without also applying `shadow-xs` once scrolled, or it will float with no edge.

Entirely static — no framework island. The toggle is a plain `<button>` with a short inline script, and the no-flash script that applies the stored theme runs in the head before first paint.


## TabNav

**Implemented in:** `src/layouts/Base.astro` — the tab row, plain links with `aria-current`.

The tab row on its own: four lower-case labels, the active one carrying `aria-current="page"` and an `primary` underline. `SiteHeader` uses it; use it directly only if you build a different chrome.

The tab list lives in `TABS` in `src/lib/site.ts`; the active one gets `aria-current="page"`, which is also what the styling hangs off. Inactive labels sit in `meta-foreground` and rise to `foreground` on hover, so the active tab is the only one at full strength.

Use it when: you need the same navigation outside the masthead — a 404 page, a print header.

Do:

- Mark the active tab with `active`, never by styling the label yourself. The underline and `aria-current` must agree.
- Keep the label list identical everywhere; navigation that changes shape between pages reads as a bug.

Don't:

- Don't nest a second level of tabs under this one. Blog subcategories are `FilterChips`, which are a filter, not navigation.
- Don't add icons to the labels. This site has no icon set by design.

This is navigation, not a shadcn Tabs component. Tabs manages panels in one page and sets `aria-selected`; this routes between pages and sets `aria-current="page"`. Build it as plain `a` elements with `data-astro-prefetch` and keep it server-rendered — do not add `shadcn add tabs` for it.


## FilterChips

**Implemented in:** `src/components/FilterChip.astro` (the chip), used by `src/components/views/BlogIndex.astro` and by the resume's view toggle in `src/components/views/Resume.astro`. Server-rendered chips plus a small inline script per page; no framework island.

The blog's subject filter: an `all` chip plus one per subcategory, each with its colour dot, its word, and an optional count. It filters the list in place — it does not navigate.

The four subject chips plus an `all` chip are rendered on the server from the post counts, with `all` pressed by default. Filtering hides rows by their `data-category` attribute rather than re-rendering the list, and the chosen filter is mirrored into the URL as `?tag=` so a filtered view can be linked and reloaded.

Use it when: above the post list on the blog tab, and for the professional/full toggle on the resume. Photography has nothing to filter.

Do:

- Keep the dot and the word together. The dot in `tag-software`, `tag-travel`, `tag-personal` or `tag-history` is a second signal, never the only one, so the filter still works for a colour-blind reader and in print.
- Show counts when the archive is long enough that they help someone choose; drop them when a category has one post.
- Reflect the active chip in the URL (`/blog?tag=travel`) so a filtered view can be linked and reloaded.

Don't:

- Don't allow multiple chips at once. One subject at a time keeps the list honest and the URL simple.
- Don't invent a fifth category to fit one post — file it under the closest of the four.
- Don't use chips as tabs. They set `aria-pressed`, not `aria-current`.

Plain `<button>` elements with a short inline script — no framework island. Keep `aria-pressed`, never `aria-current`: this filters a list in place, it does not navigate. The full list is server-rendered, so the page works before the script runs.


## PostList

**Implemented in:** `src/components/PostRow.astro`, mapped over in `index.astro` and `blog/index.astro`.

The blog index: one row per post carrying date, category dot and word, title, and a one-sentence summary, separated by hairlines. It renders exactly the posts it is given.

`PostRow.astro` takes `title`, `href`, `date`, `category` and `summary`; the page sorts newest first and maps over the collection. Dates render day-month-year through `formatDate` in `meta`, which upper-cases them — never relative time, because these pages are read years later. The blog page's `#empty` paragraph covers the filtered-to-nothing case.

Use it when: the blog tab, and the three or four latest posts on the home page.

Do:

- Write each `summary` as one sentence saying what the reader gets, not a teaser.
- Give every row a real `href`, and let the whole row be the link — the hover state covers the row for a reason.
- Keep the empty message specific: "No travel posts yet.", not "No results".

Don't:

- Don't add thumbnails. Photographs belong on the photography tab; an image per row turns a reading list into a feed.
- Don't paginate under about forty posts. A long, quiet archive page is the point.
- Don't sort by anything but date. There are no featured or pinned posts in this system.

Fully static — no shadcn primitive, no client directive. Render the rows in an Astro `map` over a content collection, and let the filter chips above it toggle rows with a data attribute rather than re-rendering the list on the client.


## Prose

**Implemented in:** the utility class list in `src/pages/blog/[...slug].astro`, applied to the rendered MDX.

The article body: `body-l` serif on the page ground, clay links, mono code, a `muted` well for quotes and code blocks. Wrap any long-form content in it.

The rules are a utility class list applied to the wrapper around `<Content />`, styling descendants rather than parsing anything, so rendered MDX works unchanged. Article pages read at `body-l`; shorter pages like `me` use `body-base`.

Use it when: a blog post, the `me` page, anything with paragraphs. Not for the resume, which has its own rhythm.

Do:

- Keep the column at `container-content`. The measure is the whole point of the reading size.
- Set section heads with `display-s` inside the prose and the article's own title with `display-m` above it.
- Caption figures in `body-s` — one line, what it is and where.

Don't:

- Don't colour a heading with `primary`. Links are the only clay text in prose.
- Don't drop below `body` for body copy anywhere, and never use `meta` for a paragraph.
- Don't nest a `PostList` inside prose; close the column first.

Use this class list on the rendered output of an Astro content collection rather than `@tailwindcss/typography`: the plugin ships its own scale and colours, which would fight `body-l` and `primary`. If you do install it, configure it to inherit these tokens rather than accepting its defaults.


## PhotoGrid

**Implemented in:** `src/pages/photography.astro`, using `astro:assets` for the 3:2 crops.

The photography grid: 3:2 frames with square corners, a `muted` well while the image loads, and an optional one-line caption with the place in `meta`. Photos are grouped into sections by calendar month, newest first, each with a `meta` heading and rule — the same pattern as `ResumeSection`.

The `PHOTOS` array in `photography.astro` holds `file`, `alt`, `caption`, `date` and an optional `place`; images are pulled in with `import.meta.glob` and rendered through `astro:assets`. The page sorts by `date` descending and buckets by year-month before rendering. Three columns on desktop, two below 720px, one below 480px. There is no lightbox yet — `shadow-lg` is reserved for it.

Use it when: the photography tab, and a set inside a travel post. The grid widens to `container-wide`, wider than every text column.

Do:

- Write real `alt` text for anything that carries information, and an empty string for a purely decorative frame.
- Serve grid images at 3:2 and let the lightbox show the true crop.
- Keep captions to one line. Context that needs a paragraph is a blog post.

Don't:

- Don't round the frames or add a border. Photographs are `radius-none` in this system.
- Don't overlay titles or gradients on an image. The caption sits beneath it.
- Don't mix photography with UI screenshots in one grid.

Static, with `client:visible` only once a lightbox exists — build that on `shadcn add dialog`, using `shadow-lg` on the content and `bg-background/95` behind it. Use Astro `Image` for the grid so the 3:2 crops are generated at build time.


## ResumeSection

**Implemented in:** `src/components/ResumeSection.astro`, fed by `src/lib/resume.ts`.

One resume block — Experience, Education, Speaking — with a `meta` heading rule and an entry per role: name, period in `tabular` mono, organisation, verb-first bullets, and tools as plain words.

`ResumeSection.astro` takes a `title` and an `entries` array from `src/lib/resume.ts`. Periods are free text so "2023 — present" and "2019 — 2021" align down the page in `tabular`. Sections stack in the order that serves the reader: experience first, unless the education is the reason someone is reading.

Use it when: the resume tab, and nowhere else.

Every entry (and every skills row) carries a required `kind: "professional" | "personal"` in `src/lib/resume.ts`; it has no default, so `pnpm check` fails on an untagged entry. The page renders everything and stamps `data-kind` on each entry, and on each section (`professional` when at least one of its entries is). A `professional | full` toggle above the resume flips `data-view` on the wrapper: in `professional` a CSS rule hides everything with `data-kind="personal"`, so a section with no professional entries disappears with its heading. The full view shows both kinds. The view is mirrored into the URL as `?view=full` (professional is the default and adds no parameter). The toggle is hidden until the script runs, so without JavaScript the page shows the professional view. Set `kind` on both the `en` and `pt` entry.

The solid button above the resume builds a PDF of the current locale and view in the browser (`src/lib/cv-pdf.ts`, jsPDF, loaded with a dynamic import on click). It is a `<button>` styled with `buttonVariants()` and hidden until the script runs. While the PDF builds it gets `aria-busy`, an inline spinner and the label "Generating PDF…", its width locked so it does not move; a failure shows a `text-destructive` line under it.

Do:

- Write three to five bullets per role, each starting with a verb and naming an outcome.
- List tools as plain words in `tech`. No levels, no years-of-experience numbers, no bars.
- Keep the whole resume printable: it sits in `container-content` and needs no chrome to read on paper.

Don't:

- Don't use "responsible for", and don't put an exclamation mark anywhere on this page.
- Don't add logos or headshots. There are no brand assets in this system.
- Don't bury the CV download — pair the top of the page with a single `Button variant="primary"`, the one solid accent fill allowed per page.

Static. Use `shadcn add separator` for the rule under each section heading, and keep the page printable: a `print:` variant that drops the header, footer and theme toggle is worth the four utilities it costs.


## Button

**Implemented in:** `src/components/ui/button.tsx` (shadcn) and `src/components/ButtonLink.astro` for links.

The site's only control: `primary` as a solid accent fill, `outline` as the default, `quiet` as a link with no box. Renders an `a` when given `href`, otherwise a `button`.

At most one `primary` per page — in practice the CV download on the resume tab. Its label uses `primary-foreground` rather than white, because `primary` lightens in the dark theme. `disabled` drops to 55% opacity and keeps its border; it does nothing else, so pair it with text explaining why.

Use it when: downloading the CV, mailing a link, or expanding a truncated list. Most actions on this site are ordinary prose links instead.

Do:

- Label the action, not the mechanism: "Download CV (PDF)", not "Click here".
- Add `target`/`rel` yourself on anything opening off-site; `ButtonLink` passes extra attributes straight through.
- Keep the focus ring. It is 2px solid `ring` at 2px offset and clears 3:1 on every surface in both themes.

Don't:

- Don't stack two solid buttons side by side. The second one is `outline`.
- Don't put a button where a link belongs — navigation between tabs is `TabNav`, filtering is `FilterChips`.
- Don't add an icon or a loading spinner; neither exists in this system.

This is shadcn's Button. Run `pnpm dlx shadcn@latest add button` and use it directly — the variants here carry the same names (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`), so nothing needs renaming. Two overrides after install: set the label style to `button` rather than shadcn's `text-sm`, and where a destructive variant hard-codes `text-white`, change it to `text-destructive-foreground`. The implementation in this system's bundle exists so the preview renders; it is not what the site should ship.


## LanguageSwitch

**Implemented in:** `src/layouts/Base.astro` — a two-part segmented control (`en | pt`) next to the theme toggle.

The site's locale switch: a small bordered control with both languages, `en | pt`, the current one filled with the `secondary` surface and marked `aria-current`. Bordered like the theme toggle so it reads as a control rather than a stray word; the other half is a link to the same page in the other language.

`Astro.currentLocale` gives the active locale from the URL (`/…` is English, `/pt/…` is Portuguese, per the `i18n` block in `astro.config.mjs`); `stripLocale`/`withLocale`/`otherLocale` (`src/lib/routes.ts` and `src/lib/site.ts`) compute the equivalent path in the other locale. Section pages share one canonical (English) route and `SECTION_SLUGS` renames its first segment per locale, so `/resume` and `/pt/curriculo` map to each other. Blog posts are paired by filename in `src/lib/blog.ts`, and the post view hands the sibling's URL to `Base.astro` as `alternates`, because a translated post's slug can differ.

Use it when: in the header, next to the theme toggle. Nowhere else — there's no second way to switch language.

Do:

- Keep both halves real `<a href>`s with `hreflang`, so it works with JavaScript off.
- Show both languages at once, so the current state is visible and not implied. Each half carries `lang`, plus an `aria-label`/`title` with the language's own name (`English`, `Português`); the group is labelled via `UI[locale].language`.
- Add a `hreflang` alternate `<link>` per locale in the document head, plus `x-default` pointing at English — `Base.astro` already does this from the same path helpers. All three URLs (canonical, hreflang, sitemap) end in a slash.

Don't:

- Don't build a dropdown for two languages. Two visible options beat a menu that hides one.
- Don't invent per-page override paths beyond `SECTION_SLUGS` and a post's `slug`. A post with no translation sends the switch to the blog index and emits no `hreflang`; a section page should always be translated.

Static — no framework island, no client-side locale detection or redirect. The URL is the only source of truth for which language is showing.


## Footer

**Implemented in:** `src/layouts/Base.astro` — the footer band.

The page foot: one sentence in `body-s` on a `secondary` band, and a row of lower-case word links — email, github, linkedin, rss.

The note and links come from `SITE.footerNote` and `FOOTER_LINKS` in `src/lib/site.ts`. The links are words, not icons, in `meta-foreground`, turning `primary-strong` and underlining on hover. Links flagged `external` carry `rel="noreferrer me"`.

Use it when: the bottom of every page. It is the home for everything that is not one of the four tabs.

Do:

- Keep `note` to one sentence — where the site is written, what it is set in, whether it tracks anything.
- Offer the RSS feed here. A reading site without a feed is a missed obligation.
- Keep labels lower-case to match the tabs.

Don't:

- Don't add a newsletter form, a cookie notice or a copyright line longer than the note itself.
- Don't repeat the tab navigation in the footer; the page is short enough to scroll back.

Static. The `me` link on a personal profile should carry `rel="me"` for identity verification on Mastodon and the like — the component adds it when a link is marked `external`.

