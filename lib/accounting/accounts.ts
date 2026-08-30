/**
 * DHANVI CHART OF ACCOUNTS DEFINITIONS & HELPER UTILITIES
 */

import { Account, AccountType } from './types';

export const STANDARD_CHART_OF_ACCOUNTS: Omit<Account, 'id' | 'businessId'>[] = [
  // ASSETS (1000 - 1999)
  { code: '1010', name: 'Cash on Hand', type: 'ASSET', subType: 'CURRENT_ASSET', description: 'Physical cash in office register', currency: 'INR', isActive: true, isSystem: true },
  { code: '1020', name: 'Bank Accounts (HDFC / ICICI / SBI)', type: 'ASSET', subType: 'CURRENT_ASSET', description: 'Primary business operating bank accounts', currency: 'INR', isActive: true, isSystem: true },
  { code: '1030', name: 'Accounts Receivable (Debtors)', type: 'ASSET', subType: 'CURRENT_ASSET', description: 'Money owed by customers for credit sales', currency: 'INR', isActive: true, isSystem: true },
  { code: '1040', name: 'Inventory Asset', type: 'ASSET', subType: 'CURRENT_ASSET', description: 'Stock value of unsold goods', currency: 'INR', isActive: true, isSystem: true },
  { code: '1050', name: 'Prepaid Expenses & Advances', type: 'ASSET', subType: 'CURRENT_ASSET', description: 'Advance rent, insurance, and supplier advances', currency: 'INR', isActive: true, isSystem: true },
  { code: '1510', name: 'Office & Tech Equipment', type: 'ASSET', subType: 'FIXED_ASSET', description: 'Computers, office electronics and hardware', currency: 'INR', isActive: true, isSystem: true },

  // LIABILITIES (2000 - 2999)
  { code: '2010', name: 'Accounts Payable (Creditors)', type: 'LIABILITY', subType: 'CURRENT_LIABILITY', description: 'Money owed to suppliers and vendors', currency: 'INR', isActive: true, isSystem: true },
  { code: '2020', name: 'GST Output Payable', type: 'LIABILITY', subType: 'CURRENT_LIABILITY', description: 'Net GST collected on sales payable to Government', currency: 'INR', isActive: true, isSystem: true },
  { code: '2030', name: 'Payroll & TDS Payable', type: 'LIABILITY', subType: 'CURRENT_LIABILITY', description: 'Withheld taxes and pending salaries', currency: 'INR', isActive: true, isSystem: true },
  { code: '2510', name: 'Bank Business Overdraft & Loans', type: 'LIABILITY', subType: 'NON_CURRENT_LIABILITY', description: 'Long term business loans and working credit lines', currency: 'INR', isActive: true, isSystem: true },

  // EQUITY (3000 - 3999)
  { code: '3010', name: 'Owner Capital', type: 'EQUITY', subType: 'EQUITY', description: 'Equity capital contributed by owner', currency: 'INR', isActive: true, isSystem: true },
  { code: '3020', name: 'Retained Earnings', type: 'EQUITY', subType: 'EQUITY', description: 'Accumulated profits retained in the business', currency: 'INR', isActive: true, isSystem: true },
  { code: '3030', name: 'Owner Drawings', type: 'EQUITY', subType: 'EQUITY', description: 'Funds withdrawn for personal use', currency: 'INR', isActive: true, isSystem: true },

  // REVENUE (4000 - 4999)
  { code: '4010', name: 'Sales Revenue', type: 'REVENUE', subType: 'OPERATING_REVENUE', description: 'Revenue from wholesale and retail product sales', currency: 'INR', isActive: true, isSystem: true },
  { code: '4020', name: 'Service & Consulting Revenue', type: 'REVENUE', subType: 'OPERATING_REVENUE', description: 'Income from services, installations, consultations', currency: 'INR', isActive: true, isSystem: true },
  { code: '4030', name: 'Other Income & Interest', type: 'REVENUE', subType: 'NON_OPERATING_REVENUE', description: 'Cashback, bank interest, scrap sales', currency: 'INR', isActive: true, isSystem: true },

  // EXPENSES (5000 - 5999)
  { code: '5010', name: 'Cost of Goods Sold (COGS)', type: 'EXPENSE', subType: 'DIRECT_EXPENSE', description: 'Direct purchase and manufacturing cost of inventory', currency: 'INR', isActive: true, isSystem: true },
  { code: '5020', name: 'Salaries & Staff Wages', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Staff salaries, bonuses, and incentives', currency: 'INR', isActive: true, isSystem: true },
  { code: '5030', name: 'Rent & Premises Lease', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Office and warehouse rental expenses', currency: 'INR', isActive: true, isSystem: true },
  { code: '5040', name: 'Electricity & Utilities', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Power, broadband, office maintenance', currency: 'INR', isActive: true, isSystem: true },
  { code: '5050', name: 'Marketing & Advertising', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Online ads, brochures, agency retainers', currency: 'INR', isActive: true, isSystem: true },
  { code: '5060', name: 'Software & Technology Tools', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Cloud servers, SaaS software, licenses', currency: 'INR', isActive: true, isSystem: true },
  { code: '5070', name: 'Packaging & Courier Freight', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Boxes, bubble wrap, delivery charges', currency: 'INR', isActive: true, isSystem: true },
  { code: '5080', name: 'Travel & Vehicle Fuel', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Local travel, customer visits, vehicle fuel', currency: 'INR', isActive: true, isSystem: true },
  { code: '5090', name: 'Bank Charges & Gateway Fees', type: 'EXPENSE', subType: 'OPERATING_EXPENSE', description: 'Payment gateway fees, bank processing costs', currency: 'INR', isActive: true, isSystem: true }
];

export function getNormalBalance(type: AccountType): 'DEBIT' | 'CREDIT' {
  switch (type) {
    case 'ASSET':
    case 'EXPENSE':
      return 'DEBIT';
    case 'LIABILITY':
    case 'EQUITY':
    case 'REVENUE':
      return 'CREDIT';
  }
}
