"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { anatomySystems } from "@/lib/systems";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/kinetics";

export function AnatomySystems() {
  const [activeId, setActiveId] = useState(anatomySystems[0].id);
  const activeIndex = Math.max(
    0,
    anatomySystems.findIndex((system) => system.id === activeId),
  );
  const active = anatomySystems[activeIndex];
  const listRef = useRef<HTMLUListElement>(null);
  const [rail, setRail] = useState({ top: 0, height: 0 });

  // Snap Rail (Kinetics): measure the active row so the indicator springs to it.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const row = list.children[activeIndex] as HTMLElement | undefined;
      if (!row) return;
      setRail({ top: row.offsetTop, height: row.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [activeIndex]);

  return (
    <section id="anatomy" className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            Anatomy systems
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-[-0.03em] sm:text-4xl">
            Six systems. One continuous map.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            {/* Snap Rail (Kinetics): one indicator springs to the hovered row */}
            <ul ref={listRef} className="relative divide-y divide-border border-y border-border">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-[2px] bg-accent"
                style={{
                  height: rail.height,
                  transform: `translateY(${rail.top}px)`,
                  transition: "transform 0.45s var(--ease-spring), height 0.45s var(--ease-spring)",
                }}
              />
              {anatomySystems.map((system) => {
                const selected = system.id === activeId;
                return (
                  <li key={system.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(system.id)}
                      onFocus={() => setActiveId(system.id)}
                      onClick={() => setActiveId(system.id)}
                      className={`flex w-full items-start justify-between gap-4 py-4 pl-4 text-left transition-colors duration-200 ${
                        selected ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                      aria-pressed={selected}
                    >
                      <span>
                        <span className="block font-display text-xl tracking-[-0.02em]">
                          {system.name}
                        </span>
                        <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                          {system.latin}
                        </span>
                      </span>
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-[transform,background-color] duration-500 [transition-timing-function:var(--ease-spring)] ${
                          selected ? "scale-125 bg-accent" : "bg-border"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <article className="overflow-hidden rounded-[10px] border border-ink bg-ink">
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                {anatomySystems.map((system, index) => (
                  <Image
                    key={system.id}
                    src={system.image}
                    alt={index === activeIndex ? `${system.name} atlas plate` : ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-center transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-out-expo)]"
                    style={{
                      opacity: index === activeIndex ? 1 : 0,
                      transform: index === activeIndex ? "scale(1)" : "scale(1.03)",
                    }}
                    aria-hidden={index !== activeIndex}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4 px-5 py-5 text-bone sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div key={active.id} className="k-stagger">
                  <p
                    className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-signal"
                    style={{ "--k-i": 0 } as React.CSSProperties}
                  >
                    <CountUp value={String(active.structures)} duration={700} /> structures ·{" "}
                    <CountUp value={String(active.lessons)} duration={700} /> lessons
                  </p>
                  <p
                    className="mt-2 max-w-md text-sm leading-relaxed text-bone/75"
                    style={{ "--k-i": 1 } as React.CSSProperties}
                  >
                    {active.detail}
                  </p>
                  <p className="mt-2 text-sm text-bone/55" style={{ "--k-i": 2 } as React.CSSProperties}>
                    {active.clinical}
                  </p>
                </div>
                <Link
                  href={`/anatomy#${active.id}`}
                  className="group inline-flex min-h-11 items-center gap-1 text-sm text-bone transition-colors hover:text-signal"
                >
                  <span className="k-underline">Open system</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
