"use client";

import React from "react";
import Link from "next/link";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { whyUs, whyUsHeading, whyUsIntro } from "@/config/why-us";

const digits = (s: string) => s.replace(/\D/g, "");

function Heading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-3">
      <span className="editorial-subtitle">{kicker}</span>
      <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-white first-gold">{title}</h2>
      <div className="w-12 h-[1px] bg-primary/60 mx-auto" />
      {sub && <p className="text-sm text-[#a89f8c] font-light leading-relaxed">{sub}</p>}
    </div>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_6px_24px_rgba(201,151,43,.3)]"
    >
      {children} <span>→</span>
    </Link>
  );
}

const section = "py-14 md:py-24 bg-[#0a0a0a] border-b border-plaster-border";

/* ---------- Services preview ---------- */
export function ServicesPreview({ lang }: { lang: Language }) {
  const en = lang === "en";
  const h = translations[lang].hero;
  const worlds = [
    { w: "interior" as const, img: "/images/service-ceiling.jpg" },
    { w: "exterior" as const, img: "/images/material-nets.webp" },
  ];
  return (
    <section className={section}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Heading kicker={en ? "Services" : "ಸೇವೆಗಳು"} title={translations[lang].services.title} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {worlds.map(({ w, img }) => (
            <Link
              key={w}
              href={`/services?tab=${w}`}
              className="relative block overflow-hidden rounded-2xl border border-[#2b2415] aspect-[16/10] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={h[w].label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.92),rgba(0,0,0,.2)_60%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 space-y-2">
                <h3 className="font-serif text-3xl md:text-4xl text-white">{h[w].label}</h3>
                <p className="text-sm text-white/75">{h[w].items.join("  |  ")}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-[#e6c26a]">{h[w].cta} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <MoreLink href="/services">{en ? "All services" : "ಎಲ್ಲಾ ಸೇವೆಗಳು"}</MoreLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Materials preview ---------- */
export function MaterialsPreview({ lang }: { lang: Language }) {
  const en = lang === "en";
  const m = translations[lang].materials;
  const list = [
    { t: m.wood.title, img: "/images/material-wood.webp" },
    { t: m.glass.title, img: "/images/material-glass.webp" },
    { t: m.finishing.title, img: "/images/material-finishes.webp" },
    { t: m.nets.title, img: "/images/material-nets.webp" },
  ];
  return (
    <section className={section}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Heading kicker={en ? "Materials" : "ವಸ್ತುಗಳು"} title={m.title} sub={m.subtitle} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((x) => (
            <Link key={x.t} href="/materials" className="relative block overflow-hidden rounded-xl border border-[#2b2415] aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.img} alt={x.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.9),rgba(0,0,0,0)_60%)]" />
              <p className="absolute inset-x-0 bottom-0 p-4 text-sm md:text-base font-serif text-white leading-snug">{x.t}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <MoreLink href="/materials">{en ? "Explore materials" : "ವಸ್ತುಗಳನ್ನು ನೋಡಿ"}</MoreLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Online estimate ---------- */
export function EstimatePreview({ lang }: { lang: Language }) {
  const en = lang === "en";
  const steps = en
    ? ["Pick what you need", "Enter the size", "Get an instant price range"]
    : ["ನಿಮಗೆ ಬೇಕಾದದ್ದನ್ನು ಆರಿಸಿ", "ಗಾತ್ರ ನಮೂದಿಸಿ", "ತಕ್ಷಣ ಬೆಲೆಯ ಅಂದಾಜು ಪಡೆಯಿರಿ"];
  return (
    <section className={section}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 rounded-3xl border border-[#c9972b]/30 bg-[#131110] py-10 md:py-14 text-center">
        <Heading
          kicker={en ? "Online estimate" : "ಆನ್‌ಲೈನ್ ಅಂದಾಜು"}
          title={en ? "Know your budget in 30 seconds" : "30 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ಬಜೆಟ್ ತಿಳಿಯಿರಿ"}
          sub={en ? "Free, no sign-up, no calls." : "ಉಚಿತ. ಸೈನ್-ಅಪ್ ಬೇಡ, ಕರೆಗಳಿಲ್ಲ."}
        />
        <ol className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-xl border border-[#2b2415] bg-[#0a0a0a] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gold-bar font-semibold">{i + 1}</span>
              <span className="text-sm text-[#f6f2e9]">{s}</span>
            </li>
          ))}
        </ol>
        <MoreLink href="/estimate">{en ? "Get my estimate" : "ನನ್ನ ಅಂದಾಜು ಪಡೆಯಿರಿ"}</MoreLink>
      </div>
    </section>
  );
}

/* ---------- 100% free visit ---------- */
export function FreeVisit({ lang }: { lang: Language }) {
  const en = lang === "en";
  const pts = en
    ? ["We come to your site", "We measure and advise", "No charge. No obligation."]
    : ["ನಾವು ನಿಮ್ಮ ಸೈಟ್‌ಗೆ ಬರುತ್ತೇವೆ", "ಅಳತೆ ಮಾಡಿ ಸಲಹೆ ನೀಡುತ್ತೇವೆ", "ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ. ಯಾವುದೇ ಬಾಧ್ಯತೆಯಿಲ್ಲ."];
  return (
    <section className="py-14 md:py-20 bg-gradient-to-r from-[#8a6414] via-[#c9972b] to-[#f3d27a] text-black">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold">{en ? "Site visit" : "ಸೈಟ್ ಭೇಟಿ"}</span>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-tight">
            {en ? "100% Free Visit" : "100% ಉಚಿತ ಭೇಟಿ"}
          </h2>
          <ul className="space-y-1.5 text-sm md:text-base font-medium">
            {pts.map((p) => (
              <li key={p}>✓ {p}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-self-end">
          <Link href="/contact" className="text-center px-7 py-3.5 rounded-full bg-black text-[#f3d27a] text-xs font-semibold uppercase tracking-[0.2em]">
            {en ? "Book free visit" : "ಉಚಿತ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ"}
          </Link>
          <a
            href={`tel:+${digits(siteConfig.phone)}`}
            className="text-center px-7 py-3.5 rounded-full border-2 border-black text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {en ? "Call" : "ಕರೆ ಮಾಡಿ"} {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- How we are different (content: src/config/why-us.ts) ---------- */
export function WhyUs({ lang }: { lang: Language }) {
  return (
    <section className={section}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Heading kicker="Narviya" title={whyUsHeading[lang]} sub={whyUsIntro[lang]} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whyUs.map((x, i) => (
            <div key={i} className="rounded-2xl border border-[#2b2415] bg-[#131110] p-6 space-y-3">
              <span className="font-serif text-3xl text-[#c9972b]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-xl text-white">{x.title[lang]}</h3>
              <p className="text-sm text-[#a89f8c] leading-relaxed">{x.body[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- closing call-to-action ---------- */
export function ClosingCta({ lang }: { lang: Language }) {
  const en = lang === "en";
  return (
    <section className="py-14 md:py-20 bg-[#0a0a0a] text-center">
      <div className="max-w-2xl mx-auto px-6 space-y-6">
        <h2 className="font-serif text-3xl md:text-5xl text-white first-gold">
          {en ? "Let's build your space" : "ನಿಮ್ಮ ಜಾಗವನ್ನು ಒಟ್ಟಿಗೆ ರೂಪಿಸೋಣ"}
        </h2>
        <MoreLink href="/contact">{en ? "Contact us" : "ಸಂಪರ್ಕಿಸಿ"}</MoreLink>
      </div>
    </section>
  );
}
