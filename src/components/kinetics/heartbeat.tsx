"use client";

import { useReducedMotion } from "framer-motion";

const PATH = "M0,42 L60,42 L80,18 L92,68 L104,42 L230,42";
const W = 230;
const H = 84;

type HeartbeatProps = {
  className?: string;
  /** Tailwind colour class for the trace & dot, e.g. "text-signal" */
  tone?: string;
  /** Rendered scale of the native 230×84 trace */
  scale?: number;
};

/**
 * Heartbeat Monitor (Kinetics) — a glowing dot traces an EKG along an offset-path.
 * Used as the "live" telemetry readout on the hero plate.
 */
export function Heartbeat({ className = "", tone = "text-signal", scale = 0.5 }: HeartbeatProps) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={`relative ${tone} ${className}`}
      style={{ width: W * scale, height: H * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block">
          <path
            d={PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.45}
          />
        </svg>
        {!reduce ? (
          <span
            className="k-ekg-dot absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-current"
            style={{
              offsetPath: `path("${PATH}")`,
              boxShadow: "0 0 12px 3px currentColor",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
