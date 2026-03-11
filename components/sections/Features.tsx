"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const flow = [
  {
    num: "01",
    title: "Клиент пишет",
    desc: "Сообщение в Telegram, WhatsApp или звонок — система получает обращение мгновенно.",
    from: "Клиент",
  },
  {
    num: "02",
    title: "ИИ отвечает",
    desc: "СЕРВЕКС понимает запрос, уточняет нужную услугу и предлагает свободное время.",
    from: "СЕРВЕКС",
  },
  {
    num: "03",
    title: "Запись создаётся",
    desc: "Клиент выбирает время — система автоматически создаёт запись в CRM.",
    from: "CRM",
  },
  {
    num: "04",
    title: "Подтверждение",
    desc: "Клиент получает подтверждение, а перед визитом — автоматическое напоминание.",
    from: "Клиент",
  },
];

// Simulated chat messages for the visual
const chatMessages = [
  { role: "client", text: "Привет, хочу записаться на стрижку" },
  { role: "bot", text: "Привет! Подскажи, на какое время тебе удобно? Есть завтра в 15:00 и 17:30, послезавтра с утра 🙌" },
  { role: "client", text: "Завтра в 15:00 подойдёт" },
  { role: "bot", text: "Отлично! Записал тебя на завтра, 14 марта в 15:00. Напомню за час ✓" },
];

export default function Features() {
  return (
    <section id="how" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Как работает СЕРВЕКС
          </h2>
          <p className="text-sx-secondary text-lg text-center mt-4 max-w-xl mx-auto">
            Весь процесс — от обращения до подтверждения — происходит автоматически.
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 mt-16 items-center">

          {/* Left: steps */}
          <div className="space-y-6">
            {flow.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={i * 0.1}>
                <div className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-sx-accent/10 border border-sx-accent/20 flex items-center justify-center shrink-0 group-hover:bg-sx-accent/20 group-hover:border-sx-accent/40 transition-colors duration-300">
                      <span className="font-heading font-bold text-sx-accent text-sm">{step.num}</span>
                    </div>
                    {i < flow.length - 1 && (
                      <div className="w-px flex-1 min-h-[24px] bg-sx-border mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-heading font-bold text-sx-cream text-base mb-1">{step.title}</h3>
                    <p className="text-sx-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Right: chat simulation */}
          <AnimateOnScroll delay={0.15}>
            <div className="bg-sx-card border border-sx-border rounded-2xl overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-sx-border/60 bg-sx-surface/40">
                <div className="w-9 h-9 rounded-full bg-sx-accent/15 border border-sx-accent/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F090" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-semibold text-sx-cream text-sm">СЕРВЕКС</p>
                  <p className="text-sx-accent text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sx-accent animate-pulse inline-block" />
                    онлайн
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[280px]">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "client"
                        ? "bg-sx-accent/15 border border-sx-accent/25 text-sx-cream rounded-br-sm"
                        : "bg-sx-surface/70 border border-sx-border/60 text-sx-cream rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-sx-border/60 bg-sx-surface/30">
                <div className="flex-1 bg-sx-deep border border-sx-border/60 rounded-xl px-4 py-2.5 text-sx-muted text-sm">
                  Написать сообщение...
                </div>
                <div className="w-9 h-9 rounded-xl bg-sx-accent flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#050A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
