'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Wallet } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { useDhanviState } from '../../../../lib/supabase/demo-store';
import { getCashFlow } from '../../../../lib/accounting/reports';
import { formatINR } from '../../../../lib/accounting/money';

export default function CashFlowPage() {
  const { state } = useDhanviState();
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Cash Flow...</div>;

  const cf = getCashFlow(state.accounts, state.journalEntries, startDate, endDate);

  return (
    <div className="space-y-6 max-w-4xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/reports" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reports
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Cash Flow Statement
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {state.business.name} • Period: {startDate} to {endDate}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 text-xs font-mono">
            {/* OPERATING CASH FLOW */}
            <div className="p-4 bg-neutral-50/70 font-bold uppercase text-neutral-900">
              1. Cash Flows from Operating Activities
            </div>
            <div className="px-6 py-2.5 flex justify-between pl-10 text-neutral-700">
              <span>Net Profit for the Period</span>
              <span>{formatINR(cf.operatingActivities.netProfit)}</span>
            </div>
            <div className="px-6 py-2.5 flex justify-between pl-10 text-neutral-700">
              <span>Change in Accounts Receivable</span>
              <span>{formatINR(cf.operatingActivities.receivablesChange)}</span>
            </div>
            <div className="px-6 py-2.5 flex justify-between pl-10 text-neutral-700">
              <span>Change in Accounts Payable</span>
              <span>{formatINR(cf.operatingActivities.payablesChange)}</span>
            </div>
            <div className="px-6 py-3 flex justify-between font-bold text-neutral-900 bg-neutral-50/40">
              <span>Net Cash from Operating Activities</span>
              <span className="text-emerald-700">{formatINR(cf.operatingActivities.netOperatingCash)}</span>
            </div>

            {/* INVESTING CASH FLOW */}
            <div className="p-4 bg-neutral-50/70 font-bold uppercase text-neutral-900">
              2. Cash Flows from Investing Activities
            </div>
            <div className="px-6 py-2.5 flex justify-between pl-10 text-neutral-700">
              <span>Fixed Asset Purchases</span>
              <span>{formatINR(cf.investingActivities.fixedAssetPurchases)}</span>
            </div>
            <div className="px-6 py-3 flex justify-between font-bold text-neutral-900 bg-neutral-50/40">
              <span>Net Cash from Investing Activities</span>
              <span>{formatINR(cf.investingActivities.netInvestingCash)}</span>
            </div>

            {/* FINANCING CASH FLOW */}
            <div className="p-4 bg-neutral-50/70 font-bold uppercase text-neutral-900">
              3. Cash Flows from Financing Activities
            </div>
            <div className="px-6 py-2.5 flex justify-between pl-10 text-neutral-700">
              <span>Owner Capital Injections / Drawings</span>
              <span>{formatINR(cf.financingActivities.ownerInjections - cf.financingActivities.ownerDrawings)}</span>
            </div>
            <div className="px-6 py-3 flex justify-between font-bold text-neutral-900 bg-neutral-50/40">
              <span>Net Cash from Financing Activities</span>
              <span>{formatINR(cf.financingActivities.netFinancingCash)}</span>
            </div>

            {/* NET LIQUID CASH MOVEMENT */}
            <div className="p-5 bg-emerald-50/60 flex justify-between font-bold text-sm text-neutral-900 border-t-2 border-emerald-600">
              <span>Net Change in Cash & Cash Equivalents</span>
              <span className="text-emerald-700">{formatINR(cf.netCashFlow)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
