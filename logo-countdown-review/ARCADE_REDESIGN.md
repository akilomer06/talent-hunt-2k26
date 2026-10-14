# Talent Hunt arcade redesign

The site now uses a graphite, orange, and lime arena interface: an interactive home console, motion through the page transitions and event cards, a player status control, redesigned supporting templates, and the dark mobile menu.

The optional explorer pass stores a personal event shortlist, unique discoveries, five badges, warm-up progress, and a motion preference on the current device. Visiting an event gives 25 XP once; each new best Signal Sync round gives 40 XP once. XP and badges are browsing features and have no effect on official results, registration, or eligibility. The four-round memory game supports buttons, keyboard arrows, and a pattern hint. Reset requires an explicit confirmation in the site.

The previously approved 2 convenors, 10 faculty coordinators, and 11 student coordinators remain. Technical and Non-Technical coordinator tabs still show their pending-name placeholders. Official event data, assets, the QR/form link, countdown, static routes, TypeScript strictness, and Vercel route configuration remain intact. No new dependency was added.

## Validation

- Type checking and lint passed.
- All 33 unit/component tests passed, including storage validation and score/badge integrity.
- 46 Chrome/Edge browser cases passed across the full suite and focused reruns after corrections. Coverage includes route hydration, metadata, accessibility, countdown/archive timing, registration failure handling, intro dismissal/replay, mobile navigation, responsive widths, Back/Forward scroll restoration, shortlists, resets, game failure/replay, blocked storage, motion preferences, and all five coordinator groups.
- Client and SSR builds passed. Prerendering produced 28 pages; build verification checked static content, 28 unique titles, metadata, 37 local links/assets, and Vercel routes.
- Desktop preview source and production output were synchronized with the deployment project.

The browser checks use installed desktop Chrome and Edge with responsive viewports. They do not establish native iOS/Safari or Android-device results, or guarantee the absence of every possible defect.

## Maintain the experience

- `src/components/Arcade.tsx`: home console, explorer pass, quest tabs, and Signal Sync.
- `src/components/Explorer.tsx`: client-only storage, discovery tracking, status controls, and bookmark actions.
- `src/lib/explorer.ts`: storage validation, XP, and badge rules.
- `src/styles/arcade.css`: the shared visual system and motion preferences.
- `src/data/siteData.ts`: official event and coordinator content; privacy copy describes the new storage.

Framework and motion dependencies are split into cacheable bundles using Vite's existing Rolldown build pipeline. The SSR/prerender scripts and generated Vercel route configuration are retained. Keep dependencies, temporary SSR output, builds, and browser reports out of Git.
