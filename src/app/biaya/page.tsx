import type { Metadata } from "next";
import { paket } from "@/data/paket";
import { site } from "@/data/site";
import { Bab } from "@/components/Bab";
import { Kalkulator } from "@/components/Kalkulator";
import { rupiah } from "@/lib/format";

export const metadata: Metadata = {
  title: "Hitung Biaya Umroh & Rencana Tabungan",
  description: "Hitung total biaya umroh untuk keluarga: paket, paspor, vaksin, dan uang saku. Lihat DP dan tabungan per bulan sampai pelunasan, tanpa bunga.",
  alternates: { canonical: "/biaya" },
};

const LAIN = [
  { pos: "Paspor biasa / elektronik", kisaran: "Rp350.000 / Rp650.000", ket: "Bayar langsung di kantor imigrasi" },
  { pos: "Vaksin meningitis & polio", kisaran: "±Rp350.000–450.000", ket: "Di KKP atau rumah sakit yang ditunjuk" },
  { pos: "Uang saku", kisaran: `SAR 500–1.500 (±${rupiah(500 * (site.kurs / 3.75))}–${rupiah(1500 * (site.kurs / 3.75))})`, ket: "Oleh-oleh, laundry, jajan" },
  { pos: "Kelebihan bagasi", kisaran: "Tergantung maskapai", ket: "Kurma dan air zamzam cepat menambah berat" },
  { pos: "Kursi roda dorong di Masjidil Haram", kisaran: "±SAR 150–250 per putaran", ket: "Untuk tawaf atau sa'i, bayar di tempat" },
];

export default function BiayaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Bab
        no="3"
        kicker="Kalkulator"
        judul="Hitung biaya keluarga Anda"
        lead="Geser dan pilih. Angkanya langsung berubah. Hasilnya bisa dikirim ke admin lewat WhatsApp untuk dicek ulang."
      />
      <div className="mt-10">
        <Kalkulator daftar={paket} kurs={site.kurs} />
      </div>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="judul text-4xl">Biaya di luar paket</h2>
          <p className="mt-3 text-tinta-2">Supaya tidak ada yang mengejutkan. Kisaran ini dari pengalaman jamaah kami tahun lalu.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-tinta/15 bg-kertas-3">
          {LAIN.map((l) => (
            <div key={l.pos} className="grid gap-1 border-b border-garis p-4 last:border-0 sm:grid-cols-[1fr_auto] sm:gap-6">
              <div>
                <p className="font-semibold">{l.pos}</p>
                <p className="text-sm text-tinta-3">{l.ket}</p>
              </div>
              <p className="font-mono font-semibold sm:text-right">{l.kisaran}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-hijau p-7 text-kertas sm:p-10">
        <h2 className="judul text-3xl sm:text-4xl">Tabungan umroh tanpa bunga</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <p className="text-kertas/80">Setor berapa saja, kapan saja, minimal Rp500.000. Saldo bisa dicek lewat WhatsApp kapan pun.</p>
          <p className="text-kertas/80">Kursi dikunci sejak DP. Harga yang berlaku adalah harga di hari Anda membayar DP, walaupun harga naik setelahnya.</p>
          <p className="text-kertas/80">Kalau batal menabung, saldo dikembalikan penuh dalam 14 hari kerja, tanpa potongan.</p>
        </div>
      </section>
    </div>
  );
}
