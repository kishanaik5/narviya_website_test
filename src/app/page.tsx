"use client";

import React, { useState, useEffect } from "react";
import { Language } from "@/locales/translations";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MaterialsShowcase from "@/components/MaterialsShowcase";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CallbackWidget from "@/components/CallbackWidget";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  // Load language preference from local storage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Language;
    if (savedLang === "en" || savedLang === "kn") {
      setLang(savedLang);
    }

    // Set initial theme (dark mode by default for premium branding visual)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <>
      {/* Floating Header */}
      <Header lang={lang} setLang={handleLanguageChange} />

      {/* Main Layout Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Services Section */}
        <Services lang={lang} />

        {/* Materials Interactive Section */}
        <MaterialsShowcase lang={lang} />

        {/* Gallery / Project Showcase */}
        <Gallery lang={lang} />

        {/* About Section */}
        <About lang={lang} />

        {/* Lead Capture Contact Section */}
        <ContactForm lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Callback Trigger Widget */}
      <CallbackWidget lang={lang} />
    </>
  );
}
