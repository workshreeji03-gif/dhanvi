import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, role, businessId } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required." }, { status: 400 });
    }

    const assignedRole = role === "ACCOUNTANT" ? "ACCOUNTANT" : "STAFF";

    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database configuration missing." }, { status: 500 });
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    });

    // 1. Verify caller session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    // 2. Verify caller is OWNER of this business
    let targetBizId = businessId;
    if (!targetBizId) {
      const { data: userMemberships } = await supabase
        .from("business_members")
        .select("business_id, role")
        .eq("user_id", user.id)
        .eq("role", "OWNER")
        .limit(1);

      if (!userMemberships || userMemberships.length === 0) {
        return NextResponse.json({ error: "Only business owners can invite team members." }, { status: 403 });
      }
      targetBizId = userMemberships[0].business_id;
    }

    // 3. Fetch business name
    const { data: business } = await supabase
      .from("businesses")
      .select("name")
      .eq("id", targetBizId)
      .single();

    const businessName = business?.name || "Dhanvi Workspace";

    // 4. Send email notification via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const origin = process.env.NEXT_PUBLIC_APP_URL || "https://dhanvi.online";
    const inviteUrl = origin + "/signup?email=" + encodeURIComponent(email) + "&role=" + assignedRole + "&biz=" + targetBizId;

    if (resendApiKey && !resendApiKey.includes("your_resend_api_key")) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + resendApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Dhanvi <no-reply@dhanvi.online>",
            to: [email],
            subject: `Invitation to join ${businessName} on Dhanvi`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; color: #111827; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="margin-bottom: 24px;"><span style="font-size: 20px; font-weight: 800; color: #047857;">DHANVI</span></div>
                <h1 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">You have been invited to ${businessName}</h1>
                <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin-bottom: 24px;">You have been invited to access <strong>${businessName}</strong> with the role of <strong>${assignedRole}</strong> on Dhanvi.</p>
                <div style="margin-bottom: 32px;"><a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background-color: #047857; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px;">Accept Invitation</a></div>
                <p style="font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px;">If you did not expect this invitation, you can safely ignore this email.</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn("Resend email delivery notice:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Invitation sent to " + email + " as " + assignedRole + ".",
      inviteUrl,
    });
  } catch (err) {
    console.error("Invite API error:", err);
    return NextResponse.json({ error: err.message || "Failed to send invitation." }, { status: 500 });
  }
}
