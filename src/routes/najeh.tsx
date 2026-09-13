import { createFileRoute, Link } from "@tanstack/react-router";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, type ComponentType } from "react";
import { Linkedin, Mail, Globe } from "lucide-react";
import { SiteFooter } from "@/components/site-chrome";
import avatar from "@/assets/avatar.jpg";
import { buildMeta, canonical, WHATSAPP_URL } from "@/lib/seo";

const PROFILE_URL = canonical("/najeh");
// TODO: remplacer par la vraie URL du profil LinkedIn.
const LINKEDIN_URL = "#";

export const Route = createFileRoute("/najeh")({
  head: () =>
    buildMeta({
      title: "Najeh Fatnassi — Quality Expertise",
      description:
        "Fondatrice & coach QA chez Quality Expertise. 9 ans d'expérience, certifications ISTQB.",
      path: "/najeh",
    }),
  component: NajehCard,
});

function NajehCard() {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQr = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "najeh-fatnassi-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="min-h-screen bg-white font-sans text-neutral-900"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-16 text-center">
        <img
          src={avatar}
          alt="Najeh Fatnassi"
          className="h-32 w-32 rounded-full object-cover shadow-lg"
        />
        <h1 className="mt-5 font-display text-2xl font-bold text-neutral-900">Najeh Fatnassi</h1>
        <p className="mt-1 font-sans text-sm font-semibold text-[color:var(--color-brand-violet)]">
          Fondatrice &amp; Coach QA — Quality Expertise
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-600">
          Ingénieure QA senior avec 9 ans d'expérience sur des stacks critiques. Certifiée ISTQB®,
          spécialisée dans l'automatisation augmentée par l'IA, le shift-left testing et le coaching
          de carrière pour les professionnels QA.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <SocialLink href={LINKEDIN_URL} icon={Linkedin} label="LinkedIn" />
          <SocialLink href={canonical("/")} icon={Globe} label="Site web" />
          <SocialLink href={WHATSAPP_URL} icon={WhatsAppIcon} label="WhatsApp" />
          <SocialLink href="mailto:najeh@qualityexpertise.eu" icon={Mail} label="Email" />
        </div>

        <Link
          to="/session-gratuite"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[color:var(--color-brand-orange)] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
        >
          Réserver une session gratuite
        </Link>

        <div ref={qrRef} className="mt-10 rounded-2xl border border-neutral-200 p-5">
          <QRCodeCanvas value={PROFILE_URL} size={176} includeMargin />
        </div>
        <p className="mt-2 font-sans text-xs text-neutral-400">Scannez pour retrouver cette page</p>
        <button
          onClick={downloadQr}
          className="mt-3 font-sans text-sm font-semibold text-[color:var(--color-brand-violet)] underline underline-offset-2"
        >
          Télécharger le QR code
        </button>
      </main>
      <SiteFooter />
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-[color:var(--color-brand-violet)] hover:text-[color:var(--color-brand-violet)]"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.505 3.674 1.463 5.26L2 22l4.868-1.442A9.955 9.955 0 0 0 12.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.062a8.03 8.03 0 0 1-4.096-1.122l-.294-.175-2.888.855.87-2.815-.192-.303A8.06 8.06 0 1 1 20.06 12a8.07 8.07 0 0 1-8.059 8.062z" />
    </svg>
  );
}
