export type Service = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "audit-qualite",
    title: "Audit qualité",
    summary:
      "État des lieux complet de vos pratiques de test et d'assurance qualité, avec un plan d'action priorisé.",
    deliverables: [
      "Cartographie des processus de test existants",
      "Identification des risques et points de friction",
      "Rapport d'audit avec recommandations chiffrées",
    ],
  },
  {
    id: "accompagnement-qa",
    title: "Accompagnement QA",
    summary:
      "Mise en place ou renforcement d'une démarche qualité au sein de vos équipes, du shift-left à l'automatisation.",
    deliverables: [
      "Définition d'une stratégie de test adaptée à votre contexte",
      "Coaching des équipes sur les bonnes pratiques",
      "Suivi de la mise en œuvre sur plusieurs sprints",
    ],
  },
  {
    id: "conseil-automatisation",
    title: "Conseil en automatisation",
    summary:
      "Conception ou audit de votre framework d'automatisation (Playwright, Cypress) et intégration dans vos pipelines CI/CD.",
    deliverables: [
      "Audit technique du framework existant (ou choix d'un nouveau)",
      "Mise en place de l'intégration continue",
      "Documentation et transfert de compétences",
    ],
  },
];
