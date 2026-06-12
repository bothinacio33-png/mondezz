import { formatBRL } from "@/lib/format";

interface Props {
  price: number;
  originalPrice?: number;
  installmentCount?: number;
  pixDiscount?: number;
}

/**
 * Vitrine financeira — preço destaque + parcelamento + Pix.
 * Estilo "lâmina de vendas" de marcas de luxo brasileiras.
 */
export const FinancialShowcase = ({
  price,
  originalPrice,
  installmentCount = 10,
  pixDiscount = 5,
}: Props) => {
  const hasPromo = originalPrice != null && originalPrice > price;
  const installment = installmentCount > 0 ? price / installmentCount : 0;
  const pixPrice = pixDiscount > 0 ? price * (1 - pixDiscount / 100) : 0;

  return (
    <div className="mt-8 border-y border-ink/10 py-7">
      {hasPromo && (
        <p className="font-sans text-xs text-ink/40 line-through">
          De {formatBRL(originalPrice!)}
        </p>
      )}
      <div className="mt-1 flex items-baseline gap-4 flex-wrap">
        <span
          className="font-serif text-4xl md:text-5xl font-light text-ink leading-none"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {formatBRL(price)}
        </span>
        {installmentCount > 0 && (
          <span className="font-sans text-sm text-ink/70">
            ou{" "}
            <strong className="font-medium text-ink">
              {installmentCount}x de {formatBRL(installment)}
            </strong>{" "}
            sem juros
          </span>
        )}
      </div>

      {pixDiscount > 0 && (
        <div className="mt-4 inline-flex items-center gap-3 border border-brass/40 bg-brass/5 px-4 py-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brass">
            Pix · {pixDiscount}% OFF
          </span>
          <span className="font-sans text-sm text-ink">
            <strong className="font-medium">{formatBRL(pixPrice)}</strong> à vista
          </span>
        </div>
      )}
    </div>
  );
};
