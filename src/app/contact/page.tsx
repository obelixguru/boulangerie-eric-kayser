import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Nous Trouver",
  description:
    "Contactez la boulangerie Eric Kayser Louvre-Rivoli. 226 Rue de Rivoli, Paris 1er. Horaires, téléphone, formulaire de contact et FAQ.",
  openGraph: {
    title: "Contact — Eric Kayser Louvre-Rivoli",
    description:
      "Trouvez notre boulangerie au 226 Rue de Rivoli, Paris 1er. Horaires, contact et FAQ.",
  },
  alternates: { canonical: "/contact" },
};

const FAQ = [
  {
    q: "Quels sont vos horaires d'ouverture ?",
    a: "Nous sommes ouverts du lundi au samedi de 7h à 20h, et le dimanche de 7h30 à 19h.",
  },
  {
    q: "Proposez-vous le Click & Collect ?",
    a: "Oui ! Commandez en ligne sur notre boutique et retirez vos produits frais en magasin sous 30 minutes.",
  },
  {
    q: "Quels allergènes sont présents dans vos produits ?",
    a: "Nos produits contiennent du gluten (blé), du lait, des œufs et des fruits à coque. La liste complète des allergènes est disponible en boutique et sur chaque fiche produit.",
  },
  {
    q: "Livrez-vous à domicile ?",
    a: "Pour le moment, nous proposons uniquement le retrait en boutique (Click & Collect). La livraison locale est en cours de développement.",
  },
  {
    q: "Faites-vous des commandes pour événements ou entreprises ?",
    a: "Absolument ! Contactez-nous via le formulaire ci-dessous ou par téléphone pour les commandes professionnelles, mariages ou événements.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl sm:text-4xl">Nous Contacter</h1>
            <p className="mt-2 text-stone-500 max-w-lg">
              Une question, une commande spéciale ou un partenariat ? Nous sommes
              à votre écoute.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl">Informations</h2>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-stone-500">226 Rue de Rivoli, 75001 Paris</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                  <div>
                    <p className="font-medium">Horaires</p>
                    <p className="text-sm text-stone-500">Lun–Sam : 7h–20h<br />Dimanche : 7h30–19h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-stone-500">01 42 97 59 29</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 mt-0.5 shrink-0 text-[#C05A3C]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-stone-500">contact@eric-kayser-louvre.fr</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-2xl overflow-hidden bg-stone-200 aspect-[16/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7!2d2.3387!3d48.8606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s226+Rue+de+Rivoli%2C+75001+Paris!5e0!3m2!1sfr!2sfr"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte Google Maps"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl">Envoyez-nous un message</h2>
              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" id="email" name="email" required placeholder="votre@email.com" className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C05A3C] focus:border-transparent min-h-[48px]" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Sujet</label>
                  <select id="subject" name="subject" className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C05A3C] focus:border-transparent min-h-[48px]">
                    <option>Question générale</option>
                    <option>Commande Click &amp; Collect</option>
                    <option>Commande pro / événement</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="Votre message..." className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C05A3C] focus:border-transparent resize-none" />
                </div>
                <button type="submit" className="w-full rounded-full bg-[#C05A3C] px-6 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]">Envoyer</button>
              </form>
            </div>
          </div>
        </section>
        <section className="bg-stone-50 py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-3xl text-center">Questions Fréquentes</h2>
            <div className="mt-10 space-y-4">
              {FAQ.map((item) => (
                <details key={item.q} className="group rounded-xl bg-white border border-stone-200 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-sm hover:bg-stone-50 transition-colors min-h-[48px] list-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="ml-4 shrink-0 text-stone-400 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-stone-600 leading-relaxed">{item.a}</div>
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
