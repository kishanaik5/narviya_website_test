"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";

interface ServicesProps {
  lang: Language;
}

type TabType = "residential" | "commercial" | "outdoor";

export default function Services({ lang }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<TabType>("residential");
  const t = translations[lang].services;

  const residentialItems = [
    {
      id: "kitchen",
      name: t.residential.kitchen.name,
      desc: t.residential.kitchen.desc,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "wardrobe",
      name: t.residential.wardrobe.name,
      desc: t.residential.wardrobe.desc,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "living",
      name: t.residential.living.name,
      desc: t.residential.living.desc,
      image: "/images/hero-bg.webp"
    },
    {
      id: "ceiling",
      name: t.residential.ceiling.name,
      desc: t.residential.ceiling.desc,
      image: "/images/service-ceiling.jpg"
    }
  ];

  const commercialItems = [
    {
      id: "partitions",
      name: t.commercial.partitions.name,
      desc: t.commercial.partitions.desc,
      image: "/images/material-glass.webp"
    },
    {
      id: "conference",
      name: t.commercial.conference.name,
      desc: t.commercial.conference.desc,
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "workstations",
      name: t.commercial.workstations.name,
      desc: t.commercial.workstations.desc,
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "reception",
      name: t.commercial.reception.name,
      desc: t.commercial.reception.desc,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const outdoorItems = [
    {
      id: "cladding",
      name: t.outdoor.cladding.name,
      desc: t.outdoor.cladding.desc,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "glazing",
      name: t.outdoor.glazing.name,
      desc: t.outdoor.glazing.desc,
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "nets",
      name: t.outdoor.nets.name,
      desc: t.outdoor.nets.desc,
      image: "/images/material-nets.webp"
    },
    {
      id: "pergola",
      name: t.outdoor.pergola.name,
      desc: t.outdoor.pergola.desc,
      image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const getActiveItems = () => {
    switch (activeTab) {
      case "residential":
        return residentialItems;
      case "commercial":
        return commercialItems;
      case "outdoor":
        return outdoorItems;
      default:
        return residentialItems;
    }
  };

  const activeItems = getActiveItems();

  return (
    <section id="services" className="py-28 bg-[#faf8f5] border-b border-plaster-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="editorial-subtitle">{lang === "en" ? "Collections" : "ಸೇವೆಗಳು"}</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-neutral-900">
            {t.title}
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto"></div>
          <p className="font-sans text-sm text-neutral-600 font-light leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Editorial Tab Controls */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 border-b border-plaster-border pb-1">
          {(["residential", "commercial", "outdoor"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-3 font-serif text-xl md:text-2xl tracking-wide transition-all duration-500 relative cursor-pointer ${
                activeTab === tab
                  ? "text-primary font-medium"
                  : "text-neutral-400 hover:text-neutral-800"
              }`}
            >
              {tab === "residential" && t.residential.title}
              {tab === "commercial" && t.commercial.title}
              {tab === "outdoor" && t.outdoor.title}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-reveal"></span>
              )}
            </button>
          ))}
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="editorial-card group overflow-hidden border border-plaster-border bg-white flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden zoom-container border-b border-plaster-border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover zoom-image opacity-95"
                  onError={(e) => {
                    // Failbacks
                    if (item.id === "living") e.currentTarget.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600";
                    else if (item.id === "partitions") e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600";
                    else if (item.id === "nets") e.currentTarget.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-neutral-950/5 mix-blend-overlay"></div>
              </div>

              {/* Service Details */}
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                    {activeTab === "residential" && (lang === "en" ? "Residential Design" : "ವಸತಿ ವಿನ್ಯಾಸ")}
                    {activeTab === "commercial" && (lang === "en" ? "Commercial Architecture" : "ಕಚೇರಿ ವಿನ್ಯಾಸ")}
                    {activeTab === "outdoor" && (lang === "en" ? "Exterior Protection" : "ಹೊರಾಂಗಣ ಮತ್ತು ಸೇಫ್ಟಿ")}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-neutral-900 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                </div>
                
                <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-[10px] uppercase tracking-widest text-primary font-sans font-semibold border-b border-primary/20 pb-1 hover:border-primary transition-all duration-300"
                  >
                    {lang === "en" ? "Discuss Project" : "ಯೋಜನೆ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ"}
                    <svg className="w-3 h-3 fill-current ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24">
                      <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
