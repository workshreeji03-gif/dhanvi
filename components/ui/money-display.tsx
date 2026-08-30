'use client';

import React from 'react';
import { clsx } from 'clsx';
import { formatINR, formatCompactINR } from '../../lib/accounting/money';

export interface MoneyDisplayProps {
  amount: number;
  className?: string;
  showDecimals?: boolean;
  compact?: boolean;
  colored?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
  autoScale?: boolean;
}

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  amount,
  className,
  showDecimals = true,
  compact = false,
  colored = false,
  size = 'md',
  autoScale = true,
}) => {
  const isPositive = amount > 0;
  const isNegative = amount < 0;

  // Solid, high-contrast, always-visible color hierarchy
  const colorClass = colored
    ? isPositive
      ? 'text-emerald-700'
      : isNegative
      ? 'text-rose-700'
      : 'text-neutral-950'
    : 'text-neutral-950';

  const formatted = compact
    ? formatCompactINR(amount)
    : formatINR(amount, { showDecimals });

  const length = formatted.length;

  // Responsive dynamic font scaling engine:
  // Dynamically adapts font size so very large numbers (e.g. ₹12,45,67,890 or ₹1,25,45,67,890)
  // NEVER overflow, clip, or hide trailing digits.
  let dynamicSizeClass = '';
  if (autoScale && (size === '2xl' || size === 'xl' || size === 'auto')) {
    if (length > 15) {
      dynamicSizeClass = 'text-sm sm:text-base font-bold tracking-tight';
    } else if (length > 12) {
      dynamicSizeClass = 'text-base sm:text-lg font-bold tracking-tight';
    } else if (length > 9) {
      dynamicSizeClass = 'text-lg sm:text-xl font-bold tracking-tight';
    } else if (length > 7) {
      dynamicSizeClass = 'text-xl sm:text-2xl font-bold tracking-tight';
    } else {
      dynamicSizeClass = 'text-2xl sm:text-3xl font-extrabold tracking-tight';
    }
  } else {
    const sizeClasses = {
      sm: 'text-xs font-medium',
      md: 'text-sm font-semibold',
      lg: 'text-base sm:text-lg font-bold tracking-tight',
      xl: 'text-lg sm:text-xl font-bold tracking-tight',
      '2xl': 'text-xl sm:text-2xl font-extrabold tracking-tight',
      auto: 'text-sm font-semibold',
    };
    dynamicSizeClass = sizeClasses[size || 'md'];
  }

  return (
    <span
      className={clsx(
        'font-mono tabular-nums inline-block whitespace-nowrap break-keep select-text min-w-0 max-w-full overflow-visible font-bold text-neutral-950',
        colorClass,
        dynamicSizeClass,
        className
      )}
      title={formatINR(amount, { showDecimals: true })}
    >
      {formatted}
    </span>
  );
};
