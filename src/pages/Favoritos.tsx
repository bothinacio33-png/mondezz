import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Trash2 } from "lucide-react";

import { sanityClient, type CatalogProduct } from "@/lib/sanity";
import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { SiteHeader } from "@/components/mondez/SiteHeader";
import { SiteFooter } from "@/components/mondez/SiteFooter";

const QUERY = /* groq */ `
*[_type == "product" && _id in $ids]{
  _id, name, slug, category, price, promotionalPrice,
  "mainImage": gallery[0]{ asset, alt }
}
`;

const Favoritos = () => {
  const { ids, count, clear } = useWishlist();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    sanityClient
      .fetch<CatalogProduct[]>(QUERY, { ids })
      .then((data) => {
        if (!cancelled) setProducts(data || []);
      })
      .catch((e) => console.error("[Sanity] wishlist fetch failed", e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [ids]);

  const ordered = useMemo(() => {
    const map = new Map(products.map((p) => [p._id, p]));
    return ids.map((id) => map.get(id)).filter(Boolean) as CatalogProduct[];
  }, [ids, products]);

  return (
    <>
      <Helmet>
        <title>Favoritos · Mondez Mobiliário</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SiteHeader />
      <main className="bg-white text-ink min-h-[60vh]">
        <section className="px-6 py-20 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <p className="font-sans text-[10px] tracking-[0.4em] text-brass">— A SUA SELEÇÃO</p>
            <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
              <h1
                className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-ink"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Favoritos <span className="italic text-brass">({count}).</span>
              </h1>
              {count > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60 hover:text-brass transition-colors"
                >
                  <Trash2 size={14} strokeWidth={1.2} />
                  Esvaziar lista
                </button>
              )}
            </div>

            {count === 0 && (
              <div className="mt-20 flex flex-col items-center text-center">
                <Heart size={36} strokeWidth={1.2} className="text-ink/30" />
                <p className="mt-6 font-sans text-sm text-ink/60 max-w-md">
                  Ainda não guardou nenhuma peça. Explore o catálogo e toque no coração para reunir aqui as suas preferidas.
                </p>
                <Link
                  to="/produtos"
                  className="mt-8 inline-block border border-ink px-6 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink hover:bg-ink hover:text-alabaster transition-colors"
                >
                  Ver catálogo
                </Link>
              </div>
            )}

            {count > 0 && (
              <ul className="mt-16 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
                {loading && ordered.length === 0 && (
                  <li className="col-span-full font-sans text-[10px] tracking-[0.3em] text-ink/40">
                    CARREGANDO…
                  </li>
                )}
                {ordered.map((p, i) => (
                  <li key={p._id}>
                    <ProductCard product={p} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
};

export default Favoritos;