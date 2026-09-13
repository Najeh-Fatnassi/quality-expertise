export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "istqb-ctfl-v4-genai",
    title: "ISTQB CTFL v4.0 : ce qui change avec l'édition GenAI",
    excerpt:
      "Le syllabus Foundation Level v4.0 intègre désormais des notions liées à l'IA générative. Voici ce qu'il faut savoir avant de préparer l'examen.",
    date: "2026-08-10",
    author: "Najeh Fatnassi",
    content: `## Un syllabus qui évolue avec le métier

Le référentiel ISTQB® Foundation Level a toujours suivi l'évolution des pratiques de test. La version 4.0, dans son édition GenAI, ajoute des scénarios concrets sur l'utilisation de l'intelligence artificielle générative dans les cycles de validation.

### Ce qui ne change pas

Les fondamentaux du test logiciel (niveaux de test, techniques de conception, gestion des défauts) restent le socle de la certification.

### Ce qui est nouveau

- Des cas pratiques sur le test d'applications utilisant des LLM
- Une sensibilisation aux biais et à la non-déterminité des sorties IA
- Des pistes pour intégrer l'IA dans l'automatisation des tests

Notre formation CTFL v4.0 couvre l'intégralité du syllabus officiel, complétée par ces scénarios GenAI.`,
  },
  {
    slug: "shift-left-testing-equipes-agiles",
    title: "Shift-left testing : par où commencer dans une équipe agile ?",
    excerpt:
      "Le shift-left n'est pas qu'un slogan. Voici trois leviers concrets pour l'introduire progressivement dans une équipe qui découvre la pratique.",
    date: "2026-07-02",
    author: "Najeh Fatnassi",
    content: `## Pourquoi tester plus tôt ?

Détecter un défaut en phase de conception coûte largement moins cher qu'en production. Le shift-left consiste à rapprocher les activités de test du début du cycle de développement.

### Trois leviers pour démarrer

1. **Impliquer la QA dès le refinement** des tickets, pas seulement à la livraison
2. **Écrire les critères d'acceptation sous forme de tests** (Given/When/Then)
3. **Automatiser les tests unitaires et de contrat** avant même l'intégration

Ce sont exactement les réflexes que nous transmettons dans nos master classes d'automatisation.`,
  },
];
