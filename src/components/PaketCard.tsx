import Link from "next/link";
import type { Paket } from "@/data/types";
import { KATEGORI_LABEL } from "@/data/paket";
import { hargaMulai, hargaTeks, jadwalBerikut, keRupiah, juta, sisa, tanggal } from "@/lib/format";
import { Photo } from "./Photo";
import { JarakHotel } from "./JarakHotel";
import { Panah, Pesawat } from "./icons";

export function PaketCard({ p }: { p: Paket }) {
  const next = jadwalBerikut(p);
  const mulai = hargaMulai(p);
  const suci = p.hotel.filter((h) => h.kota !== "Istanbul");
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-tinta/12 bg-kertas-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(23,36,30,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo k={p.cover} alt={p.nama} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-[1.03]" credit={false} />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-kertas/95 px-2.5 py-1 text-xs font-semibold">{KATEGORI_LABEL[p.kategori]}</span>
          {p.label && <span className="rounded-full bg-bata px-2.5 py-1 text-xs font-semibold text-kertas">{p.label}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="judul text-[1.65rem]">
          <Link href={`/paket/${p.slug}`} className="after:absolute after:inset-0">
            {p.nama}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-tinta-2">
          <Pesawat className="size-4" /> {p.maskapai.nama} · {p.maskapai.langsung ? "terbang langsung" : "1× transit"}
        </p>
        <div className="mt-4 space-y-3 rounded-xl bg-kertas p-3.5">
          {suci.map((h) => (
            <JarakHotel key={h.kota} h={h} ringkas />
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-tinta-3">Mulai</p>
            <p className="font-mono text-xl font-semibold">{hargaTeks(p, mulai)}</p>
            {p.mata === "USD" && <p className="text-xs text-tinta-3">≈ Rp{juta(keRupiah(p, mulai))}</p>}
          </div>
          <div className="text-right text-sm">
            {next ? (
              <>
                <p className="text-tinta-3">Berangkat terdekat</p>
                <p className="font-semibold">{tanggal(next.tanggal, p.hari).rentang.replace(/ \d{4}$/, "")}</p>
                <p className={sisa(next) <= 5 ? "font-semibold text-bata" : "text-hijau-2"}>sisa {sisa(next)} kursi</p>
              </>
            ) : (
              <p className="text-tinta-3">Jadwal segera dibuka</p>
            )}
          </div>
        </div>
        <span className="mt-4 flex items-center gap-1.5 border-t border-garis pt-3 text-sm font-semibold text-hijau">
          Lihat hotel, jadwal harian & rincian harga <Panah className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
