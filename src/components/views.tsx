"use client";

import React, { Suspense } from "react";
import { useLang } from "@/lib/useLang";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MaterialsShowcase from "@/components/MaterialsShowcase";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Estimator from "@/components/Estimator";
import { ServicesPreview, MaterialsPreview, EstimatePreview, FreeVisit, WhyUs, ClosingCta } from "@/components/HomeSections";

/** Inner pages sit under the fixed header, so they get top padding. */
function Inner({ children }: { children: React.ReactNode }) {
  return <div className="pt-16 bg-[#0a0a0a]">{children}</div>;
}

export function HomeView() {
  const { lang } = useLang();
  return (
    <>
      <Hero lang={lang} />
      <ServicesPreview lang={lang} />
      <MaterialsPreview lang={lang} />
      <EstimatePreview lang={lang} />
      <FreeVisit lang={lang} />
      <WhyUs lang={lang} />
      <ClosingCta lang={lang} />
    </>
  );
}
export function ServicesView() { const { lang } = useLang(); return <Inner><Suspense fallback={null}><Services lang={lang} /></Suspense></Inner>; }
export function MaterialsView() { const { lang } = useLang(); return <Inner><MaterialsShowcase lang={lang} /></Inner>; }
export function GalleryView() { const { lang } = useLang(); return <Inner><Gallery lang={lang} /></Inner>; }
export function AboutView() { const { lang } = useLang(); return <Inner><About lang={lang} /></Inner>; }
export function ContactView() { const { lang } = useLang(); return <Inner><ContactForm lang={lang} /></Inner>; }
export function EstimateView() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <Inner>
      <section className="py-14 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-3">
            <span className="editorial-subtitle">{en ? "Online estimate" : "ಆನ್‌ಲೈನ್ ಅಂದಾಜು"}</span>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white first-gold">
              {en ? "Free Estimate" : "ಉಚಿತ ಅಂದಾಜು"}
            </h1>
            <div className="w-12 h-[1px] bg-primary/60 mx-auto" />
            <p className="text-sm text-[#a89f8c]">
              {en ? "Get an instant price range. Then book a 100% free site visit for the exact quote." : "ತಕ್ಷಣ ಬೆಲೆಯ ಅಂದಾಜು ಪಡೆಯಿರಿ. ನಿಖರ ಕೊಟೇಶನ್‌ಗಾಗಿ 100% ಉಚಿತ ಸೈಟ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ."}
            </p>
          </div>
          <Estimator lang={lang} />
        </div>
      </section>
    </Inner>
  );
}
