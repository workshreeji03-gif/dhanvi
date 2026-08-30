'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Phone, Mail, MapPin, ArrowRight, Search, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, addNewCustomer } from '../../../lib/supabase/demo-store';
import { formatINR } from '../../../lib/accounting/money';

export default function CustomersPage() {
  const { state } = useDhanviState();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State initialized clean
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [city, setCity] = useState('');
  const [custState, setCustState] = useState('');
  const [pincode, setPincode] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const [notes, setNotes] = useState('');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading customers...</div>;

  const filteredCustomers = state.customers.filter((c) => {
    if (search.trim() === '') return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone?.includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.gstin?.toLowerCase().includes(q)
    );
  });

  const totalOutstanding = state.customers.reduce((acc, c) => acc + (c.opening_balance || 0), 0);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addNewCustomer(state, {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      gstin: gstin.trim(),
      city: city.trim(),
      state: custState.trim(),
      pincode: pincode.trim(),
      openingBalance: parseFloat(openingBalance) || 0,
      notes: notes.trim(),
    });

    showToast('Customer Created', `${name.trim()} added to customer directory.`);
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setGstin('');
    setCity('');
    setCustState('');
    setPincode('');
    setOpeningBalance('');
    setNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Customers & Receivables
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Accounts receivable ledger, customer profiles, and credit management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-4 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-3 shadow-xs">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-semibold">Total Outstanding</p>
              <MoneyDisplay amount={totalOutstanding} size="lg" colored className="text-emerald-700 font-bold" />
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Add Customer
          </Button>
        </div>
      </div>

      {state.customers.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No customers yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Add your customers to track accounts receivable, generate GST invoices, and maintain client statements.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Add Customer
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
                placeholder="Search by customer name, phone, email, or GSTIN..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
              />
            </div>
          </Card>

          {/* Customer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCustomers.map((cust) => (
              <Card key={cust.id} className="p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/customers/${cust.id}`} className="hover:underline">
                        <h3 className="font-bold text-base text-neutral-900">{cust.name}</h3>
                      </Link>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        GSTIN: {cust.gstin || 'Unregistered'}
                      </p>
                    </div>
                    <Badge variant={cust.opening_balance > 0 ? 'warning' : 'success'}>
                      {cust.opening_balance > 0 ? 'Payment Due' : 'Zero Balance'}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{cust.phone || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{cust.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{cust.address?.city || cust.address?.state ? `${cust.address.city}, ${cust.address.state}` : 'Location unrecorded'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400">Receivable Balance</span>
                    <p className="font-mono font-bold text-sm text-neutral-900">
                      {formatINR(cust.opening_balance || 0)}
                    </p>
                  </div>
                  <Link href={`/customers/${cust.id}`}>
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

      {/* ADD CUSTOMER MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
        description="Create customer profile and establish debtor account in the receivables ledger."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-neutral-700">Customer / Trade Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mehta Traders"
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
                placeholder="e.g. +91 98200 12345"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. billing@mehtatraders.in"
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
                placeholder="e.g. 29ABCDE1234F1Z5"
                className="w-full px-3.5 py-2.5 font-mono uppercase bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Opening Receivable Balance (₹)</label>
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
              <label className="block font-semibold mb-1 text-neutral-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Ahmedabad"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">State</label>
              <input
                type="text"
                value={custState}
                onChange={(e) => setCustState(e.target.value)}
                placeholder="e.g. Gujarat"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 380001"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
