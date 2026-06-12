import { Truck, CreditCard, ShieldCheck, Wallet } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Frete grátis*", sub: "Para o Sul e Sudeste" },
  { icon: CreditCard, title: "Até 10x sem juros", sub: "Em todas as peças" },
  { icon: Wallet, title: "5% OFF no Pix", sub: "Desconto à vista" },
  { icon: ShieldCheck, title: "Garantia 365 dias", sub: "Contra defeitos de fabricação" },
];

export const BenefitsStrip = () => {
  return (
    <section className="bg-[#3D2C1F] border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex items-center gap-4 px-5 py-6 md:px-8 md:py-7">
              <div className="shrink-0 text-[#A38A58]">
                <Icon size={26} strokeWidth={1.2} />
              </div>
              <div className="leading-tight">
                <p className="font-serif text-[15px] md:text-base text-white" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  {it.title}
                </p>
                <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/70 mt-1">
                  {it.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
