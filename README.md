# JKE Tree & Crane — Website

Marketing site and customer request form for JKE Tree & Crane (tree removal,
trimming, stump grinding, crane/bucket truck service, land clearing, and
storm response) serving the Hudson Valley, NY region.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (theme defined in `src/app/globals.css` via
  `@theme inline` — there is no `tailwind.config.js`)
- **Animation:** Framer Motion
- **Fonts:** Inter (body) + Oswald (display/headings), via `next/font/google`

No test runner or backend is configured yet — see [Current phase](#current-phase) below.
For deployment readiness, environment variables, the Jobber integration
handoff, analytics setup, and the pre-launch business-owner checklist, see
[DEPLOYMENT.md](./DEPLOYMENT.md).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

> **Windows path warning:** if this folder is ever checked out to a path
> containing `&` (e.g. `JKE TREE & CRANE`), `npm run <script>` will fail with
> `MODULE_NOT_FOUND` because of how Windows resolves npm's `.cmd` shims. Use a
> path without `&` (this repo lives at `JKE-TREE-CRANE`), or invoke the
> entry points directly with `node node_modules/next/dist/bin/next dev`.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Type-check only (`tsc --noEmit`) |

## Project structure

```
src/
  app/                Route segments (App Router)
    services/[slug]/   Dynamic service detail pages
    gallery/            Project gallery
    request-service/    Customer request form page
    sitemap.ts, robots.ts   Dynamic SEO routes
  components/          Shared UI components
    sections/           Homepage section components
    motion/             Framer Motion wrapper primitives (FadeIn, SlideIn, Stagger, PageTransition)
    ui/                 Generic UI primitives (Button, Section)
  lib/
    site-config.ts       Single source of business info (phone, credentials, reviews, etc.)
    services.ts           Service catalog (single source of truth — homepage grid,
                           nav, and every /services/[slug] page all read from this array)
    media.ts               Media registry — every photo/video used on the site, tagged
                            by category, with curated picks for each homepage section
                            and service page
public/
  images/, videos/, videos/posters/   Optimized site media
```

## Content model

Three files are the source of truth for everything content-related — update
these rather than hardcoding values in components:

- **`src/lib/site-config.ts`** — business name, phone, email, USDOT, service
  area, credentials (licensed/insured flags), reviews, social links. Anything
  left `null`/`false`/`[]` stays hidden on the site rather than being
  fabricated.
- **`src/lib/services.ts`** — the 5 services shown on the homepage grid and
  at `/services/[slug]`. Add a service by adding an entry here; no new page
  files needed (`generateStaticParams` drives the routes).
- **`src/lib/media.ts`** — every photo/video, tagged by category. Drop an
  optimized file into `public/images` or `public/videos` (+ poster), add one
  entry here, and it appears in the Gallery automatically.

  **Photos must be pre-optimized before they're added here.** Raw phone-camera
  PNG exports can run 20–50MB; Next's on-demand image optimizer has to decode
  the full original synchronously on first request, and a file that large can
  take minutes or hang the request entirely (this happened in production).
  Convert to JPEG (quality ~85, long edge capped around 3000–3200px is plenty
  for any layout on this site) before dropping a photo into `public/images`.
  `jke-tree-crane-logo.png` is the one intentional exception — it needs
  transparency, and it's already small.

## Current phase

The request form (`src/components/RequestForm.tsx`) validates client-side
and simulates a submission — there is no database, auth, office dashboard,
or email notification wired up yet. That's the next phase of this build, not
a bug.

### Wiring up a real backend / Jobber

`src/lib/submitServiceRequest.ts` is the single integration boundary —
`RequestForm.tsx` only ever calls `submitServiceRequest()` and never talks to
a backend directly. To connect Jobber (or any CRM/webhook/email endpoint):

1. Replace the simulated `await new Promise(...)` delay in
   `submitServiceRequest.ts` with a real request (e.g. a fetch to a Jobber API
   endpoint, or an internal `/api/*` route that forwards to Jobber).
2. Keep the `ServiceRequestPayload` and `ServiceRequestResult` shapes as they
   are — `RequestForm.tsx` needs no changes on the other side of that swap.
3. Any Jobber API key/secret should be read from a server-side environment
   variable (never exposed to the client) — see the Deployment section below.

## Deployment

Standard Next.js App Router deployment (Vercel recommended — see
[DEPLOYMENT.md](./DEPLOYMENT.md) for why, plus the full environment-variable
list, the Jobber integration boundary, analytics setup, and the domain/SEO
launch checklist). No environment variables are required for the current
phase — see [`.env.example`](./.env.example) for what's documented ahead of
future integrations. Any real secrets should be added as server-side
environment variables on the hosting platform — never committed to the repo
or exposed via `NEXT_PUBLIC_*`.

## Future maintenance notes

- The 12 unoptimized original photos (pre-JPEG-conversion) still sit in
  `public/images` alongside their optimized replacements, unreferenced by any
  code — kept as source material rather than deleted automatically. Safe to
  remove once confirmed no longer needed (see DEPLOYMENT.md's cleanup review
  for the full file list).
- `siteConfig.credentials` (`licensed`, `insured`, `certifications`, etc.) in
  `src/lib/site-config.ts` are intentionally off/empty until the business
  confirms them — flip them on rather than hardcoding trust badges elsewhere.
- No reviews exist yet (`siteConfig.reviews`); the Reviews homepage section
  and its structured-data output both activate automatically once real
  reviews are added there.
