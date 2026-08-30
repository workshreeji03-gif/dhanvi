'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { MoneyDisplay } from '../../../../components/ui/money-display';
import { useDhanviState } from '../../../../lib/supabase/demo-store';
import { getBalanceSheet } from '../../../../lib/accounting/reports';
import { formatINR } from '../../../../lib/accounting/money';
import { exportToCSV } from '../../../../lib/utils/export';

export default function BalanceSheetPage() {
  const { state } = useDhanviState();
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Balance Sheet...</div>;

  const bs = getBalanceSheet(state.accounts, state.journalEntries, asOfDate);

  const handleExportCSV = () => {
    const rows = [
      { Section: 'Assets', Line: 'Cash and Bank Balances', Amount: bs.assets.currentAssets.cashAndBank },
      { Section: 'Assets', Line: 'Trade Receivables (Debtors)', Amount: bs.assets.currentAssets.accountsReceivable },
      { Section: 'Assets', Line: 'Inventory Valuation', Amount: bs.assets.currentAssets.inventory },
      { Section: 'Assets', Line: 'Total Assets', Amount: bs.assets.totalAssets },
      { Section: 'Liabilities', Line: 'Trade Payables (Creditors)', Amount: bs.liabilities.currentLiabilities.accountsPayable },
      { Section: 'Liabilities', Line: 'Total Liabilities', Amount: bs.liabilities.totalLiabilities },
      { Section: 'Equity', Line: 'Owner Capital', Amount: bs.equity.ownerCapital },
      { Section: 'Equity', Line: 'Retained Earnings', Amount: bs.equity.retainedEarnings },
      { Section: 'Equity', Line: 'Total Equity', Amount: bs.equity.totalEquity },
      { Section: 'Total', Line: 'Total Liabilities + Equity', Amount: bs.totalLiabilitiesAndEquity },
    ];
    exportToCSV(`dhanvi_balance_sheet_${asOfDate}`, rows);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/reports" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reports Hub
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Balance Sheet (Financial Position)
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {state.business.name} • As of {asOfDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Invariant Verification Banner */}
      <Card className={`p-4 ${bs.isBalanced ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {bs.isBalanced ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <div>
              <p className="font-bold text-xs text-neutral-900">
                Fundamental Accounting Equation: Assets = Liabilities + Equity
              </p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                Total Assets: {formatINR(bs.assets.totalAssets)} • Total Liab + Eq: {formatINR(bs.totalLiabilitiesAndEquity)} (Diff: {formatINR(bs.discrepancy)})
              </p>
            </div>
          </div>
          <Badge variant={bs.isBalanced ? 'success' : 'danger'} size="sm">
            {bs.isBalanced ? 'BALANCED' : 'IMBALANCE DETECTED'}
          </Badge>
        </div>
      </Card>

      {/* Grid: Assets vs Liabilities & Equity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ASSETS */}
        <Card>
          <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
            <CardTitle className="text-sm">ASSETS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100 text-xs">
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Cash and Bank Balances</p>
                  <p className="text-[10px] text-neutral-400 font-mono">1100, 1110</p>
                </div>
                <MoneyDisplay amount={bs.assets.currentAssets.cashAndBank} size="sm" className="font-mono font-bold" />
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Trade Receivables (Debtors)</p>
                  <p className="text-[10px] text-neutral-400 font-mono">1200</p>
                </div>
                <MoneyDisplay amount={bs.assets.currentAssets.accountsReceivable} size="sm" className="font-mono font-bold" />
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Inventory Valuation</p>
                  <p className="text-[10px] text-neutral-400 font-mono">1400</p>
                </div>
                <MoneyDisplay amount={bs.assets.currentAssets.inventory} size="sm" className="font-mono font-bold" />
              </div>
              <div className="p-4 bg-emerald-50/40 flex items-center justify-between font-bold text-neutral-900 border-t border-neutral-200">
                <span>TOTAL ASSETS</span>
                <span className="font-mono text-emerald-700 text-sm">{formatINR(bs.assets.totalAssets)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LIABILITIES & EQUITY */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
              <CardTitle className="text-sm">LIABILITIES</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-100 text-xs">
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">Trade Payables (Creditors)</p>
                    <p className="text-[10px] text-neutral-400 font-mono">2100</p>
                  </div>
                  <MoneyDisplay amount={bs.liabilities.currentLiabilities.accountsPayable} size="sm" className="font-mono font-bold text-neutral-900" />
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">GST Output Tax Liability</p>
                    <p className="text-[10px] text-neutral-400 font-mono">2200</p>
                  </div>
                  <MoneyDisplay amount={bs.liabilities.currentLiabilities.taxPayable} size="sm" className="font-mono font-bold text-neutral-900" />
                </div>
                <div className="p-3 bg-neutral-50 flex items-center justify-between font-bold text-xs">
                  <span>TOTAL LIABILITIES</span>
                  <span className="font-mono">{formatINR(bs.liabilities.totalLiabilities)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
              <CardTitle className="text-sm">EQUITY</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-100 text-xs">
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">Owner Capital / Equity</p>
                    <p className="text-[10px] text-neutral-400 font-mono">3000</p>
                  </div>
                  <MoneyDisplay amount={bs.equity.ownerCapital} size="sm" className="font-mono font-bold text-neutral-900" />
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">Cumulative Retained Earnings</p>
                    <p className="text-[10px] text-neutral-400 font-mono">3100</p>
                  </div>
                  <MoneyDisplay amount={bs.equity.retainedEarnings} size="sm" className="font-mono font-bold text-emerald-700" />
                </div>
                <div className="p-4 bg-emerald-50/40 flex items-center justify-between font-bold text-neutral-900 border-t border-neutral-200">
                  <span>TOTAL LIABILITIES & EQUITY</span>
                  <span className="font-mono text-emerald-700 text-sm">{formatINR(bs.totalLiabilitiesAndEquity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
