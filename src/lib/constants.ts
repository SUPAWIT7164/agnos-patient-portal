export const APP_NAME = "Agnos Patient Portal";

export const APP_DESCRIPTION =
  "Real-time patient registration and staff monitoring portal";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/patient", label: "Patient Form" },
  { href: "/staff", label: "Staff View" },
] as const;

export const GENDER_VALUES = [
  "male",
  "female",
  "other",
  "prefer_not_to_say",
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const LANGUAGE_OPTIONS = [
  "English",
  "Thai",
  "Chinese",
  "Japanese",
  "Korean",
  "Spanish",
  "French",
  "Other",
] as const;

export const NATIONALITY_OPTIONS = [
  "Thai",
  "American",
  "British",
  "Chinese",
  "Japanese",
  "Korean",
  "Indian",
  "Australian",
  "Other",
] as const;

export const RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Friend",
  "Guardian",
  "Other",
] as const;

/** Idle timeout before patient is marked inactive on Staff View (ms). */
export const PATIENT_INACTIVE_MS = 5000;
