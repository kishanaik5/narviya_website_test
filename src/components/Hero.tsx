"use client";

import React from "react";
import { Language, translations } from "@/locales/translations";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-bg-light dark:bg-bg-dark transition-colors duration-500"
    >
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,144,71,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,144,71,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center space-x-2 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-primary">
              {t.tagline}
            </span>
          </div>

          {/* Animated Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight text-neutral-900 dark:text-white">
            <span className="block animate-slide-up opacity-0" style={{ animationDelay: "0.3s" }}>
              {t.title1}
            </span>
            <span className="block font-medium gold-gradient-text animate-slide-up opacity-0" style={{ animationDelay: "0.5s" }}>
              {t.title2}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-sans max-w-xl font-light leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.7s" }}
          >
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 pt-4 animate-fade-in opacity-0"
            style={{ animationDelay: "0.9s" }}
          >
            <a
              href="#gallery"
              className="px-8 py-4 bg-primary text-neutral-950 font-sans font-semibold text-sm uppercase tracking-wider gold-gradient-bg hover:shadow-lg hover:scale-102 hover:brightness-105 active:scale-98 transition-all duration-300"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-luxury-border hover:border-primary text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/50 font-sans font-semibold text-sm uppercase tracking-wider hover:shadow-sm transition-all duration-300"
            >
              {t.ctaSecondary}
            </a>
          </div>

          {/* Quick Stats */}
          <div
            className="grid grid-cols-3 gap-6 pt-12 border-t border-luxury-border/30 max-w-lg animate-fade-in opacity-0"
            style={{ animationDelay: "1.1s" }}
          >
            <div>
              <span className="block font-serif text-3xl md:text-4xl font-semibold text-primary">10+</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">
                {t.experience}
              </span>
            </div>
            <div>
              <span className="block font-serif text-3xl md:text-4xl font-semibold text-primary">350+</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">
                {t.completed}
              </span>
            </div>
            <div>
              <span className="block font-serif text-3xl md:text-4xl font-semibold text-primary">100%</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">
                {t.satisfied}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div
          className="lg:col-span-5 relative w-full aspect-[4/5] overflow-hidden glass-panel border border-luxury-border/40 p-3 gold-shadow animate-fade-in opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="relative w-full h-full overflow-hidden group zoom-container">
            <img
              src="/images/hero-bg.webp"
              alt="Narviya Designers Luxury Living Space Showcase"
              className="w-full h-full object-cover zoom-image opacity-90 dark:opacity-80"
              onError={(e) => {
                // Fallback if image fails or doesn't exist yet
                e.currentTarget.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200";
              }}
            />
            {/* Elegant Overlay Label */}
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                  {lang === "en" ? "Featured Design" : "ವಿಶೇಷ ವಿನ್ಯಾಸ"}
                </span>
                <span className="block font-serif text-lg text-white font-medium">
                  {lang === "en" ? "Bespoke Teak & Glass Lounge" : "ತೇಗದ ಮರ ಮತ್ತು ಗ್ಲಾಸ್ ಲಾಂಜ್"}
                </span>
              </div>
              <div className="h-10 w-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-neutral-900 transition-colors duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
