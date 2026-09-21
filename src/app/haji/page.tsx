import Link from "next/link";
import type { Metadata } from "next";
import { getPaket } from "@/data/paket";
import { site } from "@/data/site";
import { Bab } from "@/components/Bab";
import { Photo } from "@/components/Photo";
import { Istilah } from "@/components/Istilah";
import { Panah, WaIcon } from "@/components/icons";
import { dolar, juta, waLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Haji Reguler, Haji Khusus, atau Haji Furoda? Perbedaan & Biaya",
  description:
    "Penjelasan sederhana tiga jalur haji dari Indonesia: reguler, khusus, dan furoda. Perbedaan antrean, biaya, fasilitas, dan risikonya, plus urutan hari-hari haji.",
  alternates: { canonical: "/haji" },
};

const HARI_HAJI = [
  { tgl: "8", nama: "Tarwiyah", tempat: "Mina", isi: "Berihram haji, berangkat ke Mina, bermalam di tenda." },
  { tgl: "9", nama: "Arafah", tempat: "Arafah → Muzdalifah", isi: "Wukuf dari siang sampai Maghrib. Malamnya mabit di Muzdalifah, mengumpulkan kerikil." },
  { tgl: "10", nama: "Idul Adha", tempat: "Mina → Makkah", isi: "Melontar Jumrah Aqabah, tahallul awal, tawaf ifadah dan sa'i." },
  { tgl: "11–12", nama: "Tasyrik", tempat: "Mina", isi: "Melontar tiga jumrah setiap hari. Nafar awal kembali ke Makkah pada tanggal 12." },
  { tgl: "13", nama: "Nafar tsani", tempat: "Mina", isi: "Untuk yang memilih tinggal sehari lagi, melontar lalu kembali ke Makkah." },
];

export default function HajiPage() {
  const khusus = getPaket("haji-khusus-1448")!;
  const furoda = getPaket("haji-furoda-1448")!;

  const JALUR = [
    {
      nama: "Haji reguler",
      siapa: "Diselenggarakan pemerintah",
      antre: "Belasan sampai puluhan tahun, tergantung provinsi",
      biaya: "Paling murah, sebagian ditanggung dana nilai manfaat",
      fasilitas: "Hotel dan tenda standar pemerintah, rombongan besar",
      catatan: "Kami tidak menjual haji reguler. Daftarnya langsung lewat bank dan kantor kementerian di kota Anda.",
      aksi: null,
    },
    {
      nama: "Haji khusus",
      siapa: `Travel berizin ${"PIHK"}, kuota resmi pemerintah`,
      antre: "Lebih pendek dari reguler, tetap antre beberapa tahun",
      biaya: `Mulai ${dolar(khusus.harga.quad)} (≈ Rp${juta(khusus.harga.quad * site.kurs)})`,
      fasilitas: "Hotel bintang 5, tenda Mina lebih dekat Jamarat, rombongan kecil",
      catatan: `Setoran awal untuk mendapat nomor porsi: ${dolar(khusus.dp)} (ketentuan saat ini).`,
      aksi: khusus.slug,
    },
    {
      nama: "Haji furoda",
      siapa: "Visa undangan (mujamalah) dari Kerajaan Saudi",
      antre: "Tanpa antrean",
      biaya: `Mulai ${dolar(furoda.harga.quad)} (≈ Rp${juta(furoda.harga.quad * site.kurs)})`,
      fasilitas: "Hotel bintang 5, paket terlengkap",
      catatan: "Visa sering baru pasti 2–4 minggu sebelum wukuf. Pastikan ada perjanjian tertulis kalau visa tidak terbit.",
      aksi: furoda.slug,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-tinta text-kertas">
        <div className="absolute inset-0 opacity-45">
          <Photo k="arafah" alt="" priority credit={false} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/70 to-tinta/20" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:pb-20 lg:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kuning">Musim haji 1448 H · perkiraan Mei 2027</p>
          <h1 className="judul mt-4 max-w-4xl text-5xl sm:text-7xl">Tiga jalan ke Arafah. Pilih yang paling jujur untuk kondisi Anda.</h1>
          <p className="mt-6 max-w-2xl text-xl text-kertas/80">
            Setiap jalur punya kelebihan dan risikonya. Kami jelaskan ketiganya, termasuk jalur yang tidak kami jual.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Bab kicker="Perbandingan jalur haji" judul="Reguler, khusus, atau furoda?" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {JALUR.map((j) => (
            <article key={j.nama} className="flex flex-col rounded-2xl border border-tinta/12 bg-kertas-3 p-6">
              <h2 className="judul text-3xl">
                {j.nama === "Haji furoda" ? <Istilah k="furoda">{j.nama}</Istilah> : j.nama}
              </h2>
              <p className="mt-1 text-sm text-tinta-3">{j.siapa}</p>
              <dl className="mt-5 space-y-3">
                {(
                  [
                    ["Antrean", j.antre],
                    ["Biaya", j.biaya],
                    ["Fasilitas", j.fasilitas],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="border-t border-dashed border-garis pt-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-tinta-3">{k}</dt>
                    <dd className="mt-0.5 text-lg">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 rounded-xl bg-kertas-2 p-3.5 text-sm text-tinta-2">{j.catatan}</p>
              {j.aksi && (
                <Link href={`/paket/${j.aksi}`} className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-tinta px-4 py-3.5 font-semibold text-kertas hover:bg-hijau">
                  Lihat paket {j.nama.toLowerCase()} <Panah />
                </Link>
              )}
            </article>
          ))}
        </div>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="judul text-4xl">Lima hari yang paling penting</h2>
            <p className="mt-3 text-tinta-2">
              Puncak haji disebut <Istilah k="armuzna" />, tanggal 8 sampai 13 Dzulhijjah. Inti ibadahnya adalah <Istilah k="wukuf" /> di Arafah.
              Kebanyakan jamaah Indonesia mengambil <Istilah k="tamattu">haji tamattu&apos;</Istilah>: umroh dulu, baru haji.
            </p>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl">
              <Photo k="jamarat" alt="Jembatan Jamarat di Mina, tempat melontar jumrah" sizes="(min-width: 1024px) 35vw, 100vw" />
            </div>
          </div>
          <ol className="relative border-l-2 border-hijau/30 pl-8">
            {HARI_HAJI.map((h) => (
              <li key={h.tgl} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.85rem] top-0 grid size-11 place-items-center rounded-full bg-hijau font-mono text-sm font-semibold text-kertas">{h.tgl}</span>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bata">{h.tgl} Dzulhijjah · {h.tempat}</p>
                <h3 className="judul text-3xl">{h.nama}</h3>
                <p className="mt-1 text-lg text-tinta-2">{h.isi}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 rounded-3xl bg-hijau p-7 text-kertas sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="judul text-3xl sm:text-4xl">Sudah punya nomor porsi haji khusus?</h2>
              <p className="mt-3 text-lg text-kertas/80">
                Kirim <Istilah k="porsi">nomor porsi</Istilah> Anda. Kami bantu cek perkiraan tahun berangkat dan pilihan pindah travel, tanpa biaya.
              </p>
            </div>
            <a
              href={waLink("Assalamu'alaikum, Serambi. Saya ingin cek nomor porsi haji khusus saya: ...")}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 rounded-xl bg-kuning px-6 py-4 text-lg font-semibold text-tinta"
            >
              <WaIcon /> Cek nomor porsi
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
