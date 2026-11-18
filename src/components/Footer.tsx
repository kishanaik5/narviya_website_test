"use client";

import React from "react";
import Link from "next/link";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import VisitingCard from "./VisitingCard";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-[#0b0a09] text-[#8b826f] border-t border-luxury-border/20 pt-10 md:pt-16 pb-6 md:pb-8 transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-8 mb-8 md:mb-12 items-start">
        {/* Col 1: Brand Column (lg:col-span-3) */}
        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text">
              {t.nav.brand}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#a89f8c]">
              {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
            </span>
          </div>
          <p className="font-sans text-xs font-light leading-relaxed text-[#a89f8c] max-w-xs">
            {lang === "en"
              ? "Exquisite architectural spaces designed with high-end teakwood, soundproof glass facades, and heavy-duty outdoor nets."
              : "ಸುಂದರ ತೇಗದ ಮರಗೆಲಸ, ಗಾಜಿನ ಕಲೆಗಳು ಹಾಗೂ ಬಾಲ್ಕನಿ ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳೊಂದಿಗೆ ಕಲಾತ್ಮಕವಾದ ಇಂಟೀರಿಯರ್ಸ್ ಮತ್ತು ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್ ವಿನ್ಯಾಸಗಳು."}
          </p>
          <nav className="md:hidden flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-[#e6d7ab]">
            {[["#home", t.nav.home], ["#services", t.nav.services], ["#materials", t.nav.materials], ["#gallery", t.nav.gallery], ["#about", t.nav.about]].map(([h, n]) => (
              <a key={h} href={h}>{n}</a>
            ))}
          </nav>
          <div className="text-xs space-y-1 pt-2">
            <p className="font-medium text-neutral-300">{siteConfig.hours.weekdays}</p>
            <p className="text-[#a89f8c]">{siteConfig.hours.sunday}</p>
          </div>
        </div>

        {/* Col 2: Quick Links Column (lg:col-span-2) */}
        <div className="hidden md:block lg:col-span-2">
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Quick Links" : "ತ್ವರಿತ ಕೊಂಡಿಗಳು"}
          </h4>
          <ul className="space-y-2.5 text-xs font-sans font-light">
            <li>
              <Link href="/" className="hover:text-primary transition-colors duration-300">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/materials" className="hover:text-primary transition-colors duration-300">
                {t.nav.materials}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-primary transition-colors duration-300">
                {t.nav.gallery}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors duration-300">
                {t.nav.about}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Services Column (lg:col-span-3) */}
        <div className="hidden md:block lg:col-span-3">
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Specializations" : "ನಮ್ಮ ಪರಿಣತಿ"}
          </h4>
          <ul className="space-y-2 text-xs font-sans font-light">
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.kitchen.name}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.wardrobe.name}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.services.commercial.partitions.name}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.nets.name}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.cladding.name}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Visiting card (real artwork + zip download) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
          <VisitingCard lang={lang} />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[1px] bg-neutral-900 my-8"></div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a89f8c] font-sans">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.brandShort || "NARVIA"} DESIGN. All rights reserved.
        </p>

        {/* Designed & Built by Credit */}
        <p className="flex items-center gap-1.5 text-[#8b826f]">
          <span>Designed &amp; Built by</span>
          <a
            href="https://kishan-k.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e6c26a] hover:text-[#f3d27a] font-medium underline underline-offset-4 decoration-[#e6c26a]/40 hover:decoration-[#e6c26a] transition-colors cursor-pointer touch-manipulation"
          >
            KISHAN K
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {Object.entries(siteConfig.social).map(([social, value]) => {
            const isPlaceholder = value.startsWith("Add ");
            return (
              <a
                key={social}
                href={isPlaceholder ? "#" : value}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                className="hover:text-primary transition-colors duration-300 capitalize"
                aria-label={social}
                title={isPlaceholder ? `${social}: not set yet` : undefined}
              >
                {social}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
