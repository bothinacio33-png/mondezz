import { urlFor, type WoodFinish } from "@/lib/sanity";

interface Props {
  finishes?: WoodFinish[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export const DEFAULT_FINISHES: WoodFinish[] = [
  { label: "Mel", hex: "#C8915A" },
  { label: "Nogueira", hex: "#5C3A21" },
  { label: "Ébano", hex: "#1A1411" },
];

/**
 * Seletor visual de tons de madeira / acabamento (controlled).
 * Apenas swatches — o botão de WhatsApp fica no Buy Box.
 */
export const WoodFinishSelector = ({ finishes, activeIndex, onChange }: Props) => {
  const list = finishes && finishes.length > 0 ? finishes : DEFAULT_FINISHES;
  const current = list[activeIndex] ?? list[0];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="product-label text-[13px] text-foreground">Acabamento</p>
        <p className="font-jost text-xs font-light text-muted-foreground">
          Selecionado: <span className="text-foreground">{current.label}</span>
        </p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {list.map((f, i) => {
          const bg = f.swatch?.asset
            ? `url(${urlFor(f.swatch).width(100).height(100).url()})`
            : undefined;
          return (
            <button
              key={f._key || `${f.label}-${i}`}
              type="button"
              onClick={() => onChange(i)}
              aria-label={`Selecionar acabamento ${f.label}`}
              aria-pressed={activeIndex === i}
              className={`relative h-10 w-10 rounded-full border transition-all ${
                activeIndex === i ? "border-brass ring-2 ring-brass/30 scale-110" : "border-ink/20 hover:border-ink/40"
              }`}
              style={{
                backgroundColor: f.hex || "#8B5A2B",
                backgroundImage: bg,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              title={f.label}
            />
          );
        })}
      </div>
    </div>
  );
};
