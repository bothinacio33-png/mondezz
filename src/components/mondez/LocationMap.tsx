import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

export const LocationMap = () => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // carrega 300px antes do mapa aparecer
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="showroom" ref={sectionRef} className="bg-white px-6 py-24 md:px-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-12 md:flex-row md:gap-20">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="flex flex-1 flex-col justify-center"
        >
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.4em] text-[#A38A58]">— Showroom</p>
          <h2
            className="mb-6 font-serif text-4xl font-light leading-[1.1] text-[#111111] md:text-6xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Visite nosso <span className="italic text-[#A38A58]">Showroom.</span>
          </h2>
          <p className="mb-2 font-sans text-base font-light leading-relaxed text-[#111111]/70 md:text-lg">
            Av. Itália, 417 — São Pelegrino
          </p>
          <p className="mb-10 font-sans text-base font-light leading-relaxed text-[#111111]/70 md:text-lg">
            Caxias do Sul, RS
          </p>

          <div className="mb-10 grid grid-cols-2 gap-6 border-y border-black/10 py-6">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#A38A58]">Atendimento</p>
              <p className="mt-2 font-sans text-sm font-light text-[#111111]/70">Seg — Sex · 09h às 18h</p>
            </div>
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#A38A58]">Privê</p>
              <p className="mt-2 font-sans text-sm font-light text-[#111111]/70">Sábados sob agendamento</p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Av.+It%C3%A1lia,+417+-+S%C3%A3o+Pelegrino,+Caxias+do+Sul+-+RS"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group inline-flex w-fit items-center gap-3 border border-[#111111] px-8 py-4 font-sans text-[10px] uppercase tracking-[0.3em] text-[#111111] transition-colors duration-300 hover:bg-[#111111] hover:text-[#F4F3EF]"
          >
            Ver no Google Maps
            <ArrowUpRight size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
          className="relative flex-1"
        >
          <div className="relative h-[400px] w-full overflow-hidden bg-[#F4F3EF] md:h-[560px]">
            {shouldLoadIframe ? (
              <iframe
                title="Mondez Mobiliário — Av. Itália, 417, Caxias do Sul"
                src="https://www.google.com/maps?q=Av.+It%C3%A1lia,+417+-+S%C3%A3o+Pelegrino,+Caxias+do+Sul+-+RS&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: "saturate(0.55) contrast(1.02) brightness(1.02)" }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                Carregando mapa...
              </div>
            )}
            <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2 bg-[#111111] px-4 py-2">
              <MapPin size={12} strokeWidth={2} stroke="#A38A58" />
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#F4F3EF]">Caxias do Sul · RS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
