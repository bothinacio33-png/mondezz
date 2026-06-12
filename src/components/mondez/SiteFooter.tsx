import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  MessageCircle,
  ShieldCheck,
  Lock,
  BadgeCheck,
} from "lucide-react";
import logoDark from "@/assets/mondez-logo-dark.png";

const COLUMNS = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Mondez", href: "/" },
      { label: "Manifesto", href: "/" },
      { label: "Showroom", href: "/" },
      { label: "Imprensa", href: "/" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "WhatsApp", href: "https://wa.me/555499923786" },
      { label: "Email", href: "mailto:contato@mondez.com.br" },
      { label: "Consultoria", href: "https://wa.me/555499923786" },
      { label: "Caxias do Sul, RS", href: "/" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Frete & Prazos", href: "/" },
      { label: "Garantia 365 dias", href: "/" },
      { label: "Trocas & Devoluções", href: "/" },
      { label: "Pagamentos", href: "/" },
    ],
  },
  {
    title: "Redes Sociais",
    links: [
      { label: "Instagram", href: "https://instagram.com/mondezmobiliario" },
      { label: "Facebook", href: "https://www.facebook.com/mondezmobiliario/" },
      { label: "Pinterest", href: "/" },
      { label: "Favoritos", href: "/favoritos" },
    ],
  },
];

/**
 * Rodapé Mondez — Atelier Clássico.
 */
export const SiteFooter = () => {
  return (
    <footer className="bg-ink text-alabaster/70">
      {/* COLUNAS — fundo branco */}
      <div className="bg-white text-foreground border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 gap-x-10 px-6 py-14 md:grid-cols-4 md:px-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="pb-3 border-b border-brass/30 font-sans text-[10px] uppercase tracking-[0.4em] text-brass">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") || l.href.startsWith("mailto:") ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-sans text-[13px] font-light text-ink/70 hover:text-brass transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.href}
                        className="font-sans text-[13px] font-light text-ink/70 hover:text-brass transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST STRIP — fundo branco */}
      <div className="bg-white border-b border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-7 md:px-10">
          <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <Lock size={14} strokeWidth={1.4} className="text-brass" /> SSL Seguro
          </span>
          <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <ShieldCheck size={14} strokeWidth={1.4} className="text-brass" /> Site Verificado
          </span>
          <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <BadgeCheck size={14} strokeWidth={1.4} className="text-brass" /> Garantia 365 dias
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60">
            VISA · MASTER · ELO · AMEX · PIX 5% OFF
          </span>
        </div>
      </div>

      {/* CONTATO BASE */}
      <div className="bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 md:px-10 md:py-16">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Showroom</p>
            <p className="mt-4 font-serif text-lg font-light leading-relaxed text-alabaster" style={{ fontFamily: '"Playfair Display", serif' }}>
              Av. Itália, 417<br />
              Caxias do Sul · RS
            </p>
            <p className="mt-3 font-sans text-xs font-light text-alabaster/55">
              Seg a Sex: 9h às 18h<br />
              Sáb: 9h às 13h
            </p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Atendimento</p>
            <p className="mt-4 font-serif text-lg font-light leading-relaxed text-alabaster" style={{ fontFamily: '"Playfair Display", serif' }}>
              +55 54 9 9923-7868
            </p>
            <p className="mt-1 font-sans text-xs font-light text-alabaster/55">
              contato@mondez.com.br
            </p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Sobre</p>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-alabaster/65">
              Curadoria autoral, marcenaria obsessiva e logística dedicada — uma experiência de compra que respeita o tempo e o lar de quem escolhe morar bem.
            </p>
          </div>
        </div>
      </div>

      {/* COPY + LOGO */}
      <div className="border-t border-alabaster/10 bg-alabaster">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row md:px-10">
          <img src={logoDark} alt="Mondez Mobiliário" className="h-9 w-auto" />
          <div className="flex items-center gap-5">
            <a href="https://instagram.com/mondezmobiliario" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-brass transition-colors" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.2} />
            </a>
            <a href="https://www.facebook.com/mondezmobiliario/" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-brass transition-colors" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.2} />
            </a>
            <a href="https://wa.me/555499923786" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-brass transition-colors" aria-label="WhatsApp">
              <MessageCircle size={18} strokeWidth={1.2} />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/50 md:gap-6">
            <span>© 2026 Mondez · Caxias do Sul, RS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
