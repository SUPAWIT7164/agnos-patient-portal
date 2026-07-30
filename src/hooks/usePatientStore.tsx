"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type {
  ConnectionStatus,
  PatientActivityStatus,
  PatientDraft,
  PatientUpdatePayload,
} from "@/types";
import { SOCKET_EVENTS } from "@/lib/socketEvents";
import { patientLocalStore } from "@/services/patientLocalStore";
import {
  emitPatientClear,
  emitPatientUpdate,
  getSocket,
} from "@/services/socket";

interface PatientStoreValue {
  patient: PatientDraft | null;
  updatedAt: string | null;
  activityStatus: PatientActivityStatus;
  connectionStatus: ConnectionStatus;
  /** Persist locally and broadcast over WebSocket. */
  broadcastPatient: (
    patient: PatientDraft,
    activityStatus?: PatientActivityStatus,
  ) => void;
  clearPatient: () => void;
}

const PatientStoreContext = createContext<PatientStoreValue | null>(null);

interface PatientStoreProviderProps {
  children: ReactNode;
}

function applyIncoming(payload: PatientUpdatePayload) {
  if (!payload || typeof payload !== "object") return;
  patientLocalStore.applyRemote({
    patient: payload.patient ?? null,
    updatedAt: payload.updatedAt ?? new Date().toISOString(),
    activityStatus: payload.activityStatus ?? "idle",
  });
}

/**
 * Shared patient state + Socket.IO realtime sync.
 */
export function PatientStoreProvider({ children }: PatientStoreProviderProps) {
  const snapshot = useSyncExternalStore(
    patientLocalStore.subscribe,
    patientLocalStore.getSnapshot,
    patientLocalStore.getServerSnapshot,
  );
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => setConnectionStatus("connected");
    const onDisconnect = () => setConnectionStatus("disconnected");
    const onConnectError = () => setConnectionStatus("disconnected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on(SOCKET_EVENTS.PATIENT_SYNC, applyIncoming);
    socket.on(SOCKET_EVENTS.PATIENT_UPDATE, applyIncoming);
    socket.on(SOCKET_EVENTS.PATIENT_CLEAR, applyIncoming);

    if (!socket.connected) {
      socket.connect();
    } else {
      queueMicrotask(onConnect);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off(SOCKET_EVENTS.PATIENT_SYNC, applyIncoming);
      socket.off(SOCKET_EVENTS.PATIENT_UPDATE, applyIncoming);
      socket.off(SOCKET_EVENTS.PATIENT_CLEAR, applyIncoming);
    };
  }, []);

  const broadcastPatient = useCallback(
    (
      next: PatientDraft,
      activityStatus: PatientActivityStatus = "editing",
    ) => {
      const payload = patientLocalStore.set(next, activityStatus);
      emitPatientUpdate(payload);
    },
    [],
  );

  const clearPatient = useCallback(() => {
    patientLocalStore.clear();
    emitPatientClear();
  }, []);

  const value = useMemo(
    () => ({
      patient: snapshot.patient,
      updatedAt: snapshot.updatedAt,
      activityStatus: snapshot.activityStatus,
      connectionStatus,
      broadcastPatient,
      clearPatient,
    }),
    [
      snapshot.patient,
      snapshot.updatedAt,
      snapshot.activityStatus,
      connectionStatus,
      broadcastPatient,
      clearPatient,
    ],
  );

  return (
    <PatientStoreContext.Provider value={value}>
      {children}
    </PatientStoreContext.Provider>
  );
}

export function usePatientStore() {
  const context = useContext(PatientStoreContext);

  if (!context) {
    throw new Error("usePatientStore must be used within PatientStoreProvider");
  }

  return context;
}
