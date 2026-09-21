/** Diagram tawaf dilihat dari atas: Ka'bah, Hajar Aswad, Hijr Ismail, Maqam Ibrahim, arah putaran. */
export function DiagramTawaf() {
  return (
    <svg viewBox="0 0 320 320" className="h-auto w-full max-w-sm" role="img" aria-labelledby="t-tawaf">
      <title id="t-tawaf">Denah tawaf: tujuh putaran berlawanan arah jarum jam, dimulai dari garis Hajar Aswad</title>
      <circle cx="160" cy="160" r="138" fill="var(--kertas-3)" stroke="var(--garis)" />
      <circle cx="160" cy="160" r="112" fill="none" stroke="var(--hijau-2)" strokeWidth="2.5" className="putar-tawaf" style={{ animationDirection: "reverse" }} />
      {/* panah berlawanan jarum jam */}
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`rotate(${a} 160 160)`}>
          <path d="M151 48 l9 -6 v12 z" fill="var(--hijau-2)" />
        </g>
      ))}
      {/* Hijr Ismail */}
      <path d="M128 118 a40 40 0 0 1 64 0" fill="none" stroke="var(--tinta-2)" strokeWidth="3" transform="translate(0 -12)" />
      <text x="160" y="84" textAnchor="middle" fontSize="10" fill="var(--tinta-3)">Hijr Ismail</text>
      {/* Ka'bah */}
      <rect x="130" y="120" width="60" height="70" rx="2" fill="var(--tinta)" />
      <rect x="130" y="138" width="60" height="5" fill="var(--emas)" />
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="var(--kertas)" fontWeight="600">Ka&apos;bah</text>
      {/* Hajar Aswad: sudut tenggara */}
      <circle cx="190" cy="190" r="5" fill="var(--bata)" />
      <line x1="190" y1="190" x2="268" y2="268" stroke="var(--bata)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="316" y="252" textAnchor="end" fontSize="10" fill="var(--bata)" fontWeight="700">MULAI &amp;</text>
      <text x="316" y="264" textAnchor="end" fontSize="10" fill="var(--bata)" fontWeight="700">SELESAI</text>
      <text x="184" y="206" textAnchor="end" fontSize="10" fill="var(--bata)" fontWeight="600">Hajar Aswad</text>
      {/* Maqam Ibrahim */}
      <rect x="188" y="132" width="4" height="16" fill="var(--emas)" />
      <circle cx="214" cy="140" r="5" fill="var(--emas)" />
      <text x="222" y="137" fontSize="10" fill="var(--tinta-2)">Maqam</text>
      <text x="222" y="149" fontSize="10" fill="var(--tinta-2)">Ibrahim</text>
      <text x="160" y="306" textAnchor="middle" fontSize="11" fill="var(--hijau)" fontWeight="600">7 putaran, Ka&apos;bah di sisi kiri Anda</text>
    </svg>
  );
}

/** Diagram sa'i: tujuh lintasan Shafa ↔ Marwah. */
export function DiagramSai() {
  const x0 = 50;
  const x1 = 290;
  return (
    <svg viewBox="0 0 340 250" className="h-auto w-full max-w-md" role="img" aria-labelledby="t-sai">
      <title id="t-sai">Sa&apos;i: tujuh lintasan, mulai di Shafa, selesai di Marwah</title>
      <rect x="18" y="20" width="64" height="200" rx="32" fill="var(--kertas-2)" />
      <rect x="258" y="20" width="64" height="200" rx="32" fill="var(--kertas-2)" />
      <text x="50" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--tinta)">Shafa</text>
      <text x="290" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--tinta)">Marwah</text>
      {/* lampu hijau */}
      <rect x="140" y="20" width="6" height="200" fill="var(--hijau-2)" opacity="0.5" />
      <rect x="194" y="20" width="6" height="200" fill="var(--hijau-2)" opacity="0.5" />
      <text x="170" y="14" textAnchor="middle" fontSize="9.5" fill="var(--hijau)">lari kecil (laki-laki)</text>
      {Array.from({ length: 7 }, (_, i) => {
        const y = 38 + i * 27;
        const ke = i % 2 === 0;
        return (
          <g key={i}>
            <line x1={ke ? x0 : x1} y1={y} x2={ke ? x1 - 10 : x0 + 10} y2={y} stroke={i === 6 ? "var(--bata)" : "var(--tinta-2)"} strokeWidth="2" />
            <path d={ke ? `M${x1 - 10} ${y - 5} l10 5 -10 5z` : `M${x0 + 10} ${y - 5} l-10 5 10 5z`} fill={i === 6 ? "var(--bata)" : "var(--tinta-2)"} />
            <circle cx={ke ? x0 : x1} cy={y} r="9" fill="var(--kertas)" stroke="var(--tinta-2)" />
            <text x={ke ? x0 : x1} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--tinta)">{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}
