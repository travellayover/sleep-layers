import Link from "next/link";

const PRIMARY = [
  { label: "Sleep Guides", href: "/guides" },
  { label: "Product Lab", href: "/product-lab" },
  { label: "Start Here", href: "/start-here" },
];

const RESOURCES = [
  { label: "About MySleepLabs", href: "/about" },
  { label: "Editorial Method", href: "/editorial-method" },
  { label: "Seven-Night Setup", href: "/seven-night-setup" },
];

const LEGAL = [
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Corrections Policy", href: "/corrections" },
  { label: "Privacy & Terms", href: "/privacy-terms" },
];

export function PublicFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-serif text-base font-medium text-navy">
            Practical sleep guidance for the life you actually live.
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-2">
            AI-assisted and source-checked educational content. MySleepLabs does
            not provide medical advice, diagnosis, or treatment.
          </p>
        </div>

        <FooterColumn title="Explore" links={PRIMARY} />
        <FooterColumn title="Resources" links={RESOURCES} />
        <FooterColumn title="Policies" links={LEGAL} />
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-[11px] text-ink-2 lg:flex-row lg:items-center lg:px-8">
          <p>© {new Date().getFullYear()} MySleepLabs. Independent sleep education.</p>
          <p>
            Editorial corrections:{" "}
            <Link
              href="/corrections"
              className="underline decoration-amber decoration-1 underline-offset-2 hover:text-navy"
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
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-2">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] text-ink hover:text-navy hover:underline decoration-amber decoration-1 underline-offset-2"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
