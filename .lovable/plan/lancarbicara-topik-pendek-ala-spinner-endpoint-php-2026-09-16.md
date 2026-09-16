# Lancarbicara — Topik pendek ala spinner + endpoint PHP

Topik bukan lagi kalimat panjang, melainkan frasa singkat seperti Unprompted: 1 kata untuk mode Spontan, maksimal 4 kata untuk Riset Mendalam (contoh: "The Jakarta Method", "Newton's Laws", "Cloaca Maxima"). Aplikasi tetap murni React SPA (Vite) tanpa backend JS — siap di-build statis dan dihosting di InfinityFree dengan `generate.php` buatan pengguna sebagai jembatan ke Gemini.

## Perubahan utama

**1. Data topik jadi frasa pendek**
- Spontan: topik berupa 1 kata per kategori (Casual, Profesional, Filosofi), masing-masing diperbanyak (~30+ kata per kategori).
- Riset Mendalam: nama konsep/istilah 1–4 kata (mis. "Efek Zeigarnik", "Paradoks Fermi", "Cloaca Maxima", "Hukum Goodhart").

**2. Tampilan topik bergaya spinner**
- Teks topik sangat besar di tengah kartu, tebal, rata tengah.
- Saat menarik topik: animasi cepat bergaya mesin slot — kata-kata acak berganti dengan cepat lalu melambat dan berhenti di topik final (pengganti skeleton bar).

**3. Koneksi `generate.php` (siap untuk InfinityFree)**
- Tombol utama memanggil `fetch('/generate.php?cat=' + kategoriAktif)` (metode GET).
- Nilai `cat`: `casual` | `profesional` | `filosofi` | `riset`.
- Diharapkan PHP membalas JSON `{"topic": "..."}`.
- Dibungkus `try...catch`: bila fetch gagal/404 (seperti di preview Lovable sekarang), otomatis memakai array cadangan lokal sehingga preview tetap jalan.
- Tidak ada Next.js, Edge Functions, atau backend Lovable — murni SPA statis.

**4. Sisanya tetap seperti yang sudah disetujui**
- Dua mode (Spontan / Riset Mendalam), timer persiapan/riset dan bicara yang bisa diatur, jeda/lanjut/lewati, bunyi saat habis, rekam suara opsional dengan putar ulang/unduh/hapus, riwayat topik di perangkat, dan preferensi tersimpan di localStorage.

## Catatan teknis

- Ubah `src/data/topics.ts`: ganti kalimat panjang menjadi daftar frasa 1 kata (spontan) dan 1–4 kata (riset).
- Ubah `fetchTopic()` di `src/routes/index.tsx`: parameter query diganti dari `category=` menjadi `cat=`.
- Animasi spinner: interval cepat menampilkan kata acak dari pool (~50ms, melambat mendekati akhir), berakhir di topik hasil fetch/fallback; total sekitar 1–1,5 detik.
- Tidak ada file backend, tidak ada perubahan arsitektur — output tetap `npm run build` → file statis.
