import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Heart, Menu, ChevronRight } from "lucide-react";
import logoLight from "@/assets/mondez-logo-full.webp";
import logoDark from "@/assets/mondez-logo-dark.png";
import { useWishlist } from "@/hooks/use-wishlist";

interface Props {
  /** light = bg alabaster (default). transparent = sobreposto a hero (apenas Home topo). dark = logo preto (catálogo/produto). */
  variant?: "light" | "transparent" | "dark";
}

const COLLECTIONS: { label: string; cat: string; desc: string }[] = [
  { label: "Sofás", cat: "sofas", desc: "Modulares, retrô e clássicos." },
  { label: "Poltronas", cat: "poltronas", desc: "Lounge, leitura e clássicas." },
  { label: "Mesas de Jantar", cat: "mesas", desc: "Jantar, jardim e bistrô." },
  { label: "Mesas de Centro", cat: "mesas-centro", desc: "Mármore, madeira, metal." },
  { label: "Cadeiras", cat: "cadeiras", desc: "Estofadas, jantar e escritório." },
  { label: "Aparadores", cat: "aparadores", desc: "Freijó, carvalho, lacca." },
  { label: "Camas", cat: "camas", desc: "Cabeceiras estofadas e madeira." },
  { label: "Estantes", cat: "estantes", desc: "Modulares e de parede." },
  { label: "Buffets", cat: "buffets", desc: "Cristaleiras e bar cabinets." },
  { label: "Iluminação", cat: "iluminacao", desc: "Pendentes, abajures, arandelas." },
  { label: "Tapetes", cat: "tapetes", desc: "Lã, juta e fibras naturais." },
  { label: "Decoração", cat: "decoracao", desc: "Vasos, objetos e arte." },
];

const MOBILE_CATEGORIES = [
  { label: "Sofás", cat: "sofas" },
  { label: "Poltronas", cat: "poltronas" },
  { label: "Mesas de Jantar", cat: "mesas" },
  { label: "Mesas de Centro", cat: "mesas-centro" },
  { label: "Cadeiras", cat: "cadeiras" },
  { label: "Aparadores", cat: "aparadores" },
  { label: "Camas", cat: "camas" },
  { label: "Estantes", cat: "estantes" },
  { label: "Buffets", cat: "buffets" },
  { label: "Iluminação", cat: "iluminacao" },
  { label: "Tapetes", cat: "tapetes" },
  { label: "Decoração", cat: "decoracao" },
];

export const SiteHeader = ({ variant = "light" }: Props) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [q, setQ] = useState("");
  const closeTimer = useRef<number | null>(null);
  const { count } = useWishlist();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMegaOpen(false);
        setDrawerOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Trava o scroll quando drawer/search aberto
  useEffect(() => {
    const lock = drawerOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, searchOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setSearchOpen(false);
    navigate(`/produtos?q=${encodeURIComponent(term)}`);
  };

  const isTransparent = variant === "transparent";
  const textBase = isTransparent ? "text-alabaster/85" : "text-ink/70";
  const textHover = "hover:text-brass";
  const bg = isTransparent ? "bg-transparent" : "bg-white/90";
  const border = isTransparent ? "border-transparent" : "border-ink/8";

  const openMega = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b ${border} ${bg} backdrop-blur-md transition-colors`}
      onMouseLeave={scheduleCloseMega}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:gap-6 md:px-10 md:py-5">
        <Link to="/" aria-label="Mondez Mobiliário — Início" className="flex items-center">
          <img src={variant === "transparent" ? logoLight : logoDark} alt="Mondez Mobiliário" className="h-9 md:h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link
            to="/produtos"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textBase} ${textHover}`}
          >
            Catálogo
          </Link>
          <button
            type="button"
            onMouseEnter={openMega}
            onFocus={openMega}
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            aria-haspopup="true"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${textBase} ${textHover}`}
          >
            Coleções
          </button>
          <a
            href="https://wa.me/555499923786"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-[10px] uppercase tracking-[0.3em] text-brass transition-colors hover:text-ink`}
          >
            Consultoria
          </a>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          {/* Busca desktop — alinhada e estável */}
          <form
            onSubmit={submit}
            className={`hidden md:inline-flex h-8 items-center gap-2 border-b ${
              isTransparent ? "border-alabaster/30" : "border-ink/15"
            } pb-1.5 focus-within:border-brass transition-colors`}
          >
            <Search size={13} strokeWidth={1.4} className={`${textBase} flex-shrink-0`} />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar"
              className={`w-32 lg:w-44 bg-transparent font-sans text-[11px] tracking-[0.1em] outline-none ${
                isTransparent ? "text-alabaster placeholder:text-alabaster/45" : "text-ink placeholder:text-ink/40"
              }`}
            />
          </form>

          {/* Busca mobile */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className={`md:hidden ${textBase} ${textHover}`}
          >
            <Search size={18} strokeWidth={1.4} />
          </button>

          {/* Wishlist */}
          <Link
            to="/favoritos"
            aria-label={`Favoritos${count > 0 ? ` (${count})` : ""}`}
            className={`relative inline-flex items-center ${textBase} ${textHover}`}
          >
            <Heart size={17} strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 text-[9px] font-medium text-alabaster">
                {count}
              </span>
            )}
          </Link>

          {/* Menu hambúrguer mobile */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
            className={`md:hidden ${textBase} ${textHover}`}
          >
            <Menu size={20} strokeWidth={1.4} />
          </button>
        </div>
      </div>

      {/* Mega menu suspenso — Coleções (desktop) */}
      {megaOpen && (
        <div
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className="absolute left-0 top-full hidden w-full border-t border-brass/20 bg-white shadow-xl md:block"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-10 gap-y-2 px-6 py-10 md:grid-cols-4 md:px-10 md:py-12">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.cat}
                to={`/produtos?categoria=${c.cat}`}
                onClick={() => setMegaOpen(false)}
                className="group flex flex-col gap-1 border-b border-ink/8 py-3 transition-colors"
              >
                <span
                  className="font-serif text-lg font-light leading-tight text-ink transition-colors group-hover:text-brass"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {c.label}
                </span>
                <span className="font-sans text-[11px] leading-relaxed text-ink/50">
                  {c.desc}
                </span>
              </Link>
            ))}
          </div>
          <div className="border-t border-ink/8">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink/50">
                Curadoria autoral · Pronta entrega
              </span>
              <Link
                to="/produtos"
                onClick={() => setMegaOpen(false)}
                className="font-sans text-[10px] uppercase tracking-[0.3em] text-brass hover:text-ink transition-colors"
              >
                Ver tudo →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Drawer mobile — categorias */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[200] flex md:hidden">
          <button
            aria-label="Fechar menu"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-white/80 backdrop-blur-md animate-in fade-in duration-200"
          />
          <aside className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300 border-l border-ink/10">
            <header className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-brass">— Menu</p>
                <h2 className="mt-1 font-serif text-xl font-light text-ink" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Categorias
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

            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-ink/8">
                <li>
                  <Link
                    to="/produtos"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-ink hover:bg-[#FAF7F1] transition-colors"
                  >
                    <span className="font-sans text-[12px] uppercase tracking-[0.22em]">Catálogo Completo</span>
                    <ChevronRight size={14} className="text-brass" />
                  </Link>
                </li>
                {MOBILE_CATEGORIES.map((c) => (
                  <li key={c.cat}>
                    <Link
                      to={`/produtos?categoria=${c.cat}`}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center justify-between px-5 py-4 text-ink hover:bg-[#FAF7F1] transition-colors"
                    >
                      <span className="font-serif text-[16px] font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {c.label}
                      </span>
                      <ChevronRight size={14} className="text-ink/30" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/favoritos"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-ink hover:bg-[#FAF7F1] transition-colors"
                  >
                    <span className="font-sans text-[12px] uppercase tracking-[0.22em]">Favoritos</span>
                    <ChevronRight size={14} className="text-brass" />
                  </Link>
                </li>
              </ul>
            </div>

            <footer className="border-t border-ink/10 px-5 py-5 space-y-3">
              <a
                href="https://wa.me/555499923786"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#1F4E3D] py-3 text-center font-sans text-[11px] uppercase tracking-[0.25em] text-white"
              >
                Falar com consultor
              </a>
              <p className="text-center font-sans text-[10px] uppercase tracking-[0.3em] text-ink/45">
                Av. Itália, 417 · Caxias do Sul
              </p>
            </footer>
          </aside>
        </div>
      )}

      {/* Search overlay — fundo branco */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[210] flex items-start justify-center bg-white px-6 pt-24 md:pt-32"
          onClick={() => setSearchOpen(false)}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl border-b border-ink/20"
          >
            <div className="flex items-center gap-4 pb-3">
              <Search size={20} strokeWidth={1.2} className="text-ink/50" />
              <input
                autoFocus
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="O que procura? Ex: sofá, mesa de jantar, poltrona…"
                className="w-full bg-transparent font-serif text-xl md:text-3xl font-light text-ink placeholder:text-ink/35 outline-none"
                style={{ fontFamily: '"Playfair Display", serif' }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fechar busca"
                className="text-ink/50 hover:text-ink"
              >
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/45">
              Pressione Enter para buscar · ESC para fechar
            </p>
          </form>
        </div>
      )}
    </header>
  );
};
