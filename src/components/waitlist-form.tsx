"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
        }),
      });
      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Could not join the list.");
        return;
      }
      setStatus("ok");
      setMessage("You’re on the list. We’ll write when new systems open.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Name"
            className="h-11 w-full rounded-[6px] border border-border bg-card px-3 text-[0.95rem] text-foreground placeholder:text-muted/80"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Email"
            className="h-11 w-full rounded-[6px] border border-border bg-card px-3 text-[0.95rem] text-foreground placeholder:text-muted/80"
          />
        </label>
      </div>
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join the list"}
      </Button>
      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "error" ? "text-accent" : "text-primary"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
