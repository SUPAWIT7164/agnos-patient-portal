import type { PatientDraft } from "@/types";
import {
  IconHeart,
  IconPhone,
  IconUser,
  SectionCard,
} from "@/components/ui";
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
    <div className="space-y-5 sm:space-y-6">
      <div className="rounded-[var(--radius-panel)] border border-[var(--color-primary)]/20 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-surface)] px-4 py-4 shadow-[var(--shadow-xs)] sm:px-5 sm:py-5">
        <p className="ui-eyebrow">Current patient</p>
        <p
          key={getPatientFullName(patient)}
          className="mt-1.5 text-xl font-semibold tracking-tight text-[var(--color-secondary)] animate-fade-in-up sm:text-2xl"
        >
          {getPatientFullName(patient)}
        </p>
      </div>

      <SectionCard
        title="Personal Information"
        icon={<IconUser className="h-4 w-4" />}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        icon={<IconPhone className="h-4 w-4" />}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        icon={<IconHeart className="h-4 w-4" />}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
