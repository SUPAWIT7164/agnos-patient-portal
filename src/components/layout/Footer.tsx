import { BrandLogo } from "@/components/layout/BrandLogo";
import { APP_NAME } from "@/lib/constants";

const techBadges = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Socket.IO",
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <BrandLogo href="/" />
            <p className="text-sm text-[var(--color-text-muted)]">
              &copy; {year} {APP_NAME}
            </p>
            <p className="max-w-sm text-center text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-left">
              Healthcare dashboard · Real-time patient registration
            </p>
          </div>

          <div className="flex flex-col items-center gap-2.5 sm:items-end">
            <p className="ui-label-caps">Built with</p>
            <ul className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              {techBadges.map((badge) => (
                <li key={badge}>
                  <span className="inline-flex items-center rounded-[var(--radius-badge)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--color-secondary)] shadow-[var(--shadow-xs)] transition-colors duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]">
                    {badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
