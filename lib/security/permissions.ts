/**
 * DHANVI ROLE-BASED ACCESS CONTROL (RBAC) & PERMISSION ARCHITECTURE
 */

export type UserRole = 'OWNER' | 'ACCOUNTANT' | 'STAFF';

export type Permission =
  | 'dashboard.view'
  | 'transactions.view'
  | 'transactions.create'
  | 'transactions.reverse'
  | 'accounts.view'
  | 'accounts.manage'
  | 'reports.view'
  | 'reports.export'
  | 'reconciliation.view'
  | 'reconciliation.manage'
  | 'customers.view'
  | 'customers.manage'
  | 'vendors.view'
  | 'vendors.manage'
  | 'products.view'
  | 'products.manage'
  | 'invoices.view'
  | 'invoices.manage'
  | 'assistant.use'
  | 'insights.view'
  | 'accountant.access'
  | 'settings.manage'
  | 'users.manage'
  | 'audit.view';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  OWNER: [
    'dashboard.view',
    'transactions.view',
    'transactions.create',
    'transactions.reverse',
    'accounts.view',
    'accounts.manage',
    'reports.view',
    'reports.export',
    'reconciliation.view',
    'reconciliation.manage',
    'customers.view',
    'customers.manage',
    'vendors.view',
    'vendors.manage',
    'products.view',
    'products.manage',
    'invoices.view',
    'invoices.manage',
    'assistant.use',
    'insights.view',
    'accountant.access',
    'settings.manage',
    'users.manage',
    'audit.view',
  ],
  ACCOUNTANT: [
    'dashboard.view',
    'transactions.view',
    'transactions.create',
    'transactions.reverse',
    'accounts.view',
    'accounts.manage',
    'reports.view',
    'reports.export',
    'reconciliation.view',
    'reconciliation.manage',
    'customers.view',
    'customers.manage',
    'vendors.view',
    'vendors.manage',
    'products.view',
    'invoices.view',
    'invoices.manage',
    'assistant.use',
    'insights.view',
    'accountant.access',
    'audit.view',
  ],
  STAFF: [
    'dashboard.view',
    'transactions.view',
    'transactions.create',
    'customers.view',
    'vendors.view',
    'products.view',
    'products.manage',
    'invoices.view',
    'assistant.use',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (role === 'OWNER') return true;

  if (pathname.startsWith('/reports')) {
    return hasPermission(role, 'reports.view');
  }
  if (pathname.startsWith('/reconciliation') || pathname.startsWith('/bank-reconciliation')) {
    return hasPermission(role, 'reconciliation.view');
  }
  if (pathname.startsWith('/accounts') || pathname.startsWith('/ledger')) {
    return hasPermission(role, 'accounts.view');
  }
  if (pathname.startsWith('/accountant')) {
    return hasPermission(role, 'accountant.access');
  }
  if (pathname.startsWith('/admin')) {
    return role === 'ACCOUNTANT';
  }
  if (pathname.startsWith('/settings')) {
    return false;
  }

  return true;
}
