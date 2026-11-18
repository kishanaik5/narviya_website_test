"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Language } from "@/locales/translations";

const LANG_EVENT = "narviya:lang";

function subscribe(cb: () => void) {
  window.addEventListener(LANG_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(LANG_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getLang(): Language {
  try {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved === "en" || saved === "kn") return saved;
  } catch {}
  return "en";
}

/**
 * Shared language state for every page. Server render and first client render are
 * always English (matches the static HTML); the saved choice applies right after hydration.
 */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as Language);
  const setLang = useCallback((next: Language) => {
    try {
      localStorage.setItem("preferredLanguage", next);
    } catch {}
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);
  return { lang, setLang };
}
