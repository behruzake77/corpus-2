import { Flame, Medal, Target, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CountUp, ElasticBar, ProgressRing } from "@/components/kinetics";

const plates = [
  {
    icon: Zap,
    title: "XP with intent",
    text: "Points follow retrieval quality, not streaks of tapping. Hard recalls weigh more.",
  },
  {
    icon: Flame,
    title: "Clinical streak",
    text: "A day counts when you complete a spaced set — not when you open the app.",
  },
  {
    icon: Medal,
    title: "Quiet achievements",
    text: "First hundred structures. Seven-day retrieval. A full region at 80% mastery.",
  },
  {
    icon: Target,
    title: "Mastery map",
    text: "Each structure is fragile, stable, or fluent. Review follows the map, not the calendar.",
  },
];

export function Gamification() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
              Intelligent practice
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">
              Motivation, without turning medicine into a game.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.06}>
            <p className="text-[1.02rem] leading-relaxed text-muted">
              Corpus uses XP, streaks, and mastery because medical memory is a long project. The tone stays adult — closer to a logbook than a leaderboard.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {plates.map((plate, index) => {
            const Icon = plate.icon;
            return (
              <Reveal key={plate.title} delay={index * 0.05}>
                <article className="k-lift flex gap-4 rounded-[10px] border border-border bg-card p-5 hover:border-primary/35 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-border bg-background">
                    <Icon size={18} strokeWidth={1.7} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.02em]">{plate.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{plate.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-6 overflow-hidden rounded-[10px] border border-border bg-[#EBE4D6] p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Tonight’s set
              </p>
              <p className="mt-2 font-display text-2xl">
                <CountUp value="18" duration={900} /> structures
              </p>
              <ElasticBar value={67} className="mt-3 h-1.5 bg-border" fillClassName="bg-primary" label="Tonight’s set progress" />
              <p className="mt-2 text-sm text-muted">12 of 18 reviewed</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <ProgressRing value={74} size={72} stroke={5} label="Upper limb fluency 74 percent" />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.72rem] text-foreground">
                  <CountUp value="74%" duration={900} />
                </span>
              </div>
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Region fluency
                </p>
                <p className="mt-2 font-display text-2xl">Upper limb</p>
                <p className="mt-2 text-sm text-muted">Brachial plexus still fragile</p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Streak
              </p>
              <p className="mt-2 flex items-center gap-2.5 font-display text-2xl">
                <span className="k-pulse-dot h-2 w-2 bg-secondary" aria-hidden="true" />
                <CountUp value="12" duration={900} /> days
              </p>
              <p className="mt-2 text-sm text-muted">Next review in 6 hours</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
