"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const tabs = ["Аналитика", "Обращения", "Записи"] as const;
type Tab = (typeof tabs)[number];

/* ── Analytics Tab ── */
function AnalyticsView({ visible }: { visible: boolean }) {
  const metrics = [
    { label: "Обращений сегодня", value: "47", accent: false },
    { label: "Записей", value: "32", accent: false },
    { label: "Конверсия", value: "68%", accent: true },
    { label: "Время ответа", value: "12с", accent: false },
  ];
  const bars = [
    { day: "Пн", h: 65 }, { day: "Вт", h: 80 }, { day: "Ср", h: 55 },
    { day: "Чт", h: 90 }, { day: "Пт", h: 75 }, { day: "Сб", h: 100 }, { day: "Вс", h: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="bg-sx-deep rounded-lg p-4 border border-sx-border/40"
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          >
            <p className="text-sx-muted text-xs mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${m.accent ? "text-sx-accent" : "text-sx-cream"}`}>
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-sx-deep rounded-lg p-5 border border-sx-border/40"
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.85 }}
      >
        <p className="text-sx-cream text-sm font-heading font-semibold mb-4">Обращения за неделю</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {bars.map((b, i) => (
            <div key={b.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                className="w-full rounded-t-md bg-sx-accent"
                initial={{ height: 0 }}
                animate={visible ? { height: `${b.h}%` } : { height: 0 }}
                transition={{ duration: 0.5, delay: 0.95 + i * 0.06, ease: "easeOut" }}
              />
              <span className="text-sx-muted text-[10px]">{b.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Messages Tab ── */
function MessagesView({ visible }: { visible: boolean }) {
  const messages = [
    { name: "Анна М.", initials: "АМ", preview: "Здравствуйте, хочу записаться на стрижку на пятницу...", time: "2 мин", status: "Записан", statusColor: "bg-sx-accent/20 text-sx-accent" },
    { name: "Елена К.", initials: "ЕК", preview: "Можно перенести запись с четверга на субботу?", time: "8 мин", status: "Перенесён", statusColor: "bg-blue-500/20 text-blue-400" },
    { name: "Мария Д.", initials: "МД", preview: "Подскажите стоимость окрашивания и сколько по времени...", time: "15 мин", status: "Ожидает", statusColor: "bg-sx-hot/20 text-sx-hot" },
    { name: "Ольга С.", initials: "ОС", preview: "Спасибо! Буду в 14:00 как договорились", time: "32 мин", status: "Записан", statusColor: "bg-sx-accent/20 text-sx-accent" },
    { name: "Дарья В.", initials: "ДВ", preview: "А можно к мастеру Ирине попасть на маникюр?", time: "1 ч", status: "Ожидает", statusColor: "bg-sx-hot/20 text-sx-hot" },
  ];

  return (
    <div className="bg-sx-deep rounded-lg border border-sx-border/40 divide-y divide-sx-border/30">
      {messages.map((m, i) => (
        <motion.div
          key={m.name + m.time}
          className="flex items-center gap-4 p-4"
          initial={{ opacity: 0, x: -16 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.45 + i * 0.09 }}
        >
          <div className="w-9 h-9 rounded-full bg-sx-border/50 flex items-center justify-center text-sx-cream text-[10px] font-bold shrink-0">
            {m.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sx-cream text-sm font-medium">{m.name}</span>
              <span className="text-sx-muted/50 text-xs">{m.time} назад</span>
            </div>
            <p className="text-sx-muted text-xs mt-0.5 truncate">{m.preview}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 ${m.statusColor}`}>
            {m.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Calendar/Booking Tab ── */
function BookingsView({ visible }: { visible: boolean }) {
  const hours = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
  const days = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
  type Appointment = { day: number; hour: number; span: number; label: string; color: string };

  const appointments: Appointment[] = [
    { day: 0, hour: 0, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 0, hour: 3, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 1, hour: 1, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 1, hour: 5, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 2, hour: 0, span: 1, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 2, hour: 2, span: 2, label: "Уход за лицом", color: "bg-pink-500/20 border-pink-500/40" },
    { day: 3, hour: 1, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 3, hour: 3, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 4, hour: 0, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 4, hour: 4, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 5, hour: 0, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 5, hour: 4, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 6, hour: 1, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 6, hour: 5, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
  ];

  return (
    <motion.div
      className="bg-sx-deep rounded-lg border border-sx-border/40 overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.45 }}
    >
      <div className="min-w-[580px]">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-sx-border/30">
          <div className="p-3" />
          {days.map((d) => (
            <div key={d} className="p-3 text-center text-sx-muted text-xs font-medium">{d}</div>
          ))}
        </div>
        <div className="relative">
          {hours.map((h, hi) => (
            <div key={h} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-sx-border/10 h-10">
              <div className="px-3 flex items-center text-sx-muted/50 text-[10px]">{h}</div>
              {days.map((_, di) => {
                const apt = appointments.find((a) => a.day === di && a.hour === hi);
                if (apt) {
                  return (
                    <div key={di} className="relative px-0.5 py-0.5">
                      <motion.div
                        className={`absolute inset-x-0.5 rounded-md border ${apt.color} px-1.5 py-0.5 z-10`}
                        style={{ height: `${apt.span * 40 - 4}px`, transformOrigin: "top" }}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={visible ? { opacity: 1, scaleY: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + (di + hi) * 0.04 }}
                      >
                        <span className="text-sx-cream text-[10px] leading-tight block truncate">{apt.label}</span>
                      </motion.div>
                    </div>
                  );
                }
                return <div key={di} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dashboard Mockup ── */
function DashboardMockup({ activeTab, setActiveTab, visible }: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  visible: boolean;
}) {
  const views: Record<Tab, React.ReactNode> = {
    Аналитика: <AnalyticsView visible={visible} />,
    Обращения: <MessagesView visible={visible} />,
    Записи: <BookingsView visible={visible} />,
  };

  return (
    <div className="bg-sx-card border border-sx-border rounded-xl overflow-hidden shadow-2xl shadow-black/50">
      {/* Window chrome */}
      <motion.div
        className="flex items-center gap-2 px-5 py-3 border-b border-sx-border/70 bg-sx-deep"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-sx-muted/40 text-xs font-body tracking-wide">СЕРВЕКС Platform</span>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        className="flex bg-sx-deep border-b border-sx-border"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-sx-accent border-b-2 border-sx-accent"
                : "text-sx-muted hover:text-sx-cream"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="p-5 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {views[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Capability cards ── */
const capabilities = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sx-accent">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Мониторинг в реальном времени",
    desc: "Следите за обращениями, записями и конверсией прямо сейчас",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sx-accent">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Детальная аналитика",
    desc: "Отчёты по загрузке, выручке и эффективности за любой период",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sx-accent">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Управление диалогами",
    desc: "Читайте переписки, корректируйте сценарии, обучайте систему",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sx-accent">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Контроль расписания",
    desc: "Полная картина записей, переносов и отмен по всем мастерам",
  },
];

const trackingItems = [
  "Конверсия обращений", "Время ответа", "Загрузка мастеров", "Выручка по дням",
  "Популярные услуги", "Источники обращений", "Отмены и переносы", "Повторные визиты",
];

/* ── Main Section ── */
export default function Platform() {
  const [activeTab, setActiveTab] = useState<Tab>("Аналитика");

  // Trigger dashboard animation when it scrolls into view
  const mockupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mockupRef, { once: true, margin: "-15%" });

  return (
    <section id="platform" className="relative py-24 md:py-32">

      {/* 1. Heading */}
      <div className="section-container text-center mb-16">
        <AnimateOnScroll>
          <p className="text-xs tracking-[0.3em] text-sx-muted uppercase mb-4">ПЛАТФОРМА</p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.05}>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream">
            Полный контроль
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-secondary text-base md:text-lg max-w-2xl mx-auto mt-5">
            Собственная платформа СЕРВЕКС — прозрачность работы цифрового администратора в одном окне
          </p>
        </AnimateOnScroll>
      </div>

      {/* 2. Platform interface — animated reveal on scroll */}
      <div ref={mockupRef} className="section-container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow behind the mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,240,144,0.08),transparent)] blur-2xl pointer-events-none" />
            <DashboardMockup activeTab={activeTab} setActiveTab={setActiveTab} visible={isInView} />
          </div>
        </motion.div>
      </div>

      {/* 3. Feature cards */}
      <div className="section-container mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((c, i) => (
            <AnimateOnScroll key={c.title} delay={i * 0.08}>
              <div className="bg-sx-card border border-sx-border/50 rounded-xl p-6 h-full">
                <div className="w-9 h-9 rounded-lg bg-sx-accent/10 flex items-center justify-center mb-3">
                  {c.icon}
                </div>
                <p className="text-sx-cream font-heading font-semibold text-sm">{c.title}</p>
                <p className="text-sx-muted text-sm mt-2">{c.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 4. Tracking badges */}
      <div className="section-container">
        <AnimateOnScroll>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-sx-cream text-center mb-8">
            Что можно отслеживать
          </h3>
        </AnimateOnScroll>
        <div className="flex flex-wrap justify-center gap-3">
          {trackingItems.map((item, i) => (
            <AnimateOnScroll key={item} delay={i * 0.05}>
              <div className="bg-sx-card border border-sx-border/50 rounded-full px-5 py-2.5 text-sm text-sx-secondary hover:text-sx-cream hover:border-sx-accent/30 transition-colors">
                {item}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

    </section>
  );
}
