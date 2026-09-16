<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$topics = [
    'umum' => ["Kopi", "Hujan", "Liburan", "Musik", "Makanan", "Teman", "Keluarga", "Sepeda", "Pantai", "Gunung", "Buku", "Film", "Hobi", "Pagi", "Malam", "Rumah", "Kota", "Perjalanan", "Kenangan", "Mimpi", "Kucing", "Kendaraan", "Belanja", "Cuaca", "Festival", "Kereta", "Tidur", "Permainan", "Langit", "Jalanan"],
    'keuangan' => ["Menabung", "Utang", "Investasi", "Anggaran", "Inflasi", "Pensiun", "Deposito", "Reksa dana", "Saham", "Asuransi", "Pajak", "Bunga", "Dana darurat", "Kredit", "Aset", "Pengeluaran", "Warisan", "Emas", "Properti", "Gaji"],
    'wirausaha' => ["Pelanggan", "Modal", "Risiko", "Branding", "Pemasaran", "Harga", "Inovasi", "Pesaing", "Kegagalan", "Jaringan", "Skala", "Layanan", "Produk", "Pasar", "Kemitraan", "Arus kas", "Reputasi", "Lokasi", "Promosi", "Ketekunan"],
    'startup' => ["Validasi", "Pitch", "Pendanaan", "MVP", "Pivot", "Traction", "Founder", "Burn rate", "Inkubator", "Angel", "Valuasi", "Bootstrap", "Pertumbuhan", "Retensi", "Ekosistem", "Exit", "Unicorn", "Demo day", "Cofounder", "Runway"],
    'teknologi' => ["Kecerdasan buatan", "Robotika", "Internet", "Gadget", "Aplikasi", "Data", "Privasi", "Siber", "Komputasi awan", "Media sosial", "Gim", "Blockchain", "Otomatisasi", "Algoritma", "Satelit", "Baterai", "Sensor", "Printer 3D", "Mobil listrik", "Kripto"],
    'kebugaran' => ["Lari", "Beban", "Peregangan", "Tidur", "Langkah", "Konsistensi", "Pemulihan", "Denyut nadi", "Otot", "Postur", "Aerobik", "Disiplin", "Cedera", "Pemanasan", "Pendinginan", "Stamina", "Kelenturan", "Kardio", "Gym", "Jalan kaki"],
    'nutrisi' => ["Protein", "Sayuran", "Air putih", "Gula", "Serat", "Kalori", "Garam", "Vitamin", "Lemak sehat", "Puasa", "Makanan olahan", "Karbohidrat", "Porsi", "Sarapan", "Camilan", "Kebugaran usus", "Mineral", "Buah", "Teh hijau", "Keseimbangan"],
    'produktivitas' => ["Fokus", "Distraksi", "Rutinitas", "Prioritas", "Daftar tugas", "Pomodoro", "Istirahat", "Blok waktu", "Penundaan", "Energi", "Kebiasaan", "Deep work", "Delegasi", "Tujuan", "Sistem", "Minimalisme", "Batas waktu", "Catatan", "Refleksi", "Kecepatan"],
    'sejarah' => ["Revolusi", "Kerajaan", "Perang Dunia", "Penjelajahan", "Peradaban", "Kolonialisme", "Kemerdekaan", "Renaisans", "Peninggalan", "Candi", "Perjanjian", "Monarki", "Rute Sutra", "Reformasi", "Arsip", "Museum", "Tokoh", "Piramida", "Kekaisaran", "Pemberontakan"],
    'filosofi' => ["Stoikisme", "Etika", "Eksistensialisme", "Logika", "Keadilan", "Moral", "Kebenaran", "Kesadaran", "Kematian", "Makna hidup", "Determinisme", "Kebebasan", "Epikureanisme", "Skeptisisme", "Dualisme", "Altruisme", "Nihilisme", "Kebaikan", "Toleransi", "Empati"],
    'karier' => ["Wawancara", "Resume", "Negosiasi gaji", "Mentorship", "Promosi", "Resign", "Networking", "Soft skills", "Kepemimpinan", "Kerja tim", "Spesialisasi", "Generalis", "Portofolio", "Magang", "Keseimbangan kerja", "Umpan balik", "Burnout", "Presentasi", "Sertifikasi", "Adaptasi"],
    'relasi' => ["Komunikasi", "Kepercayaan", "Batasan", "Mendengarkan", "Konflik", "Kompromi", "Persahabatan", "Keluarga", "Rasa hormat", "Empati", "Kejujuran", "Pengampunan", "Dukungan", "Waktu berkualitas", "Apresiasi", "Harapan", "Kerapuhan", "Keterbukaan", "Koneksi", "Kesabaran"],
    'riset' => [
        "The Jakarta Method", "Newton's Laws", "Cloaca Maxima", "Efek Zeigarnik", "Paradoks Fermi",
        "Bias konfirmasi", "Hukum Goodhart", "Paradoks Simpson", "Efek Dunning-Kruger", "Kurva Laffer",
        "Dilema tahanan", "Hipotesis pasar efisien", "Aturan 72", "Entropi", "Prinsip ketidakpastian Heisenberg",
        "Seleksi kerabat", "Mikrobioma usus", "Neuroplastisitas", "Resistensi antibiotik", "Umpan balik iklim",
        "Perdagangan karbon", "Ekonomi sirkular", "Enkripsi kunci publik", "Gradient descent", "AI alignment",
        "Komputasi kuantum", "Hukum Moore", "Efek jaringan", "Rantai pasok semikonduktor", "Pendapatan dasar universal",
        "Koefisien Gini", "Kota 15 menit", "Transisi demografi", "Soft power", "Teori jendela pecah",
        "Krisis replikasi", "Placebo dan nocebo", "Heuristik ketersediaan", "Path dependence", "Antropocene",
        "Great Oxidation Event", "Kondratiev wave", "Efek Matthew", "Paradoks Abilene", "Streisand effect",
        "Lindy effect", "Hukum Parkinson", "Prinsip Pareto", "Occam's razor"
    ]
];

$cat = isset($_GET['cat']) ? trim($_GET['cat']) : 'umum';

if (!isset($topics[$cat])) {
    $cat = 'umum';
}

$pool = $topics[$cat];
$picked = $pool[array_rand($pool)];

echo json_encode([
    'status' => 'success',
    'category' => $cat,
    'topic' => $picked
], JSON_UNESCAPED_UNICODE);
