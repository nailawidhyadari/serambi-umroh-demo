"use client";

import { useEffect, useId, useRef, useState } from "react";
import { istilah, type IstilahKey } from "@/data/istilah";

/** Kata dengan garis titik-titik; diketuk atau disorot untuk melihat artinya. */
export function Istilah({ k, children }: { k: IstilahKey; children?: React.ReactNode }) {
  const [buka, setBuka] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();
  const d = istilah[k];

  useEffect(() => {
    if (!buka) return;
    const tutup = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setBuka(false);
    };
    document.addEventListener("pointerdown", tutup);
    document.addEventListener("keydown", tutup);
    return () => {
      document.removeEventListener("pointerdown", tutup);
      document.removeEventListener("keydown", tutup);
    };
  }, [buka]);

  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        className="istilah text-left"
        aria-expanded={buka}
        aria-describedby={buka ? id : undefined}
        onClick={() => setBuka((b) => !b)}
      >
        {children ?? d.kata}
      </button>
      {buka && (
        <span
          id={id}
          role="tooltip"
          className="muncul fixed inset-x-3 bottom-24 z-[60] block font-sans not-italic rounded-xl border border-tinta/15 bg-kertas-3 p-4 text-left text-base sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:mt-2 sm:w-72 sm:rounded-lg sm:p-3.5 sm:text-[0.9rem] font-normal normal-case leading-snug tracking-normal text-tinta-2 shadow-xl"
        >
          <span className="judul mb-1 block text-xl text-tinta">{d.kata}</span>
          {d.arti}
          <span className="mt-2 block text-xs text-tinta-3 sm:hidden">Ketuk di mana saja untuk menutup.</span>
        </span>
      )}
    </span>
  );
}
