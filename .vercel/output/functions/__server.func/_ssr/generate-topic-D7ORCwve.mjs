import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-topic-D7ORCwve.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var categoryLabels = {
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
	riset: "konsep ilmiah, teori, dan fenomena lintas disiplin"
};
var generateTopic_createServerFn_handler = createServerRpc({
	id: "1bea4e9f680e3df847651731d2ef1c6f6fa0da1b0eb097df44390fcf02819c1a",
	name: "generateTopic",
	filename: "src/lib/generate-topic.ts"
}, (opts) => generateTopic.__executeServer(opts));
var generateTopic = createServerFn({ method: "GET" }).validator((input) => {
	const data = input;
	return { cat: typeof data?.cat === "string" ? data.cat : "umum" };
}).handler(generateTopic_createServerFn_handler, async ({ data }) => {
	const cat = data.cat;
	const isRiset = cat === "riset";
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) return {
		status: "error",
		topic: "API Key belum dikonfigurasi",
		source: "error"
	};
	const primaryModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
	const modelsToTry = Array.from(/* @__PURE__ */ new Set([
		primaryModel,
		"gemini-3.6-flash",
		"gemini-2.0-flash",
		"gemini-1.5-flash",
		"gemini-flash-latest"
	]));
	const label = categoryLabels[cat] || cat;
	let prompt;
	if (isRiset) prompt = "Kamu adalah generator topik untuk latihan presentasi mendalam. Berikan tepat 1 topik unik dan menarik untuk latihan presentasi riset. Topik harus 1-4 kata, berupa konsep, teori, fenomena, atau ide menarik dari berbagai bidang ilmu. Topik harus belum terlalu mainstream dan mendorong eksplorasi mendalam. Gunakan Bahasa Indonesia (boleh campur istilah asing jika memang lazim). PENTING: Balas HANYA dengan teks topiknya saja, tanpa tanda kutip, tanpa penjelasan.";
	else prompt = `Kamu adalah generator topik untuk latihan bicara spontan (impromptu speaking). Kategori: ${label}. Berikan tepat 1 topik acak yang cocok untuk latihan bicara spontan dalam kategori tersebut. Topik harus 1-2 kata saja dalam Bahasa Indonesia. PENTING: Balas HANYA dengan teks topiknya saja, tanpa tanda kutip, tanpa penjelasan.`;
	const payload = JSON.stringify({
		contents: [{ parts: [{ text: prompt }] }],
		generationConfig: {
			temperature: 1.4,
			maxOutputTokens: 32
		}
	});
	for (const model of modelsToTry) {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
		for (let attempt = 0; attempt < 2; attempt++) try {
			if (attempt > 0) await new Promise((r) => setTimeout(r, 400));
			const res = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: payload,
				signal: AbortSignal.timeout(8e3)
			});
			if (!res.ok) {
				console.warn(`Gemini model ${model} attempt ${attempt + 1} error ${res.status}`);
				if (res.status === 503 || res.status === 429) continue;
				break;
			}
			const text = (await res.json())?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
			if (text) {
				const cleaned = text.replace(/^["']+|["']+$/g, "").replace(/\.+$/, "").trim();
				if (cleaned) return {
					status: "success",
					topic: cleaned,
					source: "gemini"
				};
			}
		} catch (err) {
			console.warn(`Gemini API fetch error on model ${model} attempt ${attempt + 1}:`, err);
		}
	}
	return {
		status: "error",
		topic: "Server AI sedang sibuk. Silakan coba 'Ganti Topik' lagi.",
		source: "error"
	};
});
//#endregion
export { generateTopic_createServerFn_handler };
