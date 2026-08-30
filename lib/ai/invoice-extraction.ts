/**
 * DHANVI UNTRUSTED OCR EXTRACTION & TAX SANITY VALIDATOR
 * 
 * OCR extractions are treated as UNTRUSTED until reviewed and verified by a human.
 */

import { roundMoney, addMoney, subtractMoney } from '../accounting/money';

export interface ExtractedInvoiceItem {
  id?: string;
  description: string;
  hsnSac?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // 5%, 12%, 18%, 28%
  taxAmount: number;
  totalAmount: number;
}

export interface ExtractedInvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  vendorName?: string;
  customerName?: string;
  gstin?: string;
  items: ExtractedInvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  taxTotal: number;
  total: number;
  confidenceScore: number; // 0 to 100
  validationErrors: string[];
  isSanityValid: boolean;
}

export function validateExtractedInvoice(data: ExtractedInvoiceData): ExtractedInvoiceData {
  const errors: string[] = [];

  if (!data.invoiceNumber || data.invoiceNumber.trim() === '') {
    errors.push('Invoice number is missing or could not be detected.');
  }

  if (!data.invoiceDate) {
    errors.push('Invoice date is missing.');
  }

  // Calculate sum of items
  let calculatedSubtotal = 0;
  for (const item of data.items) {
    const itemTotal = roundMoney(item.quantity * item.unitPrice);
    calculatedSubtotal = addMoney(calculatedSubtotal, itemTotal);
  }

  if (Math.abs(calculatedSubtotal - data.subtotal) > 1.0) {
    errors.push(`Subtotal discrepancy: Line items sum to ₹${calculatedSubtotal.toFixed(2)}, but header shows ₹${data.subtotal.toFixed(2)}.`);
  }

  // GST Math Sanity: CGST + SGST + IGST === Tax Total
  const calculatedTaxes = addMoney(data.cgst, data.sgst, data.igst);
  if (Math.abs(calculatedTaxes - data.taxTotal) > 0.5) {
    errors.push(`GST breakdown discrepancy: CGST+SGST+IGST (₹${calculatedTaxes.toFixed(2)}) doesn't match total tax (₹${data.taxTotal.toFixed(2)}).`);
  }

  // Total Sanity: Subtotal + Tax Total === Grand Total
  const calculatedGrandTotal = addMoney(data.subtotal, data.taxTotal);
  if (Math.abs(calculatedGrandTotal - data.total) > 0.5) {
    errors.push(`Grand total discrepancy: Subtotal + Tax (₹${calculatedGrandTotal.toFixed(2)}) doesn't match Grand Total (₹${data.total.toFixed(2)}).`);
  }

  return {
    ...data,
    validationErrors: errors,
    isSanityValid: errors.length === 0,
  };
}
