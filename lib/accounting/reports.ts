/**
 * DHANVI DETERMINISTIC FINANCIAL STATEMENTS ENGINE
 * Generates official financial reports strictly from the General Ledger.
 * 
 * Reports:
 * 1. Profit & Loss (Income Statement)
 * 2. Balance Sheet (Assets = Liabilities + Equity)
 * 3. Cash Flow Statement (Direct / Indirect methods)
 */

import { Account, BalanceSheetReport, CashFlowReport, JournalEntry, ProfitAndLossReport } from './types';
import { roundMoney, addMoney, subtractMoney } from './money';

/**
 * Calculates Profit & Loss statement for a specified date range.
 */
export function getProfitAndLoss(
  accounts: Account[],
  entries: JournalEntry[],
  startDate: string = '2000-01-01',
  endDate: string = '2099-12-31'
): ProfitAndLossReport {
  const periodEntries = entries.filter((e) => {
    return e.status === 'POSTED' && e.entryDate >= startDate && e.entryDate <= endDate;
  });

  const accountBalances: Record<string, number> = {};
  for (const acc of accounts) {
    accountBalances[acc.id] = 0;
  }

  for (const entry of periodEntries) {
    for (const line of entry.lines) {
      const acc = accounts.find((a) => a.id === line.accountId);
      if (!acc) continue;

      const debit = roundMoney(line.debit || 0);
      const credit = roundMoney(line.credit || 0);

      // Revenue normal balance: Credit - Debit
      if (acc.type === 'REVENUE') {
        accountBalances[acc.id] = addMoney(accountBalances[acc.id], credit - debit);
      }
      // Expense normal balance: Debit - Credit
      else if (acc.type === 'EXPENSE') {
        accountBalances[acc.id] = addMoney(accountBalances[acc.id], debit - credit);
      }
    }
  }

  // Revenue Breakdown
  const operatingRevenueItems: { accountName: string; amount: number }[] = [];
  let operatingRevenueTotal = 0;
  let otherIncomeTotal = 0;

  for (const acc of accounts.filter((a) => a.type === 'REVENUE')) {
    const bal = roundMoney(accountBalances[acc.id] || 0);
    if (bal === 0) continue;

    if (acc.subType === 'NON_OPERATING_REVENUE' || acc.code === '4030') {
      otherIncomeTotal = addMoney(otherIncomeTotal, bal);
    } else {
      operatingRevenueTotal = addMoney(operatingRevenueTotal, bal);
      operatingRevenueItems.push({ accountName: acc.name, amount: bal });
    }
  }

  const totalRevenue = addMoney(operatingRevenueTotal, otherIncomeTotal);

  // COGS Breakdown
  const cogsItems: { accountName: string; amount: number }[] = [];
  let totalCOGS = 0;

  for (const acc of accounts.filter((a) => a.type === 'EXPENSE' && (a.subType === 'DIRECT_EXPENSE' || a.code === '5010'))) {
    const bal = roundMoney(accountBalances[acc.id] || 0);
    if (bal === 0) continue;
    totalCOGS = addMoney(totalCOGS, bal);
    cogsItems.push({ accountName: acc.name, amount: bal });
  }

  const grossProfit = subtractMoney(operatingRevenueTotal, totalCOGS);
  const grossMarginPercentage = operatingRevenueTotal > 0
    ? roundMoney((grossProfit / operatingRevenueTotal) * 100)
    : 0;

  // Operating Expenses Breakdown
  const operatingExpenseItems: { accountName: string; amount: number }[] = [];
  let totalOperatingExpenses = 0;

  for (const acc of accounts.filter((a) => a.type === 'EXPENSE' && a.subType !== 'DIRECT_EXPENSE' && a.code !== '5010')) {
    const bal = roundMoney(accountBalances[acc.id] || 0);
    if (bal === 0) continue;
    totalOperatingExpenses = addMoney(totalOperatingExpenses, bal);
    operatingExpenseItems.push({ accountName: acc.name, amount: bal });
  }

  const operatingProfit = subtractMoney(grossProfit, totalOperatingExpenses);
  const operatingMarginPercentage = operatingRevenueTotal > 0
    ? roundMoney((operatingProfit / operatingRevenueTotal) * 100)
    : 0;

  const netProfit = addMoney(operatingProfit, otherIncomeTotal);
  const netMarginPercentage = totalRevenue > 0
    ? roundMoney((netProfit / totalRevenue) * 100)
    : 0;

  return {
    periodStart: startDate,
    periodEnd: endDate,
    revenue: {
      operatingRevenue: operatingRevenueTotal,
      otherIncome: otherIncomeTotal,
      totalRevenue,
      items: operatingRevenueItems,
    },
    costOfGoodsSold: {
      totalCOGS,
      items: cogsItems,
    },
    grossProfit,
    grossMarginPercentage,
    operatingExpenses: {
      totalOperatingExpenses,
      items: operatingExpenseItems,
    },
    operatingProfit,
    operatingMarginPercentage,
    netProfit,
    netMarginPercentage,
  };
}

/**
 * Calculates Balance Sheet as of a specific date.
 * Enforces fundamental accounting equation: Assets = Liabilities + Equity
 */
export function getBalanceSheet(
  accounts: Account[],
  entries: JournalEntry[],
  asOfDate: string = '2099-12-31'
): BalanceSheetReport {
  const activeEntries = entries.filter((e) => e.status === 'POSTED' && e.entryDate <= asOfDate);

  const balances: Record<string, number> = {};
  for (const acc of accounts) {
    balances[acc.id] = 0;
  }

  for (const entry of activeEntries) {
    for (const line of entry.lines) {
      const acc = accounts.find((a) => a.id === line.accountId);
      if (!acc) continue;

      const debit = roundMoney(line.debit || 0);
      const credit = roundMoney(line.credit || 0);

      if (acc.type === 'ASSET') {
        balances[acc.id] = addMoney(balances[acc.id], debit - credit);
      } else if (acc.type === 'LIABILITY' || acc.type === 'EQUITY') {
        balances[acc.id] = addMoney(balances[acc.id], credit - debit);
      } else if (acc.type === 'REVENUE') {
        balances[acc.id] = addMoney(balances[acc.id], credit - debit);
      } else if (acc.type === 'EXPENSE') {
        balances[acc.id] = addMoney(balances[acc.id], debit - credit);
      }
    }
  }

  // Calculate Cumulative Retained Earnings from all historical revenues and expenses
  let totalHistoricalRevenue = 0;
  let totalHistoricalExpense = 0;

  for (const acc of accounts) {
    if (acc.type === 'REVENUE') {
      totalHistoricalRevenue = addMoney(totalHistoricalRevenue, balances[acc.id] || 0);
    } else if (acc.type === 'EXPENSE') {
      totalHistoricalExpense = addMoney(totalHistoricalExpense, balances[acc.id] || 0);
    }
  }

  const cumulativeNetIncome = subtractMoney(totalHistoricalRevenue, totalHistoricalExpense);

  // ASSETS
  let cashAndBank = 0;
  let accountsReceivable = 0;
  let inventory = 0;
  let otherCurrentAssets = 0;
  let totalFixedAssets = 0;

  const currentAssetItems: { accountName: string; amount: number }[] = [];
  const fixedAssetItems: { accountName: string; amount: number }[] = [];

  for (const acc of accounts.filter((a) => a.type === 'ASSET')) {
    const bal = roundMoney(balances[acc.id] || 0);
    if (bal === 0) continue;

    if (acc.code === '1010' || acc.code === '1020') {
      cashAndBank = addMoney(cashAndBank, bal);
      currentAssetItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.code === '1030') {
      accountsReceivable = addMoney(accountsReceivable, bal);
      currentAssetItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.code === '1040') {
      inventory = addMoney(inventory, bal);
      currentAssetItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.subType === 'FIXED_ASSET' || acc.code.startsWith('15')) {
      totalFixedAssets = addMoney(totalFixedAssets, bal);
      fixedAssetItems.push({ accountName: acc.name, amount: bal });
    } else {
      otherCurrentAssets = addMoney(otherCurrentAssets, bal);
      currentAssetItems.push({ accountName: acc.name, amount: bal });
    }
  }

  const totalCurrentAssets = addMoney(cashAndBank, accountsReceivable, inventory, otherCurrentAssets);
  const totalAssets = addMoney(totalCurrentAssets, totalFixedAssets);

  // LIABILITIES
  let accountsPayable = 0;
  let taxPayable = 0;
  let otherCurrentLiabilities = 0;
  let totalLongTermLiabilities = 0;

  const currentLiabItems: { accountName: string; amount: number }[] = [];
  const longTermLiabItems: { accountName: string; amount: number }[] = [];

  for (const acc of accounts.filter((a) => a.type === 'LIABILITY')) {
    const bal = roundMoney(balances[acc.id] || 0);
    if (bal === 0) continue;

    if (acc.code === '2010') {
      accountsPayable = addMoney(accountsPayable, bal);
      currentLiabItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.code === '2020' || acc.code === '2030') {
      taxPayable = addMoney(taxPayable, bal);
      currentLiabItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.subType === 'NON_CURRENT_LIABILITY' || acc.code.startsWith('25')) {
      totalLongTermLiabilities = addMoney(totalLongTermLiabilities, bal);
      longTermLiabItems.push({ accountName: acc.name, amount: bal });
    } else {
      otherCurrentLiabilities = addMoney(otherCurrentLiabilities, bal);
      currentLiabItems.push({ accountName: acc.name, amount: bal });
    }
  }

  const totalCurrentLiabilities = addMoney(accountsPayable, taxPayable, otherCurrentLiabilities);
  const totalLiabilities = addMoney(totalCurrentLiabilities, totalLongTermLiabilities);

  // EQUITY
  let ownerCapital = 0;
  let drawings = 0;
  const equityItems: { accountName: string; amount: number }[] = [];

  for (const acc of accounts.filter((a) => a.type === 'EQUITY')) {
    const bal = roundMoney(balances[acc.id] || 0);
    if (bal === 0) continue;

    if (acc.code === '3010') {
      ownerCapital = addMoney(ownerCapital, bal);
      equityItems.push({ accountName: acc.name, amount: bal });
    } else if (acc.code === '3030') {
      drawings = addMoney(drawings, bal);
      equityItems.push({ accountName: acc.name, amount: -bal });
    } else {
      equityItems.push({ accountName: acc.name, amount: bal });
    }
  }

  // Include cumulative retained earnings in equity
  equityItems.push({ accountName: 'Retained Earnings (Net Income)', amount: cumulativeNetIncome });
  const totalEquity = addMoney(ownerCapital, cumulativeNetIncome, -drawings);

  const totalLiabilitiesAndEquity = addMoney(totalLiabilities, totalEquity);
  const discrepancy = Math.abs(roundMoney(totalAssets - totalLiabilitiesAndEquity));
  const isBalanced = discrepancy < 0.01;

  return {
    asOfDate,
    assets: {
      currentAssets: {
        cashAndBank,
        accountsReceivable,
        inventory,
        otherCurrent: otherCurrentAssets,
        totalCurrentAssets,
        items: currentAssetItems,
      },
      fixedAssets: {
        totalFixedAssets,
        items: fixedAssetItems,
      },
      totalAssets,
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable,
        taxPayable,
        otherCurrent: otherCurrentLiabilities,
        totalCurrentLiabilities,
        items: currentLiabItems,
      },
      longTermLiabilities: {
        totalLongTermLiabilities,
        items: longTermLiabItems,
      },
      totalLiabilities,
    },
    equity: {
      ownerCapital,
      retainedEarnings: cumulativeNetIncome,
      drawings,
      totalEquity,
      items: equityItems,
    },
    totalLiabilitiesAndEquity,
    isBalanced,
    discrepancy,
  };
}

/**
 * Calculates Cash Flow Statement across Operating, Investing, and Financing activities.
 */
export function getCashFlow(
  accounts: Account[],
  entries: JournalEntry[],
  startDate: string = '2000-01-01',
  endDate: string = '2099-12-31'
): CashFlowReport {
  const pnl = getProfitAndLoss(accounts, entries, startDate, endDate);
  const bsStart = getBalanceSheet(accounts, entries, startDate);
  const bsEnd = getBalanceSheet(accounts, entries, endDate);

  // Changes in Working Capital
  const receivablesChange = subtractMoney(
    bsStart.assets.currentAssets.accountsReceivable,
    bsEnd.assets.currentAssets.accountsReceivable
  );
  const payablesChange = subtractMoney(
    bsEnd.liabilities.currentLiabilities.accountsPayable,
    bsStart.liabilities.currentLiabilities.accountsPayable
  );
  const inventoryChange = subtractMoney(
    bsStart.assets.currentAssets.inventory,
    bsEnd.assets.currentAssets.inventory
  );

  const netOperatingCash = addMoney(
    pnl.netProfit,
    receivablesChange,
    payablesChange,
    inventoryChange
  );

  // Investing Activities
  const fixedAssetPurchases = subtractMoney(
    bsEnd.assets.fixedAssets.totalFixedAssets,
    bsStart.assets.fixedAssets.totalFixedAssets
  );
  const netInvestingCash = roundMoney(-fixedAssetPurchases);

  // Financing Activities
  const drawingsDelta = subtractMoney(
    bsEnd.equity.drawings,
    bsStart.equity.drawings
  );
  const capitalDelta = subtractMoney(
    bsEnd.equity.ownerCapital,
    bsStart.equity.ownerCapital
  );
  const loanDelta = subtractMoney(
    bsEnd.liabilities.longTermLiabilities.totalLongTermLiabilities,
    bsStart.liabilities.longTermLiabilities.totalLongTermLiabilities
  );

  const netFinancingCash = addMoney(capitalDelta, loanDelta, -drawingsDelta);
  const netCashFlow = addMoney(netOperatingCash, netInvestingCash, netFinancingCash);

  const startingCashBalance = bsStart.assets.currentAssets.cashAndBank;
  const endingCashBalance = bsEnd.assets.currentAssets.cashAndBank;

  return {
    periodStart: startDate,
    periodEnd: endDate,
    operatingActivities: {
      netProfit: pnl.netProfit,
      receivablesChange,
      payablesChange,
      inventoryChange,
      netOperatingCash,
    },
    investingActivities: {
      fixedAssetPurchases,
      netInvestingCash,
    },
    financingActivities: {
      ownerDrawings: drawingsDelta,
      ownerInjections: capitalDelta,
      loanChanges: loanDelta,
      netFinancingCash,
    },
    netCashFlow,
    startingCashBalance,
    endingCashBalance,
  };
}
