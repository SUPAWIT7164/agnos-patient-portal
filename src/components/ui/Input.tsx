import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  controlBaseClasses,
  controlErrorClasses,
  controlIdleBorderClasses,
} from "./controlStyles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError = false, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        controlBaseClasses,
        "min-h-11 placeholder:text-[var(--color-text-muted)]/80",
        hasError ? controlErrorClasses : controlIdleBorderClasses,
        className,
      )}
      {...props}
    />
  );
}
