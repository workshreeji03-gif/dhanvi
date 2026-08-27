import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={32}
      height={32}
      className={className}
    />
  )
}