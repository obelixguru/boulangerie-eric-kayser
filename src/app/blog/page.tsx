import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal — Le Blog de la Boulangerie",
  description:
    "Recettes, astuces boulangères et coulisses du fournil. Le journal d'Eric Kayser Louvre-Rivoli.",
  openGraph: {
    title: "Le Journal du Boulanger — Eric Kayser Louvre-Rivoli",
    description:
      "Recettes, astuces boulangères et coulisses du fournil. Découvrez notre expertise artisanale.",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Journal", href: "/blog" },
        ]}
      />
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

        {/* Category pills */}
        {categories.length > 0 && (
          <section className="border-b border-stone-200">
            <div className="mx-auto max-w-6xl px-4 py-4 flex gap-2 overflow-x-auto scrollbar-none">
              <span className="shrink-0 rounded-full px-4 py-2 text-sm font-medium bg-stone-900 text-white">
                Tout
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="shrink-0 rounded-full px-4 py-2 text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Articles grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            {posts.length === 0 ? (
              <p className="text-center text-stone-500 py-12">
                Aucun article pour le moment. Revenez bientôt !
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-3">
                {posts.map((article) => (
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
                        <time>
                          {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
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
            )}
          </div>
        </section>

        {/* Internal link silo */}
        <section className="py-12 bg-stone-50">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-serif text-2xl">Goûtez ce que vous lisez</h2>
            <p className="mt-2 text-stone-500 max-w-md mx-auto">
              Nos pains au levain, viennoiseries pur beurre et coffrets artisanaux sont disponibles en Click &amp; Collect.
            </p>
            <Link
              href="/boutique"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C05A3C] px-8 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
            >
              Voir la Boutique
              <ArrowRight className="size-4" />
            </Link>
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
