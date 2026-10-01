import type { ComponentProps } from "react";

type FloatingFieldProps = Omit<ComponentProps<"input">, "placeholder" | "id"> & {
  id: string;
  label: string;
  invalid?: boolean;
  className?: string;
  inputClassName?: string;
};

/**
 * Floating Label (Kinetics) — the label sits in the field, then springs up
 * on focus or when the input has a value. The `placeholder` is a single space
 * so `:placeholder-shown` works without showing text.
 */
export function FloatingField({
  id,
  label,
  invalid = false,
  className = "",
  inputClassName = "",
  ...props
}: FloatingFieldProps) {
  return (
    <div className={`k-field ${invalid ? "k-shake" : ""} ${className}`}>
      <input
        id={id}
        placeholder=" "
        aria-invalid={invalid || undefined}
        className={`peer h-12 w-full rounded-[6px] border bg-card px-3 pt-3 text-[0.95rem] text-foreground transition-colors duration-200 focus:border-primary ${
          invalid ? "border-accent" : "border-border"
        } ${inputClassName}`}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
