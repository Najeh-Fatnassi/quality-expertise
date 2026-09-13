export type SiteEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  format: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
};

export const events: SiteEvent[] = [
  {
    id: "quality-testing-ia-2026-09",
    title: "Quality Testing × Intelligence Artificielle",
    date: "Dimanche 19 septembre 2026",
    time: "17h00 (Tunisie)",
    format: "En ligne · Google Meet",
    description:
      "Session de découverte gratuite : ISTQB CTFL v4.0, CT-GenAI, automatisation avec Playwright & Cypress, retours de terrain.",
    ctaLabel: "Réserver ma place",
    ctaTo: "/session-gratuite",
  },
];
