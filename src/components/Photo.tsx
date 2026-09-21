import Image from "next/image";
import credits from "@/data/photo-credits.json";
import type { PhotoKey } from "@/data/types";

type Props = {
  k: PhotoKey;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  credit?: boolean;
};

/** Foto isi-penuh (parent harus relative). Kredit fotografer tampil kecil di pojok. */
export function Photo({ k, alt, className = "", sizes = "100vw", priority, credit = true }: Props) {
  const c = credits[k];
  return (
    <>
      <Image src={`/photos/${k}.jpg`} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
      {credit && (
        <a
          href={c.source}
          target="_blank"
          rel="noopener"
          className="absolute bottom-1.5 right-1.5 z-10 max-w-[70%] truncate rounded bg-tinta/55 px-1.5 py-0.5 font-mono text-[10px] text-kertas/85 backdrop-blur-sm hover:bg-tinta"
          title={`Foto: ${c.author} · ${c.license} · Wikimedia Commons`}
        >
          © {c.author} · {c.license}
        </a>
      )}
    </>
  );
}
