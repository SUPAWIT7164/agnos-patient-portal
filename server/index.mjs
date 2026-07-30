/**
 * Socket.IO server for Agnos Patient Portal.
 * Keeps the latest patient payload in memory and broadcasts updates to all clients.
 *
 * Local:  npm run dev:socket
 * Host:   Render / Railway / Fly (Netlify cannot host persistent WebSockets)
 */

import { createServer } from "node:http";
import { Server } from "socket.io";
import {
  DEFAULT_SOCKET_PORT,
  SOCKET_EVENTS,
} from "../shared/socketEvents.mjs";

const PORT = Number(process.env.PORT || process.env.SOCKET_PORT || DEFAULT_SOCKET_PORT);

/**
 * Supports one origin or a comma-separated list:
 * CLIENT_ORIGIN=http://localhost:3000,https://your-app.netlify.app
 */
const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGIN || "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {{ patient: object | null, updatedAt: string | null, activityStatus: string }} */
let latestPayload = {
  patient: null,
  updatedAt: null,
  activityStatus: "idle",
};

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, clients: io.engine.clientsCount }));
    return;
  }

  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGINS.length === 1 ? CLIENT_ORIGINS[0] : CLIENT_ORIGINS,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`[socket] connected: ${socket.id}`);

  // Send current state immediately so Staff View is populated without polling.
  socket.emit(SOCKET_EVENTS.PATIENT_SYNC, latestPayload);

  socket.on(SOCKET_EVENTS.PATIENT_UPDATE, (payload) => {
    if (!payload || typeof payload !== "object") return;

    latestPayload = {
      patient: payload.patient ?? null,
      updatedAt: payload.updatedAt ?? new Date().toISOString(),
      activityStatus: payload.activityStatus ?? "editing",
    };

    io.emit(SOCKET_EVENTS.PATIENT_UPDATE, latestPayload);
    console.log(`[socket] patient:update from ${socket.id}`);
  });

  socket.on(SOCKET_EVENTS.PATIENT_CLEAR, () => {
    latestPayload = {
      patient: null,
      updatedAt: new Date().toISOString(),
      activityStatus: "idle",
    };

    io.emit(SOCKET_EVENTS.PATIENT_CLEAR, latestPayload);
    console.log(`[socket] patient:clear from ${socket.id}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`[socket] disconnected: ${socket.id} (${reason})`);
  });
});

httpServer.listen(PORT, () => {
  console.log(
    `[socket] Agnos WebSocket server listening on port ${PORT}`,
  );
  console.log(`[socket] CORS origins: ${CLIENT_ORIGINS.join(", ")}`);
});
