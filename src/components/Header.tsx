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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Sync dark mode state with system or state
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  };

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
          ? "py-4 glass-panel border-b border-luxury-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#home" className="flex flex-col group">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text transition-transform duration-300 group-hover:scale-102">
            {t.brand}
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-primary transition-colors duration-300">
            {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Controls (Language, Theme, CTA) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-luxury-border text-neutral-700 dark:text-neutral-200 hover:bg-primary hover:text-white dark:hover:text-neutral-900 transition-all duration-300 cursor-pointer"
          >
            {lang === "en" ? "ಕನ್ನಡ" : "English"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-luxury-border text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun icon
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z" />
              </svg>
            ) : (
              // Moon icon
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.3-9.7.7-.1 1.3.4 1.4 1.1.1.7-.4 1.3-1.1 1.4-3.3.5-5.6 3.4-5.6 6.8 0 4.1 3.4 7.5 7.5 7.5 3.8 0 7.1-2.9 7.5-6.7.1-.7.7-1.2 1.4-1.1.7.1 1.2.7 1.1 1.4-.7 5-5 8.7-10.4 9.3z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 gold-gradient-bg text-neutral-900 dark:text-neutral-900 font-sans rounded-none hover:shadow-lg hover:brightness-105 active:scale-98 transition-all duration-300"
          >
            {t.contact}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Mobile Lang Button */}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="text-xs font-semibold px-2 py-1 rounded border border-luxury-border text-neutral-700 dark:text-neutral-200"
          >
            {lang === "en" ? "KN" : "EN"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-700 dark:text-neutral-200"
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
        <div className="md:hidden animate-fade-in absolute top-full left-0 right-0 glass-panel border-b border-luxury-border py-6 px-8 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary transition-colors py-1"
            >
              {item.name}
            </a>
          ))}
          
          <div className="h-[1px] bg-luxury-border my-2"></div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-neutral-500">{lang === "en" ? "Dark Mode" : "ಡಾರ್ಕ್ ಮೋಡ್"}</span>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-luxury-border text-neutral-700 dark:text-neutral-200"
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
          
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3 gold-gradient-bg text-neutral-900 font-semibold uppercase tracking-wider text-sm mt-2"
          >
            {t.contact}
          </a>
        </div>
      )}
    </header>
  );
}
