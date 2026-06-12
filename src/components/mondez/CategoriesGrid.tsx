import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ease = [0.76, 0, 0.24, 1] as const;

const Icon = ({ d, size = 36 }: { d: React.ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {d}
  </svg>
);

const CATS = [
  {
    slug: "sofas",
    label: "Sofás",
    icon: (
      <>
        <path d="M8 36v12M56 36v12M12 36c0-4 2-6 6-6h28c4 0 6 2 6 6v8H12v-8Z" />
        <path d="M14 30v-8c0-3 2-5 5-5h26c3 0 5 2 5 5v8" />
      </>
    ),
  },
  {
    slug: "poltronas",
    label: "Poltronas",
    icon: (
      <>
        <path d="M14 32v-8c0-3 2-5 5-5h26c3 0 5 2 5 5v8" />
        <path d="M12 50v-12c0-4 2-6 6-6h28c4 0 6 2 6 6v12" />
        <path d="M14 50v6M50 50v6" />
      </>
    ),
  },
  {
    slug: "mesas",
    label: "Mesas de Jantar",
    icon: (
      <>
        <path d="M8 24h48" />
        <path d="M12 24v22M52 24v22" />
        <path d="M8 24l4-6h40l4 6" />
      </>
    ),
  },
  {
    slug: "mesas-centro",
    label: "Mesas de Centro",
    icon: (
      <>
        <ellipse cx="32" cy="26" rx="22" ry="6" />
        <path d="M14 28v18M50 28v18" />
        <path d="M14 46h36" />
      </>
    ),
  },
  {
    slug: "cadeiras",
    label: "Cadeiras",
    icon: (
      <>
        <path d="M20 8v28M44 8v28" />
        <path d="M16 36h32l-2 18M18 54l-2-18" />
        <path d="M20 22h24" />
      </>
    ),
  },
  {
    slug: "aparadores",
    label: "Aparadores",
    icon: (
      <>
        <rect x="8" y="20" width="48" height="22" />
        <path d="M8 30h48" />
        <path d="M14 42v8M50 42v8" />
        <path d="M22 25v3M42 25v3M22 35v3M42 35v3" />
      </>
    ),
  },
  {
    slug: "camas",
    label: "Camas",
    icon: (
      <>
        <path d="M6 32v18M58 32v18" />
        <path d="M6 44h52" />
        <path d="M10 32v-8c0-3 2-5 5-5h34c3 0 5 2 5 5v8" />
        <path d="M18 32v-4c0-2 1-3 3-3h8c2 0 3 1 3 3v4" />
        <path d="M34 32v-4c0-2 1-3 3-3h8c2 0 3 1 3 3v4" />
      </>
    ),
  },
  {
    slug: "estantes",
    label: "Estantes",
    icon: (
      <>
        <rect x="10" y="8" width="44" height="48" />
        <path d="M10 22h44M10 36h44" />
      </>
    ),
  },
  {
    slug: "buffets",
    label: "Buffets",
    icon: (
      <>
        <rect x="8" y="20" width="48" height="28" />
        <path d="M32 20v28" />
        <path d="M14 48v6M50 48v6" />
        <circle cx="22" cy="34" r="1" />
        <circle cx="42" cy="34" r="1" />
      </>
    ),
  },
  {
    slug: "iluminacao",
    label: "Iluminação",
    icon: (
      <>
        <path d="M32 6v8" />
        <path d="M18 30l14-16 14 16" />
        <path d="M22 30h20l-3 12H25l-3-12Z" />
        <path d="M28 46v8h8v-8" />
      </>
    ),
  },
  {
    slug: "tapetes",
    label: "Tapetes",
    icon: (
      <>
        <rect x="8" y="14" width="48" height="36" rx="2" />
        <path d="M8 22h48M8 42h48" />
        <path d="M16 14v36M48 14v36" />
      </>
    ),
  },
  {
    slug: "decoracao",
    label: "Decoração",
    icon: (
      <>
        <path d="M32 8c-6 6-10 12-10 18a10 10 0 0 0 20 0c0-6-4-12-10-18Z" />
        <path d="M28 56h8" />
        <path d="M32 36v20" />
      </>
    ),
  },
];

export const CategoriesGrid = () => {
  return (
    <section id="categorias" className="bg-[#FAF7F1] py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] tracking-[0.4em] text-[#8B6F3D] mb-5">— CATEGORIAS</p>
          <h2
            className="font-serif text-3xl md:text-4xl font-light text-ink"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            Explore por <span className="italic text-[#A38A58]">ambiente.</span>
          </h2>
        </div>

        {/* Grid com gap (sem divides) — fundo bege em cada quadrado */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-2.5">
          {CATS.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease, delay: (i % 6) * 0.04 }}
            >
              <Link
                to={`/produtos?categoria=${c.slug}`}
                className="group relative flex h-full flex-col items-center justify-center text-center px-3 py-5 md:py-10 bg-[#EFE3CC] hover:bg-[#1c1915] active:bg-[#1c1915] border border-ink/10 transition-colors duration-500 ease-luxury"
              >
                <div className="text-[#A38A58] group-hover:text-alabaster group-active:text-alabaster transition-colors duration-500 ease-luxury">
                  <Icon d={c.icon} size={28} />
                </div>
                <span className="mt-3 md:mt-4 font-sans text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-ink/80 group-hover:text-alabaster group-active:text-alabaster transition-colors duration-500 ease-luxury">
                  {c.label}
                </span>
                <span className="mt-2 md:mt-3 font-sans text-[8px] md:text-[9px] font-medium tracking-[0.3em] uppercase text-brass opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 hidden md:inline-block">
                  Ver coleção →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
