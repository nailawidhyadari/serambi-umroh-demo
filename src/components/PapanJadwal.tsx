"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BULAN_PANJANG, statusKursi, tanggal, waLink } from "@/lib/format";

export type BarisJadwal = {
  slug: string;
  nama: string;
  pendek: string;
  kategori: string;
  hari: number;
  maskapai: string;
  langsung: boolean;
  harga: string;
  tanggal: string;
  kuota: number;
  terisi: number;
  pesan: string;
};

const TONE = {
  aman: "bg-hijau-muda text-hijau",
  tipis: "bg-bata-muda text-bata",
  penuh: "bg-tinta/8 text-tinta-3 line-through decoration-1",
};

/** Papan keberangkatan: filter bulan & jenis, baris besar yang mudah dibaca. */
export function PapanJadwal({ baris, filter = true, batas }: { baris: BarisJadwal[]; filter?: boolean; batas?: number }) {
  const bulan = useMemo(() => Array.from(new Set(baris.map((b) => b.tanggal.slice(0, 7)))).sort(), [baris]);
  const [pilihBulan, setBulan] = useState<string>("semua");
  const [jenis, setJenis] = useState<string>("semua");
  const [sembunyiPenuh, setSembunyi] = useState(false);

  let tampil = baris.filter(
    (b) =>
      (pilihBulan === "semua" || b.tanggal.startsWith(pilihBulan)) &&
      (jenis === "semua" || (jenis === "haji" ? b.kategori === "haji" : b.kategori !== "haji")) &&
      (!sembunyiPenuh || b.kuota > b.terisi),
  );
  if (batas) tampil = tampil.slice(0, batas);

  return (
    <div>
      {filter && (
        <div className="mb-5 space-y-3">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <Chip aktif={pilihBulan === "semua"} onClick={() => setBulan("semua")}>Semua bulan</Chip>
            {bulan.map((b) => {
              const [y, m] = b.split("-").map(Number);
              return (
                <Chip key={b} aktif={pilihBulan === b} onClick={() => setBulan(b)}>
                  {BULAN_PANJANG[m - 1]} {y}
                </Chip>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              ["semua", "Umroh & haji"],
              ["umroh", "Umroh saja"],
              ["haji", "Haji saja"],
            ].map(([v, l]) => (
              <Chip key={v} aktif={jenis === v} onClick={() => setJenis(v)} kecil>
                {l}
              </Chip>
            ))}
            <label className="ml-1 flex cursor-pointer items-center gap-2 text-sm font-medium text-tinta-2">
              <input type="checkbox" checked={sembunyiPenuh} onChange={(e) => setSembunyi(e.target.checked)} className="size-5 accent-[var(--hijau)]" />
              Sembunyikan yang penuh
            </label>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-tinta/15 bg-kertas-3">
        <div className="hidden grid-cols-[8.5rem_1fr_11rem_9rem_10rem] gap-4 border-b border-tinta/15 bg-tinta px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-kertas/75 md:grid">
          <span>Berangkat</span>
          <span>Paket</span>
          <span>Pesawat</span>
          <span>Harga mulai</span>
          <span className="text-right">Kursi</span>
        </div>
        {tampil.length === 0 && <p className="p-6 text-tinta-2">Tidak ada keberangkatan dengan pilihan ini. Coba bulan lain.</p>}
        <ul>
          {tampil.map((b) => {
            const t = tanggal(b.tanggal, b.hari);
            const st = statusKursi({ tanggal: b.tanggal, kuota: b.kuota, terisi: b.terisi });
            const penuh = st.tone === "penuh";
            return (
              <li key={b.slug + b.tanggal} className={`grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-2 border-b border-garis px-4 py-4 last:border-0 md:grid-cols-[8.5rem_1fr_11rem_9rem_10rem] md:px-5 ${penuh ? "opacity-60" : ""}`}>
                <div className="row-span-2 md:row-span-1">
                  <p className="font-mono text-3xl font-semibold leading-none md:inline md:text-2xl">{t.tgl}</p>
                  <p className="mt-1 text-sm font-semibold uppercase md:ml-2 md:inline">{t.bulan} {String(t.tahun).slice(2)}</p>
                  <p className="text-xs text-tinta-3">{t.hari}</p>
                </div>
                <div className="min-w-0">
                  <Link href={`/paket/${b.slug}`} className="judul text-xl hover:text-hijau hover:underline">{b.nama}</Link>
                  <p className="text-sm text-tinta-3">{t.rentang} · {b.hari} hari</p>
                </div>
                <p className="hidden text-sm md:block">
                  {b.maskapai}
                  <br />
                  <span className="text-tinta-3">{b.langsung ? "Langsung" : "1× transit"}</span>
                </p>
                <p className="col-start-2 font-mono text-sm font-semibold md:col-start-auto md:text-base">{b.harga}</p>
                <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:flex-col md:items-end md:gap-1.5">
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${TONE[st.tone]}`}>{st.label}</span>
                  {!penuh ? (
                    <a href={waLink(b.pesan)} target="_blank" rel="noopener" className="text-sm font-semibold text-hijau underline underline-offset-4 hover:text-hijau-2">
                      Pesan kursi
                    </a>
                  ) : (
                    <a href={waLink(b.pesan.replace("Apakah kursinya masih ada?", "Kursinya penuh. Saya ingin masuk daftar tunggu."))} target="_blank" rel="noopener" className="text-sm font-semibold text-tinta-2 underline underline-offset-4">
                      Daftar tunggu
                    </a>
                  )}
                </div>
                {!penuh && (
                  <div className="col-span-2 md:col-span-5" aria-hidden>
                    <div className="h-1 overflow-hidden rounded-full bg-kertas-2">
                      <div className={`h-full ${st.tone === "tipis" ? "bg-bata" : "bg-hijau-2"}`} style={{ width: `${(b.terisi / b.kuota) * 100}%` }} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Chip({ aktif, onClick, children, kecil }: { aktif: boolean; onClick: () => void; children: React.ReactNode; kecil?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktif}
      className={`shrink-0 whitespace-nowrap rounded-full border font-semibold transition ${kecil ? "px-3.5 py-1.5 text-sm" : "px-4 py-2"} ${
        aktif ? "border-tinta bg-tinta text-kertas" : "border-tinta/20 bg-kertas-3 text-tinta-2 hover:border-tinta/50"
      }`}
    >
      {children}
    </button>
  );
}

