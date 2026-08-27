export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Dhanvi logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 20.5 13.5 15l3.2 3 5.3-7"
        className="stroke-positive"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="22" cy="11" r="1.9" className="fill-positive" />
    </svg>
  )
}
