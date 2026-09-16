import { useCallback, useEffect, useRef, useState } from "react";

type RecorderStatus = "idle" | "recording" | "stopped" | "denied" | "unsupported";

export function useRecorder() {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const urlRef = useRef<string | null>(null);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const clear = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setAudioUrl(null);
    setStatus("idle");
  }, []);

  const start = useCallback(async () => {
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

  const stop = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
    recorderRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      recorderRef.current?.state !== "inactive" && recorderRef.current?.stop();
      cleanupStream();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [cleanupStream]);

  return { status, audioUrl, start, stop, clear };
}
