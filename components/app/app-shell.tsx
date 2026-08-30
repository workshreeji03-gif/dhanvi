'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Menu } from 'lucide-react';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';
import { ToastContainer } from '../ui/toast';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useDhanviState, isUserRegistered } from '../../lib/supabase/demo-store';
import { canAccessRoute } from '../../lib/security/permissions';
import { AuthProvider } from '../../lib/auth/user-context';
import { AppAskDhanviFab } from './app-ask-dhanvi-fab';

const AppShellContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useDhanviState();
  const userRole = state?.userRole || 'OWNER';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If not registered and on client side, direct to registration
    if (typeof window !== 'undefined' && !isUserRegistered()) {
      router.replace('/signup');
    }
  }, [router]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAllowed = canAccessRoute(userRole, pathname);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex text-neutral-900 relative selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* Background dotted grid texture */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 opacity-[0.25] z-0"
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-20">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white z-50 shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopNav onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-5 sm:p-7 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {!isAllowed ? (
            <Card className="p-12 text-center max-w-lg mx-auto my-12 space-y-4 bg-white border border-neutral-200/80 shadow-xs rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900">Access Restricted</h2>
                <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                  Your current active role ({userRole}) does not have permission to view sensitive financial statements or administrative settings.
                </p>
              </div>
              <Link href="/dashboard">
                <Button size="sm" variant="outline" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                  Return to Dashboard
                </Button>
              </Link>
            </Card>
          ) : (
            children
          )}
        </main>
      </div>
      <AppAskDhanviFab />
      <ToastContainer />
    </div>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <AppShellContent>{children}</AppShellContent>
    </AuthProvider>
  );
};
