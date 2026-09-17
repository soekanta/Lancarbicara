import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  type Category,
} from "@/data/topics";
const VALID_CATEGORIES = new Set<string>(CATEGORIES.map((c) => c.id));
import { formatTime, useCountdown } from "@/hooks/useCountdown";
import { useRecorder } from "@/hooks/useRecorder";
import { TimerRing } from "@/components/TimerRing";
import { RecordingPanel } from "@/components/RecordingPanel";
import { CategorySelect } from "@/components/CategorySelect";
import { SlotSpinner } from "@/components/SlotSpinner";
import { generateTopic } from "@/lib/generate-topic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lancarbicara — Latihan Bicara dari Topik Acak" },
      {
        name: "description",
        content:
          "Tarik topik acak, atur waktu persiapan atau riset, lalu bicara sambil direkam. Latihan public speaking gratis, langsung di peramban.",
      },
      { property: "og:title", content: "Lancarbicara — Latihan Bicara dari Topik Acak" },
      {
        property: "og:description",
        content:
          "Topik acak, timer persiapan dan bicara, plus rekaman suara untuk didengarkan ulang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Mode = "impromptu" | "research";
type Stage = "idle" | "prep" | "ready" | "speaking" | "done";

const PREP_OPTIONS: Record<Mode, { label: string; seconds: number }[]> = {
  impromptu: [
    { label: "Tanpa persiapan", seconds: 0 },
    { label: "15 dtk", seconds: 15 },
    { label: "30 dtk", seconds: 30 },
    { label: "1 mnt", seconds: 60 },
    { label: "2 mnt", seconds: 120 },
    { label: "5 mnt", seconds: 300 },
  ],
  research: [
    { label: "1 mnt", seconds: 60 },
    { label: "5 mnt", seconds: 300 },
    { label: "10 mnt", seconds: 600 },
    { label: "20 mnt", seconds: 1200 },
    { label: "30 mnt", seconds: 1800 },
    { label: "60 mnt", seconds: 3600 },
  ],
};

const SPEAK_OPTIONS: Record<Mode, { label: string; seconds: number }[]> = {
  impromptu: [
    { label: "1 mnt", seconds: 60 },
    { label: "2 mnt", seconds: 120 },
    { label: "3 mnt", seconds: 180 },
    { label: "5 mnt", seconds: 300 },
  ],
  research: [
    { label: "1 mnt", seconds: 60 },
    { label: "2 mnt", seconds: 120 },
    { label: "5 mnt", seconds: 300 },
    { label: "10 mnt", seconds: 600 },
  ],
};

const STORAGE_KEY = "lancarbicara:v2";

function playChime() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    /* abaikan */
  }
}

/* playSpinTick dihapus — suara tick sekarang di dalam komponen SlotSpinner */

/** Suara "ding" pendek saat topik terpilih — kesan reveal yang memuaskan. */
function playSpinReveal() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const t = ctx.currentTime;

    // Nada pertama — ding rendah
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = 784; // G5
    g1.gain.setValueAtTime(0.0001, t);
    g1.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
    g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc1.connect(g1).connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.5);

    // Nada kedua — ding tinggi, sedikit delay
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = 1175; // D6
    g2.gain.setValueAtTime(0.0001, t + 0.08);
    g2.gain.exponentialRampToValueAtTime(0.25, t + 0.09);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    osc2.connect(g2).connect(ctx.destination);
    osc2.start(t + 0.08);
    osc2.stop(t + 0.6);

    setTimeout(() => void ctx.close(), 800);
  } catch {
    /* abaikan */
  }
}

function pillClass(active: boolean) {
  return `rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
    active
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-muted-foreground hover:text-foreground"
  }`;
}

function Index() {
  const [mode, setMode] = useState<Mode>("impromptu");
  const [category, setCategory] = useState<Category>("umum");
  const [prepSeconds, setPrepSeconds] = useState(30);
  const [speakSeconds, setSpeakSeconds] = useState(60);
  const [recordEnabled, setRecordEnabled] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [topic, setTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const usedRef = useRef<Set<string>>(new Set());
  const stageRef = useRef<Stage>("idle");
  stageRef.current = stage;

  const recorder = useRecorder();

  const handleComplete = useCallback(() => {
    playChime();
    if (stageRef.current === "prep") {
      setStage("ready");
    } else if (stageRef.current === "speaking") {
      recorder.stop();
      setStage("done");
    }
  }, [recorder]);

  const timer = useCountdown(handleComplete);

  // Muat preferensi & riwayat dari perangkat
  useEffect(() => {
    setHydrated(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        mode: Mode;
        category: Category;
        prepSeconds: number;
        speakSeconds: number;
        recordEnabled: boolean;
        history: string[];
      }>;
      if (saved.mode) setMode(saved.mode);
      if (saved.category && VALID_CATEGORIES.has(saved.category)) setCategory(saved.category);
      if (typeof saved.prepSeconds === "number") setPrepSeconds(saved.prepSeconds);
      if (typeof saved.speakSeconds === "number") setSpeakSeconds(saved.speakSeconds);
      if (typeof saved.recordEnabled === "boolean") setRecordEnabled(saved.recordEnabled);
      if (Array.isArray(saved.history)) setHistory(saved.history);
    } catch {
      /* abaikan */
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, category, prepSeconds, speakSeconds, recordEnabled, history })
      );
    } catch {
      /* abaikan */
    }
  }, [hydrated, mode, category, prepSeconds, speakSeconds, recordEnabled, history]);

const INITIAL_COOL_WORDS = [
  "Cakrawala",
  "Resonansi",
  "Perspektif",
  "Eksplorasi",
  "Paradoks",
  "Sinergi",
  "Inovasi",
  "Wawasan",
  "Inspirasi",
  "Dinamika",
  "Kreativitas",
  "Visi",
  "Manifesto",
  "Refleksi",
  "Spektrum",
];

function pickCoolWord(): string {
  return INITIAL_COOL_WORDS[Math.floor(Math.random() * INITIAL_COOL_WORDS.length)];
}

const SPINNER_POOL = [
  "Eksplorasi",
  "Gagasan",
  "Perspektif",
  "Strategi",
  "Wawasan",
  "Inovasi",
  "Dinamika",
  "Konsep",
  "Teori",
  "Analisis",
  "Refleksi",
  "Visi",
];

  // Tampilkan kata keren acak saat halaman pertama dibuka
  useEffect(() => {
    if (hydrated && topic === null && stage === "idle") {
      setTopic(pickCoolWord());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  async function fetchTopic(overrideMode?: Mode, overrideCategory?: Category): Promise<string> {
    try {
      const m = overrideMode ?? mode;
      const c = overrideCategory ?? category;
      const query = m === "research" ? "riset" : c;
      const data = await generateTopic({ data: { cat: query, exclude: history.slice(0, 3) } });
      if (data && data.status === "success" && data.topic && data.topic.trim()) {
        return data.topic;
      }
      if (data && data.topic) {
        return data.topic;
      }
      return "Gagal mengambil topik AI";
    } catch {
      return "Gagal mengambil topik AI";
    }
  }

  function resetRound() {
    timer.stop();
    recorder.stop();
    recorder.clear();
    setStage("idle");
    setIsLoading(false);
    setSpinResult(null);
    setHasSpun(false);
  }

  async function drawTopic() {
    setIsLoading(true);
    setSpinResult(null);
    timer.stop();
    recorder.clear();

    const currentM = mode;
    const currentC = category;

    fetchTopic(currentM, currentC).then((t) => {
      setSpinResult(t);
    });
  }

  /** Dipanggil oleh SlotSpinner setelah animasi selesai sempurna */
  function handleSpinComplete() {
    if (!spinResult) return;
    const next = spinResult;
    setTopic(next);
    setHasSpun(true);
    playSpinReveal();
    if (!next.includes("sibuk") && !next.includes("Gagal") && !next.includes("API")) {
      setHistory((h) => [next, ...h.filter((t) => t.toLowerCase() !== next.toLowerCase())].slice(0, 8));
    }
    setIsLoading(false);
    setSpinResult(null);

    if (prepSeconds > 0) {
      setStage("prep");
      timer.start(prepSeconds);
    } else {
      setStage("ready");
    }
  }

  /** Re-roll: ambil topik baru dari AI tanpa mengubah stage */
  async function reroll() {
    setIsLoading(true);
    setSpinResult(null);
    timer.stop();

    const currentM = mode;
    const currentC = category;

    fetchTopic(currentM, currentC).then((t) => {
      setSpinResult(t);
    });
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

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 pt-8 sm:flex-row sm:justify-between">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
          Lancar<span className="text-primary">bicara</span>
        </h1>

        <nav
          aria-label="Mode latihan"
          className="flex items-center gap-1 rounded-full bg-secondary p-1"
        >
          {(
            [
              { id: "impromptu", label: "Spontan" },
              { id: "research", label: "Riset Mendalam" },
            ] as { id: Mode; label: string }[]
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => {
                if (m.id === mode) return;
                setMode(m.id);
                usedRef.current.clear();
                resetRound();
                setTopic(pickCoolWord());
                setPrepSeconds(m.id === "research" ? 600 : 30);
                setSpeakSeconds(m.id === "research" ? 120 : 60);
              }}
              aria-pressed={mode === m.id}
              className={pillClass(mode === m.id)}
            >
              {m.label}
            </button>
          ))}
        </nav>

        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={recordEnabled}
            onChange={(e) => setRecordEnabled(e.target.checked)}
            className="size-4 accent-[color:var(--primary)]"
          />
          Rekam suara
        </label>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
        {/* Pengaturan */}
        {stage === "idle" && (
          <div className="flex w-full flex-col items-center gap-5">
            {mode === "impromptu" && (
              <CategorySelect
                value={category}
                onChange={(c) => {
                  setCategory(c);
                  usedRef.current.clear();
                  if (stage === "idle" && !isLoading) {
                    setTopic(pickCoolWord());
                  }
                }}
              />
            )}

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
              <fieldset className="flex flex-col items-center gap-2">
                <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Waktu {prepLabel}
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {PREP_OPTIONS[mode].map((o) => (
                    <button
                      key={o.seconds}
                      onClick={() => setPrepSeconds(o.seconds)}
                      aria-pressed={prepSeconds === o.seconds}
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                        prepSeconds === o.seconds
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="flex flex-col items-center gap-2">
                <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Waktu Bicara
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {SPEAK_OPTIONS[mode].map((o) => (
                    <button
                      key={o.seconds}
                      onClick={() => setSpeakSeconds(o.seconds)}
                      aria-pressed={speakSeconds === o.seconds}
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                        speakSeconds === o.seconds
                          ? "border-stopwatch bg-stopwatch/10 text-stopwatch"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {/* Kartu topik */}
        <div className="w-full rounded-3xl bg-card p-10 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-14">
          {isLoading ? (
            <SlotSpinner
              pool={SPINNER_POOL}
              finalTopic={spinResult}
              onComplete={handleSpinComplete}
            />
          ) : (
            <p className="text-center text-3xl font-bold leading-snug transition-opacity duration-300 sm:text-5xl">
              {topic ?? "…"}
            </p>
          )}
        </div>

        {/* Tombol Re-roll — hanya muncul setelah spin pertama selesai */}
        {!isLoading && hasSpun && topic && stage !== "speaking" && (
          <button
            onClick={reroll}
            disabled={isLoading}
            className="btn-reroll"
            title="Ganti topik"
          >
            <span className="reroll-icon">🔄</span> Ganti Topik
          </button>
        )}

        {/* Tahap aktif */}
        {(stage === "prep" || stage === "speaking") && (
          <TimerRing
            remaining={timer.remaining}
            total={timer.total}
            label={stage === "prep" ? prepLabel : "Bicara"}
          />
        )}

        {stage === "speaking" && recorder.status === "recording" && (
          <p className="flex items-center gap-2 text-sm font-semibold text-stopwatch">
            <span className="inline-block size-2 animate-pulse rounded-full bg-stopwatch" />
            Merekam…
          </p>
        )}

        {stage === "done" && (
          <RecordingPanel
            audioUrl={recorder.audioUrl}
            status={recorder.status}
            onClear={recorder.clear}
          />
        )}

        {/* Kontrol */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {stage === "idle" && (
            <button
              onClick={drawTopic}
              disabled={isLoading}
              className="rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition-all duration-150 hover:brightness-90 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? "Memuat…" : "Putar ✨"}
            </button>
          )}

          {stage === "prep" && (
            <>
              <button
                onClick={timer.isRunning ? timer.pause : timer.resume}
                className="rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95"
              >
                {timer.isRunning ? "Jeda" : "Lanjut"}
              </button>
              <button
                onClick={() => {
                  timer.stop();
                  setStage("ready");
                }}
                className="rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition hover:brightness-90 active:scale-95"
              >
                Lewati, siap bicara
              </button>
            </>
          )}

          {stage === "ready" && (
            <>
              <button
                onClick={startSpeaking}
                className="rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition hover:brightness-90 active:scale-95"
              >
                Mulai Bicara ({formatTime(speakSeconds)})
              </button>
              <button
                onClick={resetRound}
                className="rounded-full px-6 py-3 text-base font-semibold text-muted-foreground transition hover:text-foreground"
              >
                Batal
              </button>
            </>
          )}

          {stage === "speaking" && (
            <>
              <button
                onClick={timer.isRunning ? timer.pause : timer.resume}
                className="rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95"
              >
                {timer.isRunning ? "Jeda" : "Lanjut"}
              </button>
              <button
                onClick={finishEarly}
                className="rounded-full bg-stopwatch px-6 py-3 text-base font-bold text-white transition hover:brightness-95 active:scale-95"
              >
                Selesai
              </button>
            </>
          )}

          {stage === "done" && (
            <>
              <button
                onClick={() => {
                  recorder.clear();
                  void drawTopic();
                }}
                className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,122,255,0.3)] transition hover:brightness-90 active:scale-95"
              >
                Topik Baru ✨
              </button>
              <button
                onClick={() => {
                  recorder.clear();
                  setStage("ready");
                }}
                className="rounded-full bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition hover:brightness-95 active:scale-95"
              >
                Ulangi topik ini
              </button>
              <button
                onClick={resetRound}
                className="rounded-full px-6 py-3 text-base font-semibold text-muted-foreground transition hover:text-foreground"
              >
                Ubah pengaturan
              </button>
            </>
          )}
        </div>
      </main>

      {/* Riwayat */}
      {hydrated && history.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-6 pb-12">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Topik terakhir
          </h2>
          <ul className="flex flex-col gap-2">
            {history.map((h, i) => (
              <li
                key={`${h}-${i}`}
                className="truncate rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-[0_1px_6px_rgba(15,23,42,0.04)]"
              >
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
