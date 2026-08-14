import Link from "next/link";
import { GUIDES } from "@/lib/guides/content";
import { Badge } from "@/components/ui/badge";
import { SceneFrame } from "@/components/public/scene-frame";
import { RelatedPins } from "@/components/public/related-pins";

type AudienceKey = "FOCUS" | "CLARITY" | "SHIFT" | "FAMILY";

type Props = {
  audience: AudienceKey;
  title: string;
  intro: string;
  kicker: string;
  scene?: string;
  environment?: string;
};

export function AudienceLandingPage({
  audience,
  title,
  intro,
  kicker,
  scene = "Someone adjusts one thing in the room before the household settles.",
  environment = "Believable home · practical evening · one clear next step",
}: Props) {
  const guides = GUIDES.filter(
    (g) => g.audience === audience || g.audience === "ALL",
  );

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
      <Badge
        variant="secondary"
        className="bg-sleep-soft font-mono text-[10px] uppercase tracking-[0.18em] text-sleep"
      >
        {kicker}
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {intro}
      </p>

      <SceneFrame className="mt-10" scene={scene} environment={environment} tone="day" />

      <section className="mt-12">
        <RelatedPins
          items={guides.map((g) => ({
            href: `/guides/${g.slug}`,
            kicker: g.topic.split(" · ")[0],
            title: g.title,
            body: g.twoSentenceAnswer,
          }))}
        />
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-sleep/40">
          <h2 className="font-serif text-lg text-foreground">Not sure which path fits?</h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Four short questions route you to the right starter set.
          </p>
          <Link
            href="/start-here"
            className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Go to Start Here →
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-sleep/40">
          <h2 className="font-serif text-lg text-foreground">Or start the 7-Night Setup</h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            One small setup decision each evening for a week.
          </p>
          <Link
            href="/seven-night-setup"
            className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Begin with Night 1 →
          </Link>
        </div>
      </section>
    </article>
  );
}
