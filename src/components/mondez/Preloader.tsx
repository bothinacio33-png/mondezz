import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    // Hide as soon as the page is ready; cap at 900ms so it never blocks LCP/INP.
    const hide = () => setShow(false);
    const t = window.setTimeout(hide, 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-light tracking-[0.3em] text-[#F4F3EF]"
            style={{ fontFamily: '"Playfair Display", serif' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MONDEZ
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
