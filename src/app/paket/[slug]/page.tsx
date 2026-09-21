import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { paket, getPaket, KATEGORI_LABEL, RITME_LABEL, KAMAR_LABEL } from "@/data/paket";
import { site } from "@/data/site";
import { faqUmum } from "@/data/faq";
import { Photo } from "@/components/Photo";
import { JarakHotel } from "@/components/JarakHotel";
import { RincianBiaya } from "@/components/RincianBiaya";
import { Itinerary } from "@/components/Itinerary";
import { Daftar } from "@/components/Daftar";
import { Faq } from "@/components/Faq";
import { PaketCard } from "@/components/PaketCard";
import { Istilah } from "@/components/Istilah";
import { Centang, Kasur, Orang, Pesawat, Silang } from "@/components/icons";
import { hargaMulai, hargaTeks, jadwalAktif, juta, keRupiah } from "@/lib/format";
import type { Kamar } from "@/data/types";

export function generateStaticParams() {
  return paket.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/paket/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPaket(slug);
  if (!p) return {};
  return {
    title: `${p.nama}: Harga ${hargaTeks(p, hargaMulai(p))}, Hotel & Jadwal`,
    description: `${p.ringkas} Mulai ${hargaTeks(p, hargaMulai(p))} per orang.`,
    alternates: { canonical: `/paket/${p.slug}` },
    openGraph: { images: [{ url: `/photos/${p.cover}.jpg` }] },
  };
}

export default async function DetailPaket({ params }: PageProps<"/paket/[slug]">) {
  const { slug } = await params;
  const p = getPaket(slug);
  if (!p) notFound();

  const jadwal = jadwalAktif(p);
  const lain = paket.filter((x) => x.slug !== p.slug && x.kategori === p.kategori).concat(paket.filter((x) => x.kategori !== p.kategori)).slice(0, 3);
  const totalMalam = p.hotel.reduce((a, h) => a + h.malam, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.nama,
    description: p.ringkas,
    provider: { "@type": "TravelAgency", name: site.lengkap, address: site.alamat },
    offers: (Object.keys(p.harga) as Kamar[]).map((k) => ({
      "@type": "Offer",
      name: `Kamar ${KAMAR_LABEL[k].nama}`,
      price: p.harga[k],
      priceCurrency: p.mata,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* KEPALA */}
      <section className="serat border-b border-tinta/10">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
          <nav aria-label="Remah roti" className="text-sm text-tinta-3">
            <Link href="/paket" className="hover:text-tinta hover:underline">Paket</Link> <span aria-hidden>/</span> {KATEGORI_LABEL[p.kategori]}
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              {p.label && <span className="inline-block rounded-full bg-bata px-3 py-1 text-sm font-semibold text-kertas">{p.label}</span>}
              <h1 className="judul mt-4 text-5xl sm:text-6xl lg:text-7xl">{p.nama}</h1>
              <p className="mt-5 max-w-xl text-xl text-tinta-2">{p.ringkas}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.cocok.map((c) => (
                  <span key={c} className="rounded-full border border-tinta/20 bg-kertas-3 px-3 py-1 text-sm">Cocok untuk: {c}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p>
                  <span className="block text-sm text-tinta-3">Mulai</span>
                  <span className="font-mono text-2xl font-semibold">{hargaTeks(p, hargaMulai(p))}</span>
                </p>
                <a href="#pesan" className="rounded-xl bg-tinta px-5 py-3.5 font-semibold text-kertas hover:bg-hijau xl:hidden">
                  Pilih tanggal & pesan
                </a>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
              <Photo k={p.cover} alt={p.nama} priority sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 xl:grid-cols-[1fr_24rem] xl:gap-14">
        <div className="min-w-0">
          {/* KARTU FAKTA */}
          <section aria-labelledby="fakta" className="rounded-2xl border-2 border-tinta bg-kertas-3">
            <div className="flex items-baseline justify-between gap-4 border-b-8 border-tinta px-5 py-3">
              <h2 id="fakta" className="judul text-3xl">Kartu fakta</h2>
              <span className="text-sm text-tinta-3">per orang</span>
            </div>
            <dl className="divide-y divide-garis px-5">
              <Fakta label="Lama perjalanan" nilai={`${p.hari} hari · ${totalMalam} malam di hotel`} />
              <Fakta
                label="Harga"
                nilai={
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    {(Object.keys(p.harga) as Kamar[]).map((k) => (
                      <span key={k}>
                        <span className="text-tinta-3">{KAMAR_LABEL[k].nama}</span>{" "}
                        <span className="font-mono font-semibold">{hargaTeks(p, p.harga[k])}</span>
                      </span>
                    ))}
                  </span>
                }
              />
              {p.mata === "USD" && (
                <Fakta label="Dalam rupiah" nilai={`≈ Rp${juta(keRupiah(p, p.harga.quad))} (kurs ${site.kurs.toLocaleString("id-ID")}, ${site.kursTanggal})`} />
              )}
              <Fakta label="DP kunci kursi" nilai={hargaTeks(p, p.dp)} />
              <Fakta
                label="Pesawat"
                ikon={<Pesawat className="size-5" />}
                nilai={
                  <>
                    {p.maskapai.nama}, {p.maskapai.langsung ? "terbang langsung" : "1× transit"}
                    <span className="block text-sm text-tinta-3">Pergi: {p.maskapai.pergi} · Pulang: {p.maskapai.pulang}</span>
                    <span className="block text-sm text-tinta-3">Bagasi: {p.maskapai.bagasi}</span>
                  </>
                }
              />
              <Fakta label="Antarkota" nilai={p.pindahKota} />
              <Fakta label="Rombongan" ikon={<Orang className="size-5" />} nilai={`Maksimal ${p.rombongan} jamaah · 1 pembimbing untuk ${p.perPembimbing} jamaah`} />
              <Fakta label="Ritme" nilai={RITME_LABEL[p.ritme]} />
            </dl>
          </section>

          {/* HOTEL */}
          <section className="mt-14" aria-labelledby="hotel">
            <h2 id="hotel" className="judul text-4xl">Hotel dan jaraknya</h2>
            <p className="mt-2 text-tinta-2">
              Diukur dari pintu lobi sampai pelataran masjid, jalan kaki. Nama hotel pasti dikirim paling lambat 30 hari sebelum berangkat.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {p.hotel.map((h) => (
                <div key={h.kota} className="rounded-2xl border border-tinta/12 bg-kertas-3 p-5">
                  <JarakHotel h={h} />
                  <p className="mt-3 flex items-center gap-2 border-t border-dashed border-garis pt-3 text-sm text-tinta-2">
                    <Kasur className="size-4" /> {h.malam} malam
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-hijau-muda/60 p-4 text-hijau">
              <strong>Janji jarak:</strong> kalau hotel pengganti lebih jauh dari angka di atas, selisih harganya kami kembalikan ke rekening Anda.
            </p>
          </section>

          {/* ITINERARY */}
          <section className="mt-16" aria-labelledby="harian">
            <h2 id="harian" className="judul text-4xl">Jadwal per hari</h2>
            <p className="mt-2 text-tinta-2">
              Ketuk kata bergaris titik untuk melihat artinya, misalnya <Istilah k="miqat" /> atau <Istilah k="raudhah" />.
            </p>
            <div className="mt-6">
              <Itinerary hari={p.itinerary} />
            </div>
          </section>

          {/* GALERI */}
          <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Foto">
            {p.galeri.map((g) => (
              <div key={g} className="relative aspect-square overflow-hidden rounded-xl">
                <Photo k={g} alt="" sizes="(min-width: 768px) 20vw, 50vw" />
              </div>
            ))}
          </section>

          {/* RINCIAN */}
          <section className="mt-16" aria-labelledby="rincian">
            <h2 id="rincian" className="judul text-4xl">Ke mana uang Anda pergi</h2>
            <p className="mt-2 text-tinta-2">Kami tidak menyembunyikan porsi keuntungan kantor. Ada di baris terakhir.</p>
            <div className="mt-6">
              <RincianBiaya p={p} />
            </div>
          </section>

          {/* TERMASUK */}
          <section className="mt-16 grid gap-6 md:grid-cols-2" aria-label="Termasuk dan tidak termasuk">
            <div className="rounded-2xl bg-hijau-muda/55 p-6">
              <h2 className="judul text-3xl text-hijau">Sudah termasuk</h2>
              <ul className="mt-4 space-y-2.5">
                {p.termasuk.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Centang className="mt-1 size-5 shrink-0 text-hijau" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-bata-muda/55 p-6">
              <h2 className="judul text-3xl text-bata">Tidak termasuk</h2>
              <ul className="mt-4 space-y-2.5">
                {p.tidakTermasuk.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Silang className="mt-1 size-5 shrink-0 text-bata" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {p.penting && (
            <section className="mt-10 rounded-2xl border-2 border-dashed border-emas/70 bg-kuning/20 p-6" aria-labelledby="penting">
              <h2 id="penting" className="judul text-3xl">Perlu Anda ketahui</h2>
              <ul className="mt-4 space-y-3">
                {p.penting.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="judul text-2xl leading-none text-emas">!</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-16" aria-labelledby="tanya">
            <h2 id="tanya" className="judul text-4xl">Tanya jawab</h2>
            <div className="mt-6">
              <Faq items={faqUmum.slice(0, 5)} />
            </div>
          </section>
        </div>

        {/* PANEL PESAN */}
        <aside id="pesan" className="scroll-mt-24 xl:sticky xl:top-24 xl:self-start">
          {jadwal.length > 0 ? (
            <Daftar p={p} jadwal={jadwal} kurs={site.kurs} />
          ) : (
            <p className="rounded-2xl bg-kertas-2 p-6">Jadwal keberangkatan berikutnya segera dibuka.</p>
          )}
        </aside>
      </div>

      <section className="border-t border-tinta/10 bg-kertas-2/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="judul text-3xl">Paket lain</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lain.map((x) => (
              <PaketCard key={x.slug} p={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Fakta({ label, nilai, ikon }: { label: string; nilai: React.ReactNode; ikon?: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-3.5 sm:grid-cols-[minmax(8rem,11rem)_minmax(0,1fr)] sm:gap-4">
      <dt className="flex items-center gap-2 font-semibold">
        {ikon}
        {label}
      </dt>
      <dd className="text-tinta-2">{nilai}</dd>
    </div>
  );
}
