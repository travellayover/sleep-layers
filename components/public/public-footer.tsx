import Link from "next/link";
import { BrandLockup } from "./brand-logo";
import { isPrelaunch } from "@/lib/site-mode";

const PRIMARY_LIVE = [
  { label: "Start Here", href: "/start-here" },
  { label: "Join the waitlist", href: "/#waitlist" },
  { label: "Seven-Night Setup", href: "/seven-night-setup" },
];

const RESOURCES_LIVE = [
  { label: "Sleep Guides", href: "/guides" },
  { label: "Product Lab", href: "/product-lab" },
  { label: "About MySleepLabs", href: "/about" },
  { label: "Editorial Method", href: "/editorial-method" },
];

const LEGAL = [
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Corrections Policy", href: "/corrections" },
  { label: "Privacy & Terms", href: "/privacy-terms" },
];

export function PublicFooter() {
  if (isPrelaunch) {
    return (
      <footer className="relative z-10 border-t border-white/[0.06] bg-transparent">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-2 px-4 py-4 text-center text-[10px] tracking-wide text-white/30">
          <p>© {new Date().getFullYear()} MySleepLabs</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white/55"
              >
                {l.label}
              </Link>
            ))}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-24 border-t border-border bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLockup size="sm" />
          <p className="mt-4 font-serif text-base font-medium text-foreground">
            Practical sleep for the night you actually have.
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            AI-assisted and source-checked educational content. MySleepLabs does
            not provide medical advice, diagnosis, or treatment.
          </p>
        </div>

        <FooterColumn title="Explore" links={PRIMARY_LIVE} />
        <FooterColumn title="Resources" links={RESOURCES_LIVE} />
        <FooterColumn title="Policies" links={LEGAL} />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-[11px] text-muted-foreground lg:flex-row lg:items-center lg:px-8">
          <p>
            © {new Date().getFullYear()} MySleepLabs. Independent sleep
            education.
          </p>
          <p>
            Editorial corrections:{" "}
            <Link
              href="/corrections"
              className="underline decoration-sleep/40 decoration-1 underline-offset-2 hover:text-sleep"
            >
              corrections policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
