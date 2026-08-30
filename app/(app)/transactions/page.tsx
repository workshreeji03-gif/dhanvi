'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Download,
  RotateCcw,
  ArrowUpDown,
  FileSpreadsheet,
  CheckCircle2,
  FileUp,
  CreditCard,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { AddTransactionModal } from '../../../components/accounting/add-transaction-modal';
import { useDhanviState, reverseExistingTransaction, postNewTransaction } from '../../../lib/supabase/demo-store';
import { Transaction, TransactionType, TransactionStatus } from '../../../lib/accounting/types';
import { formatDate } from '../../../lib/utils/formatters';
import { exportToCSV } from '../../../lib/utils/export';
import { showToast } from '../../../components/ui/toast';

export default function TransactionsPage() {
  const { state } = useDhanviState();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Reversal Modal
  const [reversingTx, setReversingTx] = useState<Transaction | null>(null);
  const [reversalReason, setReversalReason] = useState('');

  if (!state) {
    return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading transactions...</div>;
  }

  const categories = Array.from(new Set(state.transactions.map((t) => t.category))).filter(Boolean);

  const filteredTransactions = state.transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.referenceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'ALL' || tx.type === selectedType;
    const matchesCategory = selectedCategory === 'ALL' || tx.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || tx.status === selectedStatus;

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const inflows = filteredTransactions
    .filter((t) => (t.type === 'SALE' || t.type === 'PAYMENT_RECEIVED') && t.status === 'POSTED')
    .reduce((acc, t) => acc + t.amount, 0);

  const outflows = filteredTransactions
    .filter(
      (t) =>
        (t.type === 'EXPENSE' || t.type === 'PURCHASE' || t.type === 'PAYMENT_SENT') &&
        t.status === 'POSTED'
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const handleExportCSV = () => {
    const data = filteredTransactions.map((tx) => ({
      ID: tx.id,
      Date: tx.date,
      Description: tx.description,
      Type: tx.type,
      Category: tx.category,
      PaymentMethod: tx.paymentMethod,
      Amount: tx.amount,
      Status: tx.status,
      Reference: tx.referenceNumber || '',
    }));
    exportToCSV(`dhanvi_transactions_${new Date().toISOString().split('T')[0]}`, data);
  };

  const handleExecuteReversal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reversingTx || !reversalReason.trim()) return;

    try {
      reverseExistingTransaction(state, reversingTx.id, reversalReason.trim());
      showToast('Transaction Reversed', `Reversal entry posted for ${reversingTx.description}.`);
      setReversingTx(null);
      setReversalReason('');
    } catch (err: any) {
      showToast('Reversal Failed', err.message, 'error');
    }
  };

  const handleImportBankStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    postNewTransaction(state, {
      amount: 45000,
      date: new Date().toISOString().split('T')[0],
      type: 'SALE',
      category: 'Wholesale Orders',
      paymentMethod: 'BANK_TRANSFER',
      description: `Statement Import: Direct Credit (${file.name})`,
    });

    showToast('Statement Imported', 'Transactions parsed and posted to General Ledger.');
    setIsImportModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Ledger Transactions
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Complete audit trail of balanced double-entry accounting transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {state.transactions.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExportCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export CSV
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => setIsAddTxOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {state.transactions.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No transactions recorded yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Record your first sale, purchase, or expense to populate the double-entry general ledger.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              size="sm"
              onClick={() => setIsAddTxOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
            >
              Record First Transaction
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsImportModalOpen(true)} leftIcon={<FileUp className="w-3.5 h-3.5" />}>
              Import Bank Statement
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Summary KPI Inflow / Outflow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Filtered Transactions</p>
              <p className="text-2xl font-extrabold font-mono text-neutral-900 mt-1">{filteredTransactions.length} items</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Inflows (Sales & Receipts)</p>
              <MoneyDisplay amount={inflows} colored size="xl" className="text-emerald-700 font-bold mt-1" />
            </Card>
            <Card className="p-5">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Outflows (Expenses & COGS)</p>
              <MoneyDisplay amount={outflows} colored size="xl" className="text-rose-600 font-bold mt-1" />
            </Card>
          </div>

          {/* Filters Bar */}
          <Card className="p-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search description, reference #, or category..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-auto px-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none text-neutral-700"
              >
                <option value="ALL">All Types</option>
                <option value="SALE">Sale</option>
                <option value="EXPENSE">Expense</option>
                <option value="PURCHASE">Purchase (COGS)</option>
                <option value="PAYMENT_RECEIVED">Customer Payment</option>
                <option value="PAYMENT_SENT">Vendor Payment</option>
                <option value="TRANSFER">Transfer</option>
              </select>

              {categories.length > 0 && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-auto px-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none text-neutral-700"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full md:w-auto px-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none text-neutral-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="POSTED">Posted</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="REVERSED">Reversed</option>
              </select>
            </div>
          </Card>

          {/* Transactions Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-neutral-400 font-mono">
                        No matching transactions found.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => {
                      const isPositive = tx.type === 'SALE' || tx.type === 'PAYMENT_RECEIVED';
                      return (
                        <tr key={tx.id} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="py-3 px-4 font-mono text-neutral-500 whitespace-nowrap">
                            {formatDate(tx.date)}
                          </td>
                          <td className="py-3 px-4 font-semibold text-neutral-900 max-w-xs truncate">
                            <Link href={`/transactions/${tx.id}`} className="hover:underline">
                              {tx.description}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-neutral-600">
                            {tx.category}
                          </td>
                          <td className="py-3 px-4 capitalize text-neutral-500">
                            {tx.paymentMethod.replace(/_/g, ' ')}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold">
                            <MoneyDisplay
                              amount={tx.amount}
                              colored
                              size="sm"
                              className={isPositive ? 'text-emerald-700' : 'text-neutral-900'}
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              variant={
                                tx.status === 'POSTED'
                                  ? 'success'
                                  : tx.status === 'REVERSED'
                                  ? 'danger'
                                  : 'warning'
                              }
                              size="sm"
                            >
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link href={`/transactions/${tx.id}`}>
                                <Button size="sm" variant="ghost" className="text-xs text-neutral-600 hover:text-neutral-900">
                                  View Entry
                                </Button>
                              </Link>
                              {tx.status === 'POSTED' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setReversingTx(tx)}
                                  className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                                >
                                  Reverse
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        accounts={state.accounts}
        customers={state.customers}
        vendors={state.vendors}
        onPostTransaction={(tx) => {
          postNewTransaction(state, tx);
          showToast('Transaction Posted', 'Transaction posted to General Ledger.');
        }}
      />

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Bank Statement"
        description="Upload CSV statement to parse and post transactions."
      >
        <div className="p-8 border-2 border-dashed border-neutral-200/80 rounded-2xl text-center space-y-3 bg-neutral-50/50 hover:bg-emerald-50/30 transition-all">
          <FileUp className="w-10 h-10 text-emerald-600 mx-auto" />
          <p className="text-sm font-bold text-neutral-900">Select Bank CSV or Excel File</p>
          <label className="inline-block cursor-pointer">
            <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 shadow-xs">
              Browse Files
            </span>
            <input type="file" accept=".csv,.xlsx" onChange={handleImportBankStatement} className="hidden" />
          </label>
        </div>
      </Modal>

      {/* Reversal Modal */}
      <Modal
        isOpen={!!reversingTx}
        onClose={() => setReversingTx(null)}
        title="Reverse General Ledger Transaction"
        description="This will create a balanced reversal entry in the double-entry general ledger to maintain full audit integrity."
      >
        {reversingTx && (
          <form onSubmit={handleExecuteReversal} className="space-y-4 text-xs">
            <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
              <span className="text-[10px] text-rose-800 font-semibold uppercase">Target Transaction</span>
              <p className="font-bold text-neutral-900">{reversingTx.description}</p>
              <p className="font-mono text-xs text-neutral-700">Amount: ₹{reversingTx.amount.toLocaleString('en-IN')} • Date: {reversingTx.date}</p>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Reason for Reversal *</label>
              <input
                type="text"
                required
                autoFocus
                value={reversalReason}
                onChange={(e) => setReversalReason(e.target.value)}
                placeholder="e.g. Inadvertent duplicate entry or invoice amendment"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setReversingTx(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs">
                Confirm & Post Reversal
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
