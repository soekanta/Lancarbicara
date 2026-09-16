export type Category =
  | "umum"
  | "keuangan"
  | "wirausaha"
  | "startup"
  | "teknologi"
  | "kebugaran"
  | "nutrisi"
  | "produktivitas"
  | "sejarah"
  | "filosofi"
  | "karier"
  | "relasi";

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "umum", label: "Umum", emoji: "✦" },
  { id: "keuangan", label: "Keuangan Pribadi", emoji: "💰" },
  { id: "wirausaha", label: "Wirausaha", emoji: "🚀" },
  { id: "startup", label: "Startup", emoji: "🌱" },
  { id: "teknologi", label: "Teknologi / AI", emoji: "🤖" },
  { id: "kebugaran", label: "Kebugaran", emoji: "💪" },
  { id: "nutrisi", label: "Nutrisi", emoji: "🥗" },
  { id: "produktivitas", label: "Produktivitas", emoji: "⚡" },
  { id: "sejarah", label: "Sejarah", emoji: "📜" },
  { id: "filosofi", label: "Filosofi", emoji: "🏛️" },
  { id: "karier", label: "Karier", emoji: "💼" },
  { id: "relasi", label: "Relasi", emoji: "🤝" },
];

// Mode Spontan — 1 kata (maks. 2 kata) per topik
export const IMPROMPTU_TOPICS: Record<Category, string[]> = {
  umum: [
    "Kopi", "Hujan", "Liburan", "Musik", "Makanan", "Teman", "Keluarga",
    "Sepeda", "Pantai", "Gunung", "Buku", "Film", "Hobi", "Pagi", "Malam",
    "Rumah", "Kota", "Perjalanan", "Kenangan", "Mimpi", "Kucing",
    "Kendaraan", "Belanja", "Cuaca", "Festival", "Kereta", "Tidur",
    "Permainan", "Langit", "Jalanan",
  ],
  keuangan: [
    "Menabung", "Utang", "Investasi", "Anggaran", "Inflasi", "Pensiun",
    "Deposito", "Reksa dana", "Saham", "Asuransi", "Pajak", "Bunga",
    "Dana darurat", "Kredit", "Aset", "Pengeluaran", "Warisan", "Emas",
    "Properti", "Gaji",
  ],
  wirausaha: [
    "Pelanggan", "Modal", "Risiko", "Branding", "Pemasaran", "Harga",
    "Inovasi", "Pesaing", "Kegagalan", "Jaringan", "Skala", "Layanan",
    "Produk", "Pasar", "Kemitraan", "Arus kas", "Reputasi", "Lokasi",
    "Promosi", "Ketekunan",
  ],
  startup: [
    "Validasi", "Pitch", "Pendanaan", "MVP", "Pivot", "Traction",
    "Founder", "Burn rate", "Inkubator", "Angel", "Valuasi", "Bootstrap",
    "Pertumbuhan", "Retensi", "Ekosistem", "Exit", "Unicorn", "Demo day",
    "Cofounder", "Runway",
  ],
  teknologi: [
    "Kecerdasan buatan", "Robotika", "Internet", "Gadget", "Aplikasi",
    "Data", "Privasi", "Siber", "Komputasi awan", "Media sosial",
    "Gim", "Blockchain", "Otomatisasi", "Algoritma", "Satelit",
    "Layar", "Baterai", "Koding", "Cip", "Virtual reality",
  ],
  kebugaran: [
    "Lari", "Angkat beban", "Peregangan", "Kardio", "Otot", "Yoga",
    "Tidur", "Konsistensi", "Maraton", "Renang", "Postur", "Pemulihan",
    "Keringat", "Fleksibilitas", "Stamina", "Plank", "Langkah",
    "Pemanasan", "Disiplin", "Energi",
  ],
  nutrisi: [
    "Protein", "Karbo", "Serat", "Hidrasi", "Vitamin", "Gula", "Sarapan",
    "Puasa", "Kalori", "Sayur", "Buah", "Kafein", "Fermentasi",
    "Suplemen", "Lemak", "Porsi", "Rempah", "Jajanan", "Masakan",
    "Diet",
  ],
  produktivitas: [
    "Fokus", "Kebiasaan", "Tenggat", "Prioritas", "Prokrastinasi",
    "Jurnal", "Rutinitas", "Deep work", "Multitasking", "Istirahat",
    "Tujuan", "To-do list", "Pomodoro", "Motivasi", "Rapat", "Inbox",
    "Pagi hari", "Evaluasi", "Konsentrasi", "Batas",
  ],
  sejarah: [
    "Majapahit", "Kolonialisme", "Revolusi", "Sumpah", "Kerajaan",
    "Perdagangan", "Candi", "Naskah", "Pelabuhan", "Migrasi", "Perang",
    "Kemerdekaan", "Rempah", "Artefak", "Dinasti", "Konferensi",
    "Rel", "Pahlawan", "Peta", "Prasasti",
  ],
  filosofi: [
    "Kebebasan", "Waktu", "Kebenaran", "Keadilan", "Kebahagiaan",
    "Takdir", "Kematian", "Cinta", "Kesadaran", "Ego", "Moral",
    "Pilihan", "Identitas", "Kehampaan", "Keberanian", "Kesunyian",
    "Penderitaan", "Harapan", "Kejujuran", "Kekuasaan", "Keabadian",
    "Makna", "Tuhan", "Keraguan", "Keindahan", "Kesederhanaan",
    "Kesepian", "Kebijaksanaan", "Keterbatasan", "Pengampunan",
  ],
  karier: [
    "Kepemimpinan", "Presentasi", "Negosiasi", "Kerjasama", "Promosi",
    "Wawancara", "Konflik", "Klien", "Strategi", "Delegasi", "Etika",
    "Umpan balik", "Target", "Krisis", "Keputusan", "Persaingan",
    "Kepercayaan", "Adaptasi", "Resign", "Mentor",
  ],
  relasi: [
    "Persahabatan", "Kepercayaan", "Komunikasi", "Empati", "Batasan",
    "Keluarga", "Pasangan", "Konflik", "Maaf", "Kesetiaan", "Jarak",
    "Pendengar", "Kerendahan hati", "Dukungan", "Pertengkaran",
    "Tetangga", "Komunitas", "Pertemuan", "Perpisahan", "Penerimaan",
  ],
};

// Mode Riset Mendalam — 1–4 kata per topik
export const RESEARCH_TOPICS: string[] = [
  "The Jakarta Method",
  "Newton's Laws",
  "Cloaca Maxima",
  "Efek Zeigarnik",
  "Paradoks Fermi",
  "Bias konfirmasi",
  "Hukum Goodhart",
  "Paradoks Simpson",
  "Efek Dunning-Kruger",
  "Kurva Laffer",
  "Dilema tahanan",
  "Hipotesis pasar efisien",
  "Aturan 72",
  "Entropi",
  "Prinsip ketidakpastian Heisenberg",
  "Seleksi kerabat",
  "Mikrobioma usus",
  "Neuroplastisitas",
  "Resistensi antibiotik",
  "Umpan balik iklim",
  "Perdagangan karbon",
  "Ekonomi sirkular",
  "Enkripsi kunci publik",
  "Gradient descent",
  "AI alignment",
  "Komputasi kuantum",
  "Hukum Moore",
  "Efek jaringan",
  "Rantai pasok semikonduktor",
  "Pendapatan dasar universal",
  "Koefisien Gini",
  "Kota 15 menit",
  "Transisi demografi",
  "Soft power",
  "Teori jendela pecah",
  "Krisis replikasi",
  "Placebo dan nocebo",
  "Heuristik ketersediaan",
  "Path dependence",
  "Antropocene",
  "Great Oxidation Event",
  "Kondratiev wave",
  "Efek Matthew",
  "Paradoks Abilene",
  "Streisand effect",
  "Lindy effect",
  "Hukum Parkinson",
  "Prinsip Pareto",
  "Occam's razor",
];
