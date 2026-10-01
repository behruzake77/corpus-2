type SuccessCheckProps = {
  done: boolean;
  size?: number;
  className?: string;
  /** Tailwind stroke colour for the finished state */
  tone?: string;
  idleTone?: string;
};

/**
 * Success Check (Kinetics) — the ring draws in, then the tick follows 400ms later.
 * Pure CSS transitions keyed off the `is-done` class.
 */
export function SuccessCheck({
  done,
  size = 28,
  className = "",
  tone = "stroke-signal",
  idleTone = "stroke-bone/25",
}: SuccessCheckProps) {
  return (
    <svg
      viewBox="0 0 52 52"
      width={size}
      height={size}
      aria-hidden="true"
      className={`k-check ${done ? "is-done" : ""} ${className}`}
    >
      <circle className={`k-check-ring ${done ? tone : idleTone}`} cx="26" cy="26" r="24" />
      <path className={`k-check-tick ${tone}`} d="M15 27 l7 7 l15 -15" />
    </svg>
  );
}
