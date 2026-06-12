import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ScrollToTop } from "./components/mondez/ScrollToTop";

const ProductPage = lazy(() => import("./pages/Produto.tsx"));
const CatalogPage = lazy(() => import("./pages/Produtos.tsx"));
const AdminPage = lazy(() => import("./pages/Admin.tsx"));
const FavoritosPage = lazy(() => import("./pages/Favoritos.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/produtos"
              element={
                <Suspense fallback={null}>
                  <CatalogPage />
                </Suspense>
              }
            />
            <Route
              path="/favoritos"
              element={
                <Suspense fallback={null}>
                  <FavoritosPage />
                </Suspense>
              }
            />
            <Route
              path="/produto/:slug"
              element={
                <Suspense fallback={null}>
                  <ProductPage />
                </Suspense>
              }
            />
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={null}>
                  <AdminPage />
                </Suspense>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
