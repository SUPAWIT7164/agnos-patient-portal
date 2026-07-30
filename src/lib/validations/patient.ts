import { z } from "zod";
import { GENDER_VALUES } from "@/lib/constants";
import type { Gender } from "@/types";

/**
 * Zod schema for the patient registration form.
 * Required / optional fields match the assignment specification.
 */
export const patientSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be at most 50 characters"),
  middleName: z
    .string()
    .trim()
    .max(50, "Middle name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be at most 50 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Enter a valid date of birth",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  gender: z.enum(GENDER_VALUES, {
    message: "Please select a gender",
  }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s()-]{9,20}$/,
      "Enter a valid phone number (e.g. +66 81 234 5678)",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(300, "Address must be at most 300 characters"),
  preferredLanguage: z
    .string()
    .trim()
    .min(1, "Preferred language is required"),
  nationality: z.string().trim().min(1, "Nationality is required"),
  emergencyContactName: z
    .string()
    .trim()
    .max(80, "Emergency contact name must be at most 80 characters")
    .optional()
    .or(z.literal("")),
  emergencyContactRelationship: z
    .string()
    .trim()
    .max(50, "Relationship must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  religion: z
    .string()
    .trim()
    .max(50, "Religion must be at most 50 characters")
    .optional()
    .or(z.literal("")),
});

/** Validated patient form output. */
export type PatientFormOutput = z.infer<typeof patientSchema>;

/**
 * Form state before validation — gender may be empty until selected.
 */
export type PatientFormValues = Omit<PatientFormOutput, "gender"> & {
  gender: Gender | "";
};

export const patientFormDefaultValues: PatientFormValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  religion: "",
};
