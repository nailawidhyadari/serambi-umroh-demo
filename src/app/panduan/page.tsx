import type { Metadata } from "next";
import { Bab } from "@/components/Bab";
import { Checklist } from "@/components/Checklist";
import { DiagramSai, DiagramTawaf } from "@/components/Diagram";
import { Istilah } from "@/components/Istilah";
import { Photo } from "@/components/Photo";
import { checklist, dokumen, langkahUmroh, laranganIhram, talbiyah, tipsSehat } from "@/data/panduan";

export const metadata: Metadata = {
  title: "Panduan Umroh: Syarat Dokumen, Perlengkapan & Tata Cara",
  description:
    "Panduan umroh lengkap dalam bahasa sederhana: syarat dokumen, daftar perlengkapan yang bisa dicentang dan dicetak, tata cara ihram, tawaf, sa'i, tahallul, larangan ihram, dan bacaan talbiyah.",
  alternates: { canonical: "/panduan" },
};

const BAGIAN = [
  ["#dokumen", "Dokumen"],
  ["#koper", "Isi koper"],
  ["#manasik", "Tata cara umroh"],
  ["#larangan", "Larangan ihram"],
  ["#talbiyah", "Talbiyah"],
  ["#sehat", "Tetap sehat"],
];

export default function PanduanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Bab
        no="4 & 5"
        kicker="Panduan jamaah"
        judul="Semua yang perlu disiapkan, dijelaskan pelan-pelan."
        lead="Halaman ini bisa dibaca sebelum mendaftar. Tidak perlu hafal semuanya sekarang, karena akan diulang saat manasik."
      />

      <nav aria-label="Isi halaman" className="no-print no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {BAGIAN.map(([h, l]) => (
          <a key={h} href={h} className="shrink-0 rounded-full border border-tinta/20 bg-kertas-3 px-4 py-2 font-semibold text-tinta-2 hover:border-tinta">
            {l}
          </a>
        ))}
      </nav>

      {/* DOKUMEN */}
      <section id="dokumen" className="mt-14 scroll-mt-24">
        <h2 className="judul text-4xl">Dokumen yang disiapkan</h2>
        <p className="mt-2 text-tinta-2">Serahkan ke kantor paling lambat 60 hari sebelum berangkat, supaya visa bisa diurus.</p>
        <dl className="mt-6 grid gap-x-10 md:grid-cols-2">
          {dokumen.map((d, i) => (
            <div key={d.nama} className="flex gap-4 border-b border-garis py-4">
              <span className="font-mono text-sm text-tinta-3">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <dt className="text-lg font-semibold">{d.nama}</dt>
                <dd className="text-tinta-2">{d.detail}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* KOPER */}
      <section id="koper" className="mt-16 scroll-mt-24">
        <h2 className="judul text-4xl">Isi koper</h2>
        <p className="mb-6 mt-2 text-tinta-2">Centang yang sudah masuk. Centangan tersimpan di HP atau laptop ini, jadi bisa dilanjutkan besok.</p>
        <Checklist grup={checklist} />
      </section>

      {/* MANASIK */}
      <section id="manasik" className="mt-20 scroll-mt-24">
        <h2 className="judul text-4xl">Tata cara umroh, empat langkah</h2>
        <p className="mt-2 max-w-2xl text-tinta-2">
          Rukun umroh ada empat perbuatan, dilakukan berurutan. Kalau satu terlewat, umrohnya belum selesai. Totalnya sekitar 3–4 jam.
        </p>
        <ol className="mt-8 space-y-6">
          {langkahUmroh.map((l) => (
            <li key={l.no} className="grid gap-6 rounded-2xl border border-tinta/12 bg-kertas-3 p-6 md:grid-cols-[6rem_1fr_1fr] md:p-8">
              <span className="judul text-7xl leading-none text-hijau">{l.no}</span>
              <div>
                <h3 className="judul text-3xl">
                  <Istilah k={l.k}>{l.nama}</Istilah>
                </h3>
                <p className="mt-1 text-sm font-semibold text-bata">{l.di} · {l.lama}</p>
                <p className="mt-3 text-lg text-tinta-2">{l.isi}</p>
                {"lafal" in l && l.lafal && (
                  <div className="mt-4 rounded-xl bg-kertas-2 p-4">
                    <p className="arab text-right text-3xl">{l.lafal}</p>
                    <p className="mt-1 italic">{l.latin}</p>
                    <p className="text-sm text-tinta-3">{l.artinya}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                {l.nama === "Tawaf" && <DiagramTawaf />}
                {l.nama === "Sa'i" && <DiagramSai />}
                {l.nama === "Ihram" && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Photo k="bir-ali" alt="Masjid Bir Ali, miqat jamaah dari Madinah" sizes="(min-width: 768px) 30vw, 100vw" />
                  </div>
                )}
                {l.nama === "Tahallul" && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Photo k="haram-jamaah" alt="Jamaah berpakaian ihram di pelataran Masjidil Haram" sizes="(min-width: 768px) 30vw, 100vw" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        {/* LARANGAN */}
        <section id="larangan" className="scroll-mt-24 rounded-2xl bg-bata-muda/50 p-6 sm:p-8">
          <h2 className="judul text-3xl">Larangan selama ihram</h2>
          <p className="mt-2 text-tinta-2">Berlaku sejak niat di miqat sampai tahallul.</p>
          <ul className="mt-5 space-y-3">
            {laranganIhram.map((x) => (
              <li key={x} className="flex gap-3 text-lg">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-bata" /> {x}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-tinta-3">Kalau terlanjur melanggar karena lupa, jangan panik. Sampaikan ke pembimbing, beliau akan menjelaskan dam atau fidyahnya.</p>
        </section>

        {/* TALBIYAH */}
        <section id="talbiyah" className="scroll-mt-24 rounded-2xl bg-hijau p-6 text-kertas sm:p-8">
          <h2 className="judul text-3xl">Talbiyah</h2>
          <p className="mt-2 text-kertas/70">Dibaca berulang sejak berihram sampai mulai tawaf.</p>
          <p className="arab mt-6 text-right text-[1.9rem] text-kuning">{talbiyah.arab}</p>
          <p className="mt-4 text-lg italic">{talbiyah.latin}</p>
          <p className="mt-3 text-kertas/75">{talbiyah.arti}</p>
        </section>
      </div>

      {/* SEHAT */}
      <section id="sehat" className="mt-16 scroll-mt-24">
        <h2 className="judul text-4xl">Tetap sehat di Tanah Suci</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tipsSehat.map((t) => (
            <div key={t.judul} className="border-t-2 border-tinta pt-4">
              <h3 className="judul text-2xl">{t.judul}</h3>
              <p className="mt-2 text-tinta-2">{t.isi}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
