import { Star } from "lucide-react";
import type { RatingDistribution, Review } from "@/lib/sanity";

interface Props {
  average?: number;
  count?: number;
  distribution?: RatingDistribution;
  reviews?: Review[];
}

const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${value} de 5 estrelas`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        strokeWidth={1.2}
        className={
          i < Math.round(value)
            ? "fill-amber-400 text-amber-400"
            : "fill-neutral-200 text-neutral-200"
        }
      />
    ))}
  </div>
);

export const ProductReviews = ({ average, count, distribution, reviews }: Props) => {
  const avg = Math.max(0, Math.min(5, average ?? 0));
  const total =
    count ??
    (distribution
      ? (distribution.five ?? 0) +
        (distribution.four ?? 0) +
        (distribution.three ?? 0) +
        (distribution.two ?? 0) +
        (distribution.one ?? 0)
      : reviews?.length ?? 0);

  const dist = distribution ?? { five: 0, four: 0, three: 0, two: 0, one: 0 };
  const bars = [
    { label: 5, n: dist.five ?? 0 },
    { label: 4, n: dist.four ?? 0 },
    { label: 3, n: dist.three ?? 0 },
    { label: 2, n: dist.two ?? 0 },
    { label: 1, n: dist.one ?? 0 },
  ];
  const max = Math.max(1, ...bars.map((b) => b.n));

  if (!total && !reviews?.length) return null;

  return (
    <section className="border border-neutral-200 bg-white">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-6 md:p-10 border-b border-neutral-200">
        {/* Lado esquerdo: nota grande */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl text-neutral-900" style={{ fontFamily: '"Playfair Display", serif' }}>
              {avg.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-neutral-400 text-sm">/ 5</span>
          </div>
          <div className="mt-2">
            <Stars value={avg} size={18} />
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
            {total} {total === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>

        {/* Lado direito: barras */}
        <div className="space-y-2">
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-3 text-sm">
              <span className="w-4 text-neutral-700 tabular-nums">{b.label}</span>
              <Star size={12} strokeWidth={1.2} className="fill-amber-400 text-amber-400" />
              <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{ width: `${(b.n / max) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-neutral-500 tabular-nums">{b.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de reviews */}
      {reviews && reviews.length > 0 && (
        <ul className="divide-y divide-neutral-200">
          {reviews.map((r, idx) => (
            <li key={r._key ?? idx} className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <Stars value={r.rating ?? 5} />
                  {r.title && (
                    <h4 className="mt-2 font-medium text-neutral-900">{r.title}</h4>
                  )}
                </div>
                {r.date && (
                  <time className="text-xs text-neutral-400 tabular-nums">
                    {new Date(r.date).toLocaleDateString("pt-BR")}
                  </time>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {r.comment}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
                — {r.author}
                {r.location ? ` · ${r.location}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
