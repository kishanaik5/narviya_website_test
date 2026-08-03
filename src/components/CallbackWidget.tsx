"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/locales/translations";

interface CallbackWidgetProps {
  lang: Language;
}

export default function CallbackWidget({ lang }: CallbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot field for bot protection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const t = translations[lang].callback;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    setStatusType("");

    // 1. Spambot detection (Honeypot check)
    if (honeypot.trim() !== "") {
      setStatusType("error");
      setStatusMsg(t.spamBlock);
      return;
    }

    // 2. Client-side Rate Limiting (LocalStorage check)
    const now = Date.now();
    const lastSubmission = localStorage.getItem("last_callback_time");
    if (lastSubmission) {
      const timeDiff = now - parseInt(lastSubmission, 10);
      const limitMs = 5 * 60 * 1000; // 5 minutes rate limit
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
          body: JSON.stringify({ email, phone, type: "Free Callback Request" }),
        });

        if (response.ok) {
          localStorage.setItem("last_callback_time", now.toString());
          setStatusType("success");
          setStatusMsg(t.success);
          setEmail("");
          setPhone("");
          setTimeout(() => setIsOpen(false), 3000);
        } else {
          throw new Error("Form submission error");
        }
      } catch (err) {
        setStatusType("error");
        setStatusMsg(lang === "en" ? "Connection error. Please try again." : "ಸಂಪರ್ಕ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.");
      }
    } else {
      // Mock Success state (for development / static testing)
      setTimeout(() => {
        localStorage.setItem("last_callback_time", now.toString());
        setStatusType("success");
        setStatusMsg(t.success);
        setEmail("");
        setPhone("");
        setIsSubmitting(false);
        setTimeout(() => setIsOpen(false), 3500);
      }, 1200);
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full gold-gradient-bg text-neutral-900 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center border border-primary/20"
        aria-label="Request Callback"
      >
        {isOpen ? (
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.59c0-.55-.45-1-1-1z" />
          </svg>
        )}
      </button>

      {/* Pop-up Widget modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] max-w-[calc(100vw-32px)] glass-panel border border-luxury-border p-6 shadow-2xl animate-editorial-fade bg-white dark:bg-bg-dark">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                {t.title}
              </h3>
              <p className="font-sans text-[11px] text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <hr className="border-plaster-border" />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* HONEYPOT FIELD (bot protection) */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, zIndex: -1 }}>
                <input
                  type="text"
                  name="fullname"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  placeholder="Do not fill this"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label htmlFor="widget-email" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                  {lang === "en" ? "Email Address" : "ಇಮೇಲ್ ವಿಳಾಸ"}
                </label>
                <input
                  type="email"
                  id="widget-email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-3.5 py-2 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label htmlFor="widget-phone" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                  {lang === "en" ? "Phone Number" : "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"}
                </label>
                <input
                  type="tel"
                  id="widget-phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-3.5 py-2 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white"
                />
              </div>

              {/* Status messaging */}
              {statusMsg && (
                <div
                  className={`p-3 text-[11px] font-sans font-medium border ${
                    statusType === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300"
                      : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300"
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              {/* Submit btn */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 gold-gradient-bg text-neutral-900 font-sans font-semibold uppercase tracking-wider text-[10px] hover:shadow-md hover:brightness-105 active:scale-[0.99] disabled:opacity-50 transition-all duration-300 cursor-pointer"
              >
                {isSubmitting ? t.submitting : t.button}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
