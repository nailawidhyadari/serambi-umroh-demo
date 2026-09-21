import { site } from "@/data/site";
import { waLink } from "@/lib/format";
import { Telepon, WaIcon } from "./icons";

/** Dua tombol besar yang selalu ada di bawah layar HP. */
export function MobileBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-2 border-t border-tinta/10 bg-kertas/95 p-2.5 backdrop-blur-md md:hidden">
      <a
        href={waLink("Assalamu'alaikum, Serambi. Saya ingin tanya-tanya soal umroh.")}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-2 rounded-xl bg-hijau py-3.5 text-base font-semibold text-kertas"
      >
        <WaIcon /> Tanya via WhatsApp
      </a>
      <a href={`tel:${site.teleponLink}`} className="flex items-center gap-2 rounded-xl border border-tinta/25 px-4 font-semibold">
        <Telepon className="size-5" /> Telepon
      </a>
    </div>
  );
}
