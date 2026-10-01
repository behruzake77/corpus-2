"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Layer = {
  src: string;
  alt: string;
  label: string;
};

type CompareSliderProps = {
  before: Layer;
  after: Layer;
  initial?: number;
  className?: string;
  sizes?: string;
};

/**
 * Before / After (Kinetics) — drag the handle to wipe between two atlas layers.
 * Clip-path does the reveal; the handle springs to the nearest edge when released
 * close to it, otherwise stays where the pointer left it. Keyboard: ← → ±5, Home/End.
 */
export function CompareSlider({
  before,
  after,
  initial = 50,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 640px",
}: CompareSliderProps) {
  const reduce = useReducedMotion();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(event.clientX);
  };

  const onPointerUp = () => {
    setDragging(false);
    // Snap Rail flavour: settle onto an edge when released within 8%.
    setPct((p) => (p < 8 ? 0 : p > 92 ? 100 : p));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number | undefined> = {
      ArrowLeft: Math.max(0, pct - 5),
      ArrowRight: Math.min(100, pct + 5),
      Home: 0,
      End: 100,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setPct(next);
  };

  const transition = dragging || reduce ? "none" : "clip-path 0.55s var(--ease-spring), left 0.55s var(--ease-spring)";

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-[10px] bg-ink touch-pan-y ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ cursor: dragging ? "grabbing" : "col-resize" }}
    >
      <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)`, transition }}
      >
        <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-[2px] border border-bone/25 bg-ink/70 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone">
        {after.label}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-[2px] border border-bone/25 bg-ink/70 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone">
        {before.label}
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label={`Reveal ${after.label} over ${before.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-describedby={`${id}-hint`}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 w-px bg-bone/80 outline-none focus-visible:ring-2 focus-visible:ring-signal"
        style={{ left: `${pct}%`, transition }}
      >
        <span
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 bg-ink/85 text-bone shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-[2px]"
          style={{
            transform: `translate(-50%, -50%) scale(${dragging ? 1.12 : 1})`,
            transition: reduce ? "none" : "transform 0.45s var(--ease-spring)",
          }}
        >
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 6 L4 12 L8 18" />
            <path d="M16 6 L20 12 L16 18" />
          </svg>
        </span>
      </div>
      <p id={`${id}-hint`} className="sr-only">
        Drag the handle or use arrow keys to compare layers.
      </p>
    </div>
  );
}
