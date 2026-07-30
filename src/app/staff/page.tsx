import type { Metadata } from "next";
import { StaffDashboard } from "@/components/staff";
import { Card, CardHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Staff View",
  description: "Live patient monitoring for staff via WebSocket",
};

export default function StaffPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card padding="lg">
        <CardHeader
          title="Staff View"
          description="Live patient record powered by Socket.IO. Updates appear instantly when the Patient Form changes — no refresh and no polling."
        />
        <StaffDashboard />
      </Card>
    </div>
  );
}
