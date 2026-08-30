/**
 * DHANVI REACTIVE STATE STORE & MUTATION ENGINE
 * 
 * Provides unified state management with real-time reactive event broadcast,
 * full double-entry persistence, multi-location stock tracking, customer/vendor ledgers,
 * and robust role switching.
 * 
 * Production default: 100% CLEAN BUSINESS STATE (No fake demo data)
 */

import { useState, useEffect } from 'react';
import { STANDARD_CHART_OF_ACCOUNTS } from '../accounting/accounts';
import { buildCompleteDemoLedger } from '../demo-data/sharma-wholesale';
import { Account, JournalEntry, Transaction, TransactionType, PaymentMethod } from '../accounting/types';
import { generateJournalLinesForTransaction } from '../accounting/transactions';
import { createJournalEntry, createReversalEntry } from '../accounting/journal';
import { UserRole } from '../security/permissions';
import { roundMoney, subtractMoney } from '../accounting/money';

export interface Location {
  id: string;
  businessId: string;
  name: string;
  code: string;
  address?: string;
  isPrimary: boolean;
}

export interface StockMovement {
  id: string;
  productId: string;
  locationId: string;
  locationName: string;
  type: 'PURCHASE' | 'SALE' | 'TRANSFER' | 'ADJUSTMENT' | 'OPENING';
  quantity: number;
  date: string;
  reference: string;
  notes?: string;
}

export interface ProductLocationStock {
  productId: string;
  locationId: string;
  locationName: string;
  quantity: number;
}

export interface AppState {
  business: {
    id: string;
    name: string;
    legalName?: string;
    gstin?: string;
    pan?: string;
    currency: string;
    industry?: string;
    businessSize?: string;
    fiscalYearStart: number;
    address?: Record<string, any>;
    createdAt: string;
  };
  members: {
    id: string;
    businessId: string;
    name: string;
    email: string;
    role: UserRole;
  }[];
  accounts: Account[];
  customers: any[];
  vendors: any[];
  products: any[];
  locations: Location[];
  productLocationStocks: ProductLocationStock[];
  stockMovements: StockMovement[];
  bankAccounts: any[];
  transactions: Transaction[];
  journalEntries: JournalEntry[];
  invoices: any[];
  notifications: any[];
  userRole: UserRole;
}

const STORAGE_KEY = 'dhanvi_app_state_v3';
const STATE_EVENT = 'dhanvi:state_change';

let memoryState: AppState | null = null;
const stateListeners = new Set<(state: AppState) => void>();

/**
 * Creates a 100% clean, unpolluted business state for a newly registered user.
 */
export function createCleanAppState(
  businessName: string = 'My Business',
  userName: string = 'Owner',
  userEmail: string = ''
): AppState {
  const businessId = `biz_${Date.now()}`;
  
  const standardAccounts: Account[] = STANDARD_CHART_OF_ACCOUNTS.map((acc) => ({
    ...acc,
    id: `acc_${acc.code}`,
    businessId,
    createdAt: new Date().toISOString(),
  }));

  return {
    business: {
      id: businessId,
      name: businessName,
      legalName: businessName,
      currency: 'INR',
      gstin: '',
      pan: '',
      industry: 'General Business',
      businessSize: '1-10 Employees',
      fiscalYearStart: 4,
      createdAt: new Date().toISOString(),
    },
    members: [
      {
        id: `mem_${Date.now()}`,
        businessId,
        name: userName,
        email: userEmail,
        role: 'OWNER',
      },
    ],
    accounts: standardAccounts,
    customers: [],
    vendors: [],
    products: [],
    locations: [],
    productLocationStocks: [],
    stockMovements: [],
    bankAccounts: [],
    transactions: [],
    journalEntries: [],
    invoices: [],
    notifications: [],
    userRole: 'OWNER',
  };
}

export function getInitialAppState(): AppState {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.business && parsed.accounts) {
          memoryState = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read from localStorage:', e);
    }
  }

  if (memoryState) {
    return memoryState;
  }

  const def = createCleanAppState();
  memoryState = def;
  return def;
}

export const USER_REGISTERED_KEY = 'dhanvi_user_registered_v1';

export function isUserRegistered(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const isRegistered = localStorage.getItem(USER_REGISTERED_KEY);
    if (isRegistered === 'true') return true;

    // Check if app state already has a real configured business / member
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed.business?.name &&
        parsed.business.name !== 'My Business' &&
        parsed.business.name.trim().length > 0
      ) {
        localStorage.setItem(USER_REGISTERED_KEY, 'true');
        return true;
      }
      if (parsed.members?.[0]?.email && parsed.members[0].email.includes('@')) {
        localStorage.setItem(USER_REGISTERED_KEY, 'true');
        return true;
      }
    }
  } catch (e) {
    console.warn('Error reading registered status:', e);
  }
  return false;
}

export function markUserRegistered(registered: boolean = true): void {
  if (typeof window !== 'undefined') {
    try {
      if (registered) {
        localStorage.setItem(USER_REGISTERED_KEY, 'true');
      } else {
        localStorage.removeItem(USER_REGISTERED_KEY);
      }
    } catch (e) {
      console.warn('Error writing registered status:', e);
    }
  }
}

export function saveAppState(state: AppState): void {
  memoryState = state;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: state }));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }
  stateListeners.forEach((fn) => fn(state));
}

/**
 * DEVELOPMENT ONLY: Loads the full pre-populated demo scenario on explicit user request.
 */
export function loadDevDemoScenario(): AppState {
  const demo = buildCompleteDemoLedger();

  const locations: Location[] = [
    { id: 'loc_01', businessId: demo.business.id, name: 'Main Central Warehouse', code: 'WH-MAIN', address: 'Plot 42, Peenya Industrial Area, Bengaluru', isPrimary: true },
    { id: 'loc_02', businessId: demo.business.id, name: 'Retail Store & Demo Counter', code: 'STR-IND', address: '100ft Road, Indiranagar, Bengaluru', isPrimary: false },
    { id: 'loc_03', businessId: demo.business.id, name: 'B2B Distribution Hub', code: 'HUB-WFD', address: 'ITPL Main Rd, Whitefield, Bengaluru', isPrimary: false },
  ];

  const productLocationStocks: ProductLocationStock[] = [
    { productId: 'prod_01', locationId: 'loc_01', locationName: 'Main Central Warehouse', quantity: 120 },
    { productId: 'prod_01', locationId: 'loc_02', locationName: 'Retail Store & Demo Counter', quantity: 40 },
    { productId: 'prod_01', locationId: 'loc_03', locationName: 'B2B Distribution Hub', quantity: 20 },
    { productId: 'prod_02', locationId: 'loc_01', locationName: 'Main Central Warehouse', quantity: 160 },
    { productId: 'prod_02', locationId: 'loc_02', locationName: 'Retail Store & Demo Counter', quantity: 50 },
    { productId: 'prod_02', locationId: 'loc_03', locationName: 'B2B Distribution Hub', quantity: 30 },
    { productId: 'prod_03', locationId: 'loc_01', locationName: 'Main Central Warehouse', quantity: 65 },
    { productId: 'prod_03', locationId: 'loc_02', locationName: 'Retail Store & Demo Counter', quantity: 20 },
    { productId: 'prod_03', locationId: 'loc_03', locationName: 'B2B Distribution Hub', quantity: 10 },
    { productId: 'prod_04', locationId: 'loc_01', locationName: 'Main Central Warehouse', quantity: 8 },
    { productId: 'prod_04', locationId: 'loc_02', locationName: 'Retail Store & Demo Counter', quantity: 4 },
    { productId: 'prod_04', locationId: 'loc_03', locationName: 'B2B Distribution Hub', quantity: 2 },
  ];

  const stockMovements: StockMovement[] = [
    { id: 'sm_01', productId: 'prod_01', locationId: 'loc_01', locationName: 'Main Central Warehouse', type: 'PURCHASE', quantity: 150, date: '2026-08-04', reference: 'BILL-TG-9942', notes: 'Container batch import' },
    { id: 'sm_02', productId: 'prod_01', locationId: 'loc_01', locationName: 'Main Central Warehouse', type: 'SALE', quantity: -30, date: '2026-08-08', reference: 'INV-2026-081', notes: 'Dispatch to Apex Retail' },
    { id: 'sm_03', productId: 'prod_01', locationId: 'loc_02', locationName: 'Retail Store & Demo Counter', type: 'TRANSFER', quantity: 40, date: '2026-08-10', reference: 'TRF-01', notes: 'Restock Indiranagar store' },
    { id: 'sm_04', productId: 'prod_04', locationId: 'loc_01', locationName: 'Main Central Warehouse', type: 'SALE', quantity: -10, date: '2026-08-20', reference: 'INV-2026-094', notes: 'Bulk dispatch Metro Digital' },
  ];

  const invoices = [
    {
      id: 'inv_01',
      businessId: demo.business.id,
      invoiceNumber: 'INV-2026-081',
      type: 'SALES',
      customerId: 'cust_01',
      customerName: 'Apex Retail Electronics',
      invoiceDate: '2026-08-03',
      dueDate: '2026-08-18',
      subtotal: 139830.51,
      cgst: 12584.74,
      sgst: 12584.75,
      igst: 0,
      taxTotal: 25169.49,
      total: 165000,
      paidAmount: 65000,
      status: 'PARTIALLY_PAID',
      notes: 'Standard 15 days credit terms',
    },
    {
      id: 'inv_02',
      businessId: demo.business.id,
      invoiceNumber: 'INV-2026-094',
      type: 'SALES',
      customerId: 'cust_02',
      customerName: 'Metro Digital Mart',
      invoiceDate: '2026-08-08',
      dueDate: '2026-08-23',
      subtotal: 182203.39,
      cgst: 0,
      sgst: 0,
      igst: 32796.61,
      taxTotal: 32796.61,
      total: 215000,
      paidAmount: 0,
      status: 'OVERDUE',
      notes: 'Interstate sale to Maharashtra (IGST 18%)',
    },
  ];

  const notifications = [
    { id: 'notif_01', title: 'Packaging Spend Alert', message: 'Packaging & courier expenses are +31% higher than last month.', type: 'INSIGHT', isRead: false, createdAt: '2026-08-28T10:00:00Z' },
    { id: 'notif_02', title: 'Overdue Invoice #INV-2026-094', message: 'Payment of ₹2.15L from Metro Digital Mart is 5 days overdue.', type: 'INVOICE', isRead: false, createdAt: '2026-08-29T14:30:00Z' },
  ];

  const members = demo.members.map((m: any) => ({
    ...m,
    role: (m.role as UserRole) || 'OWNER',
  }));

  const state: AppState = {
    ...demo,
    members,
    locations,
    productLocationStocks,
    stockMovements,
    invoices,
    notifications,
    userRole: 'OWNER',
  };

  saveAppState(state);
  return state;
}

/**
 * Custom React Hook providing continuous live reactive updates
 */
export function useDhanviState(): {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
  setUserRole: (role: UserRole) => void;
  setBusinessEntity: (business: Partial<AppState['business']>) => void;
} {
  const [state, setState] = useState<AppState>(() => {
    return memoryState || getInitialAppState();
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.business && parsed.accounts) {
          setState(parsed);
          memoryState = parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage:', e);
    }

    const handleEvent = (e: any) => {
      if (e.detail) {
        setState(e.detail);
      }
    };

    window.addEventListener(STATE_EVENT, handleEvent);
    stateListeners.add(setState);

    return () => {
      window.removeEventListener(STATE_EVENT, handleEvent);
      stateListeners.delete(setState);
    };
  }, []);

  const updateState = (updater: (prev: AppState) => AppState) => {
    const next = updater(state);
    saveAppState(next);
  };

  const setUserRole = (role: UserRole) => {
    const next = { ...state, userRole: role };
    saveAppState(next);
  };

  const setBusinessEntity = (business: Partial<AppState['business']>) => {
    const next = { ...state, business: { ...state.business, ...business } };
    saveAppState(next);
  };

  return { state, updateState, setUserRole, setBusinessEntity };
}

// ----------------------------------------------------
// MUTATION ACTIONS WITH IMMEDIATE DOUBLE-ENTRY POSTING
// ----------------------------------------------------

export function postNewTransaction(
  state: AppState,
  txInput: {
    amount: number;
    date: string;
    type: TransactionType;
    category: string;
    paymentMethod: PaymentMethod;
    description: string;
    customAccountId?: string;
    customerId?: string;
    vendorId?: string;
  }
): { newState: AppState; newTransaction: Transaction; newJournalEntry: JournalEntry } {
  const lines = generateJournalLinesForTransaction({
    businessId: state.business.id,
    type: txInput.type,
    amount: txInput.amount,
    taxAmount: txInput.type === 'SALE' ? Math.round(txInput.amount * 0.18 / 1.18) : 0,
    paymentMethod: txInput.paymentMethod,
    description: txInput.description,
    accounts: state.accounts,
    customAccountId: txInput.customAccountId,
  });

  const newJournalEntry = createJournalEntry({
    businessId: state.business.id,
    entryDate: txInput.date,
    description: txInput.description,
    sourceType: 'TRANSACTION',
    lines,
  });

  const newTransaction: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    businessId: state.business.id,
    date: txInput.date,
    amount: txInput.amount,
    currency: 'INR',
    type: txInput.type,
    description: txInput.description,
    category: txInput.category,
    paymentMethod: txInput.paymentMethod,
    accountId: txInput.customAccountId,
    customerId: txInput.customerId,
    vendorId: txInput.vendorId,
    status: 'POSTED',
    isReconciled: false,
    source: 'MANUAL',
    journalEntryId: newJournalEntry.id,
    createdAt: new Date().toISOString(),
  };

  let updatedCustomers = state.customers;
  if (txInput.customerId) {
    updatedCustomers = state.customers.map((c) => {
      if (c.id === txInput.customerId) {
        const delta = txInput.type === 'PAYMENT_RECEIVED' ? -txInput.amount : txInput.type === 'SALE' ? txInput.amount : 0;
        return { ...c, opening_balance: roundMoney((c.opening_balance || 0) + delta) };
      }
      return c;
    });
  }

  let updatedVendors = state.vendors;
  if (txInput.vendorId) {
    updatedVendors = state.vendors.map((v) => {
      if (v.id === txInput.vendorId) {
        const delta = txInput.type === 'PAYMENT_SENT' ? -txInput.amount : txInput.type === 'PURCHASE' ? txInput.amount : 0;
        return { ...v, opening_balance: roundMoney((v.opening_balance || 0) + delta) };
      }
      return v;
    });
  }

  const newState: AppState = {
    ...state,
    customers: updatedCustomers,
    vendors: updatedVendors,
    transactions: [newTransaction, ...state.transactions],
    journalEntries: [newJournalEntry, ...state.journalEntries],
  };

  saveAppState(newState);
  return { newState, newTransaction, newJournalEntry };
}

export function reverseExistingTransaction(
  state: AppState,
  transactionId: string,
  reason: string
): { newState: AppState; reversalEntry: JournalEntry } {
  const tx = state.transactions.find((t) => t.id === transactionId);
  if (!tx || !tx.journalEntryId) {
    throw new Error('Transaction or associated journal entry not found.');
  }

  const originalEntry = state.journalEntries.find((j) => j.id === tx.journalEntryId);
  if (!originalEntry) {
    throw new Error('Original journal entry not found.');
  }

  const reversalEntry = createReversalEntry(originalEntry, reason);

  const updatedTransactions = state.transactions.map((t) =>
    t.id === transactionId ? { ...t, status: 'REVERSED' as const } : t
  );

  const updatedJournalEntries = state.journalEntries.map((j) =>
    j.id === originalEntry.id ? { ...j, status: 'REVERSED' as const } : j
  );

  const newState: AppState = {
    ...state,
    transactions: updatedTransactions,
    journalEntries: [reversalEntry, ...updatedJournalEntries],
  };

  saveAppState(newState);
  return { newState, reversalEntry };
}

export function addNewCustomer(state: AppState, customer: {
  name: string;
  phone?: string;
  email?: string;
  gstin?: string;
  city?: string;
  state?: string;
  pincode?: string;
  openingBalance?: number;
  notes?: string;
}): AppState {
  const newCust = {
    id: `cust_${Date.now()}`,
    businessId: state.business.id,
    name: customer.name,
    phone: customer.phone || '',
    email: customer.email || '',
    gstin: customer.gstin || '',
    address: {
      city: customer.city || '',
      state: customer.state || '',
      pincode: customer.pincode || '',
    },
    opening_balance: roundMoney(customer.openingBalance || 0),
    notes: customer.notes || '',
    createdAt: new Date().toISOString(),
  };

  const newState: AppState = {
    ...state,
    customers: [newCust, ...state.customers],
  };

  saveAppState(newState);
  return newState;
}

export function addNewVendor(state: AppState, vendor: {
  name: string;
  phone?: string;
  email?: string;
  gstin?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  openingBalance?: number;
  notes?: string;
}): AppState {
  const newVend = {
    id: `vend_${Date.now()}`,
    businessId: state.business.id,
    name: vendor.name,
    phone: vendor.phone || '',
    email: vendor.email || '',
    gstin: vendor.gstin || '',
    bank_details: {
      bank: vendor.bankName || '',
      a_c: vendor.accountNumber || '',
      ifsc: vendor.ifscCode || '',
    },
    opening_balance: roundMoney(vendor.openingBalance || 0),
    notes: vendor.notes || '',
    createdAt: new Date().toISOString(),
  };

  const newState: AppState = {
    ...state,
    vendors: [newVend, ...state.vendors],
  };

  saveAppState(newState);
  return newState;
}

export function addNewProduct(state: AppState, product: {
  name: string;
  sku: string;
  category?: string;
  purchasePrice: number;
  sellingPrice: number;
  openingStock: number;
  locationId?: string;
  minStockAlert?: number;
}): AppState {
  const newProd = {
    id: `prod_${Date.now()}`,
    businessId: state.business.id,
    name: product.name,
    sku: product.sku,
    category: product.category || 'General',
    purchasePrice: roundMoney(product.purchasePrice),
    sellingPrice: roundMoney(product.sellingPrice),
    stockQuantity: product.openingStock,
    minStockAlert: product.minStockAlert || 10,
    createdAt: new Date().toISOString(),
  };

  const locId = product.locationId || 'loc_main';
  const locName = 'Main Location';

  const newLocationStock: ProductLocationStock = {
    productId: newProd.id,
    locationId: locId,
    locationName: locName,
    quantity: product.openingStock,
  };

  const newMovement: StockMovement = {
    id: `sm_${Date.now()}`,
    productId: newProd.id,
    locationId: locId,
    locationName: locName,
    type: 'OPENING',
    quantity: product.openingStock,
    date: new Date().toISOString().split('T')[0],
    reference: 'INIT-STOCK',
    notes: 'Initial inventory intake',
  };

  const newState: AppState = {
    ...state,
    products: [newProd, ...state.products],
    productLocationStocks: [...state.productLocationStocks, newLocationStock],
    stockMovements: [newMovement, ...state.stockMovements],
  };

  saveAppState(newState);
  return newState;
}

export function addNewAccount(state: AppState, account: {
  code: string;
  name: string;
  type: Account['type'];
  subType?: Account['subType'];
  description?: string;
}): AppState {
  if (state.accounts.some((a) => a.code === account.code)) {
    throw new Error(`Account code ${account.code} already exists.`);
  }

  const newAcc: Account = {
    id: `acc_${account.code}`,
    businessId: state.business.id,
    code: account.code,
    name: account.name,
    type: account.type,
    subType: account.subType,
    description: account.description || '',
    currency: 'INR',
    isActive: true,
    isSystem: false,
    createdAt: new Date().toISOString(),
  };

  const newState: AppState = {
    ...state,
    accounts: [...state.accounts, newAcc].sort((a, b) => a.code.localeCompare(b.code)),
  };

  saveAppState(newState);
  return newState;
}
