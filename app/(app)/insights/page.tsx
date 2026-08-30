'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, AlertCircle, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, X, Filter } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { HealthGauge } from '../../../components/ui/health-gauge';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState } from '../../../lib/supabase/demo-store';
import { generateProactiveInsights } from '../../../lib/ai/insights';

export default function InsightsPage() {
  const { state } = useDhanviState();
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Analyzing business health...</div>;

  const { insights, health } = generateProactiveInsights(
    state.business.id,
    state.accounts,
    state.journalEntries,
    state.transactions,
    state.customers,
    state.vendors,
    state.invoices
  );

  const activeInsights = insights.filter((i) => !dismissedIds.includes(i.id));

  const filtered = activeInsights.filter((i) => {
    if (severityFilter === 'ALL') return true;
    return i.severity === severityFilter;
  });

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
    showToast('Insight Dismissed', 'Insight removed from active feed.', 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Proactive AI Health & Margin Signals
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Automated margin monitoring, cash burn alarms, and operational guardrails
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">
              Active Signals ({filtered.length})
            </h2>

            <div className="flex items-center gap-1 bg-white border border-neutral-200/80 p-1 rounded-xl text-xs">
              {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                    severityFilter === sev
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-neutral-900">No active alerts or anomalies</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                All double-entry ratios, tax lines, and payment milestones are within expected operating parameters.
              </p>
            </Card>
          ) : (
            filtered.map((insight) => (
              <Card
                key={insight.id}
                className="p-5 border-l-4 border-l-emerald-600 space-y-3 hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        insight.severity === 'HIGH'
                          ? 'danger'
                          : insight.severity === 'MEDIUM'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {insight.severity} Priority
                    </Badge>
                    <span className="text-xs text-neutral-400 font-mono">
                      {insight.insightType.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDismiss(insight.id)}
                    className="text-neutral-400 hover:text-neutral-600 p-1"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{insight.title}</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{insight.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs">
                  <p className="font-semibold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Recommended Action
                  </p>
                  <p className="text-emerald-900 mt-1">{insight.recommendation}</p>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Health Score Sidebar */}
        <div className="space-y-4">
          <Card className="p-6 text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Financial Health Score
            </h3>
            <HealthGauge health={health} />
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Algorithmic index derived from working capital ratio, gross margin consistency, and receivables turnover.
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Active Guardrails
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-700">General Ledger Invariant:</span>
                <Badge variant="success" size="sm">Strict Dr === Cr</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-700">Tax Audit Guard:</span>
                <Badge variant="success" size="sm">Auto CGST+SGST</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-700">Overdue AR Tracker:</span>
                <Badge variant="info" size="sm">30-Day Threshold</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
