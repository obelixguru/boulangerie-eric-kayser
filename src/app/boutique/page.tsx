import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd, ProductListJsonLd } from "@/components/json-ld";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Commandez en ligne nos pains au levain, viennoiseries pur beurre et coffrets artisanaux. Click & Collect au 226 Rue de Rivoli, Paris 1er.",
  openGraph: {
    title: "Boutique — Eric Kayser Louvre-Rivoli",
    description:
      "Pains au levain, viennoiseries pur beurre, coffrets artisanaux. Click & Collect Paris 1er.",
  },
  alternates: { canonical: "/boutique" },
};

type Product = {
  name: string;
  desc: string;
  price: string;
  image: string;
  category: "pains" | "viennoiseries" | "coffrets";
  badge?: string;
};

const PRODUCTS: Product[] = [
  // --- Pains ---
  {
    name: "Baguette de Tradition",
    desc: "Farine de blé français, fermentation longue. Croustillante à souhait.",
    price: "1,80 €",
    image:
      "https://images.unsplash.com/photo-1620830958756-46335282c574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHw0fHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "pains",
  },
  {
    name: "Pain au Levain Signature",
    desc: "Fermentation lente 48h. Mie alvéolée, conservation exceptionnelle.",
    price: "8,00 €",
    image:
      "https://images.unsplash.com/photo-1571157577110-493b325fdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwyfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "pains",
    badge: "Best-seller",
  },
  {
    name: "Pain aux Céréales",
    desc: "Tournesol, lin, sésame. Idéal pour les tartines du matin.",
    price: "5,50 €",
    image:
      "https://images.unsplash.com/photo-1580654842783-4f4cbcd3ae82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwyfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "pains",
  },
  // --- Viennoiseries ---
  {
    name: "Croissant Pur Beurre",
    desc: "Beurre AOP Charentes-Poitou. Feuilletage croustillant, coeur fondant.",
    price: "1,50 €",
    image:
      "https://images.unsplash.com/photo-1773027270919-8714e0af1172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "viennoiseries",
  },
  {
    name: "Pain au Chocolat",
    desc: "Deux barres de chocolat noir Valrhona. Viennoiserie signature.",
    price: "1,80 €",
    image:
      "https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "viennoiseries",
  },
  {
    name: "Brioche Feuilletée",
    desc: "Brioche pur beurre, dorée et moelleuse. Parfaite au petit-déjeuner.",
    price: "4,50 €",
    image:
      "https://images.unsplash.com/photo-1737700087816-95c80570fba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHw0fHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHwxfHx8MTc3Njg4OTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "viennoiseries",
  },
  // --- Coffrets ---
  {
    name: "Coffret Petit-Déjeuner",
    desc: "1 baguette + 2 croissants + 2 pains au chocolat. Le matin parfait.",
    price: "12,00 €",
    image:
      "https://images.unsplash.com/photo-1761594606868-1c577b10f69e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwzfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "coffrets",
    badge: "Populaire",
  },
  {
    name: "Coffret Artisan",
    desc: "L'expérience parisienne à partager. Pain levain + viennoiseries + confiture maison.",
    price: "22,00 €",
    image:
      "https://images.unsplash.com/photo-1775326824244-b76f510665db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NzM5NjF8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBwYXJpc3xlbnwwfDB8fHwxNzc2ODg5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "coffrets",
    badge: "Cadeau",
  },
];

const CATEGORIES = [
  { key: "all", label: "Tout" },
  { key: "pains", label: "Pains" },
  { key: "viennoiseries", label: "Viennoiseries" },
  { key: "coffrets", label: "Coffrets" },
] as const;

function CategoryTabs() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((c) => (
        <span
          key={c.key}
          className="shrink-0 rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors bg-stone-100 text-stone-700 hover:bg-stone-200 first:bg-stone-900 first:text-white"
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base">{product.name}</h3>
        <p className="mt-1 text-sm text-stone-500 line-clamp-2">
          {product.desc}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-[#C05A3C]">
            {product.price}
          </span>
          <button
            type="button"
            className="rounded-full bg-stone-900 text-white p-2.5 hover:bg-stone-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Boutique", href: "/boutique" },
        ]}
      />
      <ProductListJsonLd
        products={PRODUCTS.map((p) => ({
          name: p.name,
          description: p.desc,
          price: p.price,
          image: p.image,
          category: p.category,
        }))}
      />
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl sm:text-4xl">
              Notre Boutique
            </h1>
            <p className="mt-2 text-stone-500 max-w-lg">
              Pains au levain, viennoiseries pur beurre et coffrets artisanaux.
              Commandez en ligne, retirez sans attente au 226 Rue de Rivoli.
            </p>
          </div>
        </section>

        {/* Category filter + products */}
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4">
            <CategoryTabs />

            <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Click & Collect info */}
        <section className="border-t border-stone-200 bg-stone-50 py-12">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-serif text-2xl">
              Click &amp; Collect
            </h2>
            <p className="mt-3 text-stone-500 max-w-md mx-auto">
              Commandez en ligne et retirez votre commande en boutique dans
              l&apos;heure. Paiement sécurisé par carte bancaire.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-stone-600">
              <span className="size-2 rounded-full bg-green-500" />
              Retrait disponible aujourd&apos;hui
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
