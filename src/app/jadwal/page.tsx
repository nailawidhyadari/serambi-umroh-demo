import type { Metadata } from "next";
import { Bab } from "@/components/Bab";
import { PapanJadwal } from "@/components/PapanJadwal";
import { semuaJadwal } from "@/lib/jadwal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Jadwal Keberangkatan Umroh & Haji 2026–2027",
  description: "Semua tanggal keberangkatan umroh dan haji Serambi dari Bandung, lengkap dengan sisa kursi, maskapai, dan harga mulai.",
  alternates: { canonical: "/jadwal" },
};

const LANGKAH = [
  { judul: "Pilih tanggal", isi: "Tekan \"Pesan kursi\". Pesan WhatsApp sudah terisi nama paket dan tanggalnya." },
  { judul: "Bayar DP", isi: "Mulai Rp5 juta per orang ke rekening perusahaan. Kursi Anda terkunci saat itu juga." },
  { judul: "Kirim berkas", isi: "Paspor, KTP, KK, dan pas foto. Bisa diantar ke kantor atau kami yang ambil ke rumah." },
  { judul: "Manasik & lunas", isi: "Ikut manasik di Bandung, lalu pelunasan paling lambat 45 hari sebelum berangkat." },
];

export default function JadwalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Bab
        no="2"
        kicker={`Diperbarui ${site.diperbarui}`}
        judul="Jadwal keberangkatan"
        lead="Semua keberangkatan dari Bandung via Bandara Soekarno-Hatta. Garis di bawah setiap baris menunjukkan seberapa penuh rombongannya."
      />
      <div className="mt-10">
        <PapanJadwal baris={semuaJadwal()} />
      </div>

      <section className="mt-20">
        <h2 className="judul text-4xl">Setelah memilih tanggal</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANGKAH.map((l, i) => (
            <li key={l.judul} className="border-t-2 border-tinta pt-4">
              <span className="judul text-5xl text-emas">{i + 1}</span>
              <h3 className="judul mt-2 text-2xl">{l.judul}</h3>
              <p className="mt-2 text-tinta-2">{l.isi}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
