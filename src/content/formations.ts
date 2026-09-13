export type Certification = "CTFL" | "CT-GenAI" | "CT-TAE";
export type Format = "presentiel" | "e-learning";

export type Formation = {
  id: string;
  title: string;
  certification: Certification;
  format: Format;
  duration: string;
  price: string;
  nextSession: string;
  summary: string;
  program: string[];
};

export const certificationLabels: Record<Certification, string> = {
  CTFL: "CTFL (Foundation Level)",
  "CT-GenAI": "CT-GenAI (IA générative)",
  "CT-TAE": "CT-TAE (Automatisation de test)",
};

export const formatLabels: Record<Format, string> = {
  presentiel: "Présentiel",
  "e-learning": "E-learning",
};

export const formations: Formation[] = [
  {
    id: "ctfl-v4-genai",
    title: "ISTQB® Foundation Level v4.0 — Édition GenAI",
    certification: "CTFL",
    format: "e-learning",
    duration: "6 semaines · 3h/semaine",
    price: "Sur devis",
    nextSession: "19 septembre 2026",
    summary:
      "Préparation structurée à la certification internationale de référence, incluant les scénarios de test liés à l'IA générative.",
    program: [
      "Fondamentaux du test logiciel",
      "Cycle de vie du développement et niveaux de test",
      "Techniques de conception de tests",
      "Gestion des tests et outils",
      "Scénarios de test appliqués à l'IA générative",
      "Examens blancs et préparation à l'épreuve officielle",
    ],
  },
  {
    id: "ct-genai-testing",
    title: "CT-GenAI — Tester l'intelligence artificielle générative",
    certification: "CT-GenAI",
    format: "e-learning",
    duration: "4 semaines · 3h/semaine",
    price: "Sur devis",
    nextSession: "Sur demande",
    summary:
      "Concevoir des stratégies de test pour des applications intégrant des LLM : biais, non-déterminisme, évaluation qualitative.",
    program: [
      "Spécificités du test d'applications basées sur des LLM",
      "Détection des biais et hallucinations",
      "Méthodes d'évaluation qualitative et quantitative",
      "Études de cas réels",
    ],
  },
  {
    id: "ct-tae-automation",
    title: "CT-TAE — Automatisation de tests avancée",
    certification: "CT-TAE",
    format: "presentiel",
    duration: "5 jours intensifs",
    price: "Sur devis",
    nextSession: "Sur demande",
    summary:
      "Concevoir, maintenir et faire évoluer une architecture d'automatisation de tests robuste avec Playwright et Cypress.",
    program: [
      "Architecture des frameworks d'automatisation",
      "Playwright & Cypress en pratique",
      "Intégration continue et pipelines de qualité",
      "Maintenance et scalabilité des suites de tests",
    ],
  },
];
