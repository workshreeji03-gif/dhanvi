/**
 * DHANVI ACCOUNTING VALIDATION & INVARIANT ENFORCEMENT ENGINE
 * 
 * Fundamental Invariant:
 * SUM(debits) === SUM(credits)
 */

import { JournalLine } from './types';
import { roundMoney, addMoney } from './money';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  totalDebits: number;
  totalCredits: number;
  discrepancy: number;
}

export function validateJournalLines(lines: JournalLine[]): ValidationResult {
  const errors: string[] = [];

  if (!lines || lines.length < 2) {
    errors.push('A valid double-entry journal entry must have at least two line items.');
    return {
      isValid: false,
      errors,
      totalDebits: 0,
      totalCredits: 0,
      discrepancy: 0,
    };
  }

  let totalDebits = 0;
  let totalCredits = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const debit = roundMoney(line.debit || 0);
    const credit = roundMoney(line.credit || 0);

    if (!line.accountId) {
      errors.push(`Line item #${i + 1} is missing an account reference.`);
    }

    if (debit < 0 || credit < 0) {
      errors.push(`Line item #${i + 1} contains negative amounts. Debits and credits must be non-negative.`);
    }

    if (debit === 0 && credit === 0) {
      errors.push(`Line item #${i + 1} must have either a positive debit or positive credit amount.`);
    }

    if (debit > 0 && credit > 0) {
      errors.push(`Line item #${i + 1} cannot have both debit and credit. Split into separate lines.`);
    }

    totalDebits = addMoney(totalDebits, debit);
    totalCredits = addMoney(totalCredits, credit);
  }

  const discrepancy = Math.abs(roundMoney(totalDebits - totalCredits));
  if (discrepancy > 0.005) {
    errors.push(
      `Unbalanced journal entry: Total Debits (₹${totalDebits.toFixed(2)}) does not equal Total Credits (₹${totalCredits.toFixed(2)}). Discrepancy: ₹${discrepancy.toFixed(2)}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    totalDebits,
    totalCredits,
    discrepancy,
  };
}
