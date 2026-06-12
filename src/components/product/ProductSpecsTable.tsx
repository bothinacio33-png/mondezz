import type { Product, Specification } from "@/lib/sanity";

interface Props {
  product: Product;
}

/**
 * Tabela de Especificações de Autor — bloco rígido, denso, técnico.
 * Sempre presente nas páginas de produto. Linhas omitidas se vazias.
 */
export const ProductSpecsTable = ({ product }: Props) => {
  const rows: { label: string; value: string }[] = [];

  if (product.sku) rows.push({ label: "SKU", value: product.sku });
  if (product.materials) rows.push({ label: "Materiais", value: product.materials });
  if (product.dimensions) rows.push({ label: "Dimensões", value: product.dimensions });
  if (product.weight != null) rows.push({ label: "Peso", value: `${product.weight} kg` });
  rows.push({
    label: "Status de montagem",
    value: product.isAssembled ? "Vai montado" : "Requer montagem (acompanha manual)",
  });
  if (product.packageCount != null)
    rows.push({
      label: "Qtd. de embalagens",
      value: `${product.packageCount} ${product.packageCount === 1 ? "volume" : "volumes"}`,
    });
  rows.push({
    label: "Garantia",
    value: product.warranty || "365 dias contra defeitos de fabricação",
  });

  // Specs livres (chave/valor)
  const extras: Specification[] = product.specifications || [];

  if (rows.length === 0 && extras.length === 0) return null;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brass">Ficha técnica</p>
        <h2
          className="mt-4 font-serif text-2xl md:text-3xl font-light text-ink"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Especificações
        </h2>

        <dl className="mt-12 divide-y divide-gray-200">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-6"
            >
              <dt className="font-sans text-sm text-ink/50">{r.label}</dt>
              <dd className="font-sans text-sm text-ink sm:col-span-2">{r.value}</dd>
            </div>
          ))}
          {extras.map((s) => (
            <div
              key={s._key || s.key}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-6"
            >
              <dt className="font-sans text-sm text-ink/50">{s.key}</dt>
              <dd className="font-sans text-sm text-ink sm:col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
