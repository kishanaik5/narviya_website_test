"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";

interface MaterialsShowcaseProps {
  lang: Language;
}

type MaterialKey = "wood" | "glass" | "finishing" | "nets";

export default function MaterialsShowcase({ lang }: MaterialsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<MaterialKey>("wood");
  const t = translations[lang].materials;

  const materialsList: {
    id: MaterialKey;
    tabLabel: string;
    title: string;
    desc: string;
    specs: string[];
    image: string;
  }[] = [
    {
      id: "wood",
      tabLabel: lang === "en" ? "Wood & Louvers" : "ಮರ ಮತ್ತು ವೆನೀರ್",
      title: t.wood.title,
      desc: t.wood.desc,
      specs: [t.wood.spec1, t.wood.spec2, t.wood.spec3],
      image: "/images/material-wood.webp"
    },
    {
      id: "glass",
      tabLabel: lang === "en" ? "Architectural Glass" : "ಗ್ಲಾಸ್ ವರ್ಕ್ಸ್",
      title: t.glass.title,
      desc: t.glass.desc,
      specs: [t.glass.spec1, t.glass.spec2, t.glass.spec3],
      image: "/images/material-glass.webp"
    },
    {
      id: "finishing",
      tabLabel: lang === "en" ? "Premium Finishes" : "ಆಕರ್ಷಕ ಫಿನಿಶಿಂಗ್ಸ್",
      title: t.finishing.title,
      desc: t.finishing.desc,
      specs: [t.finishing.spec1, t.finishing.spec2, t.finishing.spec3],
      image: "/images/material-finishes.webp"
    },
    {
      id: "nets",
      tabLabel: lang === "en" ? "Outdoor Safety Nets" : "ಸೇಫ್ಟಿ ನೆಟ್ಸ್",
      title: t.nets.title,
      desc: t.nets.desc,
      specs: [t.nets.spec1, t.nets.spec2, t.nets.spec3],
      image: "/images/material-nets.webp"
    }
  ];

  const currentMaterial = materialsList.find((m) => m.id === activeTab)!;

  return (
    <section id="materials" className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            {t.title}
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto mb-6"></div>
          <p className="text-neutral-600 dark:text-neutral-400 font-sans font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Outer Box */}
        <div className="glass-panel border border-luxury-border/30 overflow-hidden shadow-xl">
          {/* Tabs bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-luxury-border/30 bg-neutral-100/50 dark:bg-neutral-900/30">
            {materialsList.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`py-6 px-4 font-serif text-lg tracking-wide transition-all duration-300 border-r border-luxury-border/10 last:border-r-0 cursor-pointer ${
                  activeTab === m.id
                    ? "bg-bg-light dark:bg-bg-dark text-primary font-semibold border-t-2 border-t-primary"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {m.tabLabel}
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Details Column */}
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-white">
                {currentMaterial.title}
              </h3>
              <p className="font-sans text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                {currentMaterial.desc}
              </p>

              {/* Specifications checklist */}
              <div className="space-y-3 pt-4">
                {currentMaterial.specs.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                      </svg>
                    </span>
                    <span className="font-sans text-sm font-medium tracking-wide">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Consultation CTA */}
              <div className="pt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center text-xs uppercase tracking-widest text-primary font-sans font-semibold border-b border-primary/40 pb-1.5 hover:border-primary transition-all duration-300"
                >
                  {lang === "en" ? "Consult About Materials" : "ಪರಿಕರಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ"}
                  <svg className="w-3.5 h-3.5 fill-current ml-2" viewBox="0 0 24 24">
                    <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-border/30 gold-shadow zoom-container">
              <img
                src={currentMaterial.image}
                alt={currentMaterial.title}
                className="w-full h-full object-cover zoom-image opacity-95 dark:opacity-80"
                onError={(e) => {
                  if (currentMaterial.id === "wood") e.currentTarget.src = "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800";
                  else if (currentMaterial.id === "glass") e.currentTarget.src = "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800";
                  else if (currentMaterial.id === "finishing") e.currentTarget.src = "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&q=80&w=800";
                  else if (currentMaterial.id === "nets") e.currentTarget.src = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
