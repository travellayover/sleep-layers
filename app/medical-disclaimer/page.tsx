import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "Medical Disclaimer | MySleepLabs",
  description:
    "MySleepLabs is an educational publication and does not provide medical advice.",
};

export default function MedicalDisclaimerPage() {
  return (
    <PolicyPage
      title="Medical Disclaimer"
      description="MySleepLabs is an educational publication. It is not medical care."
      intro="MySleepLabs publishes educational sleep content. Nothing on this site is medical advice, diagnosis, or treatment, and nothing here should be used as a substitute for professional medical care."
      sections={[
        {
          heading: "What this site is",
          body: [
            "Practical sleep education grounded in published research.",
            "Editorial product reviews designed for buyer guidance, not therapy.",
            "AI-assisted content that is human-reviewed before publication.",
          ],
        },
        {
          heading: "What this site is not",
          body: [
            "Not a substitute for advice from a qualified clinician.",
            "Not a diagnostic tool, scoring service, or treatment recommendation.",
            "Not appropriate for acute or severe sleep problems.",
          ],
        },
        {
          heading: "When to seek professional support",
          body: [
            "Persistent difficulty falling asleep or staying asleep that affects daily life.",
            "Loud snoring, gasping, or observed pauses in breathing during sleep.",
            "Excessive daytime sleepiness despite adequate opportunity to sleep.",
            "Sleep concerns in children, during pregnancy, or alongside other medical conditions.",
          ],
        },
      ]}
    />
  );
}
