"use client";

import {
  Alert,
  Button,
  ConnectionBadge,
  IconTrash,
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
    <div className="space-y-5 sm:space-y-6">
      <div className="ui-status-bar sm:flex-nowrap">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <ConnectionBadge status={connectionStatus} />
          <PatientStatusBadge status={activityStatus} />
          <p className="text-sm text-[var(--color-text-muted)]">
            Last updated:{" "}
            <span
              key={updatedAt ?? "none"}
              className="inline-block font-medium text-[var(--color-text)] animate-fade-in"
            >
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
            <IconTrash className="h-4 w-4" />
            Clear patient data
          </Button>
        ) : null}
      </div>

      {connectionStatus === "disconnected" ? (
        <Alert variant="error" title="Connection lost">
          WebSocket disconnected. Start the socket server with{" "}
          <code className="rounded-[var(--radius-icon)] bg-[var(--color-surface)]/80 px-1.5 py-0.5 text-xs">
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
        <div className="animate-fade-in-up">
          <PatientDetails patient={patient!} />
        </div>
      )}
    </div>
  );
}
