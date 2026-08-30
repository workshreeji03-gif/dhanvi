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
  onClick?: () => void
  isSelected?: boolean
  tooltip?: string
}

export function MetricCard({
  label,
  value,
  decimals = 2,
  prefix = '₹',
  suffix = 'L',
  change,
  emphasis = false,
  onClick,
  isSelected = false,
  tooltip,
}: MetricCardProps) {
  const { ref, value: animated } = useCountUp(value)

  return (
    <div
      onClick={onClick}
      title={tooltip || `Click to view ${label} breakdown`}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
        onClick ? 'cursor-pointer select-none' : ''
      } ${
        isSelected
          ? 'ring-2 ring-positive/40 border-positive bg-positive/[0.08] shadow-sm'
          : emphasis
          ? 'border-positive/25 bg-positive/[0.06] hover:border-positive/40 hover:bg-positive/[0.09]'
          : 'border-border bg-card hover:border-foreground/20 hover:bg-muted/30 hover:shadow-2xs'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
          {label}
        </span>
        {tooltip && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-muted-foreground font-mono">
            Details ↗
          </span>
        )}
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <span
          ref={ref}
          className="tabular text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl"
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
