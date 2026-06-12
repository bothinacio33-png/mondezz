import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";

interface Props {
  productId: string;
  productName: string;
  size?: number;
  className?: string;
}

/** Coração toggle de wishlist. Versão "ghost" sobre imagens. */
export const WishlistHeart = ({ productId, productName, size = 18, className = "" }: Props) => {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? `Remover ${productName} dos favoritos` : `Adicionar ${productName} aos favoritos`}
      aria-pressed={active}
      className={`group/heart inline-flex h-9 w-9 items-center justify-center bg-alabaster/80 backdrop-blur-sm transition-colors hover:bg-alabaster ${className}`}
    >
      <Heart
        size={size}
        strokeWidth={1.4}
        className={`transition-colors ${active ? "fill-brass text-brass" : "text-ink/70 group-hover/heart:text-brass"}`}
      />
    </button>
  );
};