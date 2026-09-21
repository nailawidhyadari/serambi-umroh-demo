import { site } from "@/data/site";
import type { Keberangkatan, Paket } from "@/data/types";

export const rupiah = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
export const dolar = (n: number) => "US$" + n.toLocaleString("en-US");

/** 33.900.000 → "33,9 jt" */
export const juta = (n: number) =>
  (Math.floor(n / 100_000) / 10).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt";

export const hargaTeks = (p: Paket, n: number) => (p.mata === "USD" ? dolar(n) : rupiah(n));
export const keRupiah = (p: Paket, n: number) => (p.mata === "USD" ? n * site.kurs : n);
export const hargaMulai = (p: Paket) => Math.min(...Object.values(p.harga));

export const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const BULAN_PANJANG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function tanggal(iso: string, lamaHari: number) {
  const a = parse(iso);
  const b = new Date(a.getTime() + (lamaHari - 1) * 86_400_000);
  const sama = a.getUTCMonth() === b.getUTCMonth();
  return {
    hari: HARI[a.getUTCDay()],
    tgl: a.getUTCDate(),
    bulan: BULAN[a.getUTCMonth()],
    bulanPanjang: BULAN_PANJANG[a.getUTCMonth()],
    tahun: a.getUTCFullYear(),
    bulanIndex: a.getUTCMonth(),
    kunci: iso.slice(0, 7),
    lengkap: `${HARI[a.getUTCDay()]}, ${a.getUTCDate()} ${BULAN_PANJANG[a.getUTCMonth()]} ${a.getUTCFullYear()}`,
    rentang: sama
      ? `${a.getUTCDate()}–${b.getUTCDate()} ${BULAN[b.getUTCMonth()]} ${b.getUTCFullYear()}`
      : `${a.getUTCDate()} ${BULAN[a.getUTCMonth()]} – ${b.getUTCDate()} ${BULAN[b.getUTCMonth()]} ${b.getUTCFullYear()}`,
  };
}

/** Tanggal Hijriah (kalender Umm al-Qura), mis. "Rabiul Awal 1448 H". */
export function hijriah(d = new Date()) {
  const f = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", { month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  return f.format(d).replace(/\s*H$/, "") + " H";
}

export const sisa = (k: Keberangkatan) => k.kuota - k.terisi;

export function statusKursi(k: Keberangkatan) {
  const s = sisa(k);
  if (s <= 0) return { label: "Penuh", tone: "penuh" as const };
  if (s <= 5) return { label: `Sisa ${s} kursi`, tone: "tipis" as const };
  return { label: `${s} kursi kosong`, tone: "aman" as const };
}

/** Tanggal saat halaman di-build (halaman statis, dibangun ulang tiap deploy). */
export const HARI_INI = new Date().toISOString().slice(0, 10);

export const jadwalAktif = (p: Paket) => p.keberangkatan.filter((k) => k.tanggal >= HARI_INI);
export const jadwalBerikut = (p: Paket) => jadwalAktif(p).find((k) => sisa(k) > 0);

/** Menit jalan kaki: normal ±75 m/menit, lansia ±40 m/menit. */
export const menitJalan = (meter: number, lansia = false) => Math.max(1, Math.round(meter / (lansia ? 40 : 75)));

export function waLink(pesan: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;
}

export function pesanDaftar(p: Paket, opsi: { tanggal?: string; kamar?: string; orang?: number } = {}) {
  return [
    `Assalamu'alaikum, Serambi. Saya ingin tanya paket *${p.nama}*.`,
    opsi.tanggal ? `Keberangkatan: ${tanggal(opsi.tanggal, p.hari).rentang}` : null,
    opsi.kamar ? `Kamar: ${opsi.kamar}` : null,
    opsi.orang ? `Jumlah jamaah: ${opsi.orang} orang` : null,
    "Apakah kursinya masih ada?",
  ]
    .filter(Boolean)
    .join("\n");
}
