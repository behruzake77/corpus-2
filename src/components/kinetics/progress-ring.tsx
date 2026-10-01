"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type ProgressRingProps = {
  /** 0–100 */
  value: number;
  size?: number;
  stroke?: number;
  trackClassName?: string;
  progressClassName?: string;
  className?: string;
  label?: string;
};

/**
 * Progress Ring (Kinetics) — stroke-dashoffset springs to the target with an expo-out curve.
 * Starts empty and fills when scrolled into view.
 */
export function ProgressRing({
  value,
  size = 88,
  stroke = 5,
  trackClassName = "stroke-border",
  progressClassName = "stroke-primary",
  className = "",
  label,
}: ProgressRingProps) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);
  const shown = reduce || revealed ? value : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        setRevealed(true);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label ?? `${value}%`}
      className={className}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        className={trackClassName}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        className={progressClassName}
        style={{
          strokeDasharray: c,
          strokeDashoffset: c * (1 - Math.min(Math.max(shown, 0), 100) / 100),
          transition: reduce ? "none" : "stroke-dashoffset 0.9s var(--ease-out-expo)",
        }}
      />
    </svg>
  );
}
