'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Download, Phone, Mail, MapPin, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { MoneyDisplay } from '../../../../components/ui/money-display';
import { Modal } from '../../../../components/ui/modal';
import { showToast } from '../../../../components/ui/toast';
import { useDhanviState, postNewTransaction } from '../../../../lib/supabase/demo-store';
import { formatINR } from '../../../../lib/accounting/money';
import { formatDate } from '../../../../lib/utils/formatters';
import { exportToCSV } from '../../../../lib/utils/export';

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const { state } = useDhanviState();

  const [activeTab, setActiveTab] = useState<'ALL' | 'INVOICES' | 'PAYMENTS'>('ALL');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'BANK_TRANSFER' | 'UPI' | 'CHEQUE' | 'CASH'>('BANK_TRANSFER');
  const [paymentRef, setPaymentRef] = useState('');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Customer Statement...</div>;

  const customer = state.customers.find((c) => c.id === customerId);
  if (!customer) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-neutral-900">Customer not found.</p>
        <Link href="/customers">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Customers</Button>
        </Link>
      </div>
    );
  }

  // Sourced from real state transactions & invoices
  const customerTransactions = state.transactions.filter((t) => t.customerId === customerId);

  // Compute Chronological Ledger Entries
  let runningBal = 0;
  const ledgerEntries = customerTransactions.map((tx) => {
    const isDebit = tx.type === 'SALE';
    const isCredit = tx.type === 'PAYMENT_RECEIVED';
    const debit = isDebit ? tx.amount : 0;
    const credit = isCredit ? tx.amount : 0;
    runningBal += (debit - credit);

    return {
      id: tx.id,
      date: tx.date,
      reference: tx.referenceNumber || `TX-${tx.id.slice(-4)}`,
      description: tx.description,
      type: tx.type,
      debit,
      credit,
      runningBalance: runningBal,
      status: tx.status,
    };
  });

  const totalSales = ledgerEntries.reduce((acc, l) => acc + l.debit, 0);
  const totalPayments = ledgerEntries.reduce((acc, l) => acc + l.credit, 0);
  const currentOutstanding = customer.opening_balance || 0;

  const filteredEntries = ledgerEntries.filter((l) => {
    if (activeTab === 'INVOICES') return l.debit > 0;
    if (activeTab === 'PAYMENTS') return l.credit > 0;
    return true;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(paymentAmount);
    if (!amt || amt <= 0) return;

    postNewTransaction(state, {
      amount: amt,
      date: paymentDate,
      type: 'PAYMENT_RECEIVED',
      category: 'Customer Payment',
      paymentMethod,
      description: `Payment received from ${customer.name}${paymentRef ? ` (Ref: ${paymentRef})` : ''}`,
      customerId: customer.id,
    });

    showToast('Payment Recorded', `Received ${formatINR(amt)} from ${customer.name}.`);
    setIsRecordPaymentOpen(false);
    setPaymentAmount('');
    setPaymentRef('');
  };

  const handleExportStatement = () => {
    const data = ledgerEntries.map((l) => ({
      Date: l.date,
      Reference: l.reference,
      Description: l.description,
      'Debit (Sales)': l.debit,
      'Credit (Receipts)': l.credit,
      'Running Balance': l.runningBalance,
      Status: l.status,
    }));
    exportToCSV(`Statement_${customer.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`, data);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/customers">
            <Button size="icon" variant="outline" className="w-8 h-8 rounded-xl text-neutral-500">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">{customer.name}</h1>
              <Badge variant={currentOutstanding > 0 ? 'warning' : 'success'}>
                {currentOutstanding > 0 ? 'Payment Due' : 'Zero Balance'}
              </Badge>
            </div>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              GSTIN: {customer.gstin || 'Unregistered'} • ID: {customer.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ledgerEntries.length > 0 && (
            <Button size="sm" variant="outline" onClick={handleExportStatement} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Statement
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => setIsRecordPaymentOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Record Payment
          </Button>
        </div>
      </div>

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Current Outstanding</p>
          <MoneyDisplay amount={currentOutstanding} size="xl" colored className="text-emerald-700 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Sales Invoiced</p>
          <MoneyDisplay amount={totalSales} size="xl" className="text-neutral-900 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Payments Collected</p>
          <MoneyDisplay amount={totalPayments} size="xl" className="text-emerald-600 font-bold mt-1" />
        </Card>
      </div>

      {/* Customer Contact & Meta Details */}
      <Card className="p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-neutral-400" />
            <span>{customer.phone || 'No phone recorded'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>{customer.email || 'No email recorded'}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span>{customer.address?.city || customer.address?.state ? `${customer.address.city}, ${customer.address.state}` : 'Location unrecorded'}</span>
          </div>
        </div>
      </Card>

      {/* Customer Ledger Statement */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100">
          <div>
            <CardTitle className="text-base">Customer Ledger Statement</CardTitle>
            <CardDescription>Running balance of invoices issued and payments received</CardDescription>
          </div>

          <div className="flex items-center gap-1 bg-neutral-100/80 p-1 rounded-xl text-xs">
            {(['ALL', 'INVOICES', 'PAYMENTS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredEntries.length === 0 ? (
            <div className="py-12 px-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-neutral-900">No transactions recorded for this customer</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Record a sale or payment to start generating the chronological ledger statement.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4 text-right">Debit (₹)</th>
                    <th className="py-3 px-4 text-right">Credit (₹)</th>
                    <th className="py-3 px-4 text-right">Balance (₹)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono text-neutral-500">{formatDate(entry.date)}</td>
                      <td className="py-3 px-4 font-mono text-neutral-600">{entry.reference}</td>
                      <td className="py-3 px-4 font-semibold text-neutral-900">{entry.description}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-neutral-900">
                        {entry.debit > 0 ? formatINR(entry.debit) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                        {entry.credit > 0 ? formatINR(entry.credit) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-neutral-900">
                        {formatINR(entry.runningBalance)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          POSTED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        title={`Record Payment from ${customer.name}`}
        description="Post customer payment to accounts receivable and debit liquid cash/bank."
      >
        <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Payment Amount (INR ₹) *</label>
            <input
              type="number"
              step="0.01"
              required
              autoFocus
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 font-mono font-bold text-sm bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Date Received</label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Payment Mode</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              >
                <option value="BANK_TRANSFER">Bank Transfer (NEFT/RTGS)</option>
                <option value="UPI">UPI / QR Code</option>
                <option value="CHEQUE">Cheque</option>
                <option value="CASH">Cash</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Reference / UTR / Cheque #</label>
            <input
              type="text"
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value)}
              placeholder="e.g. UTR-987654321"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsRecordPaymentOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Confirm & Post Receipt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
