export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

// Placeholders — à remplacer par de vrais retours après les premières sessions.
export const testimonials: Testimonial[] = [
  {
    name: "Sarah B.",
    role: "Testeuse QA junior",
    quote:
      "La formation CTFL m'a permis de structurer mes connaissances et de décrocher la certification du premier coup.",
  },
  {
    name: "Yassine K.",
    role: "Développeur en reconversion QA",
    quote:
      "Le coaching 1:1 a été décisif pour préparer mes entretiens et comprendre les attentes réelles du métier.",
  },
  {
    name: "Imen T.",
    role: "QA Automation Engineer",
    quote:
      "La master class sur l'automatisation avec l'IA générative m'a fait gagner un temps précieux sur mes suites de tests.",
  },
];
