import { cn } from "@/utils/cn";
import type { ConnectionStatus } from "@/types";

interface ConnectionBadgeProps {
  status: ConnectionStatus;
}

const statusConfig: Record<
  ConnectionStatus,
  { label: string; className: string; dotClassName: string }
> = {
  connected: {
    label: "Live",
    className:
      "border border-[var(--color-success)]/25 bg-[var(--color-success-bg)] text-[var(--color-success)]",
    dotClassName: "bg-[var(--color-success)] animate-pulse-live",
  },
  connecting: {
    label: "Connecting",
    className:
      "border border-[var(--color-warning)]/25 bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
    dotClassName: "bg-[var(--color-warning)] animate-pulse-soft",
  },
  disconnected: {
    label: "Offline",
    className:
      "border border-[var(--color-error)]/25 bg-[var(--color-error-bg)] text-[var(--color-error)]",
    dotClassName: "bg-[var(--color-error)]",
  },
};

export function ConnectionBadge({ status }: ConnectionBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-badge)] px-3 py-1.5 text-xs font-semibold tracking-wide shadow-[var(--shadow-xs)]",
        "transition-colors duration-200",
        config.className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.dotClassName)} />
      {config.label}
    </span>
  );
}
