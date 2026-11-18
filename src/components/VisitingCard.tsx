"use client";

import React, { useState } from "react";
import type { Language } from "@/locales/translations";
import { useWorld } from "@/lib/useWorld";

/**
 * Visiting card = the real printed artwork (public/card/*.webp, shown upright / portrait),
 * not a code-drawn lookalike, and no 3D transforms, so it stays sharp on phones.
 * Tapping steps through Interiors front -> Interiors back -> Exteriors front -> Exteriors back,
 * starting on the side the visitor is exploring (Interiors by default).
 * Download = the original zip supplied by the owner (public/card/narviya-visiting-card.zip),
 * which holds all 4 full-resolution PNGs (both cards, front and back).
 * To update the card, replace the files in public/card/.
 */
const ZIP = "/card/narviya-visiting-card.zip";

// the four faces, in tap order: Interiors front, Interiors back, Exteriors front, Exteriors back
const FACES = [
  { w: "interiors", side: "front" },
  { w: "interiors", side: "back" },
  { w: "exteriors", side: "front" },
  { w: "exteriors", side: "back" },
] as const;

export default function VisitingCard({ lang, compact = false }: { lang: Language; compact?: boolean }) {
  const en = lang === "en";
  const { world } = useWorld();
  // taps are counted per world, so the card restarts on the matching side when the visitor switches
  const [tapState, setTapState] = useState({ w: world, n: 0 });
  const taps = tapState.w === world ? tapState.n : 0;
  const start = world === "exterior" ? 2 : 0;
  const index = (start + taps) % FACES.length;
  const face = FACES[index];
  const name = face.w === "exteriors" ? (en ? "Exteriors" : "ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್") : en ? "Interiors" : "ಇಂಟೀರಿಯರ್ಸ್";

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${compact ? "max-w-[240px]" : "max-w-[260px]"}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6c26a] font-medium">
        {en ? "Visiting Card" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"} · {name}
      </span>

      <div
        className={`relative aspect-[1/1.75] overflow-hidden rounded-xl ring-1 ring-[#c9972b]/30 shadow-2xl bg-black ${
          compact ? "w-[170px]" : "w-[200px]"
        }`}
      >
        {FACES.map((f, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${f.w}-${f.side}`}
            src={`/card/${f.w}-${f.side}.webp`}
            alt={`Narviya ${f.w} visiting card, ${f.side}`}
            width={600}
            height={1050}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* tap anywhere on the card to go to the next face */}
        <button
          onClick={() => setTapState({ w: world, n: taps + 1 })}
          aria-label={en ? "Show next side of the card" : "ಕಾರ್ಡ್‌ನ ಮುಂದಿನ ಬದಿ ತೋರಿಸಿ"}
          className="absolute inset-0 cursor-pointer touch-manipulation"
        />

        {/* small download icon in the bottom corner: the original zip with all 4 images */}
        <a
          href={ZIP}
          download="narviya-visiting-card.zip"
          title={en ? "Download visiting card (4 images)" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ (4 ಚಿತ್ರ)"}
          aria-label={en ? "Download visiting card (4 images)" : "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ (4 ಚಿತ್ರ)"}
          className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-[#f3d27a] ring-1 ring-[#c9972b]/70 backdrop-blur-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
      <p className="text-center text-[10px] text-[#a89f8c]">{en ? "Tap the card to see more" : "ಇನ್ನಷ್ಟು ನೋಡಲು ಕಾರ್ಡ್ ಸ್ಪರ್ಶಿಸಿ"}</p>
    </div>
  );
}
