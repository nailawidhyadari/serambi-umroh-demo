"use client";

import { useMemo } from "react";
import { tulis, useLokal } from "@/lib/lokal";
import type { ChecklistGrup } from "@/data/panduan";
import { Centang, Cetak } from "./icons";

const KUNCI = "serambi-checklist";

/** Daftar bawaan yang bisa dicentang. Centangan disimpan di browser ini saja. */
export function Checklist({ grup }: { grup: ChecklistGrup[] }) {
  const mentah = useLokal(KUNCI);
  const cek = useMemo<Record<string, boolean>>(() => {
    try {
      return mentah ? JSON.parse(mentah) : {};
    } catch {
      return {};
    }
  }, [mentah]);

  const ubah = (id: string) => tulis(KUNCI, JSON.stringify({ ...cek, [id]: !cek[id] }));

  const total = grup.reduce((a, g) => a + g.item.length, 0);
  const selesai = Object.values(cek).filter(Boolean).length;

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-hijau p-5 text-kertas">
        <div className="flex-1">
          <p className="font-mono text-3xl font-semibold">
            {selesai}<span className="text-kertas/60">/{total}</span>
          </p>
          <p className="text-sm text-kertas/75">barang sudah masuk koper</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-kertas/20">
            <div className="h-full bg-kuning transition-all" style={{ width: `${(selesai / total) * 100}%` }} />
          </div>
        </div>
        <button type="button" onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-kertas px-4 py-3 font-semibold text-hijau">
          <Cetak className="size-5" /> Cetak daftar
        </button>
        {selesai > 0 && (
          <button
            type="button"
            onClick={() => tulis(KUNCI, null)}
            className="text-sm font-semibold text-kertas/80 underline underline-offset-4"
          >
            Ulang dari awal
          </button>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grup.map((g) => (
          <div key={g.judul} className="print-full rounded-2xl border border-tinta/15 bg-kertas-3 p-5">
            <h3 className="judul text-2xl">{g.judul}</h3>
            <ul className="mt-3 space-y-1">
              {g.item.map((it) => {
                const id = `${g.judul}:${it}`;
                const on = !!cek[id];
                return (
                  <li key={it}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-2 hover:bg-kertas-2">
                      <input type="checkbox" checked={on} onChange={() => ubah(id)} className="peer sr-only" />
                      <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-bata ${on ? "border-hijau bg-hijau text-kertas" : "border-tinta/35"}`}>
                        {on && <Centang className="size-4" />}
                      </span>
                      <span className={on ? "text-tinta-3 line-through" : ""}>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
