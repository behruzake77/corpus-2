import Link from "next/link";
import { Logo } from "@/components/logo";
import { WaitlistForm } from "@/components/waitlist-form";

const footerNav = [
  { href: "/#features", label: "Features" },
  { href: "/anatomy", label: "Anatomy" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/signin", label: "Sign in" },
  { href: "/get-started", label: "Get started" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#EBE4D6] text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-[0.95rem] text-muted">
            An anatomy studio for medical students who need more than flashcards.
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.95rem] text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            Studio notes
          </p>
          <p className="mt-4 text-[0.95rem] text-muted">
            Join the list for lesson drops and early access. No spam — we write like we teach.
          </p>
          <WaitlistForm />
        </div>
      </div>
      <div className="border-t border-border/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Corpus. Built for medical education.</p>
          <p className="font-mono tracking-wide">Anatomy · Retrieval · Clinic</p>
        </div>
      </div>
    </footer>
  );
}
