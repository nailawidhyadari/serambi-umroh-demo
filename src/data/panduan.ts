export const dokumen = [
  { nama: "Paspor", detail: "Masih berlaku minimal 8 bulan dari tanggal berangkat. Nama minimal dua kata (kalau satu kata, minta tambahan nama di kantor imigrasi)." },
  { nama: "KTP & Kartu Keluarga", detail: "Fotokopi, masing-masing 2 lembar." },
  { nama: "Pas foto", detail: "Ukuran 4×6, latar putih, wajah terlihat 80%. Tanpa kacamata. 6 lembar." },
  { nama: "Buku nikah", detail: "Untuk suami istri yang ingin sekamar. Fotokopi saja." },
  { nama: "Akta lahir", detail: "Untuk anak di bawah 17 tahun yang berangkat bersama orang tua." },
  { nama: "Kartu vaksin", detail: "Sertifikat vaksin meningitis dan polio sesuai ketentuan terbaru. Kami bantu jadwalkan di KKP Bandung." },
  { nama: "Surat keterangan sehat", detail: "Wajib untuk jamaah di atas 70 tahun atau yang punya penyakit bawaan." },
];

export type ChecklistGrup = { judul: string; item: string[] };

export const checklist: ChecklistGrup[] = [
  {
    judul: "Dokumen & uang",
    item: ["Paspor (asli)", "Fotokopi paspor & KTP, disimpan terpisah", "Kartu vaksin", "Riyal pecahan kecil (SAR 1, 5, 10)", "Kartu ATM berlogo Visa/Mastercard", "Kartu identitas jamaah dari Serambi"],
  },
  {
    judul: "Ibadah",
    item: ["Kain ihram 2 set (laki-laki)", "Sabuk ihram dengan kantong", "Mukena 2 set (perempuan)", "Sajadah tipis yang bisa dilipat", "Buku doa & Al-Qur'an kecil", "Tasbih atau counter jari"],
  },
  {
    judul: "Pakaian",
    item: ["Gamis / baju koko 5–6 potong", "Pakaian dalam untuk 7 hari", "Jaket (Desember–Februari bisa dingin di malam hari)", "Sandal jepit yang empuk", "Sepatu jalan yang sudah biasa dipakai", "Kaus kaki 4 pasang"],
  },
  {
    judul: "Kesehatan",
    item: ["Obat rutin + fotokopi resep", "Masker 20 lembar", "Pelembap bibir & kulit tanpa wangi", "Semprotan air (botol spray)", "Plester luka & koyo", "Vitamin"],
  },
  {
    judul: "Lain-lain",
    item: ["Colokan universal (tipe G)", "Power bank (di tas kabin, bukan koper)", "Kantong plastik untuk sandal", "Kacamata hitam", "Botol minum lipat", "Gunting kecil untuk tahallul (di koper, bukan kabin)"],
  },
];

export const langkahUmroh = [
  {
    no: 1,
    nama: "Ihram",
    k: "ihram" as const,
    di: "Miqat (Bir Ali atau di pesawat)",
    lama: "±30 menit",
    isi: "Mandi sunnah, memakai pakaian ihram, shalat sunnah dua rakaat, lalu berniat. Sejak niat, larangan ihram berlaku.",
    lafal: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
    latin: "Labbaika Allāhumma ‘umratan",
    artinya: "Aku penuhi panggilan-Mu, ya Allah, untuk berumroh.",
  },
  {
    no: 2,
    nama: "Tawaf",
    k: "tawaf" as const,
    di: "Sekeliling Ka'bah",
    lama: "±1–2 jam",
    isi: "Tujuh putaran berlawanan arah jarum jam. Mulai dari garis sejajar Hajar Aswad (ditandai lampu hijau di dinding). Setelah itu shalat dua rakaat di belakang Maqam Ibrahim atau di mana saja di dalam masjid, lalu minum zamzam.",
  },
  {
    no: 3,
    nama: "Sa'i",
    k: "sai" as const,
    di: "Bukit Shafa – Marwah",
    lama: "±1 jam",
    isi: "Tujuh kali perjalanan, mulai di Shafa dan selesai di Marwah. Jaraknya ±450 meter sekali jalan. Laki-laki berlari kecil di antara dua lampu hijau.",
  },
  {
    no: 4,
    nama: "Tahallul",
    k: "tahallul" as const,
    di: "Setelah sa'i, di Marwah atau di hotel",
    lama: "±5 menit",
    isi: "Memotong rambut. Laki-laki lebih utama dicukur habis, perempuan cukup memotong seujung jari. Umroh selesai.",
  },
];

export const laranganIhram = [
  "Memakai wewangian (termasuk sabun dan sampo wangi)",
  "Memotong kuku dan rambut",
  "Laki-laki: memakai pakaian berjahit dan penutup kepala",
  "Perempuan: menutup wajah dan memakai sarung tangan",
  "Berburu atau membunuh binatang",
  "Menikah, menikahkan, atau melamar",
  "Berhubungan suami istri",
];

export const talbiyah = {
  arab: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
  latin:
    "Labbaika Allāhumma labbaik, labbaika lā syarīka laka labbaik, innal-ḥamda wan-ni‘mata laka wal-mulk, lā syarīka lak.",
  arti: "Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Aku penuhi panggilan-Mu, tiada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu. Tiada sekutu bagi-Mu.",
};

export const tipsSehat = [
  { judul: "Minum sebelum haus", isi: "Udara di Saudi sangat kering. Minum air putih sedikit-sedikit tapi sering, minimal 2 liter sehari." },
  { judul: "Jangan paksakan umroh berkali-kali", isi: "Banyak jamaah jatuh sakit di hari ke-5 karena mengejar umroh ketiga dan keempat. Satu umroh yang khusyuk lebih baik." },
  { judul: "Latihan jalan dari sekarang", isi: "Tawaf dan sa'i sekitar 6–7 km. Mulai jalan kaki 30 menit setiap pagi, sebulan sebelum berangkat." },
  { judul: "Simpan nomor penting", isi: "Tulis nomor tour leader dan nama hotel di kertas, taruh di tas paspor. HP bisa mati, kertas tidak." },
];
