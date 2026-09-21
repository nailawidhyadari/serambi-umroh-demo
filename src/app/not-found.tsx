import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-tinta-3">Halaman 404</p>
      <h1 className="judul mt-3 text-5xl">Halaman ini tidak ada di buku kami.</h1>
      <p className="mt-4 text-lg text-tinta-2">Mungkin alamatnya salah ketik. Kembali ke daftar isi, atau langsung lihat paket.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-xl bg-tinta px-5 py-3.5 font-semibold text-kertas">Ke beranda</Link>
        <Link href="/paket" className="rounded-xl border-2 border-tinta px-5 py-3.5 font-semibold">Lihat paket</Link>
      </div>
    </div>
  );
}
