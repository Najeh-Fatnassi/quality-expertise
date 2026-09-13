import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  certificationLabels,
  formatLabels,
  formations,
  type Certification,
  type Format,
} from "@/content/formations";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/formations/")({
  head: () =>
    buildMeta({
      title: "Formations — Quality Expertise",
      description:
        "Catalogue des formations ISTQB CTFL, CT-GenAI et CT-TAE, en présentiel ou e-learning.",
      path: "/formations",
    }),
  component: FormationsIndex,
});

const CERTIFICATIONS = Object.keys(certificationLabels) as Certification[];
const FORMATS = Object.keys(formatLabels) as Format[];

function FormationsIndex() {
  const [certFilter, setCertFilter] = useState<Certification | "all">("all");
  const [formatFilter, setFormatFilter] = useState<Format | "all">("all");

  const filtered = useMemo(
    () =>
      formations.filter(
        (f) =>
          (certFilter === "all" || f.certification === certFilter) &&
          (formatFilter === "all" || f.format === formatFilter),
      ),
    [certFilter, formatFilter],
  );

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
          Formations
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Nos parcours de certification
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <FilterPill active={certFilter === "all"} onClick={() => setCertFilter("all")}>
            Toutes certifications
          </FilterPill>
          {CERTIFICATIONS.map((c) => (
            <FilterPill key={c} active={certFilter === c} onClick={() => setCertFilter(c)}>
              {certificationLabels[c]}
            </FilterPill>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <FilterPill active={formatFilter === "all"} onClick={() => setFormatFilter("all")}>
            Tous formats
          </FilterPill>
          {FORMATS.map((f) => (
            <FilterPill key={f} active={formatFilter === f} onClick={() => setFormatFilter(f)}>
              {formatLabels[f]}
            </FilterPill>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <Link
              key={f.id}
              to="/formations/$id"
              params={{ id: f.id }}
              className="flex flex-col rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-[color:var(--color-brand-violet)]"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-violet)]">
                {certificationLabels[f.certification]}
              </span>
              <h2 className="mt-2 font-display text-lg font-bold text-neutral-900">{f.title}</h2>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-600">
                {f.summary}
              </p>
              <div className="mt-4 flex items-center justify-between font-sans text-xs text-neutral-500">
                <span>{formatLabels[f.format]}</span>
                <span>{f.duration}</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="font-sans text-sm text-neutral-500">
              Aucune formation ne correspond à ces filtres.
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
        active
          ? "border-[color:var(--color-brand-violet)] bg-[color:var(--color-brand-violet)] text-white"
          : "border-neutral-200 text-neutral-600 hover:border-[color:var(--color-brand-violet)]"
      }`}
    >
      {children}
    </button>
  );
}
