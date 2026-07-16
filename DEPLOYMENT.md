# Deployment & Handoff Guide

This document is for whoever deploys, maintains, or hands off this project
next — a developer who has never seen the codebase, or the business owner /
website manager coordinating launch. It covers deployment readiness,
environment variables, the Jobber integration boundary, analytics setup, the
domain/SEO checklist, and what needs business-owner sign-off before this goes
live. For local development, architecture, and the content model (how to
update services, media, and business info), see [README.md](./README.md).

**Nothing in this document has been deployed, connected, or verified live.**
It's a readiness audit and a checklist — the actual deployment, domain
configuration, and third-party account connections are separate, deliberate
steps for whoever has the credentials to do them.

---

## 1. Deployment Audit

### Recommended platform: Vercel

This is a standard Next.js 16 App Router project with no database and no
custom server — it's built for exactly the deployment model Vercel exists
for. Reasons this is the best-supported target for the current architecture:

- **Zero-config Next.js support.** Vercel is built by the Next.js team;
  `next build` output (static pages, the dynamic `/services/[slug]` routes,
  `sitemap.ts`/`robots.ts`) all work without any platform-specific
  configuration.
- **Built-in image optimization.** The site uses `next/image` extensively
  (every photo, all `fill`-based hero/section images). Vercel's image
  optimization is automatic; a generic Node host needs `sharp` installed
  explicitly for the same reliability (see note below).
- **Simple environment variables.** When Jobber/analytics are wired up (see
  below), Vercel's dashboard is a straightforward place to manage secrets per
  environment (production/preview/development).
- **Automatic HTTPS and easy custom-domain + www/non-www redirect setup** —
  see Section 5.
- **Serverless functions ready.** Wiring up Jobber will need at least one
  server-side route (see Section 3) — Vercel runs this with no extra setup.

**Alternative:** any Node.js host that can run `next build && next start`
(Railway, Render, a VPS with a process manager) will also work, but requires
more manual ops: process management, TLS certificates, and — importantly —
**`sharp` should be added as an explicit `dependency` in `package.json`** for
reliable image optimization in that scenario. It's already present
transitively (pulled in by Next.js itself, confirmed in `package-lock.json`),
but Next's own guidance is to declare it explicitly for self-hosted
deployments. This wasn't changed in this pass since it's a one-line addition
best made at the point someone actually chooses a non-Vercel host.

### Build & route inventory (confirmed via `next build`)

```
┌ ○ /                          Static
├ ○ /_not-found                Static (custom branded 404)
├ ○ /crew                      Static
├ ○ /gallery                   Static
├ ○ /request-service           Static
├ ○ /robots.txt                Static (generated)
├ ● /services/[slug]           SSG — 5 paths (generateStaticParams)
└ ○ /sitemap.xml               Static (generated)
```

Every route is static or statically-generated at build time — there is no
server-rendered-per-request page and no API route yet. This means the
current site could even be deployed as a fully static export, **except**
that `next/image` optimization (used throughout) requires either Vercel or a
Node runtime; a true `output: 'export'` static build would need
`images.unoptimized: true` and would lose on-demand image resizing. Not
recommended — the Node/Vercel deployment model is the right fit here and
requires no compromise.

### Environment-variable requirements today

**None.** The site builds and runs with zero environment variables. All
business data lives in version-controlled source files
(`src/lib/site-config.ts`, `services.ts`, `media.ts`) by design — see
README's "Content model" section. This will change once Jobber or analytics
are connected; see `.env.example` and Sections 2–3 below.

### Server-only vs. client-only code

Already audited and correctly separated (confirmed in the prior engineering
pass): 12 components use `"use client"`, every one because it genuinely needs
browser APIs, React state, or direct Framer Motion usage. Everything else —
including all data-fetching-equivalent logic (`site-config.ts`, `services.ts`,
`media.ts` reads) — renders on the server by default. There is no
client-exposed secret anywhere in the current codebase (confirmed by grep —
no API keys, tokens, or credentials of any kind exist in `src/`).

### Public assets

`public/images/` and `public/videos/` (+ `public/videos/posters/`) contain
all site media, referenced exclusively through `src/lib/media.ts`. See
Section 7 for cleanup candidates within these folders.

---

## 2. Environment Variables

See [`.env.example`](./.env.example) — every variable is documented there
with an explanation of what it's for and whether it's public-safe
(`NEXT_PUBLIC_*`) or must stay server-only. Summary:

| Variable | Required now? | Public-safe? | Purpose |
|---|---|---|---|
| *(none)* | — | — | The site needs zero env vars today |
| `JOBBER_CLIENT_ID` | Future | No — server-only | Jobber OAuth2 app credential |
| `JOBBER_CLIENT_SECRET` | Future | No — server-only | Jobber OAuth2 app credential |
| `JOBBER_REFRESH_TOKEN` | Future | No — server-only | Jobber account access |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Future, optional | Yes | Google Analytics 4 |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Future, optional | Yes | Microsoft Clarity |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Future, optional | Yes | Search Console (meta-tag method only) |
| `RESEND_API_KEY` | Future, optional | No — server-only | Email copy of leads, if wanted alongside Jobber |
| `FORM_NOTIFICATION_EMAIL` | Future, optional | No — server-only | Destination for the above |

No real values are filled in anywhere — `.env.example` contains placeholders
and explanatory comments only, and every line is commented out. No `.env`,
`.env.local`, or other real env file exists in this repo.

---

## 3. Jobber Integration Handoff

**Status: not connected. Nothing here has been simulated or faked.**

### Current request-form flow

1. A visitor fills out `/request-service`, rendered by
   `src/components/RequestForm.tsx` (client component — all client-side
   validation, no network calls of its own).
2. On submit, `RequestForm.tsx` calls a single function:
   `submitServiceRequest()`, imported from `src/lib/submitServiceRequest.ts`.
3. Today, that function `await`s a 600ms simulated delay and always returns
   `{ ok: true }`. **This is the entire mock** — there is no database, no
   network request, no data persisted anywhere.
4. `RequestForm.tsx` shows a success or error state based on that return
   value and never touches the backend directly otherwise.

### Exact file to connect Jobber in

**`src/lib/submitServiceRequest.ts`** — this is the one and only integration
boundary, by design. `RequestForm.tsx` needs zero changes to work with a real
backend as long as this function's contract (below) is preserved.

```ts
export interface ServiceRequestPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;   // one of the 5 service slugs, or "other"
  description: string;
  urgency: string;       // "emergency" | "few-days" | "few-weeks" | "no-rush"
  contactMethod: string; // "phone" | "text" | "email"
  photos: File[];        // up to 6 files, browser File objects
}

export interface ServiceRequestResult {
  ok: boolean;
  error?: string;
}
```

### Required credentials / account access

- A Jobber account with API access enabled (Jobber's developer/API access is
  tied to specific plan tiers — confirm the business's current plan supports
  it).
- A registered Jobber OAuth2 app (via Jobber's developer portal) to obtain a
  client ID and client secret.
- Completion of Jobber's OAuth authorization flow once, to obtain a refresh
  token tied to the business's actual Jobber account — this is not a
  one-time API key, it's a per-account authorization.
- Confirm current field names/IDs against Jobber's live API docs before
  implementing — API surfaces change, and the exact mutation (e.g. creating a
  Client + Request, or just a Request) needs to be decided based on how the
  business wants leads to land in Jobber.

### Recommended server-side integration approach

Do **not** call Jobber's API directly from the browser — `JOBBER_CLIENT_ID`/
`JOBBER_CLIENT_SECRET`/`JOBBER_REFRESH_TOKEN` must never reach client-side
JavaScript. Recommended shape:

1. Add a Next.js Route Handler, e.g. `src/app/api/request-service/route.ts`,
   as a `POST` endpoint that runs server-side only.
2. `submitServiceRequest.ts` calls `fetch("/api/request-service", { method:
   "POST", body: ... })` instead of simulating a delay.
3. The route handler reads the Jobber credentials from `process.env`
   (server-only, never `NEXT_PUBLIC_*`), exchanges the refresh token for a
   fresh access token if needed, and makes the actual Jobber API call.
4. Photos: `File[]` objects need to be uploaded as `multipart/form-data` (or
   converted to base64 in the request body) since they can't be JSON-
   serialized directly — decide whether Jobber accepts file attachments on
   lead creation, or whether photos need a separate upload step / different
   handling (e.g. emailing them, or storing them and linking in the Jobber
   note).

### Expected success and failure behavior

Preserve exactly what `RequestForm.tsx` already expects:

- **Success:** return `{ ok: true }`. The form shows its existing "Request
  received" confirmation state — no changes needed there.
- **Failure:** return `{ ok: false, error: "..." }` (the `error` string isn't
  currently displayed to the user — `RequestForm.tsx` just shows a generic
  "Please fix the highlighted fields..." banner on any `ok: false`, so if a
  more specific failure message is wanted, `RequestForm.tsx` would need a
  small update to surface `result.error` instead of the generic banner).
- **Network/exception handling:** wrap the real Jobber call in a try/catch
  inside `submitServiceRequest.ts` and return `{ ok: false, error: "..." }`
  on any failure rather than letting an exception propagate — the form has
  no other error boundary around this call.

### Security considerations

- Credentials stay server-side only (`process.env`, never `NEXT_PUBLIC_*`,
  never committed — see `.env.example` and `.gitignore`).
- The existing honeypot field (`RequestForm.tsx`, the hidden `company` input)
  already provides basic bot-submission filtering before any request reaches
  `submitServiceRequest()` — preserve this when wiring up the real call.
- Consider basic rate-limiting on the new API route once it exists (e.g. by
  IP) to prevent abuse, since it will be a public, unauthenticated endpoint.
- Validate the payload server-side too, not just client-side — the client
  validation in `RequestForm.tsx` can be bypassed by anyone calling the API
  route directly.

### How to test a real lead submission end-to-end

Once connected: submit a real test request through the live `/request-
service` form (using a real, disposable test name/contact so it's obviously
identifiable in Jobber), confirm it appears correctly in the Jobber account
with all fields mapped as expected, then delete/archive the test lead in
Jobber. Repeat for at least one submission with photos attached and one
without, and one for each `urgency` value if the mapping differs per value.

---

## 4. Analytics and Search Setup Plan

No placeholder IDs have been added anywhere in the codebase — every
integration below is documented, not scaffolded with fake values, per this
pass's instructions. Env var names are pre-defined in `.env.example` for
whoever implements each one.

### Google Analytics 4

- **Belongs:** a small client component loaded from `src/app/layout.tsx` (a
  `<Script>` from `next/script`, strategy `afterInteractive`), gated on
  `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID` being present — so it's simply
  absent from the page entirely until that env var is set.
- **Account access needed:** a Google Analytics account with a GA4 property
  created for the final production domain.
- **Value needed:** the GA4 Measurement ID (`G-XXXXXXXXXX`), set as
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Verify after deployment:** GA4 Realtime report shows a session while
  browsing the live site.

### Google Search Console

- **Belongs:** no code changes needed for DNS or file-upload verification
  (the two most common methods). If HTML-meta-tag verification is preferred
  instead, the token goes in `layout.tsx`'s `metadata.verification.google`
  field, sourced from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Account access needed:** a Google account with access to (or ownership
  of) the production domain's DNS, or the ability to upload a file to the
  site root, or edit access to this repo for the meta-tag method.
- **Value needed:** depends on method chosen — a DNS TXT record, an HTML
  file to place in `public/`, or a verification token.
- **Verify after deployment:** submit `https://<domain>/sitemap.xml` (already
  generated dynamically by `src/app/sitemap.ts`) in Search Console once
  verified, then confirm it's indexed without errors.

### Microsoft Clarity (optional)

- **Belongs:** same pattern as GA4 — a gated `next/script` tag in
  `layout.tsx`, keyed on `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- **Account access needed:** a Microsoft Clarity account with a project
  created for the production domain.
- **Value needed:** the Clarity project ID.
- **Verify after deployment:** session recordings/heatmaps begin appearing
  in the Clarity dashboard within a few minutes of live traffic.

### Google Business Profile

- **Not a code integration** — this is entirely account-side (claiming/
  verifying the business listing on Google). The one place it connects to
  this codebase is `siteConfig.reviews.aggregate` and
  `siteConfig.social.google` in `src/lib/site-config.ts` — once the business
  has real Google reviews, the aggregate rating and a link can be added there
  and the (currently hidden) homepage Reviews section will activate
  automatically. Do not fill these in with placeholder or estimated values.

**No code scaffolding was added for any of these** — per this pass's
instruction to avoid placeholder IDs or code that could silently affect
production. All four are ready to wire up in under an hour each once real
account values exist, following the "Belongs" notes above.

---

## 5. Domain and SEO Launch Checklist

| Item | Current state | Needs business-owner input? |
|---|---|---|
| Production site URL | `https://www.jketreeandcrane.com` — hardcoded in `src/lib/site-config.ts` (`url` field) | **Yes — confirm this is the real, purchased, final domain** before launch |
| `metadataBase` (SEO/OG resolution) | Derived from `siteConfig.url` in `src/app/layout.tsx` | Automatically correct once `siteConfig.url` is confirmed |
| Canonical URLs | Set per-page via `alternates.canonical` on every route (confirmed present on all 5 top-level routes + dynamic service pages) | No — already correct, relative to `metadataBase` |
| Open Graph URLs/images | Configured in `layout.tsx`, image sourced from the same `heroImage` the homepage renders (kept in sync automatically) | No — verify visually after deploy with a link-preview tool |
| Sitemap | Dynamically generated at `/sitemap.xml` (`src/app/sitemap.ts`), lists all static + dynamic routes | No — already correct |
| Robots.txt | Dynamically generated at `/robots.txt` (`src/app/robots.ts`), allows all crawling, points to the sitemap | No — already correct |
| Favicon | `src/app/favicon.ico` exists and is served automatically by Next.js | No, though see Section 7 — no `apple-touch-icon` exists yet (minor, optional) |
| Social-share preview | OG/Twitter card metadata present; actual rendered preview depends on the confirmed domain being live and reachable | Verify after deploy using a real link-preview tool (e.g. paste the URL in a private Slack/Discord message, or use a dedicated OG-preview checker) |
| HTTPS | Not yet applicable — no host chosen | **Yes** — required regardless of host; automatic on Vercel, needs explicit TLS setup on any other host |
| www vs. non-www redirect | Not yet configured — no host chosen | **Yes — decide which is canonical** (`siteConfig.url` currently assumes `www.`). On Vercel this is a one-click redirect rule once the domain is added; other hosts need explicit redirect config |

**Do not treat `https://www.jketreeandcrane.com` as confirmed** — it is the
placeholder that was already in `site-config.ts` before this pass and has
not been independently verified against a real domain purchase.

---

## 6. Business-Owner Verification Checklist

Everything below is either already live on the site or ready to go live the
moment it's confirmed. Nothing unverified is currently displayed — this
checklist is what to confirm or correct **before** launch, not what's broken.

- [ ] **Company name** — currently "JKE Tree & Crane" / legal name "JKE
      Contracting Inc." (`src/lib/site-config.ts`)
- [ ] **Phone number** — currently `845-721-0772`
- [ ] **Email address** — currently `info@jketreeandcrane.com`
- [ ] **Service areas** — currently Dutchess, Putnam, Orange, and Ulster
      Counties, NY, plus a specific list of towns (Poughkeepsie, Fishkill,
      Wappingers Falls, Hopewell Junction, Beacon, Cold Spring, Carmel,
      Mahopac, Brewster, Newburgh, Middletown, Kingston)
- [ ] **Business hours** — not currently displayed anywhere on the site
      (`siteConfig.hours` is empty by design — nothing to correct, but
      confirm this is intentional rather than an oversight)
- [ ] **Emergency-service wording** — "24/7 Emergency Service" appears in the
      homepage trust bar; confirm this is accurate to how the business
      actually operates before launch
- [ ] **Free-estimate wording** — "Free Estimates" / "Request a Free
      Estimate" appears throughout; confirm estimates are, in fact, always
      free with no exceptions
- [ ] **Licensed status** — currently **off/hidden** (`credentials.licensed:
      false`) — confirm whether the business is licensed and, if so, provide
      a license number to enable this trust badge
- [ ] **Insured status** — currently **off/hidden**
      (`credentials.insured: false`) — confirm and enable only once verified
- [ ] **Certifications** — currently **empty/hidden**
      (`credentials.certifications: []`) — e.g. ISA Certified Arborist, TCIA
      membership, if applicable
- [ ] **Jobber account and form destination** — confirm Jobber plan supports
      API access, and decide exactly what should happen in Jobber when a
      lead comes in (new Client + Request? Just a Request?) before
      implementation (see Section 3)
- [ ] **Social-media links** — currently **empty/hidden**
      (`siteConfig.social`) — provide real Google Business, Facebook, and/or
      Instagram URLs to enable
- [ ] **Final domain** — confirm `jketreeandcrane.com` (with `www`) is the
      correct, purchased, final production domain (see Section 5)

---

## 7. Cleanup Review

| Path | Reason | Classification |
|---|---|---|
| `public/images/black-dump-blue-crane.png`, `blue-crane.png`, `crane-lifting-branch-house.png`, `crane-log-house.png`, `crane-removing-tree-off-house.png`, `crane-tree-shed.png`, `emergency-night.png`, `jke-crew.png`, `loader-moving-log.png`, `log-moved-by-crane.png`, `white-truck-chipper.png`, `worker-next-to-chipper.png` (12 files, ~136MB total) | Original oversized PNG exports (one was 50MB and caused a real image-optimizer hang in production testing). Already replaced with optimized `.jpg` equivalents, which are what `src/lib/media.ts` actually references — confirmed via grep that none of these `.png` paths are referenced anywhere in `src/`. Visual quality of the replacements was verified side-by-side. | **Safe to delete after manual confirmation.** Not deleted automatically in this or prior passes — these are the original uploaded photos and deleting them wasn't something explicitly requested by name. |
| `WhatsApp Image 2026-07-13 *.jpeg` (7 files), `WhatsApp Video 2026-07-13 *.mp4` (6 files), in the project root | Raw WhatsApp export source material. Not referenced by any code (they live outside `public/`, so they're not part of the deployed site). `CLAUDE.md` explicitly documents these as intentional: "Original WhatsApp exports remain in the project root untouched as source material." | **Keep** — explicitly intentional per project documentation, not deployment bloat (outside `public/`, never shipped to the live site). |
| `.next/` | Next.js build output | **Keep as-is** — already gitignored, regenerated on every build, not a real artifact to manage |
| `tsconfig.tsbuildinfo` | TypeScript incremental build cache | **Keep as-is** — already gitignored, regenerated automatically |
| Temporary screenshots, CDP scripts, chrome profiles used during this session's testing | None exist inside the project directory — all verification tooling this session ran from an isolated OS temp directory outside `JKE-TREE-CRANE`, never committed here | **N/A — nothing to clean up in the repo itself** |

No duplicate media was found within `public/images` or `public/videos`
beyond the original/optimized pairs listed above (each has a distinct
subject or angle — confirmed during the earlier media-integration pass).

---

## Summary: exact remaining steps before deployment

1. **Business owner confirms** every item in Section 6, especially the final
   domain (Section 5) and licensed/insured status.
2. **Choose and provision hosting** (Vercel recommended — Section 1).
3. **Point the confirmed domain** at the host, with HTTPS and a www/non-www
   redirect decision (Section 5).
4. **Decide on and implement the Jobber integration** (Section 3) — this is
   real engineering work, not a config toggle, and needs Jobber account
   access before it can start.
5. **Optionally wire up analytics** (Section 4) once real account IDs exist.
6. **Manually delete the 12 obsolete original PNGs** (Section 7) once
   confirmed no longer needed — not done automatically.
7. Re-run `npm run lint && npm run typecheck && npm run build` after any of
   the above changes, and do a final manual click-through of the live site
   before announcing launch.
