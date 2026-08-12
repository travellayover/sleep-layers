import Link from "next/link";
import { GUIDES, type Guide } from "@/lib/guides/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AudienceKey = "FOCUS" | "CLARITY" | "SHIFT" | "FAMILY";

type Props = {
  audience: AudienceKey;
  title: string;
  intro: string;
  kicker: string;
};

export function AudienceLandingPage({ audience, title, intro, kicker }: Props) {
  const guides = GUIDES.filter(
    (g) => g.audience === audience || g.audience === "ALL",
  );

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        {kicker}
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {intro}
      </p>

      <section className="mt-12 space-y-4">
        {guides.map((g) => (
          <GuideRow key={g.slug} guide={g} />
        ))}
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card transition-colors hover:border-primary">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Not sure which path fits?</CardTitle>
            <CardDescription className="text-muted-foreground">
              Four short questions route you to the right starter set.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/start-here" className="text-sm font-medium text-foreground underline decoration-primary underline-offset-2 hover:text-primary">
              Go to Start Here →
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border bg-card transition-colors hover:border-primary">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Or start the 7-Night Setup</CardTitle>
            <CardDescription className="text-muted-foreground">
              One small setup decision each evening for a week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/seven-night-setup" className="text-sm font-medium text-foreground underline decoration-primary underline-offset-2 hover:text-primary">
              Begin with Night 1 →
            </Link>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}

function GuideRow({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <Card className="border-border bg-card transition-all hover:border-primary hover:shadow-[0_4px_24px_-12px_rgba(244,160,44,0.25)]">
        <CardHeader>
          <Badge variant="outline" className="w-fit font-mono text-[10px] uppercase tracking-wider">
            {guide.topic.split(" · ")[0]}
          </Badge>
          <CardTitle className="mt-2 font-serif text-xl leading-snug text-foreground">
            {guide.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {guide.twoSentenceAnswer}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[12px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read the guide →
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
