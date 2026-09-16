import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type Category } from "@/data/topics";

export function CategorySelect({
  value,
  onChange,
}: {
  value: Category;
  onChange: (c: Category) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = CATEGORIES.find((c) => c.id === value) ?? CATEGORIES[0]!;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-56 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-base font-bold shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition hover:brightness-98 active:scale-[0.98]"
      >
        <span className="flex items-center gap-2.5">
          <span aria-hidden className="text-primary">{active.emoji}</span>
          {active.label}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Kategori topik"
          className="absolute left-1/2 z-30 mt-2 max-h-80 w-64 -translate-x-1/2 overflow-y-auto rounded-2xl border border-border bg-card p-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
        >
          {CATEGORIES.map((c) => {
            const selected = c.id === value;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(c.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
