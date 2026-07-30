import type { Patient, PatientDraft } from "@/types";
import type { PatientFormValues } from "@/lib/validations/patient";
import { patientFormDefaultValues } from "@/lib/validations/patient";

/**
 * Maps current form values into a live draft for WebSocket broadcast.
 */
export function toPatientDraft(values: PatientFormValues): PatientDraft {
  return {
    firstName: values.firstName?.trim() ?? "",
    middleName: values.middleName?.trim() || undefined,
    lastName: values.lastName?.trim() ?? "",
    dateOfBirth: values.dateOfBirth ?? "",
    gender: values.gender || "",
    phoneNumber: values.phoneNumber?.trim() ?? "",
    email: values.email?.trim() ?? "",
    address: values.address?.trim() ?? "",
    preferredLanguage: values.preferredLanguage ?? "",
    nationality: values.nationality ?? "",
    emergencyContactName: values.emergencyContactName?.trim() || undefined,
    emergencyContactRelationship:
      values.emergencyContactRelationship?.trim() || undefined,
    religion: values.religion?.trim() || undefined,
  };
}

/**
 * Normalizes validated form values into the shared Patient domain model.
 */
export function toPatient(values: PatientFormValues): Patient {
  const draft = toPatientDraft(values);

  if (!draft.gender) {
    throw new Error("Validated patient is missing gender");
  }

  return {
    ...draft,
    gender: draft.gender,
  };
}

/**
 * Maps a patient draft back into React Hook Form default values.
 */
export function toFormValues(patient: PatientDraft): PatientFormValues {
  return {
    ...patientFormDefaultValues,
    firstName: patient.firstName ?? "",
    middleName: patient.middleName ?? "",
    lastName: patient.lastName ?? "",
    dateOfBirth: patient.dateOfBirth ?? "",
    gender: patient.gender || "",
    phoneNumber: patient.phoneNumber ?? "",
    email: patient.email ?? "",
    address: patient.address ?? "",
    preferredLanguage: patient.preferredLanguage ?? "",
    nationality: patient.nationality ?? "",
    emergencyContactName: patient.emergencyContactName ?? "",
    emergencyContactRelationship: patient.emergencyContactRelationship ?? "",
    religion: patient.religion ?? "",
  };
}

/**
 * Returns true when the draft has no meaningful content to display.
 */
export function isBlankPatient(patient: PatientDraft | null): boolean {
  if (!patient) return true;

  return ![
    patient.firstName,
    patient.middleName,
    patient.lastName,
    patient.dateOfBirth,
    patient.gender,
    patient.phoneNumber,
    patient.email,
    patient.address,
    patient.preferredLanguage,
    patient.nationality,
    patient.emergencyContactName,
    patient.emergencyContactRelationship,
    patient.religion,
  ].some((value) => typeof value === "string" && value.trim().length > 0);
}
