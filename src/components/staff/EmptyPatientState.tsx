import Image from "next/image";
import {
  IconArrowRight,
  IconClipboard,
  IconWifi,
  LinkButton,
} from "@/components/ui";

export function EmptyPatientState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-panel)] border border-dashed border-[var(--color-border-strong)] bg-gradient-to-b from-[var(--color-primary-light)]/50 to-[var(--color-surface)] px-6 py-14 text-center shadow-[var(--shadow-xs)] sm:py-16">
      <div className="mb-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-[var(--shadow-card)]">
        <Image
          src="/agnos.jpg"
          alt=""
          width={120}
          height={48}
          className="h-9 w-auto object-contain"
        />
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-badge)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] shadow-[var(--shadow-xs)]">
        <IconWifi className="h-4 w-4 text-[var(--color-primary)]" />
        Listening for live updates
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-[var(--color-secondary)] sm:text-xl">
        Waiting for patient data
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
        Open the Patient Form in another tab and start typing. This dashboard
        updates instantly over WebSocket — no refresh and no polling.
      </p>
      <LinkButton href="/patient" className="mt-7">
        <IconClipboard className="h-4 w-4" />
        Open Patient Form
        <IconArrowRight className="h-4 w-4" />
      </LinkButton>
    </div>
  );
}
