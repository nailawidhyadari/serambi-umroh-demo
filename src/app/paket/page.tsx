import type { Metadata } from "next";
import { paket } from "@/data/paket";
import { site } from "@/data/site";
import { Bab } from "@/components/Bab";
import { PaketCard } from "@/components/PaketCard";
import { Bandingkan } from "@/components/Bandingkan";
import { Istilah } from "@/components/Istilah";

export const metadata: Metadata = {
  title: "Paket Umroh & Haji 2026–2027, Harga dan Jarak Hotel",
  description:
    "Tujuh paket umroh dan haji dari Bandung: Reguler 12 hari, Hemat 9 hari, Ramah Lansia, Plus Turki, Ramadhan, Haji Khusus, dan Haji Furoda. Bandingkan harga, hotel, dan maskapai berdampingan.",
  alternates: { canonical: "/paket" },
};

export default function PaketPage() {
  const umroh = paket.filter((p) => p.kategori !== "haji");
  const haji = paket.filter((p) => p.kategori === "haji");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Bab
        no="1"
        kicker={`Harga diperbarui ${site.diperbarui}`}
        judul={<>Pilih paket</>}
        lead={
          <>
            Semua harga per orang. Harga terendah untuk kamar <Istilah k="quad">quad</Istilah> (ber-4), naik untuk{" "}
            <Istilah k="triple">triple</Istilah> dan <Istilah k="double">double</Istilah>. Garis di tiap kartu menunjukkan jarak hotel ke pelataran masjid.
          </>
        }
      />

      <h2 className="judul mt-12 text-3xl">Umroh</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {umroh.map((p) => (
          <PaketCard key={p.slug} p={p} />
        ))}
      </div>

      <h2 className="judul mt-16 text-3xl">Haji</h2>
      <p className="mt-2 max-w-2xl text-tinta-2">
        Harga haji dalam dolar AS. Bingung bedanya haji khusus dan furoda? Baca <a href="/haji" className="font-semibold text-hijau underline underline-offset-4">penjelasan jenis haji</a>.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {haji.map((p) => (
          <PaketCard key={p.slug} p={p} />
        ))}
      </div>

      <section id="bandingkan" className="mt-20 scroll-mt-24">
        <Bab kicker="Bandingkan" judul="Taruh berdampingan, lalu putuskan." lead="Kotak hijau menandai yang paling murah atau paling dekat di setiap baris." />
        <div className="mt-8">
          <Bandingkan daftar={paket} />
        </div>
      </section>
    </div>
  );
}
