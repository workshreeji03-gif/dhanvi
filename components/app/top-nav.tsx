'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Bell, Building2, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDhanviState, postNewTransaction } from '../../lib/supabase/demo-store';
import { UserRole } from '../../lib/security/permissions';
import { AddTransactionModal } from '../accounting/add-transaction-modal';
import { showToast } from '../ui/toast';

export interface TopNavProps {
  onToggleMobileMenu?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleMobileMenu }) => {
  const { state, setUserRole } = useDhanviState();
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);

  const currentRole: UserRole = state.userRole || 'OWNER';
  const unreadNotifs = state.notifications?.filter((n) => !n.isRead).length || 0;
  const bizName = state.business?.name || 'My Business';

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    showToast('Role Switched', `Active session perspective switched to ${role}.`, 'info');
  };

  const handlePostTransaction = (tx: any) => {
    postNewTransaction(state, tx);
    showToast('Transaction Posted', 'Transaction and balanced double-entry journal lines posted to General Ledger.');
  };

  return (
    <header className="h-16 bg-card/90 backdrop-blur-md border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-positive hidden sm:block" />
          <span className="font-semibold text-sm text-foreground truncate max-w-[180px] sm:max-w-xs">
            {bizName}
          </span>
        </div>
        <span className="text-border hidden sm:inline">•</span>
        <Badge variant="neutral" size="sm" className="font-mono text-[11px] hidden sm:inline-flex bg-muted/60 text-muted-foreground border-border">
          {state.business?.gstin ? `GSTIN: ${state.business.gstin}` : 'FY 2025–26'}
        </Badge>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Role Switcher Pill */}
        <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-full text-xs border border-border">
          <span className="text-[10px] text-muted-foreground pl-2 font-semibold uppercase tracking-wider hidden md:inline">
            Role:
          </span>
          {(['OWNER', 'ACCOUNTANT', 'STAFF'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all ${
                currentRole === r
                  ? 'bg-card text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifs > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-positive rounded-full ring-2 ring-card" />
          )}
        </Link>

        {/* Add Transaction Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsAddTxOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5 text-positive" />}
          className="border-positive/60 text-positive bg-card hover:bg-positive/[0.06] font-semibold rounded-full px-4 shadow-xs transition-all"
        >
          Add Transaction
        </Button>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        accounts={state.accounts}
        customers={state.customers}
        vendors={state.vendors}
        onPostTransaction={handlePostTransaction}
      />
    </header>
  );
};
