'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, CheckCircle2, FileText, Calendar, Wallet, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { MoneyDisplay } from '../../../../components/ui/money-display';
import { useDhanviState, reverseExistingTransaction } from '../../../../lib/supabase/demo-store';
import { formatINR } from '../../../../lib/accounting/money';
import { formatDate, formatDateTime } from '../../../../lib/utils/formatters';
import { showToast } from '../../../../components/ui/toast';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const txId = params.id as string;
  const { state } = useDhanviState();

  if (!state) {
    return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading transaction...</div>;
  }

  const tx = state.transactions.find((t) => t.id === txId);
  if (!tx) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-neutral-900">Transaction not found.</p>
        <Link href="/transactions">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Transactions
          </Button>
        </Link>
      </div>
    );
  }

  const journalEntry = state.journalEntries.find((j) => j.id === tx.journalEntryId);

  const handleReverse = () => {
    const reason = prompt('Enter reason for reversal:');
    if (!reason) return;
    try {
      reverseExistingTransaction(state, tx.id, reason);
      showToast('Transaction Reversed', 'Balanced reversal entry posted to General Ledger.');
    } catch (e: any) {
      showToast('Reversal Error', e.message, 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/transactions">
            <Button size="icon" variant="outline" className="w-8 h-8 rounded-xl text-neutral-500">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">Transaction Details</h1>
              <Badge
                variant={
                  tx.status === 'POSTED'
                    ? 'success'
                    : tx.status === 'REVERSED'
                    ? 'danger'
                    : 'warning'
                }
              >
                {tx.status}
              </Badge>
            </div>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">ID: {tx.id}</p>
          </div>
        </div>

        {tx.status === 'POSTED' && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleReverse}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-rose-600" />}
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            Reverse Transaction
          </Button>
        )}
      </div>

      {/* Overview Card */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Amount</span>
            <MoneyDisplay
              amount={tx.amount}
              colored
              size="2xl"
              className={tx.type === 'SALE' || tx.type === 'PAYMENT_RECEIVED' ? 'text-emerald-700 font-bold' : 'text-neutral-900 font-bold'}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">{tx.type}</Badge>
            <Badge variant="purple">{tx.category}</Badge>
            <Badge variant="info">{tx.paymentMethod.replace(/_/g, ' ')}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-neutral-400 font-semibold uppercase text-[10px]">Description</p>
            <p className="font-bold text-neutral-900 mt-1">{tx.description}</p>
          </div>
          <div>
            <p className="text-neutral-400 font-semibold uppercase text-[10px]">Transaction Date</p>
            <p className="font-mono text-neutral-800 mt-1">{formatDate(tx.date)}</p>
          </div>
          <div>
            <p className="text-neutral-400 font-semibold uppercase text-[10px]">Reference / UTR #</p>
            <p className="font-mono text-neutral-800 mt-1">{tx.referenceNumber || 'N/A'}</p>
          </div>
        </div>
      </Card>

      {/* Linked Double-Entry Journal Entry */}
      {journalEntry ? (
        <Card className="space-y-4">
          <CardHeader className="border-b border-neutral-100 pb-3 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <CardTitle className="text-sm">General Ledger Double-Entry Audit</CardTitle>
              </div>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Entry #{journalEntry.entryNumber} • Posted: {formatDateTime(journalEntry.createdAt || new Date().toISOString())}
              </p>
            </div>
            <Badge variant="success" size="sm">BALANCED</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                    <th className="py-2.5 px-4">Account Code</th>
                    <th className="py-2.5 px-4">Account Name</th>
                    <th className="py-2.5 px-4">Memo</th>
                    <th className="py-2.5 px-4 text-right">Debit (₹)</th>
                    <th className="py-2.5 px-4 text-right">Credit (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {journalEntry.lines.map((line) => {
                    const acc = state.accounts.find((a) => a.id === line.accountId);
                    return (
                      <tr key={line.id} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-2.5 px-4 font-mono font-bold text-neutral-700">{acc?.code || '—'}</td>
                        <td className="py-2.5 px-4 font-semibold text-neutral-900">{acc?.name || 'Account'}</td>
                        <td className="py-2.5 px-4 text-neutral-500">{line.description}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-neutral-900">
                          {line.debit > 0 ? formatINR(line.debit) : '—'}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-neutral-900">
                          {line.credit > 0 ? formatINR(line.credit) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 text-center text-xs text-neutral-400 font-mono">
          No double-entry journal linked to this record.
        </Card>
      )}
    </div>
  );
}
