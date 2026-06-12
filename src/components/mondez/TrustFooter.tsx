import { ShieldCheck, Lock, Star, BadgeCheck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/mondez-logo-full.webp";

/**
 * Rodapé rico de credibilidade — Trust Signals para conversão.
 * 3 colunas: Segurança · Pagamento · Credibilidade.
 */
export const TrustFooter = () => {
  return (
    <footer className="bg-ink text-alabaster/70">
      {/* Trust strip */}
      <div className="border-b border-alabaster/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
          {/* Segurança */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Segurança</p>
            <h3
              className="mt-3 font-serif text-xl font-light text-alabaster"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Navegação 100% segura.
            </h3>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2 rounded-sm border border-alabaster/15 px-3 py-2">
                <Lock size={16} strokeWidth={1.4} className="text-brass" />
                <span className="font-sans text-[10px] uppercase tracking-[0.25em]">SSL</span>
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-alabaster/15 px-3 py-2">
                <ShieldCheck size={16} strokeWidth={1.4} className="text-brass" />
                <span className="font-sans text-[10px] uppercase tracking-[0.25em]">Site Verificado</span>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Pagamento</p>
            <h3
              className="mt-3 font-serif text-xl font-light text-alabaster"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Em até 10x sem juros.
            </h3>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["VISA", "MASTER", "ELO", "AMEX", "HIPERCARD"].map((b) => (
                <span
                  key={b}
                  className="rounded-sm border border-alabaster/15 px-3 py-2 font-sans text-[10px] tracking-[0.2em] text-alabaster/80"
                >
                  {b}
                </span>
              ))}
              <span className="flex items-center gap-2 rounded-sm border border-brass/40 bg-brass/10 px-3 py-2 font-sans text-[10px] tracking-[0.2em] text-brass">
                <CreditCard size={14} strokeWidth={1.4} />
                PIX 5% OFF
              </span>
            </div>
          </div>

          {/* Credibilidade */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-brass">— Credibilidade</p>
            <h3
              className="mt-3 font-serif text-xl font-light text-alabaster"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Reputação reconhecida.
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-sm border border-alabaster/15 px-3 py-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-brass" strokeWidth={0} />
                  ))}
                </div>
                <span className="font-sans text-[11px] tracking-[0.2em] text-alabaster/90">
                  Google · 5.0 / Excelência
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-alabaster/15 px-3 py-2">
                <BadgeCheck size={16} strokeWidth={1.4} className="text-brass" />
                <span className="font-sans text-[11px] tracking-[0.2em] text-alabaster/90">
                  Garantia Mondez · 365 dias
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row md:px-10">
        <img src={logo} alt="Mondez Mobiliário" className="h-12 w-auto" />
        <div className="flex items-center gap-6">
          <a
            href="https://www.facebook.com/mondezmobiliario/"
            target="_blank" rel="noopener noreferrer"
            className="text-alabaster/60 hover:text-brass transition-colors"
            aria-label="Facebook Mondez"
          >
            <Facebook size={18} strokeWidth={1.2} />
          </a>
          <a
            href="https://instagram.com/mondezmobiliario"
            target="_blank" rel="noopener noreferrer"
            className="text-alabaster/60 hover:text-brass transition-colors"
            aria-label="Instagram Mondez"
          >
            <Instagram size={18} strokeWidth={1.2} />
          </a>
          <a
            href="https://wa.me/555499923786"
            target="_blank" rel="noopener noreferrer"
            className="text-alabaster/60 hover:text-brass transition-colors"
            aria-label="WhatsApp Mondez"
          >
            <MessageCircle size={18} strokeWidth={1.2} />
          </a>
        </div>
      </div>

      <div className="border-t border-alabaster/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 font-sans text-[10px] tracking-[0.3em] uppercase text-alabaster/50 md:flex-row md:px-10">
          <span>© 2026 Mondez Mobiliário · Caxias do Sul, RS</span>
          <Link to="/admin" className="hover:text-brass transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
};
