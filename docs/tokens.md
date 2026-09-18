# Token reference

Generated from the design system. **`src/styles/global.css` is the source of truth** — if a value here disagrees with it, the stylesheet is right and this file is stale.

Paper is `:root`, Ink is `.dark`. Every text pair named in a usage note holds 4.5:1 or better in both themes; borders, focus rings and chart marks hold 3:1.


## Colour

| Token | Paper | Ink | Usage |
| --- | --- | --- | --- |
| `background` | `#faf7f2` | `#15120f` | The page. Tailwind `bg-background`. Warm off-white and warm near-black — never pure #fff or #000. |
| `foreground` | `#1c1815` | `#f0e9de` | Headings, post titles, article body. Clears 4.5:1 on background, card, popover, secondary, muted and primary-soft. |
| `card` | `#faf7f2` | `#15120f` | Deliberately identical to background: this site has no raised cards, and a shadcn Card here should read as a plain block. Change both together if that ever stops being true. |
| `card-foreground` | `#1c1815` | `#f0e9de` | Text inside a shadcn Card. Same value as foreground. |
| `popover` | `#f3eee5` | `#1e1a16` | One step off the page so menus, the command palette and tooltips separate from it without a shadow. |
| `popover-foreground` | `#1c1815` | `#f0e9de` | Text inside a popover, on popover. |
| `primary` | `#a04a2c` | `#e58f68` | The clay brand colour: prose links, the active tab's underline, the rule under the site name, the one solid button. Tailwind `bg-primary` / `text-primary`. On background, secondary, muted and popover. |
| `primary-foreground` | `#fdf9f6` | `#1a120d` | Label on a solid primary fill. Light ink in Paper, dark ink in Ink — primary lightens in the dark theme, so this is never literally white. |
| `primary-strong` | `#83381f` | `#f2a583` | Extension: hovered and focused links, the active filter chip's label. Use instead of shadcn's `primary/90` opacity trick for text, which loses contrast. On background, secondary and primary-soft. |
| `primary-soft` | `#f4e5dc` | `#32241b` | Extension: the tinted fill behind a selected filter chip and the resume's download row. Carries foreground or primary-strong, never primary. |
| `secondary` | `#f3eee5` | `#1e1a16` | Raised ground: hovered post rows, the footer band, shadcn's secondary button. Tailwind `bg-secondary`. |
| `secondary-foreground` | `#1c1815` | `#f0e9de` | Text on secondary. |
| `muted` | `#e9e2d6` | `#29231d` | Wells: code blocks, blockquote grounds, the photo frame before an image loads, skeletons. Tailwind `bg-muted`. |
| `muted-foreground` | `#574e45` | `#b5a999` | Secondary prose: post summaries, resume bullets, photo captions. On background, secondary, muted and popover. |
| `meta-foreground` | `#6b6257` | `#9c9080` | Extension, one step quieter than muted-foreground: anything set in the mono styles — dates, tag words, inactive tabs, footer links. Still clears 4.5:1 on background, secondary, muted and popover. |
| `accent` | `#f3eee5` | `#1e1a16` | shadcn's hover/active surface for menu items, select options and ghost buttons — NOT the brand colour. Equal to secondary by design, as in shadcn's own default. |
| `accent-foreground` | `#1c1815` | `#f0e9de` | Text on a hovered menu item or ghost button. |
| `destructive` | `#a32718` | `#f08a76` | Form errors and a delete confirmation, if this site ever grows one. A warm red chosen to sit in the palette. On background, secondary and muted. |
| `destructive-foreground` | `#fdf9f6` | `#1a120d` | Label on a solid destructive fill. Kept for shadcn components that still reference it; newer ones hard-code white, so override those to this token. |
| `border` | `#e2dacc` | `#332c24` | Decorative hairlines: between post rows, under the header, between resume entries. Tailwind `border-border`. Never the sole indicator of anything. |
| `input` | `#8a7f6f` | `#7d7161` | Meaningful edges: field borders, chip and outline-button outlines. Clears 3:1 on background, secondary and muted in both themes — deliberately darker than shadcn's default, which does not. |
| `ring` | `#a04a2c` | `#e58f68` | The focus ring: 2px solid, 2px offset, on every interactive element. Clears 3:1 on every surface in both themes. |
| `chart-1` | `#ca7544` | `#97522b` | First chart series, clay. Lightest of the ramp — a mark or fill only, never text: it holds 3:1 on background but not 4.5:1. |
| `chart-2` | `#38748a` | `#448ca7` | Second chart series, teal. 4.5:1 on background in both themes. |
| `chart-3` | `#4a5822` | `#90ad43` | Third chart series, olive. Use chart-1, chart-3 and chart-5 for a three-series chart — that subset separates by 2:1 or better, so it survives greyscale and colour blindness. |
| `chart-4` | `#552a3a` | `#dfbeca` | Fourth chart series, plum. |
| `chart-5` | `#251f33` | `#e9e6ef` | Fifth chart series, near-ink. The ramp is staggered by lightness as well as hue, but five series only separate by about 1.35:1 each — direct-label every series rather than relying on a legend. |
| `tag-software` | `#3d6672` | `#8fc2d0` | The 6px dot marking a Software post, beside the word 'software' in meta-foreground. The dot never carries the meaning alone. |
| `tag-travel` | `#6f6329` | `#c9b573` | The dot marking a Travel post, always beside its word. |
| `tag-personal` | `#82465a` | `#d1949e` | The dot marking a Personal post, always beside its word. |

## Type

Families, exposed to Tailwind as `font-serif`, `font-sans`, `font-mono`:

- `serif` — `"Newsreader", Georgia, "Times New Roman", serif`
- `sans` — `"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif`
- `mono` — `"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace`

All three load from Google Fonts; there are no font binaries in the project.

| Style | Family | Size / line | Weight | Usage |
| --- | --- | --- | --- | --- |
| `.display-xl` | serif | 44px / 48px | 500 | The site name in the home hero. Once per page. Tailwind: text-[44px]/[48px] font-serif font-medium tracking-tight. (tracking -0.012em) |
| `.display-l` | serif | 32px / 38px | 500 | The title of a tab page: blog, photography, me, resume. (tracking -0.006em) |
| `.display-m` | serif | 24px / 31px | 500 | An article's own title, and each role name on the resume. At this size 3:1 contrast would suffice, but every pair here clears 4.5:1 anyway. |
| `.display-s` | serif | 19px / 26px | 500 | Post titles in a list, section headings inside prose, photo set names. |
| `.body-l` | serif | 19px / 32px | 400 | Article body on blog posts and the me page. The reading size — never smaller for long text. |
| `.body-base` | serif | 17px / 28px | 400 | Default page text: post summaries, resume bullets, intro paragraphs. |
| `.body-s` | serif | 15px / 24px | 400 | Photo captions, footnotes, the footer's one sentence. |
| `.quote` | serif | 19px / 32px | 400 | Pull quotes and blockquotes inside prose. (italic) |
| `.nav` | sans | 15px / 20px | 500 | The four tab labels in the header. |
| `.label` | sans | 13px / 18px | 500 | Filter chip labels, shadcn Label and Badge text. |
| `.btn-label` | sans | 15px / 20px | 500 | Every button label, including shadcn's Button — override its default text-sm to this. |
| `.meta` | mono | 12px / 16px | 400 | Dates and tag words beside post titles and photo sets. Upper-cased by `global.css`, so write the text in lower case. (tracking 0.08em) |
| `.tabular` | mono | 13px / 20px | 400 | Resume date ranges, so the columns line up down the page. |
| `.code` | mono | 14px / 22px | 400 | Inline code and code blocks inside prose. |

Note: two class names differ from the design system's token names to avoid colliding with Tailwind's own utilities — `body` is `.body-base` and `button` is `.btn-label`.


## Spacing

Tailwind's own 0.25rem scale, named so each token is the utility: space-4 is p-4, gap-4, mt-4. Only the steps this site actually uses are defined.

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | `4px` | gap-1 — between a tag dot and its word. |
| `space-2` | `8px` | gap-2 — inside a chip, between a date and a title on one line. |
| `space-3` | `12px` | gap-3 — chip to chip, and the photo grid gutter on mobile. |
| `space-4` | `16px` | p-4 — post row padding, photo grid gutter, paragraph spacing in prose. |
| `space-6` | `24px` | p-6 — the page gutter, the gap between tabs, the space under a page title. |
| `space-8` | `32px` | mt-8 — between resume entries and between prose sections. |
| `space-12` | `48px` | mt-12 — between page regions: header to content, content to footer. |
| `space-16` | `64px` | mt-16 — around the home hero and above the footer on long pages. |
| `space-24` | `96px` | pt-24 — the top of the home hero, desktop only. |

## Radius

shadcn derives its radii from one --radius with calc(); these are the computed values for --radius: 0.25rem. This site is squarer than shadcn's default 0.625rem on purpose — photographs and the header stay hard-edged.

| Token | Value | Usage |
| --- | --- | --- |
| `radius` | `0.25rem` | The base, 4px. Set this one value in globals.css and shadcn derives the rest. |
| `radius-sm` | `0.15rem` | rounded-sm, 2.4px — inline code spans. |
| `radius-md` | `0.2rem` | rounded-md, 3.2px — shadcn's default for inputs and badges. |
| `radius-lg` | `0.25rem` | rounded-lg, 4px — buttons, code blocks, hovered post rows. |
| `radius-xl` | `0.35rem` | rounded-xl, 5.6px — the one card on the resume, the download row, the portrait on the me page. |
| `radius-full` | `9999px` | rounded-full — filter chips and the category dots. |
| `radius-none` | `0` | rounded-none — photographs (the me-page portrait excepted), rules and the header. The default for imagery in this system. |

## Shadow

Almost none. Depth comes from borders and surface steps. Named to match Tailwind's shadow-xs and shadow-lg.

| Token | Paper | Ink | Usage |
| --- | --- | --- | --- |
| `shadow-xs` | `0 1px 2px rgba(28, 24, 21, 0.06)` | `0 1px 2px rgba(0, 0, 0, 0.5)` | The sticky header once the page has scrolled, and shadcn's Button, which expects shadow-xs. |
| `shadow-lg` | `0 8px 24px rgba(28, 24, 21, 0.12)` | `0 8px 24px rgba(0, 0, 0, 0.6)` | The lightbox frame on the photography tab, and Dialog content. |

## Layout

Two widths only: prose and gallery. Expose them to Tailwind as container tokens so they read as max-w-content and max-w-wide.

| Token | Value | Usage |
| --- | --- | --- |
| `container-content` | `680px` | max-w-content — every text column: blog, me, resume. |
| `container-wide` | `1100px` | max-w-wide — the photo grid, the lightbox and the header's inner bounds. |
| `page-gutter` | `24px` | px-6 — left and right page padding below 720px. |
