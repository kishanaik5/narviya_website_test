"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Enhanced Business Card Component for Narvia Design.
 * Renders high-fidelity front and back cards with luxury wood/glass architectural aesthetics.
 */

export function CardLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  if (siteConfig.logoImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logoImage} alt={siteConfig.brandName} className="h-7 object-contain" />;
  }
  const isLight = variant === "light";
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <span
          className={`font-serif font-medium tracking-[0.14em] text-lg md:text-xl leading-none ${
            isLight ? "text-[#fdfcf9]" : "text-[#1c1a17]"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {siteConfig.logoText}
        </span>
        <span
          className={`text-[7px] tracking-[0.2em] uppercase px-1 py-0.5 rounded border ${
            isLight
              ? "text-[#c4ab7c] border-[#c4ab7c]/30 bg-[#c4ab7c]/10"
              : "text-[#9a7d46] border-[#9a7d46]/30 bg-[#9a7d46]/10"
          }`}
        >
          Studio
        </span>
      </div>
      <div
        className={`text-[6.5px] tracking-[0.28em] uppercase font-sans mt-0.5 ${
          isLight ? "text-neutral-400" : "text-neutral-500"
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
      className="relative w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 select-none border border-[#c4ab7c]/30"
      style={{
        background: "linear-gradient(135deg, #141311 0%, #1f1d19 45%, #2a2620 100%)",
        color: "#fdfcf9",
      }}
    >
      {/* Decorative Gold Sheen & Architectural Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,171,124,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-36 sm:w-44 h-36 sm:h-44 border border-[#c4ab7c]/10 rounded-full -mr-12 -mt-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-28 sm:w-36 h-28 sm:h-36 border border-[#c4ab7c]/10 rounded-full -ml-10 -mb-10 pointer-events-none" />

      {/* Subtle Wood & Glass Pattern Accent Lines */}
      <div className="absolute right-5 bottom-5 flex items-center gap-1 opacity-25 pointer-events-none">
        <div className="w-1 h-6 sm:h-7 bg-[#c4ab7c] rounded-full" />
        <div className="w-1 h-8 sm:h-10 bg-[#c4ab7c] rounded-full" />
        <div className="w-1 h-4 sm:h-5 bg-[#c4ab7c] rounded-full" />
      </div>

      {/* Top Bar: Logo & Download Icon inside top right corner */}
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
            <div className="opacity-60">
              <svg className="w-4 h-4 text-[#c4ab7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Middle/Bottom: Tagline & Brand Accent */}
      <div className="relative z-10 pt-3 flex flex-col justify-end">
        <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-[#c4ab7c] to-transparent mb-2" />
        <div className="text-[11px] sm:text-xs font-serif italic text-neutral-300 tracking-wide leading-snug">
          &ldquo;{siteConfig.tagline}&rdquo;
        </div>
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#c4ab7c] font-medium">
            {siteConfig.domain}
          </span>
          <span className="text-[8px] text-neutral-400 tracking-wider">
            {siteConfig.city}
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
  const rows = [
    {
      label: "Web",
      value: siteConfig.domain,
      icon: (
        <svg className="w-2.5 h-2.5 text-[#9a7d46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: siteConfig.email,
      icon: (
        <svg className="w-2.5 h-2.5 text-[#9a7d46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: siteConfig.phone,
      icon: (
        <svg className="w-2.5 h-2.5 text-[#9a7d46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "Studio",
      value: siteConfig.address !== "Add studio address" ? siteConfig.address : `${siteConfig.city} — Karnataka`,
      icon: (
        <svg className="w-2.5 h-2.5 text-[#9a7d46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      id={id}
      className="relative w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 select-none border border-[#e9e4d9]"
      style={{
        background: "linear-gradient(135deg, #fdfcf9 0%, #f7f4ec 100%)",
        color: "#1c1a17",
      }}
    >
      {/* Decorative Plaster Accent */}
      <div className="absolute top-0 right-0 w-32 sm:w-36 h-32 sm:h-36 bg-[#9a7d46]/5 rounded-bl-full pointer-events-none" />

      {/* Header: Logo, Label & Download Button */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#e9e4d9] pb-2.5">
        <CardLogo variant="dark" />
        <div className="flex items-center gap-2">
          <span className="text-[7.5px] font-mono tracking-widest text-[#9a7d46] uppercase font-semibold">
            VISITING CARD
          </span>
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
      </div>

      {/* Contact Info Rows */}
      <div className="relative z-10 flex flex-col gap-2.5 sm:gap-2 my-auto py-1">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center text-[9.5px] sm:text-[10px] group">
            <div className="flex items-center gap-1.5 w-16 sm:w-16 flex-shrink-0">
              {row.icon}
              <span className="text-[8px] uppercase tracking-wider text-[#9a7d46] font-semibold">
                {row.label}
              </span>
            </div>
            <span className="text-neutral-700 truncate font-sans font-medium pl-1">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Details */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#e9e4d9] pt-2">
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-neutral-500">
          Wood &amp; Glass Architecture
        </span>
        <span className="text-[7.5px] text-[#9a7d46] font-mono font-semibold">
          OFFICIAL
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
        className="px-3.5 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase border border-primary/30 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
      >
        {flipped ? "Show Front" : "Show Contact Details"}
      </button>
    </div>
  );
}
