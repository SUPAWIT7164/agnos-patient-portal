import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-panel)] bg-[var(--color-border)]/60",
        className,
      )}
    />
  );
}

/**
 * Staff dashboard loading placeholder.
 */
export function PatientDetailsSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6" aria-busy="true" aria-live="polite">
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[4.5rem] w-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[4.5rem] w-full" />
        ))}
      </div>
      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Connecting to live updates...
      </p>
    </div>
  );
}
