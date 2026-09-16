/**
 * Clean white background layer for minimal institutional aesthetic.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-white"
    />
  )
}
