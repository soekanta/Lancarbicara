interface RecordingPanelProps {
  audioUrl: string | null;
  status: string;
  onClear: () => void;
}

export function RecordingPanel({ audioUrl, status, onClear }: RecordingPanelProps) {
  if (status === "denied") {
    return (
      <p className="text-sm text-muted-foreground">
        Akses mikrofon ditolak. Latihan tetap bisa dilanjutkan tanpa rekaman.
      </p>
    );
  }
  if (status === "unsupported") {
    return (
      <p className="text-sm text-muted-foreground">
        Peramban ini belum mendukung perekaman suara.
      </p>
    );
  }
  if (!audioUrl) return null;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <audio controls src={audioUrl} className="w-full max-w-md" />
      <div className="flex gap-3">
        <a
          href={audioUrl}
          download={`lancarbicara-${Date.now()}.webm`}
          className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition hover:brightness-95"
        >
          Unduh rekaman
        </a>
        <button
          onClick={onClear}
          className="rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
