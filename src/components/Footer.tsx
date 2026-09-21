import Link from "next/link";
import { site } from "@/data/site";
import { paket } from "@/data/paket";
import { Logo } from "./Logo";
import { NAV } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="bg-hijau pb-24 text-kertas md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-kertas/75">{site.tagline}. Memberangkatkan {site.jamaah.toLocaleString("id-ID")} jamaah sejak {site.berdiri}.</p>
          <div className="stempel mt-6 inline-block rounded px-3 py-2 font-mono text-xs uppercase leading-relaxed text-kuning">
            {site.izinPpiu}
            <br />
            {site.izinPihk}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-kertas/60">Paket</h3>
          <ul className="space-y-2">
            {paket.map((p) => (
              <li key={p.slug}>
                <Link href={`/paket/${p.slug}`} className="hover:text-kuning">{p.nama}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-kertas/60">Halaman</h3>
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-kuning">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-kertas/60">Kantor</h3>
          <address className="not-italic text-kertas/85">
            {site.alamat}
            <br />
            {site.jamKantor}
            <br />
            <a href={`tel:${site.teleponLink}`} className="hover:text-kuning">{site.telepon}</a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-kuning">{site.email}</a>
          </address>
          <p className="mt-3 text-sm text-kertas/65">WhatsApp: {site.jamWa}</p>
        </div>
      </div>
      <div className="border-t border-kertas/15">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-5 text-sm text-kertas/60 sm:px-6">
          <p>
            Situs demo. Nama Serambi, nomor izin, harga, jadwal, dan testimoni adalah contoh fiktif.{" "}
            <Link href="/tentang#kredit-foto" className="underline underline-offset-2 hover:text-kuning">Kredit foto</Link>
          </p>
          <p>Harga diperbarui {site.diperbarui}</p>
        </div>
      </div>
    </footer>
  );
}
