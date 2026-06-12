import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: ReactNode;
}

interface Props {
  sections: Section[];
  defaultOpen?: string | null | "all";
}

/**
 * Accordion luxuoso. Renderiza apenas as seções recebidas — o componente
 * pai deve filtrar campos vazios antes de passar.
 * Passe defaultOpen="all" para iniciar com todas abertas.
 */
export const ProductAccordion = ({ sections, defaultOpen }: Props) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpen === "all") return sections.map((section) => section.id);
    if (defaultOpen === null) return [];
    return [defaultOpen ?? sections[0]?.id].filter(Boolean) as string[];
  });

  if (sections.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {sections.map((s) => {
        const isOpen = openIds.includes(s.id);
        return (
          <div key={s.id} className="overflow-hidden rounded-[4px] border border-[#EAEAEA] bg-white transition-colors hover:border-[#C9C4B8]">
            <button
              onClick={() =>
                setOpenIds((current) =>
                  current.includes(s.id) ? current.filter((id) => id !== s.id) : [...current, s.id]
                )
              }
              data-cursor="hover"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 bg-white px-5 py-5 text-left transition-colors hover:text-brass md:px-6"
            >
              <span className="flex min-w-0 items-center gap-3 product-title text-[20px] text-ink">
                <span className="text-brass text-[20px] leading-none" aria-hidden="true">✦</span>
                <span className="min-w-0 break-words">{s.title}</span>
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}>
                {isOpen ? <Minus size={16} strokeWidth={1.2} /> : <Plus size={16} strokeWidth={1.2} />}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden bg-white"
                >
                  <div className="px-5 pb-6 font-sans text-sm font-light leading-relaxed text-ink/80 md:px-6">
                    {s.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
