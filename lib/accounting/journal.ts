/**
 * DHANVI DOUBLE-ENTRY JOURNAL ENGINE
 * Manages journal entries, verification of balance invariants, and immutable reversals.
 */

import { JournalEntry, JournalLine, JournalSourceType } from './types';
import { validateJournalLines } from './validation';
import { roundMoney } from './money';

export interface CreateJournalEntryInput {
  businessId: string;
  entryDate: string; // YYYY-MM-DD
  description: string;
  sourceType: JournalSourceType;
  sourceId?: string;
  createdBy?: string;
  lines: JournalLine[];
}

export function createJournalEntry(input: CreateJournalEntryInput): JournalEntry {
  const validation = validateJournalLines(input.lines);
  if (!validation.isValid) {
    throw new Error(`Cannot create journal entry: ${validation.errors.join('; ')}`);
  }

  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const entryNumber = `JE-${input.entryDate.replace(/-/g, '')}-${timestamp.slice(-4)}${randomSuffix}`;

  const sanitizedLines: JournalLine[] = input.lines.map((line) => ({
    ...line,
    debit: roundMoney(line.debit || 0),
    credit: roundMoney(line.credit || 0),
  }));

  return {
    id: crypto.randomUUID(),
    businessId: input.businessId,
    entryNumber,
    entryDate: input.entryDate,
    description: input.description,
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    status: 'POSTED',
    createdBy: input.createdBy,
    postedAt: new Date().toISOString(),
    lines: sanitizedLines,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Creates a reversing journal entry (swapping all debits and credits)
 * To maintain an immutable audit trail, posted entries are NEVER silently deleted.
 */
export function createReversalEntry(
  originalEntry: JournalEntry,
  reason: string,
  reversalDate: string = new Date().toISOString().split('T')[0],
  createdBy?: string
): JournalEntry {
  if (originalEntry.status === 'REVERSED') {
    throw new Error(`Entry ${originalEntry.entryNumber} has already been reversed.`);
  }

  // Invert debits and credits
  const reversedLines: JournalLine[] = originalEntry.lines.map((line) => ({
    accountId: line.accountId,
    accountCode: line.accountCode,
    accountName: line.accountName,
    debit: line.credit, // swap
    credit: line.debit, // swap
    description: `Reversal: ${line.description || originalEntry.description}`,
  }));

  const validation = validateJournalLines(reversedLines);
  if (!validation.isValid) {
    throw new Error(`Reversal integrity failure: ${validation.errors.join('; ')}`);
  }

  const timestamp = Date.now().toString(36).toUpperCase();
  const entryNumber = `REV-${originalEntry.entryNumber}-${timestamp.slice(-4)}`;

  return {
    id: crypto.randomUUID(),
    businessId: originalEntry.businessId,
    entryNumber,
    entryDate: reversalDate,
    description: `Reversal of ${originalEntry.entryNumber}: ${reason}`,
    sourceType: 'REVERSAL',
    sourceId: originalEntry.id,
    reversalOfId: originalEntry.id,
    status: 'POSTED',
    createdBy,
    postedAt: new Date().toISOString(),
    lines: reversedLines,
    createdAt: new Date().toISOString(),
  };
}
