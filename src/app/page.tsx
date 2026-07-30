import Image from "next/image";
import Link from "next/link";
import {
  Card,
  IconArrowRight,
  IconClipboard,
  IconMonitor,
  IconShieldCheck,
  IconZap,
  LinkButton,
} from "@/components/ui";
import { APP_NAME } from "@/lib/constants";

const features = [
  {
    href: "/patient",
    title: "Patient Form",
    description:
      "Capture demographics, contact details, and preferences with full validation.",
    badge: "Registration",
    icon: IconClipboard,
  },
  {
    href: "/staff",
    title: "Staff View",
    description:
      "Monitor every patient field live as the form updates over WebSocket.",
    badge: "Live monitor",
    icon: IconMonitor,
  },
] as const;

const capabilities = [
  {
    title: "Patient Form",
    description: "Structured registration for front-desk workflows.",
    icon: IconClipboard,
  },
  {
    title: "Staff View",
    description: "Live monitoring dashboard for clinical staff.",
    icon: IconMonitor,
  },
  {
    title: "Validation",
    description: "Zod schemas with clear, accessible field-level messages.",
    icon: IconShieldCheck,
  },
  {
    title: "Real-time Sync",
    description: "Socket.IO broadcasts updates instantly — no polling.",
    icon: IconZap,
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <Card padding="lg" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--color-accent)]/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-[var(--color-primary)]/12 blur-3xl"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 flex-1">
            <p className="ui-eyebrow">Agnos Healthcare Dashboard</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--color-secondary)] sm:text-4xl sm:leading-tight">
              Patient registration, synced in real time
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              A professional portal for front-desk registration and staff
              monitoring. Validated forms on one side, instant Socket.IO updates
              on the other.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/patient">
                Start registration
                <IconArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/staff" variant="secondary">
                <IconMonitor className="h-4 w-4" />
                Open staff view
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-surface)] p-7 shadow-[var(--shadow-card)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] sm:max-w-[240px] lg:mx-0">
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

      <section
        aria-label="Capabilities"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              padding="sm"
              className="transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <span className="ui-icon-well h-9 w-9">
                <Icon className="h-4 w-4" />
              </span>
              <h2 className="mt-3 text-sm font-semibold text-[var(--color-secondary)]">
                {item.title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                {item.description}
              </p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.href} href={feature.href} className="group">
              <Card hover padding="md" className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <span className="ui-icon-well h-10 w-10 transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex rounded-[var(--radius-badge)] bg-[var(--color-primary-light)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
                    {feature.badge}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-[var(--color-secondary)] transition-colors group-hover:text-[var(--color-primary)]">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {feature.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]">
                  Open
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </p>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
