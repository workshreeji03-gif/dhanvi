/**
 * Fixed background layer. Stays put while content scrolls over it (brief #24).
 * Preserves the existing light + dotted-grain visual identity.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-background"
    >
      {/* dotted grain */}
      <div className="grain absolute inset-0 opacity-[0.3]" />
      {/* soft top glow, anchored so it never scrolls */}
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-positive/[0.06] via-info/[0.03] to-transparent" />
      <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-positive/[0.05] blur-3xl" />
      <div className="absolute -right-40 top-[40vh] h-96 w-96 rounded-full bg-info/[0.05] blur-3xl" />
    </div>
  )
}
