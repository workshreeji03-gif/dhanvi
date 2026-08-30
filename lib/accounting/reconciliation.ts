/**
 * DHANVI BANK RECONCILIATION MATCHING ENGINE
 */

import { Transaction } from './types';
import { roundMoney } from './money';

export interface BankStatementLine {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  reference?: string;
}

export interface ReconciliationMatchCandidate {
  bankLine: BankStatementLine;
  matchedTransaction?: Transaction;
  confidenceScore: number; // 0 to 100
  matchReason: string;
  status: 'EXACT_MATCH' | 'HIGH_CONFIDENCE' | 'SUGGESTION' | 'UNMATCHED';
}

export function matchBankTransactions(
  bankLines: BankStatementLine[],
  transactions: Transaction[]
): ReconciliationMatchCandidate[] {
  const results: ReconciliationMatchCandidate[] = [];
  const usedTxIds = new Set<string>();

  for (const bankLine of bankLines) {
    let bestMatch: Transaction | undefined;
    let highestScore = 0;
    let matchReason = 'No match found';

    for (const tx of transactions) {
      if (usedTxIds.has(tx.id)) continue;

      let score = 0;
      const reasons: string[] = [];

      // 1. Amount matching (Absolute exact match)
      if (Math.abs(roundMoney(tx.amount) - roundMoney(bankLine.amount)) < 0.01) {
        score += 60;
        reasons.push('Amount matched exactly');
      }

      // 2. Date matching (Within 3 days)
      const bankDate = new Date(bankLine.date).getTime();
      const txDate = new Date(tx.date).getTime();
      const dayDiff = Math.abs(bankDate - txDate) / (1000 * 60 * 60 * 24);

      if (dayDiff === 0) {
        score += 25;
        reasons.push('Date matched on same day');
      } else if (dayDiff <= 3) {
        score += 15;
        reasons.push(`Date within ${Math.round(dayDiff)} days`);
      }

      // 3. Reference or Description keyword matching
      if (bankLine.reference && tx.referenceNumber && bankLine.reference.includes(tx.referenceNumber)) {
        score += 20;
        reasons.push('Reference number matched');
      } else if (
        tx.description &&
        bankLine.description &&
        (bankLine.description.toLowerCase().includes(tx.description.toLowerCase()) ||
          tx.description.toLowerCase().includes(bankLine.description.toLowerCase()))
      ) {
        score += 10;
        reasons.push('Description similarity');
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = tx;
        matchReason = reasons.join(', ');
      }
    }

    let status: ReconciliationMatchCandidate['status'] = 'UNMATCHED';
    if (highestScore >= 85) {
      status = 'EXACT_MATCH';
      if (bestMatch) usedTxIds.add(bestMatch.id);
    } else if (highestScore >= 60) {
      status = 'HIGH_CONFIDENCE';
      if (bestMatch) usedTxIds.add(bestMatch.id);
    } else if (highestScore >= 35) {
      status = 'SUGGESTION';
    }

    results.push({
      bankLine,
      matchedTransaction: highestScore >= 35 ? bestMatch : undefined,
      confidenceScore: Math.min(highestScore, 100),
      matchReason: highestScore >= 35 ? matchReason : 'Unreconciled bank activity',
      status,
    });
  }

  return results;
}
