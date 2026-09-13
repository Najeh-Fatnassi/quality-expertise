import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { services } from "@/content/services";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    buildMeta({
      title: "Services — Quality Expertise",
      description:
        "Accompagnement, audit et conseil en assurance qualité logicielle et automatisation de tests.",
      path: "/services",
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
          Services
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Accompagnement &amp; conseil
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              to="/services/$id"
              params={{ id: s.id }}
              className="flex flex-col rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-[color:var(--color-brand-violet)]"
            >
              <h2 className="font-display text-lg font-bold text-neutral-900">{s.title}</h2>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-600">
                {s.summary}
              </p>
              <span className="mt-4 font-sans text-sm font-semibold text-[color:var(--color-brand-violet)]">
                En savoir plus →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
