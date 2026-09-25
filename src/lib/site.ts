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
  /** Where I am, as the resume PDF header states it. */
  location: string;
  tagline: string;
  /** The home page's <title>; other pages use "<section> — <name>". */
  homeTitle: string;
  footerNote: string;
}

export const SITE: Record<Locale, SiteCopy> = {
  en: {
    name: "Alexandre Serra",
    location: "Lisbon, Portugal",
    tagline: "Chasing my future self.",
    homeTitle: "Alexandre Serra",
    footerNote: "From Lisbon, Portugal. No trackers, no cookies.",
  },
  pt: {
    name: "Alexandre Serra",
    location: "Lisboa, Portugal",
    tagline: "Atrás do meu eu futuro.",
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

// The one place contact details live: the footer and the generated CV read these.
export const CONTACT = {
  email: "me@alexandreserra.com",
  github: "https://github.com/amserra",
  linkedin: "https://linkedin.com/in/alexandre-serra/",
} as const;

// The newsletter is English-only: one Kit form, posted to directly (no JS, no
// backend). Kit's "Embed → HTML" view shows these values.
export const NEWSLETTER = {
  action: "https://app.kit.com/forms/9952924/subscriptions",
  formId: "9952924",
  uid: "322308f6ae",
} as const;

export const FOOTER_LINKS: Record<Locale, FooterLink[]> = {
  en: [
    { label: "email", href: `mailto:${CONTACT.email}`, external: false },
    { label: "github", href: CONTACT.github, external: true },
    { label: "linkedin", href: CONTACT.linkedin, external: true },
    { label: "rss", href: "/rss.xml", external: false },
  ],
  pt: [
    { label: "email", href: `mailto:${CONTACT.email}`, external: false },
    { label: "github", href: CONTACT.github, external: true },
    { label: "linkedin", href: CONTACT.linkedin, external: true },
    { label: "rss", href: "/pt/rss.xml", external: false },
  ],
};

// Category keys stay in English everywhere (schema, data attributes, ?tag=
// URLs) so links and filters work the same in both locales. Only the
// displayed word is translated, via UI.categories below.
export type Category = "software" | "travel" | "personal" | "history";

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
  subscribe: {
    heading: string;
    blurb: string;
    emailLabel: string;
    button: string;
    /** Who holds the address, and that a confirmation email comes first. */
    note: string;
    /** Shown after Kit redirects back with ?subscribed=true; the confirmation email is still pending. */
    success: string;
    /** Link text to "why I started this site", shown after `success`. */
    successLink: string;
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
    portraitCaption: string;
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
    generatingCv: string;
    cvError: string;
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
        "Welcome to my little corner on the internet! I like travel, sports, tech, and photography. Current occupations: part-time athlete, part-time software engineer, and full-time looking to be better every day. By the way, do you have travel recommendations?",
      moreAboutMe: "More about me",
      readResume: "Read the resume",
      latestWriting: "Latest writing",
      allPosts: (count) => `All ${count} posts`,
    },
    subscribe: {
      heading: "newsletter",
      blurb: "Get new posts and occasional updates straight to your inbox. Unsubscribe anytime.",
      emailLabel: "Email address",
      button: "Subscribe",
      note: "I won't bother you with spam. Expect an email every other week.",
      success: "You're on the list. Check your inbox to confirm your address.",
      successLink: "In the meantime, read why I started this website.",
    },
    blog: {
      title: "Blog",
      metaTitle: "Blog",
      metaDescription: "Writing on software, travel and everything else.",
      intro: (count) =>
        `I've written ${count} posts here so far. I write about software, travel and everything else. I use AI to proofread grammar, spelling and fact-check, but the base writing is always done by me.`,
      filterAll: "all",
      categories: {
        software: "software",
        travel: "travel",
        personal: "personal",
        history: "history",
      },
      noPostsYetTemplate: "No {category} posts yet.",
      backToAllPosts: "← all posts",
    },
    me: {
      title: "About me",
      metaTitle: "About me",
      metaDescription:
        "Part-time athlete, part-time software engineer, and full-time looking to be better every day.",
      paragraphs: [
        "Hey, I'm Alexandre. I was born in Coimbra, Portugal, and I currently live in Lisbon.",
        "I'm an outgoing person who loves trying new things. I find myself likable and easy to get along with, but sometimes it takes me a while to show that side of me. I consider myself a good friend, and I try to be there for the people I care about. That means the occasional random phone call, text, or (my favorite) a facetime call. I like to think that I have a good sense of humor, and I enjoy making people laugh.",
        "I like to think of myself as a lifelong learner. I try to learn something new every day, whether it's a new skill, a new fact, or a new perspective. I believe that learning is the key to personal growth and development.",
        "Ever since I was a kid, I've been fascinated by technology. I got my first computer when I was ten, and that eventually turned the interest into a profession.",
        "Alongside engineering, I've always had a passion for sports. I was always an introvert, so my parents kinda forced me to get into a team sport. Which ended up with me playing water polo for over fourteen years, playing for the national team and being runner-up in the Portuguese championship with Sporting.",
        "I've travelled for most of my life and it's one of the things I enjoy the most. Even though I've travelled a lot, I feel I haven't travelled enough. I find the feeling of being completly displaced so fascinating. Next year I'll be the farthest and longest away from home I've ever been, and I can't wait to see what that feels like.",
      ],
      emailMe: "Email me",
      portraitCaption: "Photo taken in Seoul.",
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
      generatingCv: "Generating PDF…",
      cvError: "Could not generate the PDF. Try again.",
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
        "Bem-vindo ao meu cantinho na internet! Gosto de viajar, desporto, tecnologia e fotografia. Ocupações atuais: atleta a tempo parcial, informático a tempo parcial, e à procura de ser melhor a cada dia a tempo inteiro. Já agora, tens recomendações de viagem?",
      moreAboutMe: "Mais sobre mim",
      readResume: "Ver o currículo",
      latestWriting: "Últimos artigos",
      allPosts: (count) => `Todos os ${count} artigos`,
    },
    subscribe: {
      heading: "newsletter",
      blurb:
        "Recebe novos artigos e novidades ocasionais, diretamente na tua caixa de correio. Podes cancelar a qualquer momento.",
      emailLabel: "Endereço de email",
      button: "Subscrever",
      note: "Não te vou encher de spam. Conta com um email de duas em duas semanas.",
      success: "Estás na lista. Verifica a tua caixa de correio para confirmares o endereço.",
      successLink: "Entretanto, lê porque criei este site.",
    },
    blog: {
      title: "Blog",
      metaTitle: "Blog",
      metaDescription: "Artigos sobre software, viagens e tudo o resto.",
      intro: (count) =>
        `Já escrevi ${count} artigos aqui. Escrevo sobre software, viagens e tudo o resto. Uso IA para rever a gramática, ortografia e fazer verificação de fatos, mas a escrita base é feita sempre por mim.`,
      filterAll: "todos",
      categories: {
        software: "software",
        travel: "viagens",
        personal: "pessoal",
        history: "história",
      },
      noPostsYetTemplate: "Ainda não há posts de {category}.",
      backToAllPosts: "← todos os posts",
    },
    me: {
      title: "Sobre mim",
      metaTitle: "Sobre mim",
      metaDescription:
        "Atleta a tempo parcial, informático a tempo parcial, e à procura de ser melhor a cada dia a tempo.",
      paragraphs: [
        "Olá, sou o Alexandre. Nasci em Coimbra, e atualmente vivo em Lisboa.",
        "Sou uma pessoa extrovertida que adora experimentar coisas novas. Considero-me simpático e empático, mas às vezes demoro algum tempo a mostrar esse meu lado. Considero-me um bom amigo e tento estar presente para as pessoas de quem gosto. Isso significa o telefonema aleatório ocasional, uma mensagem ou (a minha preferida) uma chamada de FaceTime. Gosto de pensar que tenho um bom sentido de humor e que gosto de fazer rir as pessoas.",
        "Gosto de me ver como um eterno aprendiz. Tento aprender algo novo todos os dias, seja uma nova competência, um novo facto ou uma nova perspetiva. Acredito que aprender é a chave para o crescimento e desenvolvimento pessoal.",
        "Desde criança que sou fascinado pela tecnologia. Tive o meu primeiro computador aos dez anos, e esse interesse acabou por se transformar na minha profissão.",
        "Para além da engenharia, sempre tive uma paixão pelo desporto. Sempre fui introvertido, por isso os meus pais meio que me obrigaram a praticar um desporto de equipa. Isso acabou por me levar a jogar polo aquático durante mais de catorze anos, tendo representado a seleção nacional e sido vice-campeão do campeonato pelo Sporting.",
        "Viajo desde sempre e é uma das coisas de que mais me dá prazer. Apesar de ter viajado bastante, sinto que ainda não viajei o suficiente. Acho fascinante a sensação de estar completamente deslocado. No próximo ano vou estar mais longe e mais tempo fora de casa do que alguma vez estive, e mal posso esperar.",
      ],
      emailMe: "Enviar email",
      portraitCaption: "Fotografia tirada em Seul.",
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
      generatingCv: "A gerar o PDF…",
      cvError: "Não foi possível gerar o PDF. Tenta outra vez.",
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
