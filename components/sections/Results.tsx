"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const cases = [
  {
    type: "Салон красоты · 4 мастера",
    metrics: [
      { value: "0", label: "пропущенных обращений" },
      { value: "200+", label: "записей автоматизировано" },
      { value: "30%", label: "времени освобождено" },
    ],
    quote: "Раньше я сама отвечала в WhatsApp до полуночи. Сейчас система делает всё — утром вижу заполненное расписание.",
    author: "Владелец",
  },
  {
    type: "Барбершоп · 6 барберов",
    metrics: [
      { value: "500+", label: "записей обработано" },
      { value: "∞", label: "скорость ответа" },
      { value: "0", label: "ошибок в расписании" },
    ],
    quote: "Система ответила клиенту в 2 ночи и записала его. Мы об этом узнали утром, когда увидели новую запись в YClients.",
    author: "Управляющий",
  },
];

export default function Results() {
  return (
    <section id="results" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center mb-4">
            Типовые результаты клиентов
          </h2>
          <p className="text-sx-secondary text-center text-lg max-w-md mx-auto mb-14">
            Реальные показатели бизнесов, которые уже используют СЕРВЕКС.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div className="bg-sx-card border border-sx-border/60 rounded-2xl p-7 h-full group hover:border-sx-accent/25 transition-colors duration-300">
                {/* Type badge */}
                <div className="inline-flex items-center gap-2 bg-sx-accent/8 border border-sx-accent/20 rounded-full px-3 py-1 mb-6">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00F090" strokeWidth="2.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span className="text-sx-accent text-xs font-heading font-medium">{c.type}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-7">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="text-center bg-sx-surface/50 rounded-xl p-3 border border-sx-border/40">
                      <div className="font-heading font-extrabold text-xl text-sx-accent mb-1"
                        style={{ textShadow: "0 0 15px rgba(0,240,144,0.2)" }}>
                        {m.value}
                      </div>
                      <div className="text-sx-muted text-[10px] uppercase tracking-wider leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="border-t border-sx-border/40 pt-5">
                  <p className="text-sx-secondary text-sm leading-relaxed italic mb-3">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <p className="text-sx-muted text-xs font-heading font-medium">— {c.author}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Summary stats bar */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-8 grid grid-cols-3 gap-4 bg-sx-card border border-sx-accent/15 rounded-2xl p-6">
            {[
              { value: "0", label: "потерянных клиентов" },
              { value: "24/7", label: "без перерывов и выходных" },
              { value: "1 день", label: "до запуска" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-extrabold text-2xl md:text-3xl text-sx-accent mb-1"
                  style={{ textShadow: "0 0 20px rgba(0,240,144,0.2)" }}>
                  {s.value}
                </div>
                <div className="text-sx-muted text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
