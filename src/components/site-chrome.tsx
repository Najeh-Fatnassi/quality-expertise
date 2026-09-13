import { Link } from "@tanstack/react-router";
import { useState } from "react";
import qeIcon from "@/assets/qe-icon.png";
import { WHATSAPP_URL } from "@/lib/seo";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/formations", label: "Formations" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/evenements", label: "Événements" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Quality Expertise — Accueil"
    >
      <img src={qeIcon} alt="" className="h-9 w-9 object-contain" />
      <span className="font-display text-xl font-bold tracking-tight">
        <span style={{ color: "var(--color-brand-orange)" }}>Q</span>
        <span style={{ color: "var(--color-brand-violet)" }}>uality Expertise</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-sans text-sm font-medium text-neutral-700 transition-colors hover:text-[color:var(--color-brand-violet)]"
              activeProps={{ className: "text-[color:var(--color-brand-violet)]" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/session-gratuite"
            className="hidden rounded-full bg-[color:var(--color-brand-orange)] px-4 py-2 font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Session gratuite
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border border-neutral-200 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1">
              <span className="h-0.5 w-5 bg-neutral-800" />
              <span className="h-0.5 w-5 bg-neutral-800" />
              <span className="h-0.5 w-5 bg-neutral-800" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-[color:var(--color-brand-violet)]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/session-gratuite"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[color:var(--color-brand-orange)] px-4 py-2.5 text-center font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20"
            >
              Session gratuite
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <Logo />
        <div className="flex items-center gap-4 font-sans text-sm text-neutral-500">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--color-brand-violet)]"
          >
            WhatsApp
          </a>
          <Link to="/najeh" className="hover:text-[color:var(--color-brand-violet)]">
            À propos
          </Link>
          <span>© 2026 Quality Expertise</span>
        </div>
      </div>
    </footer>
  );
}
