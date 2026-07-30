import { BrandLogo } from "@/components/layout/BrandLogo";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]/90">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <BrandLogo href="/" className="opacity-95" />
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; {year} {APP_NAME}
          </p>
        </div>
        <p className="text-center text-xs text-[var(--color-text-muted)] sm:text-right sm:text-sm">
          Healthcare dashboard · Real-time patient registration
        </p>
      </div>
    </footer>
  );
}
