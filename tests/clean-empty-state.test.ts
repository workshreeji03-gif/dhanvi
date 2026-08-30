import { describe, it, expect } from 'vitest';
import { createCleanAppState, postNewTransaction, addNewCustomer } from '../lib/supabase/demo-store';
import { getProfitAndLoss, getBalanceSheet } from '../lib/accounting/reports';
import { calculateTrialBalance } from '../lib/accounting/ledger';
import { processFinancialQuestion } from '../lib/ai/assistant';

describe('Clean Real User Workspace Architecture', () => {
  it('initializes a completely clean workspace for a new user with standard Indian Chart of Accounts', () => {
    const cleanState = createCleanAppState('Patel Electronics', 'Shreeji Patel', 'shreeji@patelelectronics.in');
    
    expect(cleanState.business.name).toBe('Patel Electronics');
    expect(cleanState.members[0].name).toBe('Shreeji Patel');
    expect(cleanState.members[0].email).toBe('shreeji@patelelectronics.in');
    expect(cleanState.transactions.length).toBe(0);
    expect(cleanState.customers.length).toBe(0);
    expect(cleanState.vendors.length).toBe(0);
    expect(cleanState.products.length).toBe(0);
    expect(cleanState.invoices.length).toBe(0);
    expect(cleanState.accounts.length).toBeGreaterThanOrEqual(15);
  });

  it('calculates clean zero financial statements with balanced double-entry invariants', () => {
    const cleanState = createCleanAppState('Patel Electronics', 'Shreeji Patel');
    const pnl = getProfitAndLoss(cleanState.accounts, cleanState.journalEntries, '2026-08-01', '2026-08-31');
    const bs = getBalanceSheet(cleanState.accounts, cleanState.journalEntries);
    const tb = calculateTrialBalance(cleanState.accounts, cleanState.journalEntries);

    expect(pnl.revenue.totalRevenue).toBe(0);
    expect(pnl.operatingExpenses.totalOperatingExpenses).toBe(0);
    expect(pnl.netProfit).toBe(0);
    expect(bs.assets.totalAssets).toBe(0);
    expect(bs.isBalanced).toBe(true);
    expect(tb.isBalanced).toBe(true);
    expect(tb.totalDebits).toBe(0);
    expect(tb.totalCredits).toBe(0);
  });

  it('provides honest AI responses when no financial transactions exist (no fabricated data)', () => {
    const cleanState = createCleanAppState('Patel Electronics', 'Shreeji Patel');
    const ctx = {
      accounts: cleanState.accounts,
      journalEntries: cleanState.journalEntries,
      transactions: cleanState.transactions,
      customers: cleanState.customers,
      vendors: cleanState.vendors,
      products: cleanState.products,
      invoices: cleanState.invoices,
    };

    const expenseAnswer = processFinancialQuestion('How much did I spend this month?', ctx);
    expect(expenseAnswer.message).toContain('don’t have any recorded expenses');
    expect(expenseAnswer.keyMetric?.value).toBe('₹0.00');

    const receivablesAnswer = processFinancialQuestion('Who owes me money?', ctx);
    expect(receivablesAnswer.message).toContain('no outstanding customer receivables');

    const summaryAnswer = processFinancialQuestion('Give me a financial summary', ctx);
    expect(summaryAnswer.message).toContain('Welcome to Dhanvi');
  });

  it('records real transaction and updates General Ledger with balanced journal lines', () => {
    let state = createCleanAppState('Patel Electronics', 'Shreeji Patel');

    // Add a customer
    state = addNewCustomer(state, {
      name: 'Mehta Traders',
      phone: '+91 98200 12345',
      openingBalance: 0,
    });
    expect(state.customers.length).toBe(1);
    expect(state.customers[0].name).toBe('Mehta Traders');

    // Post a Sale Transaction of ₹50,000 (inclusive of 18% GST)
    const { newState } = postNewTransaction(state, {
      amount: 50000,
      date: '2026-08-30',
      type: 'SALE',
      category: 'Sales Revenue',
      paymentMethod: 'BANK_TRANSFER',
      description: 'Sale of electrical accessories to Mehta Traders',
      customerId: state.customers[0].id,
    });

    expect(newState.transactions.length).toBe(1);
    expect(newState.journalEntries.length).toBe(1);

    // Verify financial statement updates
    const pnl = getProfitAndLoss(newState.accounts, newState.journalEntries, '2026-08-01', '2026-08-31');
    const bs = getBalanceSheet(newState.accounts, newState.journalEntries);

    // Base Revenue (Net of 18% GST output liability)
    expect(pnl.revenue.totalRevenue).toBe(42373);
    expect(pnl.netProfit).toBe(42373);
    // Cash received in Bank Account 1020
    expect(bs.assets.currentAssets.cashAndBank).toBe(50000);
    // GST Output Liability in Account 2020
    expect(bs.liabilities.currentLiabilities.taxPayable).toBe(7627);
    expect(bs.isBalanced).toBe(true);
  });
});
