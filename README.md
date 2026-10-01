# Corpus

A premium interactive human-anatomy learning platform concept for medical students. The site pairs a scientific atlas visual language with anatomy systems, practice interactions, progress previews, and responsive navigation.

## Run locally

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Database-backed API routes

Set `DATABASE_URL` in `.env.local` to a PostgreSQL connection string before using the sign-in, learner, waitlist, or health API routes. The homepage and its product-preview interactions render without a database.

## Kinetics micro-interactions

`src/components/kinetics/` holds spring-physics interaction patterns adapted from
[ckissi/kinetics](https://github.com/ckissi/kinetics) and tuned to the Corpus design
system (atlas palette, 150–600ms, transform/opacity only, `prefers-reduced-motion` → final state).

| Pattern (Kinetics) | Corpus component / class | Used in |
| --- | --- | --- |
| Odometer Count-up | `<CountUp />` | Stats strip, gamification panel, anatomy stats |
| Progress Ring | `<ProgressRing />` | Region fluency |
| Elastic Progress | `<ElasticBar />` | Tonight’s set, lesson progress |
| Heartbeat Monitor | `<Heartbeat />` | Hero plate telemetry |
| Magnetic Button | `<Magnetic />` | Hero CTAs |
| Squish Button | `.k-squish` | All buttons, quiz choices |
| Success Check | `<SuccessCheck />` | Quiz correct answer, form success |
| Error Shake | `.k-shake` | Quiz wrong answer, form errors |
| Number Counter | `<BumpNumber />` | XP readout |
| Confetti Burst | `<Confetti />` | XP milestone |
| Before / After | `<CompareSlider />` | Layer compare section |
| Snap Rail | measured indicator | Anatomy systems list |
| Floating Label | `<FloatingField />` | Waitlist form |
| Toast Overshoot | `.k-toast` | Form/quiz feedback |
| Pulse Badge | `.k-pulse-dot` | Streak, live indicator |
| Hover Lift | `.k-lift` | Feature & gamification cards |
| Underline Draw | `.k-underline` | Nav and inline links |
| Stagger Entrance | `.k-stagger` + `--k-i` | Mobile menu, detail panels |

Spring curves are exposed as CSS tokens in `globals.css`: `--ease-spring`, `--ease-out-expo`,
`--ease-in-out-quart`, `--ease-shake`.

## Visual assets

The original atlas artwork used by the homepage and six anatomy-system previews is in `public/images/`.
