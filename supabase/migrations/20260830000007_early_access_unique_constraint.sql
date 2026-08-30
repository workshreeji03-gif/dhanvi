-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 07: UNIQUE EMAIL CONSTRAINT
-- ============================================================

-- Ensure table exists
CREATE TABLE IF NOT EXISTS early_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    phone TEXT,
    employee_count TEXT,
    current_accounting TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'not_interested'))
);

-- Normalize existing emails to lowercase and trimmed
UPDATE early_access
SET email = LOWER(TRIM(email))
WHERE email != LOWER(TRIM(email));

-- Ensure unique constraint on email
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'early_access_email_unique'
    ) THEN
        ALTER TABLE early_access
        ADD CONSTRAINT early_access_email_unique UNIQUE (email);
    END IF;
EXCEPTION
    WHEN duplicate_table THEN NULL;
    WHEN duplicate_object THEN NULL;
END $$;

-- Enforce case-insensitive unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_unique_email ON early_access (LOWER(TRIM(email)));
