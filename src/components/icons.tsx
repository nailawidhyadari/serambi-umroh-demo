type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Panah = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Centang = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={2.4}><path d="M4 12.5l5 5L20 6.5" /></svg>
);
export const Silang = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={2.2}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Telepon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Jalan = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><circle cx="13" cy="4" r="2" /><path d="M9 21l2-6 3 3v3M7 12l3-4 4 1 3 4M10 8l1 7" /></svg>
);
export const Pesawat = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M10 14l-7-3 1-2 8 1 5-6a2 2 0 0 1 3 3l-6 5 1 8-2 1-3-7-3 3v3l-1.5.5L4 17l-3-1.5L1.5 14h3z" /></svg>
);
export const Kasur = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5a1.5 1.5 0 1 0 0-.01" /></svg>
);
export const Orang = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 6" /></svg>
);
export const Cetak = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}><path d="M7 9V3h10v6M7 18H4v-7h16v7h-3M7 14h10v7H7z" /></svg>
);
export const WaIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2m0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.8.83-3-.2-.32a8.2 8.2 0 1 1 6.97 3.85m4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.03 4.8 4.8 0 0 0 1 2.52c.12.16 1.72 2.62 4.16 3.68 1.55.67 2.15.72 2.93.6.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.16-.46-.28" />
  </svg>
);

export function Bintang({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-px text-emas" aria-label={`Bintang ${n}`}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3.5" aria-hidden fill="currentColor"><path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7z" /></svg>
      ))}
    </span>
  );
}
