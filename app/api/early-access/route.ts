import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const ALLOWED_SOURCES = [
  'landing_page',
  'instagram',
  'linkedin',
  'referral',
  'google',
  'direct',
] as const;

type LeadSource = (typeof ALLOWED_SOURCES)[number];

// Helper to normalize and validate lead source
function validateSource(rawSource?: string | null): LeadSource {
  if (!rawSource) return 'landing_page';
  const clean = rawSource.trim().toLowerCase();
  if (ALLOWED_SOURCES.includes(clean as LeadSource)) {
    return clean as LeadSource;
  }
  return 'direct';
}

// Server-side Supabase client using Service Role Key (NEVER exposed to client)
function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Helper to get Resend instance safely (server-side only)
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_your_resend_api_key' || apiKey.includes('placeholder')) {
    return null;
  }
  return new Resend(apiKey);
}

// Helper to sanitize HTML content to prevent HTML injection in emails
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Format submission date in Indian Standard Time (Asia/Kolkata)
function formatIndianDate(date: Date = new Date()): string {
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).format(date) + ' IST'
    );
  } catch {
    return date.toUTCString();
  }
}

// Generate premium Dhanvi branded HTML confirmation email for user
function generateConfirmationEmailHtml(name: string) {
  const safeName = escapeHtml(name.trim());
  const firstName = safeName.split(' ')[0] || '';
  const greetingHeading = firstName ? `You're in, ${firstName}.` : "You're in.";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the Dhanvi early-access list</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
          <tr>
            <td style="padding: 32px 36px 20px 36px; border-bottom: 1px solid #f1f5f9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 18px; font-weight: 800; letter-spacing: -0.5px; color: #09090b;">
                      DHANVI
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; font-family: monospace;">
                      EARLY ACCESS
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 800; letter-spacing: -0.75px; color: #09090b; line-height: 1.25;">
                ${greetingHeading}
              </h1>
              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.6; color: #334155; font-weight: 500;">
                Thanks for signing up for Dhanvi.
              </p>
              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                We're building Dhanvi to make business finance more continuous, intelligent and effortless — from everyday transactions to real-time financial insights.
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                We'll be in touch when your early access is ready.
              </p>
              <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #09090b;">
                  Dhanvi
                </p>
                <p style="margin: 3px 0 0 0; font-size: 13px; color: #64748b;">
                  Continuous financial intelligence for modern businesses.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Generate admin notification email HTML
function generateAdminNotificationEmailHtml(lead: {
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  phone?: string | null;
  employee_count: string;
  current_accounting: string;
  source: string;
  submittedAt: Date;
}) {
  const safeName = escapeHtml(lead.name);
  const safeEmail = escapeHtml(lead.email);
  const encodedEmail = encodeURIComponent(lead.email);
  const safeBusiness = escapeHtml(lead.business_name);
  const safeType = escapeHtml(lead.business_type);
  const safeTeam = escapeHtml(lead.employee_count);
  const safeAccounting = escapeHtml(lead.current_accounting);
  const safeSource = escapeHtml(lead.source);
  const safePhone = lead.phone ? escapeHtml(lead.phone) : 'Not provided';
  const submittedStr = formatIndianDate(lead.submittedAt);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚀 New Dhanvi Early Access Signup</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 24px 32px; background-color: #0f172a; color: #ffffff;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #34d399;">
                DHANVI INTERNAL ALERT
              </span>
              <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                🚀 New Early Access Signup
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; width: 150px; font-size: 13px; font-weight: 600; color: #64748b;">Name</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Email</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px;"><a href="mailto:${encodedEmail}" style="color: #059669; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Business</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${safeBusiness}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Type</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${safeType}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Team Size</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${safeTeam}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Accounting</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${safeAccounting}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Source</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; font-family: monospace;">${safeSource}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Phone</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; font-size: 13px; font-weight: 600; color: #64748b;">Submitted</td>
                  <td style="padding: 9px 0; font-size: 13px; color: #475569; font-family: monospace;">${submittedStr}</td>
                </tr>
              </table>
              <div style="margin-top: 28px; text-align: center;">
                <a href="https://dhanvi.online/admin/early-access" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
                  Open Admin Dashboard &rarr;
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// In-memory fallback
declare global {
  var __dhanviEarlyAccessRecords: Array<{
    id: string;
    created_at: string;
    name: string;
    email: string;
    business_name: string;
    business_type: string;
    phone?: string;
    employee_count?: string;
    current_accounting?: string;
    source: string;
    status: string;
  }> | undefined;
}

if (!globalThis.__dhanviEarlyAccessRecords) {
  globalThis.__dhanviEarlyAccessRecords = [
    {
      id: 'lead-001',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      name: 'Ananya Sharma',
      email: 'ananya@sharmawholesaleltd.in',
      phone: '+91 98201 45902',
      business_name: 'Sharma Wholesale Goods',
      business_type: 'Wholesale',
      employee_count: '11–25',
      current_accounting: 'Tally',
      source: 'linkedin',
      status: 'new',
    },
    {
      id: 'lead-002',
      created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
      name: 'Rohan Mehta, FCA',
      email: 'rohan.mehta@mehtaca.com',
      phone: '+91 98112 39012',
      business_name: 'Mehta & Associates Chartered Accountants',
      business_type: 'Services',
      employee_count: '6–10',
      current_accounting: 'Zoho Books',
      source: 'referral',
      status: 'qualified',
    },
    {
      id: 'lead-003',
      created_at: new Date(Date.now() - 3600000 * 40).toISOString(),
      name: 'Vikram Singhania',
      email: 'vikram@nextechretail.com',
      phone: '+91 99203 11849',
      business_name: 'Nextech Consumer Retail',
      business_type: 'Retail',
      employee_count: '26–50',
      current_accounting: 'Excel / Google Sheets',
      source: 'instagram',
      status: 'demo',
    },
    {
      id: 'lead-004',
      created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
      name: 'Kavita Iyer',
      email: 'kavita@iyermanufacturing.co',
      phone: '+91 98450 22104',
      business_name: 'Iyer Precision Works',
      business_type: 'Manufacturing',
      employee_count: '51–100',
      current_accounting: 'Tally',
      source: 'google',
      status: 'converted',
    },
  ];
}

// POST: Register for Early Access, validate source, save to Supabase, and send notifications
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.name || body.fullName || body.full_name || '').trim();
    const email = (body.email || body.workEmail || '').trim().toLowerCase();
    const business_name = (body.business_name || body.companyName || body.business || '').trim();
    const business_type = (body.business_type || body.businessType || 'General Business').trim();
    const phone = (body.phone || '').trim() || null;
    const employee_count = (body.employee_count || body.businessSize || body.role || '1–5').trim();
    const current_accounting = (body.current_accounting || body.accountingSystem || body.interest || body.message || 'Excel / Google Sheets').trim();
    const source = validateSource(body.source || body.utm_source);

    // 1. Validate required fields
    if (!name || !email || !business_name || !business_type) {
      return NextResponse.json(
        {
          error: 'Please fill in all required fields.',
        },
        { status: 400 }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();
    let leadSaved = false;
    const submittedAt = new Date();

    if (supabase) {
      // 3. Check duplicate email in Supabase
      const { data: existingLead } = await supabase
        .from('early_access')
        .select('id, email')
        .eq('email', email)
        .maybeSingle();

      if (existingLead) {
        return NextResponse.json(
          {
            error: "You're already on the Dhanvi early-access list.",
          },
          { status: 409 }
        );
      }

      // 4. Insert into early_access table (NOTE: Does NOT create auth user or workspace)
      const { error: insertError } = await supabase
        .from('early_access')
        .insert({
          name,
          email,
          business_name,
          business_type,
          phone,
          employee_count,
          current_accounting,
          source,
        });

      if (insertError) {
        console.error('Supabase error:', insertError);

        // Duplicate email constraint code (Postgres unique violation)
        if (insertError.code === '23505' || insertError.message?.includes('duplicate key')) {
          return NextResponse.json(
            {
              error: "You're already on the Dhanvi early-access list.",
            },
            { status: 409 }
          );
        }

        // Fallback insertion for early_access_signups table
        const { error: fallbackTableError } = await supabase
          .from('early_access_signups')
          .insert({
            full_name: name,
            email,
            phone,
            business_name,
            business_type,
            role: employee_count,
            message: current_accounting,
            source,
            status: 'new',
          });

        if (fallbackTableError) {
          return NextResponse.json(
            {
              error: 'Something went wrong while submitting your application.',
            },
            { status: 500 }
          );
        }
      }

      leadSaved = true;
    } else {
      // In-memory fallback
      const existingInMemory = globalThis.__dhanviEarlyAccessRecords!.find(
        (l) => l.email.toLowerCase() === email
      );

      if (existingInMemory) {
        return NextResponse.json(
          {
            error: "You're already on the Dhanvi early-access list.",
          },
          { status: 409 }
        );
      }

      const newRecord = {
        id: `ea-${Date.now()}`,
        created_at: submittedAt.toISOString(),
        name,
        email,
        business_name,
        business_type,
        phone: phone || undefined,
        employee_count,
        current_accounting,
        source,
        status: 'new',
      };

      globalThis.__dhanviEarlyAccessRecords!.unshift(newRecord);
      leadSaved = true;
    }

    // 5. Send Resend notifications ONLY after lead is successfully saved
    let userEmailSent = false;
    let adminEmailSent = false;

    if (leadSaved) {
      const resend = getResendClient();

      if (resend) {
        const emailTasks: Promise<any>[] = [];

        // Task A: User Confirmation Email
        emailTasks.push(
          resend.emails
            .send({
              from: 'Dhanvi <hello@dhanvi.online>',
              to: [email],
              subject: "You're on the Dhanvi early-access list",
              html: generateConfirmationEmailHtml(name),
            })
            .then((result) => {
              if (result.error) {
                console.warn('Resend user email notice:', result.error);
                return { type: 'user', success: false, error: result.error };
              }
              return { type: 'user', success: true };
            })
            .catch((err) => {
              console.warn('Resend user email exception:', err);
              return { type: 'user', success: false, error: err };
            })
        );

        // Task B: Admin Notification Email
        const adminEmail = process.env.EARLY_ACCESS_ADMIN_EMAIL;
        if (adminEmail && !adminEmail.includes('example.com')) {
          emailTasks.push(
            resend.emails
              .send({
                from: 'Dhanvi <hello@dhanvi.online>',
                to: [adminEmail.trim()],
                subject: '🚀 New Dhanvi Early Access Signup',
                html: generateAdminNotificationEmailHtml({
                  name,
                  email,
                  business_name,
                  business_type,
                  phone,
                  employee_count,
                  current_accounting,
                  source,
                  submittedAt,
                }),
              })
              .then((result) => {
                if (result.error) {
                  console.warn('Resend admin email notice:', result.error);
                  return { type: 'admin', success: false, error: result.error };
                }
                return { type: 'admin', success: true };
              })
              .catch((err) => {
                console.warn('Resend admin email exception:', err);
                return { type: 'admin', success: false, error: err };
              })
          );
        }

        const results = await Promise.allSettled(emailTasks);
        results.forEach((r) => {
          if (r.status === 'fulfilled') {
            if (r.value.type === 'user' && r.value.success) userEmailSent = true;
            if (r.value.type === 'admin' && r.value.success) adminEmailSent = true;
          }
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        userEmailSent,
        adminEmailSent,
        message: "You're on the Early Access list!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Early Access API error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}

// GET: Fetch leads and analytics for protected admin page
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase();
    const statusFilter = searchParams.get('status');
    const businessTypeFilter = searchParams.get('business_type');
    const teamSizeFilter = searchParams.get('team_size');
    const accountingFilter = searchParams.get('accounting');
    const sourceFilter = searchParams.get('source');
    const dateRangeFilter = searchParams.get('date_range');

    const supabase = getServiceSupabase();

    let allLeadsRaw: any[] = [];

    if (supabase) {
      const { data, error } = await supabase
        .from('early_access')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        allLeadsRaw = data.map((d: any) => ({
          id: d.id,
          created_at: d.created_at,
          name: d.name || d.full_name || 'Unknown',
          full_name: d.name || d.full_name || 'Unknown',
          email: d.email,
          phone: d.phone,
          business_name: d.business_name,
          business_type: d.business_type,
          employee_count: d.employee_count || d.role,
          role: d.employee_count || d.role,
          current_accounting: d.current_accounting || d.message,
          source: d.source || 'landing_page',
          status: d.status || 'new',
        }));
      }
    }

    if (allLeadsRaw.length === 0) {
      allLeadsRaw = [...(globalThis.__dhanviEarlyAccessRecords || [])].map((d) => ({
        id: d.id,
        created_at: d.created_at,
        name: d.name,
        full_name: d.name,
        email: d.email,
        phone: d.phone,
        business_name: d.business_name,
        business_type: d.business_type,
        employee_count: d.employee_count,
        role: d.employee_count,
        current_accounting: d.current_accounting,
        source: d.source || 'landing_page',
        status: d.status,
      }));
    }

    // Compute Overall Real-Time Analytics from full dataset
    const totalCount = allLeadsRaw.length;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthCount = allLeadsRaw.filter((l) => {
      try {
        const d = new Date(l.created_at);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      } catch {
        return false;
      }
    }).length;

    // Pipeline funnel counts
    const pipeline = {
      new: allLeadsRaw.filter((l) => l.status === 'new').length,
      contacted: allLeadsRaw.filter((l) => l.status === 'contacted').length,
      qualified: allLeadsRaw.filter((l) => l.status === 'qualified').length,
      demo: allLeadsRaw.filter((l) => l.status === 'demo').length,
      converted: allLeadsRaw.filter((l) => l.status === 'converted').length,
    };

    const conversionRate =
      totalCount > 0 ? ((pipeline.converted / totalCount) * 100).toFixed(1) : '0.0';

    // Business type distribution
    const businessTypeCounts: Record<string, number> = {};
    allLeadsRaw.forEach((l) => {
      const type = l.business_type || 'Other';
      businessTypeCounts[type] = (businessTypeCounts[type] || 0) + 1;
    });

    const businessTypeAnalytics = Object.entries(businessTypeCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Accounting systems distribution
    const accountingCounts: Record<string, number> = {};
    allLeadsRaw.forEach((l) => {
      const acc = l.current_accounting || 'Other';
      accountingCounts[acc] = (accountingCounts[acc] || 0) + 1;
    });

    const accountingAnalytics = Object.entries(accountingCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Source distribution
    const sourceCounts: Record<string, number> = {};
    allLeadsRaw.forEach((l) => {
      const src = l.source || 'landing_page';
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    const sourceAnalytics = Object.entries(sourceCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Team size distribution
    const teamSizeCounts: Record<string, number> = {};
    allLeadsRaw.forEach((l) => {
      const size = l.employee_count || '1–5';
      teamSizeCounts[size] = (teamSizeCounts[size] || 0) + 1;
    });

    const teamSizeAnalytics = Object.entries(teamSizeCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Filter leads based on query params
    let filtered = [...allLeadsRaw];

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    if (businessTypeFilter && businessTypeFilter !== 'all') {
      filtered = filtered.filter(
        (l) => (l.business_type || '').toLowerCase() === businessTypeFilter.toLowerCase()
      );
    }

    if (teamSizeFilter && teamSizeFilter !== 'all') {
      filtered = filtered.filter((l) => l.employee_count === teamSizeFilter);
    }

    if (accountingFilter && accountingFilter !== 'all') {
      filtered = filtered.filter(
        (l) => (l.current_accounting || '').toLowerCase() === accountingFilter.toLowerCase()
      );
    }

    if (sourceFilter && sourceFilter !== 'all') {
      filtered = filtered.filter(
        (l) => (l.source || '').toLowerCase() === sourceFilter.toLowerCase()
      );
    }

    if (dateRangeFilter && dateRangeFilter !== 'all') {
      const dayMs = 86400000;
      const nowTime = now.getTime();

      if (dateRangeFilter === 'today') {
        filtered = filtered.filter((l) => {
          try {
            const d = new Date(l.created_at);
            return d.toDateString() === now.toDateString();
          } catch {
            return false;
          }
        });
      } else if (dateRangeFilter === '7d') {
        filtered = filtered.filter(
          (l) => nowTime - new Date(l.created_at).getTime() <= 7 * dayMs
        );
      } else if (dateRangeFilter === '30d') {
        filtered = filtered.filter(
          (l) => nowTime - new Date(l.created_at).getTime() <= 30 * dayMs
        );
      } else if (dateRangeFilter === 'month') {
        filtered = filtered.filter((l) => {
          try {
            const d = new Date(l.created_at);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
          } catch {
            return false;
          }
        });
      }
    }

    if (query) {
      filtered = filtered.filter(
        (l) =>
          (l.name && l.name.toLowerCase().includes(query)) ||
          (l.email && l.email.toLowerCase().includes(query)) ||
          (l.business_name && l.business_name.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      leads: filtered,
      analytics: {
        totalSignups: totalCount,
        thisMonthSignups: thisMonthCount,
        conversionRate,
        pipeline,
        businessTypes: businessTypeAnalytics,
        accountingSystems: accountingAnalytics,
        sources: sourceAnalytics,
        teamSizes: teamSizeAnalytics,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// PATCH: Update lead status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('early_access')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, lead: data });
      }
    }

    const item = globalThis.__dhanviEarlyAccessRecords?.find((l) => l.id === id);
    if (item) {
      item.status = status;
      return NextResponse.json({ success: true, lead: item });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
