"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { CardFront, CardBack } from "./BusinessCard";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // PDF Export Handler for the Visiting Card
  const handleDownloadPdf = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      setIsDownloading(true);

      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const frontEl = document.getElementById("pdf-footer-card-front");
      const backEl = document.getElementById("pdf-footer-card-back");

      if (!frontEl || !backEl) {
        throw new Error("Card export sources not found");
      }

      // Render high-res canvases for crisp 300dpi output
      const frontCanvas = await html2canvas(frontEl, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const backCanvas = await html2canvas(backEl, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      // Standard Business Card dimensions: 3.5 in x 2 in (88.9 mm x 50.8 mm)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [88.9, 50.8],
      });

      // Page 1: Front
      pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", 0, 0, 88.9, 50.8, undefined, "FAST");

      // Page 2: Back
      pdf.addPage([88.9, 50.8], "landscape");
      pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", 0, 0, 88.9, 50.8, undefined, "FAST");

      pdf.save("narvia-visiting-card.pdf");

      setToastMsg("Visiting Card PDF Downloaded!");
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <footer className="bg-[#0b0a09] text-neutral-400 border-t border-luxury-border/20 pt-16 pb-8 transition-colors duration-500 relative overflow-hidden">
      {/* Hidden Offscreen High-Res Containers for Crisp Vector-accurate PDF Generation */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        <div id="pdf-footer-card-front" className="w-[336px] h-[192px] rounded-xl overflow-hidden">
          <CardFront />
        </div>
        <div id="pdf-footer-card-back" className="w-[336px] h-[192px] rounded-xl overflow-hidden">
          <CardBack />
        </div>
      </div>

      {/* Floating Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-primary text-black font-sans text-xs font-semibold shadow-2xl animate-fade-in flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toastMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 items-start">
        {/* Col 1: Brand Column (lg:col-span-3) */}
        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text">
              {t.nav.brand}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {lang === "en" ? "Interior & Exterior Luxury" : "ಐಷಾರಾಮಿ ವಿನ್ಯಾಸಗಾರರು"}
            </span>
          </div>
          <p className="font-sans text-xs font-light leading-relaxed text-neutral-500 max-w-xs">
            {lang === "en"
              ? "Exquisite architectural spaces designed with high-end teakwood, soundproof glass facades, and heavy-duty outdoor nets."
              : "ಸುಂದರ ತೇಗದ ಮರಗೆಲಸ, ಗಾಜಿನ ಕಲೆಗಳು ಹಾಗೂ ಬಾಲ್ಕನಿ ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳೊಂದಿಗೆ ಕಲಾತ್ಮಕವಾದ ಒಳಾಂಗಣ ಮತ್ತು ಹೊರಾಂಗಣ ವಿನ್ಯಾಸಗಳು."}
          </p>
          <div className="text-xs space-y-1 pt-2">
            <p className="font-medium text-neutral-300">{siteConfig.hours.weekdays}</p>
            <p className="text-neutral-500">{siteConfig.hours.sunday}</p>
          </div>
        </div>

        {/* Col 2: Quick Links Column (lg:col-span-2) */}
        <div className="lg:col-span-2">
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Quick Links" : "ತ್ವರಿತ ಕೊಂಡಿಗಳು"}
          </h4>
          <ul className="space-y-2.5 text-xs font-sans font-light">
            <li>
              <a href="#home" className="hover:text-primary transition-colors duration-300">
                {t.nav.home}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-primary transition-colors duration-300">
                {t.nav.materials}
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-primary transition-colors duration-300">
                {t.nav.gallery}
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition-colors duration-300">
                {t.nav.about}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Services Column (lg:col-span-3) */}
        <div className="lg:col-span-3">
          <h4 className="font-serif text-lg text-white font-semibold mb-4 tracking-wide">
            {lang === "en" ? "Specializations" : "ನಮ್ಮ ಪರಿಣತಿ"}
          </h4>
          <ul className="space-y-2 text-xs font-sans font-light">
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.kitchen.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.residential.wardrobe.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.commercial.partitions.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.nets.name}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors duration-300">
                {t.services.outdoor.cladding.name}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Footer Right Corner — Digital Visiting Card (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
          <div className="w-full max-w-[340px] flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c4ab7c] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4ab7c] animate-pulse" />
                {lang === "en" ? "Visiting Card" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"}
              </span>
              <span className="text-[9px] text-neutral-500 font-sans">
                {isFlipped
                  ? lang === "en"
                    ? "Back &middot; Contact Info"
                    : "ಹಿಂಭಾಗ &middot; ಸಂಪರ್ಕ"
                  : lang === "en"
                  ? "Front &middot; Identity"
                  : "ಮುಂಭಾಗ &middot; ಬ್ರ್ಯಾಂಡ್"}
              </span>
            </div>

            {/* Credit Card Container: Vertical portrait on mobile (rotated 90deg card shape with upright text) / Landscape on desktop */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="perspective-1000 w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] aspect-[1/1.42] sm:aspect-[1.75/1] mx-auto lg:mx-0 cursor-pointer touch-manipulation relative group"
              title={lang === "en" ? "Click/tap to flip card" : "ಕಾರ್ಡ್ ತಿರುಗಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ"}
            >
              {/* Rotating 3D card body */}
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT SIDE with top right download icon */}
                <div className="absolute inset-0 backface-hidden shadow-2xl rounded-2xl ring-1 ring-white/10 group-hover:ring-[#c4ab7c]/50 transition-all duration-300">
                  <CardFront onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                  {/* Tap to Flip helper pill */}
                  <div className="absolute bottom-2.5 right-3.5 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#141311] border border-neutral-700 text-[8px] text-neutral-300 group-hover:border-[#c4ab7c] transition-colors">
                    <svg className="w-2.5 h-2.5 text-[#c4ab7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{lang === "en" ? "Tap to flip" : "ತಿರುಗಿಸಿ"}</span>
                  </div>
                </div>

                {/* BACK SIDE with top right download icon */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 shadow-2xl rounded-2xl ring-1 ring-black/10 group-hover:ring-[#9a7d46]/50 transition-all duration-300">
                  <CardBack onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                  {/* Tap to Flip helper pill */}
                  <div className="absolute bottom-2.5 right-3.5 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdfcf9] border border-[#e9e4d9] text-[8px] text-neutral-700 group-hover:border-[#9a7d46] transition-colors">
                    <svg className="w-2.5 h-2.5 text-[#9a7d46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{lang === "en" ? "Tap to flip" : "ತಿರುಗಿಸಿ"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[1px] bg-neutral-900 my-8"></div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-sans">
        <p>
          &copy; {new Date().getFullYear()} {t.nav.brand}.{" "}
          {lang === "en"
            ? "All rights reserved. Designed for elite lifestyles."
            : "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {Object.entries(siteConfig.social).map(([social, value]) => {
            const isPlaceholder = value.startsWith("Add ");
            return (
              <a
                key={social}
                href={isPlaceholder ? "#" : value}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                className="hover:text-primary transition-colors duration-300 capitalize"
                aria-label={social}
                title={isPlaceholder ? `${social}: not set yet` : undefined}
              >
                {social}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
