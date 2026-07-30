import Image from "next/image";
import { LinkButton } from "@/components/ui";

export function EmptyPatientState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-primary-light)]/40 px-6 py-14 text-center">
      <div className="mb-4 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm">
        <Image
          src="/agnos.jpg"
          alt=""
          width={120}
          height={48}
          className="h-10 w-auto object-contain"
        />
      </div>
      <h2 className="text-lg font-semibold text-[var(--color-secondary)]">
        Waiting for patient data
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
        Open the Patient Form in another tab and start typing. This dashboard
        updates instantly over WebSocket — no refresh and no polling.
      </p>
      <LinkButton href="/patient" className="mt-6">
        Open Patient Form
      </LinkButton>
    </div>
  );
}
