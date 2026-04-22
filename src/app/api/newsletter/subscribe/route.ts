import { NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Send welcome email immediately
    await sendEmail({
      to: email,
      subject: emailTemplates.welcome.subject,
      html: emailTemplates.welcome.html,
    });

    // In production, you would:
    // 1. Store the subscriber in a database (Supabase)
    // 2. Schedule email 2 (best-sellers) for J+1 via a cron job
    // 3. Schedule email 3 (subscription) for J+4 via a cron job
    // For now, the drip sequence is documented and ready to wire up.

    return NextResponse.json({
      success: true,
      message: "Bienvenue ! Vérifiez votre boîte de réception.",
    });
  } catch (error) {
    console.error("[newsletter] Subscribe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription. Réessayez." },
      { status: 500 }
    );
  }
}
