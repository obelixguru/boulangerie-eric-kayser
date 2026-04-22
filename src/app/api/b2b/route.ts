import { NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, message } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    if (!name || !company) {
      return NextResponse.json(
        { error: "Nom et établissement requis" },
        { status: 400 }
      );
    }

    // Send B2B proposal email to the prospect
    await sendEmail({
      to: email,
      subject: emailTemplates.b2bProspection.subject,
      html: emailTemplates.b2bProspection.html,
    });

    // Notify the owner about the B2B lead
    const ownerEmail = process.env.OWNER_EMAIL || "bonjour@maison-kayser.com";
    await sendEmail({
      to: ownerEmail,
      subject: `[B2B Lead] ${company} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #2C1810;">Nouveau lead B2B</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Établissement :</strong> ${company}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
          ${message ? `<p><strong>Message :</strong> ${message}</p>` : ""}
          <p style="color: #a8a29e; font-size: 13px; margin-top: 24px;">
            Lead reçu le ${new Date().toLocaleDateString("fr-FR")} via le formulaire B2B du site.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée. Nous vous répondrons sous 24h.",
    });
  } catch (error) {
    console.error("[b2b] Lead submission error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Réessayez." },
      { status: 500 }
    );
  }
}
