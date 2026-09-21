import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Serambi, ke beranda">
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="7" fill={light ? "var(--kertas)" : "var(--hijau)"} />
        <path d="M8 26V14a8 8 0 0 1 16 0v12" fill="none" stroke={light ? "var(--hijau)" : "var(--kertas)"} strokeWidth="2.6" />
        <path d="M12.5 26v-9a3.5 3.5 0 0 1 7 0v9" fill="none" stroke={light ? "var(--bata)" : "var(--kuning)"} strokeWidth="2" />
        <path d="M5 26h22" stroke={light ? "var(--hijau)" : "var(--kertas)"} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`judul block text-[1.45rem] ${light ? "text-kertas" : "text-tinta"}`}>Serambi</span>
        <span className={`mt-0.5 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${light ? "text-kertas/70" : "text-tinta-3"}`}>
          Umroh &amp; Haji
        </span>
      </span>
    </Link>
  );
}
