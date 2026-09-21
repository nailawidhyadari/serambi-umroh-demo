"use client";

import { useSyncExternalStore } from "react";

/** Simpanan kecil di browser pengunjung (localStorage) yang bisa dipakai lewat hook. */
const EVENT = "serambi-lokal";

function baca(kunci: string) {
  try {
    return localStorage.getItem(kunci);
  } catch {
    return null;
  }
}

export function tulis(kunci: string, nilai: string | null) {
  try {
    if (nilai === null) localStorage.removeItem(kunci);
    else localStorage.setItem(kunci, nilai);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function langganan(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useLokal(kunci: string) {
  return useSyncExternalStore(
    langganan,
    () => baca(kunci),
    () => null,
  );
}
