import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'sm',
  ...props
}) => {
  const base = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200/80',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    info: 'bg-sky-50 text-sky-800 border border-sky-200/80',
    purple: 'bg-purple-50 text-purple-800 border border-purple-200/80',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
