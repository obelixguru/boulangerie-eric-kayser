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
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Votre prochaine pause gourmande vous attend au Louvre</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Bienvenue dans la communauté Eric Kayser Louvre-Rivoli. Pains au levain, viennoiseries signatures, créations pâtissières — tout est fait maison, chaque matin, au 4 Rue de l'Échelle.
        </p>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Commandez en ligne et retirez en boutique sans attente grâce au Click & Collect.
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
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Par quoi commencer chez Eric Kayser ?</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Nos clients du quartier Louvre-Rivoli reviennent d'abord pour ces 3 essentiels :
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
    subject: "Et si votre pain vous attendait déjà chaque semaine ?",
    previewText: "La routine la plus simple pour ne jamais manquer de bon pain artisanal.",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 40px 24px;">
        <img src="https://boulangerie-eric-kayser-louvre-rivo.vercel.app/logo.svg" alt="Eric Kayser" style="height: 48px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; color: #2C1810; margin-bottom: 16px;">Gagnez du temps avec notre abonnement pain</h1>
        <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
          Imaginez : chaque matin, votre pain au levain vous attend en boutique. Plus de file d'attente, plus d'oubli. Juste le plaisir d'un pain frais garanti.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #2C1810; color: #FAF8F5;">
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
