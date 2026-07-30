"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  PATIENT_INACTIVE_MS,
  RELATIONSHIP_OPTIONS,
} from "@/lib/constants";
import {
  patientFormDefaultValues,
  patientSchema,
  type PatientFormValues,
} from "@/lib/validations/patient";
import { usePatientStore } from "@/hooks/usePatientStore";
import { debounce } from "@/utils/debounce";
import {
  isBlankPatient,
  toFormValues,
  toPatient,
  toPatientDraft,
} from "@/utils/patient";
import {
  Alert,
  Button,
  ConnectionBadge,
  FormField,
  Input,
  SectionCard,
  Select,
  Textarea,
} from "@/components/ui";

export function PatientForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const {
    patient,
    updatedAt,
    activityStatus,
    broadcastPatient,
    clearPatient,
    connectionStatus,
  } = usePatientStore();
  const didHydrateForm = useRef(false);
  const skipNextBroadcast = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<PatientFormValues>({
    // Empty gender ("") is allowed in form state until the user selects a value.
    resolver: zodResolver(patientSchema) as Resolver<PatientFormValues>,
    defaultValues: patientFormDefaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const debouncedBroadcast = useMemo(
    () =>
      debounce((values: PatientFormValues) => {
        if (skipNextBroadcast.current) {
          skipNextBroadcast.current = false;
          return;
        }
        broadcastPatient(toPatientDraft(values), "editing");
      }, 300),
    [broadcastPatient],
  );

  // After inactivity while editing, mark patient as inactive.
  useEffect(() => {
    if (isBlankPatient(patient)) return;
    if (activityStatus !== "editing") return;

    const timer = window.setTimeout(() => {
      if (!patient) return;
      broadcastPatient(patient, "inactive");
    }, PATIENT_INACTIVE_MS);

    return () => window.clearTimeout(timer);
  }, [patient, activityStatus, broadcastPatient, updatedAt]);

  // If the patient leaves the form page while editing, mark inactive.
  useEffect(() => {
    return () => {
      const snapshot = patient;
      const status = activityStatus;
      if (snapshot && status === "editing") {
        broadcastPatient(snapshot, "inactive");
      }
    };
  }, [patient, activityStatus, broadcastPatient]);

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedBroadcast(values as PatientFormValues);
    });

    return () => {
      debouncedBroadcast.cancel();
      subscription.unsubscribe();
    };
  }, [watch, debouncedBroadcast]);

  // Hydrate form once from shared store / socket sync.
  useEffect(() => {
    if (didHydrateForm.current || isBlankPatient(patient)) return;

    skipNextBroadcast.current = true;
    reset(toFormValues(patient!));
    didHydrateForm.current = true;
  }, [patient, reset]);

  // Keep the form in sync when Staff View clears the patient remotely.
  useEffect(() => {
    if (!didHydrateForm.current) return;
    if (!isBlankPatient(patient)) return;

    skipNextBroadcast.current = true;
    reset(patientFormDefaultValues);
    setSubmitMessage(null);
  }, [patient, reset]);

  const onSubmit = (values: PatientFormValues) => {
    broadcastPatient(toPatient(values), "submitted");
    setSubmitMessage(
      "Patient saved and broadcast live to Staff View over WebSocket.",
    );
  };

  const onReset = () => {
    debouncedBroadcast.cancel();
    skipNextBroadcast.current = true;
    reset(patientFormDefaultValues);
    clearPatient();
    setSubmitMessage(null);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 sm:space-y-6"
      aria-labelledby="patient-form-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/80 px-4 py-3">
        <p className="text-sm text-[var(--color-text-muted)]">
          Live sync enabled · updates broadcast every 300ms while typing
        </p>
        <ConnectionBadge status={connectionStatus} />
      </div>

      {connectionStatus === "disconnected" ? (
        <Alert variant="error" title="WebSocket offline">
          Run{" "}
          <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">
            npm run dev
          </code>{" "}
          so the Next.js app and socket server start together.
        </Alert>
      ) : null}

      {connectionStatus === "connecting" ? (
        <Alert variant="warning" title="Connecting">
          Establishing a live connection to the staff dashboard...
        </Alert>
      ) : null}

      <SectionCard title="Personal Information">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            id="firstName"
            label="First Name"
            required
            error={errors.firstName?.message}
          >
            <Input
              id="firstName"
              autoComplete="given-name"
              placeholder="John"
              hasError={Boolean(errors.firstName)}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              {...register("firstName")}
            />
          </FormField>

          <FormField
            id="middleName"
            label="Middle Name"
            error={errors.middleName?.message}
          >
            <Input
              id="middleName"
              autoComplete="additional-name"
              placeholder="Optional"
              hasError={Boolean(errors.middleName)}
              aria-invalid={Boolean(errors.middleName)}
              {...register("middleName")}
            />
          </FormField>

          <FormField
            id="lastName"
            label="Last Name"
            required
            error={errors.lastName?.message}
          >
            <Input
              id="lastName"
              autoComplete="family-name"
              placeholder="Doe"
              hasError={Boolean(errors.lastName)}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              {...register("lastName")}
            />
          </FormField>

          <FormField
            id="dateOfBirth"
            label="Date of Birth"
            required
            error={errors.dateOfBirth?.message}
          >
            <Input
              id="dateOfBirth"
              type="date"
              max={today}
              hasError={Boolean(errors.dateOfBirth)}
              aria-invalid={Boolean(errors.dateOfBirth)}
              {...register("dateOfBirth")}
            />
          </FormField>

          <FormField
            id="gender"
            label="Gender"
            required
            error={errors.gender?.message}
          >
            <Select
              id="gender"
              hasError={Boolean(errors.gender)}
              aria-invalid={Boolean(errors.gender)}
              {...register("gender")}
            >
              <option value="" disabled>
                Select gender
              </option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            id="nationality"
            label="Nationality"
            required
            error={errors.nationality?.message}
          >
            <Select
              id="nationality"
              hasError={Boolean(errors.nationality)}
              aria-invalid={Boolean(errors.nationality)}
              {...register("nationality")}
            >
              <option value="" disabled>
                Select nationality
              </option>
              {NATIONALITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Contact Details">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            id="phoneNumber"
            label="Phone Number"
            required
            hint="Include country code when possible"
            error={errors.phoneNumber?.message}
          >
            <Input
              id="phoneNumber"
              type="tel"
              autoComplete="tel"
              placeholder="+66 81 234 5678"
              hasError={Boolean(errors.phoneNumber)}
              aria-invalid={Boolean(errors.phoneNumber)}
              {...register("phoneNumber")}
            />
          </FormField>

          <FormField
            id="email"
            label="Email"
            required
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="patient@example.com"
              hasError={Boolean(errors.email)}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              id="address"
              label="Address"
              required
              error={errors.address?.message}
            >
              <Textarea
                id="address"
                rows={3}
                autoComplete="street-address"
                placeholder="House number, street, district, city, postal code"
                hasError={Boolean(errors.address)}
                aria-invalid={Boolean(errors.address)}
                {...register("address")}
              />
            </FormField>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Preferences & Emergency">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            id="preferredLanguage"
            label="Preferred Language"
            required
            error={errors.preferredLanguage?.message}
          >
            <Select
              id="preferredLanguage"
              hasError={Boolean(errors.preferredLanguage)}
              aria-invalid={Boolean(errors.preferredLanguage)}
              {...register("preferredLanguage")}
            >
              <option value="" disabled>
                Select language
              </option>
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            id="religion"
            label="Religion"
            error={errors.religion?.message}
          >
            <Input
              id="religion"
              placeholder="Optional"
              hasError={Boolean(errors.religion)}
              aria-invalid={Boolean(errors.religion)}
              {...register("religion")}
            />
          </FormField>

          <FormField
            id="emergencyContactName"
            label="Emergency Contact Name"
            error={errors.emergencyContactName?.message}
          >
            <Input
              id="emergencyContactName"
              placeholder="Jane Doe"
              hasError={Boolean(errors.emergencyContactName)}
              aria-invalid={Boolean(errors.emergencyContactName)}
              {...register("emergencyContactName")}
            />
          </FormField>

          <FormField
            id="emergencyContactRelationship"
            label="Emergency Contact Relationship"
            error={errors.emergencyContactRelationship?.message}
          >
            <Select
              id="emergencyContactRelationship"
              hasError={Boolean(errors.emergencyContactRelationship)}
              aria-invalid={Boolean(errors.emergencyContactRelationship)}
              {...register("emergencyContactRelationship")}
            >
              <option value="">Select relationship (optional)</option>
              {RELATIONSHIP_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </SectionCard>

      {submitMessage ? (
        <Alert variant="success" title="Saved">
          {submitMessage}
        </Alert>
      ) : null}

      {!isValid && isDirty ? (
        <Alert variant="warning" title="Incomplete form">
          Please complete all required fields before saving.
        </Alert>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onReset}
          disabled={isSubmitting || !isDirty}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
        >
          Save Patient
        </Button>
      </div>
    </form>
  );
}
