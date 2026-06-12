import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RelatedProductRef } from "@/lib/sanity";
import { ProductCard, relatedToCard } from "@/components/product/ProductCard";

interface Props {
  products: RelatedProductRef[];
}

/**
 * Carrossel horizontal de relacionados — Atelier Clássico.
 * Setas laterais para rolagem, sem padding/shadow nos cards.
 */
export const RelatedProducts = ({ products }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!products?.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-[#FAF9F5] py-12 md:py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#e6e0d3] pb-5">
          <div>
            <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.32em]" style={{ color: "#b8965a" }}>
              Você também pode se interessar
            </p>
            <h2
              className="font-serif text-xl font-normal text-foreground md:text-2xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Produtos relacionados
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Rolar para esquerda"
              className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-colors hover:bg-atelier-nav hover:text-atelier-nav-foreground"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Rolar para direita"
              className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-colors hover:bg-atelier-nav hover:text-atelier-nav-foreground"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none md:gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p, i) => (
            <div
              key={p._id}
              className="min-w-[240px] flex-shrink-0 snap-start sm:min-w-[280px] md:min-w-[300px]"
            >
              <ProductCard product={relatedToCard(p)} index={i} showCategoryLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
