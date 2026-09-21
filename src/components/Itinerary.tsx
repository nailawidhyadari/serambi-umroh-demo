import type { Hari } from "@/data/types";

/** Itinerary bergaya halaman buku: nomor hari besar di kiri, catatan pinggir di kanan. */
export function Itinerary({ hari }: { hari: Hari[] }) {
  return (
    <ol className="relative">
      {hari.map((h) => (
        <li key={h.ke} className="grid gap-x-8 border-t border-garis py-7 first:border-t-0 md:grid-cols-[7rem_1fr_16rem]">
          <div className="flex items-baseline gap-3 md:block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta-3">Hari</span>
            <span className="judul block text-5xl text-hijau md:mt-1 md:text-6xl">{h.ke}</span>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bata">{h.kota}</p>
            <h3 className="judul mt-1 text-2xl sm:text-[1.75rem]">{h.judul}</h3>
            <ul className="mt-3 space-y-2 text-tinta-2">
              {h.isi.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-tinta-3" aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            {h.makan && (
              <p className="mt-3 inline-block rounded-full bg-kertas-2 px-3 py-1 text-sm text-tinta-2">
                Makan: {h.makan}
              </p>
            )}
          </div>
          {h.catatan ? (
            <aside className="mt-4 md:mt-8">
              <p className="judul-miring relative rotate-[-1deg] rounded-sm bg-kuning/45 px-4 py-3 text-[1.05rem] leading-snug text-tinta shadow-[2px_3px_0_rgba(23,36,30,0.08)]">
                <span className="mb-1 block font-sans text-[0.7rem] font-bold not-italic uppercase tracking-[0.16em] text-tinta-3">
                  Catatan pembimbing
                </span>
                {h.catatan}
              </p>
            </aside>
          ) : (
            <span className="hidden md:block" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  );
}
