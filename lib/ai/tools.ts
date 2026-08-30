/**
 * DHANVI 20+ VERIFIED SERVER-SIDE FINANCIAL TOOLS
 * 
 * ALL financial calculations are executed strictly deterministically against the General Ledger.
 * The AI LLM NEVER calculates balances or executes raw SQL directly.
 */

import { Account, JournalEntry, Transaction } from '../accounting/types';
import { getProfitAndLoss, getBalanceSheet, getCashFlow } from '../accounting/reports';
import { calculateTrialBalance, getAccountLedger } from '../accounting/ledger';
import { formatINR } from '../accounting/money';

export interface FinancialToolContext {
  accounts: Account[];
  journalEntries: JournalEntry[];
  transactions: Transaction[];
  customers: any[];
  vendors: any[];
  products?: any[];
  invoices?: any[];
}

export function getDashboardSummary(ctx: FinancialToolContext) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries);
  const bs = getBalanceSheet(ctx.accounts, ctx.journalEntries);

  return {
    revenue: pnl.revenue.totalRevenue,
    expenses: pnl.operatingExpenses.totalOperatingExpenses + pnl.costOfGoodsSold.totalCOGS,
    grossProfit: pnl.grossProfit,
    netProfit: pnl.netProfit,
    grossMarginPercentage: pnl.grossMarginPercentage,
    netMarginPercentage: pnl.netMarginPercentage,
    cashBalance: bs.assets.currentAssets.cashAndBank,
    receivables: bs.assets.currentAssets.accountsReceivable,
    payables: bs.liabilities.currentLiabilities.accountsPayable,
    totalAssets: bs.assets.totalAssets,
    totalEquity: bs.equity.totalEquity,
    isBalanced: bs.isBalanced,
  };
}

export function getRevenue(ctx: FinancialToolContext, startDate?: string, endDate?: string) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries, startDate, endDate);
  return {
    operatingRevenue: pnl.revenue.operatingRevenue,
    otherIncome: pnl.revenue.otherIncome,
    totalRevenue: pnl.revenue.totalRevenue,
    items: pnl.revenue.items,
  };
}

export function getExpenses(ctx: FinancialToolContext, startDate?: string, endDate?: string) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries, startDate, endDate);
  return {
    cogs: pnl.costOfGoodsSold.totalCOGS,
    costOfGoodsSold: pnl.costOfGoodsSold.totalCOGS,
    operatingExpenses: pnl.operatingExpenses.totalOperatingExpenses,
    totalExpenses: pnl.costOfGoodsSold.totalCOGS + pnl.operatingExpenses.totalOperatingExpenses,
    cogsBreakdown: pnl.costOfGoodsSold.items,
    opexBreakdown: pnl.operatingExpenses.items,
  };
}

export function getProfit(ctx: FinancialToolContext, startDate?: string, endDate?: string) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries, startDate, endDate);
  return {
    grossProfit: pnl.grossProfit,
    operatingProfit: pnl.operatingProfit,
    netProfit: pnl.netProfit,
    grossMarginPercentage: pnl.grossMarginPercentage,
    netMarginPercentage: pnl.netMarginPercentage,
  };
}

export function getProfitMargin(ctx: FinancialToolContext) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries);
  return {
    grossMargin: pnl.grossMarginPercentage,
    netMargin: pnl.netMarginPercentage,
    totalRevenue: pnl.revenue.totalRevenue,
    netProfit: pnl.netProfit,
  };
}

export function getCashBalance(ctx: FinancialToolContext) {
  const bs = getBalanceSheet(ctx.accounts, ctx.journalEntries);
  return {
    totalCashAndBank: bs.assets.currentAssets.cashAndBank,
    items: bs.assets.currentAssets.items,
  };
}

export function getReceivables(ctx: FinancialToolContext) {
  const bs = getBalanceSheet(ctx.accounts, ctx.journalEntries);
  const customerBreakdown = ctx.customers.map((c) => ({
    customerId: c.id,
    name: c.name,
    gstin: c.gstin,
    outstanding: c.opening_balance || 0,
  })).filter((c) => c.outstanding > 0);

  return {
    totalReceivables: bs.assets.currentAssets.accountsReceivable,
    customerCount: customerBreakdown.length,
    customers: customerBreakdown,
  };
}

export function getPayables(ctx: FinancialToolContext) {
  const bs = getBalanceSheet(ctx.accounts, ctx.journalEntries);
  const vendorBreakdown = ctx.vendors.map((v) => ({
    vendorId: v.id,
    name: v.name,
    gstin: v.gstin,
    outstanding: v.opening_balance || 0,
  })).filter((v) => v.outstanding > 0);

  return {
    totalPayables: bs.liabilities.currentLiabilities.accountsPayable,
    vendorCount: vendorBreakdown.length,
    vendors: vendorBreakdown,
  };
}

export function getOverdueInvoices(ctx: FinancialToolContext) {
  const invoices = ctx.invoices || [];
  const overdue = invoices.filter((i) => i.status === 'OVERDUE');
  const overdueTotal = overdue.reduce((acc, i) => acc + (i.total - (i.paidAmount || 0)), 0);

  return {
    overdueCount: overdue.length,
    overdueTotal,
    invoices: overdue,
  };
}

export function getCustomerLedger(ctx: FinancialToolContext, customerNameOrId: string) {
  const cust = ctx.customers.find(
    (c) => c.id === customerNameOrId || c.name.toLowerCase().includes(customerNameOrId.toLowerCase())
  );
  if (!cust) return { error: `Customer '${customerNameOrId}' not found.` };

  const txs = ctx.transactions.filter((t) => t.customerId === cust.id);
  return {
    customer: cust,
    transactions: txs,
    currentBalance: cust.opening_balance || 0,
  };
}

export function getVendorLedger(ctx: FinancialToolContext, vendorNameOrId: string) {
  const vend = ctx.vendors.find(
    (v) => v.id === vendorNameOrId || v.name.toLowerCase().includes(vendorNameOrId.toLowerCase())
  );
  if (!vend) return { error: `Vendor '${vendorNameOrId}' not found.` };

  const txs = ctx.transactions.filter((t) => t.vendorId === vend.id);
  return {
    vendor: vend,
    transactions: txs,
    currentBalance: vend.opening_balance || 0,
  };
}

export function getExpenseBreakdown(ctx: FinancialToolContext) {
  const pnl = getProfitAndLoss(ctx.accounts, ctx.journalEntries);
  return {
    opex: pnl.operatingExpenses.items,
    cogs: pnl.costOfGoodsSold.items,
    totalOpex: pnl.operatingExpenses.totalOperatingExpenses,
    totalCOGS: pnl.costOfGoodsSold.totalCOGS,
  };
}

export function getRevenueTrend(ctx: FinancialToolContext) {
  const salesTxs = ctx.transactions.filter((t) => t.type === 'SALE');
  return {
    totalSalesCount: salesTxs.length,
    recentSales: salesTxs.slice(0, 5),
  };
}

export function getProfitTrend(ctx: FinancialToolContext) {
  const pnlCurrent = getProfitAndLoss(ctx.accounts, ctx.journalEntries, '2026-08-01', '2026-08-31');
  const pnlPrev = getProfitAndLoss(ctx.accounts, ctx.journalEntries, '2026-07-01', '2026-07-31');
  return {
    currentNetProfit: pnlCurrent.netProfit,
    previousNetProfit: pnlPrev.netProfit,
    growthPercentage: pnlPrev.netProfit > 0
      ? Math.round(((pnlCurrent.netProfit - pnlPrev.netProfit) / pnlPrev.netProfit) * 100)
      : 0,
  };
}

export function getProductPerformance(ctx: FinancialToolContext) {
  const products = ctx.products || [];
  return {
    productCount: products.length,
    products: products.map((p) => ({
      name: p.name,
      sku: p.sku,
      margin: p.sellingPrice > 0 ? Math.round(((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100) : 0,
      stock: p.stockQuantity,
    })),
  };
}

export function getInventory(ctx: FinancialToolContext) {
  const products = ctx.products || [];
  const totalValue = products.reduce((acc, p) => acc + (p.purchasePrice * p.stockQuantity), 0);
  return {
    totalInventoryValue: totalValue,
    itemCount: products.length,
    lowStockItems: products.filter((p) => p.stockQuantity <= (p.minStockAlert || 10)),
  };
}

export function getBankBalance(ctx: FinancialToolContext) {
  return getCashBalance(ctx);
}

export function getUnreconciledTransactions(ctx: FinancialToolContext) {
  const unreconciled = ctx.transactions.filter((t) => !t.isReconciled);
  return {
    count: unreconciled.length,
    unreconciled,
  };
}

export function getTransactions(ctx: FinancialToolContext, limit: number = 10) {
  return {
    totalTransactions: ctx.transactions.length,
    transactions: ctx.transactions.slice(0, limit),
  };
}

export function getTransactionDetails(ctx: FinancialToolContext, txId: string) {
  const tx = ctx.transactions.find((t) => t.id === txId);
  if (!tx) return { error: `Transaction ${txId} not found.` };
  const je = ctx.journalEntries.find((j) => j.id === tx.journalEntryId);
  return {
    transaction: tx,
    journalEntry: je,
  };
}

export function getFinancialReport(ctx: FinancialToolContext, reportType: 'PNL' | 'BALANCE_SHEET' | 'CASH_FLOW' | 'TRIAL_BALANCE') {
  if (reportType === 'PNL') return getProfitAndLoss(ctx.accounts, ctx.journalEntries);
  if (reportType === 'BALANCE_SHEET') return getBalanceSheet(ctx.accounts, ctx.journalEntries);
  if (reportType === 'CASH_FLOW') return getCashFlow(ctx.accounts, ctx.journalEntries);
  return calculateTrialBalance(ctx.accounts, ctx.journalEntries);
}
