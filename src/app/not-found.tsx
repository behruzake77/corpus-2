import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[70svh] max-w-xl flex-col justify-center px-4 pt-24 sm:px-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-[-0.03em]">This plate is missing.</h1>
      <p className="mt-4 text-muted">
        The page you requested is not in the atlas. Return home or open a system.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="accent">
          Back home
        </ButtonLink>
        <ButtonLink href="/anatomy" variant="outline">
          Explore anatomy
        </ButtonLink>
      </div>
    </main>
  );
}
