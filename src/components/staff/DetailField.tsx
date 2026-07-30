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
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-sm",
        fullWidth && "sm:col-span-2",
        className,
      )}
    >
      <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 break-words text-sm font-medium sm:text-base",
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
