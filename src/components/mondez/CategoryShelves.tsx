import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sanityClient, type CatalogProduct } from "@/lib/sanity";
import { ProductCard } from "@/components/product/ProductCard";

import sofasImg from "@/assets/categories/sofas.jpg";
import poltronasImg from "@/assets/categories/poltronas.jpg";
import mesasImg from "@/assets/categories/mesas.jpg";
import mesasCentroImg from "@/assets/categories/mesas-centro.jpg";
import cadeirasImg from "@/assets/categories/cadeiras.jpg";
import aparadoresImg from "@/assets/categories/aparadores.jpg";
import camasImg from "@/assets/categories/camas.jpg";
import estantesImg from "@/assets/categories/estantes.jpg";
import buffetsImg from "@/assets/categories/buffets.jpg";
import iluminacaoImg from "@/assets/categories/iluminacao.jpg";
import tapetesImg from "@/assets/categories/tapetes.jpg";
import decoracaoImg from "@/assets/categories/decoracao.jpg";

const ease = [0.76, 0, 0.24, 1] as const;

const SHELVES: { slug: string; label: string; image: string; tag?: string }[] = [
  { slug: "sofas", label: "Sofás", image: sofasImg, tag: "5% OFF" },
  { slug: "poltronas", label: "Poltronas", image: poltronasImg, tag: "5% OFF" },
  { slug: "mesas", label: "Mesas de Jantar", image: mesasImg },
  { slug: "mesas-centro", label: "Mesas de Centro", image: mesasCentroImg },
  { slug: "cadeiras", label: "Cadeiras", image: cadeirasImg },
  { slug: "aparadores", label: "Aparadores", image: aparadoresImg },
  { slug: "camas", label: "Camas & Quartos", image: camasImg },
  { slug: "estantes", label: "Estantes", image: estantesImg },
  { slug: "buffets", label: "Buffets", image: buffetsImg },
  { slug: "iluminacao", label: "Iluminação", image: iluminacaoImg },
  { slug: "tapetes", label: "Tapetes", image: tapetesImg },
  { slug: "decoracao", label: "Decoração", image: decoracaoImg },
];

const SHELF_QUERY = /* groq */ `
*[_type == "product" && defined(slug.current)] | order(_createdAt desc){
  _id, name, slug, category, price, promotionalPrice,
  "mainImage": gallery[0]{ asset, alt },
  "secondaryImage": gallery[1]{ asset, alt }
}
`;

export const CategoryShelves = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["home-shelves"],
    queryFn: () => sanityClient.fetch<CatalogProduct[]>(SHELF_QUERY),
    staleTime: 1000 * 60 * 5,
  });

  const byCategory = new Map<string, CatalogProduct[]>();
  if (data) {
    for (const p of data) {
      if (!p.category) continue;
      const list = byCategory.get(p.category) ?? [];
      list.push(p);
      byCategory.set(p.category, list);
    }
  }

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-10">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
        {SHELVES.map((shelf) => {
          const items = (byCategory.get(shelf.slug) ?? []).slice(0, 4);
          const featureImg = shelf.image;
          const hasItems = items.length > 0;

          return (
            <motion.div
              key={shelf.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease }}
            >
              {/* Cabeçalho mobile */}
              <div className="md:hidden mb-5 flex items-end justify-between">
                <h3
                  className="font-serif text-3xl font-bold text-ink leading-tight"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {shelf.label}
                </h3>
                <Link
                  to={`/produtos?categoria=${shelf.slug}`}
                  className="font-sans text-[10px] tracking-[0.3em] uppercase text-brass hover:text-ink transition-colors"
                >
                  Ver todos →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
                {/* Coluna lateral identitária (apenas desktop) */}
                <aside className="hidden md:flex md:col-span-2 relative overflow-hidden flex-col justify-end p-5 lg:p-6 min-h-[420px]">
                  <img
                    src={featureImg}
                    alt={`Destaque ${shelf.label}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/20" />

                  <div className="relative z-10">
                    {shelf.tag && (
                      <span className="inline-block bg-brass text-ink text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 mb-4 font-sans font-medium">
                        {shelf.tag}
                      </span>
                    )}
                    <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brass mb-3">
                      Coleção
                    </p>
                    <h3
                      className="font-serif text-2xl lg:text-3xl font-bold text-alabaster leading-[1.05]"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      {shelf.label}
                    </h3>
                    <Link
                      to={`/produtos?categoria=${shelf.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-brass hover:text-alabaster transition-colors duration-500"
                    >
                      Ver todos →
                    </Link>
                  </div>
                </aside>

                {/* Grid produtos */}
                <div className="md:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                  {hasItems ? (
                    items.map((p, i) => (
                      <ProductCard key={p._id} product={p} index={i} />
                    ))
                  ) : (
                    <div className="col-span-2 md:col-span-4 flex items-center justify-center min-h-[260px] md:min-h-[420px] border border-dashed border-ink/15 bg-bone/40">
                      <div className="text-center px-6">
                        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-ink/40 mb-3">
                          Em breve
                        </p>
                        <p className="font-serif text-xl md:text-2xl text-ink/70 font-light"
                           style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                          Nova coleção de {shelf.label.toLowerCase()} chegando.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

