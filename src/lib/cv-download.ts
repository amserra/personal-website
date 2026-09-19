// Browser entry for the resume button: fetch the fonts, build the PDF, save it.
// Loaded with a dynamic import on click, so jsPDF and the fonts cost nothing until then.

import hindLight from "@/assets/fonts/Hind_300Light.ttf?url";
import hind from "@/assets/fonts/Hind_400Regular.ttf?url";
import plexMedium from "@/assets/fonts/IBMPlexSans_500Medium.ttf?url";
import plexBold from "@/assets/fonts/IBMPlexSans_700Bold.ttf?url";
import {
  buildCvPdf,
  cvFileName,
  FONT_KEYS,
  type CvOptions,
  type FontFiles,
  type FontKey,
} from "@/lib/cv-pdf";

const FONT_URLS: Record<FontKey, string> = {
  hindLight,
  hind,
  plexMedium,
  plexBold,
};

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000)
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function loadFonts(): Promise<FontFiles> {
  const entries = await Promise.all(
    FONT_KEYS.map(async (key) => {
      const res = await fetch(FONT_URLS[key]);
      if (!res.ok) throw new Error(`Could not load font ${key}`);
      return [key, toBase64(await res.arrayBuffer())] as const;
    }),
  );
  return Object.fromEntries(entries) as FontFiles;
}

export async function downloadCv(options: CvOptions): Promise<void> {
  const doc = buildCvPdf(options, await loadFonts());
  doc.save(cvFileName(options.locale, options.view));
}
