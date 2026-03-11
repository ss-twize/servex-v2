"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PageWatermark() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -200]);

  return (
    <motion.div
      style={{ y }}
      className="fixed top-[20vh] left-0 w-full pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden
    >
      <span
        className="font-heading font-black text-[20vw] leading-none tracking-tighter text-sx-cream whitespace-nowrap"
        style={{ opacity: 0.012 }}
      >
        СЕРВЕКС
      </span>
    </motion.div>
  );
}
