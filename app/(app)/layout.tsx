'use client';

import React from 'react';
import { AppShell } from '../../components/app/app-shell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
