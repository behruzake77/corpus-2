"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { anatomySystems } from "@/lib/systems";
import { Reveal } from "@/components/ui/reveal";

export function AnatomySystems() {
  const [activeId, setActiveId] = useState(anatomySystems[0].id);
  const active =
    anatomySystems.find((system) => system.id === activeId) ?? anatomySystems[0];

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
            <ul className="divide-y divide-border border-y border-border">
              {anatomySystems.map((system) => {
                const selected = system.id === activeId;
                return (
                  <li key={system.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(system.id)}
                      onFocus={() => setActiveId(system.id)}
                      onClick={() => setActiveId(system.id)}
                      className={`flex w-full items-start justify-between gap-4 py-4 text-left transition-colors duration-200 ${
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
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          selected ? "bg-accent" : "bg-border"
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
                <Image
                  src={active.image}
                  alt={`${active.name} atlas plate`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-4 px-5 py-5 text-bone sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-signal">
                    {active.structures} structures · {active.lessons} lessons
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/75">
                    {active.detail}
                  </p>
                  <p className="mt-2 text-sm text-bone/55">{active.clinical}</p>
                </div>
                <Link
                  href={`/anatomy#${active.id}`}
                  className="inline-flex min-h-11 items-center gap-1 text-sm text-bone hover:text-signal"
                >
                  Open system
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
