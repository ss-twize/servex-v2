# СЕРВЕКС Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium, high-conversion B2B landing page for СЕРВЕКС — a digital administrator product for service businesses.

**Architecture:** Next.js 14 App Router with TypeScript. Component-based architecture: shared layout (header/footer), page-level components, section components for each landing page block, and reusable UI primitives. Three.js hero orb via @react-three/fiber. Framer Motion for scroll animations. Tailwind CSS for styling with custom design tokens.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Three.js + @react-three/fiber + @react-three/drei, Space Grotesk + Inter (Google Fonts)

---

## Task 1: Project Scaffolding + Tailwind Config

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Step 1: Initialize Next.js project**

Run:
```bash
cd /home/claude/projects/servex-landing
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

**Step 2: Install dependencies**

Run:
```bash
npm install framer-motion three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Step 3: Configure Tailwind with СЕРВЕКС design tokens**

Edit `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sx: {
          deep: "#020E0E",
          card: "#0C1618",
          border: "#003D3A",
          cream: "#FDFBED",
          accent: "#01DE82",
          "accent-hover": "#00C472",
          muted: "#7A8A8A",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Set up globals.css**

Edit `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-sx-deep text-sx-cream font-body antialiased;
  }
  ::selection {
    @apply bg-sx-accent/20 text-sx-cream;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #003D3A #020E0E;
  }
}
```

**Step 5: Set up root layout with fonts**

Edit `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "СЕРВЕКС — цифровой администратор нового поколения",
  description: "Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 6: Create placeholder home page**

Edit `app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-heading text-4xl text-sx-cream">СЕРВЕКС</h1>
    </main>
  );
}
```

**Step 7: Verify dev server starts**

Run: `npm run dev` — verify no errors, page renders at localhost:3000

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with Tailwind config and design tokens"
```

---

## Task 2: Shared Layout — Header + Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create Button component**

Create `components/ui/Button.tsx` — two variants: `primary` (green bg) and `secondary` (bordered). Accepts `href` for link behavior.

```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "default",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all duration-200";
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover shadow-[0_0_20px_rgba(1,222,130,0.15)] hover:shadow-[0_0_30px_rgba(1,222,130,0.25)]",
    secondary:
      "border border-sx-border text-sx-cream hover:border-sx-accent hover:text-sx-accent",
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tg:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href}>
        <motion.span className={cls} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

**Step 2: Create Header**

Create `components/layout/Header.tsx` — sticky, glassmorphic, with logo, nav links (scroll-to-section), and CTA button. Mobile hamburger.

Nav items: Продукт, Калькулятор, Возможности, Тарифы, Контакты — all scroll to sections via `#id`.

**Step 3: Create MobileMenu**

Slide-in mobile nav with same items + CTAs.

**Step 4: Create Footer**

Links: Продукт, Тарифы, Контакты, Политика конфиденциальности, Оферта.
Copyright line. Telegram link.

**Step 5: Wire layout**

Add Header + Footer to `app/layout.tsx` body.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add Header, Footer, Button components and mobile menu"
```

---

## Task 3: Hero Section + Three.js Orb

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/three/HeroOrb.tsx`

**Step 1: Create HeroOrb component**

`components/three/HeroOrb.tsx` — A glowing sphere using @react-three/fiber:
- Dark base with green (#01DE82) energy veins (custom shader or emissive wireframe)
- Gentle auto-rotation
- Subtle cursor-reactive tilt (mouse position → rotation offset)
- Pulsing glow via point light
- Wrapped in `<Canvas>` with `<Suspense>` fallback

Implementation: Use a sphere geometry with a custom shader material that creates glowing vein patterns. Add a subtle bloom-like effect using additive blending on a second slightly-larger transparent sphere.

**Step 2: Create Hero section**

`components/sections/Hero.tsx`:
- Full viewport height
- Left side: headline, subheadline, 2 CTAs, trust line
- Right side / background: HeroOrb
- Framer Motion entrance animations (staggered fade-up for text)
- Responsive: orb behind text on mobile

Headline: `СЕРВЕКС — цифровой администратор нового поколения`
Subheadline: `Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса`
Trust: `Запуск от 1 дня · Прозрачная аналитика · Работает 24/7`

Primary CTA → scrolls to demo booking section or opens calendar
Secondary CTA → `tg://resolve?domain=servex_bot&text=...` (prefilled message)

**Step 3: Add Hero to home page**

**Step 4: Verify — dev server, orb renders, responsive**

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Hero section with Three.js orb animation"
```

---

## Task 4: Scroll Animation Wrapper

**Files:**
- Create: `components/ui/AnimateOnScroll.tsx`
- Create: `components/ui/SectionWrapper.tsx`

**Step 1: Create AnimateOnScroll**

Framer Motion wrapper using `useInView` — children fade-up when scrolled into view. Configurable delay for stagger effects.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function AnimateOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Create SectionWrapper**

Consistent section padding, max-width, and id for scroll navigation.

```tsx
type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ id, children, className = "" }: Props) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add scroll animation and section wrapper utilities"
```

---

## Task 5: Problem / Financial Loss Section

**Files:**
- Create: `components/sections/Problem.tsx`

**Step 1: Build Problem section**

Content structure:
- Section heading: "Бизнес теряет деньги на первой линии сервиса"
- 4 pain cards with icons and financial framing:
  1. Медленные ответы → клиенты уходят к конкурентам
  2. Пропущенные заявки → потерянная выручка каждый день
  3. Непостоянство администраторов → нестабильное качество сервиса
  4. Нет прозрачности → нельзя управлять тем, что не видишь

Each card: icon (SVG or emoji-free icon), headline, 1-line description, and a subtle red/amber financial figure or percentage for impact.

Use AnimateOnScroll with stagger for cards.

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Problem / Financial Loss section"
```

---

## Task 6: Economics Calculator

**Files:**
- Create: `components/sections/Calculator.tsx`

**Step 1: Build interactive calculator**

Inputs (sliders + number inputs):
- Количество заявок в месяц (range: 50–1000, default: 200)
- Средний чек (range: 1000–10000 RUB, default: 3000)
- Процент потерь без системы (range: 5–30%, default: 15%)

Output — two columns:
- "Без СЕРВЕКС": total monthly revenue, lost revenue (inquiries × avg ticket × loss%), annual loss
- "С СЕРВЕКС": reduced loss (loss% × 0.3 — i.e. СЕРВЕКС recovers ~70%), saved revenue monthly, saved revenue annual

Animated counters on the numbers. Green accent on savings figures.

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add interactive economics calculator section"
```

---

## Task 7: Solution Section

**Files:**
- Create: `components/sections/Solution.tsx`

**Step 1: Build Solution section**

Heading: "Что делает СЕРВЕКС"

5 capability cards in a grid:
1. Отвечает клиентам — мгновенно, 24/7, без выходных
2. Записывает на услуги — проверяет свободные слоты, подтверждает запись
3. Переносит и отменяет — без потери клиента
4. Поддерживает первую линию сервиса — профессионально и стабильно
5. Даёт аналитику — обращения, конверсии, загрузка

Each card: icon, title, 1-line description. Hover: subtle border glow (#01DE82).

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Solution section with 5 capabilities"
```

---

## Task 8: Comparison Section ("Not a Chatbot")

**Files:**
- Create: `components/sections/Comparison.tsx`

**Step 1: Build 3-column comparison table**

Heading: "Почему это не обычный чат-бот"

Columns: Обычный чат-бот | Администратор | СЕРВЕКС

Rows comparing:
- Скорость ответа
- Доступность
- Стабильность качества
- Запись / перенос / отмена
- Аналитика
- Стоимость
- Масштабируемость

СЕРВЕКС column highlighted with accent border. Checkmarks / crosses / partial indicators per cell.

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add comparison section (СЕРВЕКС vs chatbot vs human)"
```

---

## Task 9: Platform Interface Section

**Files:**
- Create: `components/sections/Platform.tsx`
- Create: `components/ui/MockupDashboard.tsx`

**Step 1: Build polished UI mockup components**

Create realistic-looking dashboard mockups using styled divs (not images):
- Analytics dashboard: charts (simple SVG bar/line charts), metrics cards
- Inquiries list: recent messages with status indicators
- Bookings view: calendar-like grid with appointments
- System status: integration health, response metrics

Dark UI matching the site palette. These are visual trust-builders — they need to look real and polished.

**Step 2: Build Platform section**

Heading: "Полный контроль в одном интерфейсе"
Subheading about visibility and controllability.
Tabbed or carousel mockup display.

**Step 3: Add to home page**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Platform Interface section with UI mockups"
```

---

## Task 10: Features + Integrations Section

**Files:**
- Create: `components/sections/Features.tsx`
- Create: `components/sections/Integrations.tsx`

**Step 1: Build Features grid**

Heading: "Возможности платформы"

Feature items (icon + title + short description):
- Обработка обращений
- Логика записи
- Переносы и отмены
- Аналитика и отчёты
- Внутренние системы контроля качества
- Настраиваемые сценарии

**Step 2: Build Integrations row**

Heading: "Интеграции"
Logos/icons for: Telegram, WhatsApp, YCLIENTS, Altegio, Битрикс24, amoCRM, 1С, Google Calendar, custom API.

**Step 3: Add to home page**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Features grid and Integrations section"
```

---

## Task 11: "Is This For My Business?" Section

**Files:**
- Create: `components/sections/ForWhom.tsx`

**Step 1: Build business types section**

Heading: "Подходит ли это моему бизнесу?"

Two-part layout:
1. Business type cards: Салоны красоты, Барбершопы, СПА, Массажные салоны, Стоматологии, Психологические центры, Другие сервисные бизнесы
2. "Especially useful when" scenarios: high inquiry volume, inconsistent admin quality, evening/weekend inquiries lost, scaling to multiple locations

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add 'Is This For My Business?' section"
```

---

## Task 12: Product Cards + Pricing Section

**Files:**
- Create: `components/sections/Pricing.tsx`

**Step 1: Build pricing section with billing toggle**

Heading: "Тарифы"

Billing toggle at top: 1 мес | 3 мес | 6 мес (default: 3 мес)

Three cards side by side:

**Agent card** (active, highlighted):
- Monthly price displayed prominently
- Prices: 25,000 (1mo) / 22,000 (3mo) / 21,000 (6mo) RUB/мес
- Savings badge: "Экономия 9 000 ₽" (3mo) / "Экономия 24 000 ₽" (6mo)
- Feature list
- CTA: "Записаться на демо"
- Support notes: дешевле штатного администратора, прозрачные условия, запуск от 1 дня

**Voice Agent card** (coming soon):
- "Скоро" badge
- Brief description
- Muted styling, no active CTA

**Enterprise card**:
- "По запросу" pricing
- For chains, multi-location
- CTA: "Связаться"

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Pricing section with billing toggle and 3 product cards"
```

---

## Task 13: How Launch Works + FAQ

**Files:**
- Create: `components/sections/HowItWorks.tsx`
- Create: `components/sections/FAQ.tsx`

**Step 1: Build launch timeline**

Heading: "Как проходит запуск"

5 steps with connected timeline:
1. Демо — знакомство с платформой и разбор задач
2. Сбор данных — услуги, расписание, сценарии общения
3. Настройка — конфигурация системы под бизнес
4. Запуск — подключение каналов и старт работы
5. Мониторинг — контроль качества и оптимизация

**Step 2: Build FAQ accordion**

Heading: "Частые вопросы"

Questions:
1. Подходит ли СЕРВЕКС для моего бизнеса?
2. Как быстро можно запуститься?
3. Как устроены тарифы?
4. Как я контролирую систему?
5. Что происходит с нестандартными запросами клиентов?
6. Какие интеграции доступны?
7. Можно ли начать с одной локации?
8. Чем это отличается от обычного чат-бота?

Animated expand/collapse.

**Step 3: Add to home page**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add How Launch Works timeline and FAQ accordion"
```

---

## Task 14: Final CTA Section

**Files:**
- Create: `components/sections/FinalCTA.tsx`

**Step 1: Build final conversion block**

Strong visual block with gradient bg or subtle orb echo.
Heading: "Перестаньте терять клиентов на первой линии"
Subtext: brief reinforcement.
Two CTAs: "Записаться на демо" + "Написать в Telegram"

**Step 2: Add to home page**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Final CTA section"
```

---

## Task 15: Demo Booking Calendar Widget

**Files:**
- Create: `components/ui/DemoBooking.tsx`
- Create: `components/ui/CalendarWidget.tsx`

**Step 1: Build calendar/scheduling widget**

A modal or inline calendar widget for demo booking:
- Date picker (next 14 days, weekdays only)
- Time slot selection (e.g., 10:00, 11:00, ..., 18:00)
- Contact form: Имя, Телефон, Название бизнеса
- Submit → shows confirmation state

Note: This is a UI component. Backend integration will be added later. For now, form submits to a placeholder or sends data to Telegram webhook.

**Step 2: Wire "Записаться на демо" CTAs to open this widget**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add demo booking calendar widget"
```

---

## Task 16: Additional Pages

**Files:**
- Create: `app/contacts/page.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/offer/page.tsx`

**Step 1: Build Contacts page**

Simple premium page:
- Email, Telegram link, phone (if provided)
- Demo booking CTA
- Brief map or address section (placeholder)

**Step 2: Build Privacy Policy page**

Standard privacy policy for a Russian SaaS company. Long-form text with proper headings.

**Step 3: Build Offer/Agreement page**

Standard user agreement / public offer for a Russian SaaS.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Contacts, Privacy Policy, and Offer pages"
```

---

## Task 17: Responsive Polish + Final Integration

**Files:**
- Modify: all section components for responsive edge cases
- Modify: `app/page.tsx` — final section ordering

**Step 1: Assemble home page with all sections in order**

```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Calculator />
      <Solution />
      <Comparison />
      <Platform />
      <Features />
      <Integrations />
      <ForWhom />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
```

**Step 2: Test all breakpoints** — mobile (375px), tablet (768px), desktop (1280px+)

**Step 3: Fix any responsive issues, spacing, overflow**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: assemble full landing page and polish responsive layout"
```

---

## Task 18: Performance + SEO + Meta

**Files:**
- Modify: `app/layout.tsx` — add meta tags, OG tags
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/` — favicon, OG image placeholder

**Step 1: Add comprehensive meta tags**

Title, description, OG tags, Twitter card.

**Step 2: Add sitemap and robots.txt**

**Step 3: Add favicon**

**Step 4: Final build test**

Run: `npm run build` — ensure no errors.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add SEO meta tags, sitemap, robots.txt, favicon"
```
