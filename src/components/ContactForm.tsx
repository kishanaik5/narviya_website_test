"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";

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

  // Email OTP Verification State
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpStatusMsg, setOtpStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handler: Send OTP Code
  const handleSendOtp = async () => {
    if (!formData.email || !formData.email.includes("@")) {
      setOtpStatusMsg({
        type: "error",
        text: lang === "en" ? "Please enter a valid email address first." : "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.",
      });
      return;
    }

    setIsSendingOtp(true);
    setOtpStatusMsg(null);
    setDevOtpHint(null);

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(60);
        if (data.devOtp) {
          setDevOtpHint(`[Dev OTP: ${data.devOtp}]`);
        }
        setOtpStatusMsg({
          type: "success",
          text: lang === "en" ? `Verification code sent to ${formData.email}` : `ಪರಿಶೀಲನಾ ಕೋಡ್ ನಿಮ್ಮ ಇಮೇಲ್ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ`,
        });
      } else {
        setOtpStatusMsg({
          type: "error",
          text: data.error || (lang === "en" ? "Failed to send code." : "ಕೋಡ್ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ."),
        });
      }
    } catch {
      setOtpStatusMsg({
        type: "error",
        text: lang === "en" ? "Connection error. Please try again." : "ಸಂಪರ್ಕ ದೋಷ.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handler: Verify OTP Code
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setOtpStatusMsg({
        type: "error",
        text: lang === "en" ? "Please enter the 6-digit code." : "ದಯವಿಟ್ಟು 6 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ.",
      });
      return;
    }

    setIsVerifyingOtp(true);
    setOtpStatusMsg(null);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpCode }),
      });

      const data = await res.json();

      if (res.ok && data.verified) {
        setIsEmailVerified(true);
        setOtpSent(false);
        setOtpStatusMsg({
          type: "success",
          text: lang === "en" ? "✓ Email successfully verified!" : "✓ ಇಮೇಲ್ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!",
        });
      } else {
        setOtpStatusMsg({
          type: "error",
          text: data.error || (lang === "en" ? "Invalid code. Please try again." : "ಅಮಾನ್ಯ ಕೋಡ್."),
        });
      }
    } catch {
      setOtpStatusMsg({
        type: "error",
        text: lang === "en" ? "Verification failed." : "ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handler: Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Bot detection
    if (honeypot.trim() !== "") {
      setIsSubmitted(true);
      return;
    }

    if (!isEmailVerified) {
      setErrorMsg(
        lang === "en"
          ? "Please verify your email address with the OTP before submitting."
          : "ಸಲ್ಲಿಸುವ ಮೊದಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು OTP ಮೂಲಕ ಪರಿಶೀಲಿಸಿ."
      );
      return;
    }

    setIsSubmitting(true);

    const backendApi = process.env.NEXT_PUBLIC_API_URL;
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    // 1. Submit to custom FastAPI backend if configured
    if (backendApi) {
      try {
        const response = await fetch(`${backendApi}/api/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            email_verified: true,
          }),
        });

        if (response.ok) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: "", phone: "", email: "", message: "" });
          setIsEmailVerified(false);
          return;
        }
      } catch (e) {
        console.warn("Backend submit fallback:", e);
      }
    }

    // 2. Submit to Formspree if configured
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
            email_verified: "Yes (Verified with OTP)",
            type: "Contact Form Brief",
          }),
        });

        if (response.ok) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: "", phone: "", email: "", message: "" });
          setIsEmailVerified(false);
          return;
        }
      } catch {
        // fall through
      }
    }

    // 3. Fallback simulated submission for testing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsEmailVerified(false);
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 bg-[#faf8f5] border-b border-plaster-border">
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
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-6">
                {t.title}
              </h2>
              <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed max-w-sm">
                {t.subtitle}
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 mb-1">
                    {t.addressTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.017a8.248 8.248 0 01-5.305-5.305l2.017-1.514c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 mb-1">
                    {t.phoneTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 font-semibold tracking-wide">
                    {siteConfig.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-plaster-border bg-white text-primary flex-shrink-0">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-neutral-900 mb-1">
                    {t.emailTitle}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 font-light">
                    {siteConfig.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column with OTP Verification */}
          <div className="lg:col-span-7">
            <div className="editorial-card border border-plaster-border p-8 md:p-12 shadow-sm bg-white">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-editorial-fade">
                  <div className="mx-auto w-12 h-12 rounded-full border border-primary bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-neutral-900">
                    {lang === "en" ? "Brief Submitted" : "ಮಾಹಿತಿ ತಲುಪಿದೆ"}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 font-light max-w-sm mx-auto leading-relaxed">
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
                    <label htmlFor="name" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-500">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Anand Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900"
                    />
                  </div>

                  {/* Phone & Email inline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone field */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-500">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900"
                      />
                    </div>

                    {/* Email field with Verification Trigger */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="email" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-500">
                          {t.email} *
                        </label>
                        {isEmailVerified && (
                          <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          type="email"
                          id="email"
                          required
                          disabled={isEmailVerified}
                          placeholder="client@domain.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setIsEmailVerified(false);
                            setOtpSent(false);
                          }}
                          className={`w-full bg-neutral-50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 ${
                            isEmailVerified ? "bg-emerald-50/50 border-emerald-300 text-emerald-950 font-medium" : ""
                          }`}
                        />
                        {!isEmailVerified && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp || countdown > 0 || !formData.email}
                            className="px-3.5 py-2.5 bg-[#9a7d46] hover:bg-[#8a6c37] disabled:opacity-50 text-white font-sans text-[10px] font-semibold tracking-wider uppercase rounded-sm whitespace-nowrap transition-all duration-200 cursor-pointer"
                          >
                            {isSendingOtp
                              ? "Sending..."
                              : countdown > 0
                              ? `${countdown}s`
                              : otpSent
                              ? "Resend"
                              : "Verify"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* OTP Input Card (Shown after OTP is sent and before verification) */}
                  {otpSent && !isEmailVerified && (
                    <div className="p-4 bg-[#fbf9f4] border border-[#e9e4d9] rounded-md space-y-3 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9a7d46]">
                          Enter 6-Digit Email Verification Code
                        </span>
                        {devOtpHint && (
                          <span className="text-[9px] font-mono text-neutral-400">{devOtpHint}</span>
                        )}
                      </div>
                      <div className="flex gap-3 items-center">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          className="w-36 bg-white border border-[#9a7d46]/40 px-3 py-2 text-center font-mono text-sm tracking-widest outline-none focus:border-[#9a7d46] rounded-sm"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp || otpCode.length < 6}
                          className="px-4 py-2 bg-gradient-to-r from-[#8a6c37] to-[#d4b47c] text-white text-[10px] font-semibold uppercase tracking-wider rounded-sm disabled:opacity-50 hover:brightness-105 transition-all cursor-pointer"
                        >
                          {isVerifyingOtp ? "Checking..." : "Confirm OTP"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* OTP Status Messages */}
                  {otpStatusMsg && (
                    <div
                      className={`p-2.5 text-xs font-sans rounded-sm ${
                        otpStatusMsg.type === "success"
                          ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                          : "text-rose-800 bg-rose-50 border border-rose-200"
                      }`}
                    >
                      {otpStatusMsg.text}
                    </div>
                  )}

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[9px] uppercase tracking-wider font-semibold text-neutral-500">
                      {t.message} *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder={lang === "en" ? "Tell us about your project scope, area, and timelines..." : "ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ತಿಳಿಸಿ..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-50 border border-plaster-border px-4 py-3 font-sans text-xs outline-none focus:border-primary transition-colors duration-300 text-neutral-900 resize-none"
                    ></textarea>
                  </div>

                  {/* Error messaging */}
                  {errorMsg && (
                    <div className="p-3 text-xs font-sans text-rose-800 bg-rose-50 border border-rose-200">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 font-sans font-semibold uppercase tracking-wider text-xs transition-all duration-300 cursor-pointer rounded-sm ${
                      isEmailVerified
                        ? "bg-gradient-to-r from-[#8a6c37] to-[#d4b47c] text-white hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
                        : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"
                    }`}
                  >
                    {isSubmitting
                      ? (lang === "en" ? "Submitting Verified Brief..." : "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...")
                      : isEmailVerified
                      ? (lang === "en" ? "✓ Email Verified — Submit Design Brief" : "✓ ಸಲ್ಲಿಸಿ")
                      : (lang === "en" ? "Verify Email Above To Submit" : "ಇಮೇಲ್ ಪರಿಶೀಲಿಸಿ")}
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
