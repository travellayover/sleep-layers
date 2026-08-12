import type { Metadata } from "next";
import { AudiencePathTemplate } from "@/components/public/audience-path-template";

export const metadata: Metadata = {
  title: "Shift & Caregiving — MySleepLabs",
  description:
    "A routine can stay consistent even when the clock keeps changing.",
};

export default function ShiftPath() {
  return (
    <AudiencePathTemplate
      title="Shift & Caregiving"
      internalLabel="SHIFT"
      scene="A night-shift worker or caregiver arrives home shortly after sunrise, silences the phone, and closes blackout curtains."
      environment="Real entrance-to-bedroom sequence, work bag and shoes near the door."
      message="A routine can remain consistent even when the clock changes."
      motion="Curtains close and the room lighting transitions from daylight to a calm interior."
      starterGuide={{
        title: "Building a sleep routine across rotating shifts",
        href: "/guides/sleep-routine-rotating-shifts",
      }}
      practicalAction="Anchor your wind-down to a sequence of actions, not a clock time. Same three steps in the same order, every time you come home."
      emailPath="Six practical notes on shift-friendly sleep routines."
    />
  );
}
