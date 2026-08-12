import type { Metadata } from "next";
import { Inter, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { PublicNav } from "@/components/public/public-nav";
import { PublicFooter } from "@/components/public/public-footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SearchTrigger } from "@/components/public/search-trigger";
import { AnimatedBackground } from "@/components/public/animated-background";
import { IntroProvider } from "@/components/public/page-loader";
import { GUIDES } from "@/lib/guides/content";
import { PRODUCTS } from "@/lib/products/content";
import { isPrelaunch } from "@/lib/site-mode";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MySleepLabs — Practical sleep for the night you have",
  description:
    "Clear evening guidance for busy minds, shifting schedules, and shared homes. Join the waitlist. Educational content — not medical advice.",
};

const PATHS = [
  {
    title: "Start Here",
    description: "Four-question router that picks the closest path.",
    href: "/start-here",
    section: "Audience path",
  },
  {
    title: "Busy Minds path",
    description: "Work-heavy evenings.",
    href: "/busy-minds",
    section: "Audience path",
  },
  {
    title: "Restless or Unrefreshed path",
    description: "Waking up unrefreshed — noticing patterns first.",
    href: "/restless",
    section: "Audience path",
  },
  {
    title: "Shift & Caregiving path",
    description: "Action-based anchors for changing schedules.",
    href: "/shift",
    section: "Audience path",
  },
  {
    title: "Family Evenings path",
    description: "Household signals for shared evenings.",
    href: "/family",
    section: "Audience path",
  },
  {
    title: "Seven-Night Setup",
    description: "One small setup decision each evening.",
    href: "/seven-night-setup",
    section: "Programme",
  },
];

/** Runs before paint so session-seen visitors skip the intro flash. */
const INTRO_SKIP_SCRIPT = `(function(){try{if(sessionStorage.getItem('msl-intro-seen')==='1')document.documentElement.classList.add('msl-intro-skip');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const index = [
    ...GUIDES.map((g) => ({
      title: g.title,
      description: g.twoSentenceAnswer,
      href: `/guides/${g.slug}`,
      section: g.topic.split(" · ")[0] ?? "Guide",
    })),
    ...PRODUCTS.map((p) => ({
      title: p.name,
      description: p.oneLine,
      href: `/product-lab/${p.slug}`,
      section: `${p.category} · Product Lab`,
    })),
    ...PATHS,
  ];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {isPrelaunch ? (
          <script
            dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }}
          />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <TooltipProvider delayDuration={120}>
          <IntroProvider enabled={isPrelaunch}>
            <div
              className={
                isPrelaunch
                  ? "flex min-h-[100dvh] flex-col bg-[#00081F]"
                  : "flex min-h-screen flex-col bg-background"
              }
            >
              {!isPrelaunch ? <AnimatedBackground /> : null}
              <PublicNav />
              <main className="flex flex-1 flex-col">{children}</main>
              <PublicFooter />
              {!isPrelaunch ? <SearchTrigger items={index} /> : null}
              <Toaster position="top-center" />
            </div>
          </IntroProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
