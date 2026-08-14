/**
 * Editorial scene frame — Loftie / Healthline lifestyle placeholder.
 * Day: warm paper bedroom wash. Night: navy contrast for dark scenes.
 * Soft layered light only — no particles, no glow soup.
 */

type Tone = "day" | "night";

export function SceneFrame({
  scene,
  environment,
  tone = "day",
  className = "",
  caption,
}: {
  scene: string;
  environment?: string;
  tone?: Tone;
  className?: string;
  /** Optional figcaption; omit for quieter brand moments */
  caption?: string | null;
}) {
  const isNight = tone === "night";

  return (
    <figure className={className}>
      <div
        className={`relative flex aspect-[4/5] items-end overflow-hidden rounded-[1.25rem] border sm:aspect-[16/10] ${
          isNight ? "border-white/10" : "border-border"
        }`}
        style={{
          background: isNight
            ? "linear-gradient(155deg, #0A1A4A 0%, var(--color-night) 52%, #00081F 100%)"
            : "linear-gradient(155deg, #FFFcf8 0%, #F3EEE6 48%, #E8E1D6 100%)",
          boxShadow: isNight
            ? "0 24px 48px -20px rgba(0, 8, 31, 0.55)"
            : "var(--shadow-md)",
        }}
        role="img"
        aria-label={scene}
      >
        {/* Window / cool sleep wash */}
        <div
          className="pointer-events-none absolute inset-0"
          data-parallax="0.4"
          style={{
            background: isNight
              ? "radial-gradient(ellipse 55% 45% at 18% 22%, rgba(91,103,232,0.18) 0%, transparent 62%)"
              : "radial-gradient(ellipse at 18% 25%, rgba(91,103,232,0.05) 0%, transparent 42%)",
          }}
          aria-hidden="true"
        />
        {/* Lamp / warm bedside */}
        <div
          className="pointer-events-none absolute inset-0"
          data-parallax="0.7"
          style={{
            background: isNight
              ? "radial-gradient(ellipse 40% 35% at 82% 68%, rgba(242,184,75,0.11) 0%, transparent 55%)"
              : "radial-gradient(ellipse at 82% 70%, rgba(242,184,75,0.06) 0%, transparent 36%)",
          }}
          aria-hidden="true"
        />
        {/* Floor / furniture silhouette */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          data-parallax="0.25"
          style={{
            background: isNight
              ? "linear-gradient(to top, rgba(0,6,24,0.72) 0%, rgba(0,10,40,0.28) 45%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,20,60,0.06), transparent)",
          }}
          aria-hidden="true"
        />
        {/* Soft horizon line — bed edge suggestion */}
        <div
          className="pointer-events-none absolute bottom-[22%] left-[10%] right-[10%] h-px opacity-40"
          style={{
            background: isNight
              ? "linear-gradient(90deg, transparent, rgba(244,242,236,0.22), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0,20,60,0.12), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full p-6 md:p-8" data-parallax="0.15">
          <p
            className={`max-w-md font-serif text-lg font-medium leading-snug tracking-tight md:text-xl ${
              isNight ? "text-[var(--color-night-fg)]" : "text-foreground"
            }`}
          >
            {scene}
          </p>
          {environment ? (
            <p
              className={`mt-2.5 max-w-md text-[13px] leading-relaxed ${
                isNight
                  ? "text-[var(--color-night-fg)]/65"
                  : "text-muted-foreground"
              }`}
            >
              {environment}
            </p>
          ) : null}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-[11px] text-muted-foreground/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
