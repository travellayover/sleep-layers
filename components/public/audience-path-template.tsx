import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        Path · {internalLabel}
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>

      <section className="mt-12">
        <div
          className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-border bg-card text-center text-[12px] text-muted-foreground"
          role="img"
          aria-label={`Loftie-style 3D illustration: ${scene}`}
        >
          <div className="px-4">{scene}</div>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
          Loftie-style editorial 3D illustration — coming soon
        </p>
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
            <span className="font-serif text-primary">·</span>
            <div>
              <strong className="font-medium text-foreground">Starter guide:</strong>{" "}
              <Link
                href={starterGuide.href}
                className="underline decoration-primary underline-offset-2 hover:text-primary"
              >
                {starterGuide.title}
              </Link>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-primary">·</span>
            <div>
              <strong className="font-medium text-foreground">Practical action:</strong>{" "}
              {practicalAction}
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-primary">·</span>
            <div>
              <strong className="font-medium text-foreground">Seven-Night Setup entry:</strong>{" "}
              <Link
                href="/seven-night-setup"
                className="underline decoration-primary underline-offset-2 hover:text-primary"
              >
                Begin with Night 1
              </Link>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="font-serif text-primary">·</span>
            <div>
              <strong className="font-medium text-foreground">Email path:</strong>{" "}
              {emailPath}
            </div>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        <Link href="/start-here" className="hover:text-foreground">
          ← Back to Start Here
        </Link>
      </p>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
        {label}
      </h3>
      <p className="mt-2 font-serif text-lg leading-snug text-foreground">{children}</p>
    </div>
  );
}
