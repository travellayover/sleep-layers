// Sleep Layers wordmark — typographic-only, no mascots.
// Public-facing brand mark per the MySleepLabs Public Website Plan.
// The moon mark is reserved for the internal admin area only.

type WordmarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function SleepLayersWordmark({ className = "", size = "md" }: WordmarkProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-serif ${sizes[size]} tracking-tight text-navy ${className}`}
      aria-label="Sleep Layers"
    >
      <span className="font-medium">Sleep</span>
      <span className="font-semibold italic text-amber">Layers</span>
    </span>
  );
}
