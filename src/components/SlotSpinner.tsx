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

    const sampleRate = ctx.sampleRate;
    const duration = 0.008; // 8ms
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const env = Math.exp(-i / (bufferSize * 0.08));
      data[i] = env * (
        Math.sin(2 * Math.PI * 3200 * i / sampleRate) * 0.7 +
        Math.sin(2 * Math.PI * 6400 * i / sampleRate) * 0.2 +
        (Math.random() * 2 - 1) * 0.1
      );
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2000 + progress * 2000;
    hp.Q.value = 1.5;

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

export function SlotSpinner({ pool, finalTopic, onComplete }: SlotSpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [visibleItems, setVisibleItems] = useState<string[]>(["", "", ""]);
  
  const indexRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastTickTimeRef = useRef(0);
  const finalReceivedRef = useRef(false);
  const deceleratingRef = useRef(false);
  const currentIntervalRef = useRef(80);
  const completedRef = useRef(false);

  const finalTopicRef = useRef<string | null>(finalTopic);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    finalTopicRef.current = finalTopic;
    if (finalTopic) {
      finalReceivedRef.current = true;
    }
  }, [finalTopic]);

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

  useEffect(() => {
    startTimeRef.current = performance.now();
    lastTickTimeRef.current = performance.now();
    indexRef.current = Math.floor(Math.random() * Math.max(1, pool.length));
    completedRef.current = false;
    finalReceivedRef.current = !!finalTopic;
    deceleratingRef.current = false;
    currentIntervalRef.current = 80;

    const initialIdx = indexRef.current;
    setVisibleItems([getItem(initialIdx - 1), getItem(initialIdx), getItem(initialIdx + 1)]);

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTimeRef.current;

      // Mulai perlambatan setelah 1 detik DAN finalTopic sudah tersedia
      if (finalReceivedRef.current && elapsed > 1000 && !deceleratingRef.current) {
        deceleratingRef.current = true;
      }

      if (deceleratingRef.current) {
        // Melambat: interval antar-kata makin panjang
        currentIntervalRef.current = Math.min(currentIntervalRef.current * 1.14, 500);
      } else {
        // Spin biasa: sedikit melambat secara gradual
        const normalProgress = Math.min(elapsed / 1000, 1);
        currentIntervalRef.current = 80 + normalProgress * 40;
      }

      if (now - lastTickTimeRef.current >= currentIntervalRef.current) {
        lastTickTimeRef.current = now;
        indexRef.current += 1;

        const targetFinal = finalTopicRef.current;
        const progress = Math.min(elapsed / 2500, 1);

        // Cek kondisi berhenti: sudah melambat (interval >= 380ms) & finalTopic sudah ada
        if (deceleratingRef.current && currentIntervalRef.current >= 380 && targetFinal && !completedRef.current) {
          completedRef.current = true;
          const lastPoolItem = getItem(indexRef.current - 1);
          setVisibleItems([lastPoolItem, targetFinal, getItem(indexRef.current + 1)]);
          playWatchTick(1);

          setTimeout(() => {
            onCompleteRef.current();
          }, 500);
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
  }, [getItem, pool.length]);

  return (
    <div
      ref={containerRef}
      className="slot-container"
      aria-busy="true"
      aria-label="Memilih topik…"
    >
      <div className="slot-track">
        <div className="slot-item slot-item-ghost">
          {visibleItems[0]}
        </div>
        <div className="slot-item slot-item-active">
          {visibleItems[1]}
        </div>
        <div className="slot-item slot-item-ghost">
          {visibleItems[2]}
        </div>
      </div>

      <div className="slot-mask-top" />
      <div className="slot-mask-bottom" />
    </div>
  );
}
