'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, Phone, Mail, Landmark, ArrowRight, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, addNewVendor } from '../../../lib/supabase/demo-store';
import { formatINR } from '../../../lib/accounting/money';

export default function VendorsPage() {
  const { state } = useDhanviState();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State initialized clean
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const [notes, setNotes] = useState('');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading vendors...</div>;

  const filteredVendors = state.vendors.filter((v) => {
    if (search.trim() === '') return true;
    const q = search.toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      v.phone?.includes(q) ||
      v.email?.toLowerCase().includes(q) ||
      v.gstin?.toLowerCase().includes(q)
    );
  });

  const totalPayable = state.vendors.reduce((acc, v) => acc + (v.opening_balance || 0), 0);

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addNewVendor(state, {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      gstin: gstin.trim(),
      bankName: bankName.trim(),
      accountNumber: accountNumber.trim(),
      ifscCode: ifscCode.trim(),
      openingBalance: parseFloat(openingBalance) || 0,
      notes: notes.trim(),
    });

    showToast('Vendor Created', `${name.trim()} added to vendor directory.`);
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setGstin('');
    setBankName('');
    setAccountNumber('');
    setIfscCode('');
    setOpeningBalance('');
    setNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Vendors & Accounts Payable
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Supplier ledgers, GSTIN records, bank payout details, and purchase bills
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-4 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-3 shadow-xs">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-semibold">Total Payable</p>
              <MoneyDisplay amount={totalPayable} size="lg" colored className="text-rose-600 font-bold" />
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Add Vendor
          </Button>
        </div>
      </div>

      {state.vendors.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No vendors yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Add your vendors and suppliers to track bills, maintain creditor balances, and log input tax credits.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Add Vendor
          </Button>
        </Card>
      ) : (
        <>
          {/* Search Bar */}
          <Card className="p-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by vendor name, phone, email, or GSTIN..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
              />
            </div>
          </Card>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/vendors/${vendor.id}`} className="hover:underline">
                        <h3 className="font-bold text-base text-neutral-900">{vendor.name}</h3>
                      </Link>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        GSTIN: {vendor.gstin || 'Unregistered'}
                      </p>
                    </div>
                    <Badge variant={vendor.opening_balance > 0 ? 'warning' : 'success'}>
                      {vendor.opening_balance > 0 ? 'Payable Due' : 'Settled'}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{vendor.phone || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{vendor.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Landmark className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{vendor.bankDetails?.bankName ? `${vendor.bankDetails.bankName} • ${vendor.bankDetails.accountNumber}` : 'Bank details unrecorded'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400">Payable Balance</span>
                    <p className="font-mono font-bold text-sm text-neutral-900">
                      {formatINR(vendor.opening_balance || 0)}
                    </p>
                  </div>
                  <Link href={`/vendors/${vendor.id}`}>
                    <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Ledger
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ADD VENDOR MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Vendor / Supplier"
        description="Create supplier profile and establish creditor account in accounts payable."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateVendor} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Vendor / Business Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. National Textiles Ltd."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98211 54321"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. accounts@nationaltextiles.in"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Opening Payable Balance (₹)</label>
              <input
                type="number"
                step="0.01"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. HDFC Bank"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 50100234567890"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">IFSC Code</label>
              <input
                type="text"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                placeholder="e.g. HDFC0000123"
                className="w-full px-3.5 py-2.5 font-mono uppercase bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Save Vendor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
