"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const problems = [
  "Пропущенные звонки — потерянная выручка",
  "Клиенты пишут ночью и не получают ответ",
  "Администратор перегружен и выгорает",
  "Записи теряются, окна в расписании пустуют",
  "Человеческий фактор приводит к ошибкам",
  "Нет системы возврата клиентов",
];

const solutions = [
  "ИИ отвечает мгновенно, в любое время",
  "Сообщения обрабатываются 24/7, ноль задержек",
  "Рутина автоматизирована, персонал занят делом",
  "Все записи фиксируются в CRM автоматически",
  "Система работает без ошибок и усталости",
  "Автоматические сценарии возврата клиентов",
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Типичные проблемы бизнеса — и как СЕРВЕКС их решает
          </h2>
          <div className="w-20 h-1 bg-sx-accent mx-auto mt-6 mb-16 rounded-full"
            style={{ boxShadow: "0 0 12px rgba(0,240,144,0.4)" }} />
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Problems */}
          <AnimateOnScroll delay={0.05}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 rounded-full bg-sx-hot/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-sx-secondary">Проблемы</h3>
              </div>
              <div className="space-y-3">
                {problems.map((problem, i) => (
                  <AnimateOnScroll key={i} delay={0.06 + i * 0.06}>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-sx-hot/5 border border-sx-hot/20 hover:border-sx-hot/35 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-sx-hot shrink-0" />
                      <span className="text-sx-cream/80 text-sm leading-snug">{problem}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Solutions */}
          <AnimateOnScroll delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 rounded-full bg-sx-accent/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00F090" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-sx-secondary">Решения СЕРВЕКС</h3>
              </div>
              <div className="space-y-3">
                {solutions.map((solution, i) => (
                  <AnimateOnScroll key={i} delay={0.12 + i * 0.06}>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-sx-accent/5 border border-sx-accent/20 hover:border-sx-accent/35 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-sx-accent shrink-0"
                        style={{ boxShadow: "0 0 6px rgba(0,240,144,0.6)" }} />
                      <span className="text-sx-cream/80 text-sm leading-snug">{solution}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
