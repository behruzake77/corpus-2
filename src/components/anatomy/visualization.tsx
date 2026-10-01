"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Heartbeat } from "@/components/kinetics";

const labels = [
  {
    id: "deltoid",
    name: "Deltoid",
    latin: "M. deltoideus",
    note: "Abducts the arm past 15°",
    side: "left" as const,
    top: "18%",
  },
  {
    id: "pectoralis",
    name: "Pectoralis major",
    latin: "M. pectoralis major",
    note: "Adducts and medially rotates",
    side: "right" as const,
    top: "26%",
  },
  {
    id: "rectus",
    name: "Rectus abdominis",
    latin: "M. rectus abdominis",
    note: "Flexes the lumbar spine",
    side: "left" as const,
    top: "46%",
  },
  {
    id: "oblique",
    name: "External oblique",
    latin: "M. obliquus externus",
    note: "Contralateral rotation",
    side: "right" as const,
    top: "52%",
  },
];

const particles = [
  { left: "8%", top: "14%", size: 3, delay: "0s" },
  { left: "86%", top: "22%", size: 2, delay: "1.2s" },
  { left: "12%", top: "68%", size: 2, delay: "2s" },
  { left: "78%", top: "74%", size: 3, delay: "0.6s" },
  { left: "48%", top: "8%", size: 2, delay: "1.8s" },
  { left: "92%", top: "48%", size: 2, delay: "2.4s" },
];

export function AnatomyVisualization() {
  const [active, setActive] = useState(labels[2].id);
  const reduce = useReducedMotion();
  const current = labels.find((item) => item.id === active) ?? labels[0];

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[10px] bg-ink">
      <div className="atlas-grid pointer-events-none absolute inset-0 opacity-70" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="particle pointer-events-none absolute rounded-full bg-bone/40"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-4 border border-bone/15" />
      <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-bone/50" />
      <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-bone/50" />
      <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-bone/50" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-bone/50" />

      <p className="absolute left-6 top-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone/55">
        Plate 01 · Anterior
      </p>
      <div className="absolute right-6 top-5 flex items-center gap-2">
        <Heartbeat scale={0.34} className="opacity-90" />
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-bone/45">
          <span className="k-pulse-dot mr-1.5 h-1.5 w-1.5 bg-signal align-middle" aria-hidden="true" />
          live
        </p>
      </div>

      <div className={`absolute inset-x-0 top-[8%] bottom-[10%] ${reduce ? "" : "anatomy-float"}`}>
        <Image
          src="/images/hero-anatomy.jpg"
          alt="Anterior anatomical plate of the human torso and upper limbs"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 520px"
          className="object-contain object-top"
        />
      </div>

      {labels.map((label) => {
        const isActive = label.id === active;
        return (
          <button
            key={label.id}
            type="button"
            onClick={() => setActive(label.id)}
            onMouseEnter={() => setActive(label.id)}
            onFocus={() => setActive(label.id)}
            className={`absolute z-10 flex max-w-[46%] items-center gap-2 text-left ${
              label.side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-5 flex-row-reverse"
            }`}
            style={{ top: label.top }}
            aria-pressed={isActive}
          >
            <span
              className={`hidden h-px w-8 sm:block ${
                isActive ? "bg-signal" : "bg-bone/35"
              }`}
            />
            <span
              className={`hud-pulse h-1.5 w-1.5 rounded-full transition-transform duration-500 [transition-timing-function:var(--ease-spring)] ${
                isActive ? "scale-[1.6] bg-signal" : "bg-bone/50"
              }`}
            />
            <span className="block">
              <span
                className={`block font-mono text-[0.62rem] uppercase tracking-[0.16em] ${
                  isActive ? "text-signal" : "text-bone/50"
                }`}
              >
                {label.latin}
              </span>
              <span
                className={`block text-sm ${isActive ? "text-bone" : "text-bone/70"}`}
              >
                {label.name}
              </span>
            </span>
          </button>
        );
      })}

      <aside className="absolute bottom-5 left-5 right-5 rounded-[6px] border border-bone/15 bg-ink/80 px-4 py-3 text-bone backdrop-blur-[2px] sm:right-auto sm:w-[16.5rem]">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal">
          Selected structure
        </p>
        <div key={current.id} className="k-stagger">
          <p className="mt-1 font-display text-xl leading-tight" style={{ "--k-i": 0 } as React.CSSProperties}>
            {current.name}
          </p>
          <p className="mt-1 text-sm text-bone/70" style={{ "--k-i": 1 } as React.CSSProperties}>
            {current.note}
          </p>
        </div>
      </aside>
    </div>
  );
}
