'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Card } from './card';
import { MoneyDisplay } from './money-display';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  subtitle?: string;
  amount: number;
  comparison?: {
    percentage: number;
    label: string;
    isPositiveGood?: boolean;
  };
  icon?: React.ReactNode;
  onClick?: () => void;
  accentColor?: 'emerald' | 'neutral' | 'blue' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  subtitle,
  amount,
  comparison,
  icon,
  onClick,
  accentColor = 'neutral',
}) => {
  const isUp = comparison && comparison.percentage >= 0;
  const isGood = comparison?.isPositiveGood !== undefined
    ? isUp === comparison.isPositiveGood
    : isUp;

  return (
    <Card
      onClick={onClick}
      className={clsx(
        'p-5 sm:p-6 transition-all hover:border-neutral-300 hover:shadow-sm min-w-0 overflow-visible flex flex-col justify-between group bg-white border-neutral-200/80',
        onClick && 'cursor-pointer'
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate">
              {title}
            </p>
            {subtitle && (
              <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-600 group-hover:text-emerald-700 group-hover:bg-emerald-50/60 group-hover:border-emerald-100 transition-all shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-4 min-w-0 overflow-visible flex items-baseline">
          <MoneyDisplay amount={amount} size="2xl" autoScale={true} />
        </div>
      </div>

      {comparison && (
        <div className="mt-3.5 flex items-center gap-1.5 text-xs flex-wrap">
          <span
            className={clsx(
              'inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md text-[11px]',
              isGood
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
            )}
          >
            {isUp ? (
              <TrendingUp className="w-3 h-3 shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 shrink-0" />
            )}
            {Math.abs(comparison.percentage)}%
          </span>
          <span className="text-neutral-500 text-[11px] truncate">
            {comparison.label}
          </span>
        </div>
      )}
    </Card>
  );
};
