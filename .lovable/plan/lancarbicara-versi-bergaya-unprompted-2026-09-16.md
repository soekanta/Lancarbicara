# Lancarbicara — versi bergaya Unprompted

Mengubah aplikasi dari "satu tombol + stopwatch" menjadi alur latihan berurutan: tarik topik → waktu persiapan/riset → waktu bicara → rekam & dengarkan ulang. Semuanya berjalan di perangkat pengguna, tanpa akun.

## Dua mode

**Mode Spontan (Impromptu)**
- Topik dari kategori yang sudah ada: Casual, Profesional, Filosofi.
- Waktu persiapan singkat, bisa diatur: 15 detik / 30 detik / 1 menit / 2 menit / 5 menit (atau dilewati).
- Lalu waktu bicara: 1–5 menit.

**Mode Riset Mendalam**
- Topik berupa konsep/istilah tak familiar (bias kognitif, ekonomi, sains, teknologi, masyarakat) — kumpulan baru, terpisah dari kategori spontan.
- Waktu riset bisa diatur 1–60 menit (default 10 menit) untuk pengguna mencari sendiri di sumber lain.
- Setelah riset selesai, pengguna menekan sendiri tombol mulai untuk waktu bicara 1–10 menit.

## Alur satu putaran

```text
[Pilih mode] → [Tarik Topik] → [Persiapan/Riset: hitung mundur]
     → [Siap? Mulai Bicara] → [Bicara: hitung mundur + rekam]
     → [Selesai: putar ulang, unduh, atau topik baru]
```

- Hitung mundur besar di tengah layar dengan cincin progres; berubah warna oranye saat 10 detik terakhir.
- Tombol jeda, lanjut, ulang, dan lewati di setiap tahap.
- Tanda bunyi halus saat waktu habis.
- Topik yang sudah keluar tidak diulang sampai satu putaran daftar habis.
- Riwayat singkat topik-topik terakhir dalam sesi ini, tersimpan di perangkat sehingga tetap ada saat halaman dibuka lagi.

## Rekaman suara

- Tombol izin mikrofon diminta hanya saat pengguna pertama kali merekam.
- Rekaman otomatis berjalan selama tahap bicara (bisa dimatikan lewat sakelar).
- Setelah selesai: pemutar audio untuk mendengarkan ulang, tombol unduh, dan tombol hapus.
- Rekaman hanya berada di perangkat pengguna, tidak diunggah ke mana pun; hilang saat halaman ditutup kecuali diunduh.

## Tampilan

Tetap minimalis ala Apple, putih bersih, biru sebagai aksen, oranye untuk waktu. Layar fokus satu tahap saja pada satu waktu, teks topik besar di tengah, kontrol sekunder kecil di bawah. Responsif untuk ponsel.

## Catatan teknis

- Satu halaman `src/routes/index.tsx` dipecah jadi komponen: `ModeSwitch`, `TopicCard`, `TimerRing`, `TimerControls`, `Recorder`, `HistoryList`, plus hook `useCountdown` dan `useRecorder`.
- State mesin tahap: `idle → prep → ready → speaking → done`.
- Hitung mundur berbasis `Date.now()` (bukan akumulasi interval) agar tidak melenceng saat tab tidak aktif.
- Data topik di `src/data/topics.ts`: kumpulan spontan per kategori (diperluas) dan kumpulan riset (~40 konsep). Pengambilan tetap mencoba `/generate.php?category=...` dulu dan jatuh ke data lokal bila gagal, seperti sekarang.
- Rekaman memakai `MediaRecorder` di browser dengan `URL.createObjectURL` untuk pemutaran; dimuat hanya di sisi klien agar aman terhadap render server.
- Preferensi (mode, durasi, sakelar rekam) dan riwayat disimpan di `localStorage`, dibaca dalam `useEffect` agar tidak memicu ketidakcocokan hidrasi.
- Tanpa backend/database — seluruh fitur berjalan di peramban.
