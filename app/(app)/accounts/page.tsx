'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Eye, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, addNewAccount } from '../../../lib/supabase/demo-store';
import { getAccountLedger } from '../../../lib/accounting/ledger';
import { Account, AccountType } from '../../../lib/accounting/types';
import { formatINR } from '../../../lib/accounting/money';
import { formatDate } from '../../../lib/utils/formatters';

export default function AccountsPage() {
  const { state } = useDhanviState();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  // Add Account Modal
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [accCode, setAccCode] = useState('');
  const [accName, setAccName] = useState('');
  const [accType, setAccType] = useState<AccountType>('EXPENSE');
  const [accDesc, setAccDesc] = useState('');

  // View Account Ledger Modal
  const [inspectingAccount, setInspectingAccount] = useState<Account | null>(null);

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Chart of Accounts...</div>;

  const filteredAccounts = state.accounts.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.includes(search) ||
      (a.subType && a.subType.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'ALL' || a.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accCode.trim() || !accName.trim()) return;

    try {
      addNewAccount(state, {
        code: accCode.trim(),
        name: accName.trim(),
        type: accType,
        description: accDesc,
      });

      showToast('Account Created', `Account ${accCode} - ${accName} added to Chart of Accounts.`);
      setIsAddAccountOpen(false);
      setAccCode('');
      setAccName('');
      setAccDesc('');
    } catch (err: any) {
      showToast('Creation Failed', err.message, 'error');
    }
  };

  const inspectingLedger = inspectingAccount
    ? getAccountLedger(inspectingAccount, state.journalEntries)
    : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Chart of Accounts & General Ledger
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Standard GAAP/Indian AS classification tree with real-time balance calculations
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsAddAccountOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
          className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
          variant="outline"
        >
          Add General Account
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, account name, or subtype..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none text-neutral-700"
          >
            <option value="ALL">All Account Classes</option>
            <option value="ASSET">Assets (1000s)</option>
            <option value="LIABILITY">Liabilities (2000s)</option>
            <option value="EQUITY">Equity (3000s)</option>
            <option value="REVENUE">Revenue (4000s)</option>
            <option value="EXPENSE">Expenses & COGS (5000s)</option>
          </select>
        </div>
      </Card>

      {/* Accounts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Account Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Sub-Category</th>
                <th className="py-3 px-4 text-right">Debit Balance (₹)</th>
                <th className="py-3 px-4 text-right">Credit Balance (₹)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredAccounts.map((acc) => {
                const ledger = getAccountLedger(acc, state.journalEntries);
                const isDebitNature = acc.type === 'ASSET' || acc.type === 'EXPENSE';
                const bal = ledger.closingBalance;

                return (
                  <tr key={acc.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-neutral-700">{acc.code}</td>
                    <td className="py-3 px-4 font-semibold text-neutral-900">{acc.name}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          acc.type === 'ASSET'
                            ? 'info'
                            : acc.type === 'LIABILITY'
                            ? 'warning'
                            : acc.type === 'REVENUE'
                            ? 'success'
                            : acc.type === 'EXPENSE'
                            ? 'danger'
                            : 'purple'
                        }
                        size="sm"
                      >
                        {acc.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-neutral-500">{acc.subType || 'General'}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-neutral-900">
                      {isDebitNature && bal > 0 ? formatINR(bal) : '—'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-neutral-900">
                      {!isDebitNature && bal > 0 ? formatINR(bal) : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setInspectingAccount(acc)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        className="text-xs text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 font-semibold"
                      >
                        View Ledger
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CREATE ACCOUNT MODAL */}
      <Modal
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        title="Add General Ledger Account"
        description="Establish new account code in chart of accounts."
      >
        <form onSubmit={handleCreateAccount} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Account Code *</label>
              <input
                type="text"
                required
                value={accCode}
                onChange={(e) => setAccCode(e.target.value)}
                placeholder="e.g. 5250"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Account Classification *</label>
              <select
                value={accType}
                onChange={(e) => setAccType(e.target.value as AccountType)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              >
                <option value="ASSET">Asset</option>
                <option value="LIABILITY">Liability</option>
                <option value="EQUITY">Equity</option>
                <option value="REVENUE">Revenue</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Account Title / Name *</label>
            <input
              type="text"
              required
              value={accName}
              onChange={(e) => setAccName(e.target.value)}
              placeholder="e.g. Software & Subscriptions"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Description / Subtype</label>
            <input
              type="text"
              value={accDesc}
              onChange={(e) => setAccDesc(e.target.value)}
              placeholder="e.g. Monthly SaaS tools and cloud hosting"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsAddAccountOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Save Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* INSPECT ACCOUNT LEDGER MODAL */}
      <Modal
        isOpen={!!inspectingAccount}
        onClose={() => setInspectingAccount(null)}
        title={inspectingAccount ? `Ledger: ${inspectingAccount.code} - ${inspectingAccount.name}` : ''}
        description={inspectingAccount ? `Classification: ${inspectingAccount.type} (${inspectingAccount.subType || 'General'})` : ''}
        maxWidth="2xl"
      >
        {inspectingLedger && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-emerald-800">Current Computed Balance</p>
                <p className="text-xl font-bold font-mono text-emerald-950 mt-0.5">
                  {formatINR(inspectingLedger.closingBalance)}
                </p>
              </div>
              <Badge variant="success" size="sm">BALANCED</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Memo</th>
                    <th className="py-2.5 px-3 text-right">Debit (₹)</th>
                    <th className="py-2.5 px-3 text-right">Credit (₹)</th>
                    <th className="py-2.5 px-3 text-right">Balance (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {inspectingLedger.entries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-neutral-400 font-mono">
                        No journal entries posted to this account yet.
                      </td>
                    </tr>
                  ) : (
                    inspectingLedger.entries.map((e, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/60">
                        <td className="py-2 px-3 font-mono text-neutral-500">{formatDate(e.date)}</td>
                        <td className="py-2 px-3 font-semibold text-neutral-900">{e.description}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">
                          {e.debit > 0 ? formatINR(e.debit) : '—'}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">
                          {e.credit > 0 ? formatINR(e.credit) : '—'}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                          {formatINR(e.runningBalance)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
