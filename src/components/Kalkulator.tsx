"use client";

import { useState } from "react";
import type { Kamar, Paket } from "@/data/types";
import { KAMAR_LABEL } from "@/data/paket";
import { jadwalAktif, keRupiah, rupiah, sisa, tanggal, waLink } from "@/lib/format";
import { WaIcon } from "./icons";

const PASPOR = 350_000;
const SEKARANG = new Date();
// Bawaan: keberangkatan ±3 bulan lagi, supaya rencana tabungannya terlihat.
const TIGA_BULAN = new Date(SEKARANG.getTime() + 90 * 86_400_000).toISOString().slice(0, 10);
const VAKSIN = 400_000;

/** Kalkulator biaya total + rencana tabungan bulanan sampai tanggal pelunasan. */
export function Kalkulator({ daftar, kurs }: { daftar: Paket[]; kurs: number }) {
  const [slug, setSlug] = useState(daftar[0].slug);
  const p = daftar.find((x) => x.slug === slug)!;
  const [kamar, setKamar] = useState<Kamar>("quad");
  const [dewasa, setDewasa] = useState(2);
  const [bayi, setBayi] = useState(0);
  const [paspor, setPaspor] = useState(0);
  const [vaksin, setVaksin] = useState(true);
  const [saku, setSaku] = useState(1000);
  const jadwal = jadwalAktif(p).filter((k) => sisa(k) > 0);
  const [tgl, setTgl] = useState((jadwal.find((k) => k.tanggal >= TIGA_BULAN) ?? jadwal[0])?.tanggal);
  const tglAktif = jadwal.some((k) => k.tanggal === tgl) ? tgl : (jadwal.find((k) => k.tanggal >= TIGA_BULAN) ?? jadwal[0])?.tanggal;

  const sar = kurs / 3.75;
  const hitung = (() => {
    const hargaOrang = keRupiah(p, p.harga[kamar]);
    const paket = hargaOrang * dewasa + hargaOrang * 0.25 * bayi;
    const biayaPaspor = paspor * PASPOR;
    const biayaVaksin = vaksin ? (dewasa + bayi) * VAKSIN : 0;
    const uangSaku = Math.round((saku * sar) / 1000) * 1000 * dewasa;
    const total = paket + biayaPaspor + biayaVaksin + uangSaku;
    const dp = keRupiah(p, p.dp) * dewasa;
    // Pelunasan H-45; hitung bulan dari sekarang.
    let bulan = 0;
    if (tglAktif) {
      const lunas = new Date(new Date(tglAktif).getTime() - 45 * 86_400_000);
      bulan = Math.max(0, (lunas.getFullYear() - SEKARANG.getFullYear()) * 12 + lunas.getMonth() - SEKARANG.getMonth());
    }
    const sisaBayar = paket - dp;
    return { hargaOrang, paket, biayaPaspor, biayaVaksin, uangSaku, total, dp, bulan, sisaBayar, perBulan: bulan > 0 ? sisaBayar / bulan : sisaBayar };
  })();

  const pesan = [
    `Assalamu'alaikum, Serambi. Saya sudah coba hitung biaya di situs.`,
    `Paket: *${p.nama}*, kamar ${KAMAR_LABEL[kamar].nama}`,
    `Jamaah: ${dewasa} dewasa${bayi ? `, ${bayi} bayi` : ""}`,
    tglAktif ? `Rencana berangkat: ${tanggal(tglAktif, p.hari).rentang}` : null,
    `Perkiraan biaya paket: ${rupiah(hitung.paket)}`,
    "Mohon info cara pembayaran dan cicilannya.",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_26rem]">
      <div className="space-y-6 rounded-2xl border border-tinta/15 bg-kertas-3 p-5 sm:p-7">
        <Field label="Paket">
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-xl border border-tinta/25 bg-kertas px-4 py-3.5 text-lg font-semibold">
            {daftar.map((x) => (
              <option key={x.slug} value={x.slug}>{x.nama}</option>
            ))}
          </select>
        </Field>

        <Field label="Kamar">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(p.harga) as Kamar[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKamar(k)}
                aria-pressed={kamar === k}
                className={`rounded-xl border px-2 py-3 text-center transition ${kamar === k ? "border-hijau bg-hijau-muda/60" : "border-tinta/15 hover:border-tinta/40"}`}
              >
                <span className="block font-semibold">{KAMAR_LABEL[k].nama}</span>
                <span className="block text-xs text-tinta-3">{KAMAR_LABEL[k].isi}</span>
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Jamaah dewasa & anak">
            <Stepper value={dewasa} set={setDewasa} min={1} max={20} />
          </Field>
          <Field label="Bayi di bawah 2 tahun" hint="Bayar 25% harga paket">
            <Stepper value={bayi} set={setBayi} min={0} max={5} />
          </Field>
          <Field label="Yang belum punya paspor" hint={`${rupiah(PASPOR)} per orang`}>
            <Stepper value={paspor} set={setPaspor} min={0} max={dewasa + bayi} />
          </Field>
          <Field label="Vaksin meningitis & polio" hint={`±${rupiah(VAKSIN)} per orang`}>
            <label className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-tinta/15 px-4">
              <input type="checkbox" checked={vaksin} onChange={(e) => setVaksin(e.target.checked)} className="size-5 accent-[var(--hijau)]" />
              Masukkan ke hitungan
            </label>
          </Field>
        </div>

        <Field label={`Uang saku: SAR ${saku.toLocaleString("id-ID")} per orang`} hint={`≈ ${rupiah(saku * sar)}. Untuk oleh-oleh, laundry, dan jajan. Kebanyakan jamaah membawa SAR 500–1.500.`}>
          <input type="range" min={0} max={3000} step={100} value={saku} onChange={(e) => setSaku(Number(e.target.value))} className="w-full accent-[var(--hijau)]" />
        </Field>

        {jadwal.length > 0 && (
          <Field label="Rencana berangkat" hint="Untuk menghitung tabungan bulanan sampai pelunasan (45 hari sebelum berangkat).">
            <select value={tglAktif} onChange={(e) => setTgl(e.target.value)} className="w-full rounded-xl border border-tinta/25 bg-kertas px-4 py-3.5 font-semibold">
              {jadwal.map((k) => (
                <option key={k.tanggal} value={k.tanggal}>{tanggal(k.tanggal, p.hari).rentang}</option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-hijau p-6 text-kertas">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-kertas/65">Perkiraan total</p>
          <p className="mt-1 font-mono text-4xl font-semibold" aria-live="polite">{rupiah(hitung.total)}</p>
          <dl className="mt-5 space-y-2 border-t border-kertas/20 pt-4 text-[0.95rem]">
            <Row k={`Paket (${dewasa}${bayi ? ` + ${bayi} bayi` : ""} × ${rupiah(hitung.hargaOrang)})`} v={rupiah(hitung.paket)} />
            {hitung.biayaPaspor > 0 && <Row k="Paspor" v={rupiah(hitung.biayaPaspor)} />}
            {hitung.biayaVaksin > 0 && <Row k="Vaksin" v={rupiah(hitung.biayaVaksin)} />}
            {hitung.uangSaku > 0 && <Row k="Uang saku" v={rupiah(hitung.uangSaku)} />}
          </dl>
          {p.mata === "USD" && <p className="mt-3 text-xs text-kertas/65">Paket haji dihitung dalam dolar. Kurs acuan {rupiah(kurs)} per US$1.</p>}
        </div>

        <div className="mt-4 rounded-2xl border border-tinta/15 bg-kertas-3 p-6">
          <h3 className="judul text-2xl">Kalau ditabung</h3>
          <ol className="mt-4 space-y-4">
            <li className="flex gap-4">
              <span className="judul text-3xl text-emas">1</span>
              <div>
                <p className="font-semibold">DP sekarang: {rupiah(hitung.dp)}</p>
                <p className="text-sm text-tinta-3">Untuk mengunci {dewasa} kursi.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="judul text-3xl text-emas">2</span>
              <div>
                <p className="font-semibold">
                  {hitung.bulan > 0 ? (
                    <>Tabung {rupiah(Math.ceil(hitung.perBulan / 1000) * 1000)} per bulan</>
                  ) : (
                    <>Lunasi {rupiah(hitung.sisaBayar)}</>
                  )}
                </p>
                <p className="text-sm text-tinta-3">
                  {hitung.bulan > 0 ? `Selama ${hitung.bulan} bulan, tanpa bunga, lewat tabungan umroh Serambi.` : "Tanggal ini sudah dekat, jadi pelunasan dilakukan sekaligus."}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="judul text-3xl text-emas">3</span>
              <div>
                <p className="font-semibold">Lunas 45 hari sebelum berangkat</p>
                <p className="text-sm text-tinta-3">Sisa {rupiah(hitung.sisaBayar)}. Kuitansi untuk setiap setoran.</p>
              </div>
            </li>
          </ol>
          <a href={waLink(pesan)} target="_blank" rel="noopener" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-hijau px-4 py-3.5 font-semibold text-kertas hover:bg-hijau-2">
            <WaIcon /> Kirim hitungan ini ke admin
          </a>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-semibold">{label}</p>
      {children}
      {hint && <p className="mt-1.5 text-sm text-tinta-3">{hint}</p>}
    </div>
  );
}

function Stepper({ value, set, min, max }: { value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => set(Math.max(min, value - 1))} className="grid size-12 place-items-center rounded-xl border border-tinta/25 text-2xl" aria-label="Kurangi">−</button>
      <output className="w-14 text-center font-mono text-2xl font-semibold">{value}</output>
      <button type="button" onClick={() => set(Math.min(max, value + 1))} className="grid size-12 place-items-center rounded-xl border border-tinta/25 text-2xl" aria-label="Tambah">+</button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-kertas/75">{k}</dt>
      <dd className="font-mono">{v}</dd>
    </div>
  );
}
