/**
 * DHANVI DEMO DATA FIXTURE - "SHARMA WHOLESALE"
 * Realistic Indian Electronics & Hardware Wholesale Business (Mumbai / Bengaluru)
 */

import { Account, JournalEntry, Transaction } from '../accounting/types';
import { STANDARD_CHART_OF_ACCOUNTS } from '../accounting/accounts';
import { generateJournalLinesForTransaction } from '../accounting/transactions';
import { createJournalEntry } from '../accounting/journal';

export const DEMO_BUSINESS = {
  id: 'biz_sharma_wholesale_01',
  name: 'Sharma Wholesale & Electronics',
  legalName: 'Sharma Electronics & Hardware Private Limited',
  gstin: '29ABCDE1234F1Z5',
  pan: 'ABCDE1234F',
  currency: 'INR',
  industry: 'Wholesale & Distribution (Consumer Tech)',
  businessSize: '10-25 Employees (SMB)',
  fiscalYearStart: 4, // April
  address: {
    street: 'Plot 42, Electronics Complex, Peenya Industrial Area',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560058',
    country: 'India',
  },
  createdAt: '2026-04-01T00:00:00Z',
};

export const DEMO_MEMBERS = [
  { id: 'mem_01', businessId: DEMO_BUSINESS.id, name: 'Rajesh Sharma', email: 'rajesh@sharmawholesale.in', role: 'OWNER' },
  { id: 'mem_02', businessId: DEMO_BUSINESS.id, name: 'Priya Sundaram, CA', email: 'priya.ca@sundaram-associates.in', role: 'ACCOUNTANT' },
  { id: 'mem_03', businessId: DEMO_BUSINESS.id, name: 'Amit Verma', email: 'amit@sharmawholesale.in', role: 'STAFF' },
];

export const DEMO_ACCOUNTS: Account[] = STANDARD_CHART_OF_ACCOUNTS.map((acc) => ({
  ...acc,
  id: `acc_${acc.code}`,
  businessId: DEMO_BUSINESS.id,
  createdAt: '2026-04-01T00:00:00Z',
}));

export const DEMO_CUSTOMERS = [
  { id: 'cust_01', businessId: DEMO_BUSINESS.id, name: 'Apex Retail Electronics', phone: '+91 98450 11223', email: 'billing@apexretail.in', gstin: '29AABCA1122B1Z1', opening_balance: 145000, address: { city: 'Bengaluru', state: 'KA' } },
  { id: 'cust_02', businessId: DEMO_BUSINESS.id, name: 'Metro Digital Mart', phone: '+91 98200 44556', email: 'accounts@metrodigital.com', gstin: '27AABCM3344D1Z8', opening_balance: 85000, address: { city: 'Mumbai', state: 'MH' } },
  { id: 'cust_03', businessId: DEMO_BUSINESS.id, name: 'Balaji Infotech', phone: '+91 94440 77889', email: 'balaji.info@gmail.com', gstin: '33AABCB5566E1Z3', opening_balance: 32000, address: { city: 'Chennai', state: 'TN' } },
  { id: 'cust_04', businessId: DEMO_BUSINESS.id, name: 'Shreeji Tech Solutions', phone: '+91 97110 99001', email: 'shreeji.procure@outlook.com', gstin: '24AABCS7788G1Z2', opening_balance: 68000, address: { city: 'Ahmedabad', state: 'GJ' } },
];

export const DEMO_VENDORS = [
  { id: 'vend_01', businessId: DEMO_BUSINESS.id, name: 'Techtronics Global Imports', phone: '+91 98100 12345', email: 'sales@techtronicsglobal.com', gstin: '27AABCT9988H1Z4', opening_balance: 240000, bank_details: { bank: 'HDFC Bank', a_c: '50200012345678', ifsc: 'HDFC0000123' } },
  { id: 'vend_02', businessId: DEMO_BUSINESS.id, name: 'Hindustan Corrugated Packaging', phone: '+91 98440 23456', email: 'orders@hindustanpack.in', gstin: '29AABCH4433J1Z9', opening_balance: 42000, bank_details: { bank: 'ICICI Bank', a_c: '000205001234', ifsc: 'ICIC0000002' } },
  { id: 'vend_03', businessId: DEMO_BUSINESS.id, name: 'Reliable Express Logistics', phone: '+91 98800 34567', email: 'billing@reliableexpress.in', gstin: '29AABCR8877K1Z0', opening_balance: 18500, bank_details: { bank: 'State Bank of India', a_c: '30012345678', ifsc: 'SBIN0000567' } },
  { id: 'vend_04', businessId: DEMO_BUSINESS.id, name: 'CyberSpace Cloud Systems', phone: '+91 98210 45678', email: 'support@cyberspacecloud.io', gstin: '27AABCC6655L1Z1', opening_balance: 12500, bank_details: { bank: 'Kotak Bank', a_c: '9911223344', ifsc: 'KKBK0000123' } },
];

export const DEMO_PRODUCTS = [
  { id: 'prod_01', businessId: DEMO_BUSINESS.id, name: '65W GaN USB-C Fast Charger (Pack of 10)', sku: 'CHG-GAN-65W', category: 'Accessories', purchasePrice: 4200, sellingPrice: 6500, stockQuantity: 180, minStockAlert: 30 },
  { id: 'prod_02', businessId: DEMO_BUSINESS.id, name: 'Braided High-Speed HDMI 2.1 Cable 2M (Pack of 20)', sku: 'CBL-HDMI-2M', category: 'Cables', purchasePrice: 1800, sellingPrice: 3200, stockQuantity: 240, minStockAlert: 50 },
  { id: 'prod_03', businessId: DEMO_BUSINESS.id, name: 'Smart Wi-Fi Power Strip with Surge Protection', sku: 'STR-WIFI-4P', category: 'Smart Home', purchasePrice: 850, sellingPrice: 1450, stockQuantity: 95, minStockAlert: 20 },
  { id: 'prod_04', businessId: DEMO_BUSINESS.id, name: 'Ergonomic Dual-Mode Wireless Mouse (Pack of 10)', sku: 'MOU-WL-DUAL', category: 'Peripherals', purchasePrice: 3100, sellingPrice: 4800, stockQuantity: 14, minStockAlert: 25 },
];

export const DEMO_BANK_ACCOUNTS = [
  { id: 'bank_01', businessId: DEMO_BUSINESS.id, accountName: 'HDFC Current A/C (Operating)', bankName: 'HDFC Bank', accountNumber: '50200098765432', ifscCode: 'HDFC0000123', balance: 689500 },
  { id: 'bank_02', businessId: DEMO_BUSINESS.id, accountName: 'ICICI Working Capital Overdraft', bankName: 'ICICI Bank', accountNumber: '000205987654', ifscCode: 'ICIC0000002', balance: 150000 },
];

// Pre-seeded Realistic Raw Transactions
export const DEMO_TRANSACTIONS_RAW: Omit<Transaction, 'journalEntryId'>[] = [
  // Sales
  { id: 'tx_02', businessId: DEMO_BUSINESS.id, date: '2026-08-03', amount: 165000, currency: 'INR', type: 'SALE', description: 'Wholesale Invoice #INV-2026-081 Apex Retail', category: 'Sales Revenue', paymentMethod: 'BANK_TRANSFER', customerId: 'cust_01', status: 'POSTED', isReconciled: true, source: 'MANUAL' },
  { id: 'tx_03', businessId: DEMO_BUSINESS.id, date: '2026-08-05', amount: 98000, currency: 'INR', type: 'SALE', description: 'Store Counter Sales & Instant UPI', category: 'Sales Revenue', paymentMethod: 'UPI', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_04', businessId: DEMO_BUSINESS.id, date: '2026-08-08', amount: 215000, currency: 'INR', type: 'SALE', description: 'Bulk Shipment to Metro Digital Mumbai', category: 'Sales Revenue', paymentMethod: 'BANK_TRANSFER', customerId: 'cust_02', status: 'POSTED', isReconciled: true, source: 'MANUAL' },
  { id: 'tx_05', businessId: DEMO_BUSINESS.id, date: '2026-08-14', amount: 142000, currency: 'INR', type: 'SALE', description: 'Chargers & Cables Lot #442 Shreeji Tech', category: 'Sales Revenue', paymentMethod: 'BANK_TRANSFER', customerId: 'cust_04', status: 'POSTED', isReconciled: true, source: 'MANUAL' },
  { id: 'tx_06', businessId: DEMO_BUSINESS.id, date: '2026-08-20', amount: 76000, currency: 'INR', type: 'SALE', description: 'POS Counter Sales Receipts', category: 'Sales Revenue', paymentMethod: 'CARD', status: 'POSTED', isReconciled: true, source: 'MANUAL' },

  // Inventory Purchases (COGS)
  { id: 'tx_07', businessId: DEMO_BUSINESS.id, date: '2026-08-04', amount: 220000, currency: 'INR', type: 'PURCHASE', description: 'Import container lot: GaN Power Adapters', category: 'Cost of Goods Sold', paymentMethod: 'BANK_TRANSFER', vendorId: 'vend_01', status: 'POSTED', isReconciled: true, source: 'INVOICE_SCAN' },
  { id: 'tx_08', businessId: DEMO_BUSINESS.id, date: '2026-08-11', amount: 115000, currency: 'INR', type: 'PURCHASE', description: 'Stock restock: HDMI & USB-C Cable spools', category: 'Cost of Goods Sold', paymentMethod: 'BANK_TRANSFER', vendorId: 'vend_01', status: 'POSTED', isReconciled: true, source: 'INVOICE_SCAN' },

  // Operating Expenses
  { id: 'tx_09', businessId: DEMO_BUSINESS.id, date: '2026-08-05', amount: 110000, currency: 'INR', type: 'EXPENSE', description: 'Staff Salaries (August 2026)', category: 'Salaries & Staff Wages', paymentMethod: 'BANK_TRANSFER', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_10', businessId: DEMO_BUSINESS.id, date: '2026-08-07', amount: 45000, currency: 'INR', type: 'EXPENSE', description: 'Warehouse & Office Lease Rent', category: 'Rent & Premises Lease', paymentMethod: 'BANK_TRANSFER', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_11', businessId: DEMO_BUSINESS.id, date: '2026-08-12', amount: 14800, currency: 'INR', type: 'EXPENSE', description: 'BESCOM Power & Airtel Fiber broadband bill', category: 'Electricity & Utilities', paymentMethod: 'UPI', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_12', businessId: DEMO_BUSINESS.id, date: '2026-08-15', amount: 38500, currency: 'INR', type: 'EXPENSE', description: 'Google Ads & Meta B2B Promotions', category: 'Marketing & Advertising', paymentMethod: 'CARD', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_13', businessId: DEMO_BUSINESS.id, date: '2026-08-18', amount: 42000, currency: 'INR', type: 'EXPENSE', description: 'Custom printed 3-ply corrugated cartons & tape', category: 'Packaging & Courier Freight', paymentMethod: 'BANK_TRANSFER', vendorId: 'vend_02', status: 'POSTED', isReconciled: true, source: 'INVOICE_SCAN' },
  { id: 'tx_14', businessId: DEMO_BUSINESS.id, date: '2026-08-22', amount: 18500, currency: 'INR', type: 'EXPENSE', description: 'Reliable Express interstate dispatch freight', category: 'Packaging & Courier Freight', paymentMethod: 'UPI', vendorId: 'vend_03', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_15', businessId: DEMO_BUSINESS.id, date: '2026-08-25', amount: 12500, currency: 'INR', type: 'EXPENSE', description: 'Tally Cloud & Zoho ERP monthly seat subscription', category: 'Software & Technology Tools', paymentMethod: 'CARD', vendorId: 'vend_04', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },

  // Customer Debt Collection
  { id: 'tx_16', businessId: DEMO_BUSINESS.id, date: '2026-08-16', amount: 65000, currency: 'INR', type: 'PAYMENT_RECEIVED', description: 'Part payment received from Apex Retail Electronics', category: 'Customer Payment', paymentMethod: 'BANK_TRANSFER', customerId: 'cust_01', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },
  { id: 'tx_17', businessId: DEMO_BUSINESS.id, date: '2026-08-23', amount: 45000, currency: 'INR', type: 'PAYMENT_RECEIVED', description: 'Cheque cleared from Balaji Infotech Chennai', category: 'Customer Payment', paymentMethod: 'CHEQUE', customerId: 'cust_03', status: 'POSTED', isReconciled: true, source: 'BANK_FEED' },

  // Uncategorized / Review Needed (For Accountant Workspace)
  { id: 'tx_18', businessId: DEMO_BUSINESS.id, date: '2026-08-27', amount: 14500, currency: 'INR', type: 'EXPENSE', description: 'UPI/9845012345/Vendor Advance settlement', category: 'Uncategorized', paymentMethod: 'UPI', status: 'PENDING_REVIEW', isReconciled: false, source: 'CSV_IMPORT' },
  { id: 'tx_19', businessId: DEMO_BUSINESS.id, date: '2026-08-28', amount: 6200, currency: 'INR', type: 'EXPENSE', description: 'POS Card machine swipe fee reversal', category: 'Uncategorized', paymentMethod: 'BANK_TRANSFER', status: 'PENDING_REVIEW', isReconciled: false, source: 'CSV_IMPORT' },
];

export function buildCompleteDemoLedger(): {
  business: typeof DEMO_BUSINESS;
  members: typeof DEMO_MEMBERS;
  accounts: Account[];
  customers: typeof DEMO_CUSTOMERS;
  vendors: typeof DEMO_VENDORS;
  products: typeof DEMO_PRODUCTS;
  bankAccounts: typeof DEMO_BANK_ACCOUNTS;
  transactions: Transaction[];
  journalEntries: JournalEntry[];
} {
  const accounts = DEMO_ACCOUNTS;
  const journalEntries: JournalEntry[] = [];
  const transactions: Transaction[] = [];

  // 1. Opening Balances Journal Entry (As of 2026-04-01)
  const openingEntry = createJournalEntry({
    businessId: DEMO_BUSINESS.id,
    entryDate: '2026-04-01',
    description: 'Opening Balances Migration (FY 2026-27)',
    sourceType: 'MANUAL',
    lines: [
      { accountId: 'acc_1020', accountCode: '1020', accountName: 'HDFC Bank Operating A/C', debit: 650000, credit: 0, description: 'Opening Bank Balance' },
      { accountId: 'acc_1030', accountCode: '1030', accountName: 'Accounts Receivable (Debtors)', debit: 330000, credit: 0, description: 'Opening Trade Receivables' },
      { accountId: 'acc_1040', accountCode: '1040', accountName: 'Merchandise Inventory', debit: 450000, credit: 0, description: 'Opening Inventory Stock' },
      { accountId: 'acc_1510', accountCode: '1510', accountName: 'Computers, Servers & IT Hardware', debit: 200000, credit: 0, description: 'Office & Warehouse IT Hardware' },
      { accountId: 'acc_2010', accountCode: '2010', accountName: 'Accounts Payable (Creditors)', debit: 0, credit: 313000, description: 'Opening Supplier Payables' },
      { accountId: 'acc_3010', accountCode: '3010', accountName: "Owner's Equity Capital", debit: 0, credit: 1317000, description: 'Owner Contributed Capital' },
    ],
  });
  journalEntries.push(openingEntry);

  // 2. Process Monthly Transactions
  for (const raw of DEMO_TRANSACTIONS_RAW) {
    let customAccId: string | undefined;

    if (raw.category === 'Owner Capital') customAccId = 'acc_3010';
    else if (raw.category === 'Sales Revenue') customAccId = 'acc_4010';
    else if (raw.category === 'Cost of Goods Sold') customAccId = 'acc_5010';
    else if (raw.category === 'Salaries & Staff Wages') customAccId = 'acc_5020';
    else if (raw.category === 'Rent & Premises Lease') customAccId = 'acc_5030';
    else if (raw.category === 'Electricity & Utilities') customAccId = 'acc_5040';
    else if (raw.category === 'Marketing & Advertising') customAccId = 'acc_5050';
    else if (raw.category === 'Packaging & Courier Freight') customAccId = 'acc_5070';
    else if (raw.category === 'Software & Technology Tools') customAccId = 'acc_5060';

    const lines = generateJournalLinesForTransaction({
      businessId: DEMO_BUSINESS.id,
      type: raw.type,
      amount: raw.amount,
      taxAmount: raw.type === 'SALE' ? Math.round(raw.amount * 0.18 / 1.18) : 0,
      paymentMethod: raw.paymentMethod,
      description: raw.description,
      accounts,
      customAccountId: customAccId,
    });

    const je = createJournalEntry({
      businessId: DEMO_BUSINESS.id,
      entryDate: raw.date,
      description: raw.description,
      sourceType: 'TRANSACTION',
      sourceId: raw.id,
      lines,
    });

    journalEntries.push(je);

    transactions.push({
      ...raw,
      journalEntryId: je.id,
    });
  }

  return {
    business: DEMO_BUSINESS,
    members: DEMO_MEMBERS,
    accounts,
    customers: DEMO_CUSTOMERS,
    vendors: DEMO_VENDORS,
    products: DEMO_PRODUCTS,
    bankAccounts: DEMO_BANK_ACCOUNTS,
    transactions,
    journalEntries,
  };
}
