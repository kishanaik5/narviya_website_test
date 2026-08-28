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
  const [activeTab, setActiveTab] = useState<"card" | "callback" | "contact">("card");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Callback Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const t = translations[lang].callback;
  const cardT = translations[lang].card;

  // PDF Export Handler (Directly downloads narvia-card.pdf)
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
          body: JSON.stringify({ email, phone, type: "Concierge Callback Request" }),
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

      {/* Floating Animated Puppet Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Floating Bubble Tooltip (when closed) */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1a17]/90 text-white border border-[#c4ab7c]/40 shadow-xl backdrop-blur-md cursor-pointer hover:border-[#c4ab7c] transition-all duration-300 animate-puppet-float group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-sans font-medium text-neutral-200 group-hover:text-primary transition-colors">
              {lang === "en" ? "Studio Assistant & Card" : "ಸ್ಟುಡಿಯೋ ಸಹಾಯಕ & ಕಾರ್ಡ್"}
            </span>
          </div>
        )}

        {/* Animated Corner Puppet Icon Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#1c1a17] via-[#2a2620] to-[#141311] border-2 border-[#c4ab7c] shadow-[0_8px_30px_rgba(196,171,124,0.35)] hover:shadow-[0_8px_35px_rgba(196,171,124,0.55)] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label={isOpen ? "Close Concierge" : "Open Studio Concierge"}
        >
          {/* Glowing Pulse Rings */}
          <div className="absolute inset-0 rounded-full bg-[#c4ab7c]/20 animate-ping pointer-events-none opacity-40" />

          {isOpen ? (
            /* Close State Icon */
            <svg className="w-6 h-6 text-[#c4ab7c] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Animated Luxury Architect / Designer Puppet Character */
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center animate-puppet-float">
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Puppet Body / Suit */}
                <path d="M18 54C18 43 24 38 32 38C40 38 46 43 46 54C46 58 40 60 32 60C24 60 18 58 18 54Z" fill="#2a2620" stroke="#c4ab7c" strokeWidth="1.5" />
                
                {/* Golden Tie / Lapel */}
                <path d="M32 38L30 48L32 52L34 48L32 38Z" fill="#c4ab7c" />

                {/* Puppet Head */}
                <circle cx="32" cy="24" r="14" fill="#f5f2eb" stroke="#c4ab7c" strokeWidth="1.5" />

                {/* Designer Glasses */}
                <rect x="22" y="20" width="8" height="7" rx="2" stroke="#1c1a17" strokeWidth="1.5" fill="#c4ab7c" fillOpacity="0.2" />
                <rect x="34" y="20" width="8" height="7" rx="2" stroke="#1c1a17" strokeWidth="1.5" fill="#c4ab7c" fillOpacity="0.2" />
                <line x1="30" y1="23" x2="34" y2="23" stroke="#1c1a17" strokeWidth="1.5" />

                {/* Eyes with blink animation */}
                <g className="animate-puppet-blink">
                  <circle cx="26" cy="23" r="1.5" fill="#1c1a17" />
                  <circle cx="38" cy="23" r="1.5" fill="#1c1a17" />
                </g>

                {/* Friendly Smile */}
                <path d="M28 29C29.5 31 34.5 31 36 29" stroke="#1c1a17" strokeWidth="1.5" strokeLinecap="round" />

                {/* Architect Beret / Cap */}
                <path d="M18 20C18 12 24 8 34 8C42 8 47 12 47 18C47 20 44 21 34 21C22 21 18 20 18 20Z" fill="#1c1a17" />
                <circle cx="34" cy="7" r="2" fill="#c4ab7c" />

                {/* Waving Hand / Puppet Gesture */}
                <g className="animate-puppet-wave">
                  <path d="M46 44C50 41 54 36 53 32C52 29 48 31 47 34L45 40" stroke="#c4ab7c" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="53" cy="31" r="3" fill="#c4ab7c" />
                </g>
              </svg>

              {/* Online Indicator Badge */}
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1c1a17]" />
            </div>
          )}
        </button>
      </div>

      {/* Side List Panel / Drawer Popout */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] rounded-3xl bg-[#141311]/95 text-white border border-[#c4ab7c]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-editorial-fade overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 bg-gradient-to-r from-[#1c1a17] to-[#141311] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c4ab7c]/20 border border-[#c4ab7c]/40 flex items-center justify-center text-[#c4ab7c]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-white tracking-wide flex items-center gap-1.5">
                  <span>{siteConfig.brandShort} Studio Concierge</span>
                </h3>
                <p className="text-[10px] text-neutral-400 font-sans">
                  {lang === "en" ? "Fast access to credentials & connect" : "ತ್ವರಿತ ಸಂಪರ್ಕ ಮತ್ತು ಮಾಹಿತಿ"}
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

          {/* Tab Selection Bar */}
          <div className="flex border-b border-neutral-800 bg-black/40 p-1.5 gap-1 text-xs">
            <button
              onClick={() => setActiveTab("card")}
              className={`flex-1 py-2 px-2 rounded-xl font-sans text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "card"
                  ? "bg-[#c4ab7c] text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>{lang === "en" ? "Visiting Card" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"}</span>
            </button>

            <button
              onClick={() => setActiveTab("callback")}
              className={`flex-1 py-2 px-2 rounded-xl font-sans text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "callback"
                  ? "bg-[#c4ab7c] text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{lang === "en" ? "Callback" : "ಕಾಲ್‌ಬ್ಯಾಕ್"}</span>
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-2 px-2 rounded-xl font-sans text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "contact"
                  ? "bg-[#c4ab7c] text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{lang === "en" ? "Direct" : "ಸಂಪರ್ಕ"}</span>
            </button>
          </div>

          {/* Panel Content Area */}
          <div className="p-4 sm:p-5 max-h-[440px] overflow-y-auto">
            {/* Status Toast */}
            {statusMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  statusType === "success"
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{statusMsg}</span>
              </div>
            )}

            {/* TAB 1: VISITING CARD */}
            {activeTab === "card" && (
              <div className="flex flex-col items-center gap-3.5 animate-editorial-fade">
                <div className="flex items-center justify-between w-full px-1 text-[10px] text-neutral-400">
                  <span className="text-[#c4ab7c] font-medium uppercase tracking-wider">
                    {isFlipped ? "Back: Studio Info" : "Front: Brand Identity"}
                  </span>
                  <span>{lang === "en" ? "Tap card to flip" : "ತಿರುಗಿಸಲು ಸ್ಪರ್ಶಿಸಿ"}</span>
                </div>

                {/* 3D Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="perspective-1000 w-full aspect-[1.75/1] cursor-pointer touch-manipulation relative group"
                  title="Click to flip card"
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden shadow-2xl rounded-2xl ring-1 ring-white/10 group-hover:ring-[#c4ab7c]/50 transition-all">
                      <CardFront onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 shadow-2xl rounded-2xl ring-1 ring-black/10 group-hover:ring-[#9a7d46]/50 transition-all">
                      <CardBack onDownload={handleDownloadPdf} isDownloading={isDownloading} />
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="w-full grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#c4ab7c]/40 text-neutral-300 text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-[#c4ab7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{cardT.flipButton}</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#c4ab7c] to-[#9a7d46] text-black text-[10px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    <span>{lang === "en" ? "PDF Card" : "PDF ಕಾರ್ಡ್"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: REQUEST CALLBACK */}
            {activeTab === "callback" && (
              <form onSubmit={handleSubmit} className="space-y-3.5 animate-editorial-fade">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {t.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* Anti-bot Honeypot */}
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, zIndex: -1 }}>
                  <input
                    type="text"
                    name="fullname"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    placeholder="Leave empty"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400 mb-1">
                    {lang === "en" ? "Email Address" : "ಇಮೇಲ್ ವಿಳಾಸ"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#c4ab7c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400 mb-1">
                    {lang === "en" ? "Phone Number" : "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#c4ab7c] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c4ab7c] to-[#9a7d46] text-black font-sans font-bold uppercase tracking-wider text-[10px] hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg mt-2"
                >
                  {isSubmitting ? t.submitting : t.button}
                </button>
              </form>
            )}

            {/* TAB 3: DIRECT CHANNELS */}
            {activeTab === "contact" && (
              <div className="space-y-2.5 animate-editorial-fade">
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">WhatsApp Consultation</div>
                      <div className="text-[10px] text-neutral-400">Instant design chat &amp; quote</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Chat</span>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c]/50 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#c4ab7c]/10 border border-[#c4ab7c]/30 flex items-center justify-center text-[#c4ab7c] group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Direct Phone Call</div>
                      <div className="text-[10px] text-neutral-400">{siteConfig.phone}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#c4ab7c] font-semibold uppercase">Call</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-[#c4ab7c]/50 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#c4ab7c]/10 border border-[#c4ab7c]/30 flex items-center justify-center text-[#c4ab7c] group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Email Inquiries</div>
                      <div className="text-[10px] text-neutral-400">{siteConfig.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#c4ab7c] font-semibold uppercase">Mail</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
