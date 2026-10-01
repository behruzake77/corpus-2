import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    id: "01",
    title: "Explore",
    text: "Open a system. Trace a structure. Read it on the plate before you ever see a multiple-choice stem.",
  },
  {
    id: "02",
    title: "Practice",
    text: "Answer in the same spatial frame. Feedback names the structure, the relation, and why the distractor fails.",
  },
  {
    id: "03",
    title: "Master",
    text: "Corpus returns what is unstable. Over weeks, lists become a map you can operate from.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-[#EBE4D6] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            How Corpus works
          </p>
          <h2 className="mt-3 max-w-lg font-display text-3xl tracking-[-0.03em] sm:text-4xl">
            Three movements. One long memory.
          </h2>
        </Reveal>
        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[1.15rem] top-4 h-[calc(100%-2rem)] w-px bg-border lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-full"
          />
          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              <Reveal delay={index * 0.08}>
                <article>
                  <div className="flex items-center gap-4 lg:block">
                    <span className="relative z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground bg-background font-mono text-[0.7rem] text-foreground">
                      {step.id}
                    </span>
                    <h3 className="font-display text-2xl tracking-[-0.02em] lg:mt-6">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-muted lg:mt-4">
                    {step.text}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
