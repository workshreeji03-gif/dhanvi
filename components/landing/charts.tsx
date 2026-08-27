'use client'

import { useId } from 'react'

/** Builds a smooth-ish SVG path from normalized points. */
function toPath(data: number[], width: number, height: number, pad = 2) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = (width - pad * 2) / (data.length - 1)
  return data
    .map((d, i) => {
      const x = pad + i * step
      const y = pad + (height - pad * 2) * (1 - (d - min) / range)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

type AreaChartProps = {
  data: number[]
  /** css color token, e.g. "var(--positive)" */
  color?: string
  className?: string
  height?: number
}

export function AreaChart({
  data,
  color = 'var(--positive)',
  className,
  height = 120,
}: AreaChartProps) {
  const id = useId()
  const w = 300
  const h = height
  const line = toPath(data, w, h)
  const area = `${line} L${w - 2},${h - 2} L2,${h - 2} Z`

  return (
    <svg
      // remount on data change so the draw animation replays
      key={data.join(',')}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label="Trend chart"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#fill-${id})`} className="animate-area" />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="animate-draw"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

type BarChartProps = {
  data: number[]
  color?: string
  className?: string
  height?: number
}

export function BarChart({
  data,
  color = 'var(--info)',
  className,
  height = 120,
}: BarChartProps) {
  const max = Math.max(...data) || 1
  return (
    <div
      key={data.join(',')}
      className={`flex items-end gap-1.5 ${className ?? ''}`}
      style={{ height }}
      role="img"
      aria-label="Bar chart"
    >
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm animate-rise"
          style={{
            height: `${(d / max) * 100}%`,
            background: color,
            opacity: 0.35 + (d / max) * 0.65,
            animationDelay: `${i * 45}ms`,
          }}
        />
      ))}
    </div>
  )
}

/** Circular progress ring for the business-health score. */
export function ScoreRing({
  score,
  size = 160,
  color = 'var(--positive)',
}: {
  score: number
  size?: number
  color?: string
}) {
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - score / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score ${score} of 100`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </svg>
  )
}
