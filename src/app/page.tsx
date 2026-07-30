import Image from "next/image";
import Link from "next/link";
import { Card, LinkButton } from "@/components/ui";
import { APP_NAME } from "@/lib/constants";

const features = [
  {
    href: "/patient",
    title: "Patient Form",
    description:
      "Capture demographics, contact details, and preferences with full validation.",
    badge: "Registration",
    accent: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
  },
  {
    href: "/staff",
    title: "Staff View",
    description:
      "Monitor every patient field live as the form updates over WebSocket.",
    badge: "Live monitor",
    accent: "bg-[var(--color-accent)]/25 text-[var(--color-secondary)]",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <Card padding="lg" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--color-accent)]/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-[var(--color-primary)]/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Agnos Healthcare Dashboard
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--color-secondary)] sm:text-4xl">
              Patient registration, synced in real time
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              A professional portal for front-desk registration and staff
              monitoring. Validated forms on one side, instant Socket.IO updates
              on the other.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/patient">Start registration</LinkButton>
              <LinkButton href="/staff" variant="secondary">
                Open staff view
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-light)]/70 p-6 shadow-[var(--shadow-card)] sm:max-w-[260px] lg:mx-0">
            <Image
              src="/agnos.jpg"
              alt={APP_NAME}
              width={220}
              height={88}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href} className="group">
            <Card hover padding="md" className="h-full">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${feature.accent}`}
              >
                {feature.badge}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-secondary)] transition-colors group-hover:text-[var(--color-primary)]">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {feature.description}
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--color-primary)]">
                Open →
              </p>
            </Card>
          </Link>
        ))}
      </section>

      <Card padding="md" className="bg-[var(--color-surface)]">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Validation", value: "Zod + RHF" },
            { label: "Realtime", value: "Socket.IO" },
            { label: "Layout", value: "Mobile → Desktop" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-primary-light)]/50 px-4 py-3"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-secondary)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
