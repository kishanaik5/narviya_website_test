"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Language } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { useWorld } from "@/lib/useWorld";
import { estimateItems, finishTiers, inr, calcRange, type Category } from "@/config/estimate";

const digits = (s: string) => s.replace(/\D/g, "");

export default function Estimator({ lang }: { lang: Language }) {
  const en = lang === "en";
  const { setWorld } = useWorld();
  const [category, setCategory] = useState<Category>("interior");
  const items = estimateItems.filter((i) => i.category === category);
  const [itemId, setItemId] = useState(items[0].id);
  const item = estimateItems.find((i) => i.id === itemId) ?? items[0];
  const [qty, setQty] = useState<number>(item.defaultQty);
  const [tierId, setTierId] = useState("standard");
  const tier = finishTiers.find((t) => t.id === tierId)!;

  const pickCategory = (c: Category) => {
    setCategory(c);
    setWorld(c);
    const first = estimateItems.find((i) => i.category === c)!;
    setItemId(first.id);
    setQty(first.defaultQty);
  };
  const pickItem = (id: string) => {
    setItemId(id);
    setQty(estimateItems.find((i) => i.id === id)!.defaultQty);
  };

  const { low, high } = calcRange(item, qty, tier.mult);
  const valid = qty > 0;

  const msg = `Hi Narviya, I'd like a free site visit. My online estimate: ${item.name.en}, ${qty} ${item.unit.en}, ${tier.label.en} finish — approx ${inr(low)} to ${inr(high)}.`;
  const wa = `https://wa.me/${digits(siteConfig.whatsapp)}?text=${encodeURIComponent(msg)}`;

  const card = "rounded-2xl border border-[#2b2415] bg-[#131110] p-5 md:p-8";
  const label = "block text-[11px] uppercase tracking-[0.25em] text-[#a89f8c] mb-3";

  return (
    <div className="grid lg:grid-cols-5 gap-6 md:gap-10">
      <div className={`${card} lg:col-span-3 space-y-8`}>
        <div>
          <span className={label}>{en ? "1 · What do you need?" : "1 · ನಿಮಗೆ ಏನು ಬೇಕು?"}</span>
          <div className="inline-flex rounded-full border border-[#c9972b]/40 p-1 bg-[#0a0a0a] mb-4">
            {(["interior", "exterior"] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => pickCategory(c)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-[0.25em] cursor-pointer ${
                  category === c ? "gold-bar font-semibold" : "text-[#a89f8c]"
                }`}
              >
                {c === "interior" ? (en ? "Interiors" : "ಇಂಟೀರಿಯರ್ಸ್") : en ? "Exteriors" : "ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್"}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => pickItem(i.id)}
                className={`px-4 py-2 rounded-full border text-sm cursor-pointer ${
                  itemId === i.id ? "border-[#c9972b] text-[#e6c26a] bg-[#c9972b]/10" : "border-[#2b2415] text-[#f6f2e9]"
                }`}
              >
                {i.name[lang]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="qty" className={label}>
            {en ? "2 · Approximate size" : "2 · ಅಂದಾಜು ಗಾತ್ರ"} ({item.unit[lang]})
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            inputMode="numeric"
            value={qty || ""}
            onChange={(e) => setQty(Math.max(0, Number(e.target.value)))}
            className="w-full md:w-60 rounded-xl border border-[#2b2415] bg-[#0a0a0a] px-4 py-3 text-lg text-white outline-none focus:border-[#c9972b]"
          />
        </div>

        <div>
          <span className={label}>{en ? "3 · Finish level" : "3 · ಫಿನಿಶ್ ಮಟ್ಟ"}</span>
          <div className="flex flex-wrap gap-2">
            {finishTiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setTierId(t.id)}
                className={`px-5 py-2 rounded-full border text-sm cursor-pointer ${
                  tierId === t.id ? "border-[#c9972b] text-[#e6c26a] bg-[#c9972b]/10" : "border-[#2b2415] text-[#f6f2e9]"
                }`}
              >
                {t.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className={`${card} lg:col-span-2 flex flex-col justify-between gap-6 border-[#c9972b]/40`}>
        <div className="space-y-3">
          <span className={label}>{en ? "Your estimate" : "ನಿಮ್ಮ ಅಂದಾಜು"}</span>
          <p className="font-serif text-4xl md:text-5xl text-[#e6c26a] leading-tight">
            {valid ? `${inr(low)} – ${inr(high)}` : "—"}
          </p>
          <p className="text-sm text-[#a89f8c]">
            {item.name[lang]} · {qty || 0} {item.unit[lang]} · {tier.label[lang]}
          </p>
          <p className="text-xs text-[#7d7566] leading-relaxed pt-2">
            {en
              ? "This is an approximate range only. The exact price is confirmed after our free site visit and measurement."
              : "ಇದು ಕೇವಲ ಅಂದಾಜು ವ್ಯಾಪ್ತಿ. ನಿಖರ ಬೆಲೆಯನ್ನು ನಮ್ಮ ಉಚಿತ ಸೈಟ್ ಭೇಟಿ ಮತ್ತು ಅಳತೆಯ ನಂತರ ದೃಢೀಕರಿಸಲಾಗುತ್ತದೆ."}
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {en ? "Send on WhatsApp" : "WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸಿ"}
          </a>
          <Link
            href="/contact"
            className="block w-full text-center px-6 py-3 rounded-full border border-[#c9972b]/60 text-[#e6c26a] text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {en ? "Book 100% free visit" : "100% ಉಚಿತ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ"}
          </Link>
        </div>
      </aside>
    </div>
  );
}
