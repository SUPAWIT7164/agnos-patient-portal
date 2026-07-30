import type { PatientDraft, PatientUpdatePayload } from "@/types";

const STORAGE_KEY = "agnos.patient.current";

export type PatientStoreSnapshot = PatientUpdatePayload;

const EMPTY_SNAPSHOT: PatientStoreSnapshot = {
  patient: null,
  updatedAt: null,
  activityStatus: "idle",
};

function readSnapshot(): PatientStoreSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SNAPSHOT;
    const parsed = JSON.parse(raw) as Partial<PatientStoreSnapshot> & {
      // migrate old Phase 3/4 payload that used emergencyContact
      patient?: (PatientDraft & { emergencyContact?: string }) | null;
    };

    const patient = parsed.patient
      ? migratePatient(parsed.patient)
      : null;

    return {
      patient,
      updatedAt: parsed.updatedAt ?? null,
      activityStatus: parsed.activityStatus ?? (patient ? "editing" : "idle"),
    };
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function migratePatient(
  patient: PatientDraft & { emergencyContact?: string },
): PatientDraft {
  const {
    emergencyContact,
    emergencyContactName,
    emergencyContactRelationship,
    ...rest
  } = patient;

  return {
    ...rest,
    emergencyContactName:
      emergencyContactName || emergencyContact || undefined,
    emergencyContactRelationship: emergencyContactRelationship || undefined,
  };
}

function writeSnapshot(snapshot: PatientStoreSnapshot): void {
  if (typeof window === "undefined") return;

  if (!snapshot.patient) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

  window.dispatchEvent(new Event("agnos:patient-updated"));
}

/**
 * Local cache + cross-tab sync. Live multi-client updates go through Socket.IO.
 */
export const patientLocalStore = {
  getSnapshot: readSnapshot,

  getServerSnapshot(): PatientStoreSnapshot {
    return EMPTY_SNAPSHOT;
  },

  subscribe(onStoreChange: () => void) {
    const handleUpdate = () => onStoreChange();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) onStoreChange();
    };

    window.addEventListener("agnos:patient-updated", handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("agnos:patient-updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  },

  /**
   * Applies a payload locally without emitting to the socket (avoids echo loops).
   */
  applyRemote(payload: PatientUpdatePayload): void {
    writeSnapshot({
      patient: payload.patient ? migratePatient(payload.patient) : null,
      updatedAt: payload.updatedAt,
      activityStatus: payload.activityStatus ?? "idle",
    });
  },

  set(
    patient: PatientDraft | null,
    activityStatus: PatientUpdatePayload["activityStatus"] = "editing",
  ): PatientUpdatePayload {
    const payload: PatientUpdatePayload = {
      patient,
      updatedAt: new Date().toISOString(),
      activityStatus: patient ? activityStatus : "idle",
    };
    writeSnapshot(payload);
    return payload;
  },

  clear(): PatientUpdatePayload {
    return this.set(null, "idle");
  },
};
