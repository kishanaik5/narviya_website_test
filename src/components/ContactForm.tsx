"use client";

import React, { useState } from "react";
import { Language, translations } from "@/locales/translations";

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // Honeypot field for bot protection
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // 1. Spambot detection (Honeypot check)
    if (honeypot.trim() !== "") {
      // Quietly succeed to fool the bot, or block silently
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            type: "Contact Form Brief",
          }),
        });

        if (response.ok) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: "", phone: "", email: "", message: "" });
        } else {
          throw new Error("Formspree response error");
        }
      } catch (err) {
        setIsSubmitting(false);
        setErrorMsg(
          lang === "en"
            ? "Submission failed due to a connectivity issue. Please try again."
            : "ಸಂಪರ್ಕ ದೋಷದ ಕಾರಣ ಸಲ್ಲಿಕೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        );
      }
    } else {
      // Mock Success state (for development / static testing)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-28 bg-[#faf8f5] dark:bg-[#141311] transition-colors duration-500 border-b border-plaster-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="h-[1px] w-6 bg-primary/60"></span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-sans font-medium">
                  {lang === "en" ? "Consultation" : "ಸಮಾಲೋಚನೆ"}
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white mb-6">
                {t.title}
              </h2>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                {t.subtitle}
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white dark:bg-neutral-900/30 text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 dark:text-white mb-1">
                    {t.addressTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                    {t.addressValue}
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white dark:bg-neutral-900/30 text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.017a8.248 8.248 0 01-5.305-5.305l2.017-1.514c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 dark:text-white mb-1">
                    {t.phoneTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide">
                    +91 98860 12345 / +91 99000 54321
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white dark:bg-neutral-900/30 text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 dark:text-white mb-1">
                    {t.emailTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 font-light">
                    contact@rkinteriors.in / info@rkinteriors.in
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="editorial-card border border-plaster-border p-8 md:p-12 shadow-sm bg-white dark:bg-bg-dark">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-editorial-fade">
                  <div className="mx-auto w-12 h-12 rounded-full border border-primary bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-neutral-900 dark:text-white">
                    {lang === "en" ? "Brief Submitted" : "ಮಾಹಿತಿ ತಲುಪಿದೆ"}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                    {t.success}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-[10px] uppercase tracking-widest text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all duration-300 cursor-pointer"
                  >
                    {lang === "en" ? "Submit Another Brief" : "ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white"
                    />
                  </div>

                  {/* Phone & Email inline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-400">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-900/50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 dark:text-white resize-none"
                    ></textarea>
                  </div>

                  {/* Error messaging */}
                  {errorMsg && (
                    <div className="p-3 text-xs font-sans text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 gold-gradient-bg text-neutral-900 font-sans font-semibold uppercase tracking-wider text-[10px] hover:shadow-md hover:brightness-105 active:scale-[0.99] disabled:opacity-50 transition-all duration-300 cursor-pointer"
                  >
                    {isSubmitting
                      ? (lang === "en" ? "Sending Brief..." : "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...")
                      : t.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
