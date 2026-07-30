import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Reusable application chrome: sticky header, main content area, footer.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
