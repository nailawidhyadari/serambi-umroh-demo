# Serambi · demo situs travel umroh & haji

Situs demo untuk travel umroh dan haji khusus, bergaya buku panduan jamaah. Semua data (nama brand, izin, harga, jadwal, testimoni) fiktif.

- Next.js 16 (App Router), Tailwind CSS v4, semua halaman statis.
- Konten ada di `src/data/`: `paket.ts` (paket, hotel, itinerary, harga, jadwal), `site.ts` (kontak, izin, pembimbing, testimoni), `panduan.ts`, `faq.ts`, `istilah.ts`.
- Nomor WhatsApp masih placeholder di `src/data/site.ts`.
- Foto dari Wikimedia Commons, kreditnya di `src/data/photo-credits.json` dan halaman `/tentang#kredit-foto`. Unduh ulang dengan `python3 scripts/fetch-photos.py`.

```bash
npm install
npm run dev
```
