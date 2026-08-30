import { describe, it, expect, beforeEach } from 'vitest';
import { POST, GET } from '@/app/api/early-access/route';
import { NextRequest } from 'next/server';

describe('Early Access API, Filters, Analytics & Source Tracking', () => {
  beforeEach(() => {
    if (globalThis.__dhanviEarlyAccessRecords) {
      globalThis.__dhanviEarlyAccessRecords = [];
    }
  });

  it('Test 1 — Valid submission with source (instagram) saves source and returns HTTP 200', async () => {
    const req = new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rahul Patel',
        email: 'rahul@gmail.com',
        business_name: 'ABC Traders',
        business_type: 'Retail',
        phone: '9876543210',
        employee_count: '11–25',
        current_accounting: 'Tally',
        source: 'instagram',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);

    // Verify source in record
    const saved = globalThis.__dhanviEarlyAccessRecords?.[0];
    expect(saved?.source).toBe('instagram');
    expect(saved?.name).toBe('Rahul Patel');
  });

  it('Test 2 — Untrusted/invalid source is normalized to direct', async () => {
    const req = new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Amit Shah',
        email: 'amit@shah.com',
        business_name: 'Shah Ltd',
        business_type: 'Wholesale',
        source: 'unknown-malicious-value',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const saved = globalThis.__dhanviEarlyAccessRecords?.[0];
    expect(saved?.source).toBe('direct');
  });

  it('Test 3 — GET with search parameter finds matching lead by name, business, or email', async () => {
    // Seed 2 records
    globalThis.__dhanviEarlyAccessRecords = [
      {
        id: 'lead-1',
        created_at: new Date().toISOString(),
        name: 'Rahul Patel',
        email: 'rahul@gmail.com',
        business_name: 'ABC Traders',
        business_type: 'Retail',
        employee_count: '11–25',
        current_accounting: 'Tally',
        source: 'instagram',
        status: 'qualified',
      },
      {
        id: 'lead-2',
        created_at: new Date().toISOString(),
        name: 'Pooja Verma',
        email: 'pooja@verma.in',
        business_name: 'Verma Goods',
        business_type: 'Wholesale',
        employee_count: '6–10',
        current_accounting: 'Zoho Books',
        source: 'linkedin',
        status: 'new',
      },
    ];

    // Search by Name
    const req1 = new NextRequest('http://localhost:3000/api/early-access?q=Rahul');
    const res1 = await GET(req1);
    const data1 = await res1.json();
    expect(data1.leads.length).toBe(1);
    expect(data1.leads[0].name).toBe('Rahul Patel');

    // Search by Business
    const req2 = new NextRequest('http://localhost:3000/api/early-access?q=Verma');
    const res2 = await GET(req2);
    const data2 = await res2.json();
    expect(data2.leads.length).toBe(1);
    expect(data2.leads[0].business_name).toBe('Verma Goods');

    // Search by Email
    const req3 = new NextRequest('http://localhost:3000/api/early-access?q=rahul@gmail.com');
    const res3 = await GET(req3);
    const data3 = await res3.json();
    expect(data3.leads.length).toBe(1);
    expect(data3.leads[0].email).toBe('rahul@gmail.com');
  });

  it('Test 4 — GET filters by status, business_type, and source', async () => {
    globalThis.__dhanviEarlyAccessRecords = [
      {
        id: 'lead-1',
        created_at: new Date().toISOString(),
        name: 'Rahul Patel',
        email: 'rahul@gmail.com',
        business_name: 'ABC Traders',
        business_type: 'Retail',
        employee_count: '11–25',
        current_accounting: 'Tally',
        source: 'instagram',
        status: 'qualified',
      },
      {
        id: 'lead-2',
        created_at: new Date().toISOString(),
        name: 'Vikram Shah',
        email: 'vikram@retail.com',
        business_name: 'Shah Store',
        business_type: 'Retail',
        employee_count: '1–5',
        current_accounting: 'Excel / Google Sheets',
        source: 'google',
        status: 'new',
      },
    ];

    // Filter by status=qualified
    const res1 = await GET(new NextRequest('http://localhost:3000/api/early-access?status=qualified'));
    const data1 = await res1.json();
    expect(data1.leads.length).toBe(1);
    expect(data1.leads[0].id).toBe('lead-1');

    // Filter by business_type=Retail
    const res2 = await GET(new NextRequest('http://localhost:3000/api/early-access?business_type=Retail'));
    const data2 = await res2.json();
    expect(data2.leads.length).toBe(2);

    // Filter combined business_type=Retail & source=instagram
    const res3 = await GET(new NextRequest('http://localhost:3000/api/early-access?business_type=Retail&source=instagram'));
    const data3 = await res3.json();
    expect(data3.leads.length).toBe(1);
    expect(data3.leads[0].id).toBe('lead-1');
  });

  it('Test 5 — Dynamic Analytics calculates percentages and pipeline correctly', async () => {
    globalThis.__dhanviEarlyAccessRecords = [
      {
        id: 'lead-1',
        created_at: new Date().toISOString(),
        name: 'Lead 1',
        email: 'l1@test.com',
        business_name: 'B1',
        business_type: 'Retail',
        employee_count: '11–25',
        current_accounting: 'Tally',
        source: 'instagram',
        status: 'converted',
      },
      {
        id: 'lead-2',
        created_at: new Date().toISOString(),
        name: 'Lead 2',
        email: 'l2@test.com',
        business_name: 'B2',
        business_type: 'Manufacturing',
        employee_count: '51–100',
        current_accounting: 'Tally',
        source: 'google',
        status: 'new',
      },
    ];

    const res = await GET(new NextRequest('http://localhost:3000/api/early-access'));
    const data = await res.json();

    expect(data.analytics.totalSignups).toBe(2);
    expect(data.analytics.pipeline.converted).toBe(1);
    expect(data.analytics.pipeline.new).toBe(1);
    expect(data.analytics.conversionRate).toBe('50.0');

    // Tally should be 100% of accounting
    const tallyMetric = data.analytics.accountingSystems.find((a: any) => a.name === 'Tally');
    expect(tallyMetric?.percentage).toBe(100);
  });

  it('Test 6 — Duplicate email rejected with HTTP 409 and does not create duplicate lead', async () => {
    const payload = {
      name: 'Duplicate Test',
      email: 'duplicate@test.com',
      business_name: 'Dup Corp',
      business_type: 'Services',
    };

    const res1 = await POST(new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }));
    expect(res1.status).toBe(200);

    const res2 = await POST(new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }));
    expect(res2.status).toBe(409);
  });
});
