import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TEXT = "Nós não preenchemos espaços. Nós esculpimos atmosferas. Da peça autoral à pronta entrega ao projeto de alfaiataria sob medida, a Mondez é o destino final de quem recusa o comum.";

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block">{word}</motion.span>;
};

export const Manifesto = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} className="bg-background py-40 px-6 md:px-32 flex flex-col items-center justify-center text-center">
      <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-12">— MANIFESTO</p>
      <h2 className="font-serif text-2xl md:text-5xl text-ink leading-[1.25] max-w-5xl flex flex-wrap justify-center gap-x-3 gap-y-2 font-light">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return <Word key={i} word={w} progress={scrollYProgress} range={[start, end]} />;
        })}
      </h2>
    </section>
  );
};
