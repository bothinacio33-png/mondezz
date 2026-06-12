import { useState } from "react";
import { Loader2, Truck, MessageCircle } from "lucide-react";

interface Props {
  productName: string;
  productSku?: string;
  phone?: string;
  /** "section" = bloco de página inteira; "inline" = compacto p/ box de compra. */
  variant?: "section" | "inline";
}

interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}

/**
 * Calculadora de CEP via ViaCEP (gratuita, pública).
 * Mostra cidade/UF e abre WhatsApp para cotação personalizada de frete.
 */
export const CepCalculator = ({
  productName,
  productSku,
  phone = "555499923786",
  variant = "section",
}: Props) => {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ViaCepResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCepChange = (raw: string) => {
    const cleaned = raw.replace(/\D/g, "").slice(0, 8);
    const formatted = cleaned.length > 5 ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}` : cleaned;
    setCep(formatted);
    setError(null);
    setResult(null);
  };

  const consult = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) {
      setError("Informe um CEP válido (8 dígitos).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data: ViaCepResponse = await r.json();
      if (data.erro) {
        setError("CEP não encontrado.");
        setResult(null);
      } else {
        setResult(data);
      }
    } catch {
      setError("Não foi possível consultar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = (() => {
    if (!result) return null;
    const text = encodeURIComponent(
      `Olá! Gostaria de uma cotação de frete para o produto "${productName}"${productSku ? ` (SKU ${productSku})` : ""}, com entrega em ${result.localidade}/${result.uf} (CEP ${cep}).`,
    );
    return `https://wa.me/${phone}?text=${text}`;
  })();

  const body = (
    <>
      {variant === "section" ? (
        <>
          <p className="font-sans text-[10px] tracking-[0.4em] text-brass">— LOGÍSTICA & FRETE</p>
          <h2
            className="mt-4 font-serif text-3xl md:text-4xl font-light text-ink"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Entrega personalizada.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm font-light leading-relaxed text-ink/60">
            Cada peça Mondez é entregue por logística dedicada. Informe seu CEP para confirmarmos a região
            e prazo personalizado em conversa direta com o consultor.
          </p>
        </>
      ) : (
        <p className="font-sans text-[15px] font-bold uppercase tracking-[0.04em] text-ink">
          Calcule o frete
        </p>
      )}

        <form onSubmit={consult} className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label htmlFor="cep" className="block font-sans text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-2">
              Seu CEP
            </label>
            <input
              id="cep"
              type="text"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              placeholder="00000-000"
              inputMode="numeric"
              className="w-full border border-ink/20 bg-transparent px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/30 outline-none focus:border-brass"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster transition-colors hover:bg-brass disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Truck size={14} strokeWidth={1.4} />}
            Consultar
          </button>
        </form>

        {error && (
          <p className="mt-4 font-sans text-xs text-destructive">{error}</p>
        )}

        {result && whatsappHref && (
          <div className="mt-6 border border-brass/30 bg-brass/5 p-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brass">CEP localizado</p>
            <p className="mt-2 font-serif text-xl text-ink font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
              {result.localidade} · {result.uf}
            </p>
            <p className="mt-1 font-sans text-xs text-ink/60">
              {result.logradouro && `${result.logradouro}, `}{result.bairro}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 bg-ink px-5 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster transition-colors hover:bg-brass"
            >
              <MessageCircle size={14} strokeWidth={1.4} />
              Receber cotação via WhatsApp
            </a>
          </div>
        )}
    </>
  );

  if (variant === "inline") {
    return <div className="w-full">{body}</div>;
  }
  return (
    <section className="border-t border-ink/10 bg-background px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-3xl">{body}</div>
    </section>
  );
};