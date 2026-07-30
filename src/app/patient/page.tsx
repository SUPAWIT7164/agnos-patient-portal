import type { Metadata } from "next";
import { PatientForm } from "@/components/patient";
import { Card, CardHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Patient Form",
  description: "Register patient information for the Agnos Patient Portal",
};

export default function PatientPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card padding="lg">
        <CardHeader
          titleId="patient-form-title"
          title="Patient Registration"
          description="Enter patient details below. Required fields are marked with an asterisk (*). Changes sync live to Staff View over WebSocket."
        />
        <PatientForm />
      </Card>
    </div>
  );
}
