import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function Select({
  hasError = false,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "w-full min-h-11 appearance-none rounded-[var(--radius-control)] border bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors",
        "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        hasError
          ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
          : "border-[var(--color-border)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
