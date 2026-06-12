import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const OPTIONS = [
  {
    label: "1. BUSCO PEÇAS À PRONTA ENTREGA",
    href: "https://api.whatsapp.com/send/?phone=555499923786&text=Ol%C3%A1%2C+tenho+interesse+em+pe%C3%A7as+%C3%A0+pronta+entrega+da+C%C3%A1psula+Mondez.&type=phone_number&app_absent=0",
  },
  {
    label: "2. QUERO UM PROJETO SOB MEDIDA",
    href: "https://api.whatsapp.com/send/?phone=555499923786&text=Ol%C3%A1%2C+gostaria+de+iniciar+um+projeto+sob+medida+%28Alfaiataria+de+Interiores%29.&type=phone_number&app_absent=0",
  },
  {
    label: "3. ATENDIMENTO PARA ARQUITETOS",
    href: "https://api.whatsapp.com/send/?phone=555499923786&text=Ol%C3%A1%2C+sou+arquiteto%28a%29+e+gostaria+de+falar+com+o+atendimento+exclusivo+para+arquitetos.&type=phone_number&app_absent=0",
  },
];

export const Concierge = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="ABRIR"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-ink text-alabaster px-6 py-5 rounded-full shadow-2xl hover:bg-brass transition-colors duration-500 ease-luxury"
        aria-label="Abrir consultoria privada Mondez via WhatsApp"
      >
        <MessageCircle size={20} strokeWidth={1.4} />
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase hidden md:inline">Consultoria Privada</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-w-lg bg-white p-12 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-ink hover:text-brass transition-colors" aria-label="Fechar">
                <X size={20} strokeWidth={1.2} />
              </button>
              <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-4">— CONCIERGE</p>
              <h3 className="font-serif text-3xl text-ink mb-10 font-light leading-tight">Inicie sua Consultoria Privada.</h3>
              <div>
                {OPTIONS.map((o) => (
                  <a
                    key={o.label}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-5 border-b border-black/10 hover:border-brass hover:text-brass font-sans tracking-[0.2em] text-xs uppercase text-left transition-colors duration-500 ease-luxury"
                  >
                    {o.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
