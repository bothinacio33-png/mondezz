import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SlidersHorizontal, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-mondez.jpg";
import banSofas from "@/assets/banners/sofas.jpg";
import banPoltronas from "@/assets/banners/poltronas.jpg";
import banMesas from "@/assets/banners/mesas.jpg";
import banMesasCentro from "@/assets/banners/mesas-centro.jpg";
import banCadeiras from "@/assets/banners/cadeiras.jpg";
import banAparadores from "@/assets/banners/aparadores.jpg";
import banCamas from "@/assets/banners/camas.jpg";
import banEstantes from "@/assets/banners/estantes.jpg";
import banBuffets from "@/assets/banners/buffets.jpg";
import banIluminacao from "@/assets/banners/iluminacao.jpg";
import banTapetes from "@/assets/banners/tapetes.jpg";
import banDecoracao from "@/assets/banners/decoracao.jpg";

const CATEGORY_BANNERS: Record<string, string> = {
  sofas: banSofas,
  poltronas: banPoltronas,
  mesas: banMesas,
  "mesas-centro": banMesasCentro,
  cadeiras: banCadeiras,
  aparadores: banAparadores,
  estantes: banEstantes,
  camas: banCamas,
  buffets: banBuffets,
  iluminacao: banIluminacao,
  tapetes: banTapetes,
  decoracao: banDecoracao,
};

import { sanityClient, CATALOG_QUERY, type CatalogProduct } from "@/lib/sanity";
import { SiteHeader } from "@/components/mondez/SiteHeader";
import { SiteFooter } from "@/components/mondez/SiteFooter";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "recent" | "price-asc" | "price-desc" | "name-asc";

const CATEGORY_LABELS: Record<string, string> = {
  sofas: "Sofás",
  cadeiras: "Cadeiras",
  mesas: "Mesas",
  poltronas: "Poltronas",
  "mesas-centro": "Mesas Centro & Laterais",
  estantes: "Estantes & Aparadores",
  banquetas: "Banquetas",
  camas: "Camas & Quartos",
  iluminacao: "Iluminação",
  decoracao: "Decoração",
};

const CATEGORY_TAGLINES: Record<string, string> = {
  sofas: "SOFÁS DE ALTO PADRÃO",
  cadeiras: "CADEIRAS DE ALTO PADRÃO",
  mesas: "MESAS DE JANTAR DE ALTO PADRÃO",
  poltronas: "POLTRONAS DE ALTO PADRÃO",
  "mesas-centro": "MESAS DE CENTRO & LATERAIS",
  estantes: "ESTANTES & APARADORES DE ALTO PADRÃO",
  banquetas: "BANQUETAS DE ALTO PADRÃO",
  camas: "CAMAS & QUARTOS DE ALTO PADRÃO",
  iluminacao: "ILUMINAÇÃO DE ALTO PADRÃO",
  decoracao: "DECORAÇÃO DE ALTO PADRÃO",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  sofas:
    "Sofás estofados sob medida em estruturas de madeira maciça — assentos profundos e acabamentos refinados para a sala de estar.",
  cadeiras:
    "Cadeiras de jantar em madeira maciça, com estofamento e acabamentos artesanais — conforto e desenho para mesas de longas conversas.",
  mesas:
    "Mesas de jantar em madeira maciça, com tampos generosos e bases esculpidas — peças centrais para reunir a família.",
  poltronas:
    "Poltronas autorais em madeira maciça e tecidos selecionados — assinatura de conforto para leituras, lareiras e cantos de descanso.",
  "mesas-centro":
    "Mesas de centro e laterais em madeira maciça, mármore e metal — complementos que estruturam o estar com discrição e presença.",
  estantes:
    "Estantes e aparadores em madeira maciça — marcenaria refinada para organizar livros, louças e objetos de afeto.",
  banquetas:
    "Banquetas em madeira maciça e metal — peças funcionais que transformam a cozinha e o bar em ambiente de convívio sofisticado.",
  camas:
    "Camas e peças de quarto em madeira maciça, com cabeceiras estofadas — atmosfera serena e duradoura para o descanso.",
  iluminacao:
    "Luminárias, pendentes e arandelas selecionados pela Mondez — luz quente e desenho elegante para ambientar cada cômodo.",
  decoracao:
    "Objetos de decoração escolhidos a dedo — vasos, esculturas e acessórios que finalizam o ambiente com personalidade.",
};

const CATEGORY_ORDER = [
  "sofas",
  "cadeiras",
  "mesas",
  "poltronas",
  "mesas-centro",
  "estantes",
  "banquetas",
  "camas",
  "iluminacao",
  "decoracao",
];

// Mapeamento ambiente → categorias relacionadas
const ROOM_FILTERS = [
  { id: "sala-jantar", label: "Sala de Jantar", cats: ["mesas", "cadeiras"] },
  { id: "sala-estar", label: "Sala de Estar", cats: ["sofas", "poltronas", "mesas-centro"] },
  { id: "quarto", label: "Quarto", cats: ["camas"] },
  { id: "home-office", label: "Home Office", cats: ["mesas", "cadeiras"] },
  { id: "cozinha", label: "Cozinha & Bar", cats: ["banquetas", "mesas"] },
  { id: "decor", label: "Decoração", cats: ["iluminacao", "decoracao", "estantes"] },
];

const PRICE_RANGES = [
  { id: "0-2000", label: "Até R$ 2.000", min: 0, max: 2000 },
  { id: "2000-5000", label: "R$ 2.000 — 5.000", min: 2000, max: 5000 },
  { id: "5000-10000", label: "R$ 5.000 — 10.000", min: 5000, max: 10000 },
  { id: "10000-99999999", label: "Acima de R$ 10.000", min: 10000, max: 99999999 },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Mais recentes" },
  { value: "name-asc", label: "Nome (A-Z)" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
];

// Mock para preview quando o Sanity está vazio.
const MOCK_PRODUCTS: CatalogProduct[] = [
  { _id: "m-1", name: "Sofá Modular Grasse 3 lugares em linho cru", slug: { current: "mock-sofa-grasse" }, category: "sofas", price: 18900 },
  { _id: "m-2", name: "Mesa de Jantar Tavora carvalho 8 lugares", slug: { current: "mock-mesa-tavora" }, category: "mesas", price: 12450 },
  { _id: "m-3", name: "Poltrona Aurora estofada veludo verde", slug: { current: "mock-poltrona-aurora" }, category: "poltronas", price: 7890 },
  { _id: "m-4", name: "Cadeira Belga Linho assento estofado", slug: { current: "mock-cadeira-belga" }, category: "cadeiras", price: 2480 },
  { _id: "m-5", name: "Aparador Castelão freijó 4 portas", slug: { current: "mock-aparador-castelao" }, category: "estantes", price: 9650 },
  { _id: "m-6", name: "Mesa de Centro Lis mármore travertino", slug: { current: "mock-mesa-centro-lis" }, category: "mesas-centro", price: 4320 },
  { _id: "m-7", name: "Banqueta Caravela alta encosto baixo", slug: { current: "mock-banqueta-caravela" }, category: "banquetas", price: 1890 },
  { _id: "m-8", name: "Sofá 3 lugares Praiano estofado boucle", slug: { current: "mock-sofa-praiano" }, category: "sofas", price: 14200 },
  { _id: "m-9", name: "Mesa Lateral Orvalho freijó torneada", slug: { current: "mock-mesa-orvalho" }, category: "mesas-centro", price: 2890 },
  { _id: "m-10", name: "Cadeira Veneza encosto curvo madeira", slug: { current: "mock-cadeira-veneza" }, category: "cadeiras", price: 1690 },
  { _id: "m-11", name: "Cama King Cipreste cabeceira estofada", slug: { current: "mock-cama-cipreste" }, category: "camas", price: 8900 },
  { _id: "m-12", name: "Pendente Galé latão escovado", slug: { current: "mock-pendente-gale" }, category: "iluminacao", price: 2450 },
];

const Catalog = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cat = params.get("categoria") ?? params.get("cat") ?? "all";
  const room = params.get("room") ?? "all";
  const priceRange = params.get("price") ?? "all";
  const sort = (params.get("sort") as SortKey) ?? "recent";
  const q = (params.get("q") ?? "").trim();

  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    sanityClient
      .fetch<CatalogProduct[]>(CATALOG_QUERY)
      .then((data) => {
        if (cancelled) return;
        setProducts(data || []);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("[Sanity] catalog fetch failed", err);
        if (!cancelled) setStatus("error");
      });
    return () => { cancelled = true; };
  }, []);

  const isEmpty = status === "ready" && products.length === 0;
  const sourceList = isEmpty ? MOCK_PRODUCTS : products;

  // Categorias visíveis com contagens
  const categories = useMemo(() => {
    const found = new Set<string>();
    sourceList.forEach((p) => p.category && found.add(p.category));
    const ordered: string[] = [];
    CATEGORY_ORDER.forEach((c) => { if (found.has(c)) ordered.push(c); });
    Array.from(found).forEach((c) => { if (!ordered.includes(c)) ordered.push(c); });
    return ordered;
  }, [sourceList]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    sourceList.forEach((p) => {
      if (p.category) map.set(p.category, (map.get(p.category) || 0) + 1);
    });
    return map;
  }, [sourceList]);

  const filtered = useMemo(() => {
    let list = [...sourceList];
    if (q) {
      const nq = normalize(q);
      list = list.filter((p) => normalize(p.name).includes(nq));
    }
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (room !== "all") {
      const r = ROOM_FILTERS.find((x) => x.id === room);
      if (r) list = list.filter((p) => p.category && r.cats.includes(p.category));
    }
    if (priceRange !== "all") {
      const r = PRICE_RANGES.find((x) => x.id === priceRange);
      if (r) {
        list = list.filter((p) => {
          const pr = p.promotionalPrice ?? p.price;
          if (pr == null) return false;
          return pr >= r.min && pr <= r.max;
        });
      }
    }
    if (sort === "price-asc") {
      list.sort((a, b) => (a.promotionalPrice ?? a.price ?? Infinity) - (b.promotionalPrice ?? b.price ?? Infinity));
    } else if (sort === "price-desc") {
      list.sort((a, b) => (b.promotionalPrice ?? b.price ?? -Infinity) - (a.promotionalPrice ?? a.price ?? -Infinity));
    } else if (sort === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [sourceList, cat, room, priceRange, sort, q]);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "" || value === "all" || value === "recent") next.delete(key);
    else next.set(key, value);
    // Limpa alias legado quando atualiza categoria
    if (key === "categoria") next.delete("cat");
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const activeFilters = [
    cat !== "all",
    room !== "all",
    priceRange !== "all",
  ].filter(Boolean).length;

  // Título dinâmico
  const heroTitle = q
    ? `Resultados para "${q}"`
    : cat !== "all"
      ? CATEGORY_LABELS[cat] || cat
      : room !== "all"
        ? ROOM_FILTERS.find((r) => r.id === room)?.label || "Catálogo"
        : "Móveis para sua casa";

  // Painel de filtros (compartilhado entre desktop sidebar e mobile drawer)
  const FilterPanel = (
    <div className="space-y-8">
      {/* Categorias */}
      <FilterSection title="Categoria">
        <ul className="space-y-2">
          <li>
            <FilterRadio
              label="Todas as categorias"
              count={sourceList.length}
              checked={cat === "all"}
              onClick={() => update("categoria", "all")}
            />
          </li>
          {categories.map((c) => (
            <li key={c}>
              <FilterRadio
                label={CATEGORY_LABELS[c] || c}
                count={counts.get(c) || 0}
                checked={cat === c}
                onClick={() => update("categoria", c)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Ambiente */}
      <FilterSection title="Ambiente">
        <ul className="space-y-2">
          <li>
            <FilterRadio
              label="Todos os ambientes"
              checked={room === "all"}
              onClick={() => update("room", "all")}
            />
          </li>
          {ROOM_FILTERS.map((r) => (
            <li key={r.id}>
              <FilterRadio
                label={r.label}
                checked={room === r.id}
                onClick={() => update("room", r.id)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Preço */}
      <FilterSection title="Preço">
        <ul className="space-y-2">
          <li>
            <FilterRadio
              label="Todas as faixas"
              checked={priceRange === "all"}
              onClick={() => update("price", "all")}
            />
          </li>
          {PRICE_RANGES.map((r) => (
            <li key={r.id}>
              <FilterRadio
                label={r.label}
                checked={priceRange === r.id}
                onClick={() => update("price", r.id)}
              />
            </li>
          ))}
        </ul>
      </FilterSection>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Catálogo Mondez Mobiliário · Móveis de alto padrão</title>
        <meta
          name="description"
          content="Explore o catálogo Mondez Mobiliário. Sofás, mesas, cadeiras, poltronas e mais — curadoria de alto padrão à pronta entrega."
        />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/produtos` : undefined} />
      </Helmet>

      <SiteHeader />

      <main className="bg-white text-ink">
        {/* HERO PARALLAX — escurece ao descer */}
        <CatalogHero heroTitle={heroTitle} cat={cat} />

        {/* TOOLBAR — contador + sort */}
        <section className="sticky top-[var(--header-h,64px)] z-30 border-y border-ink/10 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/70 hover:text-brass transition-colors"
            >
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilters > 0 && (
                <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[9px] text-ink">
                  {activeFilters}
                </span>
              )}
            </button>

            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink/55">
              {status === "loading" ? "—" : `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}`}
            </p>

            <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-ink/60">
              <label htmlFor="sort" className="hidden sm:inline">Ordenar por:</label>
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => update("sort", e.target.value)}
                  className="appearance-none border border-ink/15 bg-white py-1.5 pl-3 pr-8 text-ink outline-none focus:border-brass cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} strokeWidth={1.5} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink/50" />
              </div>
            </div>
          </div>
          {q && (
            <div className="border-t border-ink/10 bg-alabaster/40">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2 md:px-10">
                <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-ink/70">
                  Busca:
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-alabaster normal-case tracking-normal">
                    {q}
                    <button
                      type="button"
                      aria-label="Remover busca"
                      onClick={() => update("q", null)}
                      className="hover:text-brass"
                    >
                      <X size={11} strokeWidth={1.8} />
                    </button>
                  </span>
                </span>
              </div>
            </div>
          )}
        </section>

        {isEmpty && (
          <div className="border-b border-brass/30 bg-brass/5">
            <div className="mx-auto max-w-7xl px-6 py-3 md:px-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brass">
                Pré-visualização · Catálogo Sanity vazio. Mostrando 12 peças mock.
              </p>
            </div>
          </div>
        )}

        {/* GRID */}
        <section className="px-4 py-8 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            {status === "loading" && (
              <p className="py-20 text-center font-sans text-[10px] tracking-[0.4em] text-ink/40">
                CARREGANDO CATÁLOGO…
              </p>
            )}

            {status === "error" && (
              <p className="py-20 text-center font-sans text-sm text-ink/60">
                Não foi possível carregar o catálogo. Tente novamente em instantes.
              </p>
            )}

            {status === "ready" && filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="font-sans text-[10px] tracking-[0.4em] text-brass">— NADA POR AQUI</p>
                <h2 className="mt-4 font-serif text-2xl md:text-3xl text-ink font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Nenhuma peça encontrada.
                </h2>
                <p className="mt-3 font-sans text-sm text-ink/60">
                  Ajuste os filtros ou fale com um consultor.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 border border-ink px-6 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink hover:bg-ink hover:text-alabaster transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}

            {status === "ready" && filtered.length > 0 && (
              <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
                {filtered.map((p, i) => (
                  <li key={p._id}>
                    <ProductCard product={p} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {/* DRAWER DE FILTROS */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <button
            aria-label="Fechar filtros"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Filtros</p>
                <h2 className="mt-1 font-serif text-xl font-light text-ink" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Refinar busca
                </h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {FilterPanel}
            </div>

            <footer className="flex items-center gap-3 border-t border-ink/10 px-6 py-4">
              <button
                onClick={() => { clearAll(); }}
                className="flex-1 border border-ink/20 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/70 hover:border-ink hover:text-ink transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-[1.5] bg-ink py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-alabaster hover:bg-brass hover:text-ink transition-colors"
              >
                Ver {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
              </button>
            </footer>
          </aside>
        </div>
      )}

      {/* SEÇÃO INSTITUCIONAL — texto editorial */}
      <section className="bg-[#FAF7F1] py-20 md:py-28 px-6 md:px-12 border-t border-ink/10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-brass mb-5">— Curadoria Mondez</p>
          <h2
            className="font-serif text-2xl md:text-4xl font-light leading-[1.2] text-ink"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            Móveis de Luxo — A <span className="italic text-[#A38A58]">Curadoria Mondez</span> para Interiores Extraordinários
          </h2>
          <div className="mt-8 space-y-5 font-sans text-[14px] md:text-[15px] font-light leading-relaxed text-ink/70 text-left md:text-center">
            <p>
              Na <strong className="font-medium text-ink/90">Mondez</strong>, cada móvel é selecionado com um único critério definitivo: a capacidade da peça de elevar o ambiente em que é inserida a um nível de beleza, conforto e sofisticação que se percebe imediatamente. Nossa curadoria abrange os grandes estilos do mobiliário de alto padrão — do clássico europeu ao design assinado contemporâneo, sempre com rigor construtivo e coerência estética.
            </p>
            <p
              className="font-serif italic text-[18px] md:text-[20px] text-ink/80 pt-4"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Explore o acervo no Atelier Mondez.
            </p>
            <p>
              Peças únicas, séries limitadas, clássicos atemporais e criações de designers de referência nacional e internacional — a Mondez é o destino de quem não abre mão de qualidade, beleza e personalidade na composição do seu lar.
            </p>
          </div>
          <Link
            to="/produtos"
            className="mt-10 inline-block border border-ink px-8 py-4 font-sans text-[10px] uppercase tracking-[0.35em] text-ink hover:bg-ink hover:text-alabaster transition-colors"
          >
            Ver todo o acervo →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

// ---------- subcomponentes locais ----------

const CatalogHero = ({
  heroTitle,
  cat,
}: {
  heroTitle: string;
  cat: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: imagem desloca mais devagar que o scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Escurecimento progressivo ao descer
  const overlay = useTransform(scrollYProgress, [0, 1], [0.45, 0.85]);

  const bgImg = CATEGORY_BANNERS[cat] ?? heroBg;
  return (
    <section
      ref={ref}
      className="relative overflow-hidden h-[180px] md:h-[320px]"
    >
      {/* Imagem parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y }}
      >
        <div
          key={bgImg}
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${bgImg})` }}
          aria-hidden
        />
      </motion.div>

      {/* Overlay base + gradiente escurecendo embaixo */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ opacity: overlay }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink/90"
        aria-hidden
      />

      {/* Conteúdo — alinhado à esquerda */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-5 md:px-10 md:pb-12">
        <nav
          aria-label="Breadcrumbs"
          className="mb-2 md:mb-4 flex items-center gap-2 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-alabaster/55"
        >
          <Link to="/" className="hover:text-brass transition-colors">Início</Link>
          <ChevronRight size={11} strokeWidth={1.2} className="text-alabaster/35" />
          <span className="text-alabaster/85">Catálogo</span>
          {cat !== "all" && (
            <>
              <ChevronRight size={11} strokeWidth={1.2} className="text-alabaster/35" />
              <span className="text-brass">{CATEGORY_LABELS[cat]}</span>
            </>
          )}
        </nav>

        <div className="max-w-2xl">
          <h1
            className="font-serif text-[1.4rem] md:text-4xl font-light leading-[1.1] text-alabaster"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {heroTitle}
          </h1>
          {cat !== "all" && CATEGORY_TAGLINES[cat] && (
            <p className="mt-2 md:mt-3 font-serif text-[11px] md:text-[13px] uppercase tracking-[0.28em] text-brass"
               style={{ fontFamily: '"Playfair Display", serif' }}>
              {CATEGORY_TAGLINES[cat]}
            </p>
          )}
          {cat !== "all" && CATEGORY_DESCRIPTIONS[cat] ? (
            <p className="mt-2 md:mt-3 font-serif text-[11px] md:text-[13px] font-light leading-snug text-alabaster/75 max-w-xl"
               style={{ fontFamily: '"Playfair Display", serif' }}>
              {CATEGORY_DESCRIPTIONS[cat]}
            </p>
          ) : (
            <p className="mt-2 md:mt-3 font-sans text-[9px] md:text-[11px] uppercase tracking-[0.35em] text-alabaster/60">
              Curadoria autoral · Pronta entrega
            </p>
          )}
        </div>
      </div>
    </section>
  );
};


const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— {title}</p>
    {children}
  </div>
);

const FilterRadio = ({
  label, count, checked, onClick,
}: { label: string; count?: number; checked: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center justify-between gap-3 py-1.5 text-left transition-colors"
  >
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          checked ? "border-brass bg-brass" : "border-ink/25 group-hover:border-ink/50"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
      </span>
      <span className={`font-sans text-sm transition-colors ${checked ? "text-ink font-medium" : "text-ink/70 group-hover:text-ink"}`}>
        {label}
      </span>
    </span>
    {count != null && (
      <span className="font-sans text-xs text-ink/35">{count}</span>
    )}
  </button>
);

export default Catalog;
