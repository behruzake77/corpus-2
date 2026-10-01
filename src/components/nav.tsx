"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/anatomy", label: "Anatomy" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const inverted = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        inverted
          ? "bg-transparent text-bone"
          : "bg-background/92 text-foreground shadow-[0_1px_0_rgba(23,32,37,0.08)] backdrop-blur-md"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo inverted={inverted} />
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active =
              link.href === pathname ||
              (link.href.startsWith("/#") && isHome);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.92rem] tracking-[-0.01em] transition-colors duration-200 ${
                  inverted
                    ? "text-bone/72 hover:text-bone"
                    : "text-muted hover:text-foreground"
                } ${active && !link.href.includes("#") ? "text-foreground" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink
            href="/signin"
            variant={inverted ? "outline-light" : "ghost"}
            size="sm"
          >
            Sign In
          </ButtonLink>
          <ButtonLink href="/get-started" variant="accent" size="sm">
            Get Started
          </ButtonLink>
        </div>
        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-[6px] lg:hidden ${
            inverted ? "text-bone" : "text-foreground"
          }`}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>
      {open ? (
        <div
          id={menuId}
          className="border-t border-border bg-background text-foreground lg:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-5 sm:px-6" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-12 items-center border-b border-border/70 font-display text-2xl tracking-[-0.02em]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ButtonLink href="/signin" variant="outline" onClick={() => setOpen(false)}>
                Sign In
              </ButtonLink>
              <ButtonLink href="/get-started" variant="accent" onClick={() => setOpen(false)}>
                Get Started
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
