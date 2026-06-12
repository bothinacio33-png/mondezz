import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Garante que toda navegação entre rotas role para o topo da página.
 * Coloque dentro do <BrowserRouter> antes das <Routes>.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Tenta usar smooth, mas faz fallback para "auto" se necessário
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
