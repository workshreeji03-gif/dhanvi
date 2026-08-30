import { describe, it, expect } from 'vitest';
import { roundMoney, addMoney, subtractMoney, formatINR, formatCompactINR } from '../lib/accounting/money';
import { STANDARD_CHART_OF_ACCOUNTS } from '../lib/accounting/accounts';
import { validateJournalLines } from '../lib/accounting/validation';
import { createJournalEntry, createReversalEntry } from '../lib/accounting/journal';
import { generateJournalLinesForTransaction } from '../lib/accounting/transactions';
import { calculateTrialBalance } from '../lib/accounting/ledger';
import { getProfitAndLoss, getBalanceSheet, getCashFlow } from '../lib/accounting/reports';
import { Account, JournalEntry } from '../lib/accounting/types';

// Setup Mock Chart of Accounts with unique IDs
const businessId = 'biz-sharma-wholesale';
const mockAccounts: Account[] = STANDARD_CHART_OF_ACCOUNTS.map((acc, index) => ({
  ...acc,
  id: `acc-${acc.code}`,
  businessId,
}));

describe('DHANVI Deterministic Accounting Engine', () => {
  describe('1. Money Arithmetic & INR Formatting', () => {
    it('rounds money deterministically to 2 decimal places', () => {
      expect(roundMoney(123.456)).toBe(123.46);
      expect(roundMoney(0.1 + 0.2)).toBe(0.3);
      expect(addMoney(10.155, 20.244)).toBe(30.4);
      expect(subtractMoney(100.5, 30.25)).toBe(70.25);
    });

    it('formats Indian numbering system properly', () => {
      expect(formatINR(125000, { showDecimals: false })).toBe('₹1,25,000');
      expect(formatINR(125000.5)).toBe('₹1,25,000.50');
      expect(formatINR(10000000, { showDecimals: false })).toBe('₹1,00,00,000');
      expect(formatCompactINR(150000)).toBe('₹1.50L');
      expect(formatCompactINR(25000000)).toBe('₹2.50Cr');
    });
  });

  describe('2. Double-Entry Validation & Invariant Enforcement', () => {
    it('approves a balanced journal entry', () => {
      const result = validateJournalLines([
        { accountId: 'acc-1010', debit: 10000, credit: 0 },
        { accountId: 'acc-4010', debit: 0, credit: 10000 },
      ]);
      expect(result.isValid).toBe(true);
      expect(result.discrepancy).toBe(0);
      expect(result.totalDebits).toBe(10000);
      expect(result.totalCredits).toBe(10000);
    });

    it('rejects an unbalanced journal entry', () => {
      const result = validateJournalLines([
        { accountId: 'acc-1010', debit: 10000, credit: 0 },
        { accountId: 'acc-4010', debit: 0, credit: 9500 },
      ]);
      expect(result.isValid).toBe(false);
      expect(result.discrepancy).toBe(500);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects single-legged or empty lines', () => {
      const result = validateJournalLines([{ accountId: 'acc-1010', debit: 1000, credit: 0 }]);
      expect(result.isValid).toBe(false);
    });
  });

  describe('3. Journal Creation & Immutable Reversals', () => {
    it('creates a posted journal entry with auto-generated entry number', () => {
      const entry = createJournalEntry({
        businessId,
        entryDate: '2026-08-15',
        description: 'Cash sale of goods',
        sourceType: 'TRANSACTION',
        lines: [
          { accountId: 'acc-1010', debit: 25000, credit: 0 },
          { accountId: 'acc-4010', debit: 0, credit: 25000 },
        ],
      });

      expect(entry.status).toBe('POSTED');
      expect(entry.entryNumber).toMatch(/^JE-20260815-/);
      expect(entry.lines.length).toBe(2);
    });

    it('creates an exact reversing journal entry', () => {
      const original = createJournalEntry({
        businessId,
        entryDate: '2026-08-15',
        description: 'Office supplies purchase',
        sourceType: 'TRANSACTION',
        lines: [
          { accountId: 'acc-5040', debit: 5000, credit: 0 },
          { accountId: 'acc-1020', debit: 0, credit: 5000 },
        ],
      });

      const reversal = createReversalEntry(original, 'Duplicate entry entered by mistake');

      expect(reversal.sourceType).toBe('REVERSAL');
      expect(reversal.reversalOfId).toBe(original.id);
      expect(reversal.lines[0].debit).toBe(0);
      expect(reversal.lines[0].credit).toBe(5000);
      expect(reversal.lines[1].debit).toBe(5000);
      expect(reversal.lines[1].credit).toBe(0);
    });
  });

  describe('4. Transaction Posting Rules', () => {
    it('generates double-entry for Cash Sale', () => {
      const lines = generateJournalLinesForTransaction({
        businessId,
        type: 'SALE',
        amount: 50000,
        taxAmount: 9000, // 18% GST included
        paymentMethod: 'CASH',
        description: 'Retail cash sale',
        accounts: mockAccounts,
      });

      expect(lines.length).toBe(3);
      expect(lines.find((l) => l.accountCode === '1010')?.debit).toBe(50000); // Cash
      expect(lines.find((l) => l.accountCode === '4010')?.credit).toBe(41000); // Sales
      expect(lines.find((l) => l.accountCode === '2020')?.credit).toBe(9000); // GST Output
    });

    it('generates double-entry for Operational Expense', () => {
      const lines = generateJournalLinesForTransaction({
        businessId,
        type: 'EXPENSE',
        amount: 15000,
        paymentMethod: 'BANK_TRANSFER',
        description: 'Office Internet & Utilities',
        accounts: mockAccounts,
        customAccountId: 'acc-5040',
      });

      expect(lines.length).toBe(2);
      expect(lines.find((l) => l.accountCode === '5040')?.debit).toBe(15000);
      expect(lines.find((l) => l.accountCode === '1020')?.credit).toBe(15000);
    });
  });

  describe('5. Ledger, Trial Balance & Reports Invariants', () => {
    it('ensures Assets = Liabilities + Equity on Balance Sheet', () => {
      const entries: JournalEntry[] = [
        // 1. Owner injects capital ₹5,00,000 into Bank
        createJournalEntry({
          businessId,
          entryDate: '2026-08-01',
          description: 'Owner initial capital',
          sourceType: 'MANUAL',
          lines: [
            { accountId: 'acc-1020', debit: 500000, credit: 0 },
            { accountId: 'acc-3010', debit: 0, credit: 500000 },
          ],
        }),
        // 2. Sales Revenue ₹1,00,000 received in Bank
        createJournalEntry({
          businessId,
          entryDate: '2026-08-05',
          description: 'Wholesale sales',
          sourceType: 'TRANSACTION',
          lines: [
            { accountId: 'acc-1020', debit: 100000, credit: 0 },
            { accountId: 'acc-4010', debit: 0, credit: 100000 },
          ],
        }),
        // 3. Purchase of Inventory / COGS ₹40,000 paid from Bank
        createJournalEntry({
          businessId,
          entryDate: '2026-08-08',
          description: 'Inventory purchase',
          sourceType: 'TRANSACTION',
          lines: [
            { accountId: 'acc-5010', debit: 40000, credit: 0 },
            { accountId: 'acc-1020', debit: 0, credit: 40000 },
          ],
        }),
        // 4. Rent Expense ₹20,000 paid from Bank
        createJournalEntry({
          businessId,
          entryDate: '2026-08-10',
          description: 'Warehouse rent',
          sourceType: 'TRANSACTION',
          lines: [
            { accountId: 'acc-5030', debit: 20000, credit: 0 },
            { accountId: 'acc-1020', debit: 0, credit: 20000 },
          ],
        }),
      ];

      // Test Trial Balance
      const trialBalance = calculateTrialBalance(mockAccounts, entries);
      expect(trialBalance.isBalanced).toBe(true);
      expect(trialBalance.totalDebits).toBe(trialBalance.totalCredits);

      // Test Profit and Loss
      const pnl = getProfitAndLoss(mockAccounts, entries, '2026-08-01', '2026-08-31');
      expect(pnl.revenue.totalRevenue).toBe(100000);
      expect(pnl.costOfGoodsSold.totalCOGS).toBe(40000);
      expect(pnl.grossProfit).toBe(60000);
      expect(pnl.operatingExpenses.totalOperatingExpenses).toBe(20000);
      expect(pnl.netProfit).toBe(40000);

      // Test Balance Sheet
      const bs = getBalanceSheet(mockAccounts, entries, '2026-08-31');
      expect(bs.assets.totalAssets).toBe(540000); // 500k + 100k - 40k - 20k
      expect(bs.liabilities.totalLiabilities).toBe(0);
      expect(bs.equity.totalEquity).toBe(540000); // 500k capital + 40k retained profit
      expect(bs.isBalanced).toBe(true);
      expect(bs.discrepancy).toBe(0);
    });
  });
});
