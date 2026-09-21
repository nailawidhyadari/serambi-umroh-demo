"use client";

import { useState } from "react";
import type { Kamar, Paket } from "@/data/types";
import { KAMAR_LABEL } from "@/data/paket";
import { hargaTeks, pesanDaftar, rupiah, statusKursi, tanggal, waLink } from "@/lib/format";
import { WaIcon } from "./icons";

type Props = { p: Paket; jadwal: Paket["keberangkatan"]; kurs: number };

/** Panel pesan kursi: pilih tanggal, kamar, jumlah orang → pesan WhatsApp yang sudah terisi. */
export function Daftar({ p, jadwal, kurs }: Props) {
  const pertama = jadwal.find((k) => k.kuota > k.terisi);
  const [tgl, setTgl] = useState(pertama?.tanggal);
  const [kamar, setKamar] = useState<Kamar>("quad");
  const [orang, setOrang] = useState(2);

  const total = p.harga[kamar] * orang;
  const dp = p.dp * orang;
  const kamarTeks = `${KAMAR_LABEL[kamar].nama} (${KAMAR_LABEL[kamar].isi.toLowerCase()})`;

  return (
    <div className="rounded-2xl border border-tinta/15 bg-kertas-3 p-5 shadow-[0_20px_50px_-30px_rgba(23,36,30,0.4)] sm:p-6">
      <h2 className="judul text-2xl">Pesan kursi</h2>
      <p className="mt-1 text-sm text-tinta-3">Belum bayar apa-apa. Admin akan membalas dan menjelaskan langkah berikutnya.</p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">1. Pilih tanggal berangkat</legend>
        <div className="space-y-2">
          {jadwal.map((k) => {
            const st = statusKursi(k);
            const penuh = st.tone === "penuh";
            return (
              <label
                key={k.tanggal}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition ${
                  tgl === k.tanggal ? "border-hijau bg-hijau-muda/60" : "border-tinta/15 hover:border-tinta/40"
                } ${penuh ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <input type="radio" name="tgl" value={k.tanggal} checked={tgl === k.tanggal} disabled={penuh} onChange={() => setTgl(k.tanggal)} className="size-5 accent-[var(--hijau)]" />
                <span className="flex-1 font-medium">{tanggal(k.tanggal, p.hari).rentang}</span>
                <span className={`text-sm font-semibold ${penuh ? "text-tinta-3" : st.tone === "tipis" ? "text-bata" : "text-hijau-2"}`}>{st.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">2. Pilih kamar</legend>
        <div className="space-y-2">
          {(Object.keys(p.harga) as Kamar[]).map((k) => (
            <label
              key={k}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition ${
                kamar === k ? "border-hijau bg-hijau-muda/60" : "border-tinta/15 hover:border-tinta/40"
              }`}
            >
              <input type="radio" name="kamar" value={k} checked={kamar === k} onChange={() => setKamar(k)} className="size-5 shrink-0 accent-[var(--hijau)]" />
              <span className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span>
                  <span className="block font-semibold">{KAMAR_LABEL[k].nama}</span>
                  <span className="block text-sm text-tinta-3">{KAMAR_LABEL[k].isi}</span>
                </span>
                <span className="whitespace-nowrap font-mono font-semibold">{hargaTeks(p, p.harga[k])}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold">3. Berapa orang?</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOrang((o) => Math.max(1, o - 1))} className="grid size-12 place-items-center rounded-xl border border-tinta/25 text-2xl" aria-label="Kurangi">−</button>
          <output className="w-16 text-center font-mono text-2xl font-semibold" aria-live="polite">{orang}</output>
          <button type="button" onClick={() => setOrang((o) => Math.min(20, o + 1))} className="grid size-12 place-items-center rounded-xl border border-tinta/25 text-2xl" aria-label="Tambah">+</button>
          <span className="text-tinta-3">jamaah</span>
        </div>
      </div>

      <dl className="mt-6 space-y-1.5 border-t border-dashed border-garis pt-4">
        <div className="flex justify-between gap-3">
          <dt className="text-tinta-2">Total {orang} orang</dt>
          <dd className="font-mono text-lg font-semibold">{hargaTeks(p, total)}</dd>
        </div>
        {p.mata === "USD" && (
          <div className="flex justify-between gap-3 text-sm text-tinta-3">
            <dt>Estimasi rupiah (kurs {rupiah(kurs)})</dt>
            <dd className="font-mono">{rupiah(total * kurs)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-tinta-2">DP untuk kunci kursi</dt>
          <dd className="font-mono font-semibold text-hijau">{hargaTeks(p, dp)}</dd>
        </div>
      </dl>

      <a
        href={waLink(pesanDaftar(p, { tanggal: tgl, kamar: kamarTeks, orang }))}
        target="_blank"
        rel="noopener"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-hijau px-4 py-4 text-lg font-semibold text-kertas transition hover:bg-hijau-2"
      >
        <WaIcon /> Kirim lewat WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-tinta-3">Pesan sudah terisi otomatis. Anda tinggal tekan kirim.</p>
    </div>
  );
}
