import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "Privacy & Terms | MySleepLabs",
  description: "How MySleepLabs handles personal data and the terms of using this site.",
};

export default function PrivacyTermsPage() {
  return (
    <PolicyPage
      title="Privacy & Terms"
      description="How MySleepLabs handles personal data and the terms of using this site."
      intro="MySleepLabs collects the minimum data needed to operate this site. The newsletter stores your email address only. Affiliate links may set cookies on the retailer's domain. We do not sell or share your email address."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Email address — only if you subscribe to the newsletter.",
            "Standard server logs — for security and performance.",
            "Cookies — only those strictly necessary for the site to function, plus affiliate cookies set by retailers when you click through.",
          ],
        },
        {
          heading: "What we do not collect",
          body: [
            "We do not collect location data beyond what your browser provides.",
            "We do not run third-party advertising trackers on this site.",
            "We do not sell or share your email address.",
          ],
        },
        {
          heading: "Terms of use",
          body: "Content on this site is for educational purposes only. It is not medical advice. See our Medical Disclaimer. Affiliate relationships are disclosed wherever they appear.",
        },
      ]}
    />
  );
}
