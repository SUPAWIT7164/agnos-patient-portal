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
      "border border-[var(--color-success)]/20 bg-[var(--color-success-bg)] text-[var(--color-success)]",
    dotClassName: "bg-[var(--color-success)]",
  },
  connecting: {
    label: "Connecting",
    className:
      "border border-[var(--color-warning)]/20 bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
    dotClassName: "bg-[var(--color-warning)] animate-pulse",
  },
  disconnected: {
    label: "Offline",
    className:
      "border border-[var(--color-error)]/20 bg-[var(--color-error-bg)] text-[var(--color-error)]",
    dotClassName: "bg-[var(--color-error)]",
  },
};

export function ConnectionBadge({ status }: ConnectionBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClassName)} />
      {config.label}
    </span>
  );
}
