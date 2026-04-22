import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Conseils boulangerie, recettes au levain et coulisses du fournil. Le journal d'Eric Kayser Louvre-Rivoli.",
};

const PLACEHOLDER_POSTS = [
  {
    slug: "secret-levain-naturel",
    title: "Le secret du levain naturel",
    excerpt:
      "Pourquoi le levain donne-t-il un goût si particulier au pain ? Découvrez la science derrière notre fermentation lente de 48 heures.",
    image:
      "https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwyfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "18 avril 2026",
    category: "Savoir-faire",
  },
  {
    slug: "guide-croissant-parfait",
    title: "Guide : le croissant parfait",
    excerpt:
      "Feuilletage, tourage, beurre AOP — les étapes clés pour reconnaître un vrai croissant artisanal.",
    image:
      "https://images.unsplash.com/photo-1773027270919-8714e0af1172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "12 avril 2026",
    category: "Recettes",
  },
  {
    slug: "boulangerie-louvre-histoire",
    title: "Du Louvre à votre table",
    excerpt:
      "L'histoire de notre boutique au 226 Rue de Rivoli : pourquoi nous avons choisi le coeur de Paris.",
    image:
      "https://images.unsplash.com/photo-1545253089-3ec09a4d3b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHw1fHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "5 avril 2026",
    category: "Notre Histoire",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl sm:text-4xl">
              Le Journal
            </h1>
            <p className="mt-2 text-stone-500 max-w-lg">
              Coulisses du fournil, conseils de conservation et recettes au
              levain. Tout ce qu&apos;il faut savoir sur le pain artisanal.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PLACEHOLDER_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <time className="text-xs text-stone-400">{post.date}</time>
                    <h2 className="mt-2 font-serif text-lg leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[#C05A3C] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-stone-500 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-stone-200 bg-stone-50 py-12">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-serif text-2xl">
              Recevez nos articles par email
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-md mx-auto">
              Conseils boulangerie, nouvelles recettes et offres exclusives.
              Pas de spam — promis.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                required
                className="flex-1 rounded-full border border-stone-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C05A3C]/30 focus:border-[#C05A3C] min-h-[48px]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#C05A3C] px-6 py-3 text-white text-sm font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
