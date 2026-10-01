import {
  Activity,
  BookOpen,
  Brain,
  Layers,
  Stethoscope,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    id: "01",
    title: "Interactive Anatomy",
    text: "Explore structures in spatial context — layers, relations, and Latin names that stay attached to the body, not a list.",
    icon: Layers,
    span: "lg:col-span-7 min-h-[22rem]",
    tone: "ink",
  },
  {
    id: "02",
    title: "Smart Quizzes",
    text: "Questions that follow what you just saw. Immediate feedback, with the plate still in view.",
    icon: BookOpen,
    span: "lg:col-span-5",
    tone: "paper",
  },
  {
    id: "03",
    title: "Spaced Learning",
    text: "Structures return when memory is about to fade. Review is scheduled, not hoped for.",
    icon: Brain,
    span: "lg:col-span-4",
    tone: "paper",
  },
  {
    id: "04",
    title: "Clinical Connections",
    text: "Every region links to a finding, a nerve lesion, or a surgical approach.",
    icon: Stethoscope,
    span: "lg:col-span-4",
    tone: "paper",
  },
  {
    id: "05",
    title: "Progress Tracking",
    text: "Mastery is per structure. See what is solid, what is fragile, and what to reopen tonight.",
    icon: Activity,
    span: "lg:col-span-4",
    tone: "paper",
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            Core features
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
            Built like a lab, not a slide deck.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const dark = feature.tone === "ink";
            return (
              <Reveal
                key={feature.id}
                delay={index * 0.05}
                className={`${feature.span} min-h-[12rem]`}
              >
                <article
                  className={`k-lift group flex h-full flex-col justify-between rounded-[10px] border p-6 sm:p-7 ${
                    dark
                      ? "border-ink bg-ink text-bone hover:border-signal/40"
                      : "border-border bg-card text-foreground hover:border-primary/35"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`font-mono text-[0.68rem] tracking-[0.18em] ${
                        dark ? "text-bone/50" : "text-muted"
                      }`}
                    >
                      {feature.id}
                    </span>
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      className={`transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6 ${
                        dark ? "text-signal" : "text-primary"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="font-display text-2xl tracking-[-0.02em]">
                      {feature.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-[0.98rem] leading-relaxed ${
                        dark ? "text-bone/70" : "text-muted"
                      }`}
                    >
                      {feature.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
