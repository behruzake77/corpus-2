"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { AnatomyVisualization } from "@/components/anatomy/visualization";

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="pointer-events-none absolute inset-0 atlas-grid opacity-60" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-6">
          <motion.p
            className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-signal"
            {...enter(0.05)}
          >
            Medical anatomy studio
          </motion.p>
          <motion.h1
            className="mt-5 font-display text-[2.15rem] leading-[1.12] tracking-[-0.03em] text-bone sm:text-[3.15rem] lg:text-[3.6rem]"
            {...enter(0.12)}
          >
            See every structure.
            <span className="mt-2 block italic text-bone/80">Understand the whole.</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-bone/72"
            {...enter(0.2)}
          >
            Corpus is an interactive anatomy platform for medical students — spatial
            exploration, retrieval practice, and clinical context in one studio.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" {...enter(0.28)}>
            <ButtonLink href="/get-started" variant="accent" size="lg">
              Start Learning
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/anatomy" variant="outline-light" size="lg">
              Explore Anatomy
            </ButtonLink>
          </motion.div>
          <motion.dl
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-bone/15 pt-6"
            {...enter(0.36)}
          >
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/45">
                Built for
              </dt>
              <dd className="mt-1 text-sm text-bone/85">Med students</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/45">
                Method
              </dt>
              <dd className="mt-1 text-sm text-bone/85">Spaced retrieval</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/45">
                Focus
              </dt>
              <dd className="mt-1 text-sm text-bone/85">Clinical anatomy</dd>
            </div>
          </motion.dl>
        </div>
        <motion.div className="lg:col-span-6" {...enter(0.18)}>
          <AnatomyVisualization />
        </motion.div>
      </div>
    </section>
  );
}
