"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        ringRef.current?.classList.add("!border-white", "scale-125");
        ringRef.current?.querySelector("span")?.classList.add("!bg-white");
      }
    };
    const onMouseOut = () => {
      ringRef.current?.classList.remove("!border-white", "scale-125");
      ringRef.current?.querySelector("span")?.classList.remove("!bg-white");
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sx-accent pointer-events-none z-[10000] transition-[border-color,width,height] duration-200 flex items-center justify-center mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      {/* Dot — static center of ring, no independent tracking */}
      <span className="w-[5px] h-[5px] rounded-full bg-sx-accent block transition-colors duration-200" />
    </div>
  );
}
