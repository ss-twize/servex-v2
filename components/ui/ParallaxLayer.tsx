"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  speed?: number; // 0.3 = slow background, 0.6 = mid, 1 = normal
  className?: string;
};

export default function ParallaxLayer({ children, speed = 0.5, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${(1 - speed) * 30}%`]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
