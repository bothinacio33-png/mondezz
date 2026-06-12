import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor, type SanityImage } from "@/lib/sanity";

interface Props {
  images: SanityImage[];
  productName: string;
}

export const ProductGallery = ({ images, productName }: Props) => {
  const [active, setActive] = useState(0);
  const total = images.length;
  const current = images[active];

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + total) % total);

  return (
    <div className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={urlFor(current).width(1400).height(1750).quality(90).url()}
            alt={current.alt || `${productName} — imagem ${active + 1}`}
            width={1400}
            height={1750}
            loading={active === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={active === 0 ? "high" : "auto"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              data-cursor="hover"
              aria-label="Imagem anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-alabaster/80 p-3 backdrop-blur-sm hover:bg-alabaster transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={1.2} className="text-ink" />
            </button>
            <button
              onClick={() => go(1)}
              data-cursor="hover"
              aria-label="Próxima imagem"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-alabaster/80 p-3 backdrop-blur-sm hover:bg-alabaster transition-colors"
            >
              <ChevronRight size={18} strokeWidth={1.2} className="text-ink" />
            </button>
            <div className="absolute bottom-4 right-4 bg-ink/70 px-3 py-1 font-sans text-[10px] tracking-[0.3em] text-alabaster">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
          {images.map((img, i) => (
            <button
              key={img._key || i}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Ver imagem ${i + 1}`}
              className={`relative aspect-square overflow-hidden transition-all duration-500 ease-luxury ${
                active === i ? "ring-2 ring-brass" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={urlFor(img).width(200).height(200).quality(70).url()}
                alt={img.alt || `${productName} — miniatura ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-luxury hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
