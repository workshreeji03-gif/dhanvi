'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, Check, X, ShieldCheck, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { useDhanviState, saveAppState } from '../../../../lib/supabase/demo-store';
import { formatINR } from '../../../../lib/accounting/money';
import { formatDate } from '../../../../lib/utils/formatters';
import { createJournalEntry } from '../../../../lib/accounting/journal';
import { generateJournalLinesForTransaction } from '../../../../lib/accounting/transactions';
import { showToast } from '../../../../components/ui/toast';

export default function AccountantReviewPage() {
  const { state } = useDhanviState();

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Review Queue...</div>;

  const pendingItems = state.transactions.filter((t) => t.status === 'PENDING_REVIEW');

  const handleApprove = (txId: string) => {
    const targetTx = state.transactions.find((t) => t.id === txId);
    if (!targetTx) return;

    const lines = generateJournalLinesForTransaction({
      businessId: state.business.id,
      type: targetTx.type,
      amount: targetTx.amount,
      paymentMethod: targetTx.paymentMethod,
      description: targetTx.description,
      accounts: state.accounts,
    });

    const je = createJournalEntry({
      businessId: state.business.id,
      entryDate: targetTx.date,
      description: `Accountant Approved: ${targetTx.description}`,
      sourceType: 'TRANSACTION',
      lines,
    });

    const updatedTx = state.transactions.map((t) =>
      t.id === txId ? { ...t, status: 'POSTED' as const, journalEntryId: je.id } : t
    );

    const updatedState = {
      ...state,
      transactions: updatedTx,
      journalEntries: [je, ...state.journalEntries],
    };

    saveAppState(updatedState);
    showToast('Transaction Approved', 'Balanced journal entry posted to General Ledger.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/accountant" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Command Center
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Accountant Review Queue
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {pendingItems.length} items requiring classification verification or journal approval
          </p>
        </div>
      </div>

      {pendingItems.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-neutral-900">Review Queue is Clear</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            All posted ledger transactions are categorized and in double-entry balance.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {pendingItems.map((item) => (
            <Card key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xs transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-neutral-400">{formatDate(item.date)}</span>
                  <Badge variant="warning" size="sm">NEEDS REVIEW</Badge>
                  <span className="text-xs font-semibold text-neutral-500">{item.type}</span>
                </div>
                <h3 className="font-bold text-sm text-neutral-900">{item.description}</h3>
                <p className="text-xs text-neutral-500">
                  Payment Method: <span className="capitalize">{item.paymentMethod.replace(/_/g, ' ')}</span> • Category: {item.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Amount</span>
                  <p className="font-mono font-bold text-base text-neutral-900">{formatINR(item.amount)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApprove(item.id)}
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
                >
                  Approve & Post
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
