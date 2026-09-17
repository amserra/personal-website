export const SITE = {
  name: "Alexandre Serra",
  tagline: "Software engineer in Portugal. I write about what I build, where I go, and what I photograph.",
  footerNote: "Written in Lisbon. Set in Newsreader. No trackers, no cookies.",
} as const;

export const TABS = [
  { id: "blog", label: "blog", href: "/blog" },
  { id: "photography", label: "photography", href: "/photography" },
  { id: "me", label: "me", href: "/me" },
  { id: "resume", label: "resume", href: "/resume" },
] as const;

export const FOOTER_LINKS = [
  { label: "email", href: "mailto:me@alexandreserra.com", external: false },
  { label: "github", href: "https://github.com/amserra", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/alexandre-serra/", external: true },
  { label: "rss", href: "/rss.xml", external: false },
] as const;

// Day-month-year, never relative — these pages are read years later.
export function formatDate(value: Date | string) {
  const d = value instanceof Date ? value : new Date(value);
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
