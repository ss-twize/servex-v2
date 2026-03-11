"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

/*
  Animation stages:
  0 — Big orb centered on full-screen black overlay. Nothing else visible.       (0–2.0s)
  1 — Overlay fades out, orb shrinks+fades with it.                              (2.0–2.8s)
  2 — Layout orb appears in final position (right), text slides in, header shows. (2.8s+)
*/

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Signal header
  useEffect(() => {
    document.documentElement.setAttribute("data-hero-stage", String(stage));
  }, [stage]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00F090" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sx-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Full-screen overlay (stages 0–1) ── */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-sx-deep"
            initial={{ opacity: 1 }}
            animate={stage === 1 ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              style={{ overflow: "visible" }}
              initial={{ width: "min(80vw, 80vh)", height: "min(80vw, 80vh)", scale: 1 }}
              animate={
                stage === 1
                  ? { scale: 0.6, width: "min(80vw, 80vh)", height: "min(80vw, 80vh)" }
                  : { scale: 1,   width: "min(80vw, 80vh)", height: "min(80vw, 80vh)" }
              }
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="absolute inset-0 -m-16 bg-[radial-gradient(circle,rgba(0,240,144,0.14),transparent_70%)] blur-3xl pointer-events-none" />
              <HeroOrb className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Final hero layout (stage 2) ── */}
      <div className="flex-1 flex items-center justify-center w-full px-6">
        <div className="w-full max-w-[1300px] flex items-center justify-between gap-8">

          {/* TEXT — left */}
          <motion.div
            className="relative z-10 max-w-[56%]"
            initial={{ opacity: 0, x: -40 }}
            animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pill badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-sx-accent/10 border border-sx-accent/25 rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sx-accent animate-pulse" />
              <span className="font-heading text-sx-accent text-xs font-semibold tracking-wider uppercase">
                Работает 24/7
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-[62px] font-extrabold text-sx-cream leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              ИИ-администратор,{" "}
              <span
                className="text-sx-accent"
                style={{ textShadow: "0 0 40px rgba(0,240,144,0.28)" }}
              >
                который отвечает
              </span>{" "}
              клиентам и записывает их на услуги
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-sx-secondary mt-6 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              Отвечает на звонки и сообщения, записывает клиентов в CRM и работает вместо администратора — без пропущенных обращений.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button size="lg" variant="primary" onClick={openBooking}>
                Получить демо
              </Button>
              <Button size="lg" variant="secondary" href="https://t.me/ss_bizness">
                Задать вопрос
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-sx-muted"
              initial={{ opacity: 0 }}
              animate={stage >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.48 }}
            >
              {["Telegram и WhatsApp", "Интеграция с YClients", "Запуск за 1 день"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sx-accent" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ORB — right */}
          <motion.div
            className="relative z-0 hidden md:block"
            style={{
              width: "clamp(360px, 44vw, 600px)",
              height: "clamp(360px, 44vw, 600px)",
              overflow: "visible",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle,rgba(0,240,144,0.1),transparent_70%)] blur-2xl" />
            <HeroOrb className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
