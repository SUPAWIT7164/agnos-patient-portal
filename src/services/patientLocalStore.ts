import type { PatientDraft, PatientUpdatePayload } from "@/types";

const STORAGE_KEY = "agnos.patient.current";

export type PatientStoreSnapshot = PatientUpdatePayload;

const EMPTY_SNAPSHOT: PatientStoreSnapshot = {
  patient: null,
  updatedAt: null,
  activityStatus: "idle",
};

/** Cached snapshot — must keep stable object identity for useSyncExternalStore. */
let cachedSnapshot: PatientStoreSnapshot = EMPTY_SNAPSHOT;
let hasHydratedFromStorage = false;

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

function snapshotsEqual(
  a: PatientStoreSnapshot,
  b: PatientStoreSnapshot,
): boolean {
  return (
    a.updatedAt === b.updatedAt &&
    a.activityStatus === b.activityStatus &&
    JSON.stringify(a.patient) === JSON.stringify(b.patient)
  );
}

function readFromStorage(): PatientStoreSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SNAPSHOT;

    const parsed = JSON.parse(raw) as Partial<PatientStoreSnapshot> & {
      patient?: (PatientDraft & { emergencyContact?: string }) | null;
    };

    const patient = parsed.patient ? migratePatient(parsed.patient) : null;

    return {
      patient,
      updatedAt: parsed.updatedAt ?? null,
      activityStatus: parsed.activityStatus ?? (patient ? "editing" : "idle"),
    };
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function hydrateCacheIfNeeded(): void {
  if (hasHydratedFromStorage || typeof window === "undefined") return;
  cachedSnapshot = readFromStorage();
  hasHydratedFromStorage = true;
}

function commitSnapshot(next: PatientStoreSnapshot): PatientStoreSnapshot {
  if (snapshotsEqual(cachedSnapshot, next)) {
    return cachedSnapshot;
  }

  cachedSnapshot = next;

  if (typeof window !== "undefined") {
    if (!next.patient) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    window.dispatchEvent(new Event("agnos:patient-updated"));
  }

  return cachedSnapshot;
}

/**
 * Local cache + cross-tab sync. Live multi-client updates go through Socket.IO.
 */
export const patientLocalStore = {
  /**
   * Must return a cached object. Creating a new object every call causes
   * useSyncExternalStore infinite loops.
   */
  getSnapshot(): PatientStoreSnapshot {
    hydrateCacheIfNeeded();
    return cachedSnapshot;
  },

  getServerSnapshot(): PatientStoreSnapshot {
    return EMPTY_SNAPSHOT;
  },

  subscribe(onStoreChange: () => void) {
    const handleUpdate = () => onStoreChange();
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = readFromStorage();
      if (!snapshotsEqual(cachedSnapshot, next)) {
        cachedSnapshot = next;
        hasHydratedFromStorage = true;
        onStoreChange();
      }
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
    commitSnapshot({
      patient: payload.patient ? migratePatient(payload.patient) : null,
      updatedAt: payload.updatedAt,
      activityStatus: payload.activityStatus ?? "idle",
    });
  },

  set(
    patient: PatientDraft | null,
    activityStatus: PatientUpdatePayload["activityStatus"] = "editing",
  ): PatientUpdatePayload {
    return commitSnapshot({
      patient,
      updatedAt: new Date().toISOString(),
      activityStatus: patient ? activityStatus : "idle",
    });
  },

  clear(): PatientUpdatePayload {
    return this.set(null, "idle");
  },
};
