import type { PortableTextBlock, SanityImage } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

/**
 * Renderer de Portable Text — suporta blocos de texto, imagens e GIFs.
 * "Dossiê aberto": fluxo vertical, sem accordions.
 */
interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

interface Block extends PortableTextBlock {
  _type: "block";
  style?: string;
  children?: Span[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
}

interface ImageBlock extends PortableTextBlock {
  _type: "image";
  asset: SanityImage["asset"];
  alt?: string;
  caption?: string;
}

function renderSpan(span: Span, markDefs: Block["markDefs"] = []) {
  let node: React.ReactNode = span.text;
  for (const mark of span.marks ?? []) {
    if (mark === "strong") node = <strong className="font-medium text-ink">{node}</strong>;
    else if (mark === "em") node = <em className="italic">{node}</em>;
    else {
      const def = markDefs?.find((m) => m._key === mark);
      if (def?._type === "link" && def.href) {
        node = (
          <a href={def.href} className="underline decoration-brass underline-offset-4 hover:text-brass">
            {node}
          </a>
        );
      }
    }
  }
  return <span key={span._key}>{node}</span>;
}

export const PortableText = ({ value }: { value?: PortableTextBlock[] }) => {
  if (!value?.length) return null;

  return (
    <div className="space-y-6 font-sans text-base font-light leading-relaxed text-ink/80">
      {value.map((b) => {
        // ---- IMAGE / GIF ----
        if (b._type === "image") {
          const img = b as ImageBlock;
          if (!img.asset) return null;
          return (
            <figure key={img._key} className="my-10">
              <img
                src={urlFor(img as unknown as SanityImage).width(1600).quality(85).url()}
                alt={img.alt || ""}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
              {img.caption && (
                <figcaption className="mt-3 font-sans text-xs text-ink/50 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (b._type !== "block") return null;
        const block = b as Block;
        const children = (block.children ?? []).map((c) => renderSpan(c, block.markDefs));
        const style = block.style ?? "normal";

        if (style === "h3") {
          return (
            <h3
              key={block._key}
              className="mt-10 font-serif text-2xl md:text-3xl font-light text-ink"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {children}
            </h3>
          );
        }
        if (style === "blockquote") {
          return (
            <blockquote
              key={block._key}
              className="my-8 border-l-2 border-brass pl-6 font-serif text-xl italic text-ink/70"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {children}
            </blockquote>
          );
        }
        return (
          <p key={block._key} className="text-ink/80">
            {children}
          </p>
        );
      })}
    </div>
  );
};
