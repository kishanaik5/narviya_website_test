"use client";

import React, { useEffect, useState } from "react";
import { useWorld } from "@/lib/useWorld";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Language, translations } from "@/locales/translations";

interface ServicesProps {
  lang: Language;
}

type TabType = "interior" | "exterior";

export default function Services({ lang }: ServicesProps) {
  // Opened from the home page with ?tab=interior|exterior
  const tabParam = useSearchParams().get("tab");
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === "exterior" ? "exterior" : "interior");
  const { setWorld } = useWorld();
  useEffect(() => {
    setWorld(activeTab); // the visiting card follows the tab being explored
  }, [activeTab, setWorld]);
  const t = translations[lang].services;
  const h = translations[lang].hero;

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

  const getActiveItems = () =>
    activeTab === "interior" ? [...residentialItems, ...commercialItems] : outdoorItems;

  const activeItems = getActiveItems();

  return (
    <section id="services" className="py-14 md:py-28 bg-[#0a0a0a] border-b border-plaster-border scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-20 space-y-3 md:space-y-4">
          <span className="editorial-subtitle">{lang === "en" ? "Collections" : "ಸೇವೆಗಳು"}</span>
          <h2 className="font-serif text-3xl md:text-6xl font-light tracking-wide text-white first-gold">
            {t.title}
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto"></div>
          <p className="font-sans text-sm text-[#a89f8c] font-light leading-relaxed max-w-xl mx-auto hidden md:block">
            {t.subtitle}
          </p>
        </div>

        {/* Interior | Exterior toggle */}
        <div className="flex justify-center mb-8 md:mb-14">
          <div role="tablist" className="inline-flex rounded-full border border-[#c9972b]/40 p-1 bg-[#131110]">
            {(["interior", "exterior"] as TabType[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-500 cursor-pointer ${
                  activeTab === tab ? "gold-bar font-semibold" : "text-[#a89f8c] hover:text-[#f6f2e9]"
                }`}
              >
                {h[tab].label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Services Grid */}
        <div key={activeTab} className="animate-fade-in opacity-0 flex md:grid md:grid-cols-2 gap-4 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="editorial-card group overflow-hidden border border-plaster-border bg-[#131110] flex flex-col justify-between shrink-0 w-[78%] sm:w-[60%] md:w-auto snap-center"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/9] md:aspect-[16/10] w-full overflow-hidden zoom-container border-b border-plaster-border">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={600}
                  height={375}
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
              <div className="p-5 md:p-8 space-y-3 md:space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9972b] font-sans">
                    {residentialItems.includes(item)
                      ? lang === "en" ? "Residential" : "ವಸತಿ"
                      : commercialItems.includes(item)
                      ? lang === "en" ? "Workspace" : "ಕಚೇರಿ"
                      : lang === "en" ? "Exterior" : "ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್"}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#f6f2e9] group-hover:text-[#f3d27a] transition-colors duration-300">
                    {item.name}
                  </h3>
                </div>
                
                <p className="font-sans text-xs text-[#a89f8c] font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                  {item.desc}
                </p>
                
                <div className="pt-1 md:pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-[10px] uppercase tracking-widest text-primary font-sans font-semibold border-b border-primary/20 pb-1 hover:border-primary transition-all duration-300"
                  >
                    {lang === "en" ? "Discuss Project" : "ಯೋಜನೆ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ"}
                    <svg className="w-3 h-3 fill-current ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24">
                      <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
