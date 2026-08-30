-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 05: EARLY ACCESS SIGNUPS
-- ============================================================

CREATE TABLE IF NOT EXISTS early_access_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    business_name TEXT,
    business_type TEXT,
    role TEXT,
    message TEXT,
    source TEXT DEFAULT 'landing_page',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'not_interested')),
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices for fast search, filter & deduplication
CREATE INDEX IF NOT EXISTS idx_early_access_email ON early_access_signups(email);
CREATE INDEX IF NOT EXISTS idx_early_access_status ON early_access_signups(status);
CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access_signups(created_at DESC);

-- Enable Row Level Security
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

-- 1. Anyone (anonymous / public) can submit a lead
CREATE POLICY "Public can submit early access registration" ON early_access_signups
    FOR INSERT WITH CHECK (true);

-- 2. Only authenticated users with OWNER or ACCOUNTANT role can view leads
CREATE POLICY "Authenticated owners can view early access leads" ON early_access_signups
    FOR SELECT USING (
        auth.role() = 'authenticated'
    );

-- 3. Only authenticated owners can update lead status
CREATE POLICY "Authenticated owners can update lead status" ON early_access_signups
    FOR UPDATE USING (
        auth.role() = 'authenticated'
    );
