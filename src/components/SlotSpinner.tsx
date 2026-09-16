import { useEffect, useRef, useCallback, useState } from "react";

/** Suara "tik" mekanis halus ala putaran mahkota jam tangan. */
function playWatchTick(progress: number) {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const t = ctx.currentTime;

    // Impulse sangat pendek — mensimulasikan "klik" gear mekanis
    const sampleRate = ctx.sampleRate;
    const duration = 0.008; // 8ms — sangat pendek dan tajam
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Bentuk gelombang: ledakan tajam lalu decay eksponensial cepat
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.exp(-i / (bufferSize * 0.08)); // decay sangat cepat
      // Campuran nada tinggi + sedikit noise untuk karakter metalik
      data[i] = env * (
        Math.sin(2 * Math.PI * 3200 * i / sampleRate) * 0.7 +
        Math.sin(2 * Math.PI * 6400 * i / sampleRate) * 0.2 +
        (Math.random() * 2 - 1) * 0.1
      );
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Highpass filter — hanya loloskan frekuensi tinggi untuk kesan metalik
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2000 + progress * 2000;
    hp.Q.value = 1.5;

    // Volume sedikit naik seiring progress
    const gain = ctx.createGain();
    const vol = 0.12 + progress * 0.18;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

    source.connect(hp).connect(gain).connect(ctx.destination);
    source.start(t);
    source.stop(t + 0.02);

    setTimeout(() => void ctx.close(), 100);
  } catch {
    /* abaikan */
  }
}

interface SlotSpinnerProps {
  /** Array topik untuk diperlihatkan selama spin. */
  pool: string[];
  /** Topik final yang harus ditampilkan saat spin selesai. null = masih fetching. */
  finalTopic: string | null;
  /** Callback saat animasi spin selesai sempurna. */
  onComplete: () => void;
}

/**
 * Animasi gulir vertikal ala mesin slot.
 *
 * Menampilkan 3 baris: atas (opacity 20%, blur), tengah (terang, besar), bawah (opacity 20%, blur).
 * Spin mulai cepat lalu melambat secara alami (easing deceleration).
 * Setelah finalTopic diterima, melambat dan berhenti halus tepat di kata tersebut.
 */
export function SlotSpinner({ pool, finalTopic, onComplete }: SlotSpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [visibleItems, setVisibleItems] = useState<string[]>(["", "", ""]);
  const indexRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastTickTimeRef = useRef(0);
  const finalReceivedRef = useRef(false);
  const deceleratingRef = useRef(false);
  const currentIntervalRef = useRef(80); // ms antara setiap pergantian kata
  const completedRef = useRef(false);

  // Shuffle pool untuk variasi
  const shuffledPool = useRef<string[]>([]);
  useEffect(() => {
    const arr = [...pool];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    shuffledPool.current = arr;
  }, [pool]);

  const getItem = useCallback((idx: number) => {
    const p = shuffledPool.current;
    if (p.length === 0) return "\u2026";
    return p[((idx % p.length) + p.length) % p.length];
  }, []);

  // Track finalTopic
  useEffect(() => {
    if (finalTopic) {
      finalReceivedRef.current = true;
    }
  }, [finalTopic]);

  useEffect(() => {
    startTimeRef.current = performance.now();
    lastTickTimeRef.current = performance.now();
    indexRef.current = Math.floor(Math.random() * pool.length);
    completedRef.current = false;
    finalReceivedRef.current = !!finalTopic;
    deceleratingRef.current = false;
    currentIntervalRef.current = 80;

    // Set initial display
    const idx = indexRef.current;
    setVisibleItems([getItem(idx - 1), getItem(idx), getItem(idx + 1)]);

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTimeRef.current;

      // Fase 1: Spin normal (pertama ~1.2 detik, atau sampai final diterima)
      // Fase 2: Deceleration (setelah final diterima, melambat secara alami)
      // Fase 3: Reveal (berhenti di finalTopic)

      if (finalReceivedRef.current && elapsed > 1200 && !deceleratingRef.current) {
        deceleratingRef.current = true;
      }

      if (deceleratingRef.current) {
        // Melambat: interval bertambah setiap tick
        currentIntervalRef.current = Math.min(currentIntervalRef.current * 1.12, 500);
      } else {
        // Saat spin normal, sedikit melambat natural seiring waktu
        const normalProgress = Math.min(elapsed / 1200, 1);
        currentIntervalRef.current = 80 + normalProgress * 40;
      }

      if (now - lastTickTimeRef.current >= currentIntervalRef.current) {
        lastTickTimeRef.current = now;
        indexRef.current += 1;

        const progress = Math.min(elapsed / 3000, 1);

        // Cek apakah saatnya berhenti
        if (deceleratingRef.current && currentIntervalRef.current >= 450 && finalTopic && !completedRef.current) {
          // Fase terakhir: tampilkan finalTopic di tengah dengan transisi
          completedRef.current = true;
          const lastPoolItem = getItem(indexRef.current - 1);
          setVisibleItems([lastPoolItem, finalTopic, ""]);
          playWatchTick(1);

          // Jeda sebentar lalu panggil onComplete
          setTimeout(() => {
            onComplete();
          }, 600);
          return;
        }

        const idx = indexRef.current;
        setVisibleItems([getItem(idx - 1), getItem(idx), getItem(idx + 1)]);
        playWatchTick(progress);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="slot-container"
      aria-busy="true"
      aria-label="Memilih topik\u2026"
    >
      <div className="slot-track">
        {/* Baris atas — opacity rendah, blur */}
        <div className="slot-item slot-item-ghost">
          {visibleItems[0]}
        </div>
        {/* Baris tengah — utama */}
        <div className="slot-item slot-item-active">
          {visibleItems[1]}
        </div>
        {/* Baris bawah — opacity rendah, blur */}
        <div className="slot-item slot-item-ghost">
          {visibleItems[2]}
        </div>
      </div>

      {/* Gradient masks atas-bawah */}
      <div className="slot-mask-top" />
      <div className="slot-mask-bottom" />
    </div>
  );
}
