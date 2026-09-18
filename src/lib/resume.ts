// Every fact here comes from alexandre-serra-cv.pdf. Bullets are tightened to the
// design system's rules — verb first, outcome named — but no fact is added.
// The CV's phone number is deliberately left off a public page.
// The pt entries are a translation of the en ones; keep both in sync fact-for-fact.

import type { Locale } from "@/lib/site";

export interface Entry {
  role: string;
  org?: string;
  location?: string;
  period: string;
  note?: string;
  bullets?: string[];
  tech?: string[];
}

export const EXPERIENCE: Record<Locale, Entry[]> = {
  en: [
    {
      role: "Full-Stack Software Engineer",
      org: "Cleanwatts",
      location: "Renewable energy communities · ~100 people",
      period: "Jan 2023 — present",
      bullets: [
        "Planned, built and shipped end-to-end features across the product.",
        "Became a maintainer of Kiplo, an Angular application for managing renewable energy communities, and took on responsibility for the quality of the end product.",
        "Raised the standard of frontend work across the company by introducing modern techniques such as optimistic updates.",
        "Introduced automated testing, which significantly reduced bugs and improved product stability.",
      ],
      tech: ["Angular", "TypeScript"],
    },
    {
      role: "Full-Stack Software Engineer",
      org: "Staruplo",
      location: "Spatial information · ~5 people",
      period: "Mar 2022 — Aug 2022",
      bullets: [
        "Enabled continuous integration and delivery through GitHub Actions, improving the development workflow.",
        "Designed and built a new frontend in React, improving experience and speed through caching and revalidation with React Query.",
      ],
      tech: ["React", "React Query", "GitHub Actions"],
    },
    {
      role: "Research Collaborator, flood forecasting system",
      org: "INESC-ID",
      location: "~250 people",
      period: "Feb 2021 — May 2022",
      bullets: [
        "Shipped features on a Django web portal with long-running background tasks, server-to-server communication and geoinformation manipulation.",
      ],
      tech: ["Django", "Python"],
    },
  ],
  pt: [
    {
      role: "Engenheiro de Software Full-Stack",
      org: "Cleanwatts",
      location: "Comunidades de energia renovável · ~100 pessoas",
      period: "Jan 2023 — atual",
      bullets: [
        "Planeei, construí e lancei funcionalidades completas em todo o produto.",
        "Tornei-me maintainer do Kiplo, uma aplicação Angular para gestão de comunidades de energia renovável, e assumi a responsabilidade pela qualidade do produto final.",
        "Elevei o nível do trabalho de frontend na empresa, introduzindo técnicas modernas como optimistic updates.",
        "Introduzi testes automatizados, o que reduziu significativamente os bugs e melhorou a estabilidade do produto.",
      ],
      tech: ["Angular", "TypeScript"],
    },
    {
      role: "Engenheiro de Software Full-Stack",
      org: "Staruplo",
      location: "Informação espacial · ~5 pessoas",
      period: "Mar 2022 — Ago 2022",
      bullets: [
        "Implementei integração e entrega contínuas através do GitHub Actions, melhorando o fluxo de desenvolvimento.",
        "Desenhei e construí um novo frontend em React, melhorando a experiência e a velocidade através de caching e revalidação com React Query.",
      ],
      tech: ["React", "React Query", "GitHub Actions"],
    },
    {
      role: "Colaborador de investigação, sistema de previsão de cheias",
      org: "INESC-ID",
      location: "~250 pessoas",
      period: "Fev 2021 — Mai 2022",
      bullets: [
        "Lancei funcionalidades num portal web em Django com tarefas de longa duração em background, comunicação servidor-a-servidor e manipulação de geoinformação.",
      ],
      tech: ["Django", "Python"],
    },
  ],
};

export const EDUCATION: Record<Locale, Entry[]> = {
  en: [
    {
      role: "Master's degree in computer science and engineering",
      org: "Instituto Superior Técnico",
      period: "Sep 2020 — Nov 2022",
    },
    {
      role: "Bachelor's degree in informatics engineering",
      org: "Universidade de Coimbra",
      period: "Sep 2017 — Jul 2020",
    },
  ],
  pt: [
    {
      role: "Mestrado em engenharia informática",
      org: "Instituto Superior Técnico",
      period: "Set 2020 — Nov 2022",
    },
    {
      role: "Licenciatura em engenharia informática",
      org: "Universidade de Coimbra",
      period: "Set 2017 — Jul 2020",
    },
  ],
};

export const PROJECTS: Record<Locale, Entry[]> = {
  en: [
    {
      role: "HandOnVitals",
      org: "Medical device measuring five vital signs",
      period: "Jan 2021 — Dec 2022",
      bullets: [
        "Built a Django backend to store the device's measurements, and a Svelte application to visualise and manage the results.",
        "Managed an €8.000 grant supporting the project's development.",
      ],
      tech: ["Django", "Svelte"],
    },
    {
      role: "SportsIn",
      org: "Sports events aggregator",
      period: "Sep 2019 — present",
      bullets: [
        "Built a Flutter mobile app that aggregates sports events and lets people search for events nearby by map or list.",
        "Created the Django web service organisers use to add and manage their events.",
      ],
      tech: ["Flutter", "Django"],
    },
  ],
  pt: [
    {
      role: "HandOnVitals",
      org: "Dispositivo médico que mede cinco sinais vitais",
      period: "Jan 2021 — Dez 2022",
      bullets: [
        "Construí um backend em Django para armazenar as medições do dispositivo, e uma aplicação em Svelte para visualizar e gerir os resultados.",
        "Geri uma bolsa de 8.000 € que apoiou o desenvolvimento do projeto.",
      ],
      tech: ["Django", "Svelte"],
    },
    {
      role: "SportsIn",
      org: "Agregador de eventos desportivos",
      period: "Set 2019 — atual",
      bullets: [
        "Construí uma aplicação móvel em Flutter que agrega eventos desportivos e permite às pessoas procurar eventos próximos por mapa ou lista.",
        "Criei o serviço web em Django que os organizadores usam para adicionar e gerir os seus eventos.",
      ],
      tech: ["Flutter", "Django"],
    },
  ],
};

export const SKILLS: Record<Locale, { label: string; value: string }[]> = {
  en: [
    {
      label: "Languages",
      value: "Portuguese (native), English (proficient), Spanish (conversational)",
    },
    {
      label: "Programming",
      value: "Javascript, Node.JS, React, Angular, .NET, Python, Django, TailwindCSS",
    },
    {
      label: "Away from the keyboard",
      value: "Water polo at Sporting Clube de Portugal, in the Portuguese first division",
    },
  ],
  pt: [
    { label: "Idiomas", value: "Português (nativo), inglês (fluente), espanhol (conversação)" },
    {
      label: "Programação",
      value: "Javascript, Node.JS, React, Angular, .NET, Python, Django, TailwindCSS",
    },
    {
      label: "Fora do teclado",
      value: "Polo aquático no Sporting Clube de Portugal, na primeira divisão portuguesa",
    },
  ],
};
