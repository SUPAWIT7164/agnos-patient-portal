import { cn } from "@/utils/cn";
import type { PatientActivityStatus } from "@/types";

interface PatientStatusBadgeProps {
  status: PatientActivityStatus;
}

const statusConfig: Record<
  PatientActivityStatus,
  { label: string; description: string; className: string; dotClassName: string }
> = {
  editing: {
    label: "Actively filling",
    description: "Patient is currently entering information",
    className:
      "border border-[var(--color-info)]/25 bg-[var(--color-info-bg)] text-[var(--color-info)]",
    dotClassName: "bg-[var(--color-info)] animate-pulse-soft",
  },
  inactive: {
    label: "Inactive",
    description: "Patient stopped interacting with the form",
    className:
      "border border-[var(--color-warning)]/25 bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
    dotClassName: "bg-[var(--color-warning)]",
  },
  submitted: {
    label: "Submitted",
    description: "Patient has submitted the form",
    className:
      "border border-[var(--color-success)]/25 bg-[var(--color-success-bg)] text-[var(--color-success)]",
    dotClassName: "bg-[var(--color-success)]",
  },
  idle: {
    label: "Idle",
    description: "No active patient session",
    className:
      "border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]",
    dotClassName: "bg-[var(--color-text-muted)]",
  },
};

/**
 * Staff-facing indicator for patient form activity status.
 */
export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-0.5 rounded-[var(--radius-panel)] px-3.5 py-2.5 shadow-[var(--shadow-xs)]",
        "transition-colors duration-200",
        config.className,
      )}
      title={config.description}
    >
      <span className="inline-flex items-center gap-1.5 text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--tracking-label)]">
        <span className={cn("h-2 w-2 rounded-full", config.dotClassName)} />
        {config.label}
      </span>
      <span className="text-[length:var(--text-label)] font-medium opacity-80 sm:text-xs">
        {config.description}
      </span>
    </div>
  );
}
