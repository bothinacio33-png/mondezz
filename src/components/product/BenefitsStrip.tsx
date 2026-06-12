import { TreePine, ShieldCheck, Truck, Hammer } from "lucide-react";

interface Item {
  icon: typeof TreePine;
  title: string;
  subtitle: string;
}

const ITEMS: Item[] = [
  { icon: TreePine, title: "Eucalipto Maciço", subtitle: "Reflorestado FSC" },
  { icon: Hammer, title: "Feito à Mão", subtitle: "Marcenaria autoral" },
  { icon: ShieldCheck, title: "Garantia", subtitle: "365 dias Mondez" },
  { icon: Truck, title: "Entrega Dedicada", subtitle: "Logística própria" },
];

/**
 * Faixa de benefícios — 4 colunas com ícone de linha fina e dois textos.
 * Posicionar logo abaixo do hero, antes do dossiê.
 */
export const BenefitsStrip = () => {
  return (
    <section className="border-y border-ink/8 bg-background">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ink/[0.06] md:grid-cols-4">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <li
              key={it.title}
              className="flex flex-col items-center gap-3 bg-background px-6 py-10 text-center md:flex-row md:items-center md:gap-5 md:text-left md:px-10"
            >
              <Icon size={28} strokeWidth={1} className="text-brass" />
              <div>
                <p className="font-serif text-base font-light text-ink leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {it.title}
                </p>
                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.25em] text-ink/50">
                  {it.subtitle}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};