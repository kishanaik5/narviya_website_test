"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";

interface GalleryProps {
  lang: Language;
}

type FilterType = "all" | "interiors" | "exteriors" | "materials";

interface ProjectItem {
  id: number;
  category: FilterType;
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  image: string;
  tagsEn: string[];
  tagsKn: string[];
}

export default function Gallery({ lang }: GalleryProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const t = translations[lang].gallery;

  const projects: ProjectItem[] = [
    {
      id: 1,
      category: "interiors",
      titleEn: "The Clay & Timber House",
      titleKn: "ದಿ ಕ್ಲೇ ಮತ್ತು ಟಿಂಬರ್ ಹೌಸ್",
      descEn: "Concept: a light-filled family home built around tactile wood and lime plaster.",
      descKn: "ನೈಸರ್ಗಿಕ ಮರ ಮತ್ತು ಜೇಡಿಮಣ್ಣಿನ ಪ್ಲಾಸ್ಟರ್‌ನೊಂದಿಗೆ ನಿರ್ಮಿಸಿದ ಅತಿ ಸುಂದರ ಮನೆ.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
      tagsEn: ["Residential", "Teak Wood", "Linen"],
      tagsKn: ["ವಸತಿ ಗೃಹ", "ತೇಗದ ಮರ", "ಲಿನಿನ್"]
    },
    {
      id: 2,
      category: "exteriors",
      titleEn: "Boutique Coworking Studio",
      titleKn: "ಬುಟಿಕ್ ಸಹ-ಕೆಲಸದ ಕಚೇರಿ",
      descEn: "Acoustic-focused meeting lounges, fluted glass partitions, and ergonomic desks fostering workflow.",
      descKn: "ಶಬ್ದ ನಿರೋಧಕ ಗಾಜಿನ ಗೋಡೆಗಳು ಮತ್ತು ಸುಂದರ ಮೇಜುಗಳನ್ನು ಹೊಂದಿರುವ ಕಚೇರಿ.",
      image: "/images/material-glass.webp",
      tagsEn: ["Workspace", "Acoustic Glass", "Offices"],
      tagsKn: ["ಕೆಲಸದ ತಾಣ", "ಅಕೌಸ್ಟಿಕ್ ಗ್ಲಾಸ್", "ಕಚೇರಿಗಳು"]
    },
    {
      id: 3,
      category: "materials",
      titleEn: "Balcony Mesh & Steel Guard",
      titleKn: "ಬಾಲ್ಕನಿ ನೆಟ್ ಮತ್ತು ಸ್ಟೀಲ್ ಗಾರ್ಡ್",
      descEn: "High-tensile invisible safety grids installed seamlessly on a luxury apartment overlooking city heights.",
      descKn: "ನಗರದ ದೃಶ್ಯಕ್ಕೆ ಅಡ್ಡಿಯಾಗದಂತೆ ಜೋಡಿಸಲಾದ ಅತ್ಯಂತ ಬಲಿಷ್ಠ ಸೇಫ್ಟಿ ನೆಟ್.",
      image: "/images/material-nets.webp",
      tagsEn: ["Safety Net", "Balcony", "Bird mesh"],
      tagsKn: ["ಸೇಫ್ಟಿ ನೆಟ್", "ಬಾಲ್ಕನಿ", "ಹಕ್ಕಿ ನಿರೋಧಕ"]
    },
    {
      id: 4,
      category: "interiors",
      titleEn: "Minimalist Kitchen & Pantry",
      titleKn: "ಅಚ್ಚುಕಟ್ಟಾದ ಅಡುಗೆಮನೆ ಮತ್ತು ಪ್ಯಾಂಟ್ರಿ",
      descEn: "Zero-joint acrylic kitchen cabinets combined with natural quartz and integrated soft lighting.",
      descKn: "ಆಕ್ರಿಲಿಕ್ ಕ್ಯಾಬಿನೆಟ್‌ಗಳು ಮತ್ತು ಆಯ್ದ ಕ್ವಾರ್ಟ್ಸ್ ಹೊಂದಿರುವ ಆಧುನಿಕ ಅಡುಗೆಮನೆ.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      tagsEn: ["Residential", "Acrylic", "Modular Kitchen"],
      tagsKn: ["ವಸತಿ ಗೃಹ", "ಆಕ್ರಿಲಿಕ್", "ಮಾಡ್ಯುಲರ್ ಕಿಚನ್"]
    },
    {
      id: 5,
      category: "exteriors",
      titleEn: "Minimalist Executive Office",
      titleKn: "ಮಿನಿಮಲಿಸ್ಟ್ ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಕಚೇರಿ",
      descEn: "Bespoke meeting rooms featuring custom timber tables, built-in cables, and copper logo facades.",
      descKn: "ಕಸ್ಟಮ್ ಮರದ ಮೇಜು ಮತ್ತು ರಿಸೆಪ್ಷನ್ ಲೈಟಿಂಗ್ ಹೊಂದಿರುವ ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಕಚೇರಿ.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
      tagsEn: ["Workspace", "Executive Suite", "Office Design"],
      tagsKn: ["ಕೆಲಸದ ತಾಣ", "ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಕೋಣೆ", "ಕಚೇರಿ ವಿನ್ಯಾಸ"]
    },
    {
      id: 6,
      category: "materials",
      titleEn: "Timber Pergola & Facade Cladding",
      titleKn: "ಮರದ ಪರ್ಗೋಲಾ ಮತ್ತು ಹೊರಗೋಡೆ ಕ್ಲಾಡಿಂಗ್",
      descEn: "Treated teak gazebos, heavy-duty HPL wall cladding protecting facades against weathering.",
      descKn: "ಸಂಸ್ಕರಿಸಿದ ಮರದ ಹೊರಾಂಗಣ ಗ್ಯಾಲರಿ ಮತ್ತು ಹವಾಮಾನ ನಿರೋಧಕ ಕ್ಲಾಡಿಂಗ್.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600",
      tagsEn: ["Outdoor", "HPL Cladding", "Pergola"],
      tagsKn: ["ಹೊರಾಂಗಣ", "HPL ಕ್ಲಾಡಿಂಗ್", "ಪರ್ಗೋಲಾ"]
    }
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-28 bg-[#faf8f5] border-b border-plaster-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="editorial-subtitle">{lang === "en" ? "Selected Works" : "ಕೃತಿಗಳು"}</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-neutral-900">
            {t.title}
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto"></div>
          <p className="font-sans text-sm text-neutral-600 font-light leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Editorial Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-plaster-border pb-1">
          {[
            { id: "all", label: t.filterAll },
            { id: "interiors", label: t.filterInteriors },
            { id: "exteriors", label: t.filterExteriors },
            { id: "materials", label: t.filterMaterials },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as FilterType)}
              className={`pb-4 px-3 font-serif text-lg tracking-wide transition-all duration-500 relative cursor-pointer ${
                filter === btn.id
                  ? "text-primary font-medium"
                  : "text-neutral-400 hover:text-neutral-800"
              }`}
            >
              {btn.label}
              {filter === btn.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-reveal"></span>
              )}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="editorial-card group overflow-hidden border border-plaster-border bg-white flex flex-col justify-between"
            >
              {/* Image Visual with floating tags */}
              <div className="relative aspect-[4/3] w-full overflow-hidden zoom-container border-b border-plaster-border">
                <img
                  src={p.image}
                  alt={lang === "en" ? p.titleEn : p.titleKn}
                  className="w-full h-full object-cover zoom-image opacity-95"
                />
                <div className="absolute inset-0 bg-neutral-950/5 mix-blend-overlay"></div>
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {(lang === "en" ? p.tagsEn : p.tagsKn).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] uppercase tracking-wider font-semibold bg-neutral-900/80 text-primary px-2.5 py-1 border border-primary/20 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text descriptions */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-medium text-neutral-900 group-hover:text-primary transition-colors duration-300">
                    {lang === "en" ? p.titleEn : p.titleKn}
                  </h3>
                  <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
                    {lang === "en" ? p.descEn : p.descKn}
                  </p>
                </div>
                
                <div className="pt-2 flex justify-between items-center text-[10px] uppercase tracking-widest font-semibold text-primary">
                  <span>{t.viewProject}</span>
                  <svg className="w-3.5 h-3.5 fill-current transform group-hover:translate-x-1.5 transition-transform duration-300" viewBox="0 0 24 24">
                    <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
