/**
 * Clean white background layer for minimal institutional aesthetic.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-white"
    >
      <div
        className="grain absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />
    </div>
  )
}
