import { GENDER_OPTIONS } from "@/lib/constants";
import type { Gender, PatientDraft } from "@/types";

export function formatGender(gender: Gender | "" | undefined): string {
  if (!gender) return "Not provided";

  return (
    GENDER_OPTIONS.find((option) => option.value === gender)?.label ?? gender
  );
}

export function formatDateOfBirth(value: string | undefined): string {
  if (!value) return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatOptional(value?: string): string {
  return value && value.trim().length > 0 ? value : "Not provided";
}

export function formatDateTime(value: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function getPatientFullName(patient: PatientDraft): string {
  const name = [patient.firstName, patient.middleName, patient.lastName]
    .filter((part) => part && part.trim().length > 0)
    .join(" ");

  return name || "Unnamed patient";
}
