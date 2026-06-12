import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface Params {
  name: string;
  price?: number;
  contentId?: string;
}

/**
 * Dispara Meta Pixel ViewContent assim que o produto carrega.
 * O snippet base do Pixel já está em index.html (id 908592850138695).
 */
export function useViewContent({ name, price, contentId }: Params) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    window.fbq("track", "ViewContent", {
      content_name: name,
      content_type: "product",
      content_ids: contentId ? [contentId] : undefined,
      value: price,
      currency: "BRL",
    });
  }, [name, price, contentId]);
}
