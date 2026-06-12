import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

const REVIEWS = [
  {
    name: "Carolina M.",
    location: "Caxias do Sul, RS",
    text:
      "Atendimento impecável e peças de uma qualidade rara. Mobiliei toda a sala de jantar e o resultado superou as expectativas.",
  },
  {
    name: "Rafael S.",
    location: "Porto Alegre, RS",
    text:
      "Comprei um sofá sob medida e o acompanhamento do projeto foi cirúrgico. A entrega chegou no prazo, perfeita.",
  },
  {
    name: "Marina A.",
    location: "Florianópolis, SC",
    text:
      "Curadoria que se nota. Cada peça carrega história. Já indiquei a Mondez para três projetos do meu escritório.",
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-[#FAF7F1] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-5">— DEPOIMENTOS</p>
          <h2
            className="font-serif text-3xl md:text-5xl font-light text-ink"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Quem mobilia <span className="italic text-[#A38A58]">com a Mondez.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="bg-white p-8 md:p-10 rounded-[10px] border border-ink/5 shadow-[0_2px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="flex gap-1 mb-5 text-[#A38A58]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-serif text-base md:text-lg text-ink/80 leading-relaxed font-light italic">
                “{r.text}”
              </p>
              <div className="mt-7 pt-5 border-t border-ink/10">
                <p className="font-sans text-sm text-ink">{r.name}</p>
                <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-ink/50 mt-1">
                  {r.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
