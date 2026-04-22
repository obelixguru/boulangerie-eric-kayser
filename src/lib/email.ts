import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY || "MOCK_RESEND_API_KEY_HERE"
);

const FROM_EMAIL =
  process.env.EMAIL_FROM || "Eric Kayser Louvre-Rivoli <bonjour@maison-kayser.com>";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    replyTo: replyTo || "bonjour@maison-kayser.com",
  });

  if (error) {
    console.error("[email] Send failed:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  return data;
}

// Welcome drip email templates
export const emailTemplates = {
  welcome: {
    subject: "Bienvenue chez Eric Kayser Louvre Rivoli",
    previewText: "Pains au levain, viennoiseries signatures, retrait rapide au 4 Rue de l'Échelle.",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 40px 24px;">
        <img src="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/logo.svg" alt="Eric Kayser" style="height: 48px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Bienvenue chez Eric Kayser Louvre Rivoli</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Pains au levain, viennoiseries signatures et retrait rapide au cœur de Paris. Découvrez les essentiels de la maison et commandez en quelques clics.
        </p>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Tout est fait maison, chaque matin, au 4 Rue de l'Échelle. Commandez en ligne et retirez sans attente grâce au Click & Collect.
        </p>
        <a href="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/boutique" style="display: inline-block; background: #C05A3C; color: white; padding: 14px 28px; text-decoration: none; font-weight: 600; margin-top: 16px;">
          Découvrir nos best-sellers →
        </a>
        <p style="font-size: 13px; color: #a8a29e; margin-top: 32px;">
          Eric Kayser — 4 Rue de l'Échelle, 75001 Paris<br/>
          <a href="https://boulangerie-eric-kayser-louvre-rivo.vercel.app" style="color: #C05A3C;">maison-kayser.com</a>
        </p>
      </div>
    `,
  },
  bestSellers: {
    subject: "Les incontournables de la maison Kayser",
    previewText: "Nos clients reviennent d'abord pour ces essentiels : baguette, croissant, pain signature.",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 40px 24px;">
        <img src="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/logo.svg" alt="Eric Kayser" style="height: 48px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Commencez par les incontournables</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Baguette croustillante, croissant pur beurre, pains signatures : voici les produits que nos clients choisissent en premier pour retrouver le vrai goût de Paris.
        </p>
        <div style="margin: 24px 0; padding: 16px; background: white; border-left: 3px solid #C05A3C;">
          <strong style="color: #2C1810;">1. Baguette Tradition au Levain</strong> — 1,50 €<br/>
          <span style="color: #78716c; font-size: 14px;">72h de fermentation, croûte craquante, mie alvéolée</span>
        </div>
        <div style="margin: 24px 0; padding: 16px; background: white; border-left: 3px solid #C05A3C;">
          <strong style="color: #2C1810;">2. Croissant Pur Beurre AOP</strong> — 2,20 €<br/>
          <span style="color: #78716c; font-size: 14px;">27 tours de feuilletage, beurre Charentes-Poitou</span>
        </div>
        <div style="margin: 24px 0; padding: 16px; background: white; border-left: 3px solid #C05A3C;">
          <strong style="color: #2C1810;">3. Pain de Campagne au Levain</strong> — 4,80 €<br/>
          <span style="color: #78716c; font-size: 14px;">Mélange T80 et seigle, 18h de fermentation</span>
        </div>
        <a href="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/boutique" style="display: inline-block; background: #C05A3C; color: white; padding: 14px 28px; text-decoration: none; font-weight: 600; margin-top: 8px;">
          Commander en Click & Collect →
        </a>
        <p style="font-size: 13px; color: #a8a29e; margin-top: 32px;">
          Eric Kayser — 4 Rue de l'Échelle, 75001 Paris
        </p>
      </div>
    `,
  },
  subscription: {
    subject: "Votre pain artisanal, prêt chaque semaine",
    previewText: "Gagnez du temps sans renoncer à la qualité. Abonnement pain au levain Eric Kayser.",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 40px 24px;">
        <img src="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/logo.svg" alt="Eric Kayser" style="height: 48px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Votre pain artisanal, prêt chaque semaine</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Gagnez du temps sans renoncer à la qualité. Notre formule d'abonnement vous permet de retrouver vos pains favoris au rythme qui vous convient.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #2C1810; color: #FAF8F5; position: relative;">
          <span style="position: absolute; top: -12px; right: 16px; background: #D4A574; color: #2C1810; font-size: 11px; font-weight: 700; padding: 4px 12px; text-transform: uppercase; letter-spacing: 0.5px;">Le plus populaire</span>
          <strong style="font-size: 18px;">Abonnement Hebdomadaire</strong><br/>
          <span style="font-size: 14px; opacity: 0.8;">1 baguette tradition + 1 pain spécial au choix</span><br/>
          <strong style="font-size: 24px; color: #D4A574; margin-top: 8px; display: inline-block;">9,90 €/semaine</strong><br/>
          <span style="font-size: 13px; opacity: 0.7;">soit -15% vs achat unitaire</span>
        </div>
        <a href="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/boutique" style="display: inline-block; background: #C05A3C; color: white; padding: 14px 28px; text-decoration: none; font-weight: 600; margin-top: 8px;">
          Découvrir l'abonnement →
        </a>
        <p style="font-size: 13px; color: #a8a29e; margin-top: 32px;">
          Eric Kayser — 4 Rue de l'Échelle, 75001 Paris<br/>
          <a href="https://boulangerie-eric-kayser-louvre-rivo.vercel.app" style="color: #C05A3C;">maison-kayser.com</a>
        </p>
      </div>
    `,
  },
};
