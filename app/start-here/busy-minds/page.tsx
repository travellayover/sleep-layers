import type { Metadata } from "next";
import { AudiencePathTemplate } from "@/components/public/audience-path-template";

export const metadata: Metadata = {
  title: "Busy Minds — Sleep Layers",
  description:
    "Work follows you home. Build a clear stopping point so your evening actually ends.",
};

export default function BusyMindsPath() {
  return (
    <AudiencePathTemplate
      title="Busy Minds"
      internalLabel="FOCUS"
      scene="A founder or professional closes a laptop at a small home desk and writes tomorrow's most important task on a notepad."
      environment="Real bedroom-office combination, practical furniture, visible time around 9:45 p.m."
      message="Work may follow you home, but your evening needs a clear stopping point."
      motion="Laptop closes; desk lamp dims; bedroom lamp becomes the primary light."
      starterGuide={{
        title: "How to end the workday when you work from home",
        href: "/guides/end-the-workday-from-home",
      }}
      practicalAction="Pick one weekday this week. Close the laptop at a fixed time, write tomorrow's first task on a notepad, then move to the bedroom for ten minutes."
      emailPath="Four short notes on building a clear evening stopping point."
    />
  );
}
