import type { Metadata } from "next";
import { SignInForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Return to your Corpus anatomy studio.",
};

export default function SignInPage() {
  return (
    <main id="main" className="min-h-[100svh] bg-background px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
          Sign in
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.03em]">Return to studio</h1>
        <p className="mt-3 text-muted">
          Use the email you started with. We’ll look up your learner record.
        </p>
        <SignInForm />
      </div>
    </main>
  );
}
