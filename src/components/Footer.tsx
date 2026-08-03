"use client";

import React from "react";
import { Language, translations } from "@/locales/translations";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-[#0b0a09] text-neutral-400 border-t border-luxury-border/20 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text">
              {t.nav.brand}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
            </span>
          </div>
          <p className="font-sans text-xs font-light leading-relaxed text-neutral-500 max-w-xs">
            {lang === "en"
              ? "Exquisite architectural spaces designed with high-end teakwood, soundproof glass facades, and heavy-duty outdoor nets."
              : "ಸುಂದರ ತೇಗದ ಮರಗೆಲಸ, ಗಾಜಿನ ಕಲೆಗಳು ಹಾಗೂ ಬಾಲ್ಕನಿ ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳೊಂದಿಗೆ ಕಲಾತ್ಮಕವಾದ ಒಳಾಂಗಣ ಮತ್ತು ಹೊರಾಂಗಣ ವಿನ್ಯಾಸಗಳು."}
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Quick Links" : "ತ್ವರಿತ ಕೊಂಡಿಗಳು"}
          </h4>
          <ul className="space-y-2.5 text-xs font-sans font-light">
            <li>
              <a href="#home" className="hover:text-primary transition-colors duration-300">
                {t.nav.home}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-primary transition-colors duration-300">
                {t.nav.materials}
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-primary transition-colors duration-300">
                {t.nav.gallery}
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition-colors duration-300">
                {t.nav.about}
              </a>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Specializations" : "ನಮ್ಮ ಪರಿಣತಿ"}
          </h4>
          <ul className="space-y-2.5 text-xs font-sans font-light">
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.kitchen.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.wardrobe.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.commercial.partitions.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.nets.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.cladding.name}
              </a>
            </li>
          </ul>
        </div>

        {/* Work Hours Column */}
        <div>
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Experience Center" : "ನಮ್ಮ ಕಚೇರಿ ಸಮಯ"}
          </h4>
          <p className="font-sans text-xs font-light leading-relaxed text-neutral-500 mb-4">
            {lang === "en"
              ? "Visit our showroom in HSR Layout to explore wood veneers, acoustic glass profiles, and balcony netting setups."
              : "ಮರ, ಗಾಜು ಮತ್ತು ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳ ಮಾದರಿಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವ ಹೆಚ್.ಎಸ್.ಆರ್ ಲೇಔಟ್‌ನ ಪ್ರದರ್ಶನ ಮಳಿಗೆಗೆ ಭೇಟಿ ನೀಡಿ."}
          </p>
          <div className="text-xs space-y-1">
            <p className="font-medium text-neutral-300">
              {lang === "en" ? "Mon - Sat: 10:00 AM - 8:00 PM" : "ಸೋಮ - ಶನಿ: ಬೆಳಗ್ಗೆ 10:00 - ರಾತ್ರಿ 8:00"}
            </p>
            <p className="text-neutral-500">
              {lang === "en" ? "Sunday: By Appointment Only" : "ಭಾನುವಾರ: ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮಾತ್ರ"}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[1px] bg-neutral-900 my-8"></div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-sans">
        <p>
          &copy; {new Date().getFullYear()} {t.nav.brand}.{" "}
          {lang === "en"
            ? "All rights reserved. Designed for elite lifestyles."
            : "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {["instagram", "facebook", "pinterest", "linkedin"].map((social) => (
            <a
              key={social}
              href={`#${social}`}
              className="hover:text-primary transition-colors duration-300 capitalize"
              aria-label={social}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
