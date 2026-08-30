/**
 * DHANVI INTELLIGENT TRANSACTION CATEGORIZATION ENGINE
 */

export interface CategorizationRule {
  keywords: string[];
  category: string;
  accountCode: string;
  type: 'EXPENSE' | 'SALE' | 'PURCHASE' | 'TRANSFER' | 'OTHER';
}

export const DEFAULT_CATEGORIZATION_RULES: CategorizationRule[] = [
  { keywords: ['salary', 'payroll', 'wages', 'staff salary', 'stipend', 'bonus'], category: 'Salaries & Staff Wages', accountCode: '5020', type: 'EXPENSE' },
  { keywords: ['electricity', 'bescom', 'tata power', 'water bill', 'airtel', 'jio', 'broadband', 'internet bill', 'power bill'], category: 'Electricity & Utilities', accountCode: '5040', type: 'EXPENSE' },
  { keywords: ['office rent', 'warehouse rent', 'godown rent', 'premises lease', 'lease rent'], category: 'Rent & Premises Lease', accountCode: '5030', type: 'EXPENSE' },
  { keywords: ['google ads', 'facebook ads', 'meta ads', 'instagram ads', 'hoardings', 'marketing', 'agency retainer'], category: 'Marketing & Advertising', accountCode: '5050', type: 'EXPENSE' },
  { keywords: ['aws', 'google cloud', 'github', 'zoom', 'slack', 'notion', 'tally', 'zoho', 'microsoft 365'], category: 'Software & Technology Tools', accountCode: '5060', type: 'EXPENSE' },
  { keywords: ['dtdc', 'bluedart', 'delhivery', 'courier', 'boxes', 'packaging', 'bubble wrap', 'carton', 'shiprocket'], category: 'Packaging & Courier Freight', accountCode: '5070', type: 'EXPENSE' },
  { keywords: ['petrol', 'diesel', 'fuel', 'hpcl', 'iocl', 'bpcl', 'uber', 'ola', 'flight', 'irctc'], category: 'Travel & Vehicle Fuel', accountCode: '5080', type: 'EXPENSE' },
  { keywords: ['razorpay', 'paytm fee', 'phonepe fee', 'cashfree', 'bank charge', 'sms charge', 'pos swipe'], category: 'Bank Charges & Gateway Fees', accountCode: '5090', type: 'EXPENSE' },
  { keywords: ['sale', 'payment received', 'customer invoice', 'counter sales', 'pos sale', 'wholesale sale'], category: 'Sales Revenue', accountCode: '4010', type: 'SALE' },
  { keywords: ['raw material', 'fabric', 'steel', 'wholesale stock', 'goods purchase', 'supplier invoice'], category: 'Cost of Goods Sold', accountCode: '5010', type: 'PURCHASE' }
];

export interface CategorizationResult {
  category: string;
  accountCode: string;
  type: 'EXPENSE' | 'SALE' | 'PURCHASE' | 'TRANSFER' | 'OTHER';
  confidence: number; // 0 to 100
  requiresReview: boolean;
  matchRule?: string;
}

export function categorizeTransaction(description: string, amount: number): CategorizationResult {
  const desc = (description || '').toLowerCase();

  for (const rule of DEFAULT_CATEGORIZATION_RULES) {
    for (const kw of rule.keywords) {
      if (desc.includes(kw)) {
        return {
          category: rule.category,
          accountCode: rule.accountCode,
          type: rule.type,
          confidence: 90,
          requiresReview: false,
          matchRule: `Keyword matched: "${kw}"`,
        };
      }
    }
  }

  // Heuristic fallbacks
  if (desc.includes('upi/') || desc.includes('vpa')) {
    return {
      category: 'General Operating Expense',
      accountCode: '5090',
      type: 'EXPENSE',
      confidence: 55,
      requiresReview: true,
      matchRule: 'UPI payment heuristic (Review needed)',
    };
  }

  return {
    category: 'Uncategorized',
    accountCode: '5090',
    type: 'EXPENSE',
    confidence: 30,
    requiresReview: true,
    matchRule: 'Low confidence, human review required',
  };
}
