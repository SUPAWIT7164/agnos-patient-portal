"use client";

import type { ReactNode } from "react";
import { PatientStoreProvider } from "@/hooks/usePatientStore";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers mounted once in the root layout.
 */
export function Providers({ children }: ProvidersProps) {
  return <PatientStoreProvider>{children}</PatientStoreProvider>;
}
