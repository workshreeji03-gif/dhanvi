'use client'

import { ArrowUpRight } from 'lucide-react'
import { useCountUp } from './use-count-up'

type MetricCardProps = {
  label: string
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  change?: string
  emphasis?: boolean
}

export function MetricCard({
  label,
  value,
  decimals = 2,
  prefix = '₹',
  suffix = 'L',
  change,
  emphasis = false,
}: MetricCardProps) {
  const { ref, value: animated } = useCountUp(value)

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
        emphasis
          ? 'border-positive/25 bg-positive/[0.06]'
          : 'border-border bg-card hover:border-foreground/15'
      }`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span
          ref={ref}
          className="tabular text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          {prefix}
          {animated.toFixed(decimals)}
          {suffix}
        </span>
        {change && (
          <span className="mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold text-positive">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {change}
          </span>
        )}
      </div>
    </div>
  )
}
