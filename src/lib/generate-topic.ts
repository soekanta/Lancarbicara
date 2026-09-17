import { createServerFn } from "@tanstack/react-start";

// ============================================================
// LABEL KATEGORI — untuk prompt yang kontekstual
// ============================================================
const categoryLabels: Record<string, string> = {
  umum: "topik umum sehari-hari",
  keuangan: "keuangan pribadi dan investasi",
  wirausaha: "kewirausahaan dan bisnis",
  startup: "startup dan dunia venture",
  teknologi: "teknologi, AI, dan digital",
  kebugaran: "kebugaran, olahraga, dan kesehatan fisik",
  nutrisi: "nutrisi, makanan, dan pola makan sehat",
  produktivitas: "produktivitas dan manajemen waktu",
  sejarah: "sejarah dunia dan peradaban",
  filosofi: "filosofi, etika, dan pemikiran",
  karier: "karier, pekerjaan, dan pengembangan profesional",
  relasi: "hubungan interpersonal, komunikasi, dan keluarga",
  riset: "konsep ilmiah, teori, dan fenomena lintas disiplin",
};

// Domain pool untuk rotasi — dipilih acak tiap request agar model tidak nempel di cluster yang sama
const IMPROMPTU_DOMAINS = [
  "transportasi dan perjalanan",
  "cuaca dan alam",
  "teknologi sehari-hari",
  "tempat umum dan fasilitas",
  "situasi sosial",
  "benda rumah tangga",
  "makanan dan minuman",
  "kesehatan ringan",
  "pekerjaan dan rutinitas",
  "hiburan dan waktu luang",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function nonce(): string {
  return Math.random().toString(36).slice(2, 8);
}

// Cek apakah dua topik cukup mirip (word-level, bukan substring karakter)
function normalizeTopic(topic: string): string {
  return topic
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()\-_/\\]/g, "")
    .replace(/\s+/g, " ");
}

function isSimilarTopic(a: string, b: string): boolean {
  const na = normalizeTopic(a);
  const nb = normalizeTopic(b);
  if (na === nb) return true;
  const tokensA = new Set(na.split(" "));
  const tokensB = new Set(nb.split(" "));
  const [smaller, larger] =
    tokensA.size <= tokensB.size ? [tokensA, tokensB] : [tokensB, tokensA];
  // Subset kata — "Tiket" ⊂ "Tiket Pesawat"
  if ([...smaller].every((t) => larger.has(t))) return true;
  // Overlap ratio
  const intersect = [...tokensA].filter((t) => tokensB.has(t)).length;
  const union = new Set([...tokensA, ...tokensB]).size;
  return intersect / union >= 0.6;
}

// ============================================================
// SERVER FUNCTION — dipanggil dari browser, dijalankan di server
// ============================================================
export const generateTopic = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = input as { cat?: string; exclude?: string[] };
    return {
      cat: typeof data?.cat === "string" ? data.cat : "umum",
      exclude: Array.isArray(data?.exclude) ? (data.exclude as string[]).slice(0, 8) : [],
    };
  })
  .handler(async ({ data }) => {
    const cat = data.cat;
    const exclude = data.exclude ?? [];
    const isRiset = cat === "riset";
    const label = categoryLabels[cat] || cat;

    const recentTopicsBlock =
      exclude.length > 0
        ? `Topik yang SUDAH PERNAH muncul baru-baru ini (JANGAN ulangi atau buat yang mirip tema):\n${exclude.join(", ")}\n\n`
        : "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { status: "error" as const, topic: "API Key belum dikonfigurasi", source: "error" as const };
    }

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const modelsToTry = Array.from(
      new Set([primaryModel, "gemini-3.5-flash-lite", "gemini-2.5-flash-lite"])
    );

    // Fungsi pembuat prompt — domain di-rotate acak tiap call
    function buildPrompt(): string {
      if (isRiset) {
        return (
          "Kamu adalah generator topik latihan presentasi untuk orang awam.\n\n" +
          recentTopicsBlock +
          "Tugas: Berikan TEPAT 1 topik baru yang sangat berbeda dari daftar di atas (jika ada).\n\n" +
          "Aturan ketat:\n" +
          "- Panjang: 1 sampai 4 kata.\n" +
          "- Bahasa: Gunakan Bahasa Indonesia jika ada padanan yang lazim dipakai orang awam. JANGAN terjemahkan paksa istilah asing yang sudah lebih dikenal dalam bahasa aslinya (contoh benar: \"Dunning-Kruger Effect\", \"Placebo Effect\", \"Confirmation Bias\". Contoh salah: \"Efek Mandor Bodoh\").\n" +
          "- Tingkat kesulitan: Cocok untuk dipresentasikan setelah riset singkat 10–20 menit. Harus mudah dipahami audiens umum, relevan dengan kehidupan nyata, dan punya sudut pandang menarik.\n" +
          "- Bidang boleh apa saja (sains, psikologi, teknologi, budaya, bisnis, sejarah, kesehatan, dll), TAPI hindari:\n" +
          "  • Topik terlalu teknis/niche/akademis\n" +
          "  • Jargon spesialis\n" +
          "  • Judul yang terdengar seperti paper ilmiah\n" +
          "  • Konsep yang terlalu abstrak atau butuh data kompleks\n\n" +
          "Contoh bagus:\n" +
          "- Efek Placebo\n- Ekonomi Perhatian\n- Tidur dan Memori\n- Dunning-Kruger Effect\n- Bahasa Punah\n- Bias Konfirmasi\n- Efek Bystander\n\n" +
          "Contoh jelek (JANGAN buat seperti ini):\n" +
          "- Biomimikri Arsitektur Regeneratif\n- Kriptobiosis Tardigrada\n- Epistemologi Postmodern\n- Teori String\n\n" +
          `PENTING KERAS:\nBalas HANYA dengan teks topiknya saja.\nTanpa tanda kutip, tanpa nomor, tanpa penjelasan, tanpa titik di akhir, tanpa kata tambahan apa pun.\n[req:${nonce()}]`
        );
      } else {
        const domain = pickRandom(IMPROMPTU_DOMAINS);
        return (
          "Kamu adalah generator topik latihan bicara spontan (impromptu speaking).\n\n" +
          `Kategori yang diminta: ${label}\n` +
          `Domain fokus kali ini: ${domain}\n\n` +
          recentTopicsBlock +
          "Tugas: Berikan TEPAT 1 topik baru yang sangat berbeda dari daftar di atas (jika ada), diarahkan ke domain fokus.\n\n" +
          "Aturan ketat:\n" +
          "- Panjang: 1 atau 2 kata saja.\n" +
          "- Harus konkret, mudah dibayangkan, dan bisa dibicarakan tanpa riset.\n" +
          "- Tetap relevan dengan kategori dan domain fokus di atas.\n" +
          "- Gunakan Bahasa Indonesia jika ada padanan yang lazim. Jangan terjemahkan paksa istilah yang lebih dikenal dalam bahasa aslinya.\n" +
          "- JANGAN menggabungkan dua konsep berbeda menjadi satu topik (contoh jelek: \"Hobi Makanan\", \"Kebiasaan Pagi\", \"Teknologi Masa Depan\").\n" +
          "- Hindari topik yang terlalu abstrak, filosofis, atau membutuhkan pengetahuan khusus.\n\n" +
          "Contoh bagus (tergantung kategori dan domain):\n" +
          "- Macet\n- Antrian\n- Hujan\n- Dompet\n- AC\n- Parkir\n- Kembalian\n\n" +
          "Contoh jelek (JANGAN buat seperti ini):\n" +
          "- Hobi Makanan\n- Kebiasaan Pagi\n- Dampak Media Sosial\n- Filosofi Hidup\n\n" +
          `PENTING KERAS:\nBalas HANYA dengan teks topiknya saja.\nTanpa tanda kutip, tanpa nomor, tanpa penjelasan, tanpa titik di akhir, tanpa kata tambahan apa pun.\n[req:${nonce()}]`
        );
      }
    }

    // Retry logic: coba sampai 2x kalau hasil mirip dengan history
    const MAX_TOPIC_RETRY = 2;

    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((r) => setTimeout(r, 400));
          }

          // Retry topik jika mirip history
          for (let topicAttempt = 0; topicAttempt <= MAX_TOPIC_RETRY; topicAttempt++) {
            const payload = JSON.stringify({
              contents: [{ parts: [{ text: buildPrompt() }] }],
              generationConfig: {
                temperature: isRiset ? 1.2 : 1.0,
                maxOutputTokens: 32,
              },
            });

            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: payload,
              signal: AbortSignal.timeout(8000),
            });

            if (!res.ok) {
              console.warn(`Gemini model ${model} attempt ${attempt + 1} error ${res.status}`);
              if (res.status === 503 || res.status === 429) break;
              break;
            }

            const json = (await res.json()) as {
              candidates?: { content?: { parts?: { text?: string }[] } }[];
            };
            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (text) {
              const cleaned = text.replace(/^[\"']+|[\"']+$/g, "").replace(/\.+$/, "").trim();
              if (cleaned) {
                // Kalau masih mirip history dan masih ada retry, coba lagi
                const isTooSimilar = exclude.some((t) => isSimilarTopic(t, cleaned));
                if (isTooSimilar && topicAttempt < MAX_TOPIC_RETRY) {
                  console.warn(`Topic "${cleaned}" too similar to history, retrying... (${topicAttempt + 1}/${MAX_TOPIC_RETRY})`);
                  continue;
                }
                return { status: "success" as const, topic: cleaned, source: "gemini" as const };
              }
            }
          }
        } catch (err) {
          console.warn(`Gemini API fetch error on model ${model} attempt ${attempt + 1}:`, err);
        }
      }
    }

    return {
      status: "error" as const,
      topic: "Server AI sedang sibuk. Silakan coba 'Ganti Topik' lagi.",
      source: "error" as const,
    };
  });
