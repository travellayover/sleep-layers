'use client';

/**
 * Soft paper atmosphere — no particles.
 * A slow mesh wash only; grain lives on body in globals.css.
 */
export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute -left-[10%] top-[-20%] h-[55vh] w-[55vw] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(80, 90, 230, 0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -right-[8%] bottom-[-15%] h-[50vh] w-[50vw] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(248, 184, 64, 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

/**
 * Simple wave divider (animated SVG)
 */
export function WaveDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-12 w-full md:h-16"
      >
        <path
          d="M0,30 C150,10 300,50 450,30 C600,10 750,50 900,30 C1050,10 1100,30 1200,20 L1200,60 L0,60 Z"
          fill="currentColor"
          className="text-bg-raised"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,30 C150,10 300,50 450,30 C600,10 750,50 900,30 C1050,10 1100,30 1200,20 L1200,60 L0,60 Z;
              M0,25 C150,15 300,45 450,25 C600,15 750,45 900,25 C1050,15 1100,25 1200,25 L1200,60 L0,60 Z;
              M0,30 C150,10 300,50 450,30 C600,10 750,50 900,30 C1050,10 1100,30 1200,20 L1200,60 L0,60 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}

/**
 * Breathing dot animation (for status indicators, accents)
 */
export function BreathingDot({ className = '' }: { className?: string }) {
  return (
    <span
      className={`breathing-dot inline-block h-2 w-2 rounded-full bg-amber ${className}`}
      aria-hidden="true"
    />
  );
}
