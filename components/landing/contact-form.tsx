'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { FormField, FormTextarea } from './form-fields'

type FormValues = {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Please enter a subject.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please enter a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please provide a bit more detail (at least 10 characters).'
  }

  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        const updated = validate({ ...values, [field]: value })
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
    setTouched({ name: true, email: true, company: true, subject: true, message: true })

    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    // Frontend demo — replace with backend/email provider integration
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
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          Thanks for reaching out.
        </h3>
        <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
          We&apos;ll get back to you soon.
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
          label="Name"
          name="name"
          placeholder="Your name"
          required
          value={values.name}
          onChange={(v) => updateField('name', v)}
          onBlur={() => markTouched('name')}
          error={errors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          value={values.email}
          onChange={(v) => updateField('email', v)}
          onBlur={() => markTouched('email')}
          error={errors.email}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Company"
          name="company"
          placeholder="Company name (optional)"
          value={values.company}
          onChange={(v) => updateField('company', v)}
        />
        <FormField
          label="Subject"
          name="subject"
          placeholder="What's this about?"
          required
          value={values.subject}
          onChange={(v) => updateField('subject', v)}
          onBlur={() => markTouched('subject')}
          error={errors.subject}
        />
      </div>

      <FormTextarea
        label="Message"
        name="message"
        placeholder="Tell us how we can help..."
        required
        value={values.message}
        onChange={(v) => updateField('message', v)}
        onBlur={() => markTouched('message')}
        error={errors.message}
      />

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  )
}
