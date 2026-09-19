// Every fact here comes from the CV. Bullets are tightened to the design system's
// rules — verb first, outcome named — but no fact is added. This file also feeds the
// downloadable PDF (cv-pdf.ts), so it is the one place to edit the resume.
// The CV's phone number is deliberately left off a public page.
// The pt entries are a translation of the en ones; keep both in sync fact-for-fact.

import type { Locale } from "@/lib/site";

export type Kind = "professional" | "personal";

export interface Entry {
  role: string;
  org?: string;
  location?: string;
  period: string;
  note?: string;
  /** `personal` items appear only in the full view. Required, so none is left untagged. */
  kind: Kind;
  bullets?: string[];
  tech?: string[];
}

export const EXPERIENCE: Record<Locale, Entry[]> = {
  en: [
    {
      role: "Full-Stack Software Engineer",
      org: "Mercell",
      location: "Remote to Utrecht, Netherlands",
      period: "Sep 2025 — present",
      kind: "professional",
      bullets: [
        "Deliver end-to-end features as part of a full-stack team.",
        "Work closely with product owners, product managers, designers and other developers.",
        "Ship features that increased customer satisfaction and platform usability.",
      ],
      tech: ["React", ".NET", "C#", "Java", "AWS"],
    },
    {
      role: "Full-Stack Software Engineer",
      org: "Cleanwatts",
      location: "Remote to Coimbra, Portugal",
      period: "Jan 2023 — Sep 2025",
      kind: "professional",
      bullets: [
        "Planned, built and shipped end-to-end features across the product.",
        "Became a maintainer of Kiplo, an Angular application for managing renewable energy communities, and took on responsibility for the quality of the end product.",
        "Raised the standard of frontend work across the company by introducing modern techniques such as optimistic updates.",
        "Introduced automated testing, which significantly reduced bugs and improved product stability.",
      ],
      tech: ["Angular", ".NET", "C#"],
    },
    {
      role: "Full-Stack Software Engineer",
      org: "Staruplo",
      location: "Remote to Aveiro, Portugal",
      period: "Mar 2022 — Aug 2022",
      kind: "professional",
      bullets: [
        "Enabled continuous integration and delivery through GitHub Actions, improving the development workflow.",
        "Designed and built a new frontend in React, improving experience and speed through caching and revalidation with React Query.",
      ],
      tech: ["React", "Node.JS", "AWS"],
    },
    {
      role: "Research Collaborator",
      org: "INESC-ID",
      location: "Hybrid to Lisbon, Portugal",
      period: "Feb 2021 — May 2022",
      kind: "professional",
      bullets: [
        "Participated in the research of a flood forecasting system, developing machine learning models to predict the risk of flooding in specific areas.",
        "Shipped features on a Django web portal with long-running background tasks, server-to-server communication and geoinformation manipulation.",
      ],
      tech: ["Django", "Python", "Javascript"],
    },
    {
      role: "Lifeguard",
      org: "ISN",
      location: "Quinta de São Gerónimo pools - Coimbra",
      period: "Apr 2018 — Aug 2018",
      kind: "personal",
      bullets: [
        "Worked as a lifeguard at a local pool, supervising swimmers and ensuring their safety.",
      ],
    },
  ],
  pt: [
    {
      role: "Engenheiro de Software Full-Stack",
      org: "Mercell",
      location: "Remoto para Utrecht, Países Baixos",
      period: "Set 2025 — atual",
      kind: "professional",
      bullets: [
        "Entrego funcionalidades completas, de ponta a ponta, numa equipa full-stack.",
        "Trabalho em estreita colaboração com product owners, product managers, designers e outros programadores.",
        "Lanço funcionalidades que aumentam a satisfação dos clientes e a usabilidade da plataforma.",
      ],
      tech: ["React", ".NET", "C#", "Java", "AWS"],
    },
    {
      role: "Engenheiro de Software Full-Stack",
      org: "Cleanwatts",
      location: "Remoto para Coimbra",
      period: "Jan 2023 — Set 2025",
      kind: "professional",
      bullets: [
        "Planeei, construí e lancei funcionalidades completas em todo o produto.",
        "Tornei-me maintainer do Kiplo, uma aplicação Angular para gestão de comunidades de energia renovável, e assumi a responsabilidade pela qualidade do produto final.",
        "Elevei o nível do trabalho de frontend na empresa, introduzindo técnicas modernas como optimistic updates.",
        "Introduzi testes automatizados, o que reduziu significativamente os bugs e melhorou a estabilidade do produto.",
      ],
      tech: ["Angular", ".NET", "C#"],
    },
    {
      role: "Engenheiro de Software Full-Stack",
      org: "Staruplo",
      location: "Remoto para Aveiro",
      period: "Mar 2022 — Ago 2022",
      kind: "professional",
      bullets: [
        "Implementei integração e entrega contínuas através do GitHub Actions, melhorando o fluxo de desenvolvimento.",
        "Desenhei e construí um novo frontend em React, melhorando a experiência e a velocidade através de caching e revalidação com React Query.",
      ],
      tech: ["React", "Node.JS", "AWS"],
    },
    {
      role: "Colaborador de investigação",
      org: "INESC-ID",
      location: "Remoto para Lisboa",
      period: "Fev 2021 — Mai 2022",
      kind: "professional",
      bullets: [
        "Participei na investigação de um sistema de previsão de cheias, desenvolvendo modelos de machine learning para prever o risco de enchentes em áreas específicas.",
        "Lancei funcionalidades num portal web em Django com tarefas de longa duração em background, comunicação servidor-a-servidor e manipulação de geoinformação.",
      ],
      tech: ["Django", "Python", "Javascript"],
    },
    {
      role: "Nadador Salvador",
      org: "ISN",
      location: "Piscinas da Quinta de São Gerónimo - Coimbra",
      period: "Abr 2018 — Ago 2018",
      kind: "personal",
      bullets: [
        "Trabalhei como nadador salvador numa piscina local a supervisionar os utentes e garantir a sua segurança.",
      ],
    },
  ],
};

export const EDUCATION: Record<Locale, Entry[]> = {
  en: [
    {
      role: "Master's degree in informatics engineering",
      org: "Instituto Superior Técnico",
      period: "Sep 2020 — Nov 2022",
      kind: "professional",
    },
    {
      role: "Bachelor's degree in informatics engineering",
      org: "Universidade de Coimbra",
      period: "Sep 2017 — Jul 2020",
      kind: "professional",
    },
  ],
  pt: [
    {
      role: "Mestrado em engenharia informática",
      org: "Instituto Superior Técnico",
      period: "Set 2020 — Nov 2022",
      kind: "professional",
    },
    {
      role: "Licenciatura em engenharia informática",
      org: "Universidade de Coimbra",
      period: "Set 2017 — Jul 2020",
      kind: "professional",
    },
  ],
};

export const PROJECTS: Record<Locale, Entry[]> = {
  en: [
    {
      role: "Prazus",
      org: "An AI-powered digital assistant for lawyers",
      period: "Jun 2025 - present",
      kind: "professional",
      bullets: [
        "Building a full-stack legal SaaS as a monorepo, with subscription billing, user management, and AI-powered document analysis.",
        "Developing an AI case assistant that streams answers grounded in case data, uploaded files, and Portuguese legislation, scoped per user and case.",
        "Automating deadline tracking with a calculator based on the official court holiday calendar and a daily digest of upcoming deadlines.",
      ],
      tech: ["React", "Tanstack Start"],
    },
    {
      role: "HandOnVitals",
      org: "Medical device measuring five vital signs",
      period: "Jan 2021 — Dec 2022",
      kind: "professional",
      bullets: [
        "Built a Django backend to store the device's measurements, and a Svelte application to visualise and manage the results.",
        "Managed an €8.000 grant supporting the project's development.",
      ],
      tech: ["Django", "Svelte"],
    },
    {
      role: "SportsIn",
      org: "Sports events aggregator",
      period: "Sep 2019 — Jun 2025",
      kind: "professional",
      bullets: [
        "Built a Flutter mobile app that aggregates sports events and lets people search for events nearby by map or list.",
        "Created the Django web service organisers use to add and manage their events.",
      ],
      tech: ["Flutter", "Django", "React"],
    },
  ],
  pt: [
    {
      role: "Prazus",
      org: "Assistente digital com IA para advogados",
      period: "Jun 2025 - presente",
      kind: "professional",
      bullets: [
        "Criei um SaaS jurídico full-stack num monorepo, com faturação por subscrição, gestão de utilizadores e análise de documentos com IA.",
        "Desenvolvi num assistente de IA para processos que transmite respostas em streaming, fundamentadas nos dados do processo, nos ficheiros carregados e na legislação portuguesa, com âmbito limitado por utilizador e processo.",
        "Automatizo a gestão de prazos com uma calculadora baseada no calendário oficial de feriados judiciais e um resumo diário dos prazos a vencer.",
      ],
      tech: ["React", "Tanstack Start"],
    },
    {
      role: "HandOnVitals",
      org: "Dispositivo médico que mede cinco sinais vitais",
      period: "Jan 2021 — Dez 2022",
      kind: "professional",
      bullets: [
        "Construí um backend em Django para armazenar as medições do dispositivo, e uma aplicação em Svelte para visualizar e gerir os resultados.",
        "Geri uma bolsa de 8.000 € que apoiou o desenvolvimento do projeto.",
      ],
      tech: ["Django", "Svelte"],
    },
    {
      role: "SportsIn",
      org: "Agregador de eventos desportivos",
      period: "Set 2019 — Jun 2025",
      kind: "professional",
      bullets: [
        "Construí uma aplicação móvel em Flutter que agrega eventos desportivos e permite às pessoas procurar eventos próximos por mapa ou lista.",
        "Criei o serviço web em Django que os organizadores usam para adicionar e gerir os seus eventos.",
      ],
      tech: ["Flutter", "Django", "React"],
    },
  ],
};

export interface Skill {
  label: string;
  value: string;
  /** `personal` items appear only in the full view. Required, so none is left untagged. */
  kind: Kind;
}

export const SKILLS: Record<Locale, Skill[]> = {
  en: [
    {
      label: "Languages",
      value: "Portuguese (native), English (proficient), Spanish (conversational)",
      kind: "personal",
    },
    {
      label: "Programming",
      value:
        "Javascript, Typescript, Node.JS, React, Angular, .NET, C#, Java, Python, Django, TailwindCSS",
      kind: "professional",
    },
    {
      label: "Sports",
      value: "Water polo, running, gym. Looking to start surfing, tennis and calisthenics",
      kind: "personal",
    },
    {
      label: "Hobbies",
      value: "Pokémon TCG, travelling, photography, reading",
      kind: "personal",
    },
  ],
  pt: [
    {
      label: "Idiomas",
      value: "Português (nativo), inglês (fluente), espanhol (conversação), italiano (básico)",
      kind: "personal",
    },
    {
      label: "Programação",
      value:
        "Javascript, Typescript, Node.JS, React, Angular, .NET, C#, Java, Python, Django, TailwindCSS",
      kind: "professional",
    },
    {
      label: "Desporto",
      value: "Polo aquático, corrida, ginásio. À procura de começar a surfar, ténis e calistenia",
      kind: "personal",
    },
    {
      label: "Hobbies",
      value: "Cartas pokémon, viajar, fotografia, ler",
      kind: "personal",
    },
  ],
};
