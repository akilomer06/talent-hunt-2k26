# TALENT HUNT 2K26

A complete backend-free event website built from the supplied official brochure. Includes the homepage, two category directories, sixteen dedicated competition pages, schedule, registration, about, venue, FAQs, contact, privacy and a real static 404.

**Local review build. The updated official brochure, verified registration QR, and Google Form link are configured.**

## Run locally

Requirements: Node.js 22.12+ (Node 24 recommended), npm, and a modern browser. Development was verified on Windows with Node 24.18.0 and npm 11.16.0.

```powershell
cd talent-hunt-2k26
npm ci
npm run dev
```

Vite prints the development URL, normally `http://127.0.0.1:5173`. The development server renders client-side. To inspect the real static production pages:

```powershell
npm run build
npm run preview
```

Production preview: `http://127.0.0.1:4173`. The included preview server returns a 404 status for invalid URLs and resolves the generated directory pages. It is a local QA utility, not a required production backend. Stop with Ctrl+C.

## Stack and architecture

- React 19.3.0, TypeScript 6.0.3, Vite 8.3.4.
- React Router 7.18.4; Framer Motion 14.2.0; Tailwind CSS 4.3.3.
- Vitest 5.0.4 and React Testing Library 16.3.3.
- Playwright 1.64.0 and axe-core 4.13.0 for browser and accessibility checks.
- Barlow / Barlow Condensed 5.3.0 packages, locally bundled under the SIL Open Font License.

Exact dependency versions are pinned in `package.json` and `package-lock.json`. Additional dependencies serve local fonts, build integration, testing, linting and formatting; no backend services are introduced.

`src/data/siteData.ts` is the single editable content and configuration source. `src/lib/content.ts` provides pure validation, registration, countdown, search, route and metadata helpers. Reusable interactions and layout live in `src/components`; page templates are in `src/pages/Pages.tsx`. Design tokens and responsive treatments are in `src/styles/global.css`.

The generated `vercel.json` and static HTML derive their route inventory from the same data. Do not manually maintain a second competition list in routing or metadata.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run test:browser
npm run format:check
```

`npm run verify` runs type checking, lint, unit/component tests and the production build. `npm run test:browser` uses installed Chrome and Edge. Its server starts automatically if port 4173 is free, or reuses the existing preview. Run the build first. Browser results are written to `playwright-report` and `test-results`; `npx playwright show-report` opens the report. Browser binaries must exist locally; the test config uses the `chrome` and `msedge` channels. This does not test native iOS/Android browsers.

## Build-time pre-rendering

The selected solution is **Vite 8.3.4 native SSR plus React DOM 19.3.0 `renderToString`**, used only at build time. This follows Vite's documented pre-rendering pattern: [Vite SSR / pre-rendering](https://vite.dev/guide/ssr). It avoids an extra runtime server or an unmaintained snapshot plugin.

The build makes the client bundle, creates a temporary SSR bundle in `.prerender`, then `scripts/prerender.mjs` renders all 26 public routes and the 404. Every file contains actual page markup and its own title, description and Open Graph/Twitter metadata before JavaScript executes. React hydrates this markup on arrival. Local fonts and assets work without external CDNs.

`scripts/verify-build.mjs` checks each generated page, its metadata, linked routes/assets and the generated Vercel routing configuration. Output is `dist/`. `.prerender/` is a build intermediate and must not be deployed.

Canonical URLs, `og:url` and sitemap generation activate only after `settings.productionUrl` is configured with the real HTTPS origin. Social images remain absent until official artwork is supplied. A default social image is used only when the configured local file exists. No deployment URL or social preview is invented.

## Update official content

1. Read `BROCHURE_CONTENT_AUDIT.md` and `CONTENT_CHECKLIST.md`.
2. Edit `src/data/siteData.ts`. All optional rules, requirements, formats, equipment, prizes, contacts, related-event IDs, artwork and FAQs can be added to the event records there. Do not edit generated HTML.
3. Put original assets in the documented `public/assets` folders. See `ASSET_GUIDE.md`.
4. Run `npm run verify`, then browser checks.
5. Review the production preview before publishing.

**Eligibility discrepancy:** the brief said Crescent students only; the brochure says “ONLY FOR CSE.” The site uses the narrower “For Crescent CSE students only” and preserves the explicit Crescent restriction. Confirm with the organisers before widening eligibility. The brochure provides no individual competition descriptions; the site therefore avoids inferring rules from names or artwork.

Coordinator names with uncertain small-print spelling remain in audit notes rather than public content. Only the two clearly readable convenors are published. Add verified coordinator records to the global list and/or specific event arrays when supplied. Unknown contact methods are hidden.

### Configure registration

The current `registration.mode` is `published`: the QR in the newly supplied brochure was decoded to `https://forms.gle/mzuWoGeCKZWcVVZq5`. A clean lossless QR was produced from the identical URL and independently decoded to confirm the match. The form link resolves to the Talent Hunt ’26 Google Form. QR and form actions are available after the QR loads; no opening or closing timestamps are implied.

For a future timed window, set `mode: "scheduled"` and supply `opensAt`, `closesAt`, and `timezone`. Both modes require a verified QR and an HTTPS Google Form URL on `forms.gle` or `docs.google.com/forms/`. Verify any replacement QR against the configured form URL before setting `qrVerified: true`.

Opening/closing values use ISO 8601 timestamps including seconds and a numeric UTC offset (or Z); timezone is an IANA name. The wall time and offset must actually match that timezone, and closing must follow opening. These are configuration formats, not suggestions for the event's actual timezone or hours.

In scheduled mode, all timing fields must be valid. Before opening it shows “Registration Opens Soon”; the exact opening instant becomes open; the exact closing instant becomes closed. In published mode, timing fields remain empty and the status is “Official registration.” QR/form actions appear only after the local QR image successfully loads. A failed QR hides both actions. The archive state hides registration actions after the event date. No student data is sent to this website.

### Configure countdown and archive

The countdown targets 26 October 2026 at **9:00 AM India Standard Time**, following the user's confirmed 9 AM start time and the Crescent venue's local timezone. Configuration: `enabled: true`, `startsAt: "2026-10-26T09:00:00+05:30"`, `timezone: "Asia/Kolkata"`. The visible caption identifies the time and zone. Any future target must use an offset-qualified instant matching the configured IANA zone and event date; update the caption alongside the target.

The timer clamps at zero and displays the configured end-of-countdown message. The event archive activates after the confirmed event date in the configured official timezone. If no timezone has been supplied, it waits until that calendar date has ended everywhere (27 October 2026 at 12:00 UTC). This conservative global archive boundary is a technical fallback, not an invented official event start/end time. Results, photos and achievements are not fabricated.

### Announcements and browser state

Announcements default to an empty list. Each configured announcement needs a unique ID. Dismissal records `th26:announcement:<id>` in localStorage, leaving new announcements visible. The intro stores `th26:intro` in sessionStorage. Scroll positions store `th26:scroll:<path+query|history-key>` in sessionStorage. A temporary memory fallback handles denied storage. Search/filter values are URL query parameters and therefore survive Back/Forward. Privacy copy describes this behavior.

### Motion and accessibility

Fixed dark theme; semantic landmarks; visible keyboard focus; native modal mobile navigation with focus containment, Escape dismissal and focus return; accessible accordion and carousel controls; per-action status messages; inert outgoing routes during transitions. Shared-element art/title transitions link cards and detail pages. Native Share appears only when supported; Copy Link has a manual fallback. Intro is silent, skippable and session-scoped. Optional sound requires a click. Reduced motion skips the intro, stops carousel autoplay and suppresses large transitions.

Carousel autoplay pauses on hover, focus or its Pause control. It does not move focus. No map, analytics, tracking pixels, authentication, forms backend or database is included. Automated checks support the WCAG 2.2 AA target; they are not a certification of complete conformance.

## Vercel deployment — only after explicit authorisation

1. Finish the launch checklist and review the latest production build.
2. Put this project directory in a Git repository, or use it as the Root Directory in a repository containing other work.
3. In Vercel, import that repository. Select **Other** if framework selection would override the committed configuration.
4. Root Directory: `talent-hunt-2k26` if it is a subfolder; otherwise the repository root.
5. Install command: `npm ci`. Build command: `npm run build`. Output directory: `dist`. No runtime environment variables are required. Use Node 24.x or another supported version meeting Vite's requirements.
6. The generated `vercel.json` maps verified deep links to their static HTML, serves existing files, and returns `/404.html` with status 404 for everything else. Do not add an SPA catch-all to `/index.html`.
7. Deploy only when authorised. Verify home, both directories, a refreshed event URL, an unknown URL, registration state and mobile navigation on the resulting host.
8. Once the actual production origin is known, set `settings.productionUrl`, rebuild and redeploy to generate canonical URLs and a sitemap.

No deployment was performed as part of this build; remote Vercel serving remains a post-authorisation check.

## Troubleshooting and limits

- Keep `package-lock.json` committed, but never commit `node_modules/`, `dist/`, `.prerender/`, or generated test reports. Windows npm launchers committed with Git mode `100644` cannot execute on Vercel's Linux workers and can cause `tsc: Permission denied`. Install dependencies on the target platform with `npm ci`; do not repair committed launchers with `chmod` or bypass type checking. For this repository, Vercel's Root Directory is `logo-countdown-review`, with Install Command `npm ci`.
- On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`. Lint/format runners explicitly read OneDrive file placeholders instead of relying on CLI glob traversal.
- If port 4173 is occupied by a different project, stop that process or change the port in `scripts/serve.mjs` and Playwright config together.
- After changing content or assets, rebuild before `npm run preview`; the preview serves `dist`, not source.
- Missing optional assets are hidden; double-check local paths and rebuild. QR validity requires a real scan and a confirmed form URL, not just an image extension.
- Build validation intentionally rejects duplicate or reserved event slugs, invalid order, related IDs and duplicate announcements.
- Official rules/timings/registration assets and some names remain outstanding. Firefox, macOS Safari, iPhone Safari and Android Chrome require device/browser verification; desktop viewport emulation is not a substitute.
- Original logo files are preserved. The Crescent logo uses a monochrome CSS treatment and screen blending for a clean appearance on dark surfaces. The CSEA source is approximately 1 MB and is lazy-loaded in the footer.

See `TEST_REPORT.md` for actual results, observed defects and remaining verification limits.
