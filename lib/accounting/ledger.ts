/**
 * DHANVI GENERAL LEDGER ENGINE
 * Calculates account balances, running ledger balances, and Trial Balance from posted journal lines.
 */

import { Account, JournalEntry, JournalLine, TrialBalanceRow } from './types';
import { roundMoney, addMoney, subtractMoney } from './money';
import { getNormalBalance } from './accounts';

export interface AccountLedgerStatement {
  account: Account;
  startingBalance: number;
  totalDebits: number;
  totalCredits: number;
  closingBalance: number;
  entries: {
    entryId: string;
    entryNumber: string;
    date: string;
    description: string;
    debit: number;
    credit: number;
    runningBalance: number;
  }[];
}

/**
 * Calculates trial balance across all accounts based on posted journal entries.
 */
export function calculateTrialBalance(
  accounts: Account[],
  entries: JournalEntry[],
  asOfDate?: string
): {
  rows: TrialBalanceRow[];
  totalDebits: number;
  totalCredits: number;
  isBalanced: boolean;
  discrepancy: number;
} {
  const filteredEntries = entries.filter((e) => {
    if (e.status !== 'POSTED') return false;
    if (asOfDate && e.entryDate > asOfDate) return false;
    return true;
  });

  const totalsByAccount: Record<string, { debit: number; credit: number }> = {};
  for (const acc of accounts) {
    totalsByAccount[acc.id] = { debit: 0, credit: 0 };
  }

  for (const entry of filteredEntries) {
    for (const line of entry.lines) {
      if (totalsByAccount[line.accountId]) {
        totalsByAccount[line.accountId].debit = addMoney(
          totalsByAccount[line.accountId].debit,
          line.debit || 0
        );
        totalsByAccount[line.accountId].credit = addMoney(
          totalsByAccount[line.accountId].credit,
          line.credit || 0
        );
      }
    }
  }

  let totalDebits = 0;
  let totalCredits = 0;
  const rows: TrialBalanceRow[] = [];

  for (const acc of accounts) {
    const totals = totalsByAccount[acc.id] || { debit: 0, credit: 0 };
    const debitTotal = roundMoney(totals.debit);
    const creditTotal = roundMoney(totals.credit);

    if (debitTotal === 0 && creditTotal === 0) {
      continue; // Skip zero-balance accounts in active rows
    }

    const normal = getNormalBalance(acc.type);
    const balance =
      normal === 'DEBIT'
        ? subtractMoney(debitTotal, creditTotal)
        : subtractMoney(creditTotal, debitTotal);

    rows.push({
      accountId: acc.id,
      accountCode: acc.code,
      accountName: acc.name,
      type: acc.type,
      debitTotal,
      creditTotal,
      balance,
    });

    totalDebits = addMoney(totalDebits, debitTotal);
    totalCredits = addMoney(totalCredits, creditTotal);
  }

  rows.sort((a, b) => a.accountCode.localeCompare(b.accountCode));

  const discrepancy = Math.abs(roundMoney(totalDebits - totalCredits));
  const isBalanced = discrepancy < 0.005;

  return {
    rows,
    totalDebits,
    totalCredits,
    isBalanced,
    discrepancy,
  };
}

/**
 * Generates an itemized ledger statement with running balance for a specific account.
 */
export function getAccountLedger(
  account: Account,
  entries: JournalEntry[],
  startDate?: string,
  endDate?: string
): AccountLedgerStatement {
  const normal = getNormalBalance(account.type);
  let startingBalance = 0;
  let totalDebits = 0;
  let totalCredits = 0;
  let currentBalance = 0;

  const validEntries = entries
    .filter((e) => e.status === 'POSTED')
    .sort((a, b) => a.entryDate.localeCompare(b.entryDate));

  const statementLines: AccountLedgerStatement['entries'] = [];

  for (const entry of validEntries) {
    const matchingLines = entry.lines.filter((l) => l.accountId === account.id);
    for (const line of matchingLines) {
      const debit = roundMoney(line.debit || 0);
      const credit = roundMoney(line.credit || 0);

      const netDelta = normal === 'DEBIT' ? debit - credit : credit - debit;

      if (startDate && entry.entryDate < startDate) {
        startingBalance = roundMoney(startingBalance + netDelta);
        currentBalance = roundMoney(currentBalance + netDelta);
        continue;
      }

      if (endDate && entry.entryDate > endDate) {
        continue;
      }

      totalDebits = addMoney(totalDebits, debit);
      totalCredits = addMoney(totalCredits, credit);
      currentBalance = roundMoney(currentBalance + netDelta);

      statementLines.push({
        entryId: entry.id,
        entryNumber: entry.entryNumber,
        date: entry.entryDate,
        description: line.description || entry.description,
        debit,
        credit,
        runningBalance: currentBalance,
      });
    }
  }

  return {
    account,
    startingBalance,
    totalDebits,
    totalCredits,
    closingBalance: currentBalance,
    entries: statementLines,
  };
}
