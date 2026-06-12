import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

const REVIEWS = [
  { text: "Atendimento impecável do início ao fim. O sofá sob medida superou todas as expectativas do nosso escritório.", author: "Arq. Camila M." },
  { text: "As cadeiras à pronta entrega salvaram nosso jantar. Design premium e qualidade indiscutível.", author: "João P." },
  { text: "A Mondez não vende móveis, entrega uma experiência. Peças fantásticas.", author: "Mariana S." },
  { text: "Atendimento impecável do início ao fim. O sofá sob medida superou todas as expectativas do nosso escritório.", author: "Arq. Camila M." },
  { text: "As cadeiras à pronta entrega salvaram nosso jantar. Design premium e qualidade indiscutível.", author: "João P." },
  { text: "A Mondez não vende móveis, entrega uma experiência. Peças fantásticas.", author: "Mariana S." },
];

export const Heritage = () => {
  return (
    <section className="relative overflow-hidden bg-ink text-alabaster py-32">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease }}
        className="px-6 md:px-24"
      >
        <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-6 text-center">— A HERANÇA</p>
        <h2
          className="mx-auto mb-16 max-w-4xl text-center font-serif text-3xl font-light leading-[1.1] text-[#F4F3EF] md:mb-20 md:text-6xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          A confiança da <span className="italic text-[#A38A58]">Av. Itália, 417.</span>
        </h2>
      </motion.div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent md:w-48" />
        <div className="flex gap-8 animate-marquee w-max">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="flex min-w-[300px] max-w-[400px] flex-col justify-between border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:min-w-[400px] md:p-10"
            >
              <div className="mb-8 flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} fill="#A38A58" stroke="#A38A58" strokeWidth={1} />
                ))}
              </div>
              <p
                className="mb-10 font-serif text-xl font-light leading-relaxed text-[#F4F3EF] md:text-2xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                “{r.text}”
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">{r.author}</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#A38A58]">Google</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
