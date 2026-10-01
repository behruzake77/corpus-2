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

## Visual assets

The original atlas artwork used by the homepage and six anatomy-system previews is in `public/images/`.
