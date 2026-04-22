import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal — Le Blog de la Boulangerie",
  description:
    "Recettes, astuces boulangères et coulisses du fournil. Le journal d'Eric Kayser Louvre-Rivoli.",
};

const ARTICLES = [
  {
    slug: "secret-levain-naturel",
    title: "Le secret du levain naturel : pourquoi il change tout",
    excerpt:
      "Fermentation lente, saveurs profondes, meilleure digestibilité. Découvrez comment notre levain liquide transforme la farine en pain d'exception.",
    date: "18 avril 2026",
    category: "Savoir-faire",
    image:
      "https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwyfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "5 min",
  },
  {
    slug: "guide-viennoiseries-paris",
    title: "Guide des viennoiseries : croissant, pain au chocolat et brioche",
    excerpt:
      "Beurre AOP, feuilletage à 27 tours, cuisson dorée. Les secrets d'une viennoiserie pur beurre réussie, expliqués par notre chef.",
    date: "15 avril 2026",
    category: "Recettes",
    image:
      "https://images.unsplash.com/photo-1773027270919-8714e0af1172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "4 min",
  },
  {
    slug: "boulangerie-louvre-rivoli-histoire",
    title: "Notre boulangerie au Louvre-Rivoli : 8 ans d'histoire",
    excerpt:
      "De l'ouverture en 2018 au lancement du Click & Collect, retour sur l'aventure Eric Kayser au cœur de Paris.",
    date: "10 avril 2026",
    category: "Coulisses",
    image:
      "https://images.unsplash.com/photo-1775326824244-b76f510665db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "6 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl sm:text-4xl">Le Journal</h1>
            <p className="mt-2 text-stone-500 max-w-lg">
              Recettes, coulisses du fournil et savoir-faire boulanger. Le blog
              d&apos;Eric Kayser Louvre-Rivoli.
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <time>{article.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{article.readTime} de lecture</span>
                    </div>
                    <h2 className="mt-2 font-serif text-lg leading-snug line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-stone-500 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#C05A3C] hover:underline"
                    >
                      Lire l&apos;article
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-stone-900 py-16 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-3xl text-white">
              Ne manquez aucun article
            </h2>
            <p className="mt-3 text-stone-400 max-w-md mx-auto">
              Inscrivez-vous à notre newsletter et recevez nos recettes,
              actualités et offres exclusives.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                required
                className="flex-1 rounded-full border border-stone-700 bg-stone-800 px-5 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#C05A3C] min-h-[48px]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#C05A3C] px-6 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
