# Content and launch checklist

## Verified and available

- [x] Official event title and all sixteen competition names, categories and exact ordering.
- [x] Monday, 26 October 2026.
- [x] Auditorium / B.S Abdur Rahman Crescent wording.
- [x] School, department and institution branding.
- [x] Original event, college, CSEA and ACM logo files.
- [x] Original brochure JPEG, preserved unchanged and viewable.
- [x] Two clearly readable convenors published.
- [x] Brochure's printed Instagram handle; URL derived from that exact handle.
- [x] Narrow CSE-only eligibility displayed together with the required Crescent-only notice.

## Registration

- [ ] Confirm eligibility discrepancy: brochure “ONLY FOR CSE” versus brief “Crescent students only.” Site currently preserves the narrower restriction.
- [x] Official HTTPS Google Form URL decoded from the supplied brochure QR.
- [x] Clean lossless QR decoded back to the same form URL; the form link loads successfully.
- [x] Published registration mode exposes the QR and direct link without inventing hours.
- [ ] Official opening/closing timestamps and IANA timezone, if the organisers later request a scheduled window.
- [ ] Real-phone scan as an additional device check.

Current registration state: **published official form**. The QR and direct form button appear after the QR image loads. The site does not claim registration hours; it hides actions if the QR fails or after the event date.

## Countdown and lifecycle

- [x] User confirmed a 9 AM start; the countdown uses India time for the Crescent venue.
- [x] Countdown enabled for `2026-10-26T09:00:00+05:30` in `Asia/Kolkata`.
- [x] Days, hours, minutes, and seconds plus the target time/zone are displayed on home and schedule pages.
- [x] Conservative archive behavior is documented; no event results invented.

## Missing official event content

- [ ] Event descriptions, rules, participation requirements and team sizes.
- [ ] Rounds/formats, equipment/software and prizes.
- [ ] Verified per-event faculty and student coordinator names/roles.
- [ ] Higher-resolution faculty/student small print or authoritative typed list to resolve uncertain spellings and initials.
- [ ] Official contact numbers, emails and messaging links.
- [ ] Timed programme/schedule entries.
- [ ] Verified street address, any specific auditorium name and directions.
- [ ] Any official additional FAQ answers and announcements.

These fields remain absent internally and corresponding optional sections stay hidden. No fabricated descriptions, rules or placeholder tokens are public.

## Assets

- [ ] Original brochure PDF for a true PDF download; current action opens the supplied image.
- [ ] Official default social-sharing image.
- [ ] Optional per-event social images and decorative artwork.
- [ ] Optional licensed intro sound; intro currently silent, with no nonfunctional sound toggle.
- [x] Local font files and licences.

## Deployment and final review

- [ ] Explicit user authorisation to deploy. No deployment has taken place.
- [ ] Actual HTTPS production origin for canonical/OG URLs and sitemap.
- [ ] Confirm public wording and privacy description with organisers.
- [ ] Check the derived Instagram URL and current ownership before launch.
- [ ] Verify native iPhone Safari, macOS Safari, Firefox and Android Chrome.
- [ ] Review with a screen reader and real touch devices. Automated accessibility testing is not full conformance certification.
- [ ] After authorised deployment, test deep links, refreshes, genuine 404 status and registration state on Vercel.

Optional missing content/assets do not prevent a valid local production build. The registration-specific omissions deliberately prevent registration actions from opening.
