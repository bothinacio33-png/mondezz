import { lazy, Suspense } from "react";
import { Hero } from "@/components/mondez/Hero";

const SmoothScroll = lazy(() => import("@/components/mondez/SmoothScroll").then((m) => ({ default: m.SmoothScroll })));
const BenefitsStrip = lazy(() => import("@/components/mondez/BenefitsStrip").then((m) => ({ default: m.BenefitsStrip })));
const AboutFounder = lazy(() => import("@/components/mondez/AboutFounder").then((m) => ({ default: m.AboutFounder })));
const CategoriesGrid = lazy(() => import("@/components/mondez/CategoriesGrid").then((m) => ({ default: m.CategoriesGrid })));
const CategoryShelves = lazy(() => import("@/components/mondez/CategoryShelves").then((m) => ({ default: m.CategoryShelves })));
const Testimonials = lazy(() => import("@/components/mondez/Testimonials").then((m) => ({ default: m.Testimonials })));
const InstagramShowcase = lazy(() => import("@/components/mondez/Instagram").then((m) => ({ default: m.InstagramShowcase })));
const LocationMap = lazy(() => import("@/components/mondez/LocationMap").then((m) => ({ default: m.LocationMap })));
const Concierge = lazy(() => import("@/components/mondez/Concierge").then((m) => ({ default: m.Concierge })));
const Footer = lazy(() => import("@/components/mondez/Footer").then((m) => ({ default: m.Footer })));

const Index = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <SmoothScroll />
      </Suspense>
      <div className="grain-overlay" aria-hidden />
      <main className="bg-background text-ink overflow-hidden">
        <Hero />
        <Suspense fallback={<div />}>
          <BenefitsStrip />
          <AboutFounder />
          <CategoriesGrid />
          <CategoryShelves />
          <Testimonials />
          <InstagramShowcase />
          <LocationMap />
          <Footer />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Concierge />
      </Suspense>
    </div>
  );
};

export default Index;
