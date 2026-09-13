import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { buildMeta, WHATSAPP_URL } from "@/lib/seo";

export const Route = createFileRoute("/rdv-gratuit")({
  head: () =>
    buildMeta({
      title: "Session d'information gratuite — Quality Expertise",
      description:
        "Décrivez votre besoin en 2 minutes et échangez directement avec Najeh sur WhatsApp.",
      path: "/rdv-gratuit",
    }),
  component: RdvGratuitPage,
});

function RdvGratuitPage() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const base = "Bonjour, je suis intéressé(e) par la session d'information gratuite.";
    const details = [
      name.trim() && `Nom : ${name.trim()}`,
      need.trim() && `Besoin : ${need.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    const message = details ? `${base}\n\n${details}` : base;
    window.open(
      `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-lg px-5 py-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
          Session gratuite
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900">
          Parlons de votre projet
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
          Décrivez brièvement votre besoin, puis rejoignez-nous directement sur WhatsApp pour
          échanger.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="font-sans text-sm font-medium text-neutral-700">
              Nom
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[color:var(--color-brand-violet)]"
            />
          </div>
          <div>
            <label htmlFor="need" className="font-sans text-sm font-medium text-neutral-700">
              Votre besoin / objectif
            </label>
            <textarea
              id="need"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="Ex : préparer la certification ISTQB, faire auditer nos pratiques QA..."
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[color:var(--color-brand-violet)]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Rejoindre via WhatsApp
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
