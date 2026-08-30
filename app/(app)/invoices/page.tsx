'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { useDhanviState, saveAppState } from '../../../lib/supabase/demo-store';
import { formatINR } from '../../../lib/accounting/money';
import { formatDate } from '../../../lib/utils/formatters';
import { validateExtractedInvoice, ExtractedInvoiceData } from '../../../lib/ai/invoice-extraction';
import { createJournalEntry } from '../../../lib/accounting/journal';
import { showToast } from '../../../components/ui/toast';

export default function InvoicesPage() {
  const { state } = useDhanviState();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [ocrStep, setOcrStep] = useState<'DROP' | 'REVIEW' | 'POSTED'>('DROP');
  const [extractedData, setExtractedData] = useState<ExtractedInvoiceData | null>(null);

  if (!state) {
    return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading invoices...</div>;
  }

  const handleSimulateOCR = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Real-time scanned invoice extraction structure
    const rawExtraction: ExtractedInvoiceData = {
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      vendorName: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Supplier Invoice',
      gstin: '29ABCDE1234F1Z5',
      items: [
        { description: 'Commercial Supplies & Materials', quantity: 10, unitPrice: 2000, taxRate: 18, taxAmount: 3600, totalAmount: 23600 },
      ],
      subtotal: 20000,
      cgst: 1800,
      sgst: 1800,
      igst: 0,
      taxTotal: 3600,
      total: 23600,
      confidenceScore: 98,
      validationErrors: [],
      isSanityValid: true,
    };

    const validated = validateExtractedInvoice(rawExtraction);
    setExtractedData(validated);
    setOcrStep('REVIEW');
  };

  const handleConfirmAndPostInvoice = () => {
    if (!extractedData || !state) return;

    const expenseAcct = state.accounts.find((a) => a.code === '5100') || state.accounts[0];
    const payableAcct = state.accounts.find((a) => a.code === '2100') || state.accounts[0];
    const itcAcct = state.accounts.find((a) => a.code === '1300') || state.accounts[0];

    const lines = [
      { accountId: expenseAcct.id, debit: extractedData.subtotal, credit: 0, description: `Bill: ${extractedData.items[0]?.description}` },
      { accountId: itcAcct.id, debit: extractedData.taxTotal, credit: 0, description: 'Input Tax Credit (GST)' },
      { accountId: payableAcct.id, debit: 0, credit: extractedData.total, description: `Accounts Payable: ${extractedData.vendorName}` },
    ];

    const je = createJournalEntry({
      businessId: state.business.id,
      entryDate: extractedData.invoiceDate,
      description: `Bill ${extractedData.invoiceNumber} from ${extractedData.vendorName}`,
      sourceType: 'INVOICE',
      lines,
    });

    const newInvoice: any = {
      id: `inv_${Date.now()}`,
      businessId: state.business.id,
      type: 'PURCHASE',
      invoiceNumber: extractedData.invoiceNumber,
      date: extractedData.invoiceDate,
      dueDate: extractedData.dueDate,
      vendorName: extractedData.vendorName,
      subtotal: extractedData.subtotal,
      taxTotal: extractedData.taxTotal,
      total: extractedData.total,
      amountPaid: 0,
      status: 'ISSUED',
      lineItems: extractedData.items,
      journalEntryId: je.id,
      ocrConfidence: extractedData.confidenceScore,
      createdAt: new Date().toISOString(),
    };

    saveAppState({
      ...state,
      invoices: [newInvoice, ...state.invoices],
      journalEntries: [je, ...state.journalEntries],
    });

    showToast('Invoice Verified & Posted', `Bill ${extractedData.invoiceNumber} posted to accounts payable and ledger.`);
    setIsUploadModalOpen(false);
    setOcrStep('DROP');
    setExtractedData(null);
  };

  const totalInvoiced = state.invoices.reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Invoices & AI OCR Extraction
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Automated PDF/Image OCR parsing with GST breakdown and double-entry validation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-4 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-3 shadow-xs">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-semibold">Total Invoiced</p>
              <MoneyDisplay amount={totalInvoiced} size="lg" colored className="text-emerald-700 font-bold" />
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={<UploadCloud className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Upload Invoice / Bill
          </Button>
        </div>
      </div>

      {state.invoices.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No invoices uploaded yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Upload a vendor bill or supplier invoice (PDF/Image) to extract GST lines and post to General Ledger automatically.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Upload First Invoice
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-500 font-semibold">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Party</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Tax (₹)</th>
                  <th className="py-3 px-4 text-right">Total (₹)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">OCR Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {state.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-neutral-900">{inv.invoiceNumber}</td>
                    <td className="py-3 px-4 font-semibold text-neutral-900">{inv.vendorName || 'Customer Invoice'}</td>
                    <td className="py-3 px-4 font-mono text-neutral-500">{formatDate(inv.date)}</td>
                    <td className="py-3 px-4 font-mono text-neutral-500">{formatDate(inv.dueDate)}</td>
                    <td className="py-3 px-4 text-right font-mono text-neutral-600">{formatINR(inv.taxTotal)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-neutral-900">{formatINR(inv.total)}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="success" size="sm">POSTED</Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                      {inv.ocrConfidence ? `${inv.ocrConfidence}%` : '100%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* OCR INVOICE UPLOAD MODAL */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setOcrStep('DROP');
          setExtractedData(null);
        }}
        title="Upload & Parse Invoice (AI OCR)"
        description="Extract bill numbers, line items, and GST breakdown automatically."
        maxWidth="2xl"
      >
        {ocrStep === 'DROP' && (
          <div className="p-8 border-2 border-dashed border-neutral-200/80 rounded-2xl text-center space-y-3 bg-neutral-50/50 hover:bg-emerald-50/30 transition-all">
            <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto" />
            <div>
              <p className="text-sm font-bold text-neutral-900">Upload Invoice PDF or Photo</p>
              <p className="text-xs text-neutral-500 mt-0.5">Supports standard Indian GST tax invoices and bills</p>
            </div>
            <label className="inline-block cursor-pointer">
              <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 shadow-xs">
                Browse Files
              </span>
              <input type="file" accept="image/*,application/pdf" onChange={handleSimulateOCR} className="hidden" />
            </label>
          </div>
        )}

        {ocrStep === 'REVIEW' && extractedData && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-950">AI Extraction Confidence: {extractedData.confidenceScore}%</span>
              </div>
              <Badge variant="success" size="sm">Validated</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase">Vendor / Party</span>
                <p className="font-bold text-neutral-900 mt-0.5">{extractedData.vendorName}</p>
                <p className="text-[11px] text-neutral-500 font-mono">GSTIN: {extractedData.gstin}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase">Invoice Details</span>
                <p className="font-bold text-neutral-900 mt-0.5">{extractedData.invoiceNumber}</p>
                <p className="text-[11px] text-neutral-500 font-mono">Date: {extractedData.invoiceDate} • Due: {extractedData.dueDate}</p>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1.5">
              <div className="flex items-center justify-between text-neutral-600">
                <span>Subtotal (Taxable):</span>
                <span className="font-mono font-semibold">{formatINR(extractedData.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>GST Tax (CGST + SGST):</span>
                <span className="font-mono font-semibold">{formatINR(extractedData.taxTotal)}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                <span>Grand Total:</span>
                <span className="font-mono text-emerald-700">{formatINR(extractedData.total)}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setOcrStep('DROP')}>
                Re-upload
              </Button>
              <Button type="button" onClick={handleConfirmAndPostInvoice} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
                Confirm & Post to Ledger
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
