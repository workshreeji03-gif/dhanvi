import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "@/lib/supabase/config";

// Server-side Supabase client using Service Role Key (NEVER exposed to client)
function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes("your-project")) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Helper to get Resend instance safely
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_resend_api_key" || apiKey.includes("placeholder")) {
    return null;
  }
  return new Resend(apiKey);
}

// Helper to sanitize HTML content to prevent HTML injection in emails
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Helper to mask email for privacy (e.g. john.doe@example.com -> j***e@example.com)
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) {
    return local[0] + "***@" + domain;
  }
  return local[0] + "***" + local[local.length - 1] + "@" + domain;
}

// Generate the authorized Dhanvi Early Access confirmation email
function generateWaitlistConfirmationEmailHtml(firstName: string, waitlistNumber: number) {
  const safeName = escapeHtml(firstName);
  const numStr = waitlistNumber.toLocaleString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the Dhanvi Early Access List — #${numStr}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0e12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0e12; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #12151b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          <!-- Header with authoritative Dhanvi branding -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); background: linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%);">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="https://dhanvi.online/logo.svg" alt="Dhanvi" width="100" style="display: block; border: 0; filter: invert(1);" />
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; letter-spacing: 0.5px;">
                      EARLY ACCESS
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 32px 40px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #10b981;">
                CONFIRMATION
              </p>
              <h1 style="margin: 0 0 20px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; line-height: 1.25;">
                Welcome to Dhanvi.
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Hi ${safeName},
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                You're officially on the Dhanvi Early Access list.
              </p>

              <!-- Position Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 14px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 6px;">
                      Your position
                    </div>
                    <div style="font-size: 38px; font-weight: 900; letter-spacing: -1px; color: #10b981; font-family: monospace;">
                      #${numStr}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.65; color: #cbd5e1;">
                Dhanvi is being built around a simple but ambitious idea:
              </p>
              <blockquote style="margin: 0 0 24px 0; padding: 14px 18px; border-left: 3px solid #10b981; background: rgba(16, 185, 129, 0.05); font-size: 15px; line-height: 1.6; color: #f1f5f9; font-weight: 600;">
                What if an investment organization could be designed from the ground up around artificial intelligence?
              </blockquote>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.65; color: #94a3b8;">
                We're exploring a system where specialized AI agents can collaborate across market research, company intelligence, macro analysis, strategy development, portfolio construction, risk and institutional memory.
              </p>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.65; color: #94a3b8;">
                This is still the beginning. As Dhanvi develops, we'll use this list to share meaningful product updates, research milestones and early-access opportunities.
              </p>

              <!-- Number Reminder Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.75px; color: #64748b;">
                      Your Early Access Number
                    </div>
                    <div style="font-size: 18px; font-weight: 800; color: #ffffff; font-family: monospace; margin-top: 4px;">
                      #${numStr}
                    </div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
                      Keep this email for your records.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Signoff -->
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #ffffff;">
                  Team Dhanvi
                </p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #10b981; font-style: italic;">
                  Building an AI-native investment intelligence system.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0e1015; border-top: 1px solid rgba(255, 255, 255, 0.04); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                Dhanvi — <a href="https://dhanvi.online" style="color: #94a3b8; text-decoration: none;">dhanvi.online</a>
              </p>
              <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #475569;">
                This email was sent because you registered for the Dhanvi Early Access waitlist.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

// In-memory fallback dataset for development/offline
declare global {
  var __dhanviEarlyAccessRecords: Array<{
    id: string;
    created_at: string;
    name: string;
    email: string;
    business_name: string;
    business_type: string;
    employee_count?: string;
    status: string;
  }> | undefined;
}

if (!globalThis.__dhanviEarlyAccessRecords) {
  globalThis.__dhanviEarlyAccessRecords = [];
}

const BASE_WAITLIST_OFFSET = 142; // Starting seed for institutional waitlist sequence

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.fullName || body.name || body.full_name || "").trim();
    const email = (body.email || body.workEmail || "").trim().toLowerCase();
    const company = (body.company || body.business_name || body.organization || "").trim() || "Independent";
    const role = (body.role || body.business_type || "Other").trim();

    // 1. Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email address." },
        { status: 400 }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const firstName = name.split(" ")[0] || "there";
    const supabase = getServiceSupabase();
    let waitlistNumber = BASE_WAITLIST_OFFSET;
    let recordCreatedAt = new Date().toISOString();

    if (supabase) {
      // 3. Check duplicate email in Supabase
      const { data: existingLead } = await supabase
        .from("early_access")
        .select("id, email, created_at, name")
        .eq("email", email)
        .maybeSingle();

      if (existingLead) {
        recordCreatedAt = existingLead.created_at;

        // Calculate existing position based on created_at
        const { count } = await supabase
          .from("early_access")
          .select("*", { count: "exact", head: true })
          .lte("created_at", existingLead.created_at);

        waitlistNumber = BASE_WAITLIST_OFFSET + (count || 1);

        return NextResponse.json({
          success: true,
          alreadyRegistered: true,
          waitlist_number: waitlistNumber,
          first_name: firstName,
          masked_email: maskEmail(email),
          message: "You're already on the Dhanvi waitlist.",
        });
      }

      // 4. Insert into early_access table
      const { data: insertedLead, error: insertError } = await supabase
        .from("early_access")
        .insert({
          name,
          email,
          business_name: company,
          business_type: role,
          employee_count: role,
          current_accounting: "Quantitative Research",
          status: "new",
        })
        .select()
        .single();

      if (insertError) {
        // Check for race-condition duplicate
        if (insertError.code === "23505" || insertError.message?.includes("duplicate")) {
          const { data: raceLead } = await supabase
            .from("early_access")
            .select("id, created_at")
            .eq("email", email)
            .maybeSingle();

          const { count } = await supabase
            .from("early_access")
            .select("*", { count: "exact", head: true })
            .lte("created_at", raceLead?.created_at || new Date().toISOString());

          return NextResponse.json({
            success: true,
            alreadyRegistered: true,
            waitlist_number: BASE_WAITLIST_OFFSET + (count || 1),
            first_name: firstName,
            masked_email: maskEmail(email),
            message: "You're already on the Dhanvi waitlist.",
          });
        }

        console.error("Supabase insert error:", insertError);
        return NextResponse.json(
          { error: "Unable to join waitlist. Please try again." },
          { status: 500 }
        );
      }

      if (insertedLead) {
        recordCreatedAt = insertedLead.created_at;
        const { count } = await supabase
          .from("early_access")
          .select("*", { count: "exact", head: true })
          .lte("created_at", insertedLead.created_at);

        waitlistNumber = BASE_WAITLIST_OFFSET + (count || 1);
      }
    } else {
      // In-memory fallback
      const existing = globalThis.__dhanviEarlyAccessRecords!.find(
        (r) => r.email === email
      );

      if (existing) {
        const idx = globalThis.__dhanviEarlyAccessRecords!.indexOf(existing);
        return NextResponse.json({
          success: true,
          alreadyRegistered: true,
          waitlist_number: BASE_WAITLIST_OFFSET + idx + 1,
          first_name: firstName,
          masked_email: maskEmail(email),
          message: "You're already on the Dhanvi waitlist.",
        });
      }

      const newRec = {
        id: "mem-" + Date.now(),
        created_at: recordCreatedAt,
        name,
        email,
        business_name: company,
        business_type: role,
        status: "new",
      };
      globalThis.__dhanviEarlyAccessRecords!.push(newRec);
      waitlistNumber = BASE_WAITLIST_OFFSET + globalThis.__dhanviEarlyAccessRecords!.length;
    }

    // 5. Send Transactional Confirmation Email via Resend
    let userEmailSent = false;
    const resend = getResendClient();

    if (resend) {
      try {
        const { error: resendError } = await resend.emails.send({
          from: "Dhanvi <no-reply@dhanvi.online>",
          to: [email],
          subject: `You're on the Dhanvi Early Access List — #${waitlistNumber}`,
          html: generateWaitlistConfirmationEmailHtml(firstName, waitlistNumber),
        });

        if (resendError) {
          console.warn("Resend email delivery notice:", resendError);
        } else {
          userEmailSent = true;
        }
      } catch (err) {
        console.warn("Resend email delivery exception:", err);
      }
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      waitlist_number: waitlistNumber,
      first_name: firstName,
      masked_email: maskEmail(email),
      userEmailSent,
      message: "You're in.",
    });
  } catch (error: any) {
    console.error("Early Access API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET: Fetch leads and analytics for internal admin dashboard
export async function GET(req: NextRequest) {
  try {
    const supabase = getServiceSupabase();
    let leads: any[] = [];

    if (supabase) {
      const { data } = await supabase
        .from("early_access")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) leads = data;
    } else {
      leads = globalThis.__dhanviEarlyAccessRecords || [];
    }

    return NextResponse.json({
      leads,
      totalCount: leads.length,
      nextWaitlistNumber: BASE_WAITLIST_OFFSET + leads.length + 1,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
