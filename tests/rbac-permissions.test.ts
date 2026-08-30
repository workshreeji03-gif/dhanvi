import { describe, it, expect } from 'vitest';
import { hasPermission, canAccessRoute } from '../lib/security/permissions';

describe('Role-Based Access Control (RBAC) Matrix', () => {
  it('OWNER role should have complete permission access', () => {
    expect(hasPermission('OWNER', 'dashboard.view')).toBe(true);
    expect(hasPermission('OWNER', 'reports.view')).toBe(true);
    expect(hasPermission('OWNER', 'reconciliation.manage')).toBe(true);
    expect(hasPermission('OWNER', 'settings.manage')).toBe(true);
    expect(hasPermission('OWNER', 'users.manage')).toBe(true);
    expect(canAccessRoute('OWNER', '/reports/profit-loss')).toBe(true);
    expect(canAccessRoute('OWNER', '/settings')).toBe(true);
  });

  it('ACCOUNTANT role should have financial reporting access but restricted from owner settings', () => {
    expect(hasPermission('ACCOUNTANT', 'reports.view')).toBe(true);
    expect(hasPermission('ACCOUNTANT', 'reconciliation.view')).toBe(true);
    expect(hasPermission('ACCOUNTANT', 'accounts.manage')).toBe(true);
    expect(hasPermission('ACCOUNTANT', 'settings.manage')).toBe(false);
    expect(hasPermission('ACCOUNTANT', 'users.manage')).toBe(false);
    expect(canAccessRoute('ACCOUNTANT', '/reports/balance-sheet')).toBe(true);
    expect(canAccessRoute('ACCOUNTANT', '/settings')).toBe(false);
  });

  it('STAFF role should be restricted from sensitive financial statements and settings', () => {
    expect(hasPermission('STAFF', 'transactions.create')).toBe(true);
    expect(hasPermission('STAFF', 'products.view')).toBe(true);
    expect(hasPermission('STAFF', 'reports.view')).toBe(false);
    expect(hasPermission('STAFF', 'reconciliation.view')).toBe(false);
    expect(hasPermission('STAFF', 'settings.manage')).toBe(false);
    expect(canAccessRoute('STAFF', '/reports/profit-loss')).toBe(false);
    expect(canAccessRoute('STAFF', '/reconciliation')).toBe(false);
    expect(canAccessRoute('STAFF', '/settings')).toBe(false);
  });
});
