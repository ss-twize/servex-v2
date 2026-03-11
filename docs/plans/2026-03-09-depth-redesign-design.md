# СЕРВЕКС Depth Redesign — Design Document

## Concept
Rebuild the landing page with "Floating Planes" — spatial parallax depth + compositional asymmetry. Every section has 3 depth planes moving at different scroll speeds. Bento grid layouts replace uniform card grids. Elements overlap across section boundaries.

## Architecture
- Framer Motion `useScroll` + `useTransform` for parallax planes
- Background (0.3× scroll), Mid (0.6×), Foreground (normal)
- Persistent "СЕРВЕКС" watermark drifting behind entire page
- 3D card tilt via cursor-tracking `rotateX/Y`
- Platform section: sticky-pinned scroll-driven expansion

## Section Redesigns

### Hero
- Orb: 80vh, bleeds into Problem section below (no bottom cut)
- Text: large (6xl–7xl), "СЕРВЕКС" on its own line in accent green
- Background plane: perspective grid receding to horizon

### Problem (overlaps Hero via negative margin-top)
- Bento grid: one 2×1 wide card, two regular, one tall
- Background: slow horizontal scan lines at 4% opacity

### Calculator
- Asymmetric: left 55% inputs, right 45% giant animated number (8xl)
- Ghost number at 40% opacity behind as background plane

### Solution
- Cascading column: 5 items alternating left/right indent
- Connected by thin vertical line with scroll-driven green dot
- Large "01–05" numbers in background

### Comparison
- 3 independent cards at different heights
- СЕРВЕКС card elevated 20px with green glow shadow

### Platform
- Pinned/sticky: window expands from 50% to full viewport on scroll
- 300px scroll triggers full expansion

### Features
- Bento: 1 card 2× wide, 1 card 2× tall, rest standard
- 3D tilt on hover (cursor tracking)

### Pricing
- Agent card centered and large
- Voice Agent + Enterprise rotated 1–2° inward, smaller
- Agent: 4-layer 3D box-shadow stack

### HowItWorks
- Large step number (01–05) fades between steps
- Alternating left/right content
- Scroll-progress fill on connecting line

### FAQ
- Large "?" background character, slowly rotating on scroll

## Tech
- Framer Motion useScroll + useTransform for parallax
- cursor-tracking rotateX/Y for 3D card tilt
- Sticky + scroll progress for Platform expansion
- Remove SectionWrapper — each section custom layout
