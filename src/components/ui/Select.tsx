import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  controlBaseClasses,
  controlErrorClasses,
  controlIdleBorderClasses,
} from "./controlStyles";

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
    <div className="relative w-full">
      <select
        className={cn(
          controlBaseClasses,
          "min-h-11 appearance-none pr-10",
          hasError ? controlErrorClasses : controlIdleBorderClasses,
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--color-text-muted)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
