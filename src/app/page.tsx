import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";

const BEST_SELLERS = [
  {
    name: "Pain du Jour",
    desc: "L'incontournable baguette de tradition.",
    price: "4,00 €",
    image:
      "https://images.unsplash.com/photo-1620830958756-46335282c574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHw0fHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: null,
  },
  {
    name: "Levain Signature",
    desc: "Fermentation lente 48h. Conservation exceptionnelle.",
    price: "8,00 €",
    image:
      "https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwyfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Best-seller",
  },
  {
    name: "Coffret Artisan",
    desc: "L'expérience parisienne à partager.",
    price: "22,00 €",
    image:
      "https://images.unsplash.com/photo-1773027270919-8714e0af1172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "Coffret",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[70dvh] flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1761594606868-1c577b10f69e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Vitrine de la boulangerie Eric Kayser avec pains artisanaux et viennoiseries"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-xl">
              Le vrai goût de Paris, sans l&apos;attente.
            </h1>
            <p className="mt-4 text-lg text-stone-200 max-w-md">
              Pains au levain naturel et viennoiseries pur beurre. Commandez en
              ligne, retirez au Louvre-Rivoli.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C05A3C] px-6 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
              >
                Commander (Click &amp; Collect)
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10 transition-colors min-h-[48px]"
              >
                Notre Histoire
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-b border-stone-200 py-4">
          <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-600">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>
                <strong className="text-stone-900">4.5/5</strong> sur
                TripAdvisor (280+ avis)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 text-[#C05A3C]" />
              <span>226 Rue de Rivoli, Paris 1er</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4 text-[#C05A3C]" />
              <span>Ouvert 7j/7 dès 7h</span>
            </div>
          </div>
        </section>

        {/* Best-Sellers */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-3xl text-center">
              Nos Incontournables
            </h2>
            <p className="mt-2 text-center text-stone-500">
              Sélection artisanale, cuite chaque matin.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {BEST_SELLERS.map((p) => (
                <div
                  key={p.name}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg">{p.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{p.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#C05A3C]">
                        {p.price}
                      </span>
                      <Link
                        href="/boutique"
                        className="rounded-full bg-stone-900 text-white px-4 py-2 text-sm hover:bg-stone-800 transition-colors min-h-[44px] flex items-center"
                      >
                        Ajouter
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-stone-100">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-serif text-3xl">
              Click &amp; Collect en 3 étapes
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Choisissez",
                  desc: "Parcourez notre sélection de pains et viennoiseries en ligne.",
                },
                {
                  step: "2",
                  title: "Payez",
                  desc: "Paiement sécurisé par carte bancaire via Stripe.",
                },
                {
                  step: "3",
                  title: "Retirez",
                  desc: "Passez au 226 Rue de Rivoli — votre commande vous attend.",
                },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center">
                  <div className="flex items-center justify-center size-14 rounded-full bg-[#C05A3C] text-white font-serif text-xl">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-serif text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-stone-500 max-w-xs">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-serif text-3xl">
              Prêt à goûter la différence ?
            </h2>
            <p className="mt-3 text-stone-500 max-w-md mx-auto">
              Commandez en ligne et retirez vos pains frais en boutique, sans
              attente.
            </p>
            <Link
              href="/boutique"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C05A3C] px-8 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
            >
              Voir la Boutique
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
