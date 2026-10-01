import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-bone sm:px-6 sm:py-28">
      <Image
        src="/images/cta-field.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-35"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-signal">
            Begin the map
          </p>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-5xl">
            Master anatomy with Corpus.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-bone/72">
            Turn memorization into understanding — structure by structure, with the body still in view.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/get-started" variant="accent" size="lg">
              Start Learning
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
