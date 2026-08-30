'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  Receipt,
  Users,
  Building2,
  Package,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle2,
  Circle,
  FileSpreadsheet,
  Scale,
  Send,
  Lightbulb,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { useDhanviState, postNewTransaction } from '../../../lib/supabase/demo-store';
import { getProfitAndLoss, getBalanceSheet } from '../../../lib/accounting/reports';
import { generateProactiveInsights } from '../../../lib/ai/insights';
import { formatINR } from '../../../lib/accounting/money';
import { formatDate } from '../../../lib/utils/formatters';
import { useAuthContext } from '../../../lib/auth/user-context';
import { AddTransactionModal } from '../../../components/accounting/add-transaction-modal';
import { showToast } from '../../../components/ui/toast';

export default function DashboardPage() {
  const router = useRouter();
  const { state } = useDhanviState();
  const { currentProfile } = useAuthContext();
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');

  if (!state) {
    return (
      <div className="p-12 text-center text-xs font-mono text-muted-foreground">
        Loading financial operating system...
      </div>
    );
  }

  // Dynamic Time-Based Personalized Greeting
  const currentHour = new Date().getHours();
  const greetingTime =
    currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';
  const rawName = currentProfile?.full_name || state.members?.[0]?.name || 'Business Owner';
  const firstName = rawName.split(' ')[0];
  const bizName = state.business?.name || 'My Business';

  // Deterministic Ledger Calculations
  const hasTransactions = state.transactions.length > 0;
  const pnl = getProfitAndLoss(state.accounts, state.journalEntries, '2026-08-01', '2026-08-31');
  const bs = getBalanceSheet(state.accounts, state.journalEntries);

  // Dynamic AI Insights from Actual Ledger Data
  const { insights } = generateProactiveInsights(
    state.business.id,
    state.accounts,
    state.journalEntries,
    state.transactions,
    state.customers,
    state.vendors,
    state.invoices
  );
  const topInsight = insights.length > 0 ? insights[0] : null;
  const recentTxs = state.transactions.slice(0, 6);

  // Real Calculated Onboarding Checklist
  const checklist = [
    {
      id: 'tx',
      label: 'Add your first transaction',
      completed: state.transactions.length > 0,
      action: () => setIsAddTxOpen(true),
      actionText: '+ Add Transaction',
    },
    {
      id: 'cust',
      label: 'Add your customers',
      completed: state.customers.length > 0,
      href: '/customers',
      actionText: '+ Add Customer',
    },
    {
      id: 'vend',
      label: 'Add your vendors & suppliers',
      completed: state.vendors.length > 0,
      href: '/vendors',
      actionText: '+ Add Vendor',
    },
    {
      id: 'prod',
      label: 'Add products or inventory items',
      completed: state.products.length > 0,
      href: '/products',
      actionText: '+ Add Product',
    },
    {
      id: 'ai',
      label: 'Ask Dhanvi AI a financial question',
      completed: false,
      href: '/assistant',
      actionText: 'Ask Dhanvi',
    },
  ];

  const completedCount = checklist.filter((c) => c.completed).length;

  const handlePostTransaction = (tx: any) => {
    postNewTransaction(state, tx);
    showToast('Transaction Posted', 'Transaction and balanced double-entry lines recorded.');
    setIsAddTxOpen(false);
  };

  const handleAskAI = (question: string) => {
    if (!question.trim()) return;
    router.push(`/assistant?q=${encodeURIComponent(question.trim())}`);
  };

  const quickPrompts = [
    'How is my business performing?',
    'Who owes me money?',
    'What are my top expenses?',
    'Compare this month vs last month',
  ];

  return (
    <div className="space-y-7 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-16">
      {/* 1. Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {greetingTime}, {firstName}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <span className="font-medium text-foreground">{bizName}</span>
            <span>·</span>
            <span>Here&apos;s what&apos;s happening in your business today.</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground shadow-2xs">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-positive" />
            <span className="text-foreground">{bs.isBalanced ? 'General Ledger Balanced' : 'Ledger Active'}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddTxOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-positive" />}
            className="border-positive/60 text-positive bg-card hover:bg-positive/[0.06] font-semibold rounded-full px-4 shadow-xs"
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* 2. Hero Live Financial Overview (Matching Screenshot 1 & 2) */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-2 -z-10 rounded-[24px] bg-gradient-to-b from-positive/10 to-info/5 blur-xl"
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]">
          {/* Window Chrome Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-positive" />
              Live · General Ledger Synchronized
            </span>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            {/* 6 KPI Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* REVENUE */}
              <div className="flex flex-col justify-between rounded-xl border border-positive/25 bg-positive/[0.06] p-4 transition-all">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Revenue (MTD)
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={pnl.revenue.totalRevenue}
                    size="xl"
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                  {hasTransactions && (
                    <span className="mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold text-positive">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* EXPENSES */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Expenses
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={pnl.operatingExpenses.totalOperatingExpenses + pnl.costOfGoodsSold.totalCOGS}
                    size="xl"
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                  {hasTransactions && (
                    <span className="mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold text-neutral-500">
                      Billed
                    </span>
                  )}
                </div>
              </div>

              {/* NET PROFIT */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Net Profit
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={pnl.netProfit}
                    size="xl"
                    colored={true}
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                  {hasTransactions && (
                    <span className="mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold text-positive">
                      {pnl.netMarginPercentage}%
                    </span>
                  )}
                </div>
              </div>

              {/* CASH BALANCE */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Cash & Bank
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={bs.assets.currentAssets.cashAndBank}
                    size="xl"
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                </div>
              </div>

              {/* RECEIVABLES */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Receivables
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={bs.assets.currentAssets.accountsReceivable}
                    size="xl"
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                </div>
              </div>

              {/* PAYABLES */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Payables
                </span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <MoneyDisplay
                    amount={bs.liabilities.currentLiabilities.accountsPayable}
                    size="xl"
                    className="tabular text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                  />
                </div>
              </div>
            </div>

            {/* AI Insight Panel (Matching Screenshot 1 & 2) */}
            <div className="rounded-xl border border-info/25 bg-info/[0.05] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-info/15 text-info">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Dhanvi noticed something
                  </span>
                </div>
                <Link
                  href="/insights"
                  className="text-xs font-semibold text-info hover:underline flex items-center gap-1"
                >
                  All signals <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {topInsight ? (
                <>
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning/10 p-2.5">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{topInsight.title}</span> — {topInsight.description}
                    </p>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Why it matters
                      </p>
                      <p className="mt-1 text-sm text-foreground leading-relaxed">
                        Calculated from real General Ledger entries for {bizName}.
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Lightbulb className="h-3 w-3" /> Recommended action
                      </p>
                      <p className="mt-1 text-sm text-foreground leading-relaxed">
                        {topInsight.recommendation}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-card border border-border p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Continuous AI monitoring is active. As transactions and invoices are posted, Dhanvi will automatically highlight margin shifts, working capital trends, and cost-saving opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Setup Checklist & Quick Actions Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Setup Checklist */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-positive/10 text-positive text-[10px] font-bold tracking-wide uppercase">
                      Get Started
                    </span>
                    <CardTitle className="text-base">Financial Setup Checklist</CardTitle>
                  </div>
                  <CardDescription>
                    Complete these initial actions to start tracking cash flow, profit margins, and financial activity ({completedCount}/5).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2.5 pt-4">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    item.completed
                      ? 'bg-positive/[0.04] border-positive/30 text-foreground'
                      : 'bg-card border-border text-foreground hover:border-foreground/20'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-positive shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`text-xs font-medium truncate ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="text-xs font-semibold text-positive hover:text-emerald-700 bg-positive/10 px-2.5 py-1 rounded-full transition-colors shrink-0 cursor-pointer"
                    >
                      {item.actionText}
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-positive hover:text-emerald-700 bg-positive/10 px-2.5 py-1 rounded-full transition-colors shrink-0"
                    >
                      {item.actionText}
                    </Link>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Card */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Instant access to daily business operations</CardDescription>
            </CardHeader>
            <CardContent className="p-3 space-y-1.5">
              <button
                onClick={() => setIsAddTxOpen(true)}
                className="w-full p-3 rounded-xl hover:bg-positive/[0.04] border border-transparent hover:border-positive/20 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-positive/10 text-positive group-hover:bg-positive/20 transition-colors">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Add Transaction</p>
                    <p className="text-[11px] text-muted-foreground">Record sale, expense, purchase, or transfer</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-positive group-hover:translate-x-0.5 transition-all" />
              </button>

              <Link
                href="/customers"
                className="w-full p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-muted/80 transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Add Customer</p>
                    <p className="text-[11px] text-muted-foreground">Manage clients, invoices, and receivables</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/vendors"
                className="w-full p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-muted/80 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Add Vendor</p>
                    <p className="text-[11px] text-muted-foreground">Track bills, supplier ledgers, and payables</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/products"
                className="w-full p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-muted/80 transition-colors">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Add Product</p>
                    <p className="text-[11px] text-muted-foreground">Inventory items, SKU, cost, and stock valuation</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Recent Ledger Transactions Table & Cash Flow MTD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Ledger Transactions */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border">
              <div>
                <CardTitle className="text-base">Recent Ledger Transactions</CardTitle>
                <CardDescription>Real-time journal entries posted to General Ledger</CardDescription>
              </div>
              {hasTransactions && (
                <Link
                  href="/transactions"
                  className="text-xs text-positive font-semibold hover:underline flex items-center gap-1"
                >
                  View all ({state.transactions.length}) <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </CardHeader>

            <CardContent className="p-0">
              {!hasTransactions ? (
                <div className="py-12 px-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center mx-auto">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">No transactions yet</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
                      Add your first transaction to start building your live financial picture and General Ledger.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAddTxOpen(true)}
                    leftIcon={<Plus className="w-3.5 h-3.5 text-positive" />}
                    className="border-positive/60 text-positive bg-card hover:bg-positive/[0.06] font-semibold rounded-full shadow-xs"
                  >
                    + Add Transaction
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {recentTxs.map((tx) => {
                        const isIncome = tx.type === 'SALE' || tx.type === 'PAYMENT_RECEIVED';
                        return (
                          <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4 font-mono text-muted-foreground">{formatDate(tx.date)}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={isIncome ? 'success' : 'neutral'}
                                size="sm"
                              >
                                {tx.type.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 font-semibold text-foreground max-w-[200px] truncate">
                              {tx.description}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{tx.category}</td>
                            <td className="py-3 px-4 text-right">
                              <MoneyDisplay
                                amount={tx.amount}
                                size="md"
                                colored={true}
                                className={isIncome ? 'text-positive font-bold' : 'text-foreground font-bold'}
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-positive bg-positive/10 px-2 py-0.5 rounded-full">
                                <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                                POSTED
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Summary & Financial Reports Link */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
              <div>
                <CardTitle className="text-base">Cash Flow (MTD)</CardTitle>
                <CardDescription>Inflows vs. Outflows</CardDescription>
              </div>
              <Link href="/reports/cash-flow" className="text-xs text-positive font-semibold hover:underline">
                View statement
              </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Cash Inflows</span>
                <MoneyDisplay
                  amount={pnl.revenue.totalRevenue}
                  size="sm"
                  className="font-mono font-bold text-positive"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Cash Outflows</span>
                <MoneyDisplay
                  amount={pnl.operatingExpenses.totalOperatingExpenses + pnl.costOfGoodsSold.totalCOGS}
                  size="sm"
                  className="font-mono font-bold text-rose-600"
                />
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-bold">
                <span className="text-foreground">Net Cash Movement</span>
                <MoneyDisplay
                  amount={pnl.netProfit}
                  size="sm"
                  colored={true}
                  className="font-mono font-bold text-positive"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-muted/20 border-dashed">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-card border border-border text-positive shrink-0">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Need official statements?</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Export GAAP-compliant Balance Sheet, Profit & Loss, and Trial Balance anytime.
                </p>
                <Link
                  href="/reports"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-positive hover:underline mt-2"
                >
                  Open Financial Reports <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        accounts={state.accounts}
        customers={state.customers}
        vendors={state.vendors}
        onPostTransaction={handlePostTransaction}
      />
    </div>
  );
}
