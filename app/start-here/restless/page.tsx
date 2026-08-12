import type { Metadata } from "next";
import { AudiencePathTemplate } from "@/components/public/audience-path-template";

export const metadata: Metadata = {
  title: "Restless or Unrefreshed — Sleep Layers",
  description:
    "Start by noticing patterns before buying another solution.",
};

export default function RestlessPath() {
  return (
    <AudiencePathTemplate
      title="Restless or Unrefreshed"
      internalLabel="CLARITY"
      scene="An adult sits at a kitchen table in the morning recording a few observations in a simple sleep diary."
      environment="Morning daylight, coffee or tea, ordinary kitchen — not a medical office."
      message="Start by noticing patterns before buying another solution."
      motion="Three diary entries appear: bedtime, wake time, and morning energy."
      starterGuide={{
        title: "How to run a 14-day sleep diary (and what to do with it)",
        href: "/guides/14-day-sleep-diary",
      }}
      practicalAction="For fourteen days, write down when you went to bed, when you woke, and one word for how the morning felt. That is the dataset."
      emailPath="A daily prompt for fourteen days, with weekly interpretation notes."
    />
  );
}
