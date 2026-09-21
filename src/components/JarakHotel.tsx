import type { Hotel } from "@/data/types";
import { menitJalan } from "@/lib/format";
import { Bintang, Jalan } from "./icons";

const SKALA = 800; // meter penuh di garis

/** Garis jarak hotel → masjid, dengan penanda menit jalan kaki biasa dan lansia. */
export function JarakHotel({ h, ringkas = false }: { h: Hotel; ringkas?: boolean }) {
  const masjid = h.kota === "Makkah" ? "Masjidil Haram" : h.kota === "Madinah" ? "Masjid Nabawi" : "Masjid Sultan Ahmet";
  const pct = Math.min(100, (h.jarak / SKALA) * 100);
  const dekat = h.jarak <= 200;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <span className="font-semibold">{h.kota}</span>{" "}
          <span className="text-sm text-tinta-3">· {h.area}</span>
        </div>
        {!ringkas && <Bintang n={h.bintang} />}
      </div>
      <div className="mt-2 flex items-center gap-2" aria-hidden>
        <span className="size-2.5 shrink-0 rounded-full bg-tinta" />
        <div className="relative h-2 flex-1 rounded-full bg-kertas-2">
          <div
            className={`absolute inset-y-0 left-0 rounded-full ${dekat ? "bg-hijau-2" : h.jarak <= 500 ? "bg-emas" : "bg-bata"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-hijau"><path d="M2 15V8a6 6 0 0 1 12 0v7zM8 1v2" fill="currentColor" /></svg>
      </div>
      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-mono text-base font-semibold text-tinta">{h.jarak} m</span>
        <span className="text-tinta-2">ke pelataran {masjid}</span>
      </p>
      {!ringkas && (
        <p className="mt-1 flex items-center gap-1.5 text-sm text-tinta-3">
          <Jalan className="size-4" /> ±{menitJalan(h.jarak)} menit jalan biasa, ±{menitJalan(h.jarak, true)} menit untuk lansia · {h.jalan}
        </p>
      )}
    </div>
  );
}
