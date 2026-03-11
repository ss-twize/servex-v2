# СЕРВЕКС Landing Page — Design Document

## Concept
Dark premium B2B landing page positioning СЕРВЕКС as infrastructure-grade digital administrator software. Visual language: Palantir/Linear-inspired — restrained, confident, with one hero animation (glowing technological orb). Green accent (#01DE82) used surgically on CTAs, key data, orb glow.

## Homepage Structure

1. **Hero** — Positioning + orb animation + 2 CTAs
2. **Problem / Financial Loss** — Pain: lost revenue from poor front-line communication
3. **Economics Calculator** — Interactive ROI proof
4. **Solution** — 5 core capabilities of СЕРВЕКС
5. **"Not a Chatbot" Comparison** — 3-column: СЕРВЕКС vs chatbot vs human admin
6. **Platform Interface** — Polished UI mockups (analytics, bookings, dashboards)
7. **Features + Integrations** — Feature grid + integration logos
8. **"Is This For My Business?"** — Business types + ideal scenarios
9. **Product Cards + Pricing** — Agent (billing toggle) / Voice Agent (coming soon) / Enterprise
10. **How Launch Works** — 5-step timeline
11. **FAQ** — Accordion with key objections
12. **Final CTA** — Closing conversion block

## Visual Direction

- **Palette**: #020E0E (deep bg), #0C1618 (cards), #003D3A (borders/accents), #FDFBED (text), #01DE82 (accent)
- **Typography**: Space Grotesk (headings) + Inter (body)
- **Hero object**: Three.js sphere — dark with green energy veins, cursor-reactive
- **Animations**: Framer Motion scroll reveals, hover card lifts, counter animations
- **Cards**: Subtle glass borders (#003D3A), hover elevation

## Hero Copy

- **Headline**: СЕРВЕКС — цифровой администратор нового поколения
- **Subheadline**: Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса
- **Primary CTA**: Записаться на демо
- **Secondary CTA**: Написать в Telegram
- **Trust line**: Запуск от 1 дня · Прозрачная аналитика · Работает 24/7

## Pricing

- Billing toggle: 1 мес / 3 мес / 6 мес (default: 3 мес)
- Monthly prices: 25,000 / 22,000 / 21,000 RUB
- Savings: 9,000 (3mo) / 24,000 (6mo) per term
- Three cards: Agent (active), Voice Agent (coming soon), Enterprise (by request)

## Trust Strategy (no fake case studies)

1. Polished platform UI mockups
2. Transparent 5-step launch process
3. Interactive calculator with real math
4. Integration logos
5. FAQ addressing real objections
6. "Launch from 1 day" speed

## Tech Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Framer Motion, Three.js + @react-three/fiber
- Space Grotesk + Inter (Google Fonts)

## Pages

- `/` — home landing
- `/contacts` — contacts
- `/privacy` — privacy policy
- `/offer` — user agreement
