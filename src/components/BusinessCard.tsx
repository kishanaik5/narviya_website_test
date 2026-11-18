"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Narviya visiting card — built entirely in code (no images).
 * Front = Narviya Interiors, Back = Narviya Exteriors. Black + metallic gold,
 * with the vertical gold bar from the printed card. Landscape 1.75 : 1.
 * All contact details come from src/config/site.ts.
 */

type CardWorld = "interiors" | "exteriors";

const CARD = {
  interiors: {
    title: "Interiors",
    tag: "Interiors that inspire living",
    sub: "End-to-end interiors",
    items: ["Wood Space", "Glass", "Railings", "PVC & POP"],
  },
  exteriors: {
    title: "Exteriors",
    tag: "Exteriors that inspire spaces",
    sub: "End-to-end exteriors",
    items: ["Spider Fitting", "ACP", "Toughened Glass", "WPVC"],
  },
} as const;

const GOLD = "linear-gradient(135deg, #f3d27a 0%, #c9972b 48%, #8a6414 100%)";

export function CardLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <span
      className={`font-serif font-bold tracking-[0.16em] text-lg leading-none ${isLight ? "text-[#fdfcf9]" : "text-[#1c1a17]"}`}
    >
      {siteConfig.logoText}
    </span>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <span className="flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border border-[#c9972b]/70 text-[#e6c26a]">
      <svg className="h-[7px] w-[7px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
    </span>
  );
}

const PHONE_D = "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
const WEB_D = "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9";
const MAIL_D = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";

function CardFace({
  world,
  id,
  onDownload,
  isDownloading,
}: {
  world: CardWorld;
  id?: string;
  onDownload?: (e: React.MouseEvent) => void;
  isDownloading?: boolean;
}) {
  const c = CARD[world];
  return (
    <div
      id={id}
      className="relative flex h-full w-full select-none overflow-hidden rounded-2xl border border-[#c9972b]/40 shadow-2xl"
      style={{ background: "#0a0a0a", color: "#ece4d2" }}
    >
      {/* soft gold light + thin rules, like the printed card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(243,210,122,0.20),transparent_60%)]" />
      <div className="pointer-events-none absolute left-14 right-0 top-[7px] h-px bg-gradient-to-r from-[#c9972b]/20 via-[#f3d27a]/80 to-[#c9972b]/20" />
      <div className="pointer-events-none absolute bottom-[7px] left-14 right-0 h-px bg-gradient-to-r from-[#c9972b]/20 via-[#f3d27a]/80 to-[#c9972b]/20" />

      {/* vertical gold bar */}
      <div className="relative flex w-[15%] min-w-[46px] shrink-0 items-center justify-center" style={{ background: GOLD }}>
        <span
          className="font-serif font-bold uppercase text-black whitespace-nowrap text-[11px] tracking-[0.1em] [writing-mode:vertical-rl] rotate-180"
        >
          {siteConfig.brandName} {c.title}
        </span>
      </div>

      {/* content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between px-3.5 pb-[17px] pt-[15px]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[6.5px] uppercase tracking-[0.2em] whitespace-nowrap text-[#e6c26a]">{c.tag}</div>
            <div className="mt-1.5 text-[6.5px] uppercase tracking-[0.24em] text-[#a89f8c]">{c.sub}</div>
            <div className="mt-0.5 text-[7.5px] font-medium uppercase tracking-[0.08em] leading-snug text-[#f3d27a]">
              {c.items.map((it, i) => (
                <span key={it} className="whitespace-nowrap">
                  {i > 0 && <span className="px-1 text-[#c9972b]">|</span>}
                  {it}
                </span>
              ))}
            </div>
          </div>
          {onDownload && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(e);
              }}
              title="Download Card PDF"
              aria-label="Download Card PDF"
              className="shrink-0 cursor-pointer rounded-full border border-[#c9972b]/60 bg-[#c9972b]/15 p-1.5 text-[#e6c26a] transition-all hover:bg-[#c9972b]/35 active:scale-95"
            >
              {isDownloading ? (
                <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="shrink-0">
            <div className="whitespace-nowrap font-serif text-[17px] italic leading-none text-[#f3d27a]">{siteConfig.ownerName}</div>
            <div className="mt-1.5 text-[6px] uppercase leading-tight tracking-[0.1em] text-[#a89f8c]">
              GST No.<br />{siteConfig.gst}
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-[3px] text-[8px] font-medium text-[#ece4d2]">
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Icon d={PHONE_D} />{siteConfig.phone}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Icon d={PHONE_D} />{siteConfig.phone2}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Icon d={WEB_D} />{siteConfig.domain}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Icon d={MAIL_D} />{siteConfig.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardFront(props: { id?: string; onDownload?: (e: React.MouseEvent) => void; isDownloading?: boolean }) {
  return <CardFace world="interiors" {...props} />;
}

export function CardBack(props: { id?: string; onDownload?: (e: React.MouseEvent) => void; isDownloading?: boolean }) {
  return <CardFace world="exteriors" {...props} />;
}

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="perspective-1000 w-[340px] sm:w-[420px] aspect-[1.75/1] cursor-pointer touch-manipulation"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${flipped ? "rotate-y-180" : ""}`}>
          <div
            className={`absolute inset-0 backface-hidden transition-opacity duration-300 ${flipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <CardFront />
          </div>
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 transition-opacity duration-300 ${!flipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <CardBack />
          </div>
        </div>
      </div>
      <button
        onClick={() => setFlipped(!flipped)}
        className="px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase border border-primary/40 bg-white text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm"
      >
        {flipped ? "Show Interiors" : "Show Exteriors"}
      </button>
    </div>
  );
}
