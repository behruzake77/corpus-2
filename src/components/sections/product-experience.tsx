"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { BumpNumber, Confetti, ElasticBar, SuccessCheck } from "@/components/kinetics";

const choices = [
  { id: "A", text: "Pronator teres", correct: false },
  { id: "B", text: "Brachioradialis", correct: true },
  { id: "C", text: "Biceps brachii", correct: false },
  { id: "D", text: "Brachialis", correct: false },
];

const BASE_XP = 1240;
const BASE_PROGRESS = 62;

export function ProductExperience() {
  const [picked, setPicked] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [xp, setXp] = useState(BASE_XP);
  const [progress, setProgress] = useState(BASE_PROGRESS);
  const [burst, setBurst] = useState(0);

  const answered = picked != null;
  const correct = picked === "B";

  function choose(id: string) {
    if (answered) return;
    setPicked(id);
    if (id === "B") {
      setXp((v) => v + 40);
      setProgress(BASE_PROGRESS + 8);
      setBurst((b) => b + 1);
    } else {
      // Error Shake — re-trigger even on the same element.
      setShakeId(null);
      requestAnimationFrame(() => setShakeId(id));
      setTimeout(() => setShakeId(null), 500);
    }
  }

  function reset() {
    setPicked(null);
    setShakeId(null);
    setXp(BASE_XP);
    setProgress(BASE_PROGRESS);
  }

  return (
    <section className="bg-ink px-4 py-20 text-bone sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-signal">
            Product experience
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-[-0.03em] sm:text-4xl">
            The plate stays open while you think.
          </h2>
          <p className="mt-4 max-w-xl text-bone/70">
            Corpus looks like a working studio: structure, question, and progress in one field of view.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <div className="overflow-hidden rounded-[10px] border border-bone/15 bg-ink-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 px-4 py-3 sm:px-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/55">
                Corpus Studio · Upper limb · Lesson 14
              </p>
              <div className="flex items-center gap-4 font-mono text-[0.72rem] text-bone/70">
                <span className="relative">
                  XP{" "}
                  <BumpNumber value={xp} bumpClassName="text-signal" />
                  <Confetti burstKey={burst} count={12} />
                </span>
                <span className="flex items-center gap-1.5 text-secondary">
                  <span className="k-pulse-dot h-1.5 w-1.5 bg-secondary" aria-hidden="true" />
                  Streak 12
                </span>
                <span>Mastery 74%</span>
              </div>
            </div>
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-[16rem] border-b border-bone/10 lg:col-span-7 lg:border-b-0 lg:border-r">
                <Image
                  src="/images/system-muscular.jpg"
                  alt="Muscular atlas plate used inside a lesson"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-[center_20%]"
                />
                <div className="absolute left-4 top-4 rounded-[4px] border border-bone/20 bg-ink/70 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone">
                  Cubital fossa
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <ElasticBar
                    value={progress}
                    className="h-1.5 bg-bone/15"
                    fillClassName="bg-signal"
                    label="Lesson progress"
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="px-5 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal">
                      Question 08 / 12
                    </p>
                    {answered ? (
                      <button
                        type="button"
                        onClick={reset}
                        className="k-toast inline-flex min-h-8 items-center gap-1.5 rounded-[4px] border border-bone/15 px-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-bone/60 hover:border-bone/35 hover:text-bone"
                      >
                        <RotateCcw size={12} strokeWidth={1.75} aria-hidden="true" />
                        Retry
                      </button>
                    ) : null}
                  </div>
                  <p className="mt-3 font-display text-xl leading-snug tracking-[-0.02em]">
                    Which muscle forms the lateral border of the cubital fossa?
                  </p>
                  <ul className="mt-5 space-y-2">
                    {choices.map((choice) => {
                      const selected = picked === choice.id;
                      const state =
                        picked == null
                          ? "idle"
                          : choice.correct
                            ? "correct"
                            : selected
                              ? "wrong"
                              : "idle";
                      return (
                        <li key={choice.id}>
                          <button
                            type="button"
                            onClick={() => choose(choice.id)}
                            aria-pressed={selected}
                            disabled={answered && !selected && !choice.correct}
                            className={`k-squish flex min-h-12 w-full items-center gap-3 rounded-[6px] border px-3 text-left text-sm disabled:cursor-default disabled:opacity-45 ${
                              shakeId === choice.id ? "k-shake" : ""
                            } ${
                              state === "correct"
                                ? "border-signal bg-signal/15 text-bone"
                                : state === "wrong"
                                  ? "border-accent bg-accent/15 text-bone"
                                  : "border-bone/15 text-bone/85 hover:border-bone/35"
                            }`}
                          >
                            <span className="font-mono text-[0.72rem] text-bone/50">
                              {choice.id}
                            </span>
                            <span className="flex-1">{choice.text}</span>
                            {choice.correct ? (
                              <SuccessCheck done={state === "correct"} size={22} idleTone="stroke-transparent" />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p
                    key={picked ?? "idle"}
                    className={`mt-4 text-sm ${answered ? "k-toast" : ""} ${
                      !answered ? "text-bone/55" : correct ? "text-signal" : "text-bone/75"
                    }`}
                    aria-live="polite"
                  >
                    {!answered
                      ? "Select an answer to preview feedback."
                      : correct
                        ? "Correct. Brachioradialis is the lateral border; pronator teres is medial. +40 XP."
                        : "Not this one. The lateral border is brachioradialis."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
