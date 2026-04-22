import { NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/email";

// Vercel cron: runs weekly to re-engage inactive subscribers (30+ days)
// In production, this would query a database (Supabase) for inactive users.
// For now, it demonstrates the re-engagement flow architecture.

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "MOCK_CRON_SECRET_HERE";

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // In production: query Supabase for subscribers inactive > 30 days
    // const { data: inactiveUsers } = await supabase
    //   .from('subscribers')
    //   .select('email')
    //   .lt('last_order_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    //   .eq('unsubscribed', false);

    // Mock: no real subscribers yet
    const inactiveUsers: { email: string }[] = [];
    let sent = 0;
    let errors = 0;

    for (const user of inactiveUsers) {
      try {
        await sendEmail({
          to: user.email,
          subject: emailTemplates.reEngagement.subject,
          html: emailTemplates.reEngagement.html,
        });
        sent++;
      } catch {
        errors++;
        console.error(`[re-engagement] Failed to send to ${user.email}`);
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      errors,
      total: inactiveUsers.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[re-engagement] Cron error:", error);
    return NextResponse.json(
      { error: "Re-engagement cron failed" },
      { status: 500 }
    );
  }
}
