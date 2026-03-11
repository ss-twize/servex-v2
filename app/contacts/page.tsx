"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function ContactsPage() {
  const { openBooking } = useDemoBooking();

  return (
    <main className="min-h-screen pt-24">
      <SectionWrapper>
        <AnimateOnScroll>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Контакты
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="mt-6 text-sx-muted text-lg max-w-xl">
            Свяжитесь с нами удобным способом — ответим в течение нескольких часов.
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <AnimateOnScroll delay={0.15}>
            <a
              href="https://t.me/servex_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-sx-card border border-sx-border rounded-2xl p-6 hover:border-sx-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sx-deep border border-sx-border flex items-center justify-center group-hover:border-sx-accent/50 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-sx-accent"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-sx-cream">
                  Телеграм
                </h3>
              </div>
              <p className="text-sx-accent text-sm font-medium">@servex_bot</p>
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <a
              href="mailto:info@servex.ru"
              className="group block bg-sx-card border border-sx-border rounded-2xl p-6 hover:border-sx-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sx-deep border border-sx-border flex items-center justify-center group-hover:border-sx-accent/50 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sx-accent"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-sx-cream">
                  Электронная почта
                </h3>
              </div>
              <p className="text-sx-accent text-sm font-medium">info@servex.ru</p>
            </a>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-14">
            <Button size="lg" onClick={openBooking}>
              Записаться на демо
            </Button>
          </div>
        </AnimateOnScroll>
      </SectionWrapper>
    </main>
  );
}
