export const NAV = [
  { href: "/paket", label: "Paket & Harga" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/biaya", label: "Hitung Biaya" },
  { href: "/panduan", label: "Panduan" },
  { href: "/haji", label: "Haji" },
  { href: "/tentang", label: "Tentang Kami" },
];

/** Dijalankan sebelum halaman tampil, supaya ukuran huruf pilihan pengunjung tidak berkedip. */
export const skripUkuranHuruf = `try{var u=localStorage.getItem("serambi-huruf");if(u&&u!=="biasa")document.documentElement.dataset.huruf=u}catch(e){}`;
