"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/locales/translations";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.home, href: "#home" },
    { name: t.services, href: "#services" },
    { name: t.materials, href: "#materials" },
    { name: t.gallery, href: "#gallery" },
    { name: t.about, href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3.5 bg-[#fdfcf9]/90 backdrop-blur-md border-b border-[#e9e4d9] shadow-[0_4px_25px_rgba(28,26,23,0.06)]"
          : "py-5 bg-[#fdfcf9]/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#home" className="flex flex-col group">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-[#1c1a17] group-hover:text-[#9a7d46] transition-colors duration-300">
            {t.brand}
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#6b6459] font-sans font-medium">
            {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium tracking-wide text-[#1c1a17] hover:text-[#9a7d46] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#9a7d46] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Controls (High-Visibility Language Switcher & Consultation CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* High-Visibility Language Switcher Button */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-[#9a7d46]/40 bg-white text-[#1c1a17] hover:bg-[#9a7d46] hover:text-white transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            title="Switch Language"
          >
            <svg className="w-3.5 h-3.5 text-[#9a7d46] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>{lang === "en" ? "ಕನ್ನಡ (KN)" : "English (EN)"}</span>
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 bg-gradient-to-r from-[#8a6c37] to-[#d4b47c] text-white font-sans rounded-full hover:shadow-[0_4px_18px_rgba(154,125,70,0.35)] hover:brightness-105 active:scale-98 transition-all duration-300"
          >
            {t.contact}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2.5">
          {/* Mobile High-Visibility Lang Button */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-[#9a7d46]/40 bg-white text-[#1c1a17] shadow-sm active:scale-95"
          >
            {lang === "en" ? "KN" : "EN"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#1c1a17] hover:text-[#9a7d46] transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in absolute top-full left-0 right-0 bg-[#fdfcf9] border-b border-[#e9e4d9] py-6 px-8 flex flex-col space-y-4 shadow-xl text-[#1c1a17]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-[#1c1a17] hover:text-[#9a7d46] transition-colors py-1.5"
            >
              {item.name}
            </a>
          ))}
          
          <div className="h-[1px] bg-[#e9e4d9] my-2"></div>
          
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3 bg-gradient-to-r from-[#8a6c37] to-[#d4b47c] text-white font-semibold uppercase tracking-wider text-xs rounded-xl shadow-md mt-2"
          >
            {t.contact}
          </a>
        </div>
      )}
    </header>
  );
}
