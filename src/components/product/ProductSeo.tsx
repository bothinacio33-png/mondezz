import { Helmet } from "react-helmet-async";
import { urlFor, type Product } from "@/lib/sanity";

interface Props {
  product: Product;
  canonicalUrl?: string;
}

export const ProductSeo = ({ product, canonicalUrl }: Props) => {
  const title = product.seoTitle?.trim() || `${product.name} | Mondez Mobiliário`;
  const plainDescFromBlocks = product.description
    ?.flatMap((b: any) => (b._type === "block" ? (b.children ?? []).map((c: any) => c.text) : []))
    .join(" ")
    .trim();
  const description =
    product.seoDescription?.trim() ||
    plainDescFromBlocks?.slice(0, 160) ||
    "Curadoria de mobiliário de alto padrão na Serra Gaúcha — Mondez Mobiliário.";

  const mainImage = product.gallery?.[0];
  const ogImage = mainImage
    ? urlFor(mainImage).width(1200).height(630).fit("crop").quality(85).url()
    : undefined;

  const price = product.promotionalPrice ?? product.price;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description,
    image: product.gallery?.map((g) => urlFor(g).width(1200).url()) ?? [],
    sku: product._id,
    brand: { "@type": "Brand", name: "Mondez Mobiliário" },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            priceCurrency: "BRL",
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }
      : {}),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {price && <meta property="product:price:amount" content={price.toFixed(2)} />}
      {price && <meta property="product:price:currency" content="BRL" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Product */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
