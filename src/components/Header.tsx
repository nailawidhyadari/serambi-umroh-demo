"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { UkuranHuruf } from "./UkuranHuruf";
import { WaIcon } from "./icons";
import { waLink } from "@/lib/format";
import { NAV } from "@/lib/nav";

export function Header() {
  const path = usePathname();
  const [buka, setBuka] = useState(false);

  useEffect(() => {
    document.body.style.overflow = buka ? "hidden" : "";
  }, [buka]);

  return (
    <header className="sticky top-0 z-50 border-b border-tinta/10 bg-kertas/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <span onClick={() => setBuka(false)}>
          <Logo />
        </span>
        <nav aria-label="Menu utama" className="nav-desktop ml-4 hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => {
            const aktif = path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={aktif ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition ${
                  aktif ? "bg-hijau text-kertas" : "text-tinta-2 hover:bg-kertas-2 hover:text-tinta"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <UkuranHuruf className="hidden shrink-0 sm:flex" />
          <a
            href={waLink("Assalamu'alaikum, Serambi. Saya ingin tanya-tanya soal umroh.")}
            target="_blank"
            rel="noopener"
            className="wa-header hidden items-center gap-2 rounded-full bg-hijau px-4 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-kertas transition hover:bg-hijau-2 md:inline-flex"
          >
            <WaIcon className="size-5" /> Tanya via WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setBuka((b) => !b)}
            aria-expanded={buka}
            aria-controls="menu-hp"
            className="tombol-menu flex h-11 shrink-0 items-center gap-2 rounded-full border border-tinta/20 px-4 font-semibold xl:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition ${buka ? "top-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition ${buka ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition ${buka ? "top-1.5 -rotate-45" : ""}`} />
            </span>
            <span className="max-[359px]:sr-only">Menu</span>
          </button>
        </div>
      </div>

      {buka && (
        <div id="menu-hp" className="menu-hp muncul fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-kertas px-4 pb-10 pt-4 xl:hidden">
          <nav aria-label="Menu" className="flex flex-col">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setBuka(false)}
                className="flex items-baseline gap-4 border-b border-garis py-4"
              >
                <span className="w-6 font-mono text-sm text-tinta-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="judul text-3xl">{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-kertas-2 p-4">
            <span className="text-sm font-medium text-tinta-2">Ukuran huruf</span>
            <UkuranHuruf />
          </div>
          <a
            href={waLink("Assalamu'alaikum, Serambi. Saya ingin tanya-tanya soal umroh.")}
            target="_blank"
            rel="noopener"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-hijau px-4 py-4 text-lg font-semibold text-kertas"
          >
            <WaIcon /> Tanya via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
