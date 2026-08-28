"use client";

import React from "react";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24 bg-bg-light relative overflow-hidden">
      {/* Decorative side element */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual Showcase (Teak Wood & Glass lounge) */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-[4/5] w-full overflow-hidden glass-panel border border-luxury-border/30 p-2 gold-shadow">
            <div className="relative w-full h-full overflow-hidden zoom-container">
              <img
                src="/images/hero-bg.webp"
                alt={`${siteConfig.brandName} Experience Center`}
                loading="lazy"
                width={500}
                height={625}
                className="w-full h-full object-cover zoom-image opacity-95"
              />
              <div className="absolute inset-0 bg-neutral-950/20 mix-blend-overlay"></div>
            </div>
          </div>

          {/* About narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-primary">
                {lang === "en" ? "Our Legacy" : "ನಮ್ಮ ಪರಂಪರೆ"}
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
              {t.title}
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-2"></div>

            <p className="font-sans text-neutral-600 font-light leading-relaxed">
              {t.desc1}
            </p>

            <p className="font-sans text-neutral-600 font-light leading-relaxed">
              {t.desc2}
            </p>

            {/* Mission Highlight Card */}
            <div className="p-6 border-l-2 border-primary bg-neutral-50 glass-panel">
              <span className="block font-serif italic text-lg text-neutral-800">
                &ldquo;{t.mission}&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
