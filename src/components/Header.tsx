"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Language, translations } from "@/locales/translations";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[lang].nav;
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.home, href: "/" },
    { name: t.services, href: "/services" },
    { name: t.materials, href: "/materials" },
    { name: t.estimate, href: "/estimate" },
    { name: t.gallery, href: "/gallery" },
    { name: t.about, href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3.5 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2b2415] shadow-[0_4px_25px_rgba(28,26,23,0.06)]"
          : "py-5 bg-[#0a0a0a]/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-[#f6f2e9] group-hover:text-[#c9972b] transition-colors duration-300">
            {t.brand}
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#a89f8c] font-sans font-medium">
            {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium tracking-wide hover:text-[#c9972b] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#c9972b] after:transition-all after:duration-300 hover:after:w-full ${
                isActive(item.href) ? "text-[#c9972b] after:w-full" : "text-[#f6f2e9] after:w-0"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Controls (High-Visibility Language Switcher & Consultation CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* High-Visibility Language Switcher Button */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-[#c9972b]/40 bg-[#131110] text-[#f6f2e9] hover:bg-[#c9972b] hover:text-black transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            title="Switch Language"
          >
            <svg className="w-3.5 h-3.5 text-[#c9972b] group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>{lang === "en" ? "ಕನ್ನಡ (KN)" : "English (EN)"}</span>
          </button>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black font-sans rounded-full hover:shadow-[0_4px_18px_rgba(154,125,70,0.35)] hover:brightness-105 active:scale-98 transition-all duration-300"
          >
            {t.contact}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2.5">
          {/* Mobile High-Visibility Lang Button */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            aria-label={lang === "en" ? "Switch to Kannada" : "Switch to English"}
            className="text-base leading-none font-bold w-9 h-9 flex items-center justify-center rounded-full border border-[#c9972b]/40 bg-[#131110] text-[#f6f2e9] shadow-sm active:scale-95"
          >
            {lang === "en" ? "ಕ" : "A"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#f6f2e9] hover:text-[#c9972b] transition-colors"
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
        <div className="md:hidden animate-fade-in absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-[#2b2415] py-6 px-8 flex flex-col space-y-4 shadow-xl text-[#f6f2e9]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-[#f6f2e9] hover:text-[#c9972b] transition-colors py-1.5"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="h-[1px] bg-[#2b2415] my-2"></div>
          
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3 bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black font-semibold uppercase tracking-wider text-xs rounded-xl shadow-md mt-2"
          >
            {t.contact}
          </Link>
        </div>
      )}
    </header>
  );
}
