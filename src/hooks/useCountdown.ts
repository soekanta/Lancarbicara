import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Countdown berbasis Date.now() agar tetap akurat saat tab tidak aktif.
 */
export function useCountdown(onComplete?: () => void) {
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const endAtRef = useRef<number | null>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    if (!isRunning) return;
    const tick = () => {
      if (endAtRef.current === null) return;
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
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

  const start = useCallback((seconds: number) => {
    setTotal(seconds);
    setRemaining(seconds);
    endAtRef.current = Date.now() + seconds * 1000;
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (endAtRef.current === null) return;
    setRemaining(Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000)));
    endAtRef.current = null;
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setRemaining((r) => {
      endAtRef.current = Date.now() + r * 1000;
      return r;
    });
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    endAtRef.current = null;
    setIsRunning(false);
    setRemaining(0);
    setTotal(0);
  }, []);

  return { total, remaining, isRunning, start, pause, resume, stop };
}

export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60).toString().padStart(2, "0");
  const s = (safe % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
