import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

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
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        variantClasses[variant],
        className,
      )}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
