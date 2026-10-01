import type { Metadata } from "next";
import { StartForm } from "@/components/start-form";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Create your Corpus studio and begin interactive anatomy.",
};

export default function GetStartedPage() {
  return (
    <main id="main" className="bg-ink text-bone">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl lg:grid-cols-12">
        <section className="hidden flex-col justify-end bg-[url('/images/hero-anatomy.jpg')] bg-cover bg-[center_top] px-10 pb-16 pt-32 lg:col-span-5 lg:flex">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-signal">
            Start learning
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-[-0.03em]">
            Open a studio. Keep the map.
          </h1>
          <p className="mt-4 max-w-sm text-bone/70">
            Tell us where you are in training. We’ll seed your first system and a retrieval set.
          </p>
        </section>
        <section className="flex items-center bg-background px-4 py-28 text-foreground sm:px-8 lg:col-span-7 lg:px-12">
          <div className="w-full max-w-md">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary lg:hidden">
              Start learning
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-[-0.03em] lg:text-4xl">
              Create your Corpus studio
            </h1>
            <p className="mt-3 text-muted">
              No password yet — we save your place and open the first lesson path.
            </p>
            <StartForm />
          </div>
        </section>
      </div>
    </main>
  );
}
