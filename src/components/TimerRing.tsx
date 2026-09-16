import { formatTime } from "@/hooks/useCountdown";

interface TimerRingProps {
  remaining: number;
  total: number;
  label: string;
  size?: number;
}

export function TimerRing({ remaining, total, label, size = 200 }: TimerRingProps) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? remaining / total : 0;
  const urgent = remaining <= 10 && remaining > 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={10}
          className="stroke-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className={`transition-[stroke-dashoffset] duration-300 ease-linear ${
            urgent ? "stroke-stopwatch" : "stroke-primary"
          }`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={`text-4xl font-bold tabular-nums tracking-tight sm:text-5xl ${
            urgent ? "text-stopwatch" : "text-foreground"
          }`}
        >
          {formatTime(remaining)}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
