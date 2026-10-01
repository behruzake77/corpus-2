"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

type ConfettiProps = {
  /** Change this key to fire a new burst */
  burstKey: number;
  count?: number;
  className?: string;
};

const palette = ["#1c6568", "#3e9a97", "#b0894d", "#a13333", "#e8dcc8"];

/**
 * Confetti Burst (Kinetics) — a restrained paper burst for milestones.
 * Rendered absolutely inside a `relative` parent; pure CSS motion.
 */
export function Confetti({ burstKey, count = 14, className = "" }: ConfettiProps) {
  const reduce = useReducedMotion();
  const pieces = useMemo(() => {
    // Deterministic per burst so SSR/CSR match and each burst looks different.
    const state = { seed: burstKey * 9301 + 49297 };
    const rand = () => {
      state.seed = (state.seed * 9301 + 49297) % 233280;
      return state.seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + rand() * 0.6;
      const dist = 36 + rand() * 42;
      return {
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist - 14}px`,
        rot: `${(rand() - 0.5) * 540}deg`,
        color: palette[i % palette.length],
        delay: `${rand() * 60}ms`,
      };
    });
  }, [burstKey, count]);

  if (reduce || burstKey === 0) return null;

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {pieces.map((p, i) => (
        <span
          key={`${burstKey}-${i}`}
          className="k-confetti-piece"
          style={
            {
              background: p.color,
              animationDelay: p.delay,
              "--dx": p.dx,
              "--dy": p.dy,
              "--rot": p.rot,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
