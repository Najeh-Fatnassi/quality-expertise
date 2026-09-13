import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Monitor } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { events } from "@/content/events";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/evenements")({
  head: () =>
    buildMeta({
      title: "Événements — Quality Expertise",
      description:
        "Sessions et webinaires gratuits sur le test logiciel, l'ISTQB et l'IA générative appliquée à la QA.",
      path: "/evenements",
    }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
          Événements
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Prochaines sessions
        </h1>
        <div className="mt-10 space-y-6">
          {events.length === 0 && (
            <p className="font-sans text-sm text-neutral-500">
              Aucun événement programmé pour le moment — revenez bientôt.
            </p>
          )}
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-neutral-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"
            >
              <div>
                <h2 className="font-display text-xl font-bold text-neutral-900">{event.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
                  {event.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 font-sans text-sm text-neutral-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {event.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Monitor className="h-4 w-4" /> {event.format}
                  </span>
                </div>
              </div>
              <Link
                to={event.ctaTo}
                className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand-orange)] px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-transform hover:-translate-y-0.5 sm:mt-0"
              >
                {event.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
