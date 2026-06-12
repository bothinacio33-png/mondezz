import { useEffect, useState, useCallback } from "react";

const KEY = "mondez:wishlist:v1";
const EVENT = "mondez:wishlist:change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Lê + permite adicionar/remover/toggle de IDs de produto. */
export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => read());

  useEffect(() => {
    const sync = () => setIds(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    const current = read();
    write(current.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { ids, count: ids.length, has, toggle, remove, clear };
}