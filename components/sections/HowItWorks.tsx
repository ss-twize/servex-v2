"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Демонстрация",
    desc: "Показываем работу системы на реальном примере вашего бизнеса — за 30 минут.",
  },
  {
    number: "02",
    title: "Настройка",
    desc: "Настраиваем под ваши услуги, расписание и стиль общения с клиентами.",
  },
  {
    number: "03",
    title: "Запуск",
    desc: "Подключаем каналы — и система начинает работать. Запуск от 1 дня.",
  },
];

export default function HowItWorks() {
  return (
    <section id="launch" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sx-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center mb-4">
            Процесс подключения
          </h2>
          <p className="text-sx-secondary text-center text-lg max-w-md mx-auto">
            Три шага — и СЕРВЕКС уже работает вместо администратора.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[25%] right-[25%] h-px border-t border-dashed border-sx-accent/20" />

          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 0.12}>
              <div className="bg-sx-card border border-sx-border/60 rounded-2xl p-8 text-center group hover:border-sx-accent/30 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center">
                <div className="font-heading text-[52px] font-extrabold text-sx-accent leading-none mb-6"
                  style={{ textShadow: "0 0 30px rgba(0,240,144,0.2)" }}>
                  {step.number}
                </div>
                <h3 className="font-heading font-bold text-sx-cream text-lg mb-3">{step.title}</h3>
                <p className="text-sx-secondary text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
