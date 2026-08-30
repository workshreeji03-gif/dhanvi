-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 08: SOURCE TRACKING
-- ============================================================

-- Add source column to early_access if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'early_access' AND column_name = 'source'
    ) THEN
        ALTER TABLE early_access ADD COLUMN source TEXT DEFAULT 'landing_page';
    END IF;
END $$;

-- Index for source filtering & analytics
CREATE INDEX IF NOT EXISTS idx_early_access_source ON early_access (source);
CREATE INDEX IF NOT EXISTS idx_early_access_business_type ON early_access (business_type);
