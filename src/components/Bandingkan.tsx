"use client";

import Link from "next/link";
import { useState } from "react";
import type { Paket } from "@/data/types";
import { KATEGORI_LABEL, RITME_LABEL } from "@/data/paket";
import { hargaTeks, jadwalBerikut, keRupiah, sisa, tanggal } from "@/lib/format";
import { Centang } from "./icons";

type Baris = {
  label: string;
  nilai: (p: Paket) => React.ReactNode;
  /** Angka untuk menandai yang terbaik (makin kecil makin baik). */
  skor?: (p: Paket) => number | null;
};

const hotel = (p: Paket, kota: "Makkah" | "Madinah") => p.hotel.find((h) => h.kota === kota);

const BARIS: Baris[] = [
  { label: "Harga kamar ber-4", nilai: (p) => hargaTeks(p, p.harga.quad), skor: (p) => keRupiah(p, p.harga.quad) },
  { label: "Harga kamar ber-2", nilai: (p) => hargaTeks(p, p.harga.double), skor: (p) => keRupiah(p, p.harga.double) },
  { label: "Lama perjalanan", nilai: (p) => `${p.hari} hari` },
  {
    label: "Hotel Makkah",
    nilai: (p) => {
      const h = hotel(p, "Makkah");
      return h ? `★${h.bintang} · ${h.jarak} m · ${h.malam} malam` : "–";
    },
    skor: (p) => hotel(p, "Makkah")?.jarak ?? null,
  },
  {
    label: "Hotel Madinah",
    nilai: (p) => {
      const h = hotel(p, "Madinah");
      return h ? `★${h.bintang} · ${h.jarak} m · ${h.malam} malam` : "–";
    },
    skor: (p) => hotel(p, "Madinah")?.jarak ?? null,
  },
  { label: "Maskapai", nilai: (p) => `${p.maskapai.nama}${p.maskapai.langsung ? ", langsung" : ", 1× transit"}` },
  { label: "Bagasi", nilai: (p) => p.maskapai.bagasi },
  { label: "Antarkota", nilai: (p) => p.pindahKota },
  { label: "Jamaah per pembimbing", nilai: (p) => `${p.perPembimbing} orang`, skor: (p) => p.perPembimbing },
  { label: "Ritme", nilai: (p) => RITME_LABEL[p.ritme] },
  {
    label: "Berangkat terdekat",
    nilai: (p) => {
      const k = jadwalBerikut(p);
      return k ? `${tanggal(k.tanggal, p.hari).rentang} (sisa ${sisa(k)})` : "Penuh";
    },
  },
];

export function Bandingkan({ daftar }: { daftar: Paket[] }) {
  const [pilih, setPilih] = useState<string[]>([daftar[0].slug, daftar[1].slug]);
  const toggle = (slug: string) =>
    setPilih((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= 3 ? [...s.slice(1), slug] : [...s, slug]));
  const dipilih = daftar.filter((p) => pilih.includes(p.slug));

  return (
    <div>
      <p className="mb-3 font-semibold">Centang 2 atau 3 paket:</p>
      <div className="flex flex-wrap gap-2">
        {daftar.map((p) => {
          const on = pilih.includes(p.slug);
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggle(p.slug)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 font-semibold transition ${
                on ? "border-hijau bg-hijau text-kertas" : "border-tinta/20 bg-kertas-3 text-tinta-2 hover:border-tinta/50"
              }`}
            >
              <span className={`grid size-5 place-items-center rounded border ${on ? "border-kertas bg-kertas text-hijau" : "border-tinta/40"}`}>
                {on && <Centang className="size-3.5" />}
              </span>
              {p.nama}
            </button>
          );
        })}
      </div>

      {dipilih.length < 2 ? (
        <p className="mt-6 rounded-xl bg-kertas-2 p-5 text-tinta-2">Pilih satu paket lagi untuk mulai membandingkan.</p>
      ) : (
        <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[40rem] border-collapse overflow-hidden rounded-2xl bg-kertas-3 text-left">
            <thead>
              <tr className="bg-tinta text-kertas">
                <th className="w-44 p-4 text-xs font-semibold uppercase tracking-[0.14em] text-kertas/70">Pembanding</th>
                {dipilih.map((p) => (
                  <th key={p.slug} className="p-4 align-bottom">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-kuning">{KATEGORI_LABEL[p.kategori]}</span>
                    <Link href={`/paket/${p.slug}`} className="judul text-xl hover:underline">{p.nama}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BARIS.map((b) => {
                const skor = b.skor ? dipilih.map((p) => b.skor!(p)) : [];
                const valid = skor.filter((x): x is number => x !== null);
                const terbaik = valid.length > 1 && new Set(valid).size > 1 ? Math.min(...valid) : null;
                return (
                  <tr key={b.label} className="border-t border-garis">
                    <th scope="row" className="p-4 text-sm font-semibold text-tinta-2">{b.label}</th>
                    {dipilih.map((p, i) => {
                      const best = terbaik !== null && skor[i] === terbaik;
                      return (
                        <td key={p.slug} className={`p-4 ${best ? "bg-hijau-muda/70 font-semibold text-hijau" : ""}`}>
                          {b.nilai(p)}
                          {best && <span className="ml-2 whitespace-nowrap rounded-full bg-hijau px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-kertas">terbaik</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
