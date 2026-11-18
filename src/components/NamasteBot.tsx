import React from "react";

/**
 * The Narviya "Namaste" character: floats, blinks, waves and bows with joined hands.
 * Pure CSS / divs (no image), so it is crisp at any screen density.
 */
export default function NamasteBot() {
  return (
    <div className="relative h-20 w-16 sm:h-24 sm:w-20 animate-puppet-float">
      <div className="absolute inset-0 animate-namaste-bow">
        {/* glow */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-[#c9972b]/25 blur-xl" />

        {/* antenna */}
        <div className="absolute -top-3.5 left-1/2 z-10 h-3.5 w-1 -translate-x-1/2 rounded-full bg-[#8a6414]" />
        <div className="absolute -top-5 left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-tr from-[#8a6414] via-[#f3d27a] to-[#fff6dc] shadow-[0_0_12px_rgba(243,210,122,.9)]" />

        {/* head */}
        <div className="absolute left-1/2 top-0 z-20 h-12 w-14 -translate-x-1/2 overflow-hidden rounded-[22px_22px_16px_16px] border border-[#c9972b] bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] shadow-md">
          <div className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#8a6414] to-[#f3d27a]" />
          <div className="flex justify-center gap-2.5 pt-3.5">
            {[0, 1].map((i) => (
              <div key={i} className="animate-puppet-blink relative h-2 w-2 rounded-full bg-[#1c1a17]">
                <div className="absolute left-0.5 top-0.5 h-0.5 w-0.5 rounded-full bg-white opacity-90" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-2.5 left-1.5 h-1 w-2 rounded-full bg-[#c9972b]/40" />
          <div className="absolute bottom-2.5 right-1.5 h-1 w-2 rounded-full bg-[#c9972b]/40" />
          <div className="absolute bottom-2 left-1/2 h-1.5 w-3.5 -translate-x-1/2 rounded-b-full border-b-2 border-[#5b3a29]" />
        </div>

        {/* body */}
        <div className="absolute left-1/2 top-11 z-10 h-11 w-14 -translate-x-1/2 rounded-[14px_14px_18px_18px] border border-[#c9972b]/60 bg-gradient-to-b from-[#2a2620] via-[#1f1d19] to-[#141311] shadow-lg">
          <div className="absolute left-1/2 top-1.5 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#c9972b]/70" />
        </div>

        {/* namaste hands */}
        <div className="animate-namaste-hands absolute left-1/2 top-12 z-30 flex h-8 w-6 items-center justify-center">
          <div className="animate-puppet-wave flex items-center justify-center">
            <div className="h-6 w-2.5 rotate-6 rounded-[8px_2px_4px_2px] border border-[#8a6414] bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] shadow-sm" />
            <div className="-ml-1 h-6 w-2.5 -rotate-6 rounded-[2px_8px_2px_4px] border border-[#8a6414] bg-gradient-to-b from-[#fdfcf9] to-[#e9dec8] shadow-sm" />
          </div>
        </div>
      </div>
      {/* ground shadow */}
      <div className="absolute -bottom-1 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-black/40 blur-[3px]" />
    </div>
  );
}
