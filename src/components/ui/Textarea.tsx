import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({
  hasError = false,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-y rounded-[var(--radius-control)] border bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]",
        "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        hasError
          ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
          : "border-[var(--color-border)]",
        className,
      )}
      {...props}
    />
  );
}
