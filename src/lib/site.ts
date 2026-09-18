import { DEFAULT_LOCALE, LOCALES, localizePath, stripLocale, type Locale } from "@/lib/routes";

export { DEFAULT_LOCALE, LOCALES, stripLocale };
export type { Locale };

// `path` is always the canonical route, e.g. "/" or "/blog?tag=travel".
export function withLocale(path: string, locale: Locale): string {
  const [pathname, ...query] = path.split("?");
  const url = localizePath(pathname, locale);
  return query.length ? `${url}?${query.join("?")}` : url;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "pt" : "en";
}

interface SiteCopy {
  name: string;
  tagline: string;
  /** The home page's <title>; other pages use "<section> — <name>". */
  homeTitle: string;
  footerNote: string;
}

export const SITE: Record<Locale, SiteCopy> = {
  en: {
    name: "Alexandre Serra",
    tagline: "Just a guy trying to reach his future self.",
    homeTitle: "Alexandre Serra",
    footerNote: "From Lisbon, Portugal. No trackers, no cookies.",
  },
  pt: {
    name: "Alexandre Serra",
    tagline: "Um gajo a tentar alcançar o seu eu futuro.",
    homeTitle: "Alexandre Serra",
    footerNote: "Desde Lisboa, Portugal. Sem rastreadores nem bolachinhas.",
  },
};

interface Tab {
  id: string;
  label: string;
  href: string;
}

const tab = (locale: Locale, id: string, label: string): Tab => ({
  id,
  label,
  href: withLocale(`/${id}`, locale),
});

export const TABS: Record<Locale, Tab[]> = {
  en: [
    tab("en", "blog", "blog"),
    tab("en", "photography", "photography"),
    tab("en", "me", "me"),
    tab("en", "resume", "resume"),
  ],
  pt: [
    tab("pt", "blog", "blog"),
    tab("pt", "photography", "fotografia"),
    tab("pt", "me", "eu"),
    tab("pt", "resume", "currículo"),
  ],
};

interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}

export const FOOTER_LINKS: Record<Locale, FooterLink[]> = {
  en: [
    { label: "email", href: "mailto:me@alexandreserra.com", external: false },
    { label: "github", href: "https://github.com/amserra", external: true },
    { label: "linkedin", href: "https://linkedin.com/in/alexandre-serra/", external: true },
    { label: "rss", href: "/rss.xml", external: false },
  ],
  pt: [
    { label: "email", href: "mailto:me@alexandreserra.com", external: false },
    { label: "github", href: "https://github.com/amserra", external: true },
    { label: "linkedin", href: "https://linkedin.com/in/alexandre-serra/", external: true },
    { label: "rss", href: "/pt/rss.xml", external: false },
  ],
};

// Category keys stay in English everywhere (schema, data attributes, ?tag=
// URLs) so links and filters work the same in both locales. Only the
// displayed word is translated, via UI.categories below.
export type Category = "software" | "travel" | "personal";

interface UiCopy {
  skipToContent: string;
  switchTheme: string;
  language: string;
  home: {
    heading: string;
    intro: string;
    moreAboutMe: string;
    readResume: string;
    latestWriting: string;
    allPosts: (count: number) => string;
  };
  blog: {
    title: string;
    /** The <title> phrase; `title` is the visible heading (capitalised). */
    metaTitle: string;
    metaDescription: string;
    intro: (count: number) => string;
    filterAll: string;
    categories: Record<Category, string>;
    noPostsYetTemplate: string;
    backToAllPosts: string;
  };
  me: {
    title: string;
    /** The <title> phrase; `title` is the visible heading (capitalised). */
    metaTitle: string;
    metaDescription: string;
    paragraphs: string[];
    emailMe: string;
    professionalVersion: string;
  };
  resume: {
    title: string;
    /** The <title> phrase; `title` is the visible heading (capitalised). */
    metaTitle: string;
    metaDescription: string;
    subtitle: string;
    /** The CV button names the view that is showing; both download the same PDF. */
    downloadCvProfessional: string;
    downloadCvPersonal: string;
    experience: string;
    education: string;
    projects: string;
    skills: string;
    tools: string;
    /** Label for the professional/full view toggle, and its two options. */
    viewLabel: string;
    viewProfessional: string;
    viewFull: string;
  };
  photography: {
    title: string;
    /** The <title> phrase; `title` is the visible heading (capitalised). */
    metaTitle: string;
    metaDescription: string;
    intro: string;
    months: string[];
  };
}

export const UI: Record<Locale, UiCopy> = {
  en: {
    skipToContent: "Skip to content",
    switchTheme: "Switch theme",
    language: "Language",
    home: {
      heading: "Hey, I'm Alexandre :)",
      intro:
        "Welcome to my little corner on the internet! I like travel, sports, tech, and photography. Pokémon, gym, and pokémon gyms as well. Current occupations: part-time athlete, part-time software engineer, and full-time looking to be better every day. By the way, do you have travel recommendations?",
      moreAboutMe: "More about me",
      readResume: "Read the resume",
      latestWriting: "Latest writing",
      allPosts: (count) => `All ${count} posts`,
    },
    blog: {
      title: "Blog",
      metaTitle: "Blog",
      metaDescription: "Writing on software, travel and everything else.",
      intro: (count) =>
        `I've written ${count} posts here so far. I write about software, travel and everything else. Peak at your own risk.`,
      filterAll: "all",
      categories: { software: "software", travel: "travel", personal: "personal" },
      noPostsYetTemplate: "No {category} posts yet.",
      backToAllPosts: "← all posts",
    },
    me: {
      title: "About me",
      metaTitle: "About me",
      metaDescription:
        "Part-time athlete, part-time software engineer, and full-time looking to be better every day.",
      paragraphs: [
        "I'm a software engineer with a passion for computers that goes back to my early childhood. I've been fascinated by technology since I was ten, and that eventually turned the interest into a profession.",
        "What I enjoy most about the work is building software that solves real problems. I get the most out of projects where the result is visible — a process that got simpler, a task that got faster, a system that people actually use. Seeing the effect of the work is what keeps me in the field.",
        "Alongside engineering, I've spent over eleven years as a water polo athlete, and I've had the honour of representing my national team. I play at Sporting Clube de Portugal, in the Portuguese first division, and I also run communications for the club's water polo section — which is how the photography started.",
        "Both the sport and the work reward the same thing: attention to detail and a willingness to redo something until it's right. That's most of my approach, in one sentence.",
      ],
      emailMe: "Email me",
      professionalVersion: "The professional version",
    },
    resume: {
      title: "Resume",
      metaTitle: "Resume: full-stack software engineer",
      metaDescription:
        "Full-stack software engineer, currently in Lisbon. Experience, education, projects and skills.",
      subtitle:
        "Full-stack software engineer, currently in Lisbon. Available as a PDF if you prefer it that way.",
      downloadCvProfessional: "Download professional CV (PDF)",
      downloadCvPersonal: "Download personal CV (PDF)",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
      tools: "Tools",
      viewLabel: "Resume view",
      viewProfessional: "professional",
      viewFull: "full",
    },
    photography: {
      title: "Photography",
      metaTitle: "Photography",
      metaDescription: "Shot on whatever I got my hands on at the time.",
      intro:
        "Shot on whatever I got my hands on at the time. Usually either my iPhone 15 Pro or my Sony RX100 VII. Or maybe someone sent me a photo and I felt it belonged here.",
      months: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
    },
  },
  pt: {
    skipToContent: "Saltar para o conteúdo",
    switchTheme: "Mudar de tema",
    language: "Idioma",
    home: {
      heading: "Olá, sou o Alexandre :)",
      intro:
        "Bem-vindo ao meu cantinho na internet! Gosto de viajar, desporto, tecnologia e fotografia. Pokémon, ginásio e ginásios de pokémon também. Ocupações atuais: atleta a tempo parcial, informático a tempo parcial, e à procura de ser melhor a cada dia a tempo inteiro. Já agora, tens recomendações de viagem?",
      moreAboutMe: "Mais sobre mim",
      readResume: "Ver o currículo",
      latestWriting: "Últimos artigos",
      allPosts: (count) => `Todos os ${count} artigos`,
    },
    blog: {
      title: "Blog",
      metaTitle: "Blog",
      metaDescription: "Artigos sobre software, viagens e tudo o resto.",
      intro: (count) =>
        `Já escrevi ${count} artigos aqui. Escrevo sobre software, viagens e tudo o resto. Espreita por tua conta e risco.`,
      filterAll: "todos",
      categories: { software: "software", travel: "viagens", personal: "pessoal" },
      noPostsYetTemplate: "Ainda não há posts de {category}.",
      backToAllPosts: "← todos os posts",
    },
    me: {
      title: "Sobre mim",
      metaTitle: "Sobre mim",
      metaDescription:
        "Atleta a tempo parcial, informático a tempo parcial, e à procura de ser melhor a cada dia a tempo.",
      paragraphs: [
        "Sou engenheiro de software e a paixão por computadores vem da infância. Sou fascinado pela tecnologia desde os dez anos, e esse interesse acabou por se tornar profissão.",
        "O que mais gosto no trabalho é construir software que resolve problemas reais. Tiro o máximo partido de projetos em que o resultado é visível — um processo que ficou mais simples, uma tarefa que ficou mais rápida, um sistema que as pessoas realmente usam. Ver o efeito do trabalho é o que me mantém na área.",
        "Para além da engenharia, já são mais de onze anos como atleta de polo aquático, e tive a honra de representar a seleção nacional. Jogo no Sporting Clube de Portugal, na primeira divisão portuguesa, e também sou responsável pela comunicação da secção de polo aquático do clube — foi assim que a fotografia começou.",
        "Tanto o desporto como o trabalho recompensam a mesma coisa: atenção ao detalhe e vontade de refazer algo até estar certo. É a minha forma de trabalhar, resumida numa frase.",
      ],
      emailMe: "Enviar email",
      professionalVersion: "A versão profissional",
    },
    resume: {
      title: "Currículo",
      metaTitle: "Currículo: engenheiro de software full-stack",
      metaDescription:
        "Engenheiro de software full-stack em Lisboa. Experiência, formação, projetos e competências.",
      subtitle:
        "Engenheiro de software full-stack em Lisboa. Disponível em PDF, se preferires assim.",
      downloadCvProfessional: "Descarregar CV profissional (PDF)",
      downloadCvPersonal: "Descarregar CV pessoal (PDF)",
      experience: "Experiência",
      education: "Formação",
      projects: "Projetos",
      skills: "Competências",
      tools: "Ferramentas",
      viewLabel: "Vista do currículo",
      viewProfessional: "profissional",
      viewFull: "completo",
    },
    photography: {
      title: "Fotografia",
      metaTitle: "Fotografia",
      metaDescription: "Tirado com o que tinha à mão na altura.",
      intro:
        "Tirado com o que tinha à mão na altura. Normalmente com o meu iPhone 15 Pro ou com a minha Sony RX100 VII. Ou talvez alguém me enviou uma foto e eu achei que pertencia aqui.",
      months: [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
    },
  },
};

const MONTHS_SHORT: Record<Locale, string[]> = {
  en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
};

// Day-month-year, never relative — these pages are read years later.
export function formatDate(value: Date | string, locale: Locale = DEFAULT_LOCALE) {
  const d = value instanceof Date ? value : new Date(value);
  return `${d.getDate()} ${MONTHS_SHORT[locale][d.getMonth()]} ${d.getFullYear()}`;
}
