import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export function Label({
  children,
  required = false,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-medium text-[var(--color-text)]",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-1 text-[var(--color-error)]" aria-hidden>
          *
        </span>
      ) : (
        <span className="ml-1 text-xs font-normal text-[var(--color-text-muted)]">
          (optional)
        </span>
      )}
    </label>
  );
}
