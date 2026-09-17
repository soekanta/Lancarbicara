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
    const excludeClause =
      exclude.length > 0
        ? ` Hindari topik yang sama atau terlalu mirip tema dengan topik-topik berikut yang sudah baru dipakai: ${exclude.join(", ")}.`
        : "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { status: "error" as const, topic: "API Key belum dikonfigurasi", source: "error" as const };
    }

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const modelsToTry = Array.from(
      new Set([primaryModel, "gemini-3.5-flash-lite", "gemini-2.5-flash-lite"])
    );
    const label = categoryLabels[cat] || cat;

    // Buat prompt sesuai mode
    let prompt: string;
    if (isRiset) {
      prompt =
        "Kamu adalah generator topik latihan presentasi untuk orang awam.\n\n" +
        "Tugas: Berikan TEPAT 1 topik saja.\n\n" +
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
        `PENTING KERAS:\nBalas HANYA dengan teks topiknya saja.\nTanpa tanda kutip, tanpa nomor, tanpa penjelasan, tanpa titik di akhir, tanpa kata tambahan apa pun.${excludeClause}`;
    } else {
      prompt =
        "Kamu adalah generator topik latihan bicara spontan (impromptu speaking).\n\n" +
        `Kategori yang diminta: ${label}\n\n` +
        "Tugas: Berikan TEPAT 1 topik acak yang cocok untuk dibicarakan secara spontan (1–2 menit) dalam kategori di atas.\n\n" +
        "Aturan ketat:\n" +
        "- Panjang: 1 atau 2 kata saja.\n" +
        "- Harus konkret, mudah dibayangkan, dan bisa dibicarakan tanpa riset.\n" +
        "- Gunakan Bahasa Indonesia jika ada padanan yang lazim. Jangan terjemahkan paksa istilah yang lebih dikenal dalam bahasa aslinya.\n" +
        "- JANGAN menggabungkan dua konsep berbeda menjadi satu topik (contoh jelek: \"Hobi Makanan\", \"Kebiasaan Pagi\", \"Teknologi Masa Depan\").\n" +
        "- Hindari topik yang terlalu abstrak, filosofis, atau membutuhkan pengetahuan khusus.\n\n" +
        "Contoh bagus (tergantung kategori):\n" +
        "- Kopi\n- Macet\n- Hujan\n- Smartphone\n- Tidur Siang\n- Antrian\n- Dompet\n\n" +
        "Contoh jelek (JANGAN buat seperti ini):\n" +
        "- Hobi Makanan\n- Kebiasaan Pagi\n- Dampak Media Sosial\n- Filosofi Hidup\n\n" +
        `PENTING KERAS:\nBalas HANYA dengan teks topiknya saja.\nTanpa tanda kutip, tanpa nomor, tanpa penjelasan, tanpa titik di akhir, tanpa kata tambahan apa pun.${excludeClause}`;
    }

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1.4,
        maxOutputTokens: 32,
      },
    });

    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      // Coba hingga 2x per model jika 503 / busy
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((r) => setTimeout(r, 400));
          }

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            signal: AbortSignal.timeout(8000),
          });

          if (!res.ok) {
            console.warn(`Gemini model ${model} attempt ${attempt + 1} error ${res.status}`);
            if (res.status === 503 || res.status === 429) {
              continue; // Retry percobaan kedua untuk model yang sama
            }
            break; // Jika error 404/400, pindah ke model berikutnya
          }

          const json = (await res.json()) as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
          };
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (text) {
            const cleaned = text.replace(/^["']+|["']+$/g, "").replace(/\.+$/, "").trim();
            if (cleaned) {
              return { status: "success" as const, topic: cleaned, source: "gemini" as const };
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
