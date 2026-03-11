"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const businessTypes = [
  "Салоны красоты",
  "Барбершопы",
  "СПА-центры",
  "Массажные салоны",
  "Стоматологии",
  "Психологические центры",
  "Другие сервисные бизнесы",
];

const situations = [
  "Много входящих обращений, не все обрабатываются вовремя",
  "Администраторы работают нестабильно",
  "Вечерние и ночные заявки остаются без ответа",
  "Бизнес масштабируется на несколько локаций",
  "Нет прозрачности в работе первой линии",
];

export default function ForWhom() {
  return (
    <section id="for-whom" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left 40% — sticky question */}
          <div className="lg:w-[40%]">
            <div className="lg:sticky lg:top-32">
              <AnimateOnScroll>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream leading-tight">
                  Подходит ли это моему бизнесу?
                </h2>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Right 60% — scrollable content */}
          <div className="lg:w-[60%]">
            {/* Business types */}
            <div>
              {businessTypes.map((type, i) => (
                <AnimateOnScroll key={type} delay={0.04 * i}>
                  <div className="text-xl text-sx-secondary py-3 border-b border-sx-border flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-sx-accent shrink-0" />
                    {type}
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Situations */}
            <div className="mt-12">
              <AnimateOnScroll>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-sx-cream mb-6">
                  Особенно полезно, когда:
                </h3>
              </AnimateOnScroll>
              <div className="space-y-4">
                {situations.map((s, i) => (
                  <AnimateOnScroll key={i} delay={0.04 * i}>
                    <p className="text-lg text-sx-cream flex items-start gap-3">
                      <span className="text-sx-accent shrink-0">&rarr;</span>
                      {s}
                    </p>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
