/**
 * DHANVI TRANSACTION-TO-JOURNAL TRANSLATION ENGINE
 * Automatically generates balanced double-entry lines for any real-world business transaction.
 */

import { Account, JournalLine, PaymentMethod, Transaction, TransactionType } from './types';
import { roundMoney, subtractMoney } from './money';

export interface CreateTransactionPostingRuleInput {
  businessId: string;
  type: TransactionType;
  amount: number;
  taxAmount?: number;
  paymentMethod: PaymentMethod;
  description: string;
  accounts: Account[];
  customAccountId?: string; // Specific expense/revenue, equity or asset account selected by user
}

export function generateJournalLinesForTransaction(
  input: CreateTransactionPostingRuleInput
): JournalLine[] {
  const { type, amount, taxAmount = 0, paymentMethod, description, accounts, customAccountId } = input;
  const netAmount = taxAmount > 0 ? subtractMoney(amount, taxAmount) : amount;

  // Helper to find account by code or type
  const findAccount = (code: string, fallbackType?: string) => {
    const acc = accounts.find((a) => a.code === code) ||
      (fallbackType ? accounts.find((a) => a.type === fallbackType) : undefined);
    if (!acc) {
      throw new Error(`Required account code ${code} (${fallbackType || ''}) not found in Chart of Accounts.`);
    }
    return acc;
  };

  // Determine cash/bank account based on payment method
  const getSettlementAccount = () => {
    if (paymentMethod === 'CASH') {
      return findAccount('1010', 'ASSET'); // Cash on Hand
    }
    return findAccount('1020', 'ASSET'); // Bank
  };

  const lines: JournalLine[] = [];

  switch (type) {
    case 'SALE': {
      // Direct Cash/Bank Sale:
      // DEBIT Settlement Account (Cash/Bank) - Total Amount
      // CREDIT Sales Revenue - Net Amount
      // CREDIT GST Output Payable - Tax (if any)
      const settlementAcc = getSettlementAccount();
      const revenueAcc = customAccountId
        ? accounts.find((a) => a.id === customAccountId) || findAccount('4010')
        : findAccount('4010');

      lines.push({
        accountId: settlementAcc.id,
        accountCode: settlementAcc.code,
        accountName: settlementAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Receipt: ${description}`,
      });

      lines.push({
        accountId: revenueAcc.id,
        accountCode: revenueAcc.code,
        accountName: revenueAcc.name,
        debit: 0,
        credit: roundMoney(netAmount),
        description: `Revenue: ${description}`,
      });

      if (taxAmount > 0) {
        const gstAcc = findAccount('2020');
        lines.push({
          accountId: gstAcc.id,
          accountCode: gstAcc.code,
          accountName: gstAcc.name,
          debit: 0,
          credit: roundMoney(taxAmount),
          description: `GST Output on Sale: ${description}`,
        });
      }
      break;
    }

    case 'EXPENSE':
    case 'PURCHASE': {
      // Expense / Direct Purchase paid via Cash/Bank:
      // DEBIT Expense / COGS Account - Total Amount
      // CREDIT Settlement Account (Cash/Bank) - Total Amount
      const settlementAcc = getSettlementAccount();
      const expenseAcc = customAccountId
        ? accounts.find((a) => a.id === customAccountId) || findAccount('5010')
        : findAccount('5020'); // Default to operational expense

      lines.push({
        accountId: expenseAcc.id,
        accountCode: expenseAcc.code,
        accountName: expenseAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Expense: ${description}`,
      });

      lines.push({
        accountId: settlementAcc.id,
        accountCode: settlementAcc.code,
        accountName: settlementAcc.name,
        debit: 0,
        credit: roundMoney(amount),
        description: `Payment: ${description}`,
      });
      break;
    }

    case 'PAYMENT_RECEIVED': {
      // Customer pays outstanding debt:
      // DEBIT Bank / Cash - Total Amount
      // CREDIT Accounts Receivable (Debtors) - Total Amount
      const settlementAcc = getSettlementAccount();
      const arAcc = findAccount('1030'); // Accounts Receivable

      lines.push({
        accountId: settlementAcc.id,
        accountCode: settlementAcc.code,
        accountName: settlementAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Customer payment received: ${description}`,
      });

      lines.push({
        accountId: arAcc.id,
        accountCode: arAcc.code,
        accountName: arAcc.name,
        debit: 0,
        credit: roundMoney(amount),
        description: `Credit Accounts Receivable: ${description}`,
      });
      break;
    }

    case 'PAYMENT_SENT': {
      // Paying vendor bills / Accounts Payable:
      // DEBIT Accounts Payable (Creditors) - Total Amount
      // CREDIT Bank / Cash - Total Amount
      const settlementAcc = getSettlementAccount();
      const apAcc = findAccount('2010'); // Accounts Payable

      lines.push({
        accountId: apAcc.id,
        accountCode: apAcc.code,
        accountName: apAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Vendor bill cleared: ${description}`,
      });

      lines.push({
        accountId: settlementAcc.id,
        accountCode: settlementAcc.code,
        accountName: settlementAcc.name,
        debit: 0,
        credit: roundMoney(amount),
        description: `Disbursement: ${description}`,
      });
      break;
    }

    case 'TRANSFER': {
      // Internal transfer (e.g. Cash deposited into Bank or Bank to Bank):
      // DEBIT Destination Account
      // CREDIT Source Account
      const destAcc = customAccountId
        ? accounts.find((a) => a.id === customAccountId) || findAccount('1020')
        : findAccount('1020');
      const srcAcc = paymentMethod === 'CASH' ? findAccount('1010') : findAccount('1020');

      lines.push({
        accountId: destAcc.id,
        accountCode: destAcc.code,
        accountName: destAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Transfer In: ${description}`,
      });

      lines.push({
        accountId: srcAcc.id,
        accountCode: srcAcc.code,
        accountName: srcAcc.name,
        debit: 0,
        credit: roundMoney(amount),
        description: `Transfer Out: ${description}`,
      });
      break;
    }

    case 'REFUND': {
      // Refund paid to customer:
      // DEBIT Sales Revenue (Contra) / Refunds
      // CREDIT Bank / Cash
      const settlementAcc = getSettlementAccount();
      const revenueAcc = findAccount('4010');

      lines.push({
        accountId: revenueAcc.id,
        accountCode: revenueAcc.code,
        accountName: revenueAcc.name,
        debit: roundMoney(amount),
        credit: 0,
        description: `Customer refund: ${description}`,
      });

      lines.push({
        accountId: settlementAcc.id,
        accountCode: settlementAcc.code,
        accountName: settlementAcc.name,
        debit: 0,
        credit: roundMoney(amount),
        description: `Disbursement: ${description}`,
      });
      break;
    }

    default: {
      const settlementAcc = getSettlementAccount();
      const customAcc = customAccountId ? accounts.find((a) => a.id === customAccountId) : undefined;

      // If this is an Equity injection (Owner Capital): DEBIT Bank, CREDIT Equity
      if (customAcc && (customAcc.type === 'EQUITY' || customAcc.code.startsWith('3'))) {
        lines.push({
          accountId: settlementAcc.id,
          accountCode: settlementAcc.code,
          accountName: settlementAcc.name,
          debit: roundMoney(amount),
          credit: 0,
          description: `Capital Infusion: ${description}`,
        });

        lines.push({
          accountId: customAcc.id,
          accountCode: customAcc.code,
          accountName: customAcc.name,
          debit: 0,
          credit: roundMoney(amount),
          description: `Owner Capital: ${description}`,
        });
      } else {
        const defaultAcc = customAcc || findAccount('5090');
        lines.push({
          accountId: defaultAcc.id,
          accountCode: defaultAcc.code,
          accountName: defaultAcc.name,
          debit: roundMoney(amount),
          credit: 0,
          description,
        });

        lines.push({
          accountId: settlementAcc.id,
          accountCode: settlementAcc.code,
          accountName: settlementAcc.name,
          debit: 0,
          credit: roundMoney(amount),
          description,
        });
      }
      break;
    }
  }

  return lines;
}
