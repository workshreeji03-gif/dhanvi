'use client';

import React from 'react';
import Link from 'next/link';
import { FileBarChart2, Scale, Wallet, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/card';

export default function ReportsHubPage() {
  const reports = [
    {
      title: 'Profit & Loss Statement',
      subtitle: 'Income Statement (Revenue, COGS, Gross & Net Profit)',
      href: '/reports/profit-loss',
      icon: FileBarChart2,
      desc: 'Itemized operational performance derived strictly from the general ledger.',
    },
    {
      title: 'Balance Sheet',
      subtitle: 'Assets, Liabilities & Equity (Invariant: Assets = L + E)',
      href: '/reports/balance-sheet',
      icon: Scale,
      desc: 'Real-time financial position statement with cumulative retained earnings.',
    },
    {
      title: 'Cash Flow Statement',
      subtitle: 'Operating, Investing & Financing Cash Movements',
      href: '/reports/cash-flow',
      icon: Wallet,
      desc: 'Track actual cash inflows and outflows to maintain liquidity runway.',
    },
    {
      title: 'Trial Balance',
      subtitle: 'Double-Entry Debit & Credit Invariant Verification',
      href: '/reports/trial-balance',
      icon: BookOpen,
      desc: 'Verify total debits equal total credits across all general ledger accounts.',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Official Financial Statements
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Deterministic reports computed directly from verified double-entry journal lines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, idx) => {
          const Icon = r.icon;
          return (
            <Link key={idx} href={r.href}>
              <Card className="p-6 h-full hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Open Report <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-emerald-900 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{r.subtitle}</p>
                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">{r.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                  <span>GAAP / Indian AS Compliant</span>
                  <span className="font-mono text-emerald-700 font-semibold">Live Real-time</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
