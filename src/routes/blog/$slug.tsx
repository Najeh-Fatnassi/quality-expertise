import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { blogPosts } from "@/content/blog-posts";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildMeta({
          title: `${loaderData.title} — Quality Expertise`,
          description: loaderData.excerpt,
          path: `/blog/${loaderData.slug}`,
        })
      : {},
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const html = marked.parse(post.content, { async: false }) as string;

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <Link
          to="/blog"
          className="font-sans text-sm font-medium text-neutral-500 hover:text-[color:var(--color-brand-violet)]"
        >
          ← Retour au blog
        </Link>
        <p className="mt-6 font-sans text-xs font-medium text-neutral-400">
          {new Date(post.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" · "}
          {post.author}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {post.title}
        </h1>
        <article
          className="mt-8 font-sans leading-relaxed text-neutral-700 [&_a]:text-[color:var(--color-brand-violet)] [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
