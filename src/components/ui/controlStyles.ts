import { cn } from "@/utils/cn";

/** Shared visual base for Input, Select, and Textarea. */
export const controlBaseClasses = cn(
  "w-full rounded-[var(--radius-control)] border bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] shadow-[var(--shadow-xs)] outline-none",
  "transition-all duration-200 ease-[var(--ease-out)]",
  "hover:border-[var(--color-border-strong)]",
  "focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-focus)] focus:ring-2 focus:ring-[var(--color-primary)]/15",
  "disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:opacity-60",
);

export const controlErrorClasses =
  "border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[var(--shadow-focus-error)] focus:ring-[var(--color-error)]/15";

export const controlIdleBorderClasses = "border-[var(--color-border)]";
