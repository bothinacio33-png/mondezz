import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { urlFor, type CatalogProduct, type RelatedProductRef } from "@/lib/sanity";
import { formatBRL } from "@/lib/format";

/**
 * Card de produto unificado — usado em catálogo, home shelves e favoritos.
 * - Imagem quadrada object-cover
 * - Coração círculo branco top-right
 * - Badge "Frete grátis" verde top-left (sempre)
 * - Badge "-XX%" dourado top-left (empilhada abaixo do frete grátis)
 */
export interface ProductCardItem {
  _id: string;
  name: string;
  slug: { current: string };
  category?: string;
  price?: number;
  promotionalPrice?: number;
  mainImage?: CatalogProduct["mainImage"];
  secondaryImage?: CatalogProduct["secondaryImage"];
}

interface Props {
  product: ProductCardItem;
  index?: number;
  showCategoryLabel?: boolean;
  categoryLabel?: string;
  /** Versão compacta para carrosséis (título menor, sem PIX/parcelas) */
  compact?: boolean;
}

const ease = [0.76, 0, 0.24, 1] as const;

export const ProductCard = ({
  product,
  index = 0,
  showCategoryLabel = false,
  categoryLabel,
  compact = false,
}: Props) => {
  const price = product.promotionalPrice ?? product.price;
  const original = product.promotionalPrice ? product.price : undefined;
  const installment = price ? price / 10 : 0;
  const pix = price ? price * 0.95 : 0;
  const hasMain = !!product.mainImage?.asset;
  const hasSecondary = !!product.secondaryImage?.asset;

  const discountPct =
    original && price && original > price
      ? Math.round(((original - price) / original) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease, delay: Math.min(index * 0.03, 0.35) }}
      className="h-full"
    >
      <Link to={`/produto/${product.slug.current}`} className="group block h-full">
        {/* IMAGEM QUADRADA */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#F5F1EA]">
          {hasMain ? (
            <>
              <img
                src={urlFor(product.mainImage!).width(800).height(800).quality(82).url()}
                alt={product.mainImage!.alt || product.name}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  hasSecondary ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
                }`}
              />
              {hasSecondary && (
                <img
                  src={urlFor(product.secondaryImage!).width(800).height(800).quality(82).url()}
                  alt={product.secondaryImage!.alt || `${product.name} — alternativa`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-end bg-gradient-to-br from-[#E8DFCB] to-[#A38A58] p-5">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster/80">
                {product.name}
              </span>
            </div>
          )}

          {/* Badge top-left: percentual de desconto (se houver) */}
          {discountPct !== null && (
            <div className="absolute left-3 top-3 z-10">
              <span
                className="inline-flex items-center bg-[#1F4E3D] px-2.5 py-1 font-serif italic text-[12px] font-light leading-none tracking-wide text-white shadow-sm"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                <span className="font-medium not-italic mr-1">{discountPct}%</span> off
              </span>
            </div>
          )}

          {/* Selo de certificado dourado, top-right */}
          <div
            aria-hidden
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E8C97A] via-[#C9A24A] to-[#9C7C2E] shadow-[0_2px_8px_rgba(0,0,0,0.22)] ring-1 ring-white/40"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5A4413"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="9" r="5" />
              <path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5" />
              <path d="m9.7 9 1.4 1.4 2.6-2.6" />
            </svg>
          </div>

        </div>

        {/* INFO */}
        <div className={compact ? "mt-2.5" : "mt-3"}>
          {showCategoryLabel && (categoryLabel || product.category) && (
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-brass mb-1">
              {categoryLabel || product.category}
            </p>
          )}
          <h3
            className={`product-title text-ink leading-snug transition-colors group-hover:text-brass break-words ${
              compact ? "text-[15px] md:text-[16px]" : "text-[16px] md:text-[17px]"
            }`}
          >
            {product.name}
          </h3>

          {/* Preços */}
          {price != null && (
            <div className="mt-1 product-price" style={{ color: "#1c1915" }}>
              {original && (
                <p className="text-[12px] md:text-[14px] line-through leading-tight font-normal text-ink/45">{formatBRL(original)}</p>
              )}
              <p className="text-base md:text-lg leading-tight font-normal" style={{ color: "#1c1915" }}>
                {formatBRL(price)}
              </p>
              {!compact && (
                <>
                  <p className="mt-0.5 text-[11px] md:text-[13px] leading-tight font-thin" style={{ color: "#1c1915" }}>
                    ou <strong className="font-semibold">10x</strong> de {formatBRL(installment)} sem juros
                  </p>
                  <p className="mt-0.5 text-[11px] md:text-[13px] leading-tight font-thin flex items-center gap-1.5" style={{ color: "#1c1915" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#00A650" aria-hidden>
                      <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm2 0v12h14V6H5Zm7 2.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM6.5 8.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm13 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
                    </svg>
                    À vista <strong className="font-semibold">{formatBRL(pix)}</strong> <span style={{ color: "#363636" }}>no Pix</span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

/** Adapter para o tipo legado de relacionados. */
export const relatedToCard = (p: RelatedProductRef): ProductCardItem => ({
  _id: p._id,
  name: p.name,
  slug: p.slug,
  price: p.price,
  promotionalPrice: p.promotionalPrice,
  mainImage: p.mainImage as ProductCardItem["mainImage"],
});
