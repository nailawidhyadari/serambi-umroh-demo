import type credits from "./photo-credits.json";

export type PhotoKey = keyof typeof credits;
export type Kategori = "umroh" | "umroh-plus" | "haji";
export type Kamar = "quad" | "triple" | "double";
export type Ritme = "santai" | "sedang" | "padat";

export type Hotel = {
  kota: "Makkah" | "Madinah" | "Istanbul";
  bintang: 3 | 4 | 5;
  area: string;
  /** Jarak jalan kaki dari lobi ke pelataran masjid, dalam meter. */
  jarak: number;
  malam: number;
  jalan: string;
};

export type Hari = {
  /** "1" atau rentang seperti "7–13". */
  ke: string;
  kota: string;
  judul: string;
  isi: string[];
  catatan?: string;
  makan?: string;
};

export type Keberangkatan = {
  tanggal: string;
  kuota: number;
  terisi: number;
};

export type Paket = {
  slug: string;
  nama: string;
  pendek: string;
  kategori: Kategori;
  hari: number;
  label?: string;
  ringkas: string;
  cocok: string[];
  cover: PhotoKey;
  galeri: PhotoKey[];
  ritme: Ritme;
  mata: "IDR" | "USD";
  harga: Record<Kamar, number>;
  dp: number;
  maskapai: { nama: string; pergi: string; pulang: string; langsung: boolean; bagasi: string };
  hotel: Hotel[];
  pindahKota: string;
  rombongan: number;
  perPembimbing: number;
  rincian: { pos: string; persen: number }[];
  termasuk: string[];
  tidakTermasuk: string[];
  penting?: string[];
  itinerary: Hari[];
  keberangkatan: Keberangkatan[];
};
