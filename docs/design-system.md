# Design system

The brand book for this site: a personal site in four tabs — **blog**, **photography**, **me**, **resume** — built to be read, not browsed.

`src/styles/global.css` **is** the design system — the tokens, the two themes and the type scale all live there, and every `shadcn add` component inherits them with no per-component overrides. This document is the reasoning around those values; [`tokens.md`](./tokens.md) is the full reference table and [`components.md`](./components.md) holds the per-pattern rules.

Colour tokens follow shadcn's semantic contract. That means `primary` is the clay brand colour and `accent` is a hover surface, not a brand colour — a trap worth naming once, because "accent" reads the other way round in most systems.

## Content fundamentals

Write in the first person, lower-case in navigation (`blog`, `photography`, `me`, `resume`), sentence case everywhere else. Never title-case a heading; section page headings (Blog, Photography, Me, Resume) start with a capital.

Say the thing plainly. A post summary is one sentence that tells the reader what they will get, not a teaser: "How I moved 400 Apple Notes into Obsidian without losing the links" beats "Some thoughts on note-taking." Cut adjectives before you cut facts.

Dates are always explicit and never relative — `12 mar 2026`, set in `meta`, which upper-cases them. No "2 days ago", because these pages are read years later. Write dates in day-month-year order and use metric units and euros throughout.

Use no emoji anywhere in the interface. In prose, use them only if they are the subject. Avoid exclamation marks in the resume entirely.

The resume is written for a reader who will skim it in forty seconds: role, organisation, period, then three to five bullets that each start with a verb and name an outcome. No "responsible for". No skill bars or percentages — list tools as plain words.

Photo captions are one line: what it is and where, in `body-s`. If a set needs context, that context is a blog post, not a caption.

## Visual foundations

**Colour.** Paper is `:root`, Ink is `.dark`. The page is `bg-background`; nothing sits on pure white or pure black. Body text is `text-foreground`, secondary prose `text-muted-foreground`, and anything set in a mono style `text-meta-foreground`. `primary` is reserved for links, the active tab's underline, and the rule under the site name — never for a heading, and never as a background except `primary-soft`. One solid `bg-primary` fill is allowed per page, and its label is `text-primary-foreground`, not `text-white`, because `primary` lightens in Ink. Where a shadcn component hard-codes `text-white` on a destructive fill, override it to `text-destructive-foreground`.

Mark blog subcategories with a `rounded-full` dot in `bg-tag-software`, `bg-tag-travel`, `bg-tag-personal` or `bg-tag-history` followed by the word itself in `text-meta-foreground`. The dot is never the only signal — the word always ships with it, so the filter stays usable without colour and in print.

**Type.** `body` is `font-serif` globally, which is the one real departure from a stock shadcn install. Set reading text in `body-l` on article pages and `body-base` elsewhere. Headings come from the Display group: `display-xl` once on the home page, `display-l` for a tab's title, `display-m` for an article title, `display-s` for rows. Inside a post, `##` is 24px/31px medium (the `display-m` values) and `###` is 19px/26px semibold, so both read as headings against 19px body text. Navigation, chips and buttons take `nav`, `label` and `btn-label` from `font-sans` — shadcn's Button defaults to `text-sm`, which is already overridden to `btn-label` in `button.tsx`. Every date, tag and code span takes `meta`, `tabular` or `code` from `font-mono`; the mono face is the site's only texture, so do not add a fourth family.

**Spacing and measure.** Spacing tokens are Tailwind's own scale, named so the token *is* the utility: `space-4` is `p-4`. Text columns stop at `max-w-content`, the photo grid widens to `max-w-wide`, and below 720px both pad with `px-6`. Separate paragraphs by `space-4`, prose sections and resume entries by `space-8`, page regions by `space-12`. Whitespace is the layout — resist adding rules where a `space-12` gap would do.

**Borders, radii, shadows.** Hairlines use `border-border`; anything that carries meaning — a field edge, a chip or outline-button border — uses `border-input`, which is deliberately darker than shadcn's default so it clears 3:1. `--radius` is `0.25rem` against shadcn's `0.625rem`: buttons and code blocks land at `rounded-lg`, chips at `rounded-full`, and photographs and the header stay `rounded-none`. Shadows are almost absent — `shadow-xs` on the header once scrolled and on shadcn's Button, `shadow-lg` on the photo lightbox and Dialog, nothing else.

**Imagery.** Photographs are the only images on the site. Show them full-bleed to `max-w-wide` at `rounded-none`, never cropped to a circle, never overlaid with text. Serve the grid at a 3:2 aspect ratio and let the lightbox show the true ratio. Fill the frame with `bg-muted` while loading.

**Motion.** 120ms ease-out on colour and opacity, nothing else. No entrance animations, no parallax, no scroll-triggered reveals. `tw-animate-css` comes with a shadcn install and is needed only for Dialog and Popover transitions — leave the rest of it unused. Honour `prefers-reduced-motion` by dropping every transition to 0ms.

**States and focus.** Hovered post rows take `bg-secondary` and their title shifts to `text-primary-strong`. Use `primary-strong` rather than shadcn's `primary/90` opacity trick for text, which loses contrast against the page. Every interactive element gets `outline-2 outline-offset-2 outline-ring` on focus, visible in both themes and never removed. Disabled controls drop to 55% opacity and keep their border.

**Charts.** `chart-1` through `chart-5` exist because the contract defines them, not because this site is a dashboard. The ramp is staggered by lightness as well as hue, but five series still separate by only about 1.35:1, so keep charts to three series using `chart-1`, `chart-3` and `chart-5` — that subset separates by 2:1 or better and survives greyscale — and direct-label every series instead of using a legend. `chart-1` is a fill or mark only; it does not clear 4.5:1 as text.

## Iconography

There are almost no icons, by choice. Navigation, filters and the resume are words. A shadcn install brings `lucide-react`, which is the icon set if one is ever needed: 20px, `stroke-width: 1.5`, in `currentColor`, and never as decoration beside a label that already says the thing. The two present exceptions are the theme toggle, which uses a single glyph, and the category dots, which are drawn with `rounded-full` and a background colour rather than shipped as files.

## Components

Nine patterns carry the site; [`components.md`](./components.md) documents each one and names the file that implements it. Build them as Astro components, and reach for a shadcn primitive only where it earns its weight:

- `shadcn add button` — the real implementation behind `Button`. Its variants map one to one: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
- `shadcn add badge` — the tag beside a post title, if you prefer a badge to the dot-and-word pair. Keep the word either way.
- `shadcn add separator` — the hairlines between resume entries and prose sections.
- `shadcn add tabs` — only if the blog filter becomes a genuine tab set. `TabNav` is site navigation, not a Tabs component: it routes, so it is links with `aria-current`, and `FilterChips` is a filter with `aria-pressed`. Do not swap either for the other.

Nothing else from shadcn belongs on this site yet. Dialog when the lightbox is built, and Input plus Label if a contact form ever appears — add them then, not now.

Keep them presentational. Routing, data loading and filter state belong to the pages; the components take props and render. Theme switching is the `.dark` class on `html` and nothing else.

## Assets

There is no logo or wordmark. Until one exists, set the name in plain type: `display-xl` in `text-foreground` with a `bg-primary` rule beneath it. Do not draw a mark, generate a monogram, or substitute a stock glyph.
