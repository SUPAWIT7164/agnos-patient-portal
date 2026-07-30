import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import {
  buttonBaseClasses,
  buttonDisabledClasses,
  buttonVariantClasses,
} from "./buttonStyles";
import { Spinner } from "./Spinner";

type ButtonVariant = keyof typeof buttonVariantClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  loadingText = "Saving...",
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        buttonBaseClasses,
        buttonDisabledClasses,
        buttonVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
