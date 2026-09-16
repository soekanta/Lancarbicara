import { r as __toESM } from "../_runtime.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-96G-fnto.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-fPkKhlCe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		id: "umum",
		label: "Umum",
		emoji: "✦"
	},
	{
		id: "keuangan",
		label: "Keuangan Pribadi",
		emoji: "💰"
	},
	{
		id: "wirausaha",
		label: "Wirausaha",
		emoji: "🚀"
	},
	{
		id: "startup",
		label: "Startup",
		emoji: "🌱"
	},
	{
		id: "teknologi",
		label: "Teknologi / AI",
		emoji: "🤖"
	},
	{
		id: "kebugaran",
		label: "Kebugaran",
		emoji: "💪"
	},
	{
		id: "nutrisi",
		label: "Nutrisi",
		emoji: "🥗"
	},
	{
		id: "produktivitas",
		label: "Produktivitas",
		emoji: "⚡"
	},
	{
		id: "sejarah",
		label: "Sejarah",
		emoji: "📜"
	},
	{
		id: "filosofi",
		label: "Filosofi",
		emoji: "🏛️"
	},
	{
		id: "karier",
		label: "Karier",
		emoji: "💼"
	},
	{
		id: "relasi",
		label: "Relasi",
		emoji: "🤝"
	}
];
var IMPROMPTU_TOPICS = {
	umum: [
		"Kopi",
		"Hujan",
		"Liburan",
		"Musik",
		"Makanan",
		"Teman",
		"Keluarga",
		"Sepeda",
		"Pantai",
		"Gunung",
		"Buku",
		"Film",
		"Hobi",
		"Pagi",
		"Malam",
		"Rumah",
		"Kota",
		"Perjalanan",
		"Kenangan",
		"Mimpi",
		"Kucing",
		"Kendaraan",
		"Belanja",
		"Cuaca",
		"Festival",
		"Kereta",
		"Tidur",
		"Permainan",
		"Langit",
		"Jalanan"
	],
	keuangan: [
		"Menabung",
		"Utang",
		"Investasi",
		"Anggaran",
		"Inflasi",
		"Pensiun",
		"Deposito",
		"Reksa dana",
		"Saham",
		"Asuransi",
		"Pajak",
		"Bunga",
		"Dana darurat",
		"Kredit",
		"Aset",
		"Pengeluaran",
		"Warisan",
		"Emas",
		"Properti",
		"Gaji"
	],
	wirausaha: [
		"Pelanggan",
		"Modal",
		"Risiko",
		"Branding",
		"Pemasaran",
		"Harga",
		"Inovasi",
		"Pesaing",
		"Kegagalan",
		"Jaringan",
		"Skala",
		"Layanan",
		"Produk",
		"Pasar",
		"Kemitraan",
		"Arus kas",
		"Reputasi",
		"Lokasi",
		"Promosi",
		"Ketekunan"
	],
	startup: [
		"Validasi",
		"Pitch",
		"Pendanaan",
		"MVP",
		"Pivot",
		"Traction",
		"Founder",
		"Burn rate",
		"Inkubator",
		"Angel",
		"Valuasi",
		"Bootstrap",
		"Pertumbuhan",
		"Retensi",
		"Ekosistem",
		"Exit",
		"Unicorn",
		"Demo day",
		"Cofounder",
		"Runway"
	],
	teknologi: [
		"Kecerdasan buatan",
		"Robotika",
		"Internet",
		"Gadget",
		"Aplikasi",
		"Data",
		"Privasi",
		"Siber",
		"Komputasi awan",
		"Media sosial",
		"Gim",
		"Blockchain",
		"Otomatisasi",
		"Algoritma",
		"Satelit",
		"Layar",
		"Baterai",
		"Koding",
		"Cip",
		"Virtual reality"
	],
	kebugaran: [
		"Lari",
		"Angkat beban",
		"Peregangan",
		"Kardio",
		"Otot",
		"Yoga",
		"Tidur",
		"Konsistensi",
		"Maraton",
		"Renang",
		"Postur",
		"Pemulihan",
		"Keringat",
		"Fleksibilitas",
		"Stamina",
		"Plank",
		"Langkah",
		"Pemanasan",
		"Disiplin",
		"Energi"
	],
	nutrisi: [
		"Protein",
		"Karbo",
		"Serat",
		"Hidrasi",
		"Vitamin",
		"Gula",
		"Sarapan",
		"Puasa",
		"Kalori",
		"Sayur",
		"Buah",
		"Kafein",
		"Fermentasi",
		"Suplemen",
		"Lemak",
		"Porsi",
		"Rempah",
		"Jajanan",
		"Masakan",
		"Diet"
	],
	produktivitas: [
		"Fokus",
		"Kebiasaan",
		"Tenggat",
		"Prioritas",
		"Prokrastinasi",
		"Jurnal",
		"Rutinitas",
		"Deep work",
		"Multitasking",
		"Istirahat",
		"Tujuan",
		"To-do list",
		"Pomodoro",
		"Motivasi",
		"Rapat",
		"Inbox",
		"Pagi hari",
		"Evaluasi",
		"Konsentrasi",
		"Batas"
	],
	sejarah: [
		"Majapahit",
		"Kolonialisme",
		"Revolusi",
		"Sumpah",
		"Kerajaan",
		"Perdagangan",
		"Candi",
		"Naskah",
		"Pelabuhan",
		"Migrasi",
		"Perang",
		"Kemerdekaan",
		"Rempah",
		"Artefak",
		"Dinasti",
		"Konferensi",
		"Rel",
		"Pahlawan",
		"Peta",
		"Prasasti"
	],
	filosofi: [
		"Kebebasan",
		"Waktu",
		"Kebenaran",
		"Keadilan",
		"Kebahagiaan",
		"Takdir",
		"Kematian",
		"Cinta",
		"Kesadaran",
		"Ego",
		"Moral",
		"Pilihan",
		"Identitas",
		"Kehampaan",
		"Keberanian",
		"Kesunyian",
		"Penderitaan",
		"Harapan",
		"Kejujuran",
		"Kekuasaan",
		"Keabadian",
		"Makna",
		"Tuhan",
		"Keraguan",
		"Keindahan",
		"Kesederhanaan",
		"Kesepian",
		"Kebijaksanaan",
		"Keterbatasan",
		"Pengampunan"
	],
	karier: [
		"Kepemimpinan",
		"Presentasi",
		"Negosiasi",
		"Kerjasama",
		"Promosi",
		"Wawancara",
		"Konflik",
		"Klien",
		"Strategi",
		"Delegasi",
		"Etika",
		"Umpan balik",
		"Target",
		"Krisis",
		"Keputusan",
		"Persaingan",
		"Kepercayaan",
		"Adaptasi",
		"Resign",
		"Mentor"
	],
	relasi: [
		"Persahabatan",
		"Kepercayaan",
		"Komunikasi",
		"Empati",
		"Batasan",
		"Keluarga",
		"Pasangan",
		"Konflik",
		"Maaf",
		"Kesetiaan",
		"Jarak",
		"Pendengar",
		"Kerendahan hati",
		"Dukungan",
		"Pertengkaran",
		"Tetangga",
		"Komunitas",
		"Pertemuan",
		"Perpisahan",
		"Penerimaan"
	]
};
var RESEARCH_TOPICS = [
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
	"Occam's razor"
];
/**
* Countdown berbasis Date.now() agar tetap akurat saat tab tidak aktif.
*/
function useCountdown(onComplete) {
	const [total, setTotal] = (0, import_react.useState)(0);
	const [remaining, setRemaining] = (0, import_react.useState)(0);
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const endAtRef = (0, import_react.useRef)(null);
	const completeRef = (0, import_react.useRef)(onComplete);
	completeRef.current = onComplete;
	(0, import_react.useEffect)(() => {
		if (!isRunning) return;
		const tick = () => {
			if (endAtRef.current === null) return;
			const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1e3));
			setRemaining(left);
			if (left <= 0) {
				setIsRunning(false);
				endAtRef.current = null;
				completeRef.current?.();
			}
		};
		tick();
		const id = setInterval(tick, 250);
		return () => clearInterval(id);
	}, [isRunning]);
	return {
		total,
		remaining,
		isRunning,
		start: (0, import_react.useCallback)((seconds) => {
			setTotal(seconds);
			setRemaining(seconds);
			endAtRef.current = Date.now() + seconds * 1e3;
			setIsRunning(true);
		}, []),
		pause: (0, import_react.useCallback)(() => {
			if (endAtRef.current === null) return;
			setRemaining(Math.max(0, Math.round((endAtRef.current - Date.now()) / 1e3)));
			endAtRef.current = null;
			setIsRunning(false);
		}, []),
		resume: (0, import_react.useCallback)(() => {
			setRemaining((r) => {
				endAtRef.current = Date.now() + r * 1e3;
				return r;
			});
			setIsRunning(true);
		}, []),
		stop: (0, import_react.useCallback)(() => {
			endAtRef.current = null;
			setIsRunning(false);
			setRemaining(0);
			setTotal(0);
		}, [])
	};
}
function formatTime(totalSeconds) {
	const safe = Math.max(0, totalSeconds);
	return `${Math.floor(safe / 60).toString().padStart(2, "0")}:${(safe % 60).toString().padStart(2, "0")}`;
}
function useRecorder() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const streamRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const cleanupStream = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
	}, []);
	const clear = (0, import_react.useCallback)(() => {
		if (urlRef.current) URL.revokeObjectURL(urlRef.current);
		urlRef.current = null;
		setAudioUrl(null);
		setStatus("idle");
	}, []);
	const start = (0, import_react.useCallback)(async () => {
		if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
			setStatus("unsupported");
			return false;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			const recorder = new MediaRecorder(stream);
			chunksRef.current = [];
			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};
			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
				if (urlRef.current) URL.revokeObjectURL(urlRef.current);
				const url = URL.createObjectURL(blob);
				urlRef.current = url;
				setAudioUrl(url);
				setStatus("stopped");
				cleanupStream();
			};
			recorder.start();
			recorderRef.current = recorder;
			setStatus("recording");
			return true;
		} catch {
			setStatus("denied");
			cleanupStream();
			return false;
		}
	}, [cleanupStream]);
	const stop = (0, import_react.useCallback)(() => {
		const rec = recorderRef.current;
		if (rec && rec.state !== "inactive") rec.stop();
		recorderRef.current = null;
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			recorderRef.current?.state !== "inactive" && recorderRef.current?.stop();
			cleanupStream();
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
		};
	}, [cleanupStream]);
	return {
		status,
		audioUrl,
		start,
		stop,
		clear
	};
}
function TimerRing({ remaining, total, label, size = 200 }) {
	const radius = (size - 14) / 2;
	const circumference = 2 * Math.PI * radius;
	const progress = total > 0 ? remaining / total : 0;
	const urgent = remaining <= 10 && remaining > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex items-center justify-center",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r: radius,
				fill: "none",
				strokeWidth: 10,
				className: "stroke-secondary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r: radius,
				fill: "none",
				strokeWidth: 10,
				strokeLinecap: "round",
				strokeDasharray: circumference,
				strokeDashoffset: circumference * (1 - progress),
				className: `transition-[stroke-dashoffset] duration-300 ease-linear ${urgent ? "stroke-stopwatch" : "stroke-primary"}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute flex flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-4xl font-bold tabular-nums tracking-tight sm:text-5xl ${urgent ? "text-stopwatch" : "text-foreground"}`,
				children: formatTime(remaining)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
				children: label
			})]
		})]
	});
}
function RecordingPanel({ audioUrl, status, onClear }) {
	if (status === "denied") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Akses mikrofon ditolak. Latihan tetap bisa dilanjutkan tanpa rekaman."
	});
	if (status === "unsupported") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Peramban ini belum mendukung perekaman suara."
	});
	if (!audioUrl) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			controls: true,
			src: audioUrl,
			className: "w-full max-w-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: audioUrl,
				download: `lancarbicara-${Date.now()}.webm`,
				className: "rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition hover:brightness-95",
				children: "Unduh rekaman"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClear,
				className: "rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground",
				children: "Hapus"
			})]
		})]
	});
}
function CategorySelect({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const rootRef = (0, import_react.useRef)(null);
	const active = CATEGORIES.find((c) => c.id === value) ?? CATEGORIES[0];
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onPointerDown(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
		}
		function onKeyDown(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-haspopup": "listbox",
			"aria-expanded": open,
			onClick: () => setOpen((o) => !o),
			className: "flex min-w-56 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-base font-bold shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition hover:brightness-98 active:scale-[0.98]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "text-primary",
					children: active.emoji
				}), active.label]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": true,
				className: `text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			role: "listbox",
			"aria-label": "Kategori topik",
			className: "absolute left-1/2 z-30 mt-2 max-h-80 w-64 -translate-x-1/2 overflow-y-auto rounded-2xl border border-border bg-card p-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.14)]",
			children: CATEGORIES.map((c) => {
				const selected = c.id === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": selected,
					onClick: () => {
						onChange(c.id);
						setOpen(false);
					},
					className: `flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${selected ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: c.emoji
					}), c.label]
				}) }, c.id);
			})
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateTopic = createServerFn({ method: "GET" }).validator((input) => {
	const data = input;
	return { cat: typeof data?.cat === "string" ? data.cat : "umum" };
}).handler(createSsrRpc("1bea4e9f680e3df847651731d2ef1c6f6fa0da1b0eb097df44390fcf02819c1a"));
var VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.id));
var PREP_OPTIONS = {
	impromptu: [
		{
			label: "Tanpa persiapan",
			seconds: 0
		},
		{
			label: "15 dtk",
			seconds: 15
		},
		{
			label: "30 dtk",
			seconds: 30
		},
		{
			label: "1 mnt",
			seconds: 60
		},
		{
			label: "2 mnt",
			seconds: 120
		},
		{
			label: "5 mnt",
			seconds: 300
		}
	],
	research: [
		{
			label: "1 mnt",
			seconds: 60
		},
		{
			label: "5 mnt",
			seconds: 300
		},
		{
			label: "10 mnt",
			seconds: 600
		},
		{
			label: "20 mnt",
			seconds: 1200
		},
		{
			label: "30 mnt",
			seconds: 1800
		},
		{
			label: "60 mnt",
			seconds: 3600
		}
	]
};
var SPEAK_OPTIONS = {
	impromptu: [
		{
			label: "1 mnt",
			seconds: 60
		},
		{
			label: "2 mnt",
			seconds: 120
		},
		{
			label: "3 mnt",
			seconds: 180
		},
		{
			label: "5 mnt",
			seconds: 300
		}
	],
	research: [
		{
			label: "1 mnt",
			seconds: 60
		},
		{
			label: "2 mnt",
			seconds: 120
		},
		{
			label: "5 mnt",
			seconds: 300
		},
		{
			label: "10 mnt",
			seconds: 600
		}
	]
};
var STORAGE_KEY = "lancarbicara:v2";
function playChime() {
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return;
		const ctx = new Ctx();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sine";
		osc.frequency.value = 880;
		gain.gain.setValueAtTime(1e-4, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(.25, ctx.currentTime + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .9);
		osc.connect(gain).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + 1);
		setTimeout(() => void ctx.close(), 1200);
	} catch {}
}
/** Suara klik pendek ala mesin slot — pitch naik seiring progress (0→1). */
function playSpinTick(progress) {
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return;
		const ctx = new Ctx();
		const t = ctx.currentTime;
		const bufferSize = ctx.sampleRate * .02;
		const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 8);
		const noise = ctx.createBufferSource();
		noise.buffer = buffer;
		const filter = ctx.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = 1200 + progress * 3e3;
		filter.Q.value = 2;
		const gain = ctx.createGain();
		const vol = .15 + progress * .2;
		gain.gain.setValueAtTime(vol, t);
		gain.gain.exponentialRampToValueAtTime(.001, t + .04);
		noise.connect(filter).connect(gain).connect(ctx.destination);
		noise.start(t);
		noise.stop(t + .04);
		const osc = ctx.createOscillator();
		const oscGain = ctx.createGain();
		osc.type = "triangle";
		osc.frequency.value = 600 + progress * 800;
		oscGain.gain.setValueAtTime(vol * .5, t);
		oscGain.gain.exponentialRampToValueAtTime(.001, t + .03);
		osc.connect(oscGain).connect(ctx.destination);
		osc.start(t);
		osc.stop(t + .03);
		setTimeout(() => void ctx.close(), 200);
	} catch {}
}
/** Suara "ding" pendek saat topik terpilih — kesan reveal yang memuaskan. */
function playSpinReveal() {
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return;
		const ctx = new Ctx();
		const t = ctx.currentTime;
		const osc1 = ctx.createOscillator();
		const g1 = ctx.createGain();
		osc1.type = "sine";
		osc1.frequency.value = 784;
		g1.gain.setValueAtTime(1e-4, t);
		g1.gain.exponentialRampToValueAtTime(.3, t + .01);
		g1.gain.exponentialRampToValueAtTime(1e-4, t + .5);
		osc1.connect(g1).connect(ctx.destination);
		osc1.start(t);
		osc1.stop(t + .5);
		const osc2 = ctx.createOscillator();
		const g2 = ctx.createGain();
		osc2.type = "sine";
		osc2.frequency.value = 1175;
		g2.gain.setValueAtTime(1e-4, t + .08);
		g2.gain.exponentialRampToValueAtTime(.25, t + .09);
		g2.gain.exponentialRampToValueAtTime(1e-4, t + .6);
		osc2.connect(g2).connect(ctx.destination);
		osc2.start(t + .08);
		osc2.stop(t + .6);
		setTimeout(() => void ctx.close(), 800);
	} catch {}
}
function pillClass(active) {
	return `rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`;
}
function Index() {
	const [mode, setMode] = (0, import_react.useState)("impromptu");
	const [category, setCategory] = (0, import_react.useState)("umum");
	const [prepSeconds, setPrepSeconds] = (0, import_react.useState)(30);
	const [speakSeconds, setSpeakSeconds] = (0, import_react.useState)(60);
	const [recordEnabled, setRecordEnabled] = (0, import_react.useState)(true);
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [topic, setTopic] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [spinText, setSpinText] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const usedRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const stageRef = (0, import_react.useRef)("idle");
	stageRef.current = stage;
	const recorder = useRecorder();
	const timer = useCountdown((0, import_react.useCallback)(() => {
		playChime();
		if (stageRef.current === "prep") setStage("ready");
		else if (stageRef.current === "speaking") {
			recorder.stop();
			setStage("done");
		}
	}, [recorder]));
	(0, import_react.useEffect)(() => {
		setHydrated(true);
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved.mode) setMode(saved.mode);
			if (saved.category && VALID_CATEGORIES.has(saved.category)) setCategory(saved.category);
			if (typeof saved.prepSeconds === "number") setPrepSeconds(saved.prepSeconds);
			if (typeof saved.speakSeconds === "number") setSpeakSeconds(saved.speakSeconds);
			if (typeof saved.recordEnabled === "boolean") setRecordEnabled(saved.recordEnabled);
			if (Array.isArray(saved.history)) setHistory(saved.history);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				mode,
				category,
				prepSeconds,
				speakSeconds,
				recordEnabled,
				history
			}));
		} catch {}
	}, [
		hydrated,
		mode,
		category,
		prepSeconds,
		speakSeconds,
		recordEnabled,
		history
	]);
	(0, import_react.useEffect)(() => {
		if (hydrated && topic === null && stage === "idle") setTopic(pickLocal());
	}, [hydrated]);
	function localPool() {
		return mode === "research" ? RESEARCH_TOPICS : IMPROMPTU_TOPICS[category];
	}
	function pickLocal() {
		const pool = localPool();
		const fresh = pool.filter((t) => !usedRef.current.has(t));
		const list = fresh.length > 0 ? fresh : (usedRef.current.clear(), pool);
		const picked = list[Math.floor(Math.random() * list.length)];
		usedRef.current.add(picked);
		return picked;
	}
	async function fetchTopic() {
		try {
			const data = await generateTopic({ data: { cat: mode === "research" ? "riset" : category } });
			if (data.status === "success" && data.topic.trim()) return data.topic;
			throw new Error(data.topic || "Format tidak valid");
		} catch {
			return pickLocal();
		}
	}
	function resetRound() {
		timer.stop();
		recorder.stop();
		recorder.clear();
		setStage("idle");
	}
	async function drawTopic() {
		setIsLoading(true);
		timer.stop();
		recorder.clear();
		const pool = localPool();
		let result = null;
		const fetchPromise = fetchTopic().then((t) => {
			result = t;
		});
		const spinStart = performance.now();
		await new Promise((resolve) => {
			const tick = () => {
				const elapsed = performance.now() - spinStart;
				if (elapsed >= 1100 && result !== null) {
					setSpinText(null);
					resolve();
					return;
				}
				setSpinText(pool[Math.floor(Math.random() * pool.length)]);
				const t = Math.min(elapsed / 1100, 1);
				playSpinTick(t);
				setTimeout(tick, 50 + t * t * 260);
			};
			tick();
		});
		await fetchPromise;
		const next = result;
		setTopic(next);
		playSpinReveal();
		setHistory((h) => [next, ...h.filter((t) => t !== next)].slice(0, 8));
		setIsLoading(false);
		if (prepSeconds > 0) {
			setStage("prep");
			timer.start(prepSeconds);
		} else setStage("ready");
	}
	async function startSpeaking() {
		if (recordEnabled) await recorder.start();
		setStage("speaking");
		timer.start(speakSeconds);
	}
	function finishEarly() {
		timer.stop();
		recorder.stop();
		playChime();
		setStage("done");
	}
	const prepLabel = mode === "research" ? "Riset" : "Persiapan";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 pt-8 sm:flex-row sm:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-lg font-bold tracking-tight",
						children: ["Lancar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "bicara"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Mode latihan",
						className: "flex items-center gap-1 rounded-full bg-secondary p-1",
						children: [{
							id: "impromptu",
							label: "Spontan"
						}, {
							id: "research",
							label: "Riset Mendalam"
						}].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								if (m.id === mode) return;
								setMode(m.id);
								usedRef.current.clear();
								setTopic(null);
								resetRound();
								setPrepSeconds(m.id === "research" ? 600 : 30);
								setSpeakSeconds(m.id === "research" ? 120 : 60);
							},
							"aria-pressed": mode === m.id,
							className: pillClass(mode === m.id),
							children: m.label
						}, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: recordEnabled,
							onChange: (e) => setRecordEnabled(e.target.checked),
							className: "size-4 accent-[color:var(--primary)]"
						}), "Rekam suara"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-10",
				children: [
					stage === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full flex-col items-center gap-5",
						children: [mode === "impromptu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySelect, {
							value: category,
							onChange: (c) => {
								setCategory(c);
								usedRef.current.clear();
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full flex-col gap-4 sm:flex-row sm:justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
									className: "mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: ["Waktu ", prepLabel]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap justify-center gap-2",
									children: PREP_OPTIONS[mode].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setPrepSeconds(o.seconds),
										"aria-pressed": prepSeconds === o.seconds,
										className: `rounded-full border px-3 py-1.5 text-sm font-semibold transition ${prepSeconds === o.seconds ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`,
										children: o.label
									}, o.seconds))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: "Waktu Bicara"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap justify-center gap-2",
									children: SPEAK_OPTIONS[mode].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSpeakSeconds(o.seconds),
										"aria-pressed": speakSeconds === o.seconds,
										className: `rounded-full border px-3 py-1.5 text-sm font-semibold transition ${speakSeconds === o.seconds ? "border-stopwatch bg-stopwatch/10 text-stopwatch" : "border-border text-muted-foreground hover:text-foreground"}`,
										children: o.label
									}, o.seconds))
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full rounded-3xl bg-card p-10 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-14",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"aria-busy": "true",
							className: "animate-pulse text-center text-3xl font-bold leading-snug text-muted-foreground sm:text-5xl",
							children: spinText ?? "…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-3xl font-bold leading-snug transition-opacity duration-300 sm:text-5xl",
							children: topic ?? "…"
						})
					}),
					(stage === "prep" || stage === "speaking") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerRing, {
						remaining: timer.remaining,
						total: timer.total,
						label: stage === "prep" ? prepLabel : "Bicara"
					}),
					stage === "speaking" && recorder.status === "recording" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm font-semibold text-stopwatch",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2 animate-pulse rounded-full bg-stopwatch" }), "Merekam…"]
					}),
					stage === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordingPanel, {
						audioUrl: recorder.audioUrl,
						status: recorder.status,
						onClear: recorder.clear
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-3",
						children: [
							stage === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: drawTopic,
								disabled: isLoading,
								className: "rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition-all duration-150 hover:brightness-90 active:scale-95 disabled:opacity-70",
								children: isLoading ? "Memuat…" : "Putar ✨"
							}),
							stage === "prep" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: timer.isRunning ? timer.pause : timer.resume,
								className: "rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95",
								children: timer.isRunning ? "Jeda" : "Lanjut"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									timer.stop();
									setStage("ready");
								},
								className: "rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition hover:brightness-90 active:scale-95",
								children: "Lewati, siap bicara"
							})] }),
							stage === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: startSpeaking,
								className: "rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition hover:brightness-90 active:scale-95",
								children: [
									"Mulai Bicara (",
									formatTime(speakSeconds),
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: resetRound,
								className: "rounded-full px-6 py-3 text-base font-semibold text-muted-foreground transition hover:text-foreground",
								children: "Batal"
							})] }),
							stage === "speaking" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: timer.isRunning ? timer.pause : timer.resume,
								className: "rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95",
								children: timer.isRunning ? "Jeda" : "Lanjut"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: finishEarly,
								className: "rounded-full bg-stopwatch px-6 py-3 text-base font-bold text-white transition hover:brightness-95 active:scale-95",
								children: "Selesai"
							})] }),
							stage === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										recorder.clear();
										drawTopic();
									},
									className: "rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition hover:brightness-90 active:scale-95",
									children: "Topik Baru ✨"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										recorder.clear();
										setStage("ready");
									},
									className: "rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95",
									children: "Ulangi topik ini"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: resetRound,
									className: "rounded-full px-6 py-3 text-base font-semibold text-muted-foreground transition hover:text-foreground",
									children: "Ubah pengaturan"
								})
							] })
						]
					})
				]
			}),
			hydrated && history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-3xl px-6 pb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Topik terakhir"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "truncate rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-[0_1px_6px_rgba(15,23,42,0.04)]",
						children: h
					}, `${h}-${i}`))
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
