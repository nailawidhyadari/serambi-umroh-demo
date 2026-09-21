import { paket } from "@/data/paket";
import type { Paket } from "@/data/types";
import type { BarisJadwal } from "@/components/PapanJadwal";
import { hargaMulai, hargaTeks, jadwalAktif, pesanDaftar } from "./format";

/** Semua keberangkatan yang belum lewat, urut tanggal, siap untuk <PapanJadwal>. */
export function semuaJadwal(daftar: Paket[] = paket): BarisJadwal[] {
  return daftar
    .flatMap((p) =>
      jadwalAktif(p).map((k) => ({
        slug: p.slug,
        nama: p.nama,
        pendek: p.pendek,
        kategori: p.kategori,
        hari: p.hari,
        maskapai: p.maskapai.nama,
        langsung: p.maskapai.langsung,
        harga: hargaTeks(p, hargaMulai(p)),
        tanggal: k.tanggal,
        kuota: k.kuota,
        terisi: k.terisi,
        pesan: pesanDaftar(p, { tanggal: k.tanggal }),
      })),
    )
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal));
}
