'use client'

import { useEffect, useState } from 'react'
import { X, Check, ArrowRight } from 'lucide-react'
import { Logo } from './logo'

const BUSINESS_TYPES = ['Retail', 'Wholesale', 'Manufacturing', 'Restaurant', 'Services', 'D2C']
const BUSINESS_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+']
const INTERESTS = [
  'Accounting automation',
  'Real-time financial insights',
  'AI CFO',
  'Inventory',
  'Payroll',
  'Payments',
  'Everything',
]

export function EarlyAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // reset the success state shortly after close so it's fresh next open
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setSubmitted(false), 300)
    return () => clearTimeout(t)
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Request early access"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="text-sm font-semibold text-foreground">Join Dhanvi Early Access</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-positive/15 text-positive">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
              We&apos;ll reach out when Dhanvi is ready for your business.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field label="Business name" name="business" placeholder="Company" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Business type" name="type" options={BUSINESS_TYPES} />
              <SelectField label="Business size" name="size" options={BUSINESS_SIZES} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
              <Field label="Phone number" name="phone" type="tel" placeholder="+91 90000 00000" />
            </div>

            <SelectField
              label="What are you most interested in?"
              name="interest"
              options={INTERESTS}
            />

            <button
              type="submit"
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
            >
              Request Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="pb-1 text-center text-xs text-muted-foreground">
              No spam. We&apos;ll only email you about your early access.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: string[]
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        defaultValue={options[0]}
        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
