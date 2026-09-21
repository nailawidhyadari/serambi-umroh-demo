"use client";

import { tulis, useLokal } from "@/lib/lokal";

const PILIHAN = [
  { v: "biasa", label: "A", nama: "Huruf biasa" },
  { v: "besar", label: "A+", nama: "Huruf besar" },
  { v: "sangat", label: "A++", nama: "Huruf sangat besar" },
] as const;

const KUNCI = "serambi-huruf";

function terapkan(v: string) {
  const el = document.documentElement;
  if (v === "biasa") el.removeAttribute("data-huruf");
  else el.setAttribute("data-huruf", v);
}

/** Tombol pembesar huruf. Pilihan disimpan di browser pengunjung. */
export function UkuranHuruf({ className = "" }: { className?: string }) {
  const u = useLokal(KUNCI) ?? "biasa";

  return (
    <div role="group" aria-label="Ukuran huruf" className={`flex items-center rounded-full border border-tinta/20 bg-kertas-3 p-0.5 ${className}`}>
      {PILIHAN.map((p) => (
        <button
          key={p.v}
          type="button"
          onClick={() => {
            terapkan(p.v);
            tulis(KUNCI, p.v);
          }}
          aria-pressed={u === p.v}
          title={p.nama}
          className={`min-w-9 rounded-full px-2 py-1 text-sm font-bold leading-none transition ${
            u === p.v ? "bg-tinta text-kertas" : "text-tinta-2 hover:bg-kertas-2"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
