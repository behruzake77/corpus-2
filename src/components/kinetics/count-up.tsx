"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** Display string, e.g. "1,800", "240+", "74%". Non-numeric strings render as-is. */
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Odometer Count-up (Kinetics) — numbers ease up from 0 when they scroll into view.
 * Keeps prefix/suffix ("+", "%") and locale grouping intact; tabular digits prevent width jitter.
 */
export function CountUp({ value, duration = 1400, className = "" }: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const animatable = Number.isFinite(target) && !reduce;
  const [n, setN] = useState(animatable ? 0 : target);

  useEffect(() => {
    if (!animatable || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animatable, duration, target]);

  if (!match || !Number.isFinite(target)) {
    return <span className={className}>{value}</span>;
  }

  const [, prefix, , suffix] = match;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
