"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const stats = [
  {
    value: "0",
    label: "пропущенных обращений",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.73 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.82-.82a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    value: "2000+",
    label: "записей обработано",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    value: "90%",
    label: "рутины автоматизировано",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    value: "24/7",
    label: "без выходных и больничных",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <section className="py-10 md:py-14 px-6">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 0.08}>
              <div className="bg-sx-card border border-sx-border/60 rounded-2xl p-5 text-center group hover:border-sx-accent/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl bg-sx-accent/10 flex items-center justify-center mx-auto mb-3 text-sx-accent group-hover:bg-sx-accent/20 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-sx-accent mb-1"
                  style={{ textShadow: "0 0 20px rgba(0,240,144,0.25)" }}>
                  {stat.value}
                </div>
                <div className="text-sx-muted text-[11px] uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
