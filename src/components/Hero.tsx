"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Language, translations } from "@/locales/translations";
import { siteConfig } from "@/config/site";
import { heroScenes, exteriorScene, interiorScene, anatomyScene } from "@/config/scenes";

interface HeroProps {
  lang: Language;
}

type World = "interior" | "exterior";

/* ---------- helpers ---------- */

function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

// Desktop, or a landscape tablet (e.g. 9-inch). Everything else gets the walk-in scroll.
const SPLIT_QUERY =
  "(min-width: 1024px), ((min-width: 700px) and (min-height: 480px) and (orientation: landscape))";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

type Router = ReturnType<typeof useRouter>;

/** Open the Services page with the Interior / Exterior tab pre-selected. */
function goToServices(router: Router, world: World) {
  try {
    sessionStorage.setItem("narviya:world", world);
    window.dispatchEvent(new Event("narviya:world"));
  } catch {}
  router.push(`/services?tab=${world}`);
}

/* ---------- loading intro (buffer state) ---------- */

function Intro({ onDone, brand }: { onDone: () => void; brand: string }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minWait = new Promise<void>((r) => setTimeout(r, reduce ? 0 : 1700));
    const cap = new Promise<void>((r) => setTimeout(r, 4500)); // never block longer than this
    const images = Promise.all(
      [...heroScenes, anatomyScene].map(
        (s) =>
          new Promise<void>((res) => {
            const img = new Image();
            img.onload = img.onerror = () => res();
            img.src = s.src;
          })
      )
    );
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([Promise.all([minWait, images, fonts]), cap]).then(() => {
      setLeaving(true);
      onDone();
      setTimeout(() => setGone(true), reduce ? 0 : 1100);
    });
  }, [onDone]);

  useEffect(() => {
    document.documentElement.style.overflow = gone ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden={leaving}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-transform duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)] motion-reduce:transition-none"
      style={{ transform: leaving ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="absolute inset-x-0 top-6 gold-rule" />
      <div className="absolute inset-x-0 bottom-6 gold-rule" />
      <span className="intro-logo font-serif font-semibold text-4xl sm:text-6xl gold-gradient-text pl-[.32em]">
        {brand}
      </span>
      <span className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#a89f8c]">
        Interiors&nbsp;&nbsp;|&nbsp;&nbsp;Exteriors
      </span>
      <div className="mt-10 h-px w-40 bg-[#2b2415] overflow-hidden">
        <div className="intro-line h-full w-full gold-bar" />
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */

function ServiceChips({ items, align = "left" }: { items: string[]; align?: "left" | "center" }) {
  return (
    <ul
      className={`flex flex-wrap gap-x-3 gap-y-1 text-sm tracking-[0.06em] text-white ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {items.map((it, i) => (
        <li key={it} className="flex items-center gap-3">
          {i > 0 && <span className="text-[#c9972b]">|</span>}
          {it}
        </li>
      ))}
    </ul>
  );
}

function BrassButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#f3d27a] via-[#c9972b] to-[#8a6414] text-black text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_6px_24px_rgba(201,151,43,.3)] active:scale-95 transition cursor-pointer"
    >
      {children}
      <span>→</span>
    </button>
  );
}

function WorldTitle({ world, t, as: Tag = "h2", size = "lg" }: { world: World; t: ReturnType<typeof getHero>; as?: "h1" | "h2"; size?: "lg" | "md" }) {
  const big = size === "lg";
  return (
    <Tag className={`first-gold font-serif leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.6)] ${big ? "text-5xl xl:text-7xl tracking-[0.06em] font-medium" : "text-5xl tracking-[0.06em] font-medium"}`}>
      {t.brandName}
      <span className={`first-gold block font-light text-white/90 mt-2 ${big ? "text-3xl xl:text-5xl tracking-[0.12em]" : "text-3xl tracking-[0.12em]"}`}>
        {t[world].label}
      </span>
    </Tag>
  );
}

const getHero = (lang: Language) => translations[lang].hero;

/* ---------- desktop / landscape tablet: full-screen split ---------- */

function SplitHero({ lang, ready }: { lang: Language; ready: boolean }) {
  const t = getHero(lang);
  const router = useRouter();

  const copy = (world: World) => {
    const d = t[world];
    return (
      <div
        key={world}
        role="group"
        aria-label={d.label}
        className={`flex flex-col gap-5 px-10 xl:px-16 ${
          world === "interior" ? "items-start text-left pr-20" : "items-end text-right pl-20"
        }`}
      >
        <span className="text-xs xl:text-sm tracking-[0.12em] text-[#e6c26a]">{d.tag}</span>
        <WorldTitle world={world} t={t} />
        <div className={`gold-rule w-40 ${world === "interior" ? "" : "ml-auto"}`} />
        <p className="text-xs tracking-[0.18em] text-white/70">{d.sub}</p>
        <ServiceChips items={[...t[world].items]} />
        <BrassButton onClick={() => goToServices(router, world)}>{d.cta}</BrassButton>
      </div>
    );
  };

  return (
    <section id="home" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      {/* one house: left half is the inside, right half is the outside (split line is at x = 50% of the image) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={anatomyScene.src}
        alt={anatomyScene.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] ease-out motion-reduce:transition-none"
        style={{ objectPosition: "50% 45%", transform: ready ? "scale(1)" : "scale(1.08)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.92)_0%,rgba(0,0,0,.6)_30%,rgba(0,0,0,0)_58%,rgba(0,0,0,.35)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 pb-20">
        {copy("interior")}
        {copy("exterior")}
      </div>

      {/* small badge on the split line */}
      <span className="absolute left-1/2 bottom-[7.5rem] z-10 -translate-x-1/2 rounded-full border border-[#c9972b] bg-[#0b0905]/90 px-4 py-1.5 font-serif text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e6c26a] whitespace-nowrap">
        {t.brandName}
      </span>

      {/* doors that slide apart after the intro */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-[#050505] border-r border-[#c9972b]/60 transition-transform duration-[1300ms] ease-[cubic-bezier(.76,0,.24,1)] motion-reduce:hidden"
        style={{ transform: ready ? "translateX(-101%)" : "translateX(0)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-[#050505] border-l border-[#c9972b]/60 transition-transform duration-[1300ms] ease-[cubic-bezier(.76,0,.24,1)] motion-reduce:hidden"
        style={{ transform: ready ? "translateX(101%)" : "translateX(0)" }}
      />

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-xs tracking-[0.3em] text-white/70 whitespace-nowrap">
        {t.motto}
      </p>
    </section>
  );
}

/* ---------- mobile / portrait: scroll = walk up, the doors open, step inside ---------- */

const IMG_RATIO = 9 / 16; // every hero scene image is 9:16
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** zoom progress (0 = start, 1 = the open doorway fills the screen) against transition time t */
const ZOOM_KEYS: [number, number][] = [
  [0, 0],
  [0.38, 0.62], // walk up to the door
  [0.7, 0.74], // ...slow down while the doors swing open
  [1, 1], // ...then step through
];
function zoomAt(t: number) {
  for (let k = 1; k < ZOOM_KEYS.length; k++) {
    const [t1, e1] = ZOOM_KEYS[k];
    if (t <= t1) {
      const [t0, e0] = ZOOM_KEYS[k - 1];
      return lerp(e0, e1, (t - t0) / (t1 - t0));
    }
  }
  return 1;
}

function WalkInHero({ lang, ready }: { lang: Language; ready: boolean }) {
  const t = getHero(lang);
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const doorBox = useRef<HTMLDivElement>(null);
  const leafL = useRef<HTMLDivElement>(null);
  const leafR = useRef<HTMLDivElement>(null);
  const shadeL = useRef<HTMLDivElement>(null);
  const shadeR = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const extCopy = useRef<HTMLDivElement>(null);
  const intCopy = useRef<HTMLDivElement>(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const N = heroScenes.length;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const st = stage.current;
    if (!el || !st) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const W = st.clientWidth;
      const H = st.clientHeight;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp(-r.top / total);
      const u = p * (N - 1);
      const i = Math.min(Math.floor(u), N - 2); // door transition i -> i+1
      const tt = u - i; // 0..1 inside this transition

      const cur = heroScenes[i];
      const nxt = heroScenes[i + 1];
      const door = cur.door;
      if (!door || !nxt) return;

      // where the (object-cover) image sits on screen
      const dispW = W / H > IMG_RATIO ? W : H * IMG_RATIO;
      const dispH = dispW / IMG_RATIO;
      const offX = (W - dispW) / 2;
      const offY = (H - dispH) / 2;

      // the door in screen pixels (before zoom)
      const dl = offX + dispW * door.left;
      const dr = offX + dispW * door.right;
      const dt = offY + dispH * door.top;
      const db = offY + dispH * door.bottom;
      const dcx = (dl + dr) / 2;
      const dcy = (dt + db) / 2;
      const dW = dr - dl;
      const dH = db - dt;

      // zoom so that at tt = 1 the open doorway covers the whole screen
      const sFull = Math.max((2 * Math.max(dcx, W - dcx)) / dW, (2 * Math.max(dcy, H - dcy)) / dH) * 1.03;
      const S = Math.pow(sFull, zoomAt(tt));
      const rw = dW * S;
      const rh = dH * S;
      const rl = dcx - rw / 2;
      const rt = dcy - rh / 2;

      // --- scene layers: current = zooming exterior, next = interior seen through the doorway
      heroScenes.forEach((_, j) => {
        const node = layers.current[j];
        if (!node) return;
        if (j === i) {
          node.style.opacity = "1";
          node.style.clipPath = "none";
          node.style.transformOrigin = `${dcx}px ${dcy}px`;
          node.style.transform = `scale(${S})`;
        } else if (j === i + 1) {
          const focus = nxt.focus ?? { x: 0.5, y: 0.45 };
          const fx = offX + dispW * focus.x;
          const fy = offY + dispH * focus.y;
          const m2 = easeOut(clamp((tt - 0.38) / 0.62));
          const k = lerp(1.3, 1, m2);
          node.style.opacity = tt > 0.3 ? "1" : "0";
          const clip = `inset(${Math.max(0, rt)}px ${Math.max(0, W - (rl + rw))}px ${Math.max(0, H - (rt + rh))}px ${Math.max(0, rl)}px)`;
          node.style.clipPath = clip;
          node.style.transformOrigin = `${fx}px ${fy}px`;
          node.style.transform = `translate3d(${(dcx - fx) * (1 - m2)}px, ${(dcy - fy) * (1 - m2)}px, 0) scale(${k})`;
        } else {
          node.style.opacity = "0";
        }
      });

      // --- the two door leaves (crops of the exterior image) swinging on their outer hinges
      const box = doorBox.current;
      if (box) {
        const show = tt > 0.2 && tt < 0.95;
        box.style.visibility = show ? "visible" : "hidden";
        if (show) {
          const m = easeInOut(clamp((tt - 0.4) / 0.3));
          const angle = m * 88;
          const fade = 1 - clamp((tt - 0.8) / 0.12);
          const wL = (rw * (door.seam - door.left)) / (door.right - door.left);
          const wR = rw - wL;
          const ix = dcx + (offX - dcx) * S; // image top-left on screen after zoom
          const iy = dcy + (offY - dcy) * S;
          const bgSize = `${dispW * S}px ${dispH * S}px`;

          box.style.left = `${rl}px`;
          box.style.top = `${rt}px`;
          box.style.width = `${rw}px`;
          box.style.height = `${rh}px`;
          box.style.perspective = `${rw * 1.6}px`;
          box.style.opacity = String(fade);

          const L = leafL.current;
          const R = leafR.current;
          if (L && R) {
            L.style.width = `${wL}px`;
            L.style.backgroundSize = bgSize;
            L.style.backgroundPosition = `${ix - rl}px ${iy - rt}px`;
            L.style.transform = `rotateY(${angle}deg)`;
            R.style.left = `${wL}px`;
            R.style.width = `${wR}px`;
            R.style.backgroundSize = bgSize;
            R.style.backgroundPosition = `${ix - (rl + wL)}px ${iy - rt}px`;
            R.style.transform = `rotateY(${-angle}deg)`;
          }
          const sh = String(m * 0.6);
          if (shadeL.current) shadeL.current.style.opacity = sh;
          if (shadeR.current) shadeR.current.style.opacity = sh;
          if (glow.current) glow.current.style.opacity = String(m * 0.55);
        }
      }

      if (extCopy.current) extCopy.current.style.opacity = String(1 - clamp((p - 0.03) / 0.14));
      if (intCopy.current) intCopy.current.style.opacity = String(clamp((u - (N - 1) + 0.18) / 0.18));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, N]);

  const copy = (world: World, h: "h1" | "h2") => (
    <div className="flex flex-col items-center gap-4 text-center px-6">
      <span className="text-xs tracking-[0.12em] text-[#e6c26a]">{t[world].tag}</span>
      <WorldTitle world={world} t={t} as={h} size="md" />
      <ServiceChips items={[...t[world].items]} align="center" />
    </div>
  );

  /* reduced motion: plain stacked panels, no scroll choreography */
  if (reduced) {
    return (
      <section id="home" className="bg-[#1c1a17]">
        {(["exterior", "interior"] as World[]).map((w) => {
          const scene = w === "exterior" ? exteriorScene : interiorScene;
          return (
            <div key={w} className="relative min-h-[85svh] flex items-end pb-14 justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scene.src} alt={scene.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140f08] via-[#140f08]/50 to-transparent" />
              <div className="relative flex flex-col items-center gap-5">
                {copy(w, w === "exterior" ? "h1" : "h2")}
                <BrassButton onClick={() => goToServices(router, w)}>{t[w].cta}</BrassButton>
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  const leafStyle: React.CSSProperties = {
    backgroundImage: `url(${heroScenes[0].src})`,
    backgroundRepeat: "no-repeat",
    backfaceVisibility: "hidden",
  };

  return (
    <section id="home" ref={ref} className="relative bg-[#0a0a0a]" style={{ height: `${(N - 1) * 200 + 100}svh` }}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#0a0a0a]">
        {/* scene stack: exterior zooms toward the door, interior waits behind it */}
        {heroScenes.map((scene, i) => (
          <div
            key={scene.src}
            ref={(n) => {
              layers.current[i] = n;
            }}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={scene.src} alt={scene.alt} className="h-full w-full object-cover" draggable={false} />
          </div>
        ))}

        {/* the double door: two leaves hinged on the outer edges, swinging open */}
        <div
          ref={doorBox}
          aria-hidden
          className="pointer-events-none absolute z-[5]"
          style={{ visibility: "hidden", transformStyle: "preserve-3d" }}
        >
          <div
            ref={glow}
            className="absolute inset-0"
            style={{
              opacity: 0,
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(255,236,190,.95) 0%, rgba(255,214,140,.55) 45%, rgba(255,214,140,0) 80%)",
            }}
          />
          <div ref={leafL} className="absolute left-0 top-0 h-full" style={{ ...leafStyle, transformOrigin: "0% 50%" }}>
            <div ref={shadeL} className="absolute inset-0 bg-black" style={{ opacity: 0 }} />
          </div>
          <div ref={leafR} className="absolute top-0 h-full" style={{ ...leafStyle, transformOrigin: "100% 50%" }}>
            <div ref={shadeR} className="absolute inset-0 bg-black" style={{ opacity: 0 }} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(0,0,0,.95)_0%,rgba(0,0,0,.75)_30%,rgba(0,0,0,.2)_58%,rgba(0,0,0,.45)_100%)]" />

        {/* exterior copy (fades as we walk in) */}
        <div ref={extCopy} className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-6 pb-14 pointer-events-none">
          {copy("exterior", "h1")}
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-[10px] uppercase tracking-[0.4em]">{t.scroll}</span>
            <span className="block h-8 w-px bg-[#c9972b] animate-puppet-float" />
          </div>
        </div>

        {/* interior copy (appears once inside) */}
        <div
          ref={intCopy}
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-6 pb-14"
          style={{ opacity: 0, pointerEvents: ready ? "auto" : "none" }}
        >
          {copy("interior", "h2")}
          <div className="flex flex-col items-center gap-3">
            <BrassButton onClick={() => goToServices(router, "interior")}>{t.interior.cta}</BrassButton>
            <button
              onClick={() => goToServices(router, "exterior")}
              className="text-xs tracking-[0.18em] text-[#e6c26a] underline underline-offset-4 decoration-[#c9972b]/60 cursor-pointer"
            >
              {t.exterior.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- entry ---------- */

export default function Hero({ lang }: HeroProps) {
  const [ready, setReady] = useState(false);
  const isSplit = useMedia(SPLIT_QUERY);
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Intro onDone={handleDone} brand={lang === "kn" ? translations.kn.hero.brandName : siteConfig.brandShort} />
      {isSplit ? <SplitHero lang={lang} ready={ready} /> : <WalkInHero lang={lang} ready={ready} />}
    </>
  );
}
