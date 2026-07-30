"use client";

import {
  Alert,
  Button,
  ConnectionBadge,
  PatientDetailsSkeleton,
} from "@/components/ui";
import { usePatientStore } from "@/hooks/usePatientStore";
import { formatDateTime } from "@/utils/format";
import { isBlankPatient } from "@/utils/patient";
import { EmptyPatientState } from "./EmptyPatientState";
import { PatientDetails } from "./PatientDetails";
import { PatientStatusBadge } from "./PatientStatusBadge";

/**
 * Staff dashboard — updates instantly via Socket.IO (no polling).
 */
export function StaffDashboard() {
  const {
    patient,
    updatedAt,
    activityStatus,
    connectionStatus,
    clearPatient,
  } = usePatientStore();

  const isEmpty = isBlankPatient(patient);
  const isConnecting = connectionStatus === "connecting" && isEmpty;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <ConnectionBadge status={connectionStatus} />
          <PatientStatusBadge status={activityStatus} />
          <p className="text-sm text-[var(--color-text-muted)]">
            Last updated:{" "}
            <span className="font-medium text-[var(--color-text)]">
              {formatDateTime(updatedAt)}
            </span>
          </p>
        </div>

        {!isEmpty ? (
          <Button
            type="button"
            variant="danger"
            onClick={clearPatient}
            className="w-full sm:w-auto"
          >
            Clear patient data
          </Button>
        ) : null}
      </div>

      {connectionStatus === "disconnected" ? (
        <Alert variant="error" title="Connection lost">
          WebSocket disconnected. Start the socket server with{" "}
          <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">
            npm run dev
          </code>{" "}
          and keep this tab open — it will reconnect automatically.
        </Alert>
      ) : null}

      {isConnecting ? (
        <PatientDetailsSkeleton />
      ) : isEmpty ? (
        <EmptyPatientState />
      ) : (
        <PatientDetails patient={patient!} />
      )}
    </div>
  );
}
