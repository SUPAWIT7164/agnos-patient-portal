import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonBaseClasses, buttonVariantClasses } from "./buttonStyles";

type LinkButtonVariant = "primary" | "secondary";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  variant?: LinkButtonVariant;
}

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
        buttonBaseClasses,
        buttonVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
