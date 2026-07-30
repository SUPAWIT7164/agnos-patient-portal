import { APP_NAME } from "@/lib/constants";

/**
 * Runtime configuration for the Next.js client.
 */
export const config = {
  appName: APP_NAME,
  wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:3001",
} as const;
