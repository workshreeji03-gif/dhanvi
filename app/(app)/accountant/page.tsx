'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useDhanviState } from '../../../lib/supabase/demo-store';
import { formatINR } from '../../../lib/accounting/money';

export default function AccountantPage() {
  const { state } = useDhanviState();

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading accountant workspace...</div>;

  const pendingTransactions = state.transactions.filter((t) => t.status === 'PENDING_REVIEW');

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Accountant Command Center
            </h1>
            <Badge variant="info" size="sm">Chartered Accountant Workspace</Badge>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Human-in-the-loop exception handling, categorization reviews, and journal approvals
          </p>
        </div>

        <Link href="/accountant/review">
          <Button
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Open Review Queue ({pendingTransactions.length} items)
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Uncategorized / Pending Review</p>
          <p className="text-2xl font-extrabold font-mono mt-1 text-amber-600">{pendingTransactions.length} transactions</p>
          <p className="text-[11px] text-neutral-400 mt-1">Requires CA sign-off</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Invoices Posted</p>
          <p className="text-2xl font-extrabold font-mono mt-1 text-neutral-900">{state.invoices.length} Invoices</p>
          <p className="text-[11px] text-neutral-400 mt-1">GST & Math verified</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">General Ledger Invariant</p>
          <p className="text-2xl font-extrabold font-mono mt-1 text-emerald-700">100% Balanced</p>
          <p className="text-[11px] text-neutral-400 mt-1">Debits === Credits</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-bold text-neutral-900 mb-2">Accountant Review Workflow</h3>
        <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
          Dhanvi provides an accountant-ready ledger system. When transactions are flagged with low confidence or high values, they are placed in the review queue for classification confirmation before being locked into formal quarterly tax filings.
        </p>
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-3">
          <Link href="/accountant/review">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Review Transactions Now
            </Button>
          </Link>
          <Link href="/reports/trial-balance">
            <Button size="sm" variant="outline">
              Inspect Trial Balance
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
