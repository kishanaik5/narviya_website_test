"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { CardFront, CardBack } from "./BusinessCard";

interface CallbackWidgetProps {
  lang: Language;
}

export default function CallbackWidget({ lang }: CallbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"card" | "glass" | "wood" | "interior" | "exterior" | "callback" | "contact">("card");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [bubbleText, setBubbleText] = useState("Namaste! 🙏");
  const [showBubble, setShowBubble] = useState(false);

  // Callback Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceNeed, setServiceNeed] = useState("Complete Interior & Exterior");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const t = translations[lang].callback;

  // PDF Export Handler
  const handleDownloadPdf = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      setIsDownloading(true);
      const { downloadCardPdf } = await import("@/lib/downloadCardPdf");
      const success = await downloadCardPdf();

      if (success) {
        setStatusType("success");
        setStatusMsg(lang === "en" ? "narvia-card.pdf Downloaded!" : "narvia-card.pdf ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!");
        setTimeout(() => setStatusMsg(""), 3000);
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    setStatusType("");

    if (honeypot.trim() !== "") {
      setStatusType("error");
      setStatusMsg(t.spamBlock);
      return;
    }

    const now = Date.now();
    const lastSubmission = localStorage.getItem("last_callback_time");
    if (lastSubmission) {
      const timeDiff = now - parseInt(lastSubmission, 10);
      const limitMs = 5 * 60 * 1000;
      if (timeDiff < limitMs) {
        setStatusType("error");
        setStatusMsg(t.rateLimit);
        return;
      }
    }

    setIsSubmitting(true);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, phone, serviceNeed, type: "Concierge Callback Request" }),
        });

        if (response.ok) {
          localStorage.setItem("last_callback_time", now.toString());
          setStatusType("success");
          setStatusMsg(t.success);
          setEmail("");
          setPhone("");
          setTimeout(() => setIsOpen(false), 3000);
        } else {
          throw new Error("Submission error");
        }
      } catch {
        setStatusType("error");
        setStatusMsg(lang === "en" ? "Connection error. Please try again." : "ಸಂಪರ್ಕ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.");
      }
    } else {
      setTimeout(() => {
        localStorage.setItem("last_callback_time", now.toString());
        setStatusType("success");
        setStatusMsg(t.success);
        setEmail("");
        setPhone("");
        setIsSubmitting(false);
        setTimeout(() => setIsOpen(false), 3000);
      }, 1000);
      return;
    }

    setIsSubmitting(false);
  };

  const handleBotClick = () => {
    setShowBubble(true);
    setBubbleText(isOpen ? "Closing concierge! 🙏" : "Namaste! Welcome to Narvia 🙏");
    setTimeout(() => {
      setShowBubble(false);
    }, 2400);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hidden Offscreen Containers for PDF Export */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        <div id="pdf-widget-card-front" className="w-[336px] h-[192px] rounded-xl overflow-hidden">
          <CardFront />
        </div>
        <div id="pdf-widget-card-back" className="w-[336px] h-[192px] rounded-xl overflow-hidden">
          <CardBack />
        </div>
      </div>

      {/* Floating Animated Namaste AI Bot Trigger */}
      <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3 pointer-events-auto">
        {/* Floating Speech Bubble */}
        <div
          className={`transition-all duration-300 transform ${
            showBubble || (!isOpen && false)
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-2 pointer-events-none"
          } px-4 py-2 rounded-2xl bg-[#141311]/95 text-[#fdfcf9] border border-[#c4ab7c]/40 shadow-2xl backdrop-blur-md text-xs font-serif italic text-gold`}
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#141311] border-r border-b border-[#c4ab7c]/40 transform rotate-45" />
        </div>

        {/* Namaste Bot Character Button */}
        <div
          onClick={handleBotClick}
          className="relative cursor-pointer select-none group touch-manipulation"
          title={isOpen ? "Close Assistant" : "Namaste! Tap to open Narvia Concierge"}
        >
          {/* Leaning Namaste Character Container */}
          <div className="w-16 h-20 sm:w-20 sm:h-24 relative transition-transform duration-300 group-hover:scale-105 group-active:scale-95 animate-puppet-float">
            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-[#c4ab7c]/20 rounded-full blur-xl animate-pulse" />

            {/* Antenna */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-1 h-3.5 bg-[#9a7d46] rounded-full z-10" />
            <div className="absolute -top-5.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#9a7d46] via-[#d4b47c] to-[#fdfcf9] shadow-[0_0_12px_rgba(212,180,124,0.9)] animate-pulse z-10" />

            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-12 bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] rounded-[22px_22px_16px_16px] border border-[#c4ab7c] shadow-md z-20 overflow-hidden">
              {/* Gold Bindi / Tilak */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#9a7d46] to-[#d4b47c] shadow-[0_0_4px_rgba(154,125,70,0.8)]" />

              {/* Eyes */}
              <div className="flex justify-center gap-2.5 pt-3.5">
                <div className="w-2 h-2 rounded-full bg-[#1c1a17] relative animate-puppet-blink">
                  <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white opacity-90" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#1c1a17] relative animate-puppet-blink">
                  <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white opacity-90" />
                </div>
              </div>

              {/* Cheeks */}
              <div className="absolute bottom-2.5 left-1.5 w-2 h-1 rounded-full bg-[#c4ab7c]/40" />
              <div className="absolute bottom-2.5 right-1.5 w-2 h-1 rounded-full bg-[#c4ab7c]/40" />

              {/* Smile */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-1.5 border-b-2 border-[#5b3a29] rounded-b-full" />
            </div>

            {/* Body */}
            <div className="absolute top-11 left-1/2 -translate-x-1/2 w-15 h-11 bg-gradient-to-b from-[#2a2620] via-[#1f1d19] to-[#141311] rounded-[14px_14px_18px_18px] border border-[#c4ab7c]/50 shadow-lg z-10">
              {/* Chest Gold Motif */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#c4ab7c]/60 rounded-full" />
            </div>

            {/* Namaste Hands */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-6 h-8 z-30 flex items-center justify-center animate-puppet-wave">
              <div className="w-2.5 h-6 rounded-[8px_2px_4px_2px] bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] border border-[#9a7d46] transform rotate-6 shadow-sm" />
              <div className="w-2.5 h-6 rounded-[2px_8px_2px_4px] bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] border border-[#9a7d46] transform -rotate-6 -ml-1 shadow-sm" />
            </div>

            {/* Grounding Shadow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black/40 blur-[3px]" />
          </div>
        </div>
      </div>

      {/* Floating Concierge Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] max-w-[400px] bg-[#141311]/95 text-[#fdfcf9] border border-[#c4ab7c]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden animate-slide-up">
          {/* Header Bar */}
          <div className="p-4 border-b border-[#c4ab7c]/20 bg-gradient-to-r from-[#1c1a17] to-[#2a2620] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9a7d46] to-[#d4b47c] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full rounded-full bg-[#141311] flex items-center justify-center text-xs">
                  🙏
                </div>
              </div>
              <div>
                <h3 className="font-serif text-base text-[#fdfcf9] font-medium leading-none">
                  {siteConfig.brandShort} Concierge
                </h3>
                <p className="text-[10px] text-[#c4ab7c] font-sans mt-1">
                  Where Vision Meets Space, Built Beautifully
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Discovery Navigation Tabs */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-800 bg-black/40 p-1.5 gap-1 text-xs">
            <button
              onClick={() => setActiveTab("card")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "card"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>🎴 Visiting Card</span>
            </button>

            <button
              onClick={() => setActiveTab("glass")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "glass"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>🪟 Glass Work</span>
            </button>

            <button
              onClick={() => setActiveTab("wood")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "wood"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>🪵 Wood Work</span>
            </button>

            <button
              onClick={() => setActiveTab("interior")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "interior"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>🏛️ Interior</span>
            </button>

            <button
              onClick={() => setActiveTab("exterior")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "exterior"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>🌿 Exterior</span>
            </button>

            <button
              onClick={() => setActiveTab("callback")}
              className={`py-1.5 px-3 rounded-xl font-sans text-[10.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "callback"
                  ? "bg-[#c4ab7c] text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span>📞 Callback</span>
            </button>
          </div>

          {/* Panel Content Area */}
          <div className="p-4 sm:p-5 max-h-[420px] overflow-y-auto">
            {/* Status Toast */}
            {statusMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  statusType === "success"
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                }`}
              >
                <span>{statusMsg}</span>
              </div>
            )}

            {/* TAB 1: VISITING CARD + QUICK SERVICE PILLS BELOW */}
            {activeTab === "card" && (
              <div className="flex flex-col items-center gap-3.5 animate-editorial-fade">
                <div className="flex items-center justify-between w-full px-1 text-[10px] text-neutral-400">
                  <span className="text-[#c4ab7c] font-medium uppercase tracking-wider">
                    {lang === "en" ? "Visiting Card" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"}
                  </span>
                  <span>{lang === "en" ? "Tap card to flip" : "ತಿರುಗಿಸಲು ಸ್ಪರ್ಶಿಸಿ"}</span>
                </div>

                {/* 3D Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="perspective-1000 w-full max-w-[320px] aspect-[1.75/1] cursor-pointer touch-manipulation relative group"
                  title="Click to flip card"
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute inset-0 backface-hidden shadow-2xl rounded-2xl ring-1 ring-white/10 group-hover:ring-[#c4ab7c]/50 transition-all ${
                        isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <CardFront onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 shadow-2xl rounded-2xl ring-1 ring-black/10 group-hover:ring-[#9a7d46]/50 transition-all ${
                        !isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <CardBack onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                    </div>
                  </div>
                </div>

                {/* Service Menu Shortcuts Below Visiting Card */}
                <div className="w-full pt-2">
                  <div className="text-[9px] uppercase tracking-widest text-[#c4ab7c] font-semibold mb-2">
                    Explore Our Specializations:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTab("glass")}
                      className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c] text-left text-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-sm">🪟</span>
                      <div>
                        <div className="font-semibold text-white text-[11px]">Glass Work</div>
                        <div className="text-[9px] text-neutral-400">Facading &amp; Partitions</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab("wood")}
                      className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c] text-left text-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-sm">🪵</span>
                      <div>
                        <div className="font-semibold text-white text-[11px]">Wood Work</div>
                        <div className="text-[9px] text-neutral-400">Kitchens &amp; Wardrobes</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab("interior")}
                      className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c] text-left text-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-sm">🏛️</span>
                      <div>
                        <div className="font-semibold text-white text-[11px]">Interior Design</div>
                        <div className="text-[9px] text-neutral-400">Living &amp; Ceilings</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab("exterior")}
                      className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c] text-left text-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-sm">🌿</span>
                      <div>
                        <div className="font-semibold text-white text-[11px]">Exterior Living</div>
                        <div className="text-[9px] text-neutral-400">Balconies &amp; Nets</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quick Action Download Button */}
                <button
                  onClick={handleDownloadPdf}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#9a7d46] to-[#d4b47c] text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:brightness-105 active:scale-98"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download narvia-card.pdf</span>
                </button>
              </div>
            )}

            {/* TAB: GLASS WORK */}
            {activeTab === "glass" && (
              <div className="space-y-3 animate-editorial-fade">
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-[#c4ab7c]/30">
                  <span className="text-xs uppercase tracking-widest text-[#c4ab7c] font-bold block mb-1">
                    🪟 Architectural Glass Systems
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Custom soundproof acoustic glass partitions, fluted glass wardrobe shutters, sleek sliding glass dividers, and panoramic structural railings for luxury residences and executive offices.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    ✨ Acoustic Soundproofing
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    ✨ Fluted &amp; Tinted Panels
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    ✨ Toughened Glass Railings
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    ✨ Frameless Office Cabins
                  </div>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}?text=Hi%20Narvia,%20I'm%20interested%20in%20Glass%20Work%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Chat on WhatsApp for Glass Quote</span>
                </a>
              </div>
            )}

            {/* TAB: WOOD WORK */}
            {activeTab === "wood" && (
              <div className="space-y-3 animate-editorial-fade">
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-[#c4ab7c]/30">
                  <span className="text-xs uppercase tracking-widest text-[#c4ab7c] font-bold block mb-1">
                    🪵 Bespoke Architectural Woodwork
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Precision in-house fabrication of modular luxury kitchens, walk-in closets, floor-to-ceiling wardrobes, veneer wall paneling, and bespoke solid teakwood furniture.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    🌲 Teakwood &amp; Oak Finishes
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    🌲 Soft-Close Hardware
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    🌲 Integrated Warm Lighting
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300">
                    🌲 In-House Precision Build
                  </div>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}?text=Hi%20Narvia,%20I'm%20interested%20in%20Woodwork%20and%20Kitchens.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Chat on WhatsApp for Woodwork</span>
                </a>
              </div>
            )}

            {/* TAB: INTERIOR DESIGN */}
            {activeTab === "interior" && (
              <div className="space-y-3 animate-editorial-fade">
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-[#c4ab7c]/30">
                  <span className="text-xs uppercase tracking-widest text-[#c4ab7c] font-bold block mb-1">
                    🏛️ Complete Interior Architecture
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Turnkey home personalization, false ceilings with circadian lighting profiles, custom media centers, and sensory plaster wall finishes designed for emotional tranquility.
                  </p>
                </div>
                <a
                  href="#services"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#c4ab7c] hover:bg-[#d4b47c] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>View Interior Collections</span>
                </a>
              </div>
            )}

            {/* TAB: EXTERIOR & BALCONY */}
            {activeTab === "exterior" && (
              <div className="space-y-3 animate-editorial-fade">
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-[#c4ab7c]/30">
                  <span className="text-xs uppercase tracking-widest text-[#c4ab7c] font-bold block mb-1">
                    🌿 Exterior Living &amp; Netting Systems
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Heavy-duty UV-stabilized balcony safety nets, anti-bird netting systems, architectural louvers, and weather-resistant outdoor wood/cladding.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}?text=Hi%20Narvia,%20I'm%20inquiring%20about%20Balcony%20Nets%20and%20Exterior%20cladding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Inquire for Balcony &amp; Nets</span>
                </a>
              </div>
            )}

            {/* TAB: INSTANT CALLBACK */}
            {activeTab === "callback" && (
              <form onSubmit={handleSubmit} className="space-y-3 animate-editorial-fade">
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {lang === "en"
                    ? "Leave your phone number or email for an immediate callback from our lead architect."
                    : "ನಮ್ಮ ಮುಖ್ಯ ವಾಸ್ತುಶಿಲ್ಪಿಗಳಿಂದ ನೇರ ಕಾಲ್‌ಬ್ಯಾಕ್‌ಗಾಗಿ ನಿಮ್ಮ ವಿವರ ನೀಡಿ."}
                </p>

                <div style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
                  <input
                    type="text"
                    name="concierge_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#c4ab7c] font-medium mb-1">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-[#c4ab7c] text-white text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#c4ab7c] font-medium mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-[#c4ab7c] text-white text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#c4ab7c] font-medium mb-1">
                    Interested Service
                  </label>
                  <select
                    value={serviceNeed}
                    onChange={(e) => setServiceNeed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-[#c4ab7c] text-white text-xs focus:outline-none transition-colors"
                  >
                    <option value="Complete Interior & Exterior">Complete Interior &amp; Exterior</option>
                    <option value="Glass Partitions & Facades">Glass Partitions &amp; Facades</option>
                    <option value="Modular Kitchen & Wardrobes">Modular Kitchen &amp; Wardrobes</option>
                    <option value="Balcony Safety Nets & Cladding">Balcony Safety Nets &amp; Cladding</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9a7d46] to-[#d4b47c] hover:brightness-105 active:scale-98 text-black text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md mt-2"
                >
                  {isSubmitting ? t.submitting : "Request Architect Callback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
