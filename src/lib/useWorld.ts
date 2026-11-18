"use client";

import { useCallback, useSyncExternalStore } from "react";

export type World = "interior" | "exterior";

const KEY = "narviya:world";
const EVENT = "narviya:world";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function read(): World {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v === "interior" || v === "exterior") return v;
  } catch {}
  return "interior";
}

/**
 * Which side of the business the visitor is exploring (Interiors or Exteriors).
 * Set by the hero buttons, the Services / Estimate tabs and the chat widget; read by the
 * visiting card so it shows the matching card. Defaults to Interiors.
 */
export function useWorld() {
  const world = useSyncExternalStore(subscribe, read, () => "interior" as World);
  const setWorld = useCallback((w: World) => {
    try {
      sessionStorage.setItem(KEY, w);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { world, setWorld };
}
