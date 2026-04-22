import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Depuis 1996, Eric Kayser perpétue l'art du levain naturel. Découvrez notre savoir-faire artisanal au cœur du Louvre-Rivoli, Paris 1er.",
  openGraph: {
    title: "Notre Histoire — Eric Kayser Louvre-Rivoli",
    description:
      "Depuis 1996, l'art du levain naturel au cœur du Louvre-Rivoli. Savoir-faire artisanal parisien.",
  },
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Levain Naturel",
    desc: "Notre levain liquide, cultivé depuis 1996, donne à chaque pain sa signature unique : mie alvéolée, croûte craquante, arômes profonds.",
  },
  {
    title: "Farines Sélectionnées",
    desc: "Blés français de meuniers partenaires. Zéro additif, zéro améliorant. La farine, l'eau, le sel, le temps.",
  },
  {
    title: "Fermentation Lente",
    desc: "48 heures minimum pour nos pains signature. La patience donne le goût — et une meilleure digestibilité.",
  },
];

const TIMELINE = [
  { year: "1996", event: "Eric Kayser ouvre sa première boulangerie à Paris." },
  { year: "2004", event: "Expansion internationale — Tokyo, New York, Dubaï." },
  { year: "2018", event: "Ouverture de la boutique Louvre-Rivoli, au cœur de Paris." },
  { year: "2026", event: "Lancement du Click & Collect en ligne." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Notre Histoire", href: "/about" },
        ]}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[50dvh] flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1775326824244-b76f510665db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Devanture de la boulangerie Eric Kayser Louvre-Rivoli"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20">
            <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight max-w-lg">
              L&apos;art du levain naturel.
            </h1>
            <p className="mt-4 text-lg text-stone-200 max-w-md">
              Depuis 1996, nous perpétuons un savoir-faire artisanal exigeant.
              Chaque pain raconte une histoire de patience et de passion.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-3xl text-center">
              Notre Savoir-Faire
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {VALUES.map((v) => (
                <div key={v.title} className="text-center">
                  <h3 className="font-serif text-xl">{v.title}</h3>
                  <p className="mt-3 text-sm text-stone-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bakery interior photo + story */}
        <section className="bg-stone-100 py-16">
          <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1620830958756-46335282c574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHw0fHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Pains artisanaux exposés dans la boulangerie"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl">
                Un lieu, une passion.
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Au 226 Rue de Rivoli, à deux pas du Louvre, notre boutique accueille
                chaque jour touristes et Parisiens. L&apos;odeur du pain frais, la
                chaleur du fournil, le craquement de la croûte : ici, la boulangerie
                est un art vivant.
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Eric Kayser a révolutionné la boulangerie française avec son levain
                liquide breveté. Une fermentation naturelle qui donne à chaque pain
                ses arômes complexes et sa conservation exceptionnelle.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-3xl text-center">
              Notre Parcours
            </h2>
            <div className="mt-10 max-w-2xl mx-auto space-y-8">
              {TIMELINE.map((t) => (
                <div key={t.year} className="flex gap-6">
                  <span className="font-serif text-2xl text-[#D4AF37] shrink-0 w-16 text-right">
                    {t.year}
                  </span>
                  <div className="border-l-2 border-stone-200 pl-6 pb-2">
                    <p className="text-stone-700">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-stone-900 py-16 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-3xl text-white">
              Goûtez la différence.
            </h2>
            <p className="mt-3 text-stone-400 max-w-md mx-auto">
              Commandez en ligne et venez retirer vos pains frais au Louvre-Rivoli.
            </p>
            <Link
              href="/boutique"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C05A3C] px-8 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
            >
              Découvrir la Boutique
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
