# Corpus Design System — Master

Product: Corpus — interactive human anatomy learning for medical students.
Type: Premium medical EdTech / SaaS
Audience: Medical students and serious anatomy learners
Pattern: Feature-Rich Showcase + Interactive Product Demo

## Style

Foundation: Minimalism & Swiss Style (grid, hierarchy, restraint).
Identity overlay: Scientific visualization — atlas plates, instrument labels, HUD callouts.
Not claymorphism, not kids education, not neon cyberpunk, not generic AI SaaS.

Mood: premium, scientific, intelligent, trustworthy, immersive, clean.

## Color tokens

Light atlas paper (default):
- --color-background: #F3EEE4
- --color-foreground: #172025
- --color-primary: #1C6568
- --color-on-primary: #F3EEE4
- --color-accent: #A13333
- --color-on-accent: #FFFFFF
- --color-secondary: #B0894D
- --color-card: #FBF7F0
- --color-muted: #5A6469
- --color-border: #D5CBB8
- --color-ring: #1C6568

Dark scientific (hero, CTA, product canvas):
- --color-ink: #0E1418
- --color-ink-2: #161E24
- --color-bone: #E8DCC8
- --color-signal: #3E9A97

## Typography

- Display: Fraunces (optical size) — headlines, editorial moments
- Body/UI: Source Sans 3 — interface, supporting copy
- Mono: IBM Plex Mono — anatomical labels, metrics, section indexes
- Base 16–18px, line-height 1.55 body, 1.12 display
- Hero desktop ~56–64px, mobile ~32–40px. No oversized display type.

## Spacing & radius

- 8px grid
- Section padding: 72–120 desktop, 56–72 mobile
- Radius: 6px controls, 10px cards, 2px scientific chips. Avoid 24px super-rounds.

## Motion

- Hero entrance 400–600ms, opacity + 12–20px
- Scroll reveal 300–400ms, y:12, stagger ≤8
- Hover 150–200ms, transform/opacity only
- Anatomy float 10s ease-in-out
- Respect prefers-reduced-motion: render final state, no float/parallax

## Components

- Buttons: solid accent (primary CTA), outline bone/ink (secondary)
- Cards: visually distinct, not identical grids
- Focus: 2px solid ring, 3px offset
- Touch targets ≥44px
- SVG icons only (Lucide)

## Anti-patterns

No emoji icons, no neon, no heavy glass, no rainbow gradients,
no identical feature cards, no fake “1M+ doctors”, no hover-only UX.
