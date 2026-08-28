import React from "react";
import { CardFront, CardBack } from "@/components/BusinessCard";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Business Card — ${siteConfig.brandName}`,
};

export default function BusinessCardPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] py-16 px-6 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto print:hidden mb-10">
        <h1 className="font-serif text-2xl mb-2">{siteConfig.brandName} — Business Card (Prototype)</h1>
        <p className="text-sm text-neutral-600 max-w-xl">
          Temp text-based logo, standard 3.5&quot; × 2&quot; card size. All text is pulled from{" "}
          <code>src/config/site.ts</code> — edit that file and this card (and the whole site) update
          together. Use your browser&apos;s Print (Ctrl/Cmd+P) to export a print-ready PDF at actual size.
        </p>
      </div>

      <div className="flex flex-wrap gap-10 justify-center print:justify-start print:gap-6">
        <CardFront />
        <CardBack />
      </div>

      <style>{`
        @media print {
          @page { size: auto; margin: 0.4in; }
        }
      `}</style>
    </main>
  );
}
