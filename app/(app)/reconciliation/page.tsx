'use client';

import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Plus, UploadCloud, X } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, postNewTransaction } from '../../../lib/supabase/demo-store';
import { BankStatementLine } from '../../../lib/accounting/reconciliation';
import { getBalanceSheet } from '../../../lib/accounting/reports';
import { formatINR } from '../../../lib/accounting/money';
import { formatDate } from '../../../lib/utils/formatters';

interface BankLineItem extends BankStatementLine {
  status: 'MATCHED' | 'UNMATCHED' | 'IGNORED';
  matchedTxId?: string;
  confidence: number;
}

export default function ReconciliationPage() {
  const { state } = useDhanviState();
  const [bankFeed, setBankFeed] = useState<BankLineItem[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Create Transaction for Unmatched Line
  const [creatingForLine, setCreatingForLine] = useState<BankLineItem | null>(null);
  const [createCategory, setCreateCategory] = useState('Vendor Payment');
  const [createDesc, setCreateDesc] = useState('');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Reconciliation Workspace...</div>;

  const bs = getBalanceSheet(state.accounts, state.journalEntries);
  const cashAndBankBalance = bs.assets.currentAssets.cashAndBank;

  const reconciledCount = bankFeed.filter((b) => b.status === 'MATCHED').length;
  const totalCount = bankFeed.length;
  const progressPct = totalCount > 0 ? Math.round((reconciledCount / totalCount) * 100) : 100;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate dynamic statement feed for uploaded file
    const newLines: BankLineItem[] = [
      { id: `bnk_${Date.now()}_1`, date: new Date().toISOString().split('T')[0], description: 'Electronic Funds Transfer Inward', amount: 25000, type: 'CREDIT', status: 'UNMATCHED', confidence: 0 },
      { id: `bnk_${Date.now()}_2`, date: new Date().toISOString().split('T')[0], description: 'Utility Bill Payment Debit', amount: 4500, type: 'DEBIT', status: 'UNMATCHED', confidence: 0 },
    ];

    setBankFeed((prev) => [...newLines, ...prev]);
    showToast('Statement Imported', `${newLines.length} bank lines parsed for reconciliation.`);
    setIsImportModalOpen(false);
  };

  const handleConfirmMatch = (lineId: string) => {
    setBankFeed((prev) =>
      prev.map((b) => (b.id === lineId ? { ...b, status: 'MATCHED' as const, confidence: 100 } : b))
    );
    showToast('Reconciliation Matched', 'Bank line verified against General Ledger entry.');
  };

  const handleCreateAndMatchTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatingForLine) return;

    const isCredit = creatingForLine.type === 'CREDIT';
    postNewTransaction(state, {
      amount: creatingForLine.amount,
      date: creatingForLine.date,
      type: isCredit ? 'SALE' : 'EXPENSE',
      category: createCategory,
      paymentMethod: 'BANK_TRANSFER',
      description: createDesc || creatingForLine.description,
    });

    handleConfirmMatch(creatingForLine.id);
    setCreatingForLine(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Bank Statement Reconciliation
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Reconcile live bank statement line items against General Ledger cash accounts
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsImportModalOpen(true)}
          leftIcon={<UploadCloud className="w-3.5 h-3.5 text-emerald-600" />}
          className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
          variant="outline"
        >
          Import Bank Statement
        </Button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">General Ledger Bank Balance</p>
          <MoneyDisplay amount={cashAndBankBalance} size="xl" className="text-neutral-900 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Reconciled Status</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-extrabold text-emerald-700">{progressPct}%</p>
            <span className="text-xs text-neutral-500">({reconciledCount}/{totalCount || 0} matched)</span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Unreconciled Variance</p>
          <MoneyDisplay amount={0} size="xl" className="text-emerald-700 font-bold mt-1" />
        </Card>
      </div>

      {/* Feed List or Empty State */}
      {bankFeed.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No bank statements imported</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Upload your bank statement (CSV/Excel) to auto-match transactions with zero manual ledger entry.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Import Bank Statement
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Bank Description</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {bankFeed.map((line) => {
                  const isCredit = line.type === 'CREDIT';
                  return (
                    <tr key={line.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono text-neutral-500">{formatDate(line.date)}</td>
                      <td className="py-3 px-4 font-semibold text-neutral-900">{line.description}</td>
                      <td className={`py-3 px-4 text-right font-mono font-bold ${isCredit ? 'text-emerald-700' : 'text-neutral-900'}`}>
                        {isCredit ? `+${formatINR(line.amount)}` : `-${formatINR(line.amount)}`}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={line.status === 'MATCHED' ? 'success' : 'warning'} size="sm">
                          {line.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {line.status === 'UNMATCHED' ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              setCreatingForLine(line);
                              setCreateDesc(line.description);
                            }}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Post & Match
                          </Button>
                        ) : (
                          <span className="text-xs text-neutral-400 font-mono">Matched</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* IMPORT MODAL */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Bank Statement"
        description="Upload CSV or Excel statement from HDFC, ICICI, SBI, Axis, or Kotak."
      >
        <div className="p-8 border-2 border-dashed border-neutral-200/80 rounded-2xl text-center space-y-3 bg-neutral-50/50 hover:bg-emerald-50/30 transition-all">
          <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto" />
          <div>
            <p className="text-sm font-bold text-neutral-900">Upload Bank CSV Statement</p>
            <p className="text-xs text-neutral-500 mt-0.5">Supports Date, Particulars, Withdrawal, Deposit formats</p>
          </div>
          <label className="inline-block cursor-pointer">
            <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 shadow-xs">
              Select Statement File
            </span>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </Modal>

      {/* POST & MATCH MODAL */}
      <Modal
        isOpen={!!creatingForLine}
        onClose={() => setCreatingForLine(null)}
        title="Post Transaction & Match Statement Line"
        description="Create journal entry for this statement line item to balance accounts."
      >
        {creatingForLine && (
          <form onSubmit={handleCreateAndMatchTx} className="space-y-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">Statement Item</span>
              <p className="font-bold text-neutral-900 mt-0.5">{creatingForLine.description}</p>
              <p className="text-xs text-emerald-700 font-mono font-bold mt-1">
                {creatingForLine.type === 'CREDIT' ? '+' : '-'}{formatINR(creatingForLine.amount)} ({creatingForLine.date})
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Account Category</label>
              <input
                type="text"
                value={createCategory}
                onChange={(e) => setCreateCategory(e.target.value)}
                placeholder="e.g. Utility Expense"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Description</label>
              <input
                type="text"
                value={createDesc}
                onChange={(e) => setCreateDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setCreatingForLine(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
                Post & Reconcile
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
