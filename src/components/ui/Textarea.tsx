import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import {
  controlBaseClasses,
  controlErrorClasses,
  controlIdleBorderClasses,
} from "./controlStyles";

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
        controlBaseClasses,
        "min-h-[6.5rem] resize-y placeholder:text-[var(--color-text-muted)]/80",
        hasError ? controlErrorClasses : controlIdleBorderClasses,
        className,
      )}
      {...props}
    />
  );
}
