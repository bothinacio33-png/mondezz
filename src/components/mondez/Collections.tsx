import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import capsula from "@/assets/imgur/capsula.webp";
import alfaiataria from "@/assets/collection-alfaiataria.webp";

const ease = [0.76, 0, 0.24, 1] as const;

const ITEMS = [
  {
    tag: "Cápsula",
    index: "/ 01",
    title: "Pronta Entrega",
    desc: "Mesas, sofás e cadeiras assinadas. O luxo sem espera.",
    img: capsula,
    alt: "Mesa de jantar de alto padrão com cadeiras de design autoral à pronta entrega em Caxias do Sul",
    href: "/produtos",
    internal: true,
    cta: "Ver catálogo",
    offset: "",
  },
  {
    tag: "Alfaiataria",
    index: "/ 02",
    title: "Projetos Sob Medida",
    desc: "Execução perfeita para o seu ambiente.",
    img: alfaiataria,
    alt: "Sofá modular sob medida em sala de estar de alto padrão na Serra Gaúcha",
    href: "https://api.whatsapp.com/send/?phone=555499923786&text=Ol%C3%A1%2C+gostaria+de+iniciar+um+projeto+sob+medida+%28Alfaiataria+de+Interiores%29.&type=phone_number&app_absent=0",
    internal: false,
    cta: "Iniciar projeto",
    offset: "md:mt-32",
  },
];

export const Collections = () => {
  return (
    <section id="colecoes" className="bg-white py-32 px-6 md:px-24">
      <div className="mb-16 max-w-7xl mx-auto md:flex md:items-end md:justify-between md:gap-12">
        <div className="md:max-w-3xl">
          <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-6">— AS COLEÇÕES</p>
          <h2
            className="font-serif text-4xl md:text-6xl font-light leading-[1.1] text-[#111111]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Duas formas <span className="italic text-[#A38A58]">de luxo.</span>
          </h2>
          <p className="mt-8 max-w-sm font-sans text-sm font-light leading-relaxed text-[#111111]/60 md:hidden">
            Da curadoria imediata à alfaiataria autoral. Cada peça é uma decisão deliberada contra o ordinário.
          </p>
        </div>
        <p className="hidden md:block max-w-sm font-sans text-sm font-light leading-relaxed text-[#111111]/60 text-right">
          Da curadoria imediata à alfaiataria autoral. Cada peça é uma decisão deliberada contra o ordinário.
        </p>
      </div>

      <article className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {ITEMS.map((it, i) => {
          const commonProps = {
            "data-cursor": "hover",
            className: `group relative block w-full overflow-hidden ${it.offset}`,
          };
          const inner = (
            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
              <img
                src={it.img}
                alt={it.alt}
                width={1400}
                height={1750}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover will-change-transform transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between p-6 md:p-8">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">{it.tag}</span>
                <span className="font-sans text-[10px] tracking-[0.3em] text-white/70">{it.index}</span>
              </div>
              <div className="absolute bottom-0 left-0 z-20 w-full p-6 md:p-10">
                <h3
                  className="font-serif text-3xl font-light text-white md:text-5xl"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {it.title}
                </h3>
                <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-white/80">{it.desc}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#A38A58]">{it.cta}</span>
                  <span className="block h-[1px] w-10 bg-[#A38A58] transition-all duration-700 group-hover:w-20" />
                </div>
              </div>
            </div>
          );

          const motionProps = {
            initial: { y: 80, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 1.2, ease, delay: i * 0.15 },
          };

          if (it.internal) {
            return (
              <motion.div key={it.tag} {...motionProps} {...commonProps}>
                <Link to={it.href} className="block" data-cursor="hover">
                  {inner}
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.a
              key={it.tag}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              {...motionProps}
              {...commonProps}
            >
              {inner}
            </motion.a>
          );
        })}
      </article>
    </section>
  );
};
