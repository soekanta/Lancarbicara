/**
 * ShuffleBag — anti-clustering topic generator.
 *
 * Cara kerja:
 * - Pool topik di-shuffle seperti kartu remi.
 * - Setiap `next()` ambil 1 dari tumpukan.
 * - Kalau tumpukan habis, di-shuffle ulang dari pool awal.
 * - Dijamin tidak berulang sampai semua topik sudah keluar (satu putaran).
 */
export class ShuffleBag {
  private readonly pool: string[];
  private remaining: string[];

  constructor(pool: string[]) {
    this.pool = [...pool];
    this.remaining = [];
  }

  private shuffle(arr: string[]): string[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  next(): string {
    if (this.remaining.length === 0) {
      this.remaining = this.shuffle(this.pool);
    }
    return this.remaining.pop()!;
  }

  /** Sisa topik yang belum keluar dalam putaran ini */
  get remainingCount(): number {
    return this.remaining.length;
  }
}
