import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SceneFrame } from "@/components/public/scene-frame";

type PathProps = {
  title: string;
  internalLabel: string;
  scene: string;
  environment: string;
  message: string;
  motion: string;
  starterGuide: { title: string; href: string };
  practicalAction: string;
  emailPath: string;
};

export function AudiencePathTemplate({
  title,
  internalLabel,
  scene,
  environment,
  message,
  motion,
  starterGuide,
  practicalAction,
  emailPath,
}: PathProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <Badge
        variant="secondary"
        className="bg-sleep-soft font-mono text-[10px] uppercase tracking-[0.18em] text-sleep"
      >
        Path · {internalLabel}
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>

      <section className="mt-12">
        <SceneFrame scene={scene} environment={environment} tone="day" />
      </section>

      <section className="mt-12 space-y-6">
        <Row label="Environment">{environment}</Row>
        <Row label="Message">{message}</Row>
        <Row label="Motion">{motion}</Row>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-card p-7">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Your starter set
        </h2>
        <ul className="mt-5 space-y-4 text-[14px] leading-relaxed text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-serif text-accent">·</span>
            <div>
              <strong className="font-medium text-foreground">Starter guide:</strong>{" "}
              <Link
                href={starterGuide.href}
                className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
              >
                {starterGuide.title}
              </Link>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-accent">·</span>
            <div>
              <strong className="font-medium text-foreground">Practical action:</strong>{" "}
              {practicalAction}
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-accent">·</span>
            <div>
              <strong className="font-medium text-foreground">Seven-Night Setup entry:</strong>{" "}
              <Link
                href="/seven-night-setup"
                className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
              >
                Begin with Night 1
              </Link>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-accent">·</span>
            <div>
              <strong className="font-medium text-foreground">Email path:</strong>{" "}
              {emailPath}
            </div>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        <Link href="/start-here" className="hover:text-sleep">
          ← Back to Start Here
        </Link>
      </p>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-sleep">
        {label}
      </h3>
      <p className="mt-2 font-serif text-lg leading-snug text-foreground">{children}</p>
    </div>
  );
}
