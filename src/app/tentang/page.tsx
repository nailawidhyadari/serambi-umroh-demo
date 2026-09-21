import type { Metadata } from "next";
import credits from "@/data/photo-credits.json";
import { site, pembimbing } from "@/data/site";
import { Bab } from "@/components/Bab";
import { Photo } from "@/components/Photo";
import { Istilah } from "@/components/Istilah";

export const metadata: Metadata = {
  title: "Tentang Serambi: Izin Resmi, Pembimbing & Kantor",
  description: "Serambi Umroh & Haji, travel berizin PPIU dan PIHK di Bandung sejak 2014. Cek izin, kenali pembimbing, dan kunjungi kantor kami.",
  alternates: { canonical: "/tentang" },
};

const PERJALANAN = [
  { th: "2014", isi: "Mulai dari satu ruang di Buah Batu. Keberangkatan pertama: 23 jamaah, sebagian besar tetangga sendiri." },
  { th: "2019", isi: "Mendapat izin PPIU. Mulai menulis jarak hotel dalam meter setelah jamaah mengeluh hotel \"dekat\" ternyata 1,2 km." },
  { th: "2021", isi: "Mendapat izin PIHK untuk haji khusus." },
  { th: "2024", isi: "Membuka paket Ramah Lansia setelah sepertiga jamaah kami berusia di atas 60 tahun." },
  { th: "2026", isi: `${site.jamaah.toLocaleString("id-ID")} jamaah sudah berangkat bersama kami.` },
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Bab no="6" kicker="Tentang kami" judul="Travel kecil dari Bandung yang memilih menulis semuanya." />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-lg text-tinta-2">
          <p>
            Serambi berawal dari pengalaman pendirinya memberangkatkan orang tua sendiri, dan pulang dengan banyak cerita tentang janji
            travel yang tidak ditepati. Hotel yang katanya dekat, pembimbing yang baru dikenal di bandara, dan biaya tambahan yang muncul di Jeddah.
          </p>
          <p>
            Jadi kami menulis semuanya: jarak dalam meter, rincian harga, dan apa yang tidak termasuk. Situs ini dibuat seperti buku panduan
            supaya bisa dibaca bersama keluarga, pelan-pelan, sebelum memutuskan.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Photo k="bus" alt="Jamaah di dalam bus rombongan, melewati tenda Mina" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>

      {/* LEGALITAS */}
      <section id="legalitas" className="mt-16 scroll-mt-24 rounded-3xl border-2 border-tinta bg-kertas-3 p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="judul text-4xl">Izin resmi</h2>
            <p className="mt-3 text-tinta-2">
              Travel umroh wajib punya izin <Istilah k="ppiu" />, travel haji khusus wajib punya izin <Istilah k="pihk" />. Jangan hanya percaya
              logo di brosur. Cek sendiri nomornya di situs resmi Kementerian Haji dan Umrah RI.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {[site.izinPpiu, site.izinPihk, site.akreditasi].map((x) => (
              <div key={x} className="stempel rounded px-4 py-3 font-mono text-sm font-semibold uppercase text-hijau">{x}</div>
            ))}
            <p className="w-full text-sm text-tinta-3">{site.bank}. Kami tidak pernah meminta transfer ke rekening pribadi.</p>
          </div>
        </div>
      </section>

      {/* PERJALANAN */}
      <section className="mt-16">
        <h2 className="judul text-4xl">Perjalanan kami</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PERJALANAN.map((p) => (
            <li key={p.th} className="border-t-2 border-tinta pt-3">
              <span className="judul text-4xl text-emas">{p.th}</span>
              <p className="mt-2 text-tinta-2">{p.isi}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TIM */}
      <section className="mt-16">
        <h2 className="judul text-4xl">Yang mendampingi</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {pembimbing.map((o) => (
            <article key={o.nama} className="flex gap-4 rounded-2xl border border-tinta/12 bg-kertas-3 p-5">
              <span className="judul grid size-16 shrink-0 place-items-center rounded-full bg-hijau text-2xl text-kuning">{o.inisial}</span>
              <div>
                <h3 className="text-lg font-semibold">{o.nama}</h3>
                <p className="text-sm text-tinta-3">{o.peran} · <span className="font-mono text-bata">{o.angka}</span></p>
                <p className="mt-2 text-tinta-2">{o.cerita}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* KANTOR */}
      <section className="mt-16 grid gap-8 rounded-3xl bg-hijau p-7 text-kertas sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="judul text-4xl">Datang ke kantor</h2>
          <p className="mt-4 text-xl">{site.alamat}</p>
          <p className="mt-1 text-kertas/70">{site.jamKantor}</p>
          <p className="mt-5 text-kertas/80">
            Ada ruang tunggu dengan kursi yang nyaman untuk orang tua, dan maket Ka&apos;bah untuk latihan manasik. Parkir mobil muat 6.
          </p>
        </div>
        <dl className="grid content-start gap-4 sm:grid-cols-2">
          {[
            ["Telepon", site.telepon],
            ["WhatsApp", site.jamWa],
            ["Email", site.email],
            ["Instagram", `@${site.instagram}`],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-kertas/20 pt-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-kertas/60">{k}</dt>
              <dd className="mt-1 text-lg">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* KREDIT FOTO */}
      <section id="kredit-foto" className="mt-16 scroll-mt-24">
        <h2 className="judul text-3xl">Kredit foto</h2>
        <p className="mt-2 text-tinta-2">
          Foto di situs ini berasal dari Wikimedia Commons dengan lisensi bebas. Sebagian besar diambil oleh jamaah Indonesia saat umroh Ramadhan 2023.
        </p>
        <ul className="mt-5 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(credits).map(([k, c]) => (
            <li key={k} className="truncate">
              <a href={c.source} target="_blank" rel="noopener" className="hover:text-hijau hover:underline">
                <span className="font-mono">{k}</span> · {c.author} · {c.license}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
