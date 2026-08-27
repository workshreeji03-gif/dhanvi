const inputClassName =
  'rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20'

const labelClassName =
  'text-xs font-semibold uppercase tracking-wide text-muted-foreground'

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  value,
  onChange,
  onBlur,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClassName}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClassName}
      />
      {error && (
        <span id={`${name}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}

export function FormTextarea({
  label,
  name,
  placeholder,
  required,
  error,
  value,
  onChange,
  onBlur,
  rows = 5,
}: {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  rows?: number
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClassName}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputClassName} resize-y min-h-[120px]`}
      />
      {error && (
        <span id={`${name}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}

export function FormSelect({
  label,
  name,
  options,
  required,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClassName}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClassName}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${name}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
