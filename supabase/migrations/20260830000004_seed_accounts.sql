-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 04: STANDARD CHART OF ACCOUNTS SEEDER
-- ============================================================

CREATE OR REPLACE FUNCTION initialize_business_chart_of_accounts(target_business_id UUID)
RETURNS VOID AS $$
BEGIN
    -- ASSETS (1000 - 1999)
    INSERT INTO accounts (business_id, code, name, type, sub_type, description, is_system) VALUES
    (target_business_id, '1010', 'Cash on Hand', 'ASSET', 'CURRENT_ASSET', 'Physical cash in office/register', TRUE),
    (target_business_id, '1020', 'Bank Accounts (HDFC / ICICI / SBI)', 'ASSET', 'CURRENT_ASSET', 'Primary operational bank balance', TRUE),
    (target_business_id, '1030', 'Accounts Receivable (Debtors)', 'ASSET', 'CURRENT_ASSET', 'Money owed by customers on invoices', TRUE),
    (target_business_id, '1040', 'Inventory Asset', 'ASSET', 'CURRENT_ASSET', 'Cost value of stock on hand', TRUE),
    (target_business_id, '1050', 'Prepaid Expenses & Advances', 'ASSET', 'CURRENT_ASSET', 'Advance rent and prepaid subscriptions', TRUE),
    (target_business_id, '1510', 'Office Equipment & Furniture', 'ASSET', 'FIXED_ASSET', 'Laptops, office furniture and fittings', TRUE),

    -- LIABILITIES (2000 - 2999)
    (target_business_id, '2010', 'Accounts Payable (Creditors)', 'LIABILITY', 'CURRENT_LIABILITY', 'Money owed to suppliers and vendors', TRUE),
    (target_business_id, '2020', 'GST Payable (Output GST)', 'LIABILITY', 'CURRENT_LIABILITY', 'Tax collected on sales payable to Govt', TRUE),
    (target_business_id, '2030', 'TDS / Payroll Payable', 'LIABILITY', 'CURRENT_LIABILITY', 'Salary withholdings and statutory liabilities', TRUE),
    (target_business_id, '2510', 'Bank Business Loans & Overdraft', 'LIABILITY', 'NON_CURRENT_LIABILITY', 'Term loans and working capital credit', TRUE),

    -- EQUITY (3000 - 3999)
    (target_business_id, '3010', 'Owner Capital', 'EQUITY', 'EQUITY', 'Initial and ongoing capital injected by owner', TRUE),
    (target_business_id, '3020', 'Retained Earnings', 'EQUITY', 'EQUITY', 'Cumulative historical net profit/loss', TRUE),
    (target_business_id, '3030', 'Owner Drawings', 'EQUITY', 'EQUITY', 'Personal withdrawals by the owner', TRUE),

    -- REVENUE (4000 - 4999)
    (target_business_id, '4010', 'Sales Revenue', 'REVENUE', 'OPERATING_REVENUE', 'Wholesale, retail, and product sales', TRUE),
    (target_business_id, '4020', 'Service & Consulting Revenue', 'REVENUE', 'OPERATING_REVENUE', 'Professional, consulting, and service fees', TRUE),
    (target_business_id, '4030', 'Other Income & Interest', 'REVENUE', 'NON_OPERATING_REVENUE', 'Discounts received, interest income', TRUE),

    -- EXPENSES (5000 - 5999)
    (target_business_id, '5010', 'Cost of Goods Sold (COGS)', 'EXPENSE', 'DIRECT_EXPENSE', 'Direct cost of inventory sold', TRUE),
    (target_business_id, '5020', 'Salaries & Staff Wages', 'EXPENSE', 'OPERATING_EXPENSE', 'Employee compensation and payroll', TRUE),
    (target_business_id, '5030', 'Rent & Office Lease', 'EXPENSE', 'OPERATING_EXPENSE', 'Premises and warehouse rent', TRUE),
    (target_business_id, '5040', 'Electricity & Utilities', 'EXPENSE', 'OPERATING_EXPENSE', 'Power, internet, water and utility bills', TRUE),
    (target_business_id, '5050', 'Marketing & Customer Acquisition', 'EXPENSE', 'OPERATING_EXPENSE', 'Ads, print materials, digital marketing', TRUE),
    (target_business_id, '5060', 'Software & Technology Tools', 'EXPENSE', 'OPERATING_EXPENSE', 'SaaS subscriptions, hosting, IT tools', TRUE),
    (target_business_id, '5070', 'Packaging & Shipping', 'EXPENSE', 'OPERATING_EXPENSE', 'Boxes, tape, logistics and courier costs', TRUE),
    (target_business_id, '5080', 'Travel & Transportation', 'EXPENSE', 'OPERATING_EXPENSE', 'Fuel, vehicle maintenance, travel expenses', TRUE),
    (target_business_id, '5090', 'Bank Charges & Payment Gateway Fees', 'EXPENSE', 'OPERATING_EXPENSE', 'POS fees, bank service charges', TRUE)
    ON CONFLICT (business_id, code) DO NOTHING;
END;
$$ LANGUAGE plpgsql;
