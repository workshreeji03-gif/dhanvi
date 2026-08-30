import { describe, it, expect } from 'vitest';
import { buildCompleteDemoLedger } from '../lib/demo-data/sharma-wholesale';
import { getRevenue, getExpenses, getProfit, getCashBalance, getReceivables, getFinancialRatios } from '../lib/ai/tools';
import { processFinancialQuestion } from '../lib/ai/assistant';
import { generateProactiveInsights } from '../lib/ai/insights';
import { categorizeTransaction } from '../lib/ai/categorization';
import { validateExtractedInvoice } from '../lib/ai/invoice-extraction';

describe('DHANVI AI Layer & Deterministic Tools', () => {
  const demo = buildCompleteDemoLedger();
  const ctx = {
    accounts: demo.accounts,
    journalEntries: demo.journalEntries,
    transactions: demo.transactions,
    customers: demo.customers,
    vendors: demo.vendors,
  };

  it('determines revenue from posted ledger lines', () => {
    const rev = getRevenue(ctx, '2026-08-01', '2026-08-31');
    expect(rev.totalRevenue).toBeGreaterThan(0);
    expect(rev.operatingRevenue).toBeGreaterThan(0);
  });

  it('determines expenses accurately', () => {
    const exp = getExpenses(ctx, '2026-08-01', '2026-08-31');
    expect(exp.totalExpenses).toBeGreaterThan(0);
    expect(exp.costOfGoodsSold).toBeGreaterThan(0);
    expect(exp.operatingExpenses).toBeGreaterThan(0);
  });

  it('answers financial queries with verified citations and numbers', () => {
    const res = processFinancialQuestion('How much did we spend this month?', ctx, '2026-08-31');
    expect(res.keyMetric?.label).toContain('Total Expenses');
    expect(res.toolsUsed).toContain('getExpenses');
    expect(res.message).toMatch(/₹/);
  });

  it('categorizes transactions with confidence scoring', () => {
    const cat1 = categorizeTransaction('BESCOM monthly electricity bill for building', 12000);
    expect(cat1.category).toBe('Electricity & Utilities');
    expect(cat1.accountCode).toBe('5040');
    expect(cat1.requiresReview).toBe(false);

    const cat2 = categorizeTransaction('Random UPI transfer 9845012345', 5000);
    expect(cat2.requiresReview).toBe(true);
  });

  it('generates proactive insights and 5-pillar health score', () => {
    const { insights, health } = generateProactiveInsights(
      demo.business.id,
      demo.accounts,
      demo.journalEntries,
      demo.transactions,
      '2026-08-31'
    );
    expect(insights.length).toBeGreaterThan(0);
    expect(health.overallScore).toBeGreaterThanOrEqual(0);
    expect(health.overallScore).toBeLessThanOrEqual(100);
    expect(health.pillars.profitability.score).toBeGreaterThan(0);
  });

  it('validates untrusted OCR invoice data and flags math errors', () => {
    const validInvoice = validateExtractedInvoice({
      invoiceNumber: 'INV-101',
      invoiceDate: '2026-08-15',
      dueDate: '2026-08-30',
      items: [{ description: 'USB-C Cable Pack', quantity: 10, unitPrice: 500, taxRate: 18, taxAmount: 900, totalAmount: 5900 }],
      subtotal: 5000,
      cgst: 450,
      sgst: 450,
      igst: 0,
      taxTotal: 900,
      total: 5900,
      confidenceScore: 95,
      validationErrors: [],
      isSanityValid: false,
    });
    expect(validInvoice.isSanityValid).toBe(true);

    const badInvoice = validateExtractedInvoice({
      invoiceNumber: 'INV-102',
      invoiceDate: '2026-08-15',
      dueDate: '2026-08-30',
      items: [{ description: 'USB-C Cable Pack', quantity: 10, unitPrice: 500, taxRate: 18, taxAmount: 900, totalAmount: 5900 }],
      subtotal: 5000,
      cgst: 200, // Discrepancy!
      sgst: 200,
      igst: 0,
      taxTotal: 900,
      total: 5900,
      confidenceScore: 70,
      validationErrors: [],
      isSanityValid: false,
    });
    expect(badInvoice.isSanityValid).toBe(false);
    expect(badInvoice.validationErrors.length).toBeGreaterThan(0);
  });
});
