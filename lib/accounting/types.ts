/**
 * DHANVI CORE ACCOUNTING DATA STRUCTURES & TYPES
 */

export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';

export type AccountSubType =
  | 'CURRENT_ASSET'
  | 'FIXED_ASSET'
  | 'NON_CURRENT_ASSET'
  | 'CURRENT_LIABILITY'
  | 'NON_CURRENT_LIABILITY'
  | 'EQUITY'
  | 'OPERATING_REVENUE'
  | 'NON_OPERATING_REVENUE'
  | 'DIRECT_EXPENSE'
  | 'OPERATING_EXPENSE'
  | 'NON_OPERATING_EXPENSE';

export interface Account {
  id: string;
  businessId: string;
  code: string;
  name: string;
  type: AccountType;
  subType?: AccountSubType;
  description?: string;
  parentId?: string;
  currency: string;
  isActive: boolean;
  isSystem: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type JournalEntryStatus = 'DRAFT' | 'POSTED' | 'REVERSED';
export type JournalSourceType =
  | 'MANUAL'
  | 'TRANSACTION'
  | 'INVOICE'
  | 'PAYMENT'
  | 'REVERSAL'
  | 'IMPORT'
  | 'CLOSING';

export interface JournalLine {
  id?: string;
  journalEntryId?: string;
  accountId: string;
  accountCode?: string;
  accountName?: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface JournalEntry {
  id: string;
  businessId: string;
  entryNumber: string;
  entryDate: string; // YYYY-MM-DD
  description: string;
  sourceType: JournalSourceType;
  sourceId?: string;
  status: JournalEntryStatus;
  reversalOfId?: string;
  createdBy?: string;
  postedAt?: string;
  lines: JournalLine[];
  createdAt?: string;
}

export type TransactionType =
  | 'SALE'
  | 'PURCHASE'
  | 'EXPENSE'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_SENT'
  | 'TRANSFER'
  | 'REFUND'
  | 'OTHER';

export type PaymentMethod =
  | 'CASH'
  | 'BANK_TRANSFER'
  | 'UPI'
  | 'CARD'
  | 'CHEQUE'
  | 'CREDIT'
  | 'OTHER';

export type TransactionStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'POSTED'
  | 'REVERSED';

export type TransactionSource =
  | 'MANUAL'
  | 'CSV_IMPORT'
  | 'INVOICE_SCAN'
  | 'BANK_FEED'
  | 'API';

export interface Transaction {
  id: string;
  businessId: string;
  date: string;
  amount: number;
  currency: string;
  type: TransactionType;
  description: string;
  category: string;
  paymentMethod: PaymentMethod;
  accountId?: string;
  customerId?: string;
  vendorId?: string;
  invoiceId?: string;
  referenceNumber?: string;
  status: TransactionStatus;
  isReconciled: boolean;
  source: TransactionSource;
  journalEntryId?: string;
  importBatchId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrialBalanceRow {
  accountId: string;
  accountCode: string;
  accountName: string;
  type: AccountType;
  debitTotal: number;
  creditTotal: number;
  balance: number; // Net balance according to normal balance sign
}

export interface ProfitAndLossReport {
  periodStart: string;
  periodEnd: string;
  revenue: {
    operatingRevenue: number;
    otherIncome: number;
    totalRevenue: number;
    items: { accountName: string; amount: number }[];
  };
  costOfGoodsSold: {
    totalCOGS: number;
    items: { accountName: string; amount: number }[];
  };
  grossProfit: number;
  grossMarginPercentage: number;
  operatingExpenses: {
    totalOperatingExpenses: number;
    items: { accountName: string; amount: number }[];
  };
  operatingProfit: number;
  operatingMarginPercentage: number;
  netProfit: number;
  netMarginPercentage: number;
}

export interface BalanceSheetReport {
  asOfDate: string;
  assets: {
    currentAssets: {
      cashAndBank: number;
      accountsReceivable: number;
      inventory: number;
      otherCurrent: number;
      totalCurrentAssets: number;
      items: { accountName: string; amount: number }[];
    };
    fixedAssets: {
      totalFixedAssets: number;
      items: { accountName: string; amount: number }[];
    };
    totalAssets: number;
  };
  liabilities: {
    currentLiabilities: {
      accountsPayable: number;
      taxPayable: number;
      otherCurrent: number;
      totalCurrentLiabilities: number;
      items: { accountName: string; amount: number }[];
    };
    longTermLiabilities: {
      totalLongTermLiabilities: number;
      items: { accountName: string; amount: number }[];
    };
    totalLiabilities: number;
  };
  equity: {
    ownerCapital: number;
    retainedEarnings: number;
    drawings: number;
    totalEquity: number;
    items: { accountName: string; amount: number }[];
  };
  totalLiabilitiesAndEquity: number;
  isBalanced: boolean;
  discrepancy: number;
}

export interface CashFlowReport {
  periodStart: string;
  periodEnd: string;
  operatingActivities: {
    netProfit: number;
    receivablesChange: number;
    payablesChange: number;
    inventoryChange: number;
    netOperatingCash: number;
  };
  investingActivities: {
    fixedAssetPurchases: number;
    netInvestingCash: number;
  };
  financingActivities: {
    ownerDrawings: number;
    ownerInjections: number;
    loanChanges: number;
    netFinancingCash: number;
  };
  netCashFlow: number;
  startingCashBalance: number;
  endingCashBalance: number;
}
