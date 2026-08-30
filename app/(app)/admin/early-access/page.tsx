'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Users,
  Search,
  Phone,
  Mail,
  RefreshCw,
  Tag,
  ShieldCheck,
  ChevronDown,
  X,
  Building2,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Filter,
  RotateCcw,
  Sparkles,
  BarChart3,
  Globe,
  PieChart,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showToast } from '@/components/ui/toast';
import { useDhanviState } from '@/lib/supabase/demo-store';

export interface EarlyAccessLead {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email: string;
  phone?: string;
  business_name?: string;
  business_type?: string;
  employee_count?: string;
  role?: string;
  current_accounting?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'demo' | 'converted' | 'not_interested';
  notes?: string;
}

export interface AnalyticsData {
  totalSignups: number;
  thisMonthSignups: number;
  conversionRate: string;
  pipeline: {
    new: number;
    contacted: number;
    qualified: number;
    demo: number;
    converted: number;
  };
  businessTypes: Array<{ name: string; count: number; percentage: number }>;
  accountingSystems: Array<{ name: string; count: number; percentage: number }>;
  sources: Array<{ name: string; count: number; percentage: number }>;
  teamSizes: Array<{ name: string; count: number; percentage: number }>;
}

const STATUS_PIPELINE: Array<{
  value: EarlyAccessLead['status'];
  label: string;
  badgeClass: string;
}> = [
  { value: 'new', label: 'New', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { value: 'contacted', label: 'Contacted', badgeClass: 'bg-blue-50 text-blue-800 border-blue-200' },
  { value: 'qualified', label: 'Qualified', badgeClass: 'bg-purple-50 text-purple-800 border-purple-200' },
  { value: 'demo', label: 'Demo', badgeClass: 'bg-amber-50 text-amber-900 border-amber-200' },
  { value: 'converted', label: 'Converted', badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold' },
];

const BUSINESS_TYPE_OPTIONS = [
  'All',
  'Retail',
  'Wholesale',
  'Manufacturing',
  'Services',
  'E-commerce',
  'Professional Services',
  'Other',
];

const TEAM_SIZE_OPTIONS = [
  'All',
  '1–5',
  '6–10',
  '11–25',
  '26–50',
  '51–100',
  '100+',
];

const ACCOUNTING_OPTIONS = [
  'All',
  'Tally',
  'Excel / Google Sheets',
  'Zoho Books',
  'QuickBooks',
  'Busy',
  'Manual / Paper',
  'Other',
];

const SOURCE_OPTIONS = [
  { id: 'all', label: 'All Sources' },
  { id: 'landing_page', label: 'Landing Page' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'referral', label: 'Referral' },
  { id: 'google', label: 'Google' },
  { id: 'direct', label: 'Direct' },
];

const DATE_RANGE_OPTIONS = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: 'month', label: 'This Month' },
];

const ITEMS_PER_PAGE = 20;

function AdminEarlyAccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { state } = useDhanviState();
  const userRole = state.userRole || 'OWNER';

  // Filter States initialized from URL params
  const [search, setSearch] = useState<string>(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>(searchParams.get('business_type') || 'All');
  const [teamSizeFilter, setTeamSizeFilter] = useState<string>(searchParams.get('team_size') || 'All');
  const [accountingFilter, setAccountingFilter] = useState<string>(searchParams.get('accounting') || 'All');
  const [sourceFilter, setSourceFilter] = useState<string>(searchParams.get('source') || 'all');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>(searchParams.get('date_range') || 'all');

  const [leads, setLeads] = useState<EarlyAccessLead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLead, setSelectedLead] = useState<EarlyAccessLead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(true);

  // Sync state to URL Query Params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('q', search.trim());
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (businessTypeFilter !== 'All') params.set('business_type', businessTypeFilter);
    if (teamSizeFilter !== 'All') params.set('team_size', teamSizeFilter);
    if (accountingFilter !== 'All') params.set('accounting', accountingFilter);
    if (sourceFilter !== 'all') params.set('source', sourceFilter);
    if (dateRangeFilter !== 'all') params.set('date_range', dateRangeFilter);

    const queryString = params.toString();
    const newPath = queryString ? `/admin/early-access?${queryString}` : '/admin/early-access';
    router.replace(newPath, { scroll: false });
  }, [search, statusFilter, businessTypeFilter, teamSizeFilter, accountingFilter, sourceFilter, dateRangeFilter]);

  // Format date helper
  const formatJoinedDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;

      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      });
    } catch {
      return isoStr;
    }
  };

  const formatFullDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return (
        d.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    } catch {
      return isoStr;
    }
  };

  // Fetch leads and analytics
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (businessTypeFilter !== 'All') params.set('business_type', businessTypeFilter);
      if (teamSizeFilter !== 'All') params.set('team_size', teamSizeFilter);
      if (accountingFilter !== 'All') params.set('accounting', accountingFilter);
      if (sourceFilter !== 'all') params.set('source', sourceFilter);
      if (dateRangeFilter !== 'all') params.set('date_range', dateRangeFilter);

      const res = await fetch(`/api/early-access?${params.toString()}`);
      const data = await res.json();

      if (data.leads) {
        setLeads(data.leads);
        if (data.analytics) setAnalytics(data.analytics);

        if (selectedLead) {
          const fresh = data.leads.find((l: EarlyAccessLead) => l.id === selectedLead.id);
          if (fresh) setSelectedLead(fresh);
        }
      }
    } catch (err: any) {
      showToast('Error loading leads', err.message || 'Failed to fetch early access leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    setCurrentPage(1);
  }, [statusFilter, businessTypeFilter, teamSizeFilter, accountingFilter, sourceFilter, dateRangeFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
      setCurrentPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setBusinessTypeFilter('All');
    setTeamSizeFilter('All');
    setAccountingFilter('All');
    setSourceFilter('all');
    setDateRangeFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(search.trim()) ||
    statusFilter !== 'all' ||
    businessTypeFilter !== 'All' ||
    teamSizeFilter !== 'All' ||
    accountingFilter !== 'All' ||
    sourceFilter !== 'all' ||
    dateRangeFilter !== 'all';

  // Handle status update
  const handleUpdateStatus = async (leadId: string, newStatus: EarlyAccessLead['status']) => {
    const previousLead = leads.find((l) => l.id === leadId);
    if (!previousLead || previousLead.status === newStatus) return;

    const previousStatus = previousLead.status;
    setUpdatingId(leadId);

    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const res = await fetch('/api/early-access', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to update status.');
      }

      showToast('Status Updated', `Lead marked as ${newStatus.toUpperCase()}`, 'success');
      // Refresh analytics in background
      fetchLeads();
    } catch (err: any) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: previousStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: previousStatus } : null));
      }
      showToast('Unable to update status', err.message || 'Please try again.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(leads.length / ITEMS_PER_PAGE));
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return leads.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [leads, currentPage]);

  // RBAC Permission Check
  if (userRole !== 'OWNER' && userRole !== 'ACCOUNTANT') {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center font-sans">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 mb-4 border border-rose-200">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-950">Admin Authorization Required</h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-sm mx-auto">
          The Early Access dashboard is restricted to verified organization Owners and Administrators.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button size="sm">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-24">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 uppercase font-mono">
              EARLY ACCESS
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Admin CRM
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
            Manage and track businesses interested in Dhanvi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
            leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
          >
            {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <Card className="p-4 bg-card border-border shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
            Total Signups
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-neutral-950">
            {analytics?.totalSignups ?? leads.length}
          </p>
        </Card>

        <Card className="p-4 bg-emerald-50/60 border-emerald-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
            This Month
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-emerald-950">
            {analytics?.thisMonthSignups ?? 0}
          </p>
        </Card>

        <Card className="p-4 bg-blue-50/50 border-blue-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 font-mono">
            Contacted
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-blue-950">
            {analytics?.pipeline.contacted ?? 0}
          </p>
        </Card>

        <Card className="p-4 bg-purple-50/50 border-purple-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 font-mono">
            Qualified
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-purple-950">
            {analytics?.pipeline.qualified ?? 0}
          </p>
        </Card>

        <Card className="p-4 bg-amber-50/50 border-amber-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 font-mono">
            Demo
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-amber-950">
            {analytics?.pipeline.demo ?? 0}
          </p>
        </Card>

        <Card className="p-4 bg-card border-border shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Converted ({analytics?.conversionRate || '0.0'}%)
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {analytics?.pipeline.converted ?? 0}
          </p>
        </Card>
      </div>

      {/* 3. Analytics Breakdown Section (Collapsible) */}
      {showAnalytics && analytics && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              EARLY ACCESS ANALYTICS & BREAKDOWN
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Business Types */}
            <Card className="p-5 border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-neutral-900 font-mono uppercase tracking-wider block mb-3">
                Business Types
              </span>
              <div className="space-y-2.5">
                {analytics.businessTypes.slice(0, 5).map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800">{item.name}</span>
                      <span className="font-mono text-neutral-500 font-semibold">{item.percentage}% ({item.count})</span>
                    </div>
                    <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Current Accounting Systems */}
            <Card className="p-5 border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-neutral-900 font-mono uppercase tracking-wider block mb-3">
                Current Accounting Systems
              </span>
              <div className="space-y-2.5">
                {analytics.accountingSystems.slice(0, 5).map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800">{item.name}</span>
                      <span className="font-mono text-neutral-500 font-semibold">{item.percentage}% ({item.count})</span>
                    </div>
                    <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Signup Sources */}
            <Card className="p-5 border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-neutral-900 font-mono uppercase tracking-wider block mb-3">
                Signup Sources
              </span>
              <div className="space-y-2.5">
                {analytics.sources.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800 capitalize font-mono">
                        {item.name.replace('_', ' ')}
                      </span>
                      <span className="font-mono text-neutral-500 font-semibold">{item.percentage}% ({item.count})</span>
                    </div>
                    <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 4. Advanced Multi-Filter & Search Bar */}
      <Card className="p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, business, or email..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-neutral-950"
            />
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New' },
              { id: 'contacted', label: 'Contacted' },
              { id: 'qualified', label: 'Qualified' },
              { id: 'demo', label: 'Demo' },
              { id: 'converted', label: 'Converted' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === st.id
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-border/60 text-xs">
          {/* Business Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-1">
              Business Type
            </label>
            <select
              value={businessTypeFilter}
              onChange={(e) => setBusinessTypeFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-muted/30 border border-border rounded-lg text-xs font-medium text-neutral-900 outline-none"
            >
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-1">
              Team Size
            </label>
            <select
              value={teamSizeFilter}
              onChange={(e) => setTeamSizeFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-muted/30 border border-border rounded-lg text-xs font-medium text-neutral-900 outline-none"
            >
              {TEAM_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Accounting */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-1">
              Accounting
            </label>
            <select
              value={accountingFilter}
              onChange={(e) => setAccountingFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-muted/30 border border-border rounded-lg text-xs font-medium text-neutral-900 outline-none"
            >
              {ACCOUNTING_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-1">
              Source
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-muted/30 border border-border rounded-lg text-xs font-medium text-neutral-900 outline-none"
            >
              {SOURCE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range & Clear */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-1">
                Date
              </label>
              <select
                value={dateRangeFilter}
                onChange={(e) => setDateRangeFilter(e.target.value)}
                className="w-full py-1.5 px-2 bg-muted/30 border border-border rounded-lg text-xs font-medium text-neutral-900 outline-none"
              >
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="p-2 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                title="Clear all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* 5. Leads Table */}
      <Card className="overflow-hidden border border-border shadow-xs">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-neutral-600 font-semibold uppercase tracking-wider font-mono">
                <th className="py-3 px-5">Person</th>
                <th className="py-3 px-4">Business</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                    <span className="font-semibold text-neutral-700">Loading early access leads...</span>
                  </td>
                </tr>
              ) : paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <Users className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                    <p className="font-bold text-neutral-950 text-sm">No early access signups yet.</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {hasActiveFilters
                        ? 'No signups match the selected filters.'
                        : 'New signups will appear here automatically.'}
                    </p>
                    {hasActiveFilters && (
                      <Button size="sm" variant="outline" className="mt-4" onClick={handleClearFilters}>
                        Reset Filters
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => {
                  const displayName = lead.name || lead.full_name || 'Unknown';
                  const initial = displayName.charAt(0).toUpperCase() || 'D';
                  const statusObj = STATUS_PIPELINE.find((s) => s.value === lead.status) || {
                    label: lead.status,
                    badgeClass: 'bg-neutral-100 text-neutral-700 border-neutral-200',
                  };

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-emerald-50/30 transition-colors cursor-pointer group"
                    >
                      {/* Person */}
                      <td className="py-3.5 px-5 font-semibold text-neutral-950">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 font-mono">
                            {initial}
                          </span>
                          <span className="font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">
                            {displayName}
                          </span>
                        </div>
                      </td>

                      {/* Business */}
                      <td className="py-3.5 px-4 font-medium text-neutral-800">
                        <div>
                          <p className="font-semibold text-neutral-900">{lead.business_name || '—'}</p>
                          <p className="text-[10px] text-neutral-500">{lead.business_type || 'General'}</p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 font-mono text-neutral-600">
                        <span className="truncate max-w-[180px] inline-block">{lead.email}</span>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 capitalize">
                          {lead.source || 'direct'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${statusObj.badgeClass}`}
                        >
                          {statusObj.label}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-5 text-right font-mono text-neutral-500 whitespace-nowrap">
                        {formatJoinedDate(lead.created_at)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-border">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
              <span>Loading early access leads...</span>
            </div>
          ) : paginatedLeads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="font-bold text-neutral-950">No early access signups found.</p>
            </div>
          ) : (
            paginatedLeads.map((lead) => {
              const displayName = lead.name || lead.full_name || 'Unknown';
              const statusObj = STATUS_PIPELINE.find((s) => s.value === lead.status) || {
                label: lead.status,
                badgeClass: 'bg-neutral-100 text-neutral-700 border-neutral-200',
              };

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-4 active:bg-neutral-50 cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-950">{displayName}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border ${statusObj.badgeClass}`}
                    >
                      {statusObj.label}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-700 font-medium">{lead.business_name || '—'}</div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                    <span>{lead.email}</span>
                    <span className="capitalize">{lead.source || 'direct'}</span>
                    <span>{formatJoinedDate(lead.created_at)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Bar */}
        {leads.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between border-t border-border px-5 py-3 bg-muted/20 text-xs font-mono">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <span className="text-neutral-500 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </Card>

      {/* 6. Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={() => setSelectedLead(null)}
            className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs cursor-pointer"
          />

          <div className="relative w-full max-w-lg bg-card rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl overflow-hidden animate-fade-up flex flex-col max-h-[85vh]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/30">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm font-mono">
                  {(selectedLead.name || selectedLead.full_name || 'D').charAt(0).toUpperCase()}
                </span>
                <div>
                  <h3 className="font-bold text-base text-neutral-950">
                    {selectedLead.name || selectedLead.full_name || 'Unknown Lead'}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">{selectedLead.id}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Business
                  </span>
                  <p className="font-bold text-neutral-950">{selectedLead.business_name || '—'}</p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Business Type
                  </span>
                  <p className="font-semibold text-neutral-800">{selectedLead.business_type || 'General'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="font-mono text-emerald-700 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Phone
                  </span>
                  {selectedLead.phone ? (
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-mono text-neutral-900 hover:underline font-semibold"
                    >
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <span className="text-neutral-400 font-mono">Not provided</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Team Size
                  </span>
                  <p className="font-semibold text-neutral-800">
                    {selectedLead.employee_count || selectedLead.role || '—'}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Accounting
                  </span>
                  <p className="font-semibold text-neutral-800">
                    {selectedLead.current_accounting || '—'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Signup Source
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-neutral-100 text-neutral-800 capitalize border border-neutral-200">
                    {selectedLead.source || 'direct'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                    Joined
                  </span>
                  <p className="font-mono text-neutral-700 text-xs">
                    {formatFullDate(selectedLead.created_at)}
                  </p>
                </div>
              </div>

              {/* Status Selector */}
              <div className="pt-4 border-t border-border">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-950 font-mono block mb-2">
                  Change Status Pipeline
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {STATUS_PIPELINE.map((st) => (
                    <button
                      key={st.value}
                      type="button"
                      disabled={updatingId === selectedLead.id}
                      onClick={() => handleUpdateStatus(selectedLead.id, st.value)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer text-center ${
                        selectedLead.status === st.value
                          ? `${st.badgeClass} ring-2 ring-neutral-950`
                          : 'bg-card text-neutral-600 border-border hover:bg-neutral-100 hover:text-neutral-950'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 bg-muted/20 flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setSelectedLead(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminEarlyAccessDashboard() {
  return (
    <React.Suspense
      fallback={
        <div className="p-16 text-center text-xs font-mono text-neutral-500">
          Loading Early Access CRM...
        </div>
      }
    >
      <AdminEarlyAccessContent />
    </React.Suspense>
  );
}
