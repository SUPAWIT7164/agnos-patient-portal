import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

type LinkButtonVariant = "primary" | "secondary";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  variant?: LinkButtonVariant;
}

const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
};

/**
 * Anchor styled like the shared Button component.
 */
export function LinkButton({
  children,
  variant = "primary",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-5 text-sm font-medium transition-colors",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
