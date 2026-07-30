/**
 * Shared Socket.IO event names used by both the Next.js client and Node server.
 * Keep this file plain ESM so `server/index.mjs` can import it directly.
 */
export const SOCKET_EVENTS = {
  PATIENT_UPDATE: "patient:update",
  PATIENT_CLEAR: "patient:clear",
  PATIENT_SYNC: "patient:sync",
};

export const DEFAULT_SOCKET_PORT = 3001;
