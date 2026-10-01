"use client";

import { useEffect, useRef, useState } from "react";

type BumpNumberProps = {
  value: number;
  format?: (n: number) => string;
  className?: string;
  bumpClassName?: string;
};

/**
 * Number Counter (Kinetics) — the figure pops with a spring scale every time it changes.
 */
export function BumpNumber({
  value,
  format = (n) => n.toLocaleString("en-US"),
  className = "",
  bumpClassName = "",
}: BumpNumberProps) {
  const [bump, setBump] = useState(false);
  const previous = useRef(value);

  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <span className={`k-bump tabular-nums ${bump ? `is-bumping ${bumpClassName}` : ""} ${className}`}>
      {format(value)}
    </span>
  );
}
