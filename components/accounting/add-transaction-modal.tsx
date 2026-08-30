'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Account, PaymentMethod, TransactionType } from '../../lib/accounting/types';
import { generateJournalLinesForTransaction } from '../../lib/accounting/transactions';
import { validateJournalLines } from '../../lib/accounting/validation';
import { formatINR } from '../../lib/accounting/money';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  customers?: any[];
  vendors?: any[];
  onPostTransaction: (tx: {
    amount: number;
    date: string;
    type: TransactionType;
    category: string;
    paymentMethod: PaymentMethod;
    description: string;
    customAccountId?: string;
    customerId?: string;
    vendorId?: string;
  }) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  accounts,
  customers = [],
  vendors = [],
  onPostTransaction,
}) => {
  const [type, setType] = useState<TransactionType>('SALE');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [customAccountId, setCustomAccountId] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');
  const [vendorId, setVendorId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseFloat(amount) || 0;

  // Live Double-Entry Preview Generation
  let previewLines: any[] = [];
  let validationResult: any = { isValid: false, errors: [] };

  if (numAmount > 0 && accounts.length > 0) {
    try {
      previewLines = generateJournalLinesForTransaction({
        businessId: accounts[0]?.businessId || 'biz_01',
        amount: numAmount,
        type,
        paymentMethod,
        description: description.trim() || `${type} transaction`,
        accounts,
        customAccountId: customAccountId || undefined,
      });

      validationResult = validateJournalLines(previewLines);
    } catch (e: any) {
      validationResult = { isValid: false, errors: [e.message] };
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return;

    setIsSubmitting(true);
    try {
      onPostTransaction({
        amount: numAmount,
        date,
        type,
        category: category || (type === 'SALE' ? 'Sales Revenue' : 'Operating Expense'),
        paymentMethod,
        description: description.trim() || `${type.replace('_', ' ')}: ${formatINR(numAmount)}`,
        customAccountId: customAccountId || undefined,
        customerId: customerId || undefined,
        vendorId: vendorId || undefined,
      });

      // Reset form fields
      setAmount('');
      setDescription('');
      setCategory('');
      setCustomerId('');
      setVendorId('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const transactionTypes: { type: TransactionType; label: string; desc: string }[] = [
    { type: 'SALE', label: 'Sale (Revenue)', desc: 'Goods or services sold to customer' },
    { type: 'EXPENSE', label: 'Expense', desc: 'Rent, utility, operational costs' },
    { type: 'PURCHASE', label: 'Purchase (COGS)', desc: 'Inventory/raw materials from vendor' },
    { type: 'PAYMENT_RECEIVED', label: 'Payment Received', desc: 'Settlement of debtor invoice' },
    { type: 'PAYMENT_SENT', label: 'Payment Made', desc: 'Settlement of creditor bill' },
    { type: 'TRANSFER', label: 'Transfer', desc: 'Between bank and cash accounts' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Transaction"
      description="Post a transaction directly to the balanced double-entry General Ledger."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs text-neutral-800">
        {/* Transaction Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-2">
            Transaction Classification *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {transactionTypes.map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => setType(t.type)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  type === t.type
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs'
                    : 'border-neutral-200/80 bg-white hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="font-semibold text-xs leading-tight">{t.label}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Amount (INR ₹) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              autoFocus
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
              placeholder="e.g. 25000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Transaction Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
            />
          </div>
        </div>

        {/* Payment Method & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Payment Method / Asset Account
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
            >
              <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS / IMPS)</option>
              <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
              <option value="CASH">Cash on Hand</option>
              <option value="CARD">Debit / Credit Card</option>
              <option value="CHEQUE">Cheque / Demand Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Category / Purpose
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={type === 'SALE' ? 'e.g. Retail Sales' : 'e.g. Office Supplies'}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Memo / Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Invoice #1024 payment received or packaging supplies purchase"
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
          />
        </div>

        {/* Dynamic Double-Entry Live Journal Preview */}
        {numAmount > 0 && (
          <div className="p-3.5 bg-neutral-50/80 border border-neutral-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Live General Ledger Preview
              </span>
              {validationResult.isValid ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Balanced (Σ Debits = Σ Credits)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  <AlertTriangle className="w-3 h-3 text-rose-600" />
                  Unbalanced Entry
                </span>
              )}
            </div>

            <div className="space-y-1.5 pt-1">
              {previewLines.map((line, idx) => {
                const acc = accounts.find((a) => a.id === line.accountId);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-400">
                        {acc?.code || 'ACCT'}
                      </span>
                      <span className="font-medium text-neutral-800">
                        {acc?.name || 'Account'}
                      </span>
                    </div>
                    <div className="font-mono font-semibold">
                      {line.debit > 0 ? (
                        <span className="text-emerald-700">Dr {formatINR(line.debit)}</span>
                      ) : (
                        <span className="text-neutral-700">Cr {formatINR(line.credit)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={numAmount <= 0 || (numAmount > 0 && !validationResult.isValid)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Post to General Ledger
          </Button>
        </div>
      </form>
    </Modal>
  );
};
