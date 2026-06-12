import { useEffect } from "react";

export const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch/mobile — native scrolling is faster and avoids long RAF tasks.
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    // Respect reduced-motion preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let rafId = 0;
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null;

    // Lenis is dynamically imported so it never blocks initial JS parse.
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenisInstance = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);
  return null;
};
