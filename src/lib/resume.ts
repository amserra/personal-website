// Every fact here comes from alexandre-serra-cv.pdf. Bullets are tightened to the
// design system's rules — verb first, outcome named — but no fact is added.
// The CV's phone number is deliberately left off a public page.

export interface Entry {
  role: string;
  org?: string;
  location?: string;
  period: string;
  note?: string;
  bullets?: string[];
  tech?: string[];
}

export const EXPERIENCE: Entry[] = [
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
];

export const EDUCATION: Entry[] = [
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
];

export const PROJECTS: Entry[] = [
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
];

export const SKILLS: { label: string; value: string }[] = [
  { label: "Languages", value: "Portuguese (native), English (proficient), Spanish (conversational)" },
  {
    label: "Programming",
    value: "Javascript, Node.JS, React, Angular, .NET, Python, Django, TailwindCSS",
  },
  {
    label: "Away from the keyboard",
    value: "Water polo at Sporting Clube de Portugal, in the Portuguese first division",
  },
];
