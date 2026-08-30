-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 02: ACCOUNTING & FINANCIALS
-- ============================================================

-- CHART OF ACCOUNTS
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE')),
    sub_type TEXT,
    description TEXT,
    parent_id UUID REFERENCES accounts(id) ON DELETE RESTRICT,
    currency TEXT NOT NULL DEFAULT 'INR',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_id, code)
);

-- ACCOUNTING PERIODS
CREATE TABLE IF NOT EXISTS accounting_periods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    fiscal_year INT NOT NULL,
    period_number INT NOT NULL, -- 1 to 12
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    locked_at TIMESTAMPTZ,
    locked_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_id, fiscal_year, period_number)
);

-- JOURNAL ENTRIES (Headers)
CREATE TABLE IF NOT EXISTS journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    entry_number TEXT NOT NULL,
    entry_date DATE NOT NULL,
    description TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'MANUAL' CHECK (source_type IN ('MANUAL', 'TRANSACTION', 'INVOICE', 'PAYMENT', 'REVERSAL', 'IMPORT', 'CLOSING')),
    source_id UUID,
    status TEXT NOT NULL DEFAULT 'POSTED' CHECK (status IN ('DRAFT', 'POSTED', 'REVERSED')),
    reversal_of_id UUID REFERENCES journal_entries(id),
    created_by UUID REFERENCES profiles(id),
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_id, entry_number)
);

-- JOURNAL LINES (Double-Entry Debit / Credit Line Items)
CREATE TABLE IF NOT EXISTS journal_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
    debit NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (debit >= 0),
    credit NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (credit >= 0),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_debit_or_credit_positive CHECK ((debit > 0 AND credit = 0) OR (credit > 0 AND debit = 0))
);

-- CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    gstin TEXT,
    pan TEXT,
    address JSONB DEFAULT '{}'::jsonb,
    opening_balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
    credit_limit NUMERIC(15, 2),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VENDORS / SUPPLIERS
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    gstin TEXT,
    pan TEXT,
    address JSONB DEFAULT '{}'::jsonb,
    opening_balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
    bank_details JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCTS & SERVICES
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sku TEXT,
    hsn_code TEXT,
    category TEXT,
    unit TEXT DEFAULT 'PCS',
    purchase_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    selling_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 18.00, -- Default GST %
    stock_quantity NUMERIC(12, 2) NOT NULL DEFAULT 0,
    min_stock_alert NUMERIC(12, 2) NOT NULL DEFAULT 5,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INVOICES (Sales and Purchase Bills)
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('SALES', 'PURCHASE')),
    customer_id UUID REFERENCES customers(id),
    vendor_id UUID REFERENCES vendors(id),
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    cgst NUMERIC(15, 2) NOT NULL DEFAULT 0,
    sgst NUMERIC(15, 2) NOT NULL DEFAULT 0,
    igst NUMERIC(15, 2) NOT NULL DEFAULT 0,
    tax_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    paid_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'PAID', 'PARTIALLY_PAID', 'OVERDUE', 'CANCELLED')),
    file_url TEXT,
    ocr_extracted_data JSONB,
    ocr_confidence NUMERIC(5, 2),
    journal_entry_id UUID REFERENCES journal_entries(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_id, invoice_number, type)
);

-- INVOICE ITEMS
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    description TEXT NOT NULL,
    hsn_sac TEXT,
    quantity NUMERIC(12, 2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 18.00,
    tax_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BUSINESS TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    type TEXT NOT NULL CHECK (type IN ('SALE', 'PURCHASE', 'EXPENSE', 'PAYMENT_RECEIVED', 'PAYMENT_SENT', 'TRANSFER', 'REFUND', 'OTHER')),
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('CASH', 'BANK_TRANSFER', 'UPI', 'CARD', 'CHEQUE', 'CREDIT', 'OTHER')),
    account_id UUID REFERENCES accounts(id),
    customer_id UUID REFERENCES customers(id),
    vendor_id UUID REFERENCES vendors(id),
    invoice_id UUID REFERENCES invoices(id),
    reference_number TEXT,
    status TEXT NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'POSTED', 'REVERSED')),
    is_reconciled BOOLEAN NOT NULL DEFAULT FALSE,
    source TEXT NOT NULL DEFAULT 'MANUAL' CHECK (source IN ('MANUAL', 'CSV_IMPORT', 'INVOICE_SCAN', 'BANK_FEED', 'API')),
    journal_entry_id UUID REFERENCES journal_entries(id),
    import_batch_id UUID REFERENCES import_batches(id),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BANK ACCOUNTS & FEEDS
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    ifsc_code TEXT,
    account_type TEXT DEFAULT 'CURRENT',
    opening_balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
    current_balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
    ledger_account_id UUID REFERENCES accounts(id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BANK TRANSACTIONS (Statement Lines)
CREATE TABLE IF NOT EXISTS bank_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_account_id UUID NOT NULL REFERENCES bank_accounts(id) ON DELETE CASCADE,
    transaction_date DATE NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('CREDIT', 'DEBIT')),
    reference_number TEXT,
    status TEXT NOT NULL DEFAULT 'UNMATCHED' CHECK (status IN ('UNMATCHED', 'MATCHED', 'IGNORED')),
    matched_transaction_id UUID REFERENCES transactions(id),
    import_batch_id UUID REFERENCES import_batches(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RECONCILIATION MATCHES
CREATE TABLE IF NOT EXISTS reconciliation_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_transaction_id UUID NOT NULL REFERENCES bank_transactions(id) ON DELETE CASCADE,
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    match_confidence NUMERIC(5, 2) NOT NULL DEFAULT 100.00,
    match_rule TEXT,
    matched_by UUID REFERENCES profiles(id),
    matched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI INSIGHTS
CREATE TABLE IF NOT EXISTS ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    insight_type TEXT NOT NULL CHECK (insight_type IN ('EXPENSE_ANOMALY', 'REVENUE_CHANGE', 'PROFIT_CHANGE', 'MARGIN_CHANGE', 'CASH_FLOW_WARNING', 'OVERDUE_RECEIVABLE', 'OVERDUE_PAYABLE', 'DUPLICATE_TRANSACTION', 'UNUSUAL_TRANSACTION', 'INVENTORY_WARNING')),
    severity TEXT NOT NULL CHECK (severity IN ('INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metrics JSONB DEFAULT '{}'::jsonb,
    recommendation TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DISMISSED', 'RESOLVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI CHAT & CONVERSATIONS
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Financial Inquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI MESSAGES
CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL')),
    content TEXT NOT NULL,
    tool_calls JSONB,
    tool_results JSONB,
    citations JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high performance querying
CREATE INDEX IF NOT EXISTS idx_accounts_business_type ON accounts(business_id, type);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON journal_entries(business_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_lines_entry ON journal_lines(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_journal_lines_account ON journal_lines(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_business_date ON transactions(business_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_business_status ON invoices(business_id, status);
CREATE INDEX IF NOT EXISTS idx_ai_insights_business_status ON ai_insights(business_id, status);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_status ON bank_transactions(bank_account_id, status);
