import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { anatomySystems } from "@/lib/systems";
import { CountUp } from "@/components/kinetics";

export const metadata: Metadata = {
  title: "Anatomy",
  description: "Explore Corpus anatomy systems — skeletal, muscular, nervous, cardiovascular, respiratory, and digestive.",
};

export default function AnatomyPage() {
  return (
    <main id="main" className="bg-background pt-24">
      <header className="border-b border-border px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            Anatomy atlas
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl tracking-[-0.03em] sm:text-5xl">
            Systems you can open, not just name.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Each plate is a working region: structures, lessons, and the clinical questions they unlock.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-16">
          {anatomySystems.map((system, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={system.id}
                id={system.id}
                className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-12"
              >
                <div className={`overflow-hidden rounded-[10px] bg-ink lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] sm:aspect-[16/11]">
                    <Image
                      src={system.image}
                      alt={`${system.name} scientific atlas plate`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                    {String(index + 1).padStart(2, "0")} · {system.latin}
                  </p>
                  <h2 className="mt-3 font-display text-3xl tracking-[-0.03em]">{system.name}</h2>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{system.detail}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                        Structures
                      </dt>
                      <dd className="mt-1 font-display text-2xl">
                        <CountUp value={String(system.structures)} duration={1000} />
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                        Lessons
                      </dt>
                      <dd className="mt-1 font-display text-2xl">
                        <CountUp value={String(system.lessons)} duration={1000} />
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm text-foreground/80">{system.clinical}</p>
                  <Link
                    href="/get-started"
                    className="group mt-6 inline-flex min-h-11 items-center gap-2 text-primary transition-colors hover:text-foreground"
                  >
                    <span className="k-underline">Start this system</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
