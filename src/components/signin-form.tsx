"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Learner = { name: string; email: string; yearOfStudy: string };

export function SignInForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [learner, setLearner] = useState<Learner | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(data.get("email") ?? "") }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        learner?: Learner;
      };
      if (!response.ok || !payload.ok || !payload.learner) {
        setStatus("error");
        setMessage(payload.error ?? "Could not find a studio.");
        return;
      }
      setLearner(payload.learner);
      setStatus("ok");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again in a moment.");
    }
  }

  if (status === "ok" && learner) {
    return (
      <div className="mt-8 rounded-[10px] border border-border bg-card p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
          Welcome back
        </p>
        <p className="mt-3 font-display text-2xl">{learner.name}</p>
        <p className="mt-2 text-muted">
          {learner.yearOfStudy} · {learner.email}
        </p>
        <Link
          href="/anatomy"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[6px] bg-accent px-4 font-medium text-on-accent"
        >
          Continue to anatomy
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
      <label className="block">
        <span className="mb-1.5 block text-sm">Email</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className="h-11 w-full rounded-[6px] border border-border bg-card px-3"
        />
      </label>
      {message ? (
        <p role="status" className="text-sm text-accent">
          {message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Looking up…" : "Sign In"}
      </Button>
      <p className="text-sm text-muted">
        New here?{" "}
        <Link href="/get-started" className="text-primary underline-offset-2 hover:underline">
          Get started
        </Link>
      </p>
    </form>
  );
}
