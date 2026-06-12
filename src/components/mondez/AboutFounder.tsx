import { motion } from "framer-motion";
import { Play } from "lucide-react";
import founderImg from "@/assets/collection-alfaiataria.webp";

const ease = [0.76, 0, 0.24, 1] as const;

export const AboutFounder = () => {
  return (
    <section
      id="sobre"
      className="text-alabaster py-16 md:py-28 px-6 md:px-16"
      style={{ backgroundColor: "#1c1915" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          {/* Vídeo / Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="md:col-span-6 relative"
          >
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden bg-black"
            >
              <img
                src={founderImg}
                alt="Showroom Mondez Mobiliário em Caxias do Sul"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-alabaster/95 text-ink shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-luxury">
                  <Play size={18} strokeWidth={1.3} fill="currentColor" />
                </span>
              </div>
              <span className="absolute bottom-4 left-5 font-sans text-[9px] tracking-[0.3em] uppercase text-alabaster/80">
                Assista · 2 min
              </span>
            </a>
          </motion.div>

          {/* Coluna texto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="md:col-span-6"
          >
            <p className="font-sans text-[10px] tracking-[0.45em] text-brass mb-4">
              — ESSÊNCIA
            </p>
            <h2
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-alabaster"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
            >
              Mobiliário que <span className="italic text-brass">eleva</span> cada ambiente.
            </h2>

            <p className="mt-6 md:mt-8 font-sans text-sm md:text-[15px] leading-relaxed text-alabaster/75 max-w-md">
              Há mais de uma década, na Serra Gaúcha, criamos peças autorais
              com curadoria refinada, fabricação local e atendimento
              consultivo — para projetos que merecem permanência.
            </p>

            <a
              href="https://api.whatsapp.com/send/?phone=555499923786&text=Ol%C3%A1%2C+gostaria+de+conhecer+a+Mondez+Mobili%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-brass text-brass hover:bg-brass hover:text-ink px-6 py-3.5 font-sans text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ease-luxury"
            >
              Conheça nossa história
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
