'use client';

import React from 'react';
import { Bell, CheckCircle2, Sparkles, FileSpreadsheet, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useDhanviState, saveAppState } from '../../../lib/supabase/demo-store';
import { formatDate } from '../../../lib/utils/formatters';
import { showToast } from '../../../components/ui/toast';

export default function NotificationsPage() {
  const { state } = useDhanviState();

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading notifications...</div>;

  const handleMarkAllRead = () => {
    const updatedNotifs = state.notifications.map((n) => ({ ...n, isRead: true }));
    const updated = { ...state, notifications: updatedNotifs };
    saveAppState(updated);
    showToast('Notifications Updated', 'All system alerts marked as read.');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Notifications & System Alerts
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time signals on AI insights, balance audits, and ledger exceptions
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          Mark All as Read
        </Button>
      </div>

      <Card>
        {state.notifications.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-neutral-900">No unread notifications</p>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              You will receive real-time alerts for invoice OCR approvals, reconciliation matches, and health signals.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 text-xs">
            {state.notifications.map((n) => (
              <div key={n.id} className={`p-4 flex items-start gap-3.5 ${n.isRead ? 'opacity-70 bg-white' : 'bg-emerald-50/20'}`}>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 mt-0.5 border border-emerald-100">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-neutral-900">{n.title}</h3>
                    <span className="text-[10px] text-neutral-400 font-mono">{formatDate(n.createdAt)}</span>
                  </div>
                  <p className="text-neutral-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
