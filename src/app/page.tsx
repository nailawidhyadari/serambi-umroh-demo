import Link from "next/link";
import { paket, getPaket } from "@/data/paket";
import { site, pembimbing, testimoni } from "@/data/site";
import { faqUmum } from "@/data/faq";
import { Photo } from "@/components/Photo";
import { Bab } from "@/components/Bab";
import { PaketCard } from "@/components/PaketCard";
import { PapanJadwal } from "@/components/PapanJadwal";
import { RincianBiaya } from "@/components/RincianBiaya";
import { JarakHotel } from "@/components/JarakHotel";
import { Istilah } from "@/components/Istilah";
import { Faq } from "@/components/Faq";
import { Panah, WaIcon } from "@/components/icons";
import { semuaJadwal } from "@/lib/jadwal";
import { hargaTeks, hijriah, juta, jadwalBerikut, sisa, tanggal, waLink } from "@/lib/format";

const DAFTAR_ISI = [
  { no: "1", judul: "Pilih paket", isi: "7 paket, dari 9 hari sampai haji", href: "/paket" },
  { no: "2", judul: "Lihat jadwal", isi: "Tanggal & sisa kursi", href: "/jadwal" },
  { no: "3", judul: "Hitung biaya", isi: "Total, DP, dan tabungan per bulan", href: "/biaya" },
  { no: "4", judul: "Siapkan diri", isi: "Dokumen, koper, dan kesehatan", href: "/panduan#dokumen" },
  { no: "5", judul: "Pelajari tata cara", isi: "Ihram, tawaf, sa'i, tahallul", href: "/panduan#manasik" },
  { no: "6", judul: "Kenali kami", isi: "Izin resmi, pembimbing, kantor", href: "/tentang" },
];

const JANJI = [
  {
    judul: "Jarak hotel ditulis dalam meter.",
    isi: "Bukan \"dekat Masjidil Haram\". Kalau hotel pengganti ternyata lebih jauh dari angka di situs ini, selisih harganya kami kembalikan.",
  },
  {
    judul: "Harga sudah termasuk semuanya, kecuali yang kami tulis.",
    isi: "Setiap paket punya daftar \"tidak termasuk\" lengkap dengan perkiraan biayanya. Tidak ada tagihan tambahan di bandara.",
  },
  {
    judul: "Pembimbing ikut dari Bandung.",
    isi: "Bukan pemandu yang baru ditemui di Jeddah. Anda sudah bertemu beliau di manasik, jauh sebelum berangkat.",
  },
  {
    judul: "Uang masuk ke rekening perusahaan.",
    isi: "Tidak pernah ke rekening pribadi siapa pun, termasuk pemilik. Setiap setoran dapat kuitansi bernomor.",
  },
];

const TANYA_TRAVEL = [
  "Berapa nomor izin PPIU-nya? (lalu cek sendiri di situs resmi Kementerian Haji dan Umrah)",
  "Nama hotelnya apa, dan berapa meter ke pelataran masjid?",
  "Terbang langsung atau transit? Transit di mana, berapa jam?",
  "Tiket pesawatnya sudah dibeli, atau baru akan dibeli setelah kuota penuh?",
  "Satu pembimbing memegang berapa jamaah?",
  "Apa saja yang tidak termasuk harga?",
  "Kalau batal, uang kembali berapa, dan tertulis di mana?",
];

export default function Beranda() {
  const reguler = getPaket("umroh-reguler-12-hari")!;
  const next = jadwalBerikut(reguler)!;
  const jadwal = semuaJadwal();

  return (
    <>
      {/* SAMPUL */}
      <section className="serat border-b border-tinta/10">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:pb-20 lg:pt-12">
          <div className="garis-ganda flex flex-wrap justify-between gap-2 pt-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-tinta-3">
            <span>Buku panduan jamaah</span>
            <span>Edisi {hijriah()}</span>
            <span className="hidden sm:inline">Bandung, sejak {site.berdiri}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <h1 className="judul text-[2.9rem] sm:text-7xl lg:text-[5.4rem]">
                Berangkat umroh dengan <span className="coret">semua hal</span> sudah jelas.
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-tinta-2">
                Jarak hotel dalam meter, harga dirinci sampai pos terakhir, dan jadwal per hari. Ditulis supaya Anda dan orang tua
                bisa memutuskan dengan tenang, tanpa harus bertanya dua kali.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/paket" className="flex items-center justify-center gap-2 rounded-xl bg-tinta px-6 py-4 text-lg font-semibold text-kertas transition hover:bg-hijau">
                  Lihat paket & harga <Panah className="size-5" />
                </Link>
                <a
                  href={waLink("Assalamu'alaikum, Serambi. Saya ingin tanya-tanya soal umroh.")}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-hijau px-6 py-4 text-lg font-semibold text-hijau transition hover:bg-hijau hover:text-kertas"
                >
                  <WaIcon /> Tanya dulu lewat WhatsApp
                </a>
              </div>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-garis pt-6">
                <div>
                  <dt className="text-sm text-tinta-3">Jamaah berangkat</dt>
                  <dd className="judul mt-1 text-3xl sm:text-4xl">{site.jamaah.toLocaleString("id-ID")}</dd>
                </div>
                <div>
                  <dt className="text-sm text-tinta-3">Tahun melayani</dt>
                  <dd className="judul mt-1 text-3xl sm:text-4xl">{new Date().getFullYear() - site.berdiri}</dd>
                </div>
                <div>
                  <dt className="text-sm text-tinta-3">Izin resmi</dt>
                  <dd className="mt-2 text-sm font-semibold leading-tight">
                    <Istilah k="ppiu">PPIU</Istilah> & <Istilah k="pihk">PIHK</Istilah>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-2xl border-[6px] border-kertas-3 shadow-[0_30px_60px_-30px_rgba(23,36,30,0.55)] sm:aspect-[5/5] lg:aspect-[4/5]">
                  <Photo k="haram-kabah" alt="Ka'bah dan pelataran Masjidil Haram dilihat dari lantai atas" priority sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
                <figcaption className="judul-miring mt-3 text-center text-tinta-3">
                  Pelataran Masjidil Haram dari lantai dua, difoto jamaah Indonesia.
                </figcaption>
              </figure>

              {/* Kartu keberangkatan terdekat, ditempel seperti tiket */}
              <Link
                href={`/paket/${reguler.slug}`}
                className="group relative mx-auto mt-5 block w-[94%] max-w-sm rotate-[1deg] sm:-mt-28 sm:mr-0 rounded-xl border border-tinta/15 bg-kertas-3 p-5 shadow-xl transition hover:rotate-0 sm:-mt-28 lg:absolute lg:-left-14 lg:bottom-2 lg:mt-0 lg:w-80 lg:-rotate-2"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bata">Berangkat terdekat</p>
                <p className="judul mt-1 text-2xl">{reguler.nama}</p>
                <p className="text-tinta-2">{tanggal(next.tanggal, reguler.hari).rentang}</p>
                <div className="mt-3 space-y-2.5 border-t border-dashed border-garis pt-3">
                  {reguler.hotel.map((h) => (
                    <JarakHotel key={h.kota} h={h} ringkas />
                  ))}
                </div>
                <div className="mt-3 flex items-end justify-between border-t border-dashed border-garis pt-3">
                  <span className="font-mono text-lg font-semibold">{hargaTeks(reguler, reguler.harga.quad)}</span>
                  <span className="text-sm font-semibold text-bata">sisa {sisa(next)} kursi</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR ISI */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="judul text-3xl sm:text-4xl">Daftar isi</h2>
        <p className="mt-2 text-tinta-2">Enam langkah dari bingung sampai siap berangkat. Mulai dari mana saja.</p>
        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {DAFTAR_ISI.map((d) => (
            <li key={d.no}>
              <Link href={d.href} className="group flex items-baseline gap-4 border-b border-garis py-5">
                <span className="judul w-8 text-4xl text-emas">{d.no}</span>
                <span className="flex-1">
                  <span className="judul block text-2xl group-hover:text-hijau group-hover:underline">{d.judul}</span>
                  <span className="text-tinta-3">{d.isi}</span>
                </span>
                <Panah className="size-5 text-tinta-3 transition group-hover:translate-x-1 group-hover:text-hijau" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* EMPAT JANJI */}
      <section className="bg-hijau text-kertas">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kuning">Tertulis di akad setiap jamaah</p>
            <h2 className="judul mt-3 text-4xl sm:text-5xl">Empat janji yang bisa Anda tagih.</h2>
            <p className="mt-5 max-w-sm text-lg text-kertas/75">
              Kebanyakan keluhan jamaah umroh berawal dari hal yang tidak dijelaskan di awal. Jadi kami tulis dari awal.
            </p>
          </div>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {JANJI.map((j, i) => (
              <li key={j.judul} className="border-t border-kertas/25 pt-5">
                <span className="font-mono text-sm text-kuning">Pasal {i + 1}</span>
                <h3 className="judul mt-2 text-2xl">{j.judul}</h3>
                <p className="mt-2 text-kertas/75">{j.isi}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* JADWAL */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Bab
          no="2"
          kicker="Papan keberangkatan"
          judul="Tanggal terdekat, dan sisa kursinya."
          lead="Angka kursi diperbarui setiap ada pendaftar. Kalau penuh, Anda bisa masuk daftar tunggu."
          aksi={
            <Link href="/jadwal" className="flex items-center gap-2 font-semibold text-hijau underline underline-offset-4">
              Semua jadwal <Panah />
            </Link>
          }
        />
        <div className="mt-8">
          <PapanJadwal baris={jadwal} filter={false} batas={6} />
        </div>
      </section>

      {/* PAKET */}
      <section className="border-y border-tinta/10 bg-kertas-2/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Bab
            no="1"
            kicker="Paket"
            judul="Tujuh paket. Semua jaraknya ditulis."
            lead={
              <>
                Garis di tiap kartu menunjukkan seberapa jauh Anda berjalan dari lobi hotel ke pelataran masjid. Hijau berarti di bawah 200 meter.
              </>
            }
            aksi={
              <Link href="/paket#bandingkan" className="flex items-center gap-2 font-semibold text-hijau underline underline-offset-4">
                Bandingkan paket <Panah />
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paket.slice(0, 6).map((p) => (
              <PaketCard key={p.slug} p={p} />
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link href="/paket" className="font-semibold text-hijau underline underline-offset-4">Lihat ketujuh paket, termasuk Haji Furoda</Link>
          </p>
        </div>
      </section>

      {/* KE MANA UANGNYA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Bab
            no="3"
            kicker="Transparansi"
            judul={<>Ke mana Rp{juta(reguler.harga.quad).replace(" jt", " juta")} Anda pergi?</>}
            lead="Rincian paket Umroh Reguler 12 Hari, kamar ber-4. Setiap paket punya rinciannya sendiri di halaman detail."
          />
          <div className="lg:pt-24">
            <RincianBiaya p={reguler} />
            <Link href="/biaya" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-tinta px-5 py-3.5 font-semibold text-kertas hover:bg-hijau">
              Hitung biaya untuk keluarga Anda <Panah />
            </Link>
          </div>
        </div>
      </section>

      {/* FOTO PITA */}
      <section aria-label="Suasana perjalanan" className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-4 sm:px-6">
        {(
          [
            ["nabawi-payung", "Payung di pelataran Masjid Nabawi"],
            ["quba", "Masjid Quba, Madinah"],
            ["uhud", "Rombongan di Jabal Uhud"],
            ["bir-ali", "Masjid Bir Ali, tempat berihram dari Madinah"],
            ["jabal-rahmah", "Jabal Rahmah, Arafah"],
            ["kurma", "Kebun kurma di Madinah"],
          ] as const
        ).map(([k, alt]) => (
          <figure key={k} className="w-72 shrink-0 sm:w-80">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Photo k={k} alt={alt} sizes="320px" />
            </div>
            <figcaption className="mt-2 text-sm text-tinta-3">{alt}</figcaption>
          </figure>
        ))}
      </section>

      {/* PERTANYAAN WAJIB */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 rounded-3xl border-2 border-dashed border-bata/50 bg-bata-muda/35 p-6 sm:p-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bata">Sebelum transfer ke travel mana pun</p>
            <h2 className="judul mt-3 text-4xl">Tujuh pertanyaan yang wajib Anda ajukan. Termasuk ke kami.</h2>
            <p className="mt-4 text-tinta-2">
              Travel yang baik akan menjawab semuanya dengan angka dan dokumen. Kalau jawabannya berbelit, itu sudah jawaban.
            </p>
          </div>
          <ol className="space-y-3">
            {TANYA_TRAVEL.map((t, i) => (
              <li key={t} className="flex gap-4 rounded-xl bg-kertas-3 p-4">
                <span className="font-mono text-lg font-semibold text-bata">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PEMBIMBING */}
      <section className="border-y border-tinta/10 bg-kertas-2/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Bab no="6" kicker="Yang mendampingi Anda" judul="Wajah yang sama dari manasik sampai pulang." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pembimbing.map((o) => (
              <article key={o.nama} className="rounded-2xl border border-tinta/12 bg-kertas-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="judul grid size-14 place-items-center rounded-full bg-hijau text-xl text-kuning">{o.inisial}</span>
                  <div>
                    <h3 className="font-semibold leading-tight">{o.nama}</h3>
                    <p className="text-sm text-tinta-3">{o.peran}</p>
                  </div>
                </div>
                <p className="mt-4 font-mono text-sm font-semibold text-bata">{o.angka}</p>
                <p className="mt-2 text-tinta-2">{o.cerita}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SURAT JAMAAH */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Bab kicker="Surat dari jamaah" judul="Yang mereka ceritakan setelah pulang." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimoni.map((t, i) => (
            <figure
              key={t.nama}
              className={`rounded-sm border border-tinta/10 bg-kertas-3 p-6 shadow-[3px_4px_0_rgba(23,36,30,0.06)] sm:p-8 ${i % 2 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.6deg]"}`}
              style={{ backgroundImage: "repeating-linear-gradient(transparent 0 31px, rgba(29,75,58,0.09) 31px 32px)" }}
            >
              <blockquote className="judul-miring text-xl leading-[32px] text-tinta">&ldquo;{t.isi}&rdquo;</blockquote>
              <figcaption className="mt-5 border-t border-garis pt-3">
                <span className="font-semibold">{t.nama}</span>, {t.kota}
                <span className="block text-sm text-tinta-3">{t.paket} · {t.tahun}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ + KONTAK */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Bab kicker="Tanya jawab" judul="Yang paling sering ditanyakan." />
            <div className="mt-8">
              <Faq items={faqUmum.slice(0, 6)} />
            </div>
          </div>
          <aside className="self-start rounded-3xl bg-tinta p-7 text-kertas lg:sticky lg:top-24">
            <h2 className="judul text-3xl">Masih ragu? Wajar.</h2>
            <p className="mt-3 text-kertas/75">
              Ceritakan kondisi Anda: berapa orang, usia berapa, kapan ingin berangkat. Admin kami membalas dengan pilihan yang cocok, tanpa memaksa.
            </p>
            <a
              href={waLink("Assalamu'alaikum, Serambi. Saya ingin konsultasi. Kami berangkat ... orang, usia ..., rencana bulan ...")}
              target="_blank"
              rel="noopener"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-kuning px-5 py-4 text-lg font-semibold text-tinta"
            >
              <WaIcon /> Konsultasi gratis
            </a>
            <div className="mt-6 border-t border-kertas/15 pt-5 text-kertas/80">
              <p className="font-semibold text-kertas">Atau datang ke kantor</p>
              <p>{site.alamat}</p>
              <p className="text-sm text-kertas/60">{site.jamKantor}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
