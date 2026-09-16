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
export const generateTopic = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const data = input as { cat?: string };
    return { cat: typeof data?.cat === "string" ? data.cat : "umum" };
  })
  .handler(async ({ data }) => {
    const cat = data.cat;
    const isRiset = cat === "riset";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { status: "error" as const, topic: "API Key belum dikonfigurasi", source: "error" as const };
    }

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const modelsToTry = Array.from(
      new Set([primaryModel, "gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.7-flash", "gemini-flash-latest"])
    );
    const label = categoryLabels[cat] || cat;

    // Buat prompt sesuai mode
    let prompt: string;
    if (isRiset) {
      prompt =
        "Kamu adalah generator topik untuk latihan presentasi mendalam. " +
        "Berikan tepat 1 topik unik dan menarik untuk latihan presentasi riset. " +
        "Topik harus 1-4 kata, berupa konsep, teori, fenomena, atau ide menarik dari berbagai bidang ilmu. " +
        "Topik harus belum terlalu mainstream dan mendorong eksplorasi mendalam. " +
        "Gunakan Bahasa Indonesia (boleh campur istilah asing jika memang lazim). " +
        "PENTING: Balas HANYA dengan teks topiknya saja, tanpa tanda kutip, tanpa penjelasan.";
    } else {
      prompt =
        "Kamu adalah generator topik untuk latihan bicara spontan (impromptu speaking). " +
        `Kategori: ${label}. ` +
        "Berikan tepat 1 topik acak yang cocok untuk latihan bicara spontan dalam kategori tersebut. " +
        "Topik harus 1-2 kata saja dalam Bahasa Indonesia. " +
        "PENTING: Balas HANYA dengan teks topiknya saja, tanpa tanda kutip, tanpa penjelasan.";
    }

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1.4,
        maxOutputTokens: 32,
      },
    });

    let lastError = "";

    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          signal: AbortSignal.timeout(8000),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          console.warn(`Gemini model ${model} error ${res.status}:`, errText);
          lastError = `Gemini API (${model}): ${res.status}`;
          continue; // Coba model berikutnya jika 503 / busy
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
        console.warn(`Gemini API fetch error on model ${model}:`, err);
        lastError = "Gagal menghubungi API";
      }
    }

    return { status: "error" as const, topic: lastError || "API Gagal", source: "error" as const };
  });
