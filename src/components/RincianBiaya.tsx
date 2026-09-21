import type { Paket } from "@/data/types";
import { hargaTeks } from "@/lib/format";

const WARNA = ["#1d4b3a", "#2c6a52", "#5b8a73", "#a8812f", "#c9a55a", "#b0442a", "#d07a5d", "#8a7e66"];

/** Ke mana uang jamaah pergi: satu batang bertumpuk + daftar pos dengan nominal. */
export function RincianBiaya({ p, kamar = "quad" }: { p: Paket; kamar?: keyof Paket["harga"] }) {
  const total = p.harga[kamar];
  return (
    <figure>
      <div className="flex h-10 overflow-hidden rounded-md" role="img" aria-label="Porsi biaya per pos">
        {p.rincian.map((r, i) => (
          <div key={r.pos} style={{ width: `${r.persen}%`, background: WARNA[i % WARNA.length] }} className="border-r-2 border-kertas last:border-0" title={`${r.pos}: ${r.persen}%`} />
        ))}
      </div>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
        {p.rincian.map((r, i) => (
          <li key={r.pos} className="flex items-baseline gap-3 border-b border-dashed border-garis py-2.5">
            <span className="size-3 shrink-0 translate-y-0.5 rounded-sm" style={{ background: WARNA[i % WARNA.length] }} />
            <span className="min-w-0 flex-1">
              {r.pos} <span className="whitespace-nowrap font-mono text-sm text-tinta-3">{r.persen}%</span>
            </span>
            <span className="shrink-0 whitespace-nowrap text-right font-mono text-sm font-semibold">
              {hargaTeks(p, Math.round((total * r.persen) / 100 / (p.mata === "USD" ? 10 : 10_000)) * (p.mata === "USD" ? 10 : 10_000))}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-sm text-tinta-3">
        Estimasi porsi untuk kamar {kamar} ({hargaTeks(p, total)}), dibulatkan. Angka pastinya bergantung pada harga tiket dan hotel saat Anda mendaftar.
      </figcaption>
    </figure>
  );
}
