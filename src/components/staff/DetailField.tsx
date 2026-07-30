import { cn } from "@/utils/cn";

interface DetailFieldProps {
  label: string;
  value: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Reusable read-only field used by Staff View.
 */
export function DetailField({
  label,
  value,
  className,
  fullWidth = false,
}: DetailFieldProps) {
  const isEmpty = value === "Not provided" || value === "—";

  return (
    <div
      className={cn(
        "rounded-[var(--radius-panel)] border border-[var(--color-border)]/80 bg-[var(--color-surface)] px-4 py-3.5",
        "transition-colors duration-200 ease-[var(--ease-out)] hover:border-[var(--color-border-strong)]",
        fullWidth && "sm:col-span-2",
        className,
      )}
    >
      <dt className="ui-label-caps">{label}</dt>
      <dd
        key={value}
        className={cn(
          "mt-1.5 break-words text-sm font-medium animate-fade-in-up",
          isEmpty
            ? "italic text-[var(--color-text-muted)]"
            : "text-[var(--color-text)]",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
