import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "accent" | "primary" | "outline" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  accent:
    "bg-accent text-on-accent hover:bg-[#8e2c2c] border border-accent",
  primary:
    "bg-primary text-on-primary hover:bg-[#175456] border border-primary",
  outline:
    "bg-transparent text-foreground border border-foreground/25 hover:border-foreground/55 hover:bg-foreground/5",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/6 border border-transparent",
  "outline-light":
    "bg-transparent text-bone border border-bone/30 hover:border-bone/70 hover:bg-bone/8",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-5 text-base min-h-12",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

function classes(variant: Variant, size: Size, className: string) {
  return `inline-flex items-center justify-center gap-2 rounded-[6px] font-medium tracking-[-0.01em] transition-colors duration-200 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  children,
  className = "",
  variant = "accent",
  size = "md",
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "accent",
  size = "md",
  href,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
