"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  /** Fraction of pointer offset applied as translate (0.35 in Kinetics; Corpus keeps it quieter) */
  pull?: number;
  className?: string;
};

/**
 * Magnetic Button (Kinetics) — the child drifts toward the pointer while it hovers
 * the wrapper, then springs back on leave. Pointer-only; touch devices are untouched.
 */
export function Magnetic({ children, pull = 0.22, className = "" }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = event.clientX - r.left - r.width / 2;
    const y = event.clientY - r.top - r.height / 2;
    ref.current.style.transition = "transform 0.15s ease-out";
    ref.current.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.55s var(--ease-spring)";
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div className={`inline-block ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="block will-change-transform">
        {children}
      </div>
    </div>
  );
}
