export type ResultStat = {
  label: string;
  value: string;
};

// Placeholders — à remplacer par vos chiffres réels dès qu'ils sont disponibles.
export const resultStats: ResultStat[] = [
  { label: "Taux de réussite à l'examen ISTQB", value: "—" },
  { label: "Professionnels formés", value: "—" },
  { label: "Années d'expertise QA", value: "9" },
  { label: "Sessions live organisées", value: "—" },
];

// Discussion WhatsApp directe en attendant la création d'un vrai groupe/communauté.
export const communityUrl =
  "https://wa.me/21627730227?text=" +
  encodeURIComponent("Bonjour, je souhaite rejoindre la communauté Quality Expertise.");
