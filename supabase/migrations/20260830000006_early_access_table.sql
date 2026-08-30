-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 06: EARLY ACCESS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS early_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    phone TEXT,
    employee_count TEXT,
    current_accounting TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'not_interested'))
);

-- Unique index on email to enforce 1 email = 1 lead
CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_unique_email ON early_access(lower(email));
CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_early_access_status ON early_access(status);

-- Enable Row Level Security
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;

-- Public can submit early access
CREATE POLICY "Public can submit early access" ON early_access
    FOR INSERT WITH CHECK (true);

-- Authenticated admins/owners can view
CREATE POLICY "Authenticated owners can view early access" ON early_access
    FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated admins/owners can update
CREATE POLICY "Authenticated owners can update early access" ON early_access
    FOR UPDATE USING (auth.role() = 'authenticated');
