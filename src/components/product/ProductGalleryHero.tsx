import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor, type SanityImage } from "@/lib/sanity";

interface Props {
  images: SanityImage[];
  productName: string;
}

/**
 * Galeria estilo "Atelier Clássico":
 *   - 1 imagem mestre gigante (clicável → próxima)
 *   - Grid de thumbnails quadrados logo abaixo (4 col desktop, 3 col mobile)
 */
export const ProductGalleryHero = ({ images, productName }: Props) => {
  const [active, setActive] = useState(0);

  if (!images?.length) {
    return <div className="aspect-[4/5] w-full bg-secondary" />;
  }

  const main = images[active] || images[0];

  const previous = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="relative bg-card md:p-0">
      {/* Imagem mestre */}
      <button
        type="button"
        onClick={next}
        aria-label="Ver próxima imagem"
        className="group relative block w-full overflow-hidden bg-card"
      >
        <img
          src={urlFor(main).width(1600).quality(92).url()}
          alt={main.alt || `${productName} — imagem ${active + 1}`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.02]"
        />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); previous(); }}
            aria-label="Imagem anterior"
            className="absolute left-2 top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 md:left-3 md:h-16 md:w-9"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Próxima imagem"
            className="absolute right-2 top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 md:right-3 md:h-16 md:w-9"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <button
                key={img._key || i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Mostrar imagem ${i + 1}`}
                aria-pressed={isActive}
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden bg-secondary transition-all sm:h-20 sm:w-24 ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={urlFor(img).width(200).height(200).quality(70).url()}
                  alt={img.alt || `${productName} miniatura ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};