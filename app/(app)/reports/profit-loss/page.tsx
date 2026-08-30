'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Calendar, ShieldCheck, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { MoneyDisplay } from '../../../../components/ui/money-display';
import { useDhanviState } from '../../../../lib/supabase/demo-store';
import { getProfitAndLoss } from '../../../../lib/accounting/reports';
import { formatINR } from '../../../../lib/accounting/money';
import { exportToCSV } from '../../../../lib/utils/export';

type PresetTimeframe = 'THIS_MONTH' | 'PREVIOUS_MONTH' | 'THIS_QUARTER' | 'THIS_YEAR' | 'ALL_TIME';

export default function ProfitLossPage() {
  const { state } = useDhanviState();
  const [preset, setPreset] = useState<PresetTimeframe>('THIS_MONTH');
  const [comparePrevious, setComparePrevious] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    REVENUE: true,
    COGS: true,
    OPEX: true,
  });

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Profit & Loss...</div>;

  // Date ranges based on preset
  let currentStart = '2026-08-01';
  let currentEnd = '2026-08-31';
  let prevStart = '2026-07-01';
  let prevEnd = '2026-07-31';

  if (preset === 'THIS_MONTH') {
    currentStart = '2026-08-01';
    currentEnd = '2026-08-31';
    prevStart = '2026-07-01';
    prevEnd = '2026-07-31';
  } else if (preset === 'PREVIOUS_MONTH') {
    currentStart = '2026-07-01';
    currentEnd = '2026-07-31';
    prevStart = '2026-06-01';
    prevEnd = '2026-06-30';
  } else if (preset === 'THIS_QUARTER') {
    currentStart = '2026-07-01';
    currentEnd = '2026-09-30';
    prevStart = '2026-04-01';
    prevEnd = '2026-06-30';
  } else if (preset === 'THIS_YEAR' || preset === 'ALL_TIME') {
    currentStart = '2026-04-01';
    currentEnd = '2027-03-31';
    prevStart = '2025-04-01';
    prevEnd = '2026-03-31';
  }

  // Deterministic Accounting Engine Calculations
  const currentPnl = getProfitAndLoss(state.accounts, state.journalEntries, currentStart, currentEnd);

  const toggleSection = (sec: string) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleExport = () => {
    const rows = [
      { Section: 'REVENUE', Account: 'Total Revenue', Amount: currentPnl.revenue.totalRevenue },
      { Section: 'COGS', Account: 'Cost of Goods Sold', Amount: currentPnl.costOfGoodsSold.totalCOGS },
      { Section: 'GROSS PROFIT', Account: 'Gross Profit', Amount: currentPnl.grossProfit },
      { Section: 'OPEX', Account: 'Operating Expenses', Amount: currentPnl.operatingExpenses.totalOperatingExpenses },
      { Section: 'OPERATING PROFIT', Account: 'Operating Profit', Amount: currentPnl.operatingProfit },
      { Section: 'NET PROFIT', Account: 'Net Profit', Amount: currentPnl.netProfit },
    ];
    exportToCSV(`Profit_and_Loss_${currentStart}_to_${currentEnd}`, rows);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/reports">
            <Button size="icon" variant="outline" className="w-8 h-8 rounded-xl text-neutral-500">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Profit & Loss Statement
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Income Statement ({currentStart} to {currentEnd})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset Timeframe Filter */}
          <div className="flex items-center gap-1 bg-white border border-neutral-200/80 p-1 rounded-xl text-xs shadow-2xs">
            {(['THIS_MONTH', 'PREVIOUS_MONTH', 'THIS_QUARTER', 'THIS_YEAR'] as PresetTimeframe[]).map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  preset === p
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {p.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          <Button size="sm" variant="outline" onClick={handleExport} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Revenue</p>
          <MoneyDisplay amount={currentPnl.revenue.totalRevenue} size="xl" className="text-neutral-900 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gross Profit ({currentPnl.grossMarginPercentage}%)</p>
          <MoneyDisplay amount={currentPnl.grossProfit} size="xl" className="text-neutral-900 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Net Profit ({currentPnl.netMarginPercentage}%)</p>
          <MoneyDisplay amount={currentPnl.netProfit} size="xl" colored className="text-emerald-700 font-bold mt-1" />
        </Card>
      </div>

      {/* Itemized P&L Statement Table */}
      <Card>
        <CardHeader className="border-b border-neutral-100 pb-3">
          <CardTitle className="text-base">Statement Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 text-xs">
            {/* 1. REVENUE */}
            <div className="p-4 bg-neutral-50/40">
              <div
                className="flex items-center justify-between cursor-pointer font-bold text-neutral-900"
                onClick={() => toggleSection('REVENUE')}
              >
                <div className="flex items-center gap-2">
                  {expandedSections.REVENUE ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>Operating Revenue & Sales</span>
                </div>
                <span className="font-mono">{formatINR(currentPnl.revenue.totalRevenue)}</span>
              </div>
              {expandedSections.REVENUE && (
                <div className="pl-6 pt-2 space-y-1.5 text-neutral-600">
                  {currentPnl.revenue.items.length === 0 ? (
                    <p className="text-neutral-400 font-mono py-1">No revenue accounts posted in period</p>
                  ) : (
                    currentPnl.revenue.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1">
                        <span>{item.accountName}</span>
                        <span className="font-mono font-semibold text-neutral-900">{formatINR(item.amount)}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 2. COGS */}
            <div className="p-4 bg-neutral-50/40">
              <div
                className="flex items-center justify-between cursor-pointer font-bold text-neutral-900"
                onClick={() => toggleSection('COGS')}
              >
                <div className="flex items-center gap-2">
                  {expandedSections.COGS ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>Cost of Goods Sold (COGS)</span>
                </div>
                <span className="font-mono">{formatINR(currentPnl.costOfGoodsSold.totalCOGS)}</span>
              </div>
              {expandedSections.COGS && (
                <div className="pl-6 pt-2 space-y-1.5 text-neutral-600">
                  {currentPnl.costOfGoodsSold.items.length === 0 ? (
                    <p className="text-neutral-400 font-mono py-1">No direct purchase costs posted</p>
                  ) : (
                    currentPnl.costOfGoodsSold.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1">
                        <span>{item.accountName}</span>
                        <span className="font-mono font-semibold text-neutral-900">{formatINR(item.amount)}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* GROSS PROFIT ROW */}
            <div className="p-4 bg-emerald-50/30 flex items-center justify-between font-bold text-neutral-900 text-sm">
              <span>Gross Profit (Revenue - COGS)</span>
              <span className="font-mono text-emerald-700">{formatINR(currentPnl.grossProfit)}</span>
            </div>

            {/* 3. OPEX */}
            <div className="p-4 bg-neutral-50/40">
              <div
                className="flex items-center justify-between cursor-pointer font-bold text-neutral-900"
                onClick={() => toggleSection('OPEX')}
              >
                <div className="flex items-center gap-2">
                  {expandedSections.OPEX ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>Operating Expenses (OPEX)</span>
                </div>
                <span className="font-mono">{formatINR(currentPnl.operatingExpenses.totalOperatingExpenses)}</span>
              </div>
              {expandedSections.OPEX && (
                <div className="pl-6 pt-2 space-y-1.5 text-neutral-600">
                  {currentPnl.operatingExpenses.items.length === 0 ? (
                    <p className="text-neutral-400 font-mono py-1">No operating expenses posted</p>
                  ) : (
                    currentPnl.operatingExpenses.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1">
                        <span>{item.accountName}</span>
                        <span className="font-mono font-semibold text-neutral-900">{formatINR(item.amount)}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* NET PROFIT ROW */}
            <div className="p-5 bg-emerald-50/60 flex items-center justify-between font-extrabold text-neutral-900 text-base border-t-2 border-emerald-600">
              <div>
                <span>Net Profit / (Loss)</span>
                <span className="block text-xs font-normal text-emerald-800 mt-0.5">
                  Net Margin: {currentPnl.netMarginPercentage}%
                </span>
              </div>
              <span className="font-mono text-xl text-emerald-700">{formatINR(currentPnl.netProfit)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
