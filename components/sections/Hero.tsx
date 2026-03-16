"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

/*
  Stages:
  0 — full-screen overlay, "СЕРВЕКС" fades in centered            (0–1.8s)
  1 — overlay + text fade out                                      (1.8–2.6s)
  2 — hero content appears                                         (2.6s+)
*/

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1800);
    const t2 = setTimeout(() => setStage(2), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sx-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Intro overlay: "СЕРВЕКС" splash ── */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-sx-deep"
            initial={{ opacity: 1 }}
            animate={stage === 1 ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Radial glow behind text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[300px] bg-sx-accent/8 rounded-full blur-[100px]" />
            </div>

            <motion.div
              className="relative flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={stage === 0
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.05 }
              }
              transition={stage === 0
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.6, ease: "easeIn" }
              }
            >
              <span
                className="font-heading font-extrabold text-sx-accent select-none"
                style={{
                  fontSize: "clamp(56px, 12vw, 120px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  textShadow: "0 0 80px rgba(0,240,144,0.35), 0 0 160px rgba(0,240,144,0.15)",
                }}
              >
                СЕРВЕКС
              </span>
              {/* Thin underline accent */}
              <motion.div
                className="h-0.5 bg-sx-accent rounded-full"
                initial={{ width: 0 }}
                animate={stage === 0 ? { width: "100%" } : { width: "100%" }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                style={{ boxShadow: "0 0 12px rgba(0,240,144,0.5)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero content (stage 2) ── */}
      <div className="flex-1 flex items-center justify-center w-full px-6">
        <div className="w-full max-w-[860px] flex flex-col items-center text-center">

          {/* Pill badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-sx-accent/10 border border-sx-accent/25 rounded-full px-4 py-1.5 mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sx-accent animate-pulse" />
            <span className="font-heading text-sx-accent text-xs font-semibold tracking-wider uppercase">
              Работает 24/7
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-[66px] font-extrabold text-sx-cream leading-[1.06] tracking-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            ИИ—Менеджер{" "}
            <span
              className="text-sx-accent"
              style={{ textShadow: "0 0 40px rgba(0,240,144,0.28)" }}
            >
              для бизнеса услуг:
            </span>{" "}
            клиентам и записывает их на услуги
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-sx-secondary mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            Мгновенно ответит на все обращения и доведет клиента до записи.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button size="lg" variant="primary" onClick={openBooking}>
              Получить демо
            </Button>
            <Button size="lg" variant="secondary" href="https://t.me/ss_bizness">
              Задать вопрос
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-sx-muted"
            initial={{ opacity: 0 }}
            animate={stage >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {["Telegram и WhatsApp", "Интеграция с YClients", "Запуск за 1 день"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sx-accent" />
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.64 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
