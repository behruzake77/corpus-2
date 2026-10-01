import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Why Corpus exists — anatomy as spatial understanding for medical students.",
};

export default function AboutPage() {
  return (
    <main id="main" className="bg-background pt-24">
      <header className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            About Corpus
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-[-0.03em] sm:text-5xl">
            Anatomy is a spatial problem wearing a vocabulary costume.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Medical students are asked to memorize thousands of names. Clinicians remember relations:
            what is lateral, what is deep, which nerve is at risk, which pain is referred. Corpus is
            built for that second kind of memory.
          </p>
        </div>
      </header>
      <section className="border-y border-border bg-[#EBE4D6] px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          {[
            {
              title: "See first",
              text: "A structure is learned on the plate, with neighbors visible. Lists come after the picture holds.",
            },
            {
              title: "Retrieve often",
              text: "Questions return on a schedule that respects forgetting. The stem still sits beside the anatomy.",
            },
            {
              title: "Connect to clinic",
              text: "Every region carries a finding, a lesion, or an approach — so anatomy stays useful on the ward.",
            },
          ].map((item) => (
            <article key={item.title}>
              <h2 className="font-display text-2xl tracking-[-0.02em]">{item.title}</h2>
              <p className="mt-3 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-foreground/85">
          <p>
            Corpus is an independent medical education studio. We are not a hospital, and we do not
            replace dissection, prosection, or a good teacher. We exist for the hours between those
            rooms — when the atlas is closed and the names start to drift.
          </p>
          <p>
            The product is intentionally quiet. No neon. No cartoon mascots. Gamification is a
            logbook: XP for honest retrieval, streaks for completed sets, mastery that is honest
            about what is still fragile.
          </p>
          <p>
            If you are in the first years of medicine, PA school, or a related path, this is built
            for you.
          </p>
          <div className="pt-4">
            <ButtonLink href="/get-started" variant="accent" size="lg">
              Start Learning
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
