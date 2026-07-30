import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
} as const;

/**
 * Dashboard card container with rounded corners and soft shadow.
 */
export function Card({
  children,
  className,
  padding = "md",
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]",
        paddingClasses[padding],
        hover &&
          "transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  titleId?: string;
}

export function CardHeader({
  title,
  description,
  action,
  titleId,
}: CardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[var(--color-border)] pb-5 sm:mb-7 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1
          id={titleId}
          className="text-2xl font-semibold tracking-tight text-[var(--color-secondary)] sm:text-3xl"
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function SectionCard({
  title,
  children,
  className,
  icon,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/40 p-4 shadow-[var(--shadow-xs)] sm:p-5",
        "transition-shadow duration-200 ease-[var(--ease-out)] hover:shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2.5 border-b border-[var(--color-border)] pb-3">
        {icon ? <span className="ui-icon-well">{icon}</span> : null}
        <h2 className="ui-label-caps">{title}</h2>
      </div>
      {children}
    </section>
  );
}
