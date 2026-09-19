// Social card for one blog post: 1200×630 PNG, drawn at build time with satori.
// Colours are the Paper theme from global.css — a card is a static image, so it
// can't follow the reader's theme; keep these in step with the tokens.

import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { SITE, formatDate, type Locale } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = {
  background: "#faf7f2",
  foreground: "#1c1815",
  primary: "#a04a2c",
  meta: "#6b6257",
};

let font: Buffer | undefined;
const loadFont = async () =>
  (font ??= await readFile(path.join(process.cwd(), "src/assets/fonts/IBMPlexSans_500Medium.ttf")));

interface CardPost {
  title: string;
  date: Date;
}

// Satori has no autofit; step the size down so a long title stays within three lines.
const titleSize = (title: string) => (title.length <= 36 ? 84 : title.length <= 60 ? 68 : 56);

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

export async function renderOgCard(post: CardPost, locale: Locale, siteUrl: URL): Promise<Buffer> {
  const meta = { fontSize: 28, color: PAPER.meta, letterSpacing: 1 };

  const card = el(
    "div",
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 80,
      background: PAPER.background,
      color: PAPER.foreground,
      fontFamily: "IBM Plex Sans",
      fontWeight: 500,
    },
    [
      el("div", { flexDirection: "column", gap: 16 }, [
        el("div", { fontSize: 36 }, SITE[locale].name),
        el("div", { width: 64, height: 4, background: PAPER.primary }),
      ]),
      el("div", { fontSize: titleSize(post.title), lineHeight: 1.12 }, post.title),
      el("div", { justifyContent: "space-between", alignItems: "center" }, [
        el("div", meta, formatDate(post.date, locale)),
        el("div", meta, siteUrl.host),
      ]),
    ],
  );

  const svg = await satori(card as never, {
    ...OG_SIZE,
    fonts: [{ name: "IBM Plex Sans", data: await loadFont(), weight: 500, style: "normal" }],
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
