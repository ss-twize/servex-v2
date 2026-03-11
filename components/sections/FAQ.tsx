"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "Подходит ли СЕРВЕКС для моего бизнеса?",
    a: "СЕРВЕКС создан для сервисных бизнесов, работающих по записи: салоны красоты, барбершопы, стоматологии, СПА, массажные салоны, психологические центры и другие. Если ваш бизнес принимает клиентов по записи — СЕРВЕКС вам подходит.",
  },
  {
    q: "Как быстро можно запуститься?",
    a: "Запуск занимает от 1 рабочего дня. После демо и сбора данных мы настраиваем систему и подключаем каналы. Большинство клиентов начинают работать в течение 1\u20133 дней.",
  },
  {
    q: "Как устроены тарифы?",
    a: "Фиксированная ежемесячная подписка без скрытых платежей. Чем дольше период — тем выгоднее. Стоимость значительно ниже зарплаты штатного администратора.",
  },
  {
    q: "Как я контролирую систему?",
    a: "Через личный кабинет с аналитикой, историей обращений и записей. Вы видите всё: конверсии, время ответа, загрузку. Полная прозрачность.",
  },
  {
    q: "Что происходит с нестандартными запросами?",
    a: "СЕРВЕКС работает по настраиваемым сценариям. Нестандартные запросы передаются живому оператору с полным контекстом переписки.",
  },
  {
    q: "Какие интеграции доступны?",
    a: "Telegram, WhatsApp, YCLIENTS, Altegio, Битрикс24, amoCRM, 1С, Google Calendar. Также доступно подключение через API.",
  },
  {
    q: "Можно ли начать с одной локации?",
    a: "Да. Вы можете начать с одной точки и масштабировать на другие локации по мере готовности. Тариф Enterprise предусматривает мультилокационную поддержку.",
  },
  {
    q: "Чем это отличается от обычного чат-бота?",
    a: "Обычный чат-бот отвечает по шаблону и не умеет записывать. СЕРВЕКС — полноценная система: понимает контекст, управляет записями, даёт аналитику и работает стабильно.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream text-center">
            Вопросы
          </h2>
        </AnimateOnScroll>

        <div className="mt-14 space-y-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimateOnScroll key={i} delay={0.03 * i}>
                <div
                  className={`border-b border-sx-border py-6 cursor-pointer group transition-all duration-300 ${
                    isOpen ? "border-l-2 border-l-sx-accent pl-6" : ""
                  }`}
                  onClick={() => toggle(i)}
                >
                  {/* Collapsed: full-width question row */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`text-lg md:text-xl font-heading font-medium transition-colors ${
                        isOpen
                          ? "text-sx-accent"
                          : "text-sx-cream group-hover:text-sx-accent"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-sx-muted text-2xl shrink-0 leading-none select-none"
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Expanded: two-column answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
                          <div className="md:w-[40%]" />
                          <div className="md:w-[60%]">
                            <p className="text-base text-sx-secondary leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
