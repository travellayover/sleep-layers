import type { Metadata } from "next";
import { AudiencePathTemplate } from "@/components/public/audience-path-template";

export const metadata: Metadata = {
  title: "Family Evenings — MySleepLabs",
  description:
    "Better evenings are built around the household, not one perfect routine.",
};

export default function FamilyPath() {
  return (
    <AudiencePathTemplate
      title="Family Evenings"
      internalLabel="FAMILY"
      scene="A parent and child put away toys, lower the living-room lights, and prepare for the evening."
      environment="Lived-in family room with books, school items, and normal household details."
      message="Better evenings are built around the household — not one perfect routine."
      motion="Toys are placed in a basket and two practical evening steps appear."
      starterGuide={{
        title: "How to design an evening that works for the whole household",
        href: "/guides/family-evening-design",
      }}
      practicalAction="Choose one household signal that means 'evening mode now.' Same signal every day. Phones, lights, sounds — pick one."
      emailPath="Five notes on building a household evening, with input from working parents."
    />
  );
}
