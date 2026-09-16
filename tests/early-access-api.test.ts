import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { POST, GET } from '@/app/api/early-access/route';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const testEmails: string[] = [];

describe('Early Access Waitlist API & Sequence Numbering', () => {
  beforeEach(() => {
    if (globalThis.__dhanviEarlyAccessRecords) {
      globalThis.__dhanviEarlyAccessRecords = [];
    }
  });

  afterAll(async () => {
    if (testEmails.length > 0) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (url && key && !url.includes('your-project')) {
        const sb = createClient(url, key);
        await sb.from('early_access').delete().in('email', testEmails);
      }
    }
  });

  it('Test 1 — Valid waitlist submission returns HTTP 200 with sequential waitlist number and masked email', async () => {
    const testEmail = `alexander-${Date.now()}@fund.com`;
    testEmails.push(testEmail);

    const req = new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Alexander Wright',
        email: testEmail,
        company: 'Alpha Quantitative Capital',
        role: 'Quant / Researcher',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.alreadyRegistered).toBe(false);
    expect(typeof data.waitlist_number).toBe('string');
    expect(data.waitlist_number).toMatch(/^#\d{4}$/);
    expect(data.masked_email).toContain('••••••');
    expect(data.first_name).toBe('Alexander');
  });

  it('Test 2 — Duplicate submission does not create duplicate and returns existing waitlist number', async () => {
    const testEmail = `schen-${Date.now()}@familyoffice.com`;
    testEmails.push(testEmail);

    const payload = {
      fullName: 'Sarah Chen',
      email: testEmail,
      company: 'Chen Family Office',
      role: 'Asset Management',
    };

    // First submission
    const res1 = await POST(new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }));
    expect(res1.status).toBe(200);
    const data1 = await res1.json();
    const originalNumber = data1.waitlist_number;
    expect(originalNumber).toMatch(/^#\d{4}$/);

    // Duplicate submission
    const res2 = await POST(new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }));
    expect(res2.status).toBe(200);
    const data2 = await res2.json();

    expect(data2.alreadyRegistered).toBe(true);
    expect(data2.waitlist_number).toBe(originalNumber);
    expect(data2.message).toContain('already part of Dhanvi Early Access');
  });

  it('Test 3 — Rejects invalid email format with HTTP 400', async () => {
    const req = new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'invalid-email-string',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain('valid email');
  });

  it('Test 4 — Rejects missing required name field with HTTP 400', async () => {
    const req = new Request('http://localhost:3000/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: '',
        email: 'user@test.com',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('Test 5 — GET returns leads list and next waitlist sequence number', async () => {
    const req = new NextRequest('http://localhost:3000/api/early-access');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(Array.isArray(data.leads)).toBe(true);
    expect(data.nextWaitlistNumber).toMatch(/^#\d{4}$/);
  });
});
