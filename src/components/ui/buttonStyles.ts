import { cn } from "@/utils/cn";

/** Shared visual base for Button and LinkButton. */
export const buttonBaseClasses = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 py-2.5 text-sm font-medium",
  "transition-all duration-200 ease-[var(--ease-out)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "active:scale-[0.98]",
);

export const buttonVariantClasses = {
  primary: cn(
    "bg-[var(--color-primary)] text-white shadow-[var(--shadow-xs)]",
    "hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-card)]",
    "active:bg-[var(--color-primary-active)]",
    "focus-visible:ring-[var(--color-primary)]",
  ),
  secondary: cn(
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-xs)]",
    "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)] hover:shadow-[var(--shadow-card)]",
    "focus-visible:ring-[var(--color-primary)]",
  ),
  ghost: cn(
    "bg-transparent text-[var(--color-text-muted)]",
    "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
    "focus-visible:ring-[var(--color-primary)]",
  ),
  danger: cn(
    "border border-[var(--color-error)]/25 bg-[var(--color-error-bg)] text-[var(--color-error)]",
    "hover:border-[var(--color-error)]/40 hover:bg-[var(--color-error)]/10",
    "focus-visible:ring-[var(--color-error)]",
  ),
} as const;

export const buttonDisabledClasses =
  "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none";
