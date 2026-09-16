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
