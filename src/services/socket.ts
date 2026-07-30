import { io, type Socket } from "socket.io-client";
import { config } from "@/lib/config";
import { SOCKET_EVENTS } from "@/lib/socketEvents";
import type { PatientUpdatePayload } from "@/types";

let socket: Socket | null = null;

/**
 * Returns a singleton Socket.IO client connected to the Node WebSocket server.
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(config.wsUrl, {
      autoConnect: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });
  }

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function emitPatientUpdate(payload: PatientUpdatePayload): void {
  getSocket().emit(SOCKET_EVENTS.PATIENT_UPDATE, payload);
}

export function emitPatientClear(): void {
  getSocket().emit(SOCKET_EVENTS.PATIENT_CLEAR);
}

export { SOCKET_EVENTS };
