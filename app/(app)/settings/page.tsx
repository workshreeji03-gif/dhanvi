'use client';

import React, { useState } from 'react';
import { Sliders, Building2, Users, ShieldCheck, RefreshCw, Database, Trash2, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, createCleanAppState, loadDevDemoScenario, saveAppState } from '../../../lib/supabase/demo-store';
import { useAuthContext } from '../../../lib/auth/user-context';

export default function SettingsPage() {
  const { state } = useDhanviState();
  const { currentProfile, logout } = useAuthContext();
  const [bizName, setBizName] = useState(state?.business?.name || 'My Business');
  const [gstin, setGstin] = useState(state?.business?.gstin || '');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading settings...</div>;

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...state,
      business: {
        ...state.business,
        name: bizName.trim() || 'My Business',
        legalName: bizName.trim() || 'My Business',
        gstin: gstin.trim().toUpperCase(),
      },
    };
    saveAppState(updated);
    showToast('Settings Saved', 'Business details updated successfully.');
  };

  const handleClearWorkspace = () => {
    if (confirm('Are you sure you want to clear this workspace and start with a fresh blank ledger?')) {
      const clean = createCleanAppState(
        state.business.name,
        currentProfile?.full_name || state.members[0]?.name,
        currentProfile?.email || state.members[0]?.email
      );
      saveAppState(clean);
      showToast('Workspace Reset', 'Started with fresh blank ledger and standard Chart of Accounts.');
    }
  };

  const handleLoadDevDemoScenario = () => {
    if (confirm('Load development sample scenario (25+ transactions, customers, vendors, and products)?')) {
      loadDevDemoScenario();
      showToast('Sample Scenario Loaded', 'Development scenario populated for testing.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Business Settings & Configuration
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Manage entity information, GST settings, user permissions, and ledger workspace
        </p>
      </div>

      {/* Business Details Form */}
      <Card>
        <CardHeader className="border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <CardTitle className="text-base">Business & GST Identity</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSaveBusiness} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-neutral-700">Business / Trade Name *</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-neutral-700">GSTIN (15 Digits)</label>
                <input
                  type="text"
                  maxLength={15}
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="e.g. 24AAAAA0000A1Z5"
                  className="w-full px-3.5 py-2.5 font-mono uppercase bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Workspace Team & Roles */}
      <Card>
        <CardHeader className="border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <CardTitle className="text-base">Workspace Members & Access Roles</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 text-xs">
            {state.members.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-neutral-900">{m.name}</p>
                  <p className="text-[11px] text-neutral-400">{m.email}</p>
                </div>
                <Badge variant={m.role === 'OWNER' ? 'success' : 'info'} size="sm">
                  {m.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workspace Management & Dev Tools */}
      <Card className="border-rose-100">
        <CardHeader className="border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-neutral-600" />
            <CardTitle className="text-base">Workspace Data Controls</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
            <div>
              <p className="font-bold text-neutral-900">Reset to Fresh Blank Ledger</p>
              <p className="text-neutral-500 mt-0.5">Wipe all current transactions and start completely fresh.</p>
            </div>
            <Button size="sm" variant="outline" onClick={handleClearWorkspace} leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-600" />} className="text-rose-600 hover:bg-rose-50 border-rose-200">
              Clear Workspace
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
            <div>
              <p className="font-bold text-emerald-950">Load Dev Sample Scenario</p>
              <p className="text-emerald-800 mt-0.5">Populate 25+ demo transactions, customers, vendors, and invoices.</p>
            </div>
            <Button size="sm" variant="outline" onClick={handleLoadDevDemoScenario} leftIcon={<RefreshCw className="w-3.5 h-3.5 text-emerald-600" />} className="text-emerald-700 hover:bg-emerald-50 border-emerald-300 bg-white">
              Load Sample Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
