"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingField, SuccessCheck } from "@/components/kinetics";

export function WaitlistForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);

  function fail(text: string) {
    setStatus("error");
    setMessage(text);
    // Error Shake — re-arm so repeated failures still shake.
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    setTimeout(() => setShake(false), 500);
  }

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
        fail(payload.error ?? "Could not join the list.");
        return;
      }
      setStatus("ok");
      setMessage("You’re on the list. We’ll write when new systems open.");
      form.reset();
    } catch {
      fail("Network error. Try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <FloatingField
          id={`${id}-name`}
          name="name"
          label="Name"
          type="text"
          autoComplete="name"
          required
          invalid={shake}
        />
        <FloatingField
          id={`${id}-email`}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          invalid={shake}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" disabled={status === "loading" || status === "ok"}>
          {status === "loading" ? "Joining…" : status === "ok" ? "Joined" : "Join the list"}
          {status === "ok" ? (
            <SuccessCheck done size={18} tone="stroke-on-primary" idleTone="stroke-transparent" />
          ) : null}
        </Button>
        {message ? (
          <p
            key={`${status}-${message}`}
            role="status"
            className={`k-toast text-sm ${status === "error" ? "text-accent" : "text-primary"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
