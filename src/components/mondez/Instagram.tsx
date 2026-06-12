import { Instagram as IGIcon } from "lucide-react";
import { motion } from "framer-motion";
import ig1 from "@/assets/imgur/ig1.webp";
import ig2 from "@/assets/imgur/ig2.webp";
import ig3 from "@/assets/imgur/ig3.webp";
import ig4 from "@/assets/imgur/ig4.webp";

const ease = [0.76, 0, 0.24, 1] as const;

const TILES = [
  { src: ig1, alt: "Detalhe de cadeira de jantar em madeira maciça" },
  { src: ig2, alt: "Mesa lateral em mármore com base em latão" },
  { src: ig3, alt: "Detalhe de poltrona em bouclé bege" },
  { src: ig4, alt: "Sala de jantar com luminária escultural" },
];

export const InstagramShowcase = () => {
  return (
    <section className="py-24 px-6 md:px-24" style={{ backgroundColor: "#1c1915" }}>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-6">— SOCIAL</p>
          <h2
            className="font-serif text-3xl font-light leading-[1.1] text-alabaster md:text-6xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Nosso Manifesto <span className="italic">Visual.</span>
          </h2>
        </div>
        <a
          href="https://instagram.com/mondezmobiliario"
          target="_blank" rel="noopener noreferrer"
          className="font-sans text-sm tracking-[0.2em] uppercase text-brass hover:text-alabaster transition-colors duration-500 ease-luxury"
        >
          @mondezmobiliario →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TILES.map((t, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/mondezmobiliario"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease, delay: i * 0.15 }}
            className="group relative aspect-square overflow-hidden"
          >
            <motion.img
              src={t.src}
              alt={t.alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease, delay: i * 0.15 }}
              className="absolute inset-0 h-full w-full object-cover will-change-transform transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500 ease-luxury flex items-center justify-center">
              <IGIcon size={32} strokeWidth={1.2} className="text-alabaster opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
