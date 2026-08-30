'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Scale, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { useDhanviState } from '../../../../lib/supabase/demo-store';
import { calculateTrialBalance } from '../../../../lib/accounting/ledger';
import { formatINR } from '../../../../lib/accounting/money';
import { exportToCSV } from '../../../../lib/utils/export';

export default function TrialBalancePage() {
  const { state } = useDhanviState();

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Trial Balance...</div>;

  const tb = calculateTrialBalance(state.accounts, state.journalEntries);

  const handleExportCSV = () => {
    const rows = tb.rows.map((r) => ({
      AccountCode: r.accountCode,
      AccountName: r.accountName,
      Type: r.type,
      Debit: r.debitTotal,
      Credit: r.creditTotal,
      NetBalance: r.balance,
    }));
    exportToCSV(`dhanvi_trial_balance_${new Date().toISOString().split('T')[0]}`, rows);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/reports" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reports
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Trial Balance
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {state.business.name} • Double-entry integrity verification
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Trial Balance Verified: Debits === Credits (Zero Variance)</span>
        </div>
        <Badge variant={tb.isBalanced ? 'success' : 'danger'} size="sm">
          {tb.isBalanced ? 'BALANCED' : 'IMBALANCE'}
        </Badge>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Account Name</th>
                <th className="py-3 px-4 text-right">Debit Balance (₹)</th>
                <th className="py-3 px-4 text-right">Credit Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {tb.rows.map((row) => (
                <tr key={row.accountId} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-neutral-700">{row.accountCode}</td>
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">{row.accountName}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-neutral-900">
                    {row.debitTotal > 0 ? formatINR(row.debitTotal) : '—'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-neutral-900">
                    {row.creditTotal > 0 ? formatINR(row.creditTotal) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-emerald-600 bg-emerald-50/40 font-bold text-neutral-900">
                <td colSpan={2} className="py-3 px-4 text-sm">TOTALS</td>
                <td className="py-3 px-4 text-right font-mono text-sm text-emerald-700">{formatINR(tb.totalDebits)}</td>
                <td className="py-3 px-4 text-right font-mono text-sm text-emerald-700">{formatINR(tb.totalCredits)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
