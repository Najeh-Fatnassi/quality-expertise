import { createFileRoute, Link } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import {
  BookOpen,
  Bot,
  Compass,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Linkedin,
  Facebook,
  Instagram,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Globe,
  ChevronDown,
  Calendar,
  Clock,
  Monitor,
} from "lucide-react";
import qeIcon from "@/assets/qe-icon.png";
import emmakLogo from "@/assets/emmak-logo.png";
import istqbLogo from "@/assets/istqb-logo.png";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rue+20+Mars%2C+Jawhara%2C+Sousse%2C+Tunisie";

const WHATSAPP_URL = "https://wa.me/21627730227";

type Lang = "en" | "fr";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});
const useLang = () => useContext(LangContext);

const T = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      events: "Events",
      faq: "FAQ",
      cta: "Book a Free Consultation",
    },
    eventBanner: "🎓 Free session on July 26, 2026 — Sign up",
    hero: {
      badge: "ISTQB® · GenAI Edition · 100% Online",
      title1: "Get ISTQB® Certified.",
      title2: "Get Career-Ready.",
      sub: "Structured prep for the ISTQB® Foundation Level v4.0 (GenAI content), hands-on master classes on AI-powered QA automation, and 1:1 career coaching — built by QA experts, delivered fully online.",
      cta1: "Explore Our Trainings",
      cta2: "Talk to Us on WhatsApp",
      stats: [
        { k: "100%", v: "Online" },
        { k: "1:1", v: "Coaching" },
        { k: "GenAI", v: "Curriculum" },
      ],
      cardTitle: "ISTQB® CTFL v4.0",
      cardSub: "Foundation Level — GenAI Edition",
      cardItems: [
        "Latest syllabus, including AI-related testing",
        "Mock exams and real-world case studies",
        "Career roadmap & interview prep",
        "1:1 mentorship with senior QA experts",
      ],
      cardCohort: "Next cohort · rolling admissions",
      cardReserve: "Reserve seat →",
    },
    about: {
      eyebrow: "About Us",
      title: "Online training & coaching, built by QA experts.",
      intro:
        "Quality Expertise is an online training and coaching organism dedicated to Software Quality Assurance. We prepare IT professionals, developers, and career-changers for ISTQB® certification and real-world QA & automation careers.",
      missionTitle: "Our Mission",
      mission:
        "Democratize access to high-quality QA training — combining rigorous methodology with real, hands-on practice, so every learner can move confidently into a professional QA role.",
      visionTitle: "Our Vision",
      vision:
        "Become a reference in QA training and coaching — where quality is not just controlled, it's engineered end-to-end, with AI as a daily ally.",
    },
    services: {
      eyebrow: "Our Services",
      title: "Programs designed to certify, upskill, and place you.",
      intro: "Four focused tracks — pick the one that matches where you are in your QA journey.",
      learnMore: "Learn more",
      online: "All programs currently delivered",
      onlineBold: "100% online",
      items: [
        {
          title: "ISTQB® Foundation Level Training",
          subtitle: "CTFL v4.0 — GenAI Edition",
          body: "Structured prep course covering the latest syllabus, including AI-related testing concepts. Built to pass the official exam with confidence.",
        },
        {
          title: "Master Classes — AI for QA Automation",
          subtitle: "Hands-on with GenAI",
          body: "Live sessions and simulations on using Generative AI to automate test design, execution, and quality pipelines end-to-end.",
        },
        {
          title: "1:1 Career Coaching",
          subtitle: "For QA & career-changers",
          body: "Personalized guidance for QA professionals and developers moving into testing — CV review, interview prep, and a clear roadmap.",
        },
        {
          title: "Career Path Certification Coaching",
          subtitle: "1:1 long-term planning",
          body: "Tailored certification and career planning sessions to map out long-term QA progression from Foundation to Advanced roles.",
        },
      ],
    },
    events: {
      eyebrow: "Upcoming Event",
      title: "Quality Testing × Artificial Intelligence",
      sub: "Free online discovery session",
      date: "Sunday, July 26, 2026",
      time: "17:00 (Tunisia)",
      format: "Online · Google Meet",
      cta: "Reserve your seat",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered.",
      intro: "Everything you were about to ask us on WhatsApp.",
      items: [
        {
          q: "Do I need prior QA experience to join?",
          a: "No — our Foundation track is built for beginners and career-changers, while the master classes and 1:1 coaching suit practitioners levelling up.",
        },
        {
          q: "Is everything really delivered online?",
          a: "Yes. Every session, exam prep, and mentoring call happens online — live and recorded, so you can revisit anything you missed.",
        },
        {
          q: "What makes the GenAI content different from a standard ISTQB course?",
          a: "We layer AI-specific testing scenarios on top of the official CTFL v4.0 syllabus, so you're prepared for both the exam and for how testing actually works today.",
        },
        {
          q: "How do I book the free consultation?",
          a: "Use the Contact section below — email, phone, or WhatsApp — and we'll schedule a time that works for you.",
        },
      ],
    },
    footer: {
      tagline:
        "Online QA training & coaching. ISTQB® certification, AI-powered automation master classes, and career mentorship — for professionals building the future of quality.",
      values: "Our values",
      valueItems: [
        "Methodological rigor",
        "Real-world practice",
        "Personalized support",
        "Professional excellence",
      ],
      partners: "Partners",
      copy: "© 2026 Quality Expertise — All rights reserved",
    },
  },
  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      events: "Événements",
      faq: "FAQ",
      cta: "Réserver une consultation gratuite",
    },
    eventBanner: "🎓 Session gratuite le 26 juillet 2026 — Je m'inscris",
    hero: {
      badge: "ISTQB® · Édition GenAI · 100% En ligne",
      title1: "Certifiez-vous ISTQB®.",
      title2: "Prêt(e) pour votre carrière.",
      sub: "Préparation structurée à l'ISTQB® Foundation Level v4.0 (contenu GenAI), master classes pratiques sur l'automatisation QA propulsée par l'IA, et coaching de carrière 1:1 — conçu par des experts QA, 100% en ligne.",
      cta1: "Découvrir nos formations",
      cta2: "Discutez-nous sur WhatsApp",
      stats: [
        { k: "100%", v: "En ligne" },
        { k: "1:1", v: "Coaching" },
        { k: "GenAI", v: "Programme" },
      ],
      cardTitle: "ISTQB® CTFL v4.0",
      cardSub: "Foundation Level — Édition GenAI",
      cardItems: [
        "Dernier syllabus, incluant les tests liés à l'IA",
        "Examens blancs et cas réels",
        "Feuille de route carrière & préparation d'entretien",
        "Mentorat 1:1 avec des experts QA seniors",
      ],
      cardCohort: "Prochaine cohorte · inscriptions ouvertes",
      cardReserve: "Réserver une place →",
    },
    about: {
      eyebrow: "À propos",
      title: "Formation et coaching en ligne, par des experts QA.",
      intro:
        "Quality Expertise est un organisme de formation et de coaching en ligne dédié à l'Assurance Qualité Logicielle. Nous préparons les professionnels IT, développeurs et personnes en reconversion à la certification ISTQB® et aux métiers réels du QA & de l'automatisation.",
      missionTitle: "Notre mission",
      mission:
        "Démocratiser l'accès à une formation QA de qualité — en combinant rigueur méthodologique et pratique réelle, pour que chaque apprenant puisse évoluer avec confiance vers un poste QA professionnel.",
      visionTitle: "Notre vision",
      vision:
        "Devenir une référence en formation et coaching QA — où la qualité n'est pas seulement contrôlée, mais construite de bout en bout, avec l'IA comme alliée du quotidien.",
    },
    services: {
      eyebrow: "Nos services",
      title: "Des programmes pour certifier, monter en compétences et vous placer.",
      intro: "Quatre parcours ciblés — choisissez celui qui correspond à votre étape QA.",
      learnMore: "En savoir plus",
      online: "Tous les programmes sont actuellement dispensés",
      onlineBold: "100% en ligne",
      items: [
        {
          title: "Formation ISTQB® Foundation Level",
          subtitle: "CTFL v4.0 — Édition GenAI",
          body: "Cours de préparation structuré couvrant le dernier syllabus, y compris les concepts de tests liés à l'IA. Conçu pour réussir l'examen officiel avec sérénité.",
        },
        {
          title: "Master Classes — IA pour l'automatisation QA",
          subtitle: "Pratique avec la GenAI",
          body: "Sessions en direct et simulations sur l'utilisation de l'IA générative pour automatiser la conception, l'exécution et les pipelines de qualité de bout en bout.",
        },
        {
          title: "Coaching de carrière 1:1",
          subtitle: "Pour QA & reconversion",
          body: "Accompagnement personnalisé pour les professionnels QA et les développeurs qui s'orientent vers le test — revue de CV, préparation d'entretien et feuille de route claire.",
        },
        {
          title: "Coaching parcours & certifications",
          subtitle: "Planification long terme 1:1",
          body: "Sessions sur mesure pour planifier votre parcours de certification et de carrière QA du niveau Foundation aux rôles avancés.",
        },
      ],
    },
    events: {
      eyebrow: "Prochain événement",
      title: "Quality Testing × Intelligence Artificielle",
      sub: "Session de découverte gratuite en ligne",
      date: "Dimanche 26 juillet 2026",
      time: "17h00 (Tunisie)",
      format: "En ligne · Google Meet",
      cta: "Réserver ma place",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Vos questions, nos réponses.",
      intro: "Tout ce que vous alliez nous demander sur WhatsApp.",
      items: [
        {
          q: "Ai-je besoin d'expérience QA préalable pour m'inscrire ?",
          a: "Non — notre parcours Foundation est conçu pour les débutants et les personnes en reconversion, tandis que les master classes et le coaching 1:1 conviennent aux praticiens qui montent en compétences.",
        },
        {
          q: "Tout est vraiment dispensé en ligne ?",
          a: "Oui. Chaque session, préparation d'examen et appel de mentorat se déroule en ligne — en direct et enregistré, pour pouvoir tout revoir.",
        },
        {
          q: "Qu'est-ce qui différencie le contenu GenAI d'un cours ISTQB classique ?",
          a: "Nous ajoutons des scénarios de test spécifiques à l'IA au syllabus officiel CTFL v4.0, pour vous préparer à la fois à l'examen et à la réalité du test aujourd'hui.",
        },
        {
          q: "Comment réserver la consultation gratuite ?",
          a: "Utilisez la section Contact ci-dessous — email, téléphone ou WhatsApp — et nous planifierons un créneau qui vous convient.",
        },
      ],
    },
    footer: {
      tagline:
        "Formation et coaching QA en ligne. Certification ISTQB®, master classes en automatisation IA et mentorat carrière — pour les professionnels qui construisent la qualité de demain.",
      values: "Nos valeurs",
      valueItems: [
        "Rigueur méthodologique",
        "Pratique réelle",
        "Accompagnement personnalisé",
        "Excellence professionnelle",
      ],
      partners: "Partenaires",
      copy: "© 2026 Quality Expertise — Tous droits réservés",
    },
  },
} as const;

const useT = () => T[useLang().lang];

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-1 py-1 text-xs font-semibold">
      <Globe className="ml-1 h-3.5 w-3.5 text-neutral-400" />
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2 py-0.5 uppercase tracking-wider transition-colors ${
            lang === l
              ? "bg-[color:var(--color-brand-violet)] text-white"
              : "text-neutral-600 hover:text-[color:var(--color-brand-violet)]"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quality Expertise — ISTQB® Training & QA Career Coaching" },
      {
        name: "description",
        content:
          "Online QA training and coaching: ISTQB® Foundation Level v4.0 (GenAI), AI-powered test automation master classes, and 1:1 career coaching.",
      },
      { property: "og:title", content: "Quality Expertise — ISTQB® Training & QA Coaching" },
      {
        property: "og:description",
        content:
          "Get ISTQB® certified and career-ready. Live training, GenAI test automation master classes, and 1:1 coaching.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("qe-reveal");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("qe-reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as any}
      className={`qe-reveal-init ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Quality Expertise home"
    >
      <img src={qeIcon} alt="" className="h-9 w-9 object-contain" />
      <span className="font-display text-xl font-bold tracking-tight">
        <span style={{ color: "var(--color-brand-orange)" }}>Q</span>
        <span style={{ color: "var(--color-brand-violet)" }}>uality Expertise</span>
      </span>
    </a>
  );
}

function EventBanner() {
  const t = useT();
  return (
    <div className="relative z-50 bg-[color:var(--color-brand-orange)] px-4 py-2.5 text-center font-sans text-sm font-semibold text-white">
      <Link
        to="/session-gratuite"
        className="inline-flex items-center justify-center gap-2 underline-offset-2 hover:underline"
      >
        {t.eventBanner}
      </Link>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const NAV = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#events", label: t.nav.events },
    { href: "#faq", label: t.nav.faq },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-sans text-sm font-medium text-neutral-700 transition-colors hover:text-[color:var(--color-brand-violet)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <Link
            to="/session-gratuite"
            hash="inscription"
            className="hidden rounded-full bg-[color:var(--color-brand-orange)] px-4 py-2 font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {t.nav.cta}
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
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            <div className="px-1 pb-3">
              <LangSwitch />
            </div>
            <div className="flex flex-col gap-0.5 border-t border-neutral-100 pt-2">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-[color:var(--color-brand-violet)]"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <Link
              to="/session-gratuite"
              hash="inscription"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[color:var(--color-brand-orange)] px-4 py-2.5 text-center font-sans text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft geometric backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="qe-float-slow absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color:var(--color-brand-beige)] opacity-70 blur-2xl" />
        <div
          className="qe-float-slow absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-[color:var(--color-brand-violet-light)] opacity-40 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="qe-float-slow absolute left-1/3 bottom-[-6rem] h-72 w-72 rounded-full bg-[color:var(--color-brand-orange)]/20 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <svg
          className="absolute right-8 top-8 hidden opacity-70 md:block"
          width="220"
          height="220"
          viewBox="0 0 200 200"
        >
          <g className="qe-spin-slow" style={{ transformOrigin: "100px 100px" }}>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#f26b3b"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </g>
          <g className="qe-spin-reverse" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#563795" strokeWidth="2" />
          </g>
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#f26b3b"
            strokeWidth="2"
            className="qe-float"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-violet)]/20 bg-white/70 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-violet)]">
            <Sparkles className="h-3.5 w-3.5" /> {t.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            {t.hero.title1}{" "}
            <span style={{ color: "var(--color-brand-orange)" }}>{t.hero.title2}</span>
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-neutral-600 md:text-lg">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-orange)] px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.cta1} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-violet)] bg-white px-6 py-3 font-sans text-sm font-semibold text-[color:var(--color-brand-violet)] transition-colors hover:bg-[color:var(--color-brand-violet)] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> {t.hero.cta2}
            </a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
            {t.hero.stats.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-neutral-200/70 bg-white/70 px-3 py-4"
              >
                <div className="font-display text-2xl font-bold text-[color:var(--color-brand-violet)]">
                  {s.k}
                </div>
                <div className="mt-1 font-sans text-xs uppercase tracking-wider text-neutral-500">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl shadow-violet-900/5">
            <div className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                style={{ background: "var(--color-brand-beige)" }}
              >
                <ShieldCheck className="h-6 w-6" style={{ color: "var(--color-brand-violet)" }} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-base font-bold text-neutral-900">
                  {t.hero.cardTitle}
                </div>
                <div className="truncate font-sans text-xs text-neutral-500">{t.hero.cardSub}</div>
              </div>
            </div>
            <ul className="mt-5 space-y-3 font-sans text-sm text-neutral-700">
              {t.hero.cardItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--color-brand-orange)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[color:var(--color-brand-beige)]/50 px-4 py-3">
              <div className="font-sans text-xs text-neutral-700">{t.hero.cardCohort}</div>
              <Link
                to="/session-gratuite"
                hash="inscription"
                className="font-sans text-xs font-semibold text-[color:var(--color-brand-violet)] hover:underline"
              >
                {t.hero.cardReserve}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  tone?: "light" | "beige" | "violet";
}) {
  const ref = useReveal<HTMLDivElement>();
  const bg =
    tone === "beige"
      ? "bg-[color:var(--color-brand-beige)]/40"
      : tone === "violet"
        ? "bg-[color:var(--color-brand-violet)] text-white"
        : "bg-white";
  return (
    <section id={id} className={`${bg} scroll-mt-20`}>
      <div ref={ref} className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="max-w-2xl">
          <div
            className={`font-sans text-xs font-semibold uppercase tracking-[0.18em] ${tone === "violet" ? "text-[color:var(--color-brand-beige)]" : "text-[color:var(--color-brand-orange)]"}`}
          >
            {eyebrow}
          </div>
          <h2
            className={`mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl ${tone === "violet" ? "text-white" : "text-neutral-900"}`}
          >
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-4 font-sans text-base leading-relaxed ${tone === "violet" ? "text-white/85" : "text-neutral-600"}`}
            >
              {intro}
            </p>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function About() {
  const t = useT();
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.intro}>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-neutral-200 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-violet-500/5">
          <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-violet)]">
            {t.about.missionTitle}
          </div>
          <p className="mt-3 font-sans text-neutral-700">{t.about.mission}</p>
        </Reveal>
        <Reveal
          delay={150}
          className="rounded-3xl border border-neutral-200 bg-[color:var(--color-brand-beige)]/40 p-7 transition-shadow hover:shadow-lg hover:shadow-orange-500/5"
        >
          <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-orange)]">
            {t.about.visionTitle}
          </div>
          <p className="mt-3 font-sans text-neutral-700">{t.about.vision}</p>
        </Reveal>
      </div>
    </Section>
  );
}

const SERVICE_ICONS = [BookOpen, Bot, Compass, RouteIcon] as const;

function Services() {
  const t = useT();
  return (
    <Section
      id="services"
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      intro={t.services.intro}
      tone="beige"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {t.services.items.map((s, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 120}>
              <article className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--color-brand-orange)]/50 hover:shadow-xl hover:shadow-orange-500/5">
                <div
                  className="qe-wiggle-hover grid h-12 w-12 place-items-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{
                    background: "color-mix(in oklab, var(--color-brand-orange) 12%, white)",
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--color-brand-orange)" }} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-neutral-900">{s.title}</h3>
                <div className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-violet)]">
                  {s.subtitle}
                </div>
                <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">{s.body}</p>
                <Link
                  to="/session-gratuite"
                  hash="inscription"
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[color:var(--color-brand-violet)]"
                >
                  {t.services.learnMore}{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-8 text-center font-sans text-sm text-neutral-500">
        {t.services.online}{" "}
        <span className="font-semibold text-neutral-700">{t.services.onlineBold}</span>.
      </p>
    </Section>
  );
}

function UpcomingEvents() {
  const t = useT();
  return (
    <Section
      id="events"
      eyebrow={t.events.eyebrow}
      title={t.events.title}
      intro={t.events.sub}
      tone="violet"
    >
      <Reveal>
        <Link
          to="/session-gratuite"
          className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 sm:flex-row sm:items-center md:p-8"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {t.events.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {t.events.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Monitor className="h-4 w-4" /> {t.events.format}
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[color:var(--color-brand-orange)] px-6 py-3 font-sans text-sm font-semibold text-white transition-transform group-hover:-translate-y-0.5">
            {t.events.cta}{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}

function FAQ() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow={t.faq.eyebrow} title={t.faq.title} intro={t.faq.intro} tone="beige">
      <div className="mx-auto max-w-3xl divide-y divide-neutral-200/70 rounded-3xl border border-neutral-200/70 bg-white">
        {t.faq.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.q} delay={i * 80}>
              <div>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-sans text-sm font-semibold text-neutral-900 transition-colors hover:text-[color:var(--color-brand-violet)]"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[color:var(--color-brand-violet)]" : "text-neutral-400"}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 font-sans text-sm leading-relaxed text-neutral-600">
                    {item.a}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Footer() {
  const t = useT();
  const valueColors = [
    "var(--color-brand-orange)",
    "var(--color-brand-violet)",
    "var(--color-brand-orange)",
    "var(--color-brand-violet)",
  ];
  const partners = [
    { name: "ISTQB", src: istqbLogo },
    { name: "Emmak Prod", src: emmakLogo, href: "https://emmak-prod.com/" },
  ];
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-neutral-600">
            {t.footer.tagline}
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: MapPin, href: MAPS_URL, label: "Google Maps — Jawhara, Sousse" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-[color:var(--color-brand-violet)] hover:text-[color:var(--color-brand-violet)]"
                aria-label={s.label}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="font-display text-sm font-bold text-neutral-900">{t.footer.values}</div>
          <ul className="mt-4 space-y-2 font-sans text-sm text-neutral-600">
            {t.footer.valueItems.map((label, i) => (
              <Reveal
                key={label}
                as="li"
                delay={i * 100}
                className="group flex items-center gap-2 cursor-default"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-150"
                  style={{ background: valueColors[i] }}
                />
                <span className="transition-colors group-hover:text-neutral-900">{label}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="font-display text-sm font-bold text-neutral-900">{t.footer.partners}</div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel="noreferrer"
                title={p.name}
                className="grid h-14 w-24 place-items-center rounded-md border border-neutral-200 bg-white p-2 grayscale transition-all hover:grayscale-0 hover:border-[color:var(--color-brand-violet)]"
              >
                <img src={p.src} alt={p.name} className="max-h-10 max-w-full object-contain" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 sm:flex-row">
          <div className="font-sans text-xs text-neutral-500">{t.footer.copy}</div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 transition-transform hover:-translate-y-1 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:animate-none" />
    </a>
  );
}

function Home() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div
        className="min-h-screen bg-white font-sans text-neutral-900"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <style>{`
        html { scroll-behavior: smooth; }
        .font-display { font-family: var(--font-display); }
        .font-sans { font-family: var(--font-sans); }
      `}</style>
        <EventBanner />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <UpcomingEvents />
          <FAQ />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LangContext.Provider>
  );
}
