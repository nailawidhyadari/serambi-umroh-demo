type Props = {
  no?: string;
  kicker?: string;
  judul: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  aksi?: React.ReactNode;
  id?: string;
};

/** Kepala bagian bergaya bab buku: nomor bab, garis ganda, judul serif. */
export function Bab({ no, kicker, judul, lead, className = "", aksi, id }: Props) {
  return (
    <div className={className}>
      <div className="garis-ganda flex items-center justify-between gap-4 pt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-tinta-3">
        <span>{no ? `Bab ${no}` : kicker}</span>
        {no && kicker && <span className="text-right">{kicker}</span>}
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div className="max-w-3xl">
          <h2 id={id} className="judul text-[2.1rem] sm:text-5xl">{judul}</h2>
          {lead && <p className="mt-4 text-lg text-tinta-2">{lead}</p>}
        </div>
        {aksi}
      </div>
    </div>
  );
}
