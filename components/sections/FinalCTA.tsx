"use client";
import Button from "@/components/ui/Button";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

export default function FinalCTA() {
  const { openBooking } = useDemoBooking();

  return (
    <>
      {/* Thin green line */}
      <div className="h-px w-full bg-sx-accent/30" />

      <section
        id="demo"
        className="relative py-28 md:py-40 px-6 overflow-hidden"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,240,144,0.06), transparent)",
          }}
        />

        <div className="relative z-10 section-container text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-sx-cream leading-tight">
              <span className="text-sx-hot underline decoration-sx-hot">Хватит терять</span> клиентов и выручку
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <p className="text-3xl md:text-5xl font-heading font-bold text-sx-accent mt-4 leading-tight">
              Начните зарабатывать больше
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <p className="text-lg md:text-xl text-sx-secondary mt-6 max-w-2xl mx-auto">
              Пора начать зарабатывать больше на тех же обращениях. СЕРВЕКС работает 24/7, чтобы ни один клиент не ушёл без записи.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.25}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={openBooking}>
                Записаться на демо
              </Button>
              <Button variant="secondary" size="lg" href="https://t.me/ss_bizness">
                Написать в Telegram
              </Button>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.35}>
            <p className="mt-10 text-sx-muted text-sm">
              Запуск за 1 день · Без скрытых платежей · Бесплатная демонстрация
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
