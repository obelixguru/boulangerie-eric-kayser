import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1080, height: 720, alt: post.title }],
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  // Prioritize same-category articles, then fill with recent posts
  const sameCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const otherPosts = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  const related = [...sameCategory, ...otherPosts].slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Eric Kayser Louvre-Rivoli",
      logo: {
        "@type": "ImageObject",
        url: "https://boulangerie-eric-kayser-louvre-rivo.vercel.app/logo.svg",
      },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Journal", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[40dvh] flex items-end">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 pb-10 w-full">
            <span className="inline-block bg-white/90 text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-stone-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readTime} de lecture
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="mx-auto max-w-3xl px-4 prose prose-stone prose-headings:font-serif prose-a:text-[#C05A3C] prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Back + Related */}
        <section className="border-t border-stone-200 py-12">
          <div className="mx-auto max-w-3xl px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C05A3C] hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              Retour au Journal
            </Link>

            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-2xl">Articles similaires</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-stone-400">{r.category}</p>
                        <h3 className="mt-1 font-serif text-base leading-snug line-clamp-2">
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Boutique */}
        <section className="bg-stone-900 py-12 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-serif text-2xl text-white">
              Goûtez ce que vous lisez
            </h2>
            <p className="mt-2 text-stone-400 max-w-md mx-auto text-sm">
              Nos pains au levain et viennoiseries sont disponibles en Click &amp; Collect.
            </p>
            <Link
              href="/boutique"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C05A3C] px-8 py-3 text-white font-medium hover:bg-[#A84830] transition-colors min-h-[48px]"
            >
              Commander en ligne
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
