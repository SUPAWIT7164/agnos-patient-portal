import type { PatientDraft } from "@/types";
import { SectionCard } from "@/components/ui";
import {
  formatDateOfBirth,
  formatGender,
  formatOptional,
  getPatientFullName,
} from "@/utils/format";
import { DetailField } from "./DetailField";

interface PatientDetailsProps {
  patient: PatientDraft;
}

/**
 * Displays every Patient Form field in a responsive staff-friendly layout.
 */
export function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary-light)] px-4 py-4 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          Current patient
        </p>
        <p className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-secondary)]">
          {getPatientFullName(patient)}
        </p>
      </div>

      <SectionCard
        title="Personal Information"
        className="bg-[var(--color-surface-muted)]/40"
      >
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailField
            label="First Name"
            value={formatOptional(patient.firstName)}
          />
          <DetailField
            label="Middle Name"
            value={formatOptional(patient.middleName)}
          />
          <DetailField
            label="Last Name"
            value={formatOptional(patient.lastName)}
          />
          <DetailField
            label="Date of Birth"
            value={formatDateOfBirth(patient.dateOfBirth)}
          />
          <DetailField label="Gender" value={formatGender(patient.gender)} />
          <DetailField
            label="Nationality"
            value={formatOptional(patient.nationality)}
          />
        </dl>
      </SectionCard>

      <SectionCard
        title="Contact Details"
        className="bg-[var(--color-surface-muted)]/40"
      >
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailField
            label="Phone Number"
            value={formatOptional(patient.phoneNumber)}
          />
          <DetailField label="Email" value={formatOptional(patient.email)} />
          <DetailField
            label="Address"
            value={formatOptional(patient.address)}
            fullWidth
          />
        </dl>
      </SectionCard>

      <SectionCard
        title="Preferences & Emergency"
        className="bg-[var(--color-surface-muted)]/40"
      >
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailField
            label="Preferred Language"
            value={formatOptional(patient.preferredLanguage)}
          />
          <DetailField
            label="Religion"
            value={formatOptional(patient.religion)}
          />
          <DetailField
            label="Emergency Contact Name"
            value={formatOptional(patient.emergencyContactName)}
          />
          <DetailField
            label="Emergency Contact Relationship"
            value={formatOptional(patient.emergencyContactRelationship)}
          />
        </dl>
      </SectionCard>
    </div>
  );
}
