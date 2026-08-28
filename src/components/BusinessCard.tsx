"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Ultra-Crisp Luxury Business Card for Narvia.
 * Perfectly calibrated spacing, crisp typography, and no cut-offs.
 */

export function CardLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  if (siteConfig.logoImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logoImage} alt={siteConfig.brandName} className="h-6 object-contain" />;
  }
  const isLight = variant === "light";
  return (
    <div className="flex flex-col">
      <span
        className={`font-serif font-bold tracking-[0.16em] text-lg sm:text-xl leading-none ${
          isLight ? "text-[#fdfcf9]" : "text-[#1c1a17]"
        }`}
        style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}
      >
        {siteConfig.logoText}
      </span>
      <div
        className={`text-[8px] tracking-[0.22em] uppercase font-sans mt-0.5 font-semibold ${
          isLight ? "text-[#c4ab7c]" : "text-[#9a7d46]"
        }`}
      >
        Interior &middot; Exterior &middot; Materials
      </div>
    </div>
  );
}

export function CardFront({
  id,
  onDownload,
  isDownloading,
}: {
  id?: string;
  onDownload?: (e: React.MouseEvent) => void;
  isDownloading?: boolean;
}) {
  return (
    <div
      id={id}
      className="relative w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl select-none border border-[#c4ab7c]/40"
      style={{
        background: "linear-gradient(135deg, #141311 0%, #1f1d19 45%, #2a2620 100%)",
        color: "#fdfcf9",
      }}
    >
      {/* Decorative Gold Sheen & Architectural Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,171,124,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 border border-[#c4ab7c]/15 rounded-full -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 border border-[#c4ab7c]/15 rounded-full -ml-8 -mb-8 pointer-events-none" />

      {/* Top Bar: Logo & Download Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <CardLogo variant="light" />
        <div className="flex items-center gap-1.5">
          {onDownload ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(e);
              }}
              title="Download Card PDF"
              aria-label="Download Card PDF"
              className="p-1.5 rounded-full bg-[#c4ab7c]/20 hover:bg-[#c4ab7c]/40 text-[#c4ab7c] border border-[#c4ab7c]/40 transition-all active:scale-95 cursor-pointer shadow-md group/btn"
            >
              {isDownloading ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>
          ) : (
            <div className="opacity-80">
              <svg className="w-3.5 h-3.5 text-[#c4ab7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Middle/Bottom: Tagline & Brand Accent */}
      <div className="relative z-10 pt-1 flex flex-col justify-end">
        <div className="h-px w-10 bg-gradient-to-r from-[#c4ab7c] to-transparent mb-1.5" />
        <div className="text-[11.5px] sm:text-xs font-serif italic text-neutral-200 tracking-wide leading-snug font-medium">
          &ldquo;{siteConfig.tagline}&rdquo;
        </div>
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
          <span className="text-[8.5px] uppercase tracking-[0.22em] text-[#c4ab7c] font-bold">
            {siteConfig.domain}
          </span>
          <span className="text-[8.5px] text-[#c4ab7c] tracking-wider font-semibold">
            Architectural Living
          </span>
        </div>
      </div>
    </div>
  );
}

export function CardBack({
  id,
  onDownload,
  isDownloading,
}: {
  id?: string;
  onDownload?: (e: React.MouseEvent) => void;
  isDownloading?: boolean;
}) {
  const contactRows = [
    {
      id: "phone-whatsapp",
      value: siteConfig.phone,
      icons: (
        <div className="flex items-center gap-1">
          {/* Phone Icon */}
          <div className="w-5 h-5 rounded-full bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#9a7d46]">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          {/* WhatsApp Icon */}
          <div className="w-5 h-5 rounded-full bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#9a7d46]">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "email",
      value: siteConfig.email,
      icons: (
        <div className="w-5 h-5 rounded-full bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#9a7d46]">
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      id: "web",
      value: siteConfig.domain,
      icons: (
        <div className="w-5 h-5 rounded-full bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#9a7d46]">
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div
      id={id}
      className="relative w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl select-none border border-[#e9e4d9]"
      style={{
        background: "linear-gradient(135deg, #fdfcf9 0%, #f7f4ec 100%)",
        color: "#1c1a17",
      }}
    >
      {/* Decorative Plaster Accent */}
      <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 bg-[#9a7d46]/5 rounded-bl-full pointer-events-none" />

      {/* Header: Logo & Download Button */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#e9e4d9] pb-1.5">
        <CardLogo variant="dark" />
        {onDownload && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(e);
            }}
            title="Download Card PDF"
            aria-label="Download Card PDF"
            className="p-1.5 rounded-full bg-[#9a7d46]/10 hover:bg-[#9a7d46]/25 text-[#9a7d46] border border-[#9a7d46]/30 transition-all active:scale-95 cursor-pointer shadow-sm group/btn"
          >
            {isDownloading ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Contact Info Rows — Compact & Crisp */}
      <div className="relative z-10 flex flex-col gap-2 my-auto py-0.5">
        {contactRows.map((row) => (
          <div key={row.id} className="flex items-center gap-2.5 group">
            <div className="flex-shrink-0 flex items-center">
              {row.icons}
            </div>
            <span className="text-xs sm:text-[12.5px] text-[#1c1a17] font-sans font-semibold tracking-wide">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Details with generous bottom padding inside the card */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#e9e4d9] pt-1">
        <span className="text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-neutral-600 font-semibold">
          Luxury Architectural Living
        </span>
        <span className="text-[8px] sm:text-[8.5px] text-[#9a7d46] font-mono font-bold">
          VERIFIED
        </span>
      </div>
    </div>
  );
}

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="perspective-1000 w-[280px] sm:w-[350px] aspect-[1/1.42] sm:aspect-[1.75/1] cursor-pointer touch-manipulation"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute inset-0 backface-hidden">
            <CardFront />
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <CardBack />
          </div>
        </div>
      </div>
      <button
        onClick={() => setFlipped(!flipped)}
        className="px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase border border-primary/40 bg-white text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm"
      >
        {flipped ? "Show Front" : "Show Contact Details"}
      </button>
    </div>
  );
}
