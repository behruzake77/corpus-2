import Link from "next/link";

type LogoProps = {
  inverted?: boolean;
  compact?: boolean;
};

export function Logo({ inverted = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 rounded-sm no-underline ${
        inverted ? "text-bone" : "text-foreground"
      }`}
      aria-label="Corpus home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1.2"
          y="1.2"
          width="29.6"
          height="29.6"
          rx="3"
          className={inverted ? "stroke-bone/70" : "stroke-foreground/70"}
          strokeWidth="1.4"
        />
        <path
          d="M21.6 8.6h-6.1c-3.5 0-5.9 2.5-5.9 7.4s2.4 7.4 5.9 7.4h6.1"
          className={inverted ? "stroke-bone" : "stroke-foreground"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="12.3" cy="16" r="1.35" className="fill-signal" />
      </svg>
      <span
        className={`font-display text-[1.15rem] leading-none tracking-[-0.02em] ${
          compact ? "hidden sm:inline" : ""
        }`}
      >
        Corpus
      </span>
    </Link>
  );
}
