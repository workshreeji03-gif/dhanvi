'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Plus, Search, ArrowRight, AlertTriangle, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MoneyDisplay } from '../../../components/ui/money-display';
import { Modal } from '../../../components/ui/modal';
import { showToast } from '../../../components/ui/toast';
import { useDhanviState, addNewProduct } from '../../../lib/supabase/demo-store';
import { formatINR } from '../../../lib/accounting/money';

export default function ProductsPage() {
  const { state } = useDhanviState();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State initialized clean
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [openingStock, setOpeningStock] = useState('');
  const [locationId, setLocationId] = useState('');
  const [minStockAlert, setMinStockAlert] = useState('10');

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading products...</div>;

  const filteredProducts = state.products.filter((p) => {
    if (search.trim() === '') return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  const totalInventoryValue = state.products.reduce((acc, p) => acc + (p.purchasePrice * p.stockQuantity), 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim()) return;

    addNewProduct(state, {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category: category.trim() || 'General',
      purchasePrice: parseFloat(purchasePrice) || 0,
      sellingPrice: parseFloat(sellingPrice) || 0,
      openingStock: parseInt(openingStock, 10) || 0,
      locationId: locationId || 'loc_main',
      minStockAlert: parseInt(minStockAlert, 10) || 10,
    });

    showToast('Product Created', `${name.trim()} [${sku.trim().toUpperCase()}] added to catalogue.`);
    setIsAddModalOpen(false);
    setName('');
    setSku('');
    setCategory('');
    setPurchasePrice('');
    setSellingPrice('');
    setOpeningStock('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Products & Multi-Location Stock
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            SKU catalogue, unit economics, gross margins, and warehouse allocations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-4 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-3 shadow-xs">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-semibold">Total Stock Value</p>
              <MoneyDisplay amount={totalInventoryValue} size="lg" colored className="text-emerald-700 font-bold" />
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
            className="border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold shadow-xs"
            variant="outline"
          >
            Add Product
          </Button>
        </div>
      </div>

      {state.products.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">No products in catalogue</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Add your products or services to start tracking sales, inventory levels, cost of goods sold, and gross margins.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
          >
            Add Product
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
                placeholder="Search products by SKU, name, or category..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50/70 border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
              />
            </div>
          </Card>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => {
              const margin = prod.sellingPrice > 0
                ? Math.round(((prod.sellingPrice - prod.purchasePrice) / prod.sellingPrice) * 100)
                : 0;

              return (
                <Card key={prod.id} className="p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/products/${prod.id}`} className="hover:underline">
                          <h3 className="font-bold text-base text-neutral-900">{prod.name}</h3>
                        </Link>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          SKU: {prod.sku} • {prod.category}
                        </p>
                      </div>
                      <Badge variant={prod.stockQuantity <= prod.minStockAlert ? 'warning' : 'success'}>
                        {prod.stockQuantity} in stock
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">Cost Price</span>
                        <p className="font-mono font-bold text-neutral-900">{formatINR(prod.purchasePrice)}</p>
                      </div>
                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">Selling Price</span>
                        <p className="font-mono font-bold text-emerald-700">{formatINR(prod.sellingPrice)}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                      <span>Gross Margin: <strong className="text-emerald-700">{margin}%</strong></span>
                      <span>Stock Val: <strong className="text-neutral-900 font-mono">{formatINR(prod.purchasePrice * prod.stockQuantity)}</strong></span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-end">
                    <Link href={`/products/${prod.id}`}>
                      <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Details & Stock
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* ADD PRODUCT MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product / SKU"
        description="Register catalogue item with pricing, tax rate, and initial stock."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Premium Cotton Fabric"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">SKU Code *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                placeholder="e.g. FAB-COT-01"
                className="w-full px-3.5 py-2.5 font-mono uppercase bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Raw Materials"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Purchase Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Selling Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Opening Stock Units</label>
              <input
                type="number"
                value={openingStock}
                onChange={(e) => setOpeningStock(e.target.value)}
                placeholder="0"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-neutral-700">Minimum Stock Alert Threshold</label>
              <input
                type="number"
                value={minStockAlert}
                onChange={(e) => setMinStockAlert(e.target.value)}
                placeholder="10"
                className="w-full px-3.5 py-2.5 font-mono bg-white border border-neutral-200/80 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs">
              Save Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
