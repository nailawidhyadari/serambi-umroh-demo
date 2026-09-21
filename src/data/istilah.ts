/** Kamus istilah yang muncul di situs. Dipakai oleh komponen <Istilah>. */
export const istilah = {
  ihram: { kata: "Ihram", arti: "Niat memulai umroh atau haji, ditandai dengan pakaian ihram. Laki-laki memakai dua lembar kain putih tanpa jahitan, perempuan memakai pakaian yang menutup aurat." },
  miqat: { kata: "Miqat", arti: "Batas tempat untuk mulai berihram. Dari Madinah miqatnya Bir Ali. Dari Jakarta lewat udara, miqatnya dilewati di atas pesawat (Yalamlam)." },
  tawaf: { kata: "Tawaf", arti: "Mengelilingi Ka'bah 7 putaran, berlawanan arah jarum jam, dimulai dari garis sejajar Hajar Aswad." },
  sai: { kata: "Sa'i", arti: "Berjalan 7 kali antara bukit Shafa dan Marwah. Shafa ke Marwah dihitung satu kali, Marwah ke Shafa dihitung satu kali lagi." },
  tahallul: { kata: "Tahallul", arti: "Memotong atau mencukur rambut sebagai tanda selesai umroh. Setelah ini larangan ihram tidak berlaku lagi." },
  raudhah: { kata: "Raudhah", arti: "Area di dalam Masjid Nabawi antara mimbar dan makam Rasulullah. Masuknya harus pakai izin (tasreh) dari aplikasi Nusuk." },
  nusuk: { kata: "Nusuk", arti: "Aplikasi resmi pemerintah Saudi untuk izin masuk Raudhah dan layanan umroh. Tim kami yang mendaftarkan slot Anda." },
  muthawwif: { kata: "Muthawwif", arti: "Pembimbing ibadah yang memandu jamaah saat tawaf, sa'i, dan ziarah." },
  quad: { kata: "Quad", arti: "Satu kamar diisi 4 orang. Paling hemat. Suami istri tetap bisa sekamar kalau berangkat bersama keluarga." },
  triple: { kata: "Triple", arti: "Satu kamar diisi 3 orang." },
  double: { kata: "Double", arti: "Satu kamar diisi 2 orang. Cocok untuk suami istri yang ingin kamar sendiri." },
  mahram: { kata: "Mahram", arti: "Laki-laki yang tidak boleh dinikahi, seperti suami, ayah, anak, atau saudara kandung. Aturan Saudi saat ini tidak mewajibkan mahram untuk umroh perempuan dewasa." },
  wukuf: { kata: "Wukuf", arti: "Berdiam di Padang Arafah pada 9 Dzulhijjah. Inti ibadah haji. Haji tidak sah tanpa wukuf." },
  mabit: { kata: "Mabit", arti: "Bermalam di Muzdalifah atau Mina sebagai bagian dari rangkaian haji." },
  armuzna: { kata: "Armuzna", arti: "Singkatan Arafah, Muzdalifah, dan Mina. Lima hari puncak ibadah haji." },
  wada: { kata: "Tawaf wada", arti: "Tawaf perpisahan sebelum meninggalkan Makkah." },
  furoda: { kata: "Haji furoda", arti: "Haji dengan visa undangan (mujamalah) dari Kerajaan Saudi, di luar kuota Indonesia. Tidak antre, tapi kepastian visanya sering baru ada menjelang haji." },
  ppiu: { kata: "PPIU", arti: "Penyelenggara Perjalanan Ibadah Umrah. Izin resmi dari pemerintah yang wajib dimiliki travel umroh." },
  pihk: { kata: "PIHK", arti: "Penyelenggara Ibadah Haji Khusus. Izin resmi yang wajib dimiliki travel untuk memberangkatkan haji khusus dan furoda." },
  porsi: { kata: "Nomor porsi", arti: "Nomor antrean haji yang Anda dapat setelah membayar setoran awal. Dipakai untuk menentukan tahun keberangkatan." },
  tamattu: { kata: "Haji tamattu'", arti: "Cara berhaji yang paling umum untuk jamaah Indonesia: umroh dulu, tahallul, lalu berihram lagi untuk haji. Wajib membayar dam." },
  dam: { kata: "Dam", arti: "Denda berupa menyembelih kambing, wajib untuk haji tamattu'. Di paket haji kami sudah termasuk." },
} as const;

export type IstilahKey = keyof typeof istilah;
