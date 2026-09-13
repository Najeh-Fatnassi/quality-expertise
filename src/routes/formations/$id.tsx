import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { certificationLabels, formatLabels, formations } from "@/content/formations";
import { buildMeta, WHATSAPP_URL } from "@/lib/seo";

export const Route = createFileRoute("/formations/$id")({
  loader: ({ params }) => {
    const formation = formations.find((f) => f.id === params.id);
    if (!formation) throw notFound();
    return formation;
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildMeta({
          title: `${loaderData.title} — Quality Expertise`,
          description: loaderData.summary,
          path: `/formations/${loaderData.id}`,
        })
      : {},
  component: FormationDetail,
});

function FormationDetail() {
  const formation = Route.useLoaderData();
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par la formation "${formation.title}".`,
  );

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <Link
          to="/formations"
          className="font-sans text-sm font-medium text-neutral-500 hover:text-[color:var(--color-brand-violet)]"
        >
          ← Retour aux formations
        </Link>
        <span className="mt-6 block font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-violet)]">
          {certificationLabels[formation.certification]}
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {formation.title}
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-neutral-600">
          {formation.summary}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-neutral-200 p-6 sm:grid-cols-4">
          <Info label="Format" value={formatLabels[formation.format]} />
          <Info label="Durée" value={formation.duration} />
          <Info label="Prix" value={formation.price} />
          <Info label="Prochaine session" value={formation.nextSession} />
        </dl>

        <h2 className="mt-10 font-display text-xl font-bold text-neutral-900">Programme</h2>
        <ul className="mt-4 space-y-2">
          {formation.program.map((item) => (
            <li key={item} className="flex items-start gap-2 font-sans text-sm text-neutral-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brand-violet)]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            S'inscrire / demander des infos via WhatsApp
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-xs uppercase tracking-wide text-neutral-400">{label}</dt>
      <dd className="mt-1 font-sans text-sm font-semibold text-neutral-900">{value}</dd>
    </div>
  );
}
