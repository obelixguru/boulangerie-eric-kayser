import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la boulangerie Eric Kayser Louvre-Rivoli. Horaires, adresse, téléphone et formulaire de contact. 226 Rue de Rivoli, Paris 1er.",
};

const FAQ = [
  {
    q: "Quels sont vos horaires d'ouverture ?",
    a: "Lundi au samedi : 7h – 20h. Dimanche : 7h30 – 19h. Ouvert les jours fériés.",
  },
  {
    q: "Proposez-vous le Click & Collect ?",
    a: "Oui ! Commandez en ligne sur notre boutique et retirez votre commande en boutique dans l'heure.",
  },
  {
    q: "Quels allergènes sont présents dans vos produits ?",
    a: "Nos pains contiennent du gluten (blé). Nos viennoiseries contiennent gluten, lait, oeufs et beurre. La liste complète des allergènes est disponible en boutique.",
  },
  {
    q: "Faites-vous des commandes pour événements ?",
    a: "Oui, nous proposons des commandes spéciales pour événements, séminaires et réceptions. Contactez-nous par email ou téléphone.",
  },
  {
    q: "Y a-t-il un minimum de commande en ligne ?",
    a: "Non, pas de minimum de commande. Vous pouvez commander à partir d'un seul produit.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl sm:text-4xl">Contact</h1>
            <p className="mt-2 text-stone-500 max-w-lg">
              Une question ? Besoin d&apos;un renseignement ? Nous sommes là
              pour vous aider.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div>
            <h2 className="font-serif text-2xl">Envoyez-nous un message</h2>
            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="votre@email.com"
                  autoFocus
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C05A3C]/30 focus:border-[#C05A3C] min-h-[48px]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Votre message..."
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C05A3C]/30 focus:border-[#C05A3C] resize-y"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#C05A3C] px-6 py-3 text-white text-sm font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-2xl">Informations pratiques</h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                <div>
                  <p className="font-medium text-stone-900">Adresse</p>
                  <p className="text-sm text-stone-600">
                    226 Rue de Rivoli, 75001 Paris
                  </p>
                  <p className="text-sm text-stone-500">
                    Métro Palais Royal – Musée du Louvre (lignes 1 &amp; 7)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                <div>
                  <p className="font-medium text-stone-900">Horaires</p>
                  <p className="text-sm text-stone-600">
                    Lun – Sam : 7h – 20h
                  </p>
                  <p className="text-sm text-stone-600">Dim : 7h30 – 19h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                <div>
                  <p className="font-medium text-stone-900">Téléphone</p>
                  <a
                    href="tel:+33142975929"
                    className="text-sm text-[#C05A3C] hover:underline"
                  >
                    01 42 97 59 29
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                <div>
                  <p className="font-medium text-stone-900">Email</p>
                  <a
                    href="mailto:contact@erickayser-louvre.fr"
                    className="text-sm text-[#C05A3C] hover:underline"
                  >
                    contact@erickayser-louvre.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="border-t border-stone-200 bg-stone-50 py-12">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl text-center">
              Questions Fréquentes
            </h2>
            <div className="mt-8 space-y-4">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg bg-white border border-stone-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-stone-900 hover:bg-stone-50 min-h-[48px]">
                    {item.q}
                    <span className="ml-4 shrink-0 text-stone-400 group-open:rotate-180 transition-transform">
                      &#9660;
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-stone-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
