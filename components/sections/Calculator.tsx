"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Calculator() {
  return (
    <section id="calculator" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,240,144,0.04), transparent)" }} />

      <div className="section-container relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Сколько денег бизнес теряет без системы
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-secondary text-center mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Каждое пропущенное сообщение — это потенциальный потерянный клиент.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Left — Без СЕРВЕКС */}
          <AnimateOnScroll delay={0.1}>
            <div className="bg-sx-card border border-sx-hot/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-sx-hot" />
                <h3 className="font-heading text-lg font-bold text-sx-cream">Без СЕРВЕКС</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-sx-hot text-lg shrink-0 mt-0.5">✗</span>
                  <span className="text-sx-secondary">Пропущенные обращения клиентов</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sx-hot text-lg shrink-0 mt-0.5">✗</span>
                  <span className="text-sx-secondary">Потерянные записи и пустые окна</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sx-hot text-lg shrink-0 mt-0.5">✗</span>
                  <span className="text-sx-secondary">Зависимость от человеческого фактора</span>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Right — С СЕРВЕКС */}
          <AnimateOnScroll delay={0.2}>
            <div className="bg-sx-card border border-sx-accent/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-sx-accent" />
                <h3 className="font-heading text-lg font-bold text-sx-cream">С СЕРВЕКС</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-sx-accent text-lg shrink-0 mt-0.5">✓</span>
                  <span className="text-sx-secondary">Мгновенные ответы клиентам 24/7</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sx-accent text-lg shrink-0 mt-0.5">✓</span>
                  <span className="text-sx-secondary">Больше записей и загруженное расписание</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sx-accent text-lg shrink-0 mt-0.5">✓</span>
                  <span className="text-sx-secondary">Выше выручка без дополнительных затрат</span>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
