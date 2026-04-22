const SITE_URL = "https://boulangerie-eric-kayser-louvre-rivo.vercel.app";

type BreadcrumbItem = { name: string; href: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type FaqItem = { question: string; answer: string };

export function FaqPageJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type ProductItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

export function ProductListJsonLd({ products }: { products: ProductItem[] }) {
  const jsonLd = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image,
    category: p.category,
    offers: {
      "@type": "Offer",
      price: p.price.replace(/[^\d,]/g, "").replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Eric Kayser - Louvre Rivoli",
      },
    },
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
