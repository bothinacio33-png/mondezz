import { motion } from "framer-motion";
import { SiteHeader } from "./SiteHeader";
import heroAsset from "@/assets/hero-sofa.png.asset.json";

const TITLE_LINE_1 = ["O", "silêncio"];
const TITLE_LINE_2 = ["do", "bom", "design"];

export const Hero = () => {
  const ease = [0.76, 0, 0.24, 1] as const;

  const fadeUp = (delay: number) => ({
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.05, ease, delay } },
  });

  const wordWrap = (delay: number) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: delay } },
  });
  const wordItem = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 1.0, ease } },
  };

  return (
    <section className="relative w-full overflow-hidden text-alabaster">
      <div className="absolute inset-x-0 top-0 z-30">
        <SiteHeader variant="transparent" />
      </div>

      {/* Banner */}
      <img
        src={heroAsset.url}
        alt="Sala de estar com sofá curvo Mondez e vista para vinhedos"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Degradê preto esmaecendo de baixo para cima */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 28%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.18) 80%, rgba(0,0,0,0.02) 100%)",
        }}
      />
      {/* Camada extra de escurecimento + leve desfoque no meio para legibilidade */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Index lateral fixo (somente desktop) */}
      <div className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
        <div className="flex flex-col items-center gap-5">
          <span className="block h-12 w-px bg-[#E2C893]/50" />
          <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-[#E2C893]/70 [writing-mode:vertical-rl] rotate-180">
            Est · MMXIV
          </span>
          <span className="block h-12 w-px bg-[#E2C893]/50" />
        </div>
      </div>

      {/* Layout principal — centralizado */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:px-14 md:pt-32 lg:px-24">
        {/* Eyebrow no topo */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="show"
          className="flex w-full max-w-3xl flex-col items-center gap-3"
        >
          <p className="font-sans text-[11px] md:text-[13px] font-semibold tracking-[0.55em] uppercase text-[#E2C893]">
            Mondez
          </p>
          <span className="font-serif text-base md:text-xl font-light tracking-wide text-alabaster/80" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            Projetos sob medida e mobiliário à pronta entrega
          </span>
        </motion.div>

        {/* Centro: título grande */}
        <div className="mt-10 flex w-full max-w-5xl flex-col items-center md:mt-12">
          <motion.h1
            variants={wordWrap(0.4)}
            initial="hidden"
            animate="show"
            className="font-serif font-medium text-alabaster leading-[0.98] drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            <span className="block text-[clamp(2.8rem,9vw,7.5rem)]">
              {TITLE_LINE_1.map((w, i) => (
                <span key={`a-${i}`} className="mr-3 md:mr-6 inline-block overflow-hidden align-bottom last:mr-0">
                  <motion.span variants={wordItem} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="mt-1 block text-[clamp(2.8rem,9vw,7.5rem)] text-alabaster">
              {TITLE_LINE_2.map((w, i) => (
                <span key={`b-${i}`} className="mr-3 md:mr-6 inline-block overflow-hidden align-bottom last:mr-0">
                  <motion.span variants={wordItem} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          {/* Localização sob o título */}
          <motion.div
            variants={fadeUp(1.4)}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col items-center gap-5"
          >
            <span className="block h-px w-16 bg-[#E2C893]/60" />
            <span className="font-sans text-[10px] md:text-[12px] font-medium tracking-[0.45em] uppercase text-alabaster/65">
              Caxias do Sul · Serra Gaúcha · RS
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
