import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { services } from "@/content/services";
import { buildMeta, WHATSAPP_URL } from "@/lib/seo";

export const Route = createFileRoute("/services/$id")({
  loader: ({ params }) => {
    const service = services.find((s) => s.id === params.id);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildMeta({
          title: `${loaderData.title} — Quality Expertise`,
          description: loaderData.summary,
          path: `/services/${loaderData.id}`,
        })
      : {},
  component: ServiceDetail,
});

function ServiceDetail() {
  const service = Route.useLoaderData();
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le service "${service.title}".`,
  );

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <Link
          to="/services"
          className="font-sans text-sm font-medium text-neutral-500 hover:text-[color:var(--color-brand-violet)]"
        >
          ← Retour aux services
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {service.title}
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-neutral-600">
          {service.summary}
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-neutral-900">
          Ce que vous obtenez
        </h2>
        <ul className="mt-4 space-y-2">
          {service.deliverables.map((item) => (
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
            Discuter de ce service via WhatsApp
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
