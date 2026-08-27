'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { FormField, FormSelect, FormTextarea } from './form-fields'

const BUSINESS_TYPES = ['Retail', 'Wholesale', 'Manufacturing', 'Restaurant', 'Services', 'D2C', 'Other']
const BUSINESS_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+']
const ACCOUNTING_SYSTEMS = ['Tally', 'Zoho Books', 'QuickBooks', 'Excel / Spreadsheets', 'Other', 'None']

type FormValues = {
  fullName: string
  workEmail: string
  companyName: string
  businessType: string
  businessSize: string
  accountingSystem: string
  financeChallenge: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!values.workEmail.trim()) {
    errors.workEmail = 'Please enter your work email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) {
    errors.workEmail = 'Please enter a valid email address.'
  }
  if (!values.companyName.trim()) errors.companyName = 'Please enter your company name.'
  if (!values.businessType) errors.businessType = 'Please select a business type.'
  if (!values.businessSize) errors.businessSize = 'Please select a business size.'
  if (!values.financeChallenge.trim()) {
    errors.financeChallenge = 'Please describe your biggest finance challenge.'
  }

  return errors
}

export function EarlyAccessForm() {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    workEmail: '',
    companyName: '',
    businessType: '',
    businessSize: '',
    accountingSystem: '',
    financeChallenge: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const updated = validate({ ...values, [field]: value })
      setErrors((prev) => {
        const next = { ...prev }
        if (updated[field]) next[field] = updated[field]
        else delete next[field]
        return next
      })
    }
  }

  function markTouched(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const fieldErrors = validate(values)
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setTouched({
      fullName: true,
      workEmail: true,
      companyName: true,
      businessType: true,
      businessSize: true,
      accountingSystem: true,
      financeChallenge: true,
    })

    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    // Frontend demo — replace with backend integration
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-sm">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-positive/15 text-positive">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          You&apos;re on the list.
        </h3>
        <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
          Thank you for joining Dhanvi&apos;s early access. We&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          name="fullName"
          placeholder="Your full name"
          required
          value={values.fullName}
          onChange={(v) => updateField('fullName', v)}
          onBlur={() => markTouched('fullName')}
          error={errors.fullName}
        />
        <FormField
          label="Work Email"
          name="workEmail"
          type="email"
          placeholder="you@company.com"
          required
          value={values.workEmail}
          onChange={(v) => updateField('workEmail', v)}
          onBlur={() => markTouched('workEmail')}
          error={errors.workEmail}
        />
      </div>

      <FormField
        label="Company Name"
        name="companyName"
        placeholder="Your company"
        required
        value={values.companyName}
        onChange={(v) => updateField('companyName', v)}
        onBlur={() => markTouched('companyName')}
        error={errors.companyName}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect
          label="Business Type"
          name="businessType"
          placeholder="Select type"
          options={BUSINESS_TYPES}
          required
          value={values.businessType}
          onChange={(v) => updateField('businessType', v)}
          onBlur={() => markTouched('businessType')}
          error={errors.businessType}
        />
        <FormSelect
          label="Business Size"
          name="businessSize"
          placeholder="Select size"
          options={BUSINESS_SIZES}
          required
          value={values.businessSize}
          onChange={(v) => updateField('businessSize', v)}
          onBlur={() => markTouched('businessSize')}
          error={errors.businessSize}
        />
      </div>

      <FormSelect
        label="Current Accounting System"
        name="accountingSystem"
        placeholder="Select system"
        options={ACCOUNTING_SYSTEMS}
        value={values.accountingSystem}
        onChange={(v) => updateField('accountingSystem', v)}
      />

      <FormTextarea
        label="Biggest Finance Challenge"
        name="financeChallenge"
        placeholder="What's the hardest part of managing your business finances today?"
        required
        value={values.financeChallenge}
        onChange={(v) => updateField('financeChallenge', v)}
        onBlur={() => markTouched('financeChallenge')}
        error={errors.financeChallenge}
      />

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Early Access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        No spam. We&apos;ll only email you about your early access.
      </p>
    </form>
  )
}
