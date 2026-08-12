import type { Metadata } from "next";
import { AudienceLandingPage } from "@/components/public/audience-landing";

export const metadata: Metadata = {
  title: "Shift & Caregiving — Sleep Layers",
  description:
    "Guides and tools for shift workers and caregivers whose schedule is genuinely irregular.",
};

export default function ShiftLandingPage() {
  return (
    <AudienceLandingPage
      audience="SHIFT"
      kicker="Path · Shift & Caregiving"
      title="For schedules that change and households that shift."
      intro="If your work hours rotate or your caregiving responsibilities move, a clock-time routine will fail you. These guides work from action-based anchors — same three actions, same order, no matter what the clock says."
    />
  );
}
