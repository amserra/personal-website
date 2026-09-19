// Builds the downloadable CV in the browser, in the layout of the hand-made PDF it
// replaced: a centred header, then sections with a hairline rule, a muted meta column
// on the left (period, @ org, location) and the role and bullets on the right.
// Pure of Astro/Vite imports so it can run anywhere; cv-download.ts supplies the fonts.

import { jsPDF } from "jspdf";
import { EDUCATION, EXPERIENCE, PROJECTS, SKILLS, type Entry } from "@/lib/resume";
import { CONTACT, SITE, UI, type Locale } from "@/lib/site";

export type CvView = "professional" | "full";

export const FONT_KEYS = ["hindLight", "hind", "plexMedium", "plexBold"] as const;
export type FontKey = (typeof FONT_KEYS)[number];
/** Base64-encoded TTF per font. */
export type FontFiles = Record<FontKey, string>;

export interface CvOptions {
  locale: Locale;
  view: CvView;
  /** Absolute site URL, e.g. "https://alexandreserra.com". */
  siteUrl: string;
}

type Rgb = [number, number, number];

// Measured from the previous PDF (A4, points).
const MARGIN = 42;
const COL2_X = 182;
const LEFT_W = COL2_X - MARGIN - 6;
const BULLET_INDENT = 8.4;
const HEADER = { name: 17.8, nameY: 48, urlY: 65, contactY: 80, ruleY: 96 };
const SIZE = { body: 10.5, label: 10, meta: 9.5, heading: 12 };
const PITCH = { left: 16, title: 14, bullet: 13.3 };
const TITLE_TO_BULLETS = 19;
const RULE_TO_HEADING = 15;
const HEADING_TO_FIRST = 16.8;

const INK: Rgb = [17, 17, 17];
const MUTED: Rgb = [150, 150, 150];
const ORG: Rgb = [120, 120, 120];
const RULE: Rgb = [170, 170, 170];
const LINK: Rgb = [5, 99, 193];

interface Item {
  period: string;
  /** Shown as "@ org" in the left column. */
  org?: string;
  meta?: string;
  title: string;
  bullets: string[];
  tech?: string;
}

const toPeriod = (p: string) => p.replace(" — ", " – ");

function fromEntry(e: Entry): Item {
  return {
    period: toPeriod(e.period),
    org: e.org,
    meta: e.location,
    title: e.role,
    bullets: e.bullets ?? [],
    tech: e.tech?.join(" · "),
  };
}

// resume.ts stores a project's name in `role` and its description in `org`; the layout
// wants "@ name" on the left and the description as the heading.
function fromProject(e: Entry): Item {
  return {
    period: toPeriod(e.period),
    org: e.role,
    title: e.org ?? e.role,
    bullets: e.bullets ?? [],
    tech: e.tech?.join(" · "),
  };
}

// The old PDF was one page. Longer content (the Portuguese copy, a new role) is laid
// out again with tighter vertical spacing until it fits, before it is allowed onto a
// second page.
const DENSITIES = [1, 0.9, 0.8];

export function buildCvPdf(options: CvOptions, fonts: FontFiles): jsPDF {
  let doc = render(options, fonts, DENSITIES[0]);
  for (const k of DENSITIES.slice(1)) {
    if (doc.getNumberOfPages() === 1) break;
    doc = render(options, fonts, k);
  }
  return doc;
}

/** `k` scales the vertical gaps only; type sizes never change. */
function render({ locale, view, siteUrl }: CvOptions, fonts: FontFiles, k: number): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const right = pageW - MARGIN;
  const bottom = pageH - MARGIN;
  const col2W = right - COL2_X;

  for (const key of FONT_KEYS) {
    doc.addFileToVFS(`${key}.ttf`, fonts[key]);
    doc.addFont(`${key}.ttf`, key, "normal", 400, "Identity-H");
  }

  const ui = UI[locale].resume;
  const keep = <T extends { kind: "professional" | "personal" }>(list: T[]) =>
    view === "full" ? list : list.filter((x) => x.kind === "professional");

  const font = (key: FontKey, size: number, color: Rgb) => {
    doc.setFont(key, "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };
  // Typographic apostrophes, as in the previous PDF.
  const wrap = (text: string, width: number) =>
    doc.splitTextToSize(text.replace(/'/g, "’"), width) as string[];
  const rule = (y: number) => {
    doc.setDrawColor(...RULE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y, right, y);
  };
  const link = (text: string, url: string, x: number, y: number) => {
    const w = doc.getTextWidth(text);
    doc.setTextColor(...LINK);
    doc.text(text, x, y);
    doc.setDrawColor(...LINK);
    doc.setLineWidth(0.5);
    doc.line(x, y + 1.6, x + w, y + 1.6);
    doc.link(x, y - SIZE.body, w, SIZE.body + 3, { url });
  };

  // Header: name, site, then the contact line, all centred.
  font("plexBold", HEADER.name, INK);
  doc.text(SITE[locale].name, pageW / 2, HEADER.nameY, { align: "center" });

  font("hind", SIZE.body, INK);
  const site = new URL("/", siteUrl).href;
  link(site, site, (pageW - doc.getTextWidth(site)) / 2, HEADER.urlY);

  const bare = (url: string) => url.replace(/^https?:\/\//, "");
  const parts: { text: string; url?: string }[] = [
    { text: SITE[locale].location },
    { text: CONTACT.email, url: `mailto:${CONTACT.email}` },
    { text: bare(CONTACT.linkedin), url: CONTACT.linkedin },
    { text: bare(CONTACT.github), url: CONTACT.github },
  ];
  const sep = " | ";
  font("hind", SIZE.body, INK);
  const sepW = doc.getTextWidth(sep);
  const total =
    parts.reduce((sum, p) => sum + doc.getTextWidth(p.text), 0) + sepW * (parts.length - 1);
  let x = (pageW - total) / 2;
  parts.forEach((p, i) => {
    if (i > 0) {
      font("hind", SIZE.body, INK);
      doc.text(sep, x, HEADER.contactY);
      x += sepW;
    }
    font("hind", SIZE.body, INK);
    if (p.url) link(p.text, p.url, x, HEADER.contactY);
    else doc.text(p.text, x, HEADER.contactY);
    x += doc.getTextWidth(p.text);
  });

  // An item's height is the distance from its first baseline to its last.
  interface Placed {
    height: number;
    gapAfter: number;
    draw: (top: number) => void;
  }

  function place(item: Item): Placed {
    font("hindLight", SIZE.meta, MUTED);
    const metaLines = [item.meta, item.tech].flatMap((t) => (t ? wrap(t, LEFT_W) : []));
    font("plexMedium", SIZE.meta, ORG);
    const orgLines = item.org ? wrap(`@ ${item.org}`, LEFT_W) : [];
    const leftLines = 1 + orgLines.length + metaLines.length;
    const leftPitch = PITCH.left * k;
    const leftHeight = (leftLines - 1) * leftPitch;

    font("plexMedium", SIZE.body, INK);
    const titleLines = wrap(item.title, col2W);
    font("hind", SIZE.body, INK);
    const bulletLines = item.bullets.map((b) => wrap(b, col2W - BULLET_INDENT));
    const titleHeight = (titleLines.length - 1) * PITCH.title;
    const bulletCount = bulletLines.reduce((n, l) => n + l.length, 0);
    const bulletsTop = titleHeight + TITLE_TO_BULLETS * k;
    const rightHeight = bulletCount ? bulletsTop + (bulletCount - 1) * PITCH.bullet : titleHeight;

    return {
      height: Math.max(leftHeight, rightHeight),
      gapAfter: (bulletCount ? 20 : 16) * k,
      draw(top) {
        let ly = top;
        font("hindLight", SIZE.label, MUTED);
        doc.text(item.period, MARGIN, ly);
        ly += leftPitch;
        font("plexMedium", SIZE.meta, ORG);
        for (const l of orgLines) {
          doc.text(l, MARGIN, ly);
          ly += leftPitch;
        }
        font("hindLight", SIZE.meta, MUTED);
        for (const l of metaLines) {
          doc.text(l, MARGIN, ly);
          ly += leftPitch;
        }

        font("plexMedium", SIZE.body, INK);
        titleLines.forEach((l, i) => doc.text(l, COL2_X, top + i * PITCH.title));
        font("hind", SIZE.body, INK);
        let by = top + bulletsTop;
        for (const lines of bulletLines) {
          doc.text("•", COL2_X, by);
          for (const l of lines) {
            doc.text(l, COL2_X + BULLET_INDENT, by);
            by += PITCH.bullet;
          }
        }
      },
    };
  }

  let y = HEADER.ruleY;

  function section(title: string, count: number, build: () => Placed[], together = false) {
    if (!count) return;
    const placed = build();
    const head = RULE_TO_HEADING + HEADING_TO_FIRST * k;
    const needed = together
      ? placed.reduce((sum, p) => sum + p.height + p.gapAfter, 0) -
        placed[placed.length - 1].gapAfter
      : placed[0].height;
    if (y + head + needed > bottom) {
      doc.addPage();
      y = MARGIN;
    }
    rule(y);
    font("plexBold", SIZE.heading, INK);
    doc.text(title, MARGIN, y + RULE_TO_HEADING);

    let top = y + head;
    placed.forEach((p, i) => {
      if (i > 0) top += placed[i - 1].gapAfter;
      if (top + p.height > bottom) {
        doc.addPage();
        top = MARGIN + SIZE.body;
      }
      p.draw(top);
      top += p.height;
    });
    y = top + 14 * k;
  }

  const items = (title: string, entries: Entry[], map: (e: Entry) => Item) => {
    const kept = keep(entries);
    section(title, kept.length, () => kept.map((e) => place(map(e))));
  };

  items(ui.experience, EXPERIENCE[locale], fromEntry);
  items(ui.education, EDUCATION[locale], fromEntry);
  items(ui.projects, PROJECTS[locale], fromProject);

  const skills = keep(SKILLS[locale]);
  section(
    ui.skills,
    skills.length,
    () =>
      skills.map<Placed>((s) => {
        font("hind", SIZE.body, INK);
        const lines = wrap(s.value, col2W);
        return {
          height: (lines.length - 1) * PITCH.bullet,
          gapAfter: HEADING_TO_FIRST * k,
          draw(top) {
            font("hindLight", SIZE.label, MUTED);
            doc.text(s.label, MARGIN, top);
            font("hind", SIZE.body, INK);
            lines.forEach((l, i) => doc.text(l, COL2_X, top + i * PITCH.bullet));
          },
        };
      }),
    true,
  );

  doc.setProperties({ title: `${SITE[locale].name} — ${ui.title}`, author: SITE[locale].name });
  return doc;
}

export const cvFileName = (locale: Locale, view: CvView) =>
  `alexandre-serra-cv-${locale}${view === "full" ? "-full" : ""}.pdf`;
