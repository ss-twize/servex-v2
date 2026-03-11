"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const features = [
  {
    title: "Ответы в мессенджерах",
    desc: "Telegram, WhatsApp, Max — мгновенный ответ на любое обращение без задержек.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Голосовой ИИ",
    desc: "Принимает звонки, отвечает как живой человек и записывает клиента прямо по телефону.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Запись в CRM",
    desc: "Автоматически создаёт запись в YClients, Google Calendar или любой другой системе.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    title: "Напоминания клиентам",
    desc: "Отправляет напоминания о записи, снижая количество отмен и неявок.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "Возврат клиентов",
    desc: "Автоматически возвращает клиентов, которые давно не приходили, заполняя свободные окна.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
      </svg>
    ),
  },
  {
    title: "Аналитика и отчёты",
    desc: "Покажет сколько обращений обработано, конверсию в запись и другие метрики.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Всё, что нужно для автоматизации первой линии
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            СЕРВЕКС берёт на себя общение с клиентами и запись — чтобы персонал занимался своим делом.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {features.map((f, i) => (
            <AnimateOnScroll key={f.title} delay={i * 0.08}>
              <div className="bg-sx-card border border-sx-border/50 rounded-2xl p-6 h-full group hover:border-sx-accent/30 transition-colors duration-300">
                <div className="w-11 h-11 rounded-xl bg-sx-accent/10 flex items-center justify-center mb-4 text-sx-accent group-hover:bg-sx-accent/20 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-base text-sx-cream mb-2">{f.title}</h3>
                <p className="text-sx-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
