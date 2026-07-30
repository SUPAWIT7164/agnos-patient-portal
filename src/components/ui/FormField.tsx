import type { ReactNode } from "react";
import { Label } from "./Label";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * Wraps a form control with label, hint, and error message.
 */
export function FormField({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p
          id={`${id}-hint`}
          className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)]"
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 animate-fade-in-up rounded-[var(--radius-icon)] bg-[var(--color-error-bg)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-error)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
