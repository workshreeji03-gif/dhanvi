/**
 * Fixed background layer with restrained charcoal atmosphere and subtle texture.
 * Moves away from bright pastel blobs toward an institutional research palette.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[#080A09]"
    >
      {/* Ultra-faint film grain texture */}
      <div className="grain absolute inset-0 opacity-[0.18]" />

      {/* Subtle, restrained top illumination (quiet, non-neon) */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-white/[0.025] to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[450px] w-[900px] bg-emerald-900/[0.04] blur-[120px] rounded-full" />
    </div>
  )
}
