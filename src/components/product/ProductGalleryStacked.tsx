import { urlFor, type SanityImage } from "@/lib/sanity";

interface Props {
  images: SanityImage[];
  productName: string;
}

/**
 * Galeria empilhada verticalmente (estilo Atelier Clássico).
 * Imagens grandes, uma sob a outra, permitindo que a coluna direita (sticky)
 * permaneça visível durante o scroll.
 */
export const ProductGalleryStacked = ({ images, productName }: Props) => {
  if (!images?.length) {
    return <div className="aspect-[4/5] w-full bg-secondary" />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {images.map((img, i) => (
        <figure
          key={img._key || i}
          className="relative w-full overflow-hidden bg-secondary"
        >
          <img
            src={urlFor(img).width(1600).quality(90).url()}
            alt={img.alt || `${productName} — imagem ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "auto"}
            className="block h-auto w-full object-cover"
          />
          {img.caption && (
            <figcaption className="border-t border-ink/5 bg-background/80 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/50">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};