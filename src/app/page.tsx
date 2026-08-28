"use client";

import React, { useState } from "react";
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
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("preferredLanguage") as Language;
      if (savedLang === "en" || savedLang === "kn") {
        return savedLang;
      }
    }
    return "en";
  });

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
