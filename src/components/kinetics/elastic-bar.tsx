"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type ElasticBarProps = {
  /** 0–100 */
  value: number;
  className?: string;
  fillClassName?: string;
  label?: string;
};

/**
 * Elastic Progress (Kinetics) — width settles with an expo-out overshoot
 * once the bar enters the viewport.
 */
export function ElasticBar({
  value,
  className = "h-1.5 bg-border",
  fillClassName = "bg-primary",
  label,
}: ElasticBarProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const shown = reduce || revealed ? value : 0;

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
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={label}
      className={`overflow-hidden rounded-full ${className}`}
    >
      <div
        className={`h-full rounded-full ${fillClassName}`}
        style={{
          width: `${Math.min(Math.max(shown, 0), 100)}%`,
          transition: reduce ? "none" : "width 0.9s var(--ease-out-expo)",
        }}
      />
    </div>
  );
}
