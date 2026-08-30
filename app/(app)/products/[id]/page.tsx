'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, MapPin, Layers, TrendingUp, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { MoneyDisplay } from '../../../../components/ui/money-display';
import { useDhanviState } from '../../../../lib/supabase/demo-store';
import { formatINR } from '../../../../lib/accounting/money';
import { formatDate } from '../../../../lib/utils/formatters';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { state } = useDhanviState();

  if (!state) return <div className="p-8 text-center text-xs font-mono text-neutral-400">Loading Product Data...</div>;

  const product = state.products.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-bold text-neutral-900">Product not found.</p>
        <Link href="/products">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const locationStocks = state.productLocationStocks.filter((pls) => pls.productId === productId);
  const movements = state.stockMovements.filter((sm) => sm.productId === productId);

  const marginPercentage = product.sellingPrice > 0
    ? Math.round(((product.sellingPrice - product.purchasePrice) / product.sellingPrice) * 100)
    : 0;

  const totalStockValue = product.purchasePrice * product.stockQuantity;

  return (
    <div className="space-y-6 max-w-5xl mx-auto selection:bg-emerald-100 selection:text-emerald-950 font-sans pb-12">
      {/* Header & Back */}
      <div>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{product.name}</h1>
              <Badge variant="neutral" className="font-mono font-bold">{product.sku}</Badge>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Category: {product.category}</p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stock Available</p>
          <p className="text-2xl font-extrabold text-neutral-900 mt-1">{product.stockQuantity} <span className="text-xs font-normal text-neutral-500">units</span></p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Purchase Cost</p>
          <MoneyDisplay amount={product.purchasePrice} size="xl" className="text-neutral-900 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Selling Price</p>
          <MoneyDisplay amount={product.sellingPrice} size="xl" className="text-emerald-700 font-bold mt-1" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gross Margin</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">{marginPercentage}%</p>
        </Card>
      </div>

      {/* Multi-Location Warehouse Allocation */}
      <Card>
        <CardHeader className="border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <CardTitle className="text-base">Stock by Warehouse / Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 text-xs">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-neutral-900">Primary Warehouse / Main Store</p>
                <p className="text-[11px] text-neutral-400 font-mono">loc_main</p>
              </div>
              <p className="font-mono font-bold text-sm text-neutral-900">{product.stockQuantity} units</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Movement Audit Log */}
      <Card>
        <CardHeader className="border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-neutral-500" />
            <CardTitle className="text-base">Stock Movement History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {movements.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400 font-mono">
              No stock movements recorded yet. Initial stock: {product.stockQuantity} units.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 text-xs">
              {movements.map((m) => (
                <div key={m.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">{m.type}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">{formatDate(m.date)} • Ref: {m.reference} ({m.locationName})</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-bold ${m.quantity > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {m.quantity > 0 ? `+${m.quantity}` : m.quantity} units
                    </p>
                    <p className="text-[10px] text-neutral-400">{m.notes || 'Stock update'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
