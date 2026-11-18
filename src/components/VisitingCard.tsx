"use client";

import React, { useState } from "react";
import type { Language } from "@/locales/translations";
import { useWorld } from "@/lib/useWorld";

/**
 * Visiting card = the real printed artwork (public/card/*.webp, shown upright / portrait),
 * not a code-drawn lookalike, and no 3D transforms, so it stays sharp on phones.
 * It shows the Interiors or the Exteriors card depending on what the visitor is exploring.
 * Download = the original zip supplied by the owner (public/card/narviya-visiting-card.zip),
 * which holds all 4 full-resolution PNGs (both cards, front and back).
 * To update the card, replace the files in public/card/.
 */
const ZIP = "/card/narviya-visiting-card.zip";

export default function VisitingCard({ lang, compact = false }: { lang: Language; compact?: boolean }) {
  const en = lang === "en";
  const { world } = useWorld();
  const [back, setBack] = useState(false);
  const key = world === "exterior" ? "exteriors" : "interiors";
  const name = world === "exterior" ? (en ? "Exteriors" : "ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್") : en ? "Interiors" : "ಇಂಟೀರಿಯರ್ಸ್";

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${compact ? "max-w-[240px]" : "max-w-[260px]"}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6c26a] font-medium">
        {en ? "Visiting Card" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"} · {name}
      </span>

      <button
        onClick={() => setBack(!back)}
        aria-label={en ? "Flip card" : "ಕಾರ್ಡ್ ತಿರುಗಿಸಿ"}
        className={`relative block aspect-[1/1.75] overflow-hidden rounded-xl ring-1 ring-[#c9972b]/30 shadow-2xl cursor-pointer touch-manipulation bg-black ${
          compact ? "w-[170px]" : "w-[200px]"
        }`}
      >
        {(["interiors", "exteriors"] as const).flatMap((w) =>
          (["front", "back"] as const).map((side) => {
            const visible = w === key && (side === "back") === back;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${w}-${side}`}
                src={`/card/${w}-${side}.webp`}
                alt={`Narviya ${w} visiting card, ${side}`}
                width={600}
                height={1050}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            );
          })
        )}
      </button>
      <p className="text-center text-[10px] text-[#a89f8c]">{en ? "Tap the card to flip" : "ತಿರುಗಿಸಲು ಕಾರ್ಡ್ ಸ್ಪರ್ಶಿಸಿ"}</p>

      <a
        href={ZIP}
        download="narviya-visiting-card.zip"
        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>{en ? "Download both cards (4 images)" : "ಎರಡೂ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ (4 ಚಿತ್ರ)"}</span>
      </a>
    </div>
  );
}
