"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const years = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "M3", label: "M3" },
  { value: "M4", label: "M4" },
  { value: "PA", label: "PA / other health" },
  { value: "Other", label: "Other" },
];

type Learner = { name: string; email: string; yearOfStudy: string };

export function StartForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [learner, setLearner] = useState<Learner | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/learners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          yearOfStudy: String(data.get("yearOfStudy") ?? ""),
          institution: String(data.get("institution") ?? ""),
        }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        already?: boolean;
        learner?: Learner;
      };
      if (!response.ok || !payload.ok || !payload.learner) {
        setStatus("error");
        setMessage(payload.error ?? "Could not create your studio.");
        return;
      }
      setLearner(payload.learner);
      setStatus("ok");
      setMessage(
        payload.already
          ? "A studio already exists for this email. Welcome back."
          : "Studio created. Your first system is ready to explore.",
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Try again in a moment.");
    }
  }

  if (status === "ok" && learner) {
    return (
      <div className="mt-8 rounded-[10px] border border-border bg-card p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
          Studio ready
        </p>
        <p className="mt-3 font-display text-2xl tracking-[-0.02em]">{learner.name}</p>
        <p className="mt-2 text-muted">
          {learner.yearOfStudy} · {learner.email}
        </p>
        <p className="mt-4 text-[0.95rem] text-foreground/80">{message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/anatomy"
            className="inline-flex h-11 items-center justify-center rounded-[6px] bg-accent px-4 font-medium text-on-accent"
          >
            Explore anatomy
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex h-11 items-center justify-center rounded-[6px] border border-border px-4 font-medium"
          >
            See how it works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground">Full name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          className="h-11 w-full rounded-[6px] border border-border bg-card px-3"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground">Email</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className="h-11 w-full rounded-[6px] border border-border bg-card px-3"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground">Year of study</span>
        <select
          name="yearOfStudy"
          required
          defaultValue=""
          className="h-11 w-full rounded-[6px] border border-border bg-card px-3"
        >
          <option value="" disabled>
            Select
          </option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground">
          Institution <span className="text-muted">(optional)</span>
        </span>
        <input
          name="institution"
          type="text"
          autoComplete="organization"
          className="h-11 w-full rounded-[6px] border border-border bg-card px-3"
        />
      </label>
      {message ? (
        <p role="status" className="text-sm text-accent">
          {message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Creating studio…" : "Start Learning"}
      </Button>
    </form>
  );
}
