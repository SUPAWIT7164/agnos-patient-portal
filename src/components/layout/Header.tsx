"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/utils/cn";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 shadow-[var(--shadow-xs)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center">
          <BrandLogo priority showWordmark />
        </div>

        <nav
          aria-label="Main navigation"
          className="-mx-1 flex max-w-[60%] items-center gap-1 overflow-x-auto px-1 sm:max-w-none"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-[var(--radius-control)] px-3 py-2 text-xs font-medium sm:px-3.5 sm:text-sm",
                  "transition-all duration-200 ease-[var(--ease-out)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                  isActive
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] shadow-[var(--shadow-nav-active)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
