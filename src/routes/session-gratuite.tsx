import { createFileRoute, Link } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Award,
  BrainCircuit,
  Zap,
  Target,
  Calendar,
  CalendarPlus,
  Clock,
  Monitor,
  Linkedin,
  Mail,
  Globe,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import avatar from "@/assets/avatar.jpg";
import qeIcon from "@/assets/qe-icon.png";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rue+20+Mars%2C+Jawhara%2C+Sousse%2C+Tunisie";
const WHATSAPP_URL = "https://wa.me/21627730227";
const CALENDAR_URL = "https://calendar.app.google/Q6M1jifPmFRkBeBq8";
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9Kx2aaGUHjlnowoa5SAsqYw1oTZBcQGVt4_RJxd4yJuyu1vzAg5Skkeeawxd6GnSR5w/exec";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LANGUE_OPTIONS = [
  { value: "FR", label: "Français" },
  { value: "EN", label: "English" },
] as const;
const FORMATION_OPTIONS = [
  "ISTQB Foundation (CTFL v4.0)",
  "Automation Bootcamp",
  "CT-GenAI (IA générative appliquée au testing)",
  "Coaching carrière",
  "Premium Membership",
  "Je ne sais pas encore / À me conseiller",
] as const;

export const Route = createFileRoute("/session-gratuite")({
  head: () => ({
    meta: [
      { title: "Quality Expertise — Quality Testing × Intelligence Artificielle" },
      {
        name: "description",
        content:
          "Session gratuite en ligne le dimanche 26 juillet 2026 à 17h00. ISTQB CTFL v4.0, CT-GenAI, Playwright & Cypress avec Najeh Fatnassi.",
      },
      {
        property: "og:title",
        content: "Quality Expertise — Quality Testing × Intelligence Artificielle",
      },
      {
        property: "og:description",
        content:
          "Session gratuite en ligne le dimanche 26 juillet 2026 à 17h00. ISTQB CTFL v4.0, CT-GenAI, Playwright & Cypress avec Najeh Fatnassi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const EVENT_DATE = new Date("2026-07-26T17:00:00+01:00");

type Lang = "en" | "fr";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});
const useLang = () => useContext(LangContext);

const T = {
  en: {
    signup: "Sign up",
    hero: {
      badge: "Quality Expertise",
      title2: "Artificial Intelligence",
      subtitle: "Free online discovery session",
      quote: "“When manual testing meets machine intelligence”",
      countdown: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
      cta: "Free Registration",
      date: "07/26/2026",
      time: "17:00 (Tunisia)",
      format: "Google Meet",
    },
    programme: {
      eyebrow: "Program",
      title: "What you'll discover",
      subtitle: "Four key topics in one hour",
      cards: [
        { title: "ISTQB CTFL v4.0", desc: "The international reference certification" },
        { title: "CT-GenAI", desc: "Testing generative AI in real-world conditions" },
        { title: "Playwright × Cypress", desc: "Modern, intelligent automation" },
        { title: "Field feedback", desc: "Real challenges, no filter" },
      ],
    },
    infos: {
      eyebrow: "Practical info",
      title: "Join us online",
      items: [
        { icon: "📅", label: "Date", main: "Sunday, July 26", sub: "2026" },
        { icon: "🕗", label: "Time", main: "17:00 – 18:00", sub: "Tunisia time (GMT+1)" },
        { icon: "💻", label: "Format", main: "100% online", sub: "Via Google Meet" },
      ],
      zoomNote: "🔗 The Google Meet link will be emailed to you after registration.",
    },
    formatrice: {
      eyebrow: "The coach",
      role: "Founder & Coach, Quality Expertise",
      bio1: " — Senior QA Engineer with 8 years of experience on critical stacks.",
      bio2: (
        <>
          On assignment on a <strong>SAP Commerce Cloud / Hybris</strong> project for a major
          account in France, she industrializes quality assurance through augmented automation,
          shift-left testing, and the integration of GenAI into validation cycles. Her experience
          also covers <strong>data quality</strong> projects, where she secured the reliability and
          governance of large-scale data. She is also a{" "}
          <strong>data security & quality researcher</strong>, focused on resilience, compliance,
          and data pipeline protection.
        </>
      ),
      bio3: "Specialized in accelerating CI/CD pipelines, reducing time-to-market, and building scalable, secure quality frameworks — with a strong focus on quality audits, high-performance engineering, and ethical, sustainable software practices.",
      tags: [
        "SAP Commerce Cloud",
        "Test Automation",
        "AI-Augmented QA",
        "Shift-left Testing",
        "Data Quality",
        "Data Security",
        "Ethical Hacking",
        "Functional Testing",
      ],
    },
    inscription: {
      eyebrow: "Registration",
      title: "Reserve your spot",
      subtitle: "Spots are limited — register for free now.",
      calendarCta: "Join / Add to Calendar",
      or: "or fill out the form",
      fullname: "Full name",
      fullnamePh: "Your first and last name",
      email: "Email",
      emailPh: "you@example.com",
      phone: "Phone",
      phonePh: "+216 ...",
      langue: "Preferred language",
      languePh: "Select a language",
      formation: "Which program interests you?",
      formationPh: "Select a program",
      errorFullnameRequired: "Full name is required.",
      errorEmailRequired: "Email is required.",
      errorEmail: "Please enter a valid email address.",
      errorPhoneRequired: "Phone number is required.",
      errorLangue: "Please select a language.",
      errorFormation: "Please select a program.",
      submit: "Confirm my registration",
      submitting: "Sending…",
      submitError: "Something went wrong during registration. Please try again.",
      consent: "By registering, you agree to receive the Google Meet link by email.",
      modalTitle: "Registration confirmed!",
      modalText: "A confirmation email with the connection link is on its way.",
      modalClose: "Close",
    },
    footer: {
      rights: "All rights reserved",
    },
  },
  fr: {
    signup: "S'inscrire",
    hero: {
      badge: "Quality Expertise",
      title2: "Intelligence Artificielle",
      subtitle: "Session de découverte gratuite en ligne",
      quote: "« Quand le test manuel rencontre l'intelligence des machines »",
      countdown: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" },
      cta: "Inscription gratuite",
      date: "26/07/2026",
      time: "17h00 (Tunisie)",
      format: "Google Meet",
    },
    programme: {
      eyebrow: "Au programme",
      title: "Ce que vous allez découvrir",
      subtitle: "Quatre axes clés en une heure d'échange",
      cards: [
        { title: "ISTQB CTFL v4.0", desc: "La certification internationale de référence" },
        { title: "CT-GenAI", desc: "Tester l'IA générative en conditions réelles" },
        { title: "Playwright × Cypress", desc: "Automatisation moderne et intelligente" },
        { title: "Retours du terrain", desc: "Les vrais défis, sans filtre" },
      ],
    },
    infos: {
      eyebrow: "Infos pratiques",
      title: "Rendez-vous en ligne",
      items: [
        { icon: "📅", label: "Date", main: "Dimanche 26 juillet", sub: "2026" },
        { icon: "🕗", label: "Heure", main: "17h00 – 18h00", sub: "Heure de Tunisie (GMT+1)" },
        { icon: "💻", label: "Format", main: "100% en ligne", sub: "Via Google Meet" },
      ],
      zoomNote: "🔗 Le lien Google Meet vous sera envoyé par email après votre inscription.",
    },
    formatrice: {
      eyebrow: "La coach",
      role: "Fondatrice et coach de Quality Expertise",
      bio1: " — Ingénieure QA senior avec 8 ans d'expérience sur des stacks critiques.",
      bio2: (
        <>
          En mission sur un projet <strong>SAP Commerce Cloud / Hybris</strong> pour un grand compte
          en France, elle industrialise l'assurance qualité par l'automatisation augmentée, le
          shift-left testing et l'intégration du GenAI dans les cycles de validation. Son expérience
          couvre également des projets de <strong>data quality</strong>, où elle a sécurisé la
          fiabilité et la gouvernance des données de grandes volumétries. Elle est par ailleurs{" "}
          <strong>chercheuse en data security & quality</strong>, avec un focus sur la résilience,
          la conformité et la protection des pipelines data.
        </>
      ),
      bio3: "Spécialisée dans l'accélération des pipelines CI/CD, la réduction du time-to-market et la mise en place de frameworks qualité scalables et sécurisés — avec un fort accent sur les audits qualité, l'ingénierie haute performance et des pratiques logicielles éthiques et durables.",
      tags: [
        "SAP Commerce Cloud",
        "Test Automation",
        "AI-Augmented QA",
        "Shift-left Testing",
        "Data Quality",
        "Data Security",
        "Ethical Hacking",
        "Test Fonctionnel",
      ],
    },
    inscription: {
      eyebrow: "Inscription",
      title: "Réservez votre place",
      subtitle: "Les places sont limitées — inscrivez-vous gratuitement dès maintenant.",
      calendarCta: "Rejoindre / S'inscrire à l'événement",
      or: "ou remplissez le formulaire",
      fullname: "Nom complet",
      fullnamePh: "Votre nom et prénom",
      email: "Email",
      emailPh: "vous@exemple.com",
      phone: "Téléphone",
      phonePh: "+216 ...",
      langue: "Langue préférée",
      languePh: "Choisissez une langue",
      formation: "Formation qui vous intéresse",
      formationPh: "Choisissez une formation",
      errorFullnameRequired: "Le nom complet est requis.",
      errorEmailRequired: "L'email est requis.",
      errorEmail: "Merci d'indiquer une adresse email valide.",
      errorPhoneRequired: "Le téléphone est requis.",
      errorLangue: "Merci de sélectionner une langue.",
      errorFormation: "Merci de sélectionner une formation.",
      submit: "Confirmer mon inscription",
      submitting: "Envoi en cours…",
      submitError: "Une erreur est survenue lors de l'inscription. Merci de réessayer.",
      consent: "En vous inscrivant, vous acceptez de recevoir le lien Google Meet par email.",
      modalTitle: "Inscription confirmée !",
      modalText:
        "Un email de confirmation avec le lien de connexion vous arrive dans quelques instants.",
      modalClose: "Fermer",
    },
    footer: {
      rights: "Tous droits réservés",
    },
  },
} as const;

const useT = () => T[useLang().lang];

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/5 px-1 py-1 text-xs font-semibold backdrop-blur-sm">
      <Globe className="ml-1 h-3.5 w-3.5 text-white/50" />
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2 py-0.5 uppercase tracking-wider transition-colors ${
            lang === l
              ? "bg-white text-[color:var(--color-brand-violet)]"
              : "text-white/70 hover:text-white"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function useCountdown(target: Date) {
  // `now` starts null so the server render and the client's first (pre-effect) render match
  // exactly — computing Date.now() during the initial render caused a hydration mismatch.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("qe-fade-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}

function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <LandingPageContent />
    </LangContext.Provider>
  );
}

type SubmitStatus = "idle" | "submitting";

function LandingPageContent() {
  const t = useT();
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [langue, setLangue] = useState("");
  const [formation, setFormation] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    fullname?: string;
    email?: string;
    phone?: string;
    langue?: string;
    formation?: string;
  }>({});

  const clearFieldError = (field: keyof typeof fieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nom = fullname.trim();
    const mail = email.trim();
    const telephone = phone.trim();

    const nextErrors: {
      fullname?: string;
      email?: string;
      phone?: string;
      langue?: string;
      formation?: string;
    } = {};
    if (!nom) nextErrors.fullname = t.inscription.errorFullnameRequired;
    if (!mail) nextErrors.email = t.inscription.errorEmailRequired;
    else if (!EMAIL_RE.test(mail)) nextErrors.email = t.inscription.errorEmail;
    if (!telephone) nextErrors.phone = t.inscription.errorPhoneRequired;
    if (!langue) nextErrors.langue = t.inscription.errorLangue;
    if (!formation) nextErrors.formation = t.inscription.errorFormation;
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError(false);
    setStatus("submitting");
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fullName: nom,
          email: mail,
          phone: telephone,
          preferredLanguage: langue,
          program: formation,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("idle");
        setShowConfirmModal(true);
        setFullname("");
        setEmail("");
        setPhone("");
        setLangue("");
        setFormation("");
      } else {
        setSubmitError(true);
        setStatus("idle");
      }
    } catch {
      setSubmitError(true);
      setStatus("idle");
    }
  };

  return (
    <div className="font-sans min-h-screen bg-white text-neutral-900 antialiased">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      {/* HERO */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--color-brand-orange) 25%, transparent), transparent 60%), linear-gradient(160deg, var(--color-brand-violet) 0%, color-mix(in oklab, var(--color-brand-violet) 70%, black) 60%, color-mix(in oklab, var(--color-brand-violet) 45%, black) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="group flex items-center gap-2 text-sm font-semibold tracking-widest transition-opacity hover:opacity-80"
              aria-label="Quality Expertise — retour à l'accueil"
            >
              <img
                src={qeIcon}
                alt=""
                className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
              />
              <span>QUALITY EXPERTISE</span>
            </Link>
            <div className="flex items-center gap-3">
              <LangSwitch />
              <a
                href="#inscription"
                className="hidden rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest transition hover:bg-white/10 md:inline-block"
              >
                {t.signup}
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
              style={{ background: "var(--color-brand-orange)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {t.hero.badge}
            </span>

            <h1
              className="font-display mx-auto max-w-4xl font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.75rem)" }}
            >
              Quality Testing ×{" "}
              <span style={{ color: "var(--color-brand-orange)" }}>{t.hero.title2}</span>
            </h1>

            <p className="mt-5 text-lg font-medium text-white/90 md:text-2xl">{t.hero.subtitle}</p>

            <p className="mt-3 max-w-2xl text-base italic text-white/70 md:text-lg">
              {t.hero.quote}
            </p>

            <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { v: days, l: t.hero.countdown.days },
                { v: hours, l: t.hero.countdown.hours },
                { v: minutes, l: t.hero.countdown.minutes },
                { v: seconds, l: t.hero.countdown.seconds },
              ].map((u) => (
                <div
                  key={u.l}
                  className="min-w-[68px] rounded-xl border border-white/15 bg-white/5 px-3 py-3 backdrop-blur-sm sm:min-w-[92px] sm:px-5 sm:py-4"
                >
                  <div
                    className="font-bold tabular-nums text-white"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                  >
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 sm:text-xs">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#inscription"
              className="group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--color-brand-orange)_60%,transparent)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_color-mix(in_oklab,var(--color-brand-orange)_80%,transparent)]"
              style={{ background: "var(--color-brand-orange)" }}
            >
              {t.hero.cta}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {t.hero.date}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {t.hero.time}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5" /> {t.hero.format}
            </span>
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="bg-[color:var(--color-brand-beige)]/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--color-brand-violet)]">
              {t.programme.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {t.programme.title}
            </h2>
            <p className="mt-3 text-lg text-neutral-600">{t.programme.subtitle}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[Award, BrainCircuit, Zap, Target].map((Icon, i) => {
              const c = t.programme.cards[i];
              return (
                <Reveal key={c.title} className="h-full">
                  <div className="group relative flex h-full flex-col rounded-2xl border border-neutral-200/70 bg-white p-6 transition hover:-translate-y-1 hover:border-[color:var(--color-brand-violet)]/30 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,var(--color-brand-violet)_45%,transparent)]">
                    <div
                      className="mb-6 grid h-12 w-12 place-items-center rounded-xl text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-brand-violet), color-mix(in oklab, var(--color-brand-violet) 70%, black))",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-neutral-900">{c.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{c.desc}</p>
                    <div className="mt-6 h-1 w-8 rounded-full bg-[color:var(--color-brand-orange)] transition-all group-hover:w-16" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="bg-[color:var(--color-brand-violet-light)]/15 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--color-brand-violet)]">
              {t.infos.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {t.infos.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {t.infos.items.map((item) => (
              <Reveal key={item.label}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-white bg-white/70 p-8 text-center backdrop-blur">
                  <div className="text-4xl">{item.icon}</div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--color-brand-violet)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-xl font-bold text-neutral-900">{item.main}</p>
                  <p className="mt-1 text-sm text-neutral-500">{item.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-center text-sm text-neutral-600">{t.infos.zoomNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FORMATRICE */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
            <Reveal>
              <div className="relative mx-auto w-64">
                <div
                  className="absolute -inset-3 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-orange))",
                  }}
                />
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-[color:var(--color-brand-beige)]/30 shadow-[0_20px_50px_-20px_color-mix(in_oklab,var(--color-brand-violet)_45%,transparent)]">
                  <img src={avatar} alt="Najeh Fatnassi" className="h-full w-full object-cover" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--color-brand-orange)]">
                {t.formatrice.eyebrow}
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                Najeh Fatnassi
              </h2>
              <p className="mt-4 text-lg text-neutral-700">
                <strong>{t.formatrice.role}</strong>
                {t.formatrice.bio1}
              </p>
              <p className="mt-3 text-neutral-600">{t.formatrice.bio2}</p>
              <p className="mt-3 text-neutral-600">{t.formatrice.bio3}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.formatrice.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--color-brand-violet)]/20 bg-[color:var(--color-brand-beige)]/30 px-3 py-1 text-xs font-semibold text-[color:var(--color-brand-violet)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INSCRIPTION */}
      <section id="inscription" className="bg-[color:var(--color-brand-beige)]/30 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--color-brand-violet)]">
              {t.inscription.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {t.inscription.title}
            </h2>
            <p className="mt-3 text-lg text-neutral-600">{t.inscription.subtitle}</p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--color-brand-violet)_45%,transparent)] md:p-10">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold text-white transition hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-violet), color-mix(in oklab, var(--color-brand-violet) 70%, black))",
                }}
              >
                <CalendarPlus className="h-4 w-4" />
                {t.inscription.calendarCta}
              </a>

              <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <span className="h-px flex-1 bg-neutral-200" />
                {t.inscription.or}
                <span className="h-px flex-1 bg-neutral-200" />
              </div>

              <form onSubmit={onSubmit} noValidate className="space-y-5">
                {submitError && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {t.inscription.submitError}
                  </div>
                )}

                <FormField
                  id="fullname"
                  label={t.inscription.fullname}
                  type="text"
                  required
                  placeholder={t.inscription.fullnamePh}
                  error={fieldErrors.fullname}
                  value={fullname}
                  onChange={(v) => {
                    setFullname(v);
                    if (v.trim()) clearFieldError("fullname");
                  }}
                />
                <FormField
                  id="email"
                  label={t.inscription.email}
                  type="email"
                  required
                  placeholder={t.inscription.emailPh}
                  error={fieldErrors.email}
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (v.trim() && EMAIL_RE.test(v.trim())) clearFieldError("email");
                  }}
                />
                <FormField
                  id="phone"
                  label={t.inscription.phone}
                  type="tel"
                  required
                  placeholder={t.inscription.phonePh}
                  error={fieldErrors.phone}
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    if (v.trim()) clearFieldError("phone");
                  }}
                />

                <div>
                  <Label
                    htmlFor="langue"
                    className="mb-2 block text-sm font-semibold text-neutral-800"
                  >
                    {t.inscription.langue}
                    <span className="text-[color:var(--color-brand-orange)]"> *</span>
                  </Label>
                  <Select
                    name="langue"
                    value={langue}
                    onValueChange={(v) => {
                      setLangue(v);
                      clearFieldError("langue");
                    }}
                  >
                    <SelectTrigger
                      id="langue"
                      aria-invalid={!!fieldErrors.langue}
                      aria-describedby={fieldErrors.langue ? "langue-error" : undefined}
                      className={`h-auto rounded-xl border-neutral-200 px-4 py-3 text-sm shadow-none data-[placeholder]:text-neutral-400 focus:border-[color:var(--color-brand-violet)] focus:ring-4 focus:ring-[color:var(--color-brand-violet)]/10 ${
                        fieldErrors.langue
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder={t.inscription.languePh} />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.langue && (
                    <p id="langue-error" className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.langue}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="formation"
                    className="mb-2 block text-sm font-semibold text-neutral-800"
                  >
                    {t.inscription.formation}
                    <span className="text-[color:var(--color-brand-orange)]"> *</span>
                  </Label>
                  <Select
                    name="formation"
                    value={formation}
                    onValueChange={(v) => {
                      setFormation(v);
                      clearFieldError("formation");
                    }}
                  >
                    <SelectTrigger
                      id="formation"
                      aria-invalid={!!fieldErrors.formation}
                      aria-describedby={fieldErrors.formation ? "formation-error" : undefined}
                      className={`h-auto rounded-xl border-neutral-200 px-4 py-3 text-sm shadow-none data-[placeholder]:text-neutral-400 focus:border-[color:var(--color-brand-violet)] focus:ring-4 focus:ring-[color:var(--color-brand-violet)]/10 ${
                        fieldErrors.formation
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder={t.inscription.formationPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMATION_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.formation && (
                    <p id="formation-error" className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.formation}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-2 flex h-auto w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_color-mix(in_oklab,var(--color-brand-orange)_70%,transparent)] disabled:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-orange), color-mix(in oklab, var(--color-brand-orange) 75%, black))",
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.inscription.submitting}
                    </>
                  ) : (
                    <>
                      {t.inscription.submit}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-neutral-500">{t.inscription.consent}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-sm rounded-3xl border-neutral-200 text-center sm:rounded-3xl">
          <div className="flex flex-col items-center px-2 py-4">
            <div
              className="grid h-16 w-16 place-items-center rounded-full text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-violet), var(--color-brand-orange))",
              }}
            >
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="mt-6 text-center text-2xl font-bold text-neutral-900">
              {t.inscription.modalTitle}
            </DialogTitle>
            <DialogDescription className="mt-3 text-center text-base text-neutral-600">
              {t.inscription.modalText}
            </DialogDescription>
            <Button
              onClick={() => setShowConfirmModal(false)}
              className="mt-6 w-full rounded-xl px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5"
              style={{ background: "var(--color-brand-violet)" }}
            >
              {t.inscription.modalClose}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FOOTER */}
      <footer className="bg-[color-mix(in_oklab,var(--color-brand-violet)_45%,black)] py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-10">
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-bold tracking-widest transition-opacity hover:opacity-80"
            aria-label="Quality Expertise — retour à l'accueil"
          >
            <img
              src={qeIcon}
              alt=""
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
            />
            QUALITY EXPERTISE
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <a
              href="https://qualityexpertise.eu"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Globe className="h-4 w-4" /> qualityexpertise.eu
            </a>
            <a
              href="mailto:najeh@qualityexpertise.eu"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail className="h-4 w-4" /> najeh@qualityexpertise.eu
            </a>
            <a href="#" className="flex items-center gap-2 transition hover:text-white">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <MapPin className="h-4 w-4" /> Jawhara, Sousse
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Quality Expertise — {t.footer.rights}
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 transition-transform hover:-translate-y-1 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:animate-none" />
    </a>
  );
}

function FormField({
  id,
  label,
  type,
  required,
  placeholder,
  error,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-semibold text-neutral-800">
        {label}
        {required && <span className="text-[color:var(--color-brand-orange)]"> *</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-auto rounded-xl border-neutral-200 px-4 py-3 text-sm shadow-none placeholder:text-neutral-400 focus-visible:border-[color:var(--color-brand-violet)] focus-visible:ring-4 focus-visible:ring-[color:var(--color-brand-violet)]/10 ${
          error ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/10" : ""
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
