'use client';

import React from 'react';
import { clsx } from 'clsx';
import { BusinessHealthScore } from '../../lib/ai/insights';
import { ShieldCheck, Info } from 'lucide-react';

export interface HealthGaugeProps {
  health?: BusinessHealthScore;
  score?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ health, score: directScore, label: directLabel, size = 'md' }) => {
  const currentScore = health ? health.overallScore : (directScore ?? 85);
  const currentLabel = health ? (currentScore >= 80 ? 'EXCELLENT' : currentScore >= 65 ? 'HEALTHY' : 'NEEDS ATTENTION') : (directLabel ?? 'HEALTHY');

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-700';
    if (s >= 65) return 'text-emerald-600';
    if (s >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBarColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-600';
    if (s >= 65) return 'bg-emerald-500';
    if (s >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  if (!health && directScore !== undefined) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center">
          <div className="text-center">
            <span className={clsx('font-mono font-extrabold tracking-tight', size === 'lg' ? 'text-5xl' : 'text-3xl', getScoreColor(currentScore))}>
              {currentScore}
            </span>
            <span className="text-xs font-semibold text-neutral-400 block mt-1 uppercase tracking-wider">
              {currentLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-sm text-neutral-900">5-Pillar Health Score</h3>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={clsx('text-3xl font-extrabold font-mono', getScoreColor(currentScore))}>
            {currentScore}
          </span>
          <span className="text-xs text-neutral-400">/ 100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
        <div
          className={clsx('h-full transition-all duration-500', getBarColor(currentScore))}
          style={{ width: `${currentScore}%` }}
        />
      </div>

      {/* 5 Pillars Breakdown */}
      {health && health.pillars && (
        <div className="space-y-3">
          {Object.entries(health.pillars).map(([key, pillar]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="capitalize font-semibold text-neutral-700">
                {pillar.label || key}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 font-mono text-[11px]">{pillar.metric}</span>
                <span className={clsx('font-mono font-bold', getScoreColor(Math.round((pillar.score / pillar.max) * 100)))}>
                  {pillar.score}/{pillar.max}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-start gap-2 text-[11px] text-neutral-400">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
        <p>Calculated deterministically from cash reserves, gross margins, debtor days, and solvency ratios.</p>
      </div>
    </div>
  );
};
