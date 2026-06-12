import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageCircle, ShieldCheck, Truck, Leaf, Zap } from "lucide-react";

import {
  sanityClient,
  PRODUCT_BY_SLUG_QUERY,
  type Product,
  type Benefit,
  type MaterialFeature,
  type ManufacturingStep,
} from "@/lib/sanity";
import { formatBRL } from "@/lib/format";
import { useViewContent } from "@/lib/pixel";

import { ProductSeo } from "@/components/product/ProductSeo";
import { ProductGalleryHero } from "@/components/product/ProductGalleryHero";
import { ProductVideo } from "@/components/product/ProductVideo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { PortableText } from "@/components/product/PortableText";
import { WoodFinishSelector, DEFAULT_FINISHES } from "@/components/product/WoodFinishSelector";
import { CepCalculator } from "@/components/product/CepCalculator";
import { WishlistHeart } from "@/components/product/WishlistHeart";

import { ProductAccordion } from "@/components/product/ProductAccordion";
import { SiteHeader } from "@/components/mondez/SiteHeader";
import { SiteFooter } from "@/components/mondez/SiteFooter";

const FEATURE_LABELS = ["Organização", "Multifuncionalidade", "Estrutura", "Acabamento"];

const makeSanityDrivenBenefits = (product: Product): Benefit[] => {
  if (product.benefits?.length) return product.benefits;
  return [
    {
      title: product.isAssembled ? "Vai montado" : "Montagem orientada",
      description: product.isAssembled ? "Pronto para uso ao receber." : "Acompanha instruções e suporte.",
      icon: "check",
    },
    product.shippingInfo
      ? { title: "Entrega personalizada", description: product.shippingInfo.split("\n")[0], icon: "truck" }
      : null,
    product.warranty ? { title: "Garantia", description: product.warranty, icon: "shield" } : null,
    product.materials ? { title: "Materiais selecionados", description: product.materials.split("\n")[0], icon: "leaf" } : null,
  ].filter(Boolean) as Benefit[];
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "not-found" | "error">("loading");
  const [finishIndex, setFinishIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setStatus("loading");
    sanityClient
      .fetch<Product | null>(PRODUCT_BY_SLUG_QUERY, { slug })
      .then((data) => {
        if (cancelled) return;
        if (!data) setStatus("not-found");
        else {
          setProduct(data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        console.error("[Sanity] fetch product failed", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useViewContent({
    name: product?.name ?? "",
    price: product?.promotionalPrice ?? product?.price,
    contentId: product?._id,
  });

  const pageData = useMemo(() => {
    if (!product) return null;

    const price = product.promotionalPrice ?? product.price ?? 0;
    const hasDiscount =
      product.promotionalPrice != null && product.price != null && product.promotionalPrice < product.price;
    const discountPct = hasDiscount
      ? Math.round(((product.price! - product.promotionalPrice!) / product.price!) * 100)
      : 0;
    const installmentCount = product.installmentCount ?? 10;
    const pixDiscount = product.pixDiscount ?? 5;
    const ratingAvg = product.ratingAverage ?? (product.reviews?.length ? 5 : 0);
    const ratingCount = product.ratingCount ?? product.reviews?.length ?? 0;
    const benefits = makeSanityDrivenBenefits(product);

    const specificationRows = [
      product.sku ? { label: "Código", value: product.sku } : null,
      product.dimensions ? { label: "Dimensões", value: product.dimensions } : null,
      product.weight != null ? { label: "Peso", value: `${product.weight} kg` } : null,
      product.materials ? { label: "Materiais", value: product.materials.split("\n")[0] } : null,
      product.warranty ? { label: "Garantia", value: product.warranty } : null,
      product.packageCount != null ? { label: "Volumes", value: String(product.packageCount) } : null,
      { label: "Montagem", value: product.isAssembled ? "Produto entregue montado" : "Requer montagem" },
      ...(product.specifications ?? []).map((spec) => ({ label: spec.key, value: spec.value })),
    ].filter(Boolean) as { label: string; value: string }[];

    const canonicalUrl =
      typeof window !== "undefined" ? `${window.location.origin}/produto/${product.slug.current}` : undefined;

    return {
      price,
      hasDiscount,
      discountPct,
      installmentCount,
      pixDiscount,
      ratingAvg,
      ratingCount,
      benefits,
      specificationRows,
      canonicalUrl,
    };
  }, [product]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-ink/40">Carregando…</p>
      </main>
    );
  }

  if (status === "not-found") {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-brass">Produto indisponível</p>
          <h1 className="font-serif text-3xl font-normal text-ink md:text-5xl">Produto não encontrado.</h1>
          <Link to="/produtos" className="font-sans text-[11px] uppercase tracking-[0.25em] text-ink hover:text-brass">
            Voltar ao catálogo
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (status === "error" || !product || !pageData) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 text-center">
          <p className="font-sans text-sm text-ink/60">Não foi possível carregar este produto. Tente novamente em instantes.</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const {
    price,
    hasDiscount,
    discountPct,
    installmentCount,
    pixDiscount,
    ratingAvg,
    ratingCount,
    benefits,
    specificationRows,
    canonicalUrl,
  } = pageData;

  const installmentValue = installmentCount > 0 && price > 0 ? price / installmentCount : 0;
  const pixPrice = pixDiscount > 0 && price > 0 ? price * (1 - pixDiscount / 100) : 0;

  const currentFinish = (product.woodFinishes && product.woodFinishes.length > 0
    ? product.woodFinishes
    : DEFAULT_FINISHES)[finishIndex];

  const whatsappMessage = `Olá! Tenho interesse na ${product.name} no acabamento ${currentFinish?.label ?? ""}. Quantidade: ${quantity}.`;
  const whatsappHref = `https://wa.me/555499923786?text=${encodeURIComponent(whatsappMessage)}`;

  // Materiais default
  const DEFAULT_MATERIALS: MaterialFeature[] = [
    { title: "Madeira Maciça", description: "Eucalipto maciço selecionado — estrutura que sustenta décadas." },
    { title: "Pés Luís XV", description: "Pés cabriolé — curva dupla do vocabulário clássico francês." },
    { title: "Couro Natural", description: "Couro natural no tampo — superfície de escrita nobre que desenvolve pátina." },
    { title: "Apliques em Metal", description: "Bronze, latão ou dourado aplicados à mão." },
  ];
  const materials =
    product.materialFeatures && product.materialFeatures.length > 0 ? product.materialFeatures : DEFAULT_MATERIALS;

  const DEFAULT_MANUFACTURING_STEPS: ManufacturingStep[] = [
    {
      title: "Projeto & Seleção",
      description: "Curadoria de matérias-primas e desenho técnico assinado por arquitetos parceiros.",
      icon: "ruler",
    },
    {
      title: "Estrutura",
      description: "Eucalipto reflorestado FSC, encaixes firmes e ferragens selecionadas.",
      icon: "frame",
    },
    {
      title: "Acabamento",
      description: "Lixamento fino, tingimento e aplicação manual para uma superfície uniforme.",
      icon: "palette",
    },
    {
      title: "Controle Final",
      description: "Inspeção peça a peça, embalagem reforçada e logística dedicada.",
      icon: "check",
    },
  ];

  const manufacturingSteps = product.manufacturingSteps?.length
    ? product.manufacturingSteps
    : DEFAULT_MANUFACTURING_STEPS;

  // ============ Conteúdo das seções do acordeão ============
  const accordionSections = [
    {
      id: "info",
      title: "Informações do Produto",
      content: (
        <div>
          <div className="max-w-4xl break-words font-sans text-[14px] leading-relaxed text-ink/72">
            {product.description?.length ? <PortableText value={product.description} /> : <p>{product.materials}</p>}
          </div>
          <p className="mt-5 max-w-4xl break-words border-l-2 border-[#A38A58] bg-[#F8F5EE] p-5 font-serif text-[15px] italic leading-relaxed text-ink/70">
            Cada peça pode apresentar pequenas variações naturais de tom e textura, preservando o caráter próprio da madeira.
          </p>
        </div>
      ),
    },
    {
      id: "materiais",
      title: "Materiais & Construção",
      content: (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((feature, index) => (
            <div
              key={feature._key ?? `${feature.title}-mat-${index}`}
              className="min-w-0 rounded-[4px] border border-[#E0DACD] bg-white p-5"
            >
              <h3 className="break-words font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-[#8B7355]">
                {feature.title}
              </h3>
              <p className="mt-2 break-words font-sans text-[13px] leading-relaxed text-ink/75">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "processo",
      title: "Processo de Fabricação",
      content: (
        <ol className="flex flex-col gap-5">
          {manufacturingSteps.map((step, index) => (
            <li
              key={step._key ?? `${step.title}-step-${index}`}
              className="flex min-w-0 items-start gap-4"
            >
              <div
                className="flex h-8 w-8 min-w-[32px] flex-shrink-0 items-center justify-center rounded-full border border-[#8B7355] bg-[#faf5ee] text-[16px] text-[#5C4A32]"
                style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
              >
                {index + 1}
              </div>
              <div className="min-w-0">
                <h3 className="mb-1 break-words font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-[#2C1F0E]">
                  {step.title}
                </h3>
                <p className="break-words font-sans text-[13px] leading-relaxed text-ink/65">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "specs",
      title: "Especificações",
      content: (
        <div className="overflow-hidden rounded-[4px] border border-[#EAEAEA]">
          {specificationRows.map((row, index) => (
            <div
              key={`${row.label}-${index}`}
              className={`grid grid-cols-[45%_1fr] text-[13px] ${
                index % 2 === 0 ? "bg-white" : "bg-[#f2f2f2]"
              }`}
            >
              <div className="px-4 py-3 font-jost text-ink/80">{row.label}</div>
              <div className="px-4 py-3 font-jost text-ink/75">{row.value}</div>
            </div>
          ))}
        </div>
      ),
    },
    product.videoUrl
      ? {
          id: "video",
          title: "Vídeo do Produto",
          content: (
            <div className="pt-2">
              <ProductVideo url={product.videoUrl} title={product.name} />
            </div>
          ),
        }
      : null,
  ].filter(Boolean) as { id: string; title: string; content: React.ReactNode }[];

  return (
    <>
      <ProductSeo product={product} canonicalUrl={canonicalUrl} />
      <SiteHeader />

      <main className="bg-[#FAF9F5] text-ink">
        {/* Breadcrumb — desktop only */}
        <div className="hidden md:block bg-[#3A4A3A] border-b border-[#2E3B2E]">
          <nav aria-label="breadcrumb" className="mx-auto max-w-[1440px] px-6 py-3.5">
            <ol className="flex flex-wrap items-center gap-2.5 font-jost text-[12px] tracking-[0.08em] uppercase text-[#D9C9A3]">
              <li>
                <Link to="/" className="transition-colors hover:text-[#F1E6C8]">Início</Link>
              </li>
              <li className="text-[#D9C9A3]/50">/</li>
              <li>
                <Link to="/produtos" className="transition-colors hover:text-[#F1E6C8]">Produtos</Link>
              </li>
              {product.category && (
                <>
                  <li className="text-[#D9C9A3]/50">/</li>
                  <li className="text-[#F1E6C8]">{product.category}</li>
                </>
              )}
            </ol>
          </nav>
        </div>

        {/* === HERO === */}
        <section className="mx-auto max-w-[1440px] px-4 py-6 md:py-9">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-start">
            {/* Galeria */}
            <div className="relative min-w-0">
              {/* Selo monograma */}
              <div className="absolute left-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E4DC] bg-white shadow-sm">
                <span
                  className="font-serif text-[10px] uppercase tracking-[0.15em] text-ink/70"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  AC
                </span>
              </div>
              <ProductGalleryHero images={product.gallery || []} productName={product.name} />
            </div>

            {/* Buy box */}
            <aside className="min-w-0 lg:sticky lg:top-24">
              <div className="space-y-4 rounded-[4px] border border-[#EAEAEA] bg-white p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-2">
                    {pixDiscount > 0 && (
                      <div className="inline-flex max-w-full items-center gap-2 bg-[#3A4A3A] px-3 py-1.5">
                        <Zap size={12} strokeWidth={2} className="flex-shrink-0 text-[#F1E6C8]" />
                        <span className="break-words font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F1E6C8]">
                          Aproveite {pixDiscount}% OFF no PIX
                        </span>
                      </div>
                    )}
                    {product.sku && (
                      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink/45">
                        Ref: {product.sku}
                      </p>
                    )}
                  </div>
                  <WishlistHeart productId={product._id} productName={product.name} />
                </div>

                {/* Título */}
                <h1
                  className="product-title break-words text-center text-[25px] leading-[1.15] text-ink md:text-left md:text-[2.05rem]"
                >
                  {product.name}
                </h1>

                {/* Preços */}
                {price > 0 && (
                  <div className="space-y-1 product-price">
                    {hasDiscount && (
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="text-[13px] text-ink/40 line-through">
                          De {formatBRL(product.price!)}
                        </p>
                        <span className="text-[14px] leading-none text-[#C8A24B]">
                          {discountPct}% off
                        </span>
                      </div>
                    )}
                    <p className="break-words text-[28px] leading-none text-ink md:text-[1.85rem]">
                      {formatBRL(price)}
                    </p>
                    {installmentCount > 0 && (
                      <p className="pt-1 text-[13px] text-ink/65">
                        em até{" "}
                        <span className="text-ink">
                          {installmentCount}x de {formatBRL(installmentValue)}
                        </span>{" "}
                        sem juros
                      </p>
                    )}
                    {pixDiscount > 0 && (
                      <p className="text-[13px] text-ink">
                        ou <span className="text-ink">{formatBRL(pixPrice)}</span> à vista no Pix
                      </p>
                    )}
                  </div>
                )}

                {/* Acabamento */}
                <div className="border-t border-[#EAE6DD] pt-4">
                  <WoodFinishSelector
                    finishes={product.woodFinishes}
                    activeIndex={finishIndex}
                    onChange={setFinishIndex}
                  />
                </div>

                {/* Quantidade */}
                <div className="border-t border-[#EAE6DD] pt-4">
                  <p className="product-label mb-3 text-[13px] text-ink">
                    Quantidade
                  </p>
                  <div className="inline-flex items-stretch border border-[#D9D4C7]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Diminuir quantidade"
                      className="px-4 font-sans text-lg text-ink hover:bg-[#FBF8F2]"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 border-x border-[#D9D4C7] bg-white py-2 text-center font-sans text-sm text-ink"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Aumentar quantidade"
                      className="px-4 font-sans text-lg text-ink hover:bg-[#FBF8F2]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full flex-wrap items-center justify-center gap-2 bg-[#1F4E3D] px-4 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle size={16} strokeWidth={1.8} />
                  Comprar via WhatsApp
                </a>

                {/* CEP */}
                <div className="border-t border-[#EAE6DD] pt-4">
                  <CepCalculator productName={product.name} productSku={product.sku} variant="inline" />
                </div>

                {/* Selos — quadrados verde claro arredondados */}
                <ul className="grid grid-cols-3 gap-3 rounded-[8px] bg-[#d4edda30] p-4 text-center">
                  <li className="flex flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/70">
                      <ShieldCheck size={20} strokeWidth={1.4} className="text-[#28a745]" />
                    </div>
                    <span className="product-label text-[10px] text-ink/70 leading-tight">Compra segura</span>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/70">
                      <Truck size={20} strokeWidth={1.4} className="text-[#28a745]" />
                    </div>
                    <span className="product-label text-[10px] text-ink/70 leading-tight">Entrega dedicada</span>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/70">
                      <Leaf size={20} strokeWidth={1.4} className="text-[#28a745]" />
                    </div>
                    <span className="product-label text-[10px] text-ink/70 leading-tight">Madeira certificada</span>
                  </li>
                </ul>
                <p className="text-center font-jost text-[12px] font-light leading-relaxed text-ink/55">
                  Garantia de 365 dias e devolução gratuita em até 7 dias.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* === DETALHES DO PRODUTO === */}
        <section className="mx-auto max-w-[1440px] px-4 pb-10">
          <div className="border border-[#E6E0D3] bg-white p-6 md:p-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A38A58]">
              Detalhes do produto
            </p>
            <div className="mt-2 max-w-3xl break-words font-serif text-[1.3rem] font-normal leading-snug text-ink md:text-[1.5rem]" style={{ fontFamily: '"Playfair Display", serif' }}>
              {product.description?.length ? (
                <PortableText value={product.description.slice(0, 1)} />
              ) : (
                <p>{product.name} — Design multifuncional em madeira selecionada, com presença clássica e uso cotidiano.</p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E0DACD] bg-[#F8F5EE]">
              {benefits.slice(0, 4).map((b, i) => (
                <div
                  key={b._key ?? `${b.title}-detail-${i}`}
                  className={`min-w-0 p-4 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#E0DACD]" : ""} ${i === 2 ? "lg:border-l border-[#E0DACD] sm:border-t lg:border-t-0" : ""} ${i === 3 ? "lg:border-l border-[#E0DACD] sm:border-t lg:border-t-0" : ""}`}
                >
                  <p className="font-sans text-[9px] font-light uppercase tracking-[0.22em] text-[#A38A58]">
                    {FEATURE_LABELS[i] ?? "Destaque"}
                  </p>
                  <p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-ink/75 break-words">
                    {b.title}
                  </p>
                </div>
              ))}
            </div>

            {product.materials && (
              <div className="mt-6 border-l-4 border-[#8B7355] bg-[#F8F5EE] p-5">
                <p
                  className="font-serif italic text-[14px] leading-relaxed break-words"
                  style={{ fontFamily: '"Playfair Display", serif', color: "#8B7355" }}
                >
                  {product.materials.split("\n")[0]}
                </p>
              </div>
            )}

            <p className="mt-5 max-w-4xl break-words font-sans text-[13px] leading-relaxed text-ink/62">
              Estrutura pensada para uso diário, com proporções equilibradas, acabamento selecionado e atenção aos detalhes visíveis no produto.
            </p>
          </div>
        </section>

        {/* === ACORDEÃO === */}
        <section className="mx-auto max-w-[1440px] px-4 pb-10">
          <ProductAccordion sections={accordionSections} defaultOpen="all" />
        </section>

        {/* === RELACIONADOS === */}
        {product.relatedProducts?.length ? (
          <div className="border-t border-[#EAE6DD]">
            <RelatedProducts products={product.relatedProducts} />
          </div>
        ) : null}

        <SiteFooter />
      </main>
    </>
  );
};

export default ProductPage;
