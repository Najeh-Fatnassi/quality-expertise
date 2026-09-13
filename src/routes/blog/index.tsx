import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { blogPosts } from "@/content/blog-posts";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildMeta({
      title: "Blog — Quality Expertise",
      description:
        "Articles sur le test logiciel, l'ISTQB, l'automatisation et l'IA générative appliquée à la QA.",
      path: "/blog",
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
          Blog
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Articles &amp; ressources QA
        </h1>
        <div className="mt-10 space-y-8">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-[color:var(--color-brand-violet)]"
            >
              <p className="font-sans text-xs font-medium text-neutral-400">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {post.author}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-neutral-900">{post.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
