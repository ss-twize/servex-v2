"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const rows = [
  { param: "Работает 24/7",          admin: false,             servex: true },
  { param: "Стоимость",              admin: "40–70 тыс/мес",   servex: "от 7 тыс/мес" },
  { param: "Скорость ответа",        admin: "Не гарантирована", servex: "Мгновенно" },
  { param: "Пропущенные обращения",  admin: "Бывает",          servex: "Исключено" },
  { param: "Усталость и выгорание",  admin: "Есть",            servex: "Нет" },
  { param: "Возврат клиентов",       admin: "Нет",             servex: "Автоматически" },
  { param: "Ошибки при записи",      admin: "Возможны",        servex: "Нет" },
  { param: "Интеграция с CRM",       admin: "Вручную",         servex: "Автоматически" },
];

function CheckIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-sx-accent/15 border border-sx-accent/30 flex items-center justify-center mx-auto">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00F090" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

function CrossIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-sx-hot/10 border border-sx-hot/25 flex items-center justify-center mx-auto">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="3" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sx-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center mb-14">
            <span className="text-sx-accent">СЕРВЕКС</span> против обычного администратора
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-sx-card border border-sx-border/60 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-sx-surface/40 border-b border-sx-border/50">
              <div className="p-4 md:p-5 text-center text-sx-muted font-heading text-xs uppercase tracking-wider">
                Параметр
              </div>
              <div className="p-4 md:p-5 text-center text-sx-muted font-heading text-xs uppercase tracking-wider border-x border-sx-border/40">
                Администратор
              </div>
              <div className="p-4 md:p-5 text-center text-sx-accent font-heading text-xs uppercase tracking-wider font-bold">
                СЕРВЕКС
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 hover:bg-sx-surface/20 transition-colors duration-200 ${
                  i !== rows.length - 1 ? "border-b border-sx-border/30" : ""
                }`}
              >
                <div className="p-4 md:p-5 text-sx-secondary text-sm flex items-center">
                  {row.param}
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center border-x border-sx-border/30">
                  {typeof row.admin === "boolean" ? (
                    row.admin ? <CheckIcon /> : <CrossIcon />
                  ) : (
                    <span className="text-sx-muted text-sm text-center">{row.admin}</span>
                  )}
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center">
                  {typeof row.servex === "boolean" ? (
                    row.servex ? <CheckIcon /> : <CrossIcon />
                  ) : (
                    <span className="text-sx-accent text-sm font-semibold text-center">{row.servex}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
