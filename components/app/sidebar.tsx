'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Receipt,
  FileSpreadsheet,
  FileText,
  Users,
  Building2,
  Package,
  FileBarChart2,
  Scale,
  Sparkles,
  Zap,
  Briefcase,
  Sliders,
  LogOut,
  X,
} from 'lucide-react';
import { useDhanviState } from '../../lib/supabase/demo-store';
import { canAccessRoute, UserRole } from '../../lib/security/permissions';
import { Badge } from '../ui/badge';
import { useAuthContext } from '../../lib/auth/user-context';
import { Logo } from '../landing/logo';

export interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const { state } = useDhanviState();
  const { logout, currentProfile } = useAuthContext();
  const currentRole: UserRole = state.userRole || 'OWNER';

  const allNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Transactions', href: '/transactions', icon: Receipt },
    { label: 'Accounts & Ledger', href: '/accounts', icon: FileSpreadsheet },
    { label: 'Invoices & Bills', href: '/invoices', icon: FileText },
    { label: 'Customers', href: '/customers', icon: Users },
    { label: 'Vendors', href: '/vendors', icon: Building2 },
    { label: 'Products & Stock', href: '/products', icon: Package },
    { label: 'Financial Reports', href: '/reports', icon: FileBarChart2 },
    { label: 'Bank Reconciliation', href: '/reconciliation', icon: Scale },
    { label: 'Ask Dhanvi AI', href: '/assistant', icon: Sparkles },
    { label: 'AI Health Insights', href: '/insights', icon: Zap },
    { label: 'Accountant Command', href: '/accountant', icon: Briefcase },
    { label: 'Early Access', href: '/admin/early-access', icon: Users },
    { label: 'Business Settings', href: '/settings', icon: Sliders },
  ];

  // Filter based on active RBAC role
  const navItems = allNavItems.filter((item) => canAccessRoute(currentRole, item.href));
  const memberName = currentProfile?.full_name || state.members?.[0]?.name || 'Business Owner';
  const bizName = state.business?.name || 'My Business';

  // Generate initials for avatar
  const initials = memberName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DH';

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-[1px_0_4px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col min-h-0">
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <Logo className="h-8 w-24 object-contain" />
          </Link>

          <div className="flex items-center gap-1.5">
            <Badge
              variant={currentRole === 'OWNER' ? 'neutral' : currentRole === 'ACCOUNTANT' ? 'info' : 'success'}
              size="sm"
            >
              {currentRole}
            </Badge>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group select-none',
                  isActive
                    ? 'bg-positive/[0.08] text-foreground font-semibold border-l-2 border-positive shadow-2xs'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon
                  className={clsx(
                    'w-4 h-4 shrink-0 transition-colors',
                    isActive ? 'text-positive' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3.5 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-positive/15 border border-positive/30 text-positive font-bold text-xs flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {memberName}
            </p>
            <p className="text-[11px] text-muted-foreground truncate font-mono">
              {bizName}
            </p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-50/80 rounded-lg cursor-pointer transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
