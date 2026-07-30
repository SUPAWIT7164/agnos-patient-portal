import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { IconAlert, IconCheckCircle, IconInfo } from "./Icons";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "border-[var(--color-info)]/20 bg-[var(--color-info-bg)] text-[var(--color-info)]",
  success:
    "border-[var(--color-success)]/25 bg-[var(--color-success-bg)] text-[var(--color-success)]",
  warning:
    "border-[var(--color-warning)]/25 bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  error:
    "border-[var(--color-error)]/25 bg-[var(--color-error-bg)] text-[var(--color-error)]",
};

const variantIcons: Record<AlertVariant, ReactNode> = {
  info: <IconInfo className="h-4 w-4" />,
  success: <IconCheckCircle className="h-4 w-4" />,
  warning: <IconAlert className="h-4 w-4" />,
  error: <IconAlert className="h-4 w-4" />,
};

/**
 * Inline status / error / success message for dashboard pages.
 */
export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "animate-fade-in-up flex gap-3 rounded-[var(--radius-panel)] border px-4 py-3.5 text-sm leading-relaxed shadow-[var(--shadow-xs)]",
        variantClasses[variant],
        className,
      )}
    >
      <span className="mt-0.5 shrink-0 opacity-90" aria-hidden>
        {variantIcons[variant]}
      </span>
      <div className="min-w-0">
        {title ? <p className="mb-0.5 font-semibold">{title}</p> : null}
        <div className="opacity-95">{children}</div>
      </div>
    </div>
  );
}
