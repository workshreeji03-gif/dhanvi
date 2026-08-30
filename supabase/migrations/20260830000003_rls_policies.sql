-- ============================================================
-- DHANVI DATABASE SCHEMA - MIGRATION 03: ROW LEVEL SECURITY
-- ============================================================

-- Helper functions for multi-tenant isolation
CREATE OR REPLACE FUNCTION get_user_business_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT business_id 
    FROM business_members 
    WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION user_has_business_role(target_business_id UUID, allowed_roles TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM business_members 
        WHERE user_id = auth.uid() 
          AND business_id = target_business_id 
          AND role = ANY(allowed_roles)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reconciliation_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. BUSINESSES
CREATE POLICY "Members can view their businesses" ON businesses
    FOR SELECT USING (id IN (SELECT get_user_business_ids()));
CREATE POLICY "Owners can update business details" ON businesses
    FOR UPDATE USING (user_has_business_role(id, ARRAY['OWNER']));

-- 3. BUSINESS MEMBERS
CREATE POLICY "Members can view business roster" ON business_members
    FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Owners can manage members" ON business_members
    FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER']));

-- 4. ACCOUNTS
CREATE POLICY "Members can view accounts" ON accounts
    FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Owners and Accountants can manage accounts" ON accounts
    FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT']));

-- 5. JOURNAL ENTRIES & LINES
CREATE POLICY "Members can view journal entries" ON journal_entries
    FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Owners and Accountants can insert journal entries" ON journal_entries
    FOR INSERT WITH CHECK (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT']));

CREATE POLICY "Members can view journal lines" ON journal_lines
    FOR SELECT USING (
        journal_entry_id IN (
            SELECT id FROM journal_entries WHERE business_id IN (SELECT get_user_business_ids())
        )
    );
CREATE POLICY "Owners and Accountants can manage journal lines" ON journal_lines
    FOR INSERT WITH CHECK (
        journal_entry_id IN (
            SELECT id FROM journal_entries WHERE user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT'])
        )
    );

-- 6. TRANSACTIONS
CREATE POLICY "Members can view transactions" ON transactions
    FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can insert transactions" ON transactions
    FOR INSERT WITH CHECK (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']));
CREATE POLICY "Owners and Accountants can update transactions" ON transactions
    FOR UPDATE USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT']));

-- 7. CUSTOMERS, VENDORS, PRODUCTS, INVOICES
CREATE POLICY "Members can view customers" ON customers FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can manage customers" ON customers FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']));

CREATE POLICY "Members can view vendors" ON vendors FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can manage vendors" ON vendors FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']));

CREATE POLICY "Members can view products" ON products FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can manage products" ON products FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']));

CREATE POLICY "Members can view invoices" ON invoices FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can manage invoices" ON invoices FOR ALL USING (user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']));

CREATE POLICY "Members can view invoice items" ON invoice_items FOR SELECT USING (
    invoice_id IN (SELECT id FROM invoices WHERE business_id IN (SELECT get_user_business_ids()))
);
CREATE POLICY "Members can manage invoice items" ON invoice_items FOR ALL USING (
    invoice_id IN (SELECT id FROM invoices WHERE user_has_business_role(business_id, ARRAY['OWNER', 'ACCOUNTANT', 'STAFF']))
);

-- 8. AI INSIGHTS & CHAT
CREATE POLICY "Members can view AI insights" ON ai_insights FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
CREATE POLICY "Members can update AI insights" ON ai_insights FOR UPDATE USING (business_id IN (SELECT get_user_business_ids()));

CREATE POLICY "Users can manage own conversations" ON ai_conversations FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own chat messages" ON ai_messages FOR ALL USING (
    conversation_id IN (SELECT id FROM ai_conversations WHERE user_id = auth.uid())
);

-- 9. NOTIFICATIONS & AUDIT LOGS
CREATE POLICY "Users can view own notifications" ON notifications FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Members can view audit logs" ON audit_logs FOR SELECT USING (business_id IN (SELECT get_user_business_ids()));
