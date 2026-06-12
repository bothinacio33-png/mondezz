import { Ruler, Frame, Armchair, Palette, CheckCircle2, Truck, type LucideIcon } from "lucide-react";
import type { ManufacturingStep } from "@/lib/sanity";

interface Props {
  steps?: ManufacturingStep[];
}

const DEFAULT_STEPS: ManufacturingStep[] = [
  {
    title: "Projeto & Seleção",
    description: "Curadoria de matérias-primas e desenho técnico assinado por arquitetos parceiros.",
    icon: "ruler",
  },
  {
    title: "Estrutura",
    description: "Eucalipto reflorestado FSC, encaixes em cavilha e parafusos navais.",
    icon: "frame",
  },
  {
    title: "Estofamento",
    description: "Espuma D33 alta densidade, manta acrílica siliconada e tecidos premium.",
    icon: "armchair",
  },
  {
    title: "Personalização",
    description: "Acabamentos, tecidos e dimensões adaptados ao seu projeto.",
    icon: "palette",
  },
  {
    title: "Controle Final",
    description: "Inspeção peça-a-peça, embalagem reforçada e logística dedicada.",
    icon: "check",
  },
];

const ICONS: Record<NonNullable<ManufacturingStep["icon"]>, LucideIcon> = {
  ruler: Ruler,
  frame: Frame,
  armchair: Armchair,
  palette: Palette,
  check: CheckCircle2,
  truck: Truck,
};

export const ManufacturingGrid = ({ steps }: Props) => {
  const list = steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <section className="bg-ink text-alabaster">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="mb-14 max-w-3xl">
          <p className="font-sans text-[10px] tracking-[0.4em] text-brass">— FABRICAÇÃO</p>
          <h2
            className="mt-4 font-serif text-3xl md:text-5xl font-light leading-[1.1]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Cinco etapas <span className="italic text-brass">de obsessão.</span>
          </h2>
          <p className="mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-alabaster/60">
            Cada peça atravessa um processo rigoroso, do desenho à embalagem.
            Sem atalhos. Sem terceirizações invisíveis.
          </p>
        </div>

        <ol className="grid grid-cols-2 gap-px bg-alabaster/10 md:grid-cols-3 lg:grid-cols-5">
          {list.map((step, i) => {
            const Icon = ICONS[step.icon || "check"];
            return (
              <li
                key={step._key || `${i}-${step.title}`}
                className="group flex flex-col gap-5 bg-ink p-6 transition-colors hover:bg-ink/80 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-brass">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.2}
                    className="text-alabaster/70 transition-colors group-hover:text-brass"
                  />
                </div>
                <h3
                  className="font-serif text-xl font-light text-alabaster"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-xs font-light leading-relaxed text-alabaster/55">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
