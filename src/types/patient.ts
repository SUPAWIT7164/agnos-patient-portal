import { GENDER_VALUES } from "@/lib/constants";

export type Gender = (typeof GENDER_VALUES)[number];

/**
 * Full patient record used by the Patient Form and Staff View.
 * Optional fields match the assignment specification.
 */
export interface Patient {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  religion?: string;
}

/**
 * Live form payload — required fields may be empty while the user is typing.
 */
export interface PatientDraft {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  religion?: string;
}

/**
 * Patient form activity status shown on Staff View.
 * - editing: patient is actively filling the form
 * - inactive: patient stopped interacting for a while
 * - submitted: patient submitted the form
 * - idle: no active session / cleared
 */
export type PatientActivityStatus =
  | "idle"
  | "editing"
  | "inactive"
  | "submitted";

/**
 * WebSocket payload shape for real-time patient sync.
 */
export interface PatientUpdatePayload {
  patient: PatientDraft | null;
  updatedAt: string | null;
  activityStatus: PatientActivityStatus;
}
