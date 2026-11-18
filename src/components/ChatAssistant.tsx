"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Language } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { useWorld } from "@/lib/useWorld";
import VisitingCard from "@/components/VisitingCard";
import NamasteBot from "@/components/NamasteBot";
import { estimateItems, finishTiers, inr, calcRange, type Category } from "@/config/estimate";

/**
 * Narviya assistant — a guided chat (rule-based, no AI service, no running cost).
 * Appears 10 s after the page loads, hides while the visitor scrolls down and comes back
 * when they scroll up. Leads leave through WhatsApp / phone / the Contact page (and a
 * callback request when NEXT_PUBLIC_FORMSPREE_ID is set).
 */

const SHOW_AFTER_MS = 10_000;
const digits = (s: string) => s.replace(/\D/g, "");
const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

// pending "typing" timers (module-level so closures never touch a ref during render)
const pendingTimers: ReturnType<typeof setTimeout>[] = [];

type Step = "menu" | "cat" | "item" | "qty" | "tier" | "done" | "phone";
interface Msg {
  id: number;
  from: "bot" | "user";
  text?: string;
  kind?: "card" | "actions";
  wa?: string; // prefilled WhatsApp text for "actions"
}

export default function ChatAssistant({ lang }: { lang: Language }) {
  const en = lang === "en";
  const tx = useCallback((e: string, k: string) => (en ? e : k), [en]);
  const { setWorld } = useWorld();

  /* ---- visibility: 10 s delay, hide on scroll down, show on scroll up ---- */
  const [armed, setArmed] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 6) setScrolledDown(true);
      else if (y < last - 6) setScrolledDown(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const visible = armed && (open || !scrolledDown);

  /* ---- conversation ---- */
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("menu");
  const [cat, setCat] = useState<Category>("interior");
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState(0);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    return () => {
      pendingTimers.forEach(clearTimeout);
      pendingTimers.length = 0;
    };
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, step]);

  const push = useCallback((m: Omit<Msg, "id">) => setMsgs((p) => [...p, { ...m, id: p.length + 1 }]), []);
  /** bot says several things, one after another, with a short "typing" pause */
  const say = useCallback(
    (items: Omit<Msg, "id" | "from">[], next?: () => void) => {
      setTyping(true);
      let delay = 0;
      items.forEach((m, i) => {
        delay += 550;
        pendingTimers.push(
          setTimeout(() => {
            push({ from: "bot", ...m });
            if (i === items.length - 1) {
              setTyping(false);
              next?.();
            }
          }, delay)
        );
      });
    },
    [push]
  );

  const itemsOf = (c: Category) => estimateItems.filter((i) => i.category === c);
  const callHref = `tel:+${digits(siteConfig.phone)}`;
  const waBase = `https://wa.me/${digits(siteConfig.whatsapp)}?text=`;

  const toMenu = useCallback(
    (greet = false) => {
      setStep("menu");
      say([{ text: greet ? tx("Namaste 🙏 I'm the Narviya assistant. What are you looking for?", "ನಮಸ್ಕಾರ 🙏 ನಾನು ನರ್ವಿಯ ಸಹಾಯಕ. ನಿಮಗೆ ಏನು ಬೇಕು?") : tx("Anything else I can help with?", "ಇನ್ನೇನಾದರೂ ಸಹಾಯ ಬೇಕೇ?") }]);
    },
    [say, tx]
  );

  // greet the first time the panel opens
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      toMenu(true);
    }
  }, [open, toMenu]);

  const askItem = (c: Category) => {
    setCat(c);
    setWorld(c);
    setStep("item");
    say([{ text: c === "interior" ? tx("Lovely. Which interior work are you planning?", "ಒಳ್ಳೆಯದು. ಯಾವ ಇಂಟೀರಿಯರ್ಸ್ ಕೆಲಸ ಮಾಡಿಸಬೇಕು?") : tx("Great. Which exterior work are you planning?", "ಒಳ್ಳೆಯದು. ಯಾವ ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್ ಕೆಲಸ ಮಾಡಿಸಬೇಕು?") }]);
  };
  const askQty = (id: string) => {
    const it = estimateItems.find((i) => i.id === id)!;
    setItemId(id);
    setStep("qty");
    say([{ text: tx(`Roughly how many ${it.unit.en}? Tap one or type a number.`, `ಸುಮಾರು ಎಷ್ಟು ${it.unit.kn}? ಒಂದನ್ನು ಆರಿಸಿ ಅಥವಾ ಸಂಖ್ಯೆ ಟೈಪ್ ಮಾಡಿ.`) }]);
  };
  const askTier = (n: number) => {
    setQty(n);
    setStep("tier");
    say([{ text: tx("Which finish level do you prefer?", "ಯಾವ ಫಿನಿಶ್ ಮಟ್ಟ ಬೇಕು?") }]);
  };
  const showEstimate = (tierId: string) => {
    const it = estimateItems.find((i) => i.id === itemId)!;
    const tier = finishTiers.find((t) => t.id === tierId)!;
    const { low, high } = calcRange(it, qty, tier.mult);
    const wa = `Hi Narviya, I'd like a free site visit. Estimate from chat: ${it.name.en}, ${qty} ${it.unit.en}, ${tier.label.en} — approx ${inr(low)} to ${inr(high)}.`;
    setStep("done");
    say(
      [
        { text: tx(`Approx. ${inr(low)} – ${inr(high)} for ${it.name.en}, ${qty} ${it.unit.en}, ${tier.label.en} finish.`, `ಅಂದಾಜು ${inr(low)} – ${inr(high)} · ${it.name.kn}, ${qty} ${it.unit.kn}, ${tier.label.kn}.`) },
        { text: tx("This is only a range. We confirm the exact price at a 100% free site visit.", "ಇದು ಕೇವಲ ಅಂದಾಜು. ನಿಖರ ಬೆಲೆಯನ್ನು 100% ಉಚಿತ ಸೈಟ್ ಭೇಟಿಯಲ್ಲಿ ದೃಢೀಕರಿಸುತ್ತೇವೆ.") },
        { kind: "actions", wa },
      ]
    );
  };

  const doVisit = () => {
    setStep("menu");
    say([
      { text: tx("Our site visit is 100% free: we come to you, measure, advise, and there is no obligation.", "ನಮ್ಮ ಸೈಟ್ ಭೇಟಿ 100% ಉಚಿತ: ನಾವು ಬಂದು ಅಳತೆ ಮಾಡಿ ಸಲಹೆ ನೀಡುತ್ತೇವೆ, ಯಾವುದೇ ಬಾಧ್ಯತೆಯಿಲ್ಲ.") },
      { kind: "actions", wa: "Hi Narviya, I'd like to book a free site visit." },
    ]);
  };
  const doContact = () => {
    setStep("menu");
    say([
      { text: tx(`Call or WhatsApp us on ${siteConfig.phone}. ${siteConfig.hours.weekdays}.`, `${siteConfig.phone} ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ WhatsApp ಮಾಡಿ. ${siteConfig.hours.weekdays}.`) },
      { kind: "actions", wa: "Hi Narviya, I need some help." },
    ]);
  };
  const doCard = () => {
    setStep("menu");
    say([{ text: tx("Here is our visiting card. You can download both cards below.", "ಇದು ನಮ್ಮ ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್. ಕೆಳಗೆ ಎರಡೂ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು.") }, { kind: "card" }]);
  };
  const doPhone = () => {
    setStep("phone");
    say([{ text: tx("Sure. Type your 10-digit mobile number and we'll call you back.", "ಸರಿ. ನಿಮ್ಮ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಟೈಪ್ ಮಾಡಿ, ನಾವು ಮರಳಿ ಕರೆ ಮಾಡುತ್ತೇವೆ.") }]);
  };

  /* ---- chips (quick replies) ---- */
  type Chip = { label: string; run: () => void };
  const pick = (label: string, run: () => void): Chip => ({
    label,
    run: () => {
      push({ from: "user", text: label });
      run();
    },
  });
  const interiorsLabel = tx("Interiors", "ಇಂಟೀರಿಯರ್ಸ್");
  const exteriorsLabel = tx("Exteriors", "ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್");

  let chips: Chip[] = [];
  if (step === "menu" || step === "done") {
    chips = [
      pick(interiorsLabel, () => askItem("interior")),
      pick(exteriorsLabel, () => askItem("exterior")),
      pick(tx("Free estimate", "ಉಚಿತ ಅಂದಾಜು"), () => {
        setStep("cat");
        say([{ text: tx("Sure! Is it for interiors or exteriors?", "ಸರಿ! ಇಂಟೀರಿಯರ್ಸ್ ಅಥವಾ ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್?") }]);
      }),
      pick(tx("100% free visit", "100% ಉಚಿತ ಭೇಟಿ"), doVisit),
      pick(tx("Visiting card", "ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್"), doCard),
      pick(tx("Talk to us", "ನಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ"), doContact),
    ];
    if (FORMSPREE) chips.push(pick(tx("Request a callback", "ಕರೆ ಮಾಡಲು ಕೋರಿ"), doPhone));
  } else if (step === "cat") {
    chips = [pick(interiorsLabel, () => askItem("interior")), pick(exteriorsLabel, () => askItem("exterior"))];
  } else if (step === "item") {
    chips = itemsOf(cat).map((i) => pick(i.name[lang], () => askQty(i.id)));
  } else if (step === "qty") {
    const it = estimateItems.find((i) => i.id === itemId)!;
    const base = it.defaultQty;
    chips = [Math.max(10, Math.round(base / 2 / 10) * 10), base, base * 2].map((n) =>
      pick(`${n} ${it.unit[lang]}`, () => askTier(n))
    );
  } else if (step === "tier") {
    chips = finishTiers.map((t) => pick(t.label[lang], () => showEstimate(t.id)));
  } else if (step === "phone") {
    chips = [pick(tx("Cancel", "ರದ್ದುಮಾಡಿ"), () => toMenu())];
  }

  /* ---- free text ---- */
  const submitText = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setDraft("");
    push({ from: "user", text });

    if (step === "qty") {
      const n = parseInt(digits(text), 10);
      if (n > 0 && n < 100000) return askTier(n);
      return say([{ text: tx("Please type just a number, for example 120.", "ದಯವಿಟ್ಟು ಒಂದು ಸಂಖ್ಯೆ ಮಾತ್ರ ಟೈಪ್ ಮಾಡಿ, ಉದಾ: 120.") }]);
    }
    if (step === "phone") {
      const num = digits(text).slice(-10);
      if (num.length !== 10) return say([{ text: tx("That doesn't look like a 10-digit number. Please try again.", "ಇದು 10 ಅಂಕಿಯ ಸಂಖ್ಯೆಯಂತೆ ಕಾಣುತ್ತಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.") }]);
      setTyping(true);
      fetch(`https://formspree.io/f/${FORMSPREE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ phone: num, type: "Chat assistant callback request" }),
      })
        .then((r) => {
          setTyping(false);
          if (!r.ok) throw new Error("bad");
          setStep("menu");
          say([{ text: tx("Thank you! We'll call you back shortly.", "ಧನ್ಯವಾದಗಳು! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಕರೆ ಮಾಡುತ್ತೇವೆ.") }], () => toMenu());
        })
        .catch(() => {
          setTyping(false);
          say([{ text: tx("Sorry, that didn't go through. Please WhatsApp or call us instead.", "ಕ್ಷಮಿಸಿ, ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು WhatsApp ಅಥವಾ ಕರೆ ಮಾಡಿ."), }, { kind: "actions", wa: "Hi Narviya, I need a callback." }]);
        });
      return;
    }
    const s = text.toLowerCase();
    if (/estimate|price|cost|rate|budget|quote|ಅಂದಾಜು|ಬೆಲೆ|ದರ/.test(s)) {
      setStep("cat");
      return say([{ text: tx("Sure! Is it for interiors or exteriors?", "ಸರಿ! ಇಂಟೀರಿಯರ್ಸ್ ಅಥವಾ ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್?") }]);
    }
    if (/visit|site|come|ಭೇಟಿ/.test(s)) return doVisit();
    if (/card|ಕಾರ್ಡ್/.test(s)) return doCard();
    if (/call|phone|whatsapp|contact|number|talk|ಕರೆ|ಸಂಪರ್ಕ/.test(s)) return doContact();
    if (/exterior|acp|net|pergola|railing|wpvc|balcony|ಎಕ್ಸ್/.test(s)) return askItem("exterior");
    if (/interior|kitchen|wardrobe|ceiling|pop|pvc|wood|ಇಂಟೀರಿಯರ್/.test(s)) return askItem("interior");
    say([{ text: tx("I didn't quite catch that. Please pick an option below, or talk to us directly.", "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆ ಆರಿಸಿ ಅಥವಾ ನಮ್ಮೊಂದಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ.") }, { kind: "actions", wa: `Hi Narviya, ${text}` }], () => setStep("menu"));
  };

  /* ---- render ---- */
  const bubble = "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed";
  const actionBtn = "block w-full text-center rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em]";

  return (
    <>
      {/* launcher: the Namaste character (+ a greeting bubble each time it appears) */}
      <div
        className={`fixed bottom-4 right-4 z-50 flex items-end gap-2 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-28 opacity-0"
        } ${open ? "max-sm:hidden" : ""}`}
      >
        {visible && !open && (
          <div className="animate-bubble-life mb-10 max-w-[180px] rounded-2xl rounded-br-sm border border-[#c9972b]/50 bg-[#141311]/95 px-3.5 py-2 text-xs text-[#f6f2e9] shadow-2xl">
            <span className="font-serif italic text-[#e6c26a]">{tx("Namaste! 🙏", "ನಮಸ್ಕಾರ! 🙏")}</span>
            <br />
            {tx("Need any help?", "ಏನಾದರೂ ಸಹಾಯ ಬೇಕೇ?")}
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? tx("Close assistant", "ಸಹಾಯಕ ಮುಚ್ಚಿ") : tx("Open assistant", "ಸಹಾಯಕ ತೆರೆಯಿರಿ")}
          className="animate-bot-pop mt-6 cursor-pointer touch-manipulation select-none"
        >
          <NamasteBot />
        </button>
      </div>

      {/* panel: bottom sheet on phones, floating card on larger screens */}
      {open && (
        <div
          role="dialog"
          aria-label="Narviya assistant"
          className="fixed z-50 flex flex-col overflow-hidden border border-[#c9972b]/40 bg-[#0e0d0b] text-[#f6f2e9] shadow-[0_20px_60px_rgba(0,0,0,.65)] inset-x-0 bottom-0 h-[82svh] rounded-t-3xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[600px] sm:max-h-[85svh] sm:w-[390px] sm:rounded-3xl animate-slide-up"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#2b2415] bg-gradient-to-r from-[#17140f] to-[#241d10] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full gold-bar font-serif text-base font-bold">N</span>
              <div>
                <p className="font-serif text-base leading-none">{siteConfig.brandName} {tx("Assistant", "ಸಹಾಯಕ")}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#c9972b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {tx("Online · replies instantly", "ಆನ್‌ಲೈನ್ · ತಕ್ಷಣ ಉತ್ತರ")}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label={tx("Close", "ಮುಚ್ಚಿ")} className="rounded-lg p-1.5 text-neutral-400 hover:text-white cursor-pointer">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m) =>
              m.kind === "card" ? (
                <div key={m.id} className="flex justify-start"><VisitingCard lang={lang} compact /></div>
              ) : m.kind === "actions" ? (
                <div key={m.id} className="max-w-[85%] space-y-2">
                  <a href={waBase + encodeURIComponent(m.wa ?? "")} target="_blank" rel="noopener noreferrer" className={`${actionBtn} bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black`}>
                    {tx("Chat on WhatsApp", "WhatsApp ನಲ್ಲಿ ಮಾತನಾಡಿ")}
                  </a>
                  <a href={callHref} className={`${actionBtn} border border-[#c9972b]/60 text-[#e6c26a]`}>
                    {tx("Call", "ಕರೆ ಮಾಡಿ")} {siteConfig.phone}
                  </a>
                  <Link href="/contact" onClick={() => setOpen(false)} className={`${actionBtn} border border-[#2b2415] text-[#f6f2e9]`}>
                    {tx("Book 100% free visit", "100% ಉಚಿತ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ")}
                  </Link>
                </div>
              ) : (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <p className={`${bubble} ${m.from === "user" ? "bg-[#c9972b] text-black rounded-br-md" : "bg-[#1b1812] border border-[#2b2415] rounded-bl-md"}`}>{m.text}</p>
                </div>
              )
            )}
            {typing && (
              <div className="flex justify-start">
                <span className={`${bubble} flex gap-1 bg-[#1b1812] border border-[#2b2415] rounded-bl-md`} aria-label="typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9972b]" style={{ animationDelay: `${d * 120}ms` }} />
                  ))}
                </span>
              </div>
            )}
            {!typing && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chips.map((c) => (
                  <button key={c.label} onClick={c.run} className="rounded-full border border-[#c9972b]/50 px-3.5 py-1.5 text-xs text-[#e6c26a] hover:bg-[#c9972b]/10 cursor-pointer">
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitText(draft);
            }}
            className="flex items-center gap-2 border-t border-[#2b2415] bg-[#0a0a0a] px-3 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              inputMode={step === "qty" || step === "phone" ? "numeric" : "text"}
              placeholder={step === "qty" ? tx("Type a number…", "ಸಂಖ್ಯೆ ಟೈಪ್ ಮಾಡಿ…") : step === "phone" ? tx("10-digit mobile number", "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ") : tx("Type your question…", "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ…")}
              className="min-w-0 flex-1 rounded-full border border-[#2b2415] bg-[#131110] px-4 py-2.5 text-base sm:text-sm text-white outline-none focus:border-[#c9972b]"
            />
            <button type="submit" aria-label={tx("Send", "ಕಳುಹಿಸಿ")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-bar cursor-pointer">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
