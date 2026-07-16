# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site + customer request form for JKE Tree & Crane (tree removal, trimming,
stump grinding, crane/bucket truck service, land clearing). Business details (phone,
USDOT number, service area) live in `src/lib/site-config.ts` — update that file, not
individual pages, when they change.

Currently frontend-only: the request form validates client-side and simulates a
submission. No database, auth, office dashboard, or email notifications exist yet
(see `src/components/RequestForm.tsx` for the phase boundary).

## Stack

Next.js 16 (App Router, Turbopack) + TypeScript (strict) + Tailwind CSS v4.
Tailwind theme (colors, fonts) is defined in `src/app/globals.css` via `@theme inline`
— there is no `tailwind.config.js`. Brand colors are `forest`, `forest-light`, `orange`,
`orange-light` (see globals.css for hex values).

## Commands

**Windows path warning:** this folder's name contains `&` (`JKE TREE & CRANE`), which
breaks npm's `.cmd` shims (`npm run <script>` fails with `MODULE_NOT_FOUND` /
`'...' is not recognized`). Renaming the folder to remove the `&` is the real fix.
Until then, invoke the JS entry points directly with `node` instead of `npm run`:

```bash
node node_modules/next/dist/bin/next dev          # instead of npm run dev
node node_modules/next/dist/bin/next build        # instead of npm run build
node node_modules/next/dist/bin/next start        # instead of npm run start
node node_modules/eslint/bin/eslint.js .          # instead of npm run lint
./node_modules/.bin/tsc --noEmit                   # typecheck (works once node_modules exists)
```

If Node/npm aren't on `PATH` in a given shell, they were installed via winget to:
`%LOCALAPPDATA%\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_...\node-v24.18.0-win-x64`.

No test runner is configured.

## Architecture

- `src/lib/services.ts` — single source of truth for the 5 services (slug, title,
  summary, hero image, bullets). The homepage grid, header/footer nav, and
  `src/app/services/[slug]/page.tsx` all read from this array via `generateStaticParams`
  rather than having 5 separate page files — add a service by adding an entry here.
- `src/lib/site-config.ts` — business name/phone/email/USDOT/service area constants.
- `src/components/Header.tsx` — client component (mobile hamburger menu state).
  Desktop nav is `hidden md:flex`; mobile menu is a separate block shown when open.
- `src/components/RequestForm.tsx` — client component, all client-side validation only
  (see `validate()`). Photo uploads use `URL.createObjectURL` for local preview and are
  not uploaded anywhere — there is no backend yet.
- Images live in `public/images/` with descriptive names (sourced from real job-site
  photos, not stock images). Original WhatsApp exports remain in the project root
  untouched as source material.
