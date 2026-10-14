# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: countdown.spec.ts >> the timer ends exactly at 9 AM IST and the archive waits until the date ends
- Location: tests\countdown.spec.ts:35:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.date-strip').locator('.countdown[aria-label="Time until event"]').locator('strong')
Timeout: 5000ms
- Expected  - 6
+ Received  + 1

- Array [
-   "00",
-   "00",
-   "00",
-   "02",
- ]
+ Array []

Call log:
  - Expect "toHaveText" locator('.date-strip').locator('.countdown[aria-label="Time until event"]').locator('strong') with timeout 5000ms
  - waiting for locator('.date-strip').locator('.countdown[aria-label="Time until event"]').locator('strong')
    14 × locator resolved to 0 elements

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to content" [ref=e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - link "Talent Hunt 2K26 home" [ref=e5] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]:
        - text: TALENT HUNT
        - generic [ref=e7]: 2K26 / CRESCENT
    - navigation "Main navigation" [ref=e8]:
      - link "Home" [ref=e9] [cursor=pointer]:
        - /url: /
      - link "Technical Events" [ref=e10] [cursor=pointer]:
        - /url: /events/technical
      - link "Non-Technical Events" [ref=e11] [cursor=pointer]:
        - /url: /events/non-technical
      - link "Schedule" [ref=e12] [cursor=pointer]:
        - /url: /schedule
      - link "Coordinators" [ref=e13] [cursor=pointer]:
        - /url: /coordinators
      - link "About" [ref=e14] [cursor=pointer]:
        - /url: /about
      - link "Venue" [ref=e15] [cursor=pointer]:
        - /url: /venue
      - link "FAQs" [ref=e16] [cursor=pointer]:
        - /url: /faqs
      - link "Contact" [ref=e17] [cursor=pointer]:
        - /url: /contact
    - link "Register" [ref=e18] [cursor=pointer]:
      - /url: /register
      - text: Register
      - generic [aria-hidden] [ref=e19]: ↗
  - main [ref=e20]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - paragraph [ref=e25]: TALENT HUNT 2K26 / SCHEDULE
        - heading "The Programme" [level=1] [ref=e27]
      - region "Event date" [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]: "26"
          - generic [ref=e31]:
            - strong [ref=e32]: OCTOBER 2026
            - generic [ref=e33]: MONDAY
        - generic [ref=e34]:
          - generic [aria-hidden] [ref=e35]: ↗
          - generic [ref=e36]:
            - strong [ref=e37]: AUDITORIUM
            - generic [ref=e38]: B.S. Abdur Rahman Crescent
      - generic [ref=e40]:
        - generic [ref=e42]:
          - strong [ref=e43]: 26 OCT
          - text: MONDAY / 2026
        - generic [ref=e44]:
          - heading "A day for your talent." [level=3] [ref=e45]
          - paragraph [ref=e46]: The event date is confirmed. The detailed programme and timings will be announced by the organisers.
  - contentinfo [ref=e47]:
    - generic [ref=e48]:
      - generic [ref=e49]:
        - paragraph [ref=e50]: YOUR TALENT. YOUR MOMENT.
        - link "TALENT HUNT 2K26" [ref=e51] [cursor=pointer]:
          - /url: /
          - text: TALENT HUNT
          - generic [ref=e52]: 2K26
        - paragraph [ref=e53]: Sixteen competitions. Your talent, in the spotlight.
      - generic [ref=e54]:
        - heading "Explore" [level=2] [ref=e55]
        - link "Technical Events" [ref=e56] [cursor=pointer]:
          - /url: /events/technical
        - link "Non-Technical Events" [ref=e57] [cursor=pointer]:
          - /url: /events/non-technical
        - link "Schedule" [ref=e58] [cursor=pointer]:
          - /url: /schedule
        - link "Coordinators" [ref=e59] [cursor=pointer]:
          - /url: /coordinators
        - link "About" [ref=e60] [cursor=pointer]:
          - /url: /about
        - link "Venue" [ref=e61] [cursor=pointer]:
          - /url: /venue
        - link "FAQs" [ref=e62] [cursor=pointer]:
          - /url: /faqs
        - link "Contact" [ref=e63] [cursor=pointer]:
          - /url: /contact
      - generic [ref=e64]:
        - heading "Stay connected" [level=2] [ref=e65]
        - link "@talent.hunt.2k26 ↗" [ref=e66] [cursor=pointer]:
          - /url: https://www.instagram.com/talent.hunt.2k26/
        - link "View Official Brochure" [ref=e67] [cursor=pointer]:
          - /url: /assets/documents/brochure-qr.jpg
          - text: View Official Brochure
          - generic [aria-hidden] [ref=e68]: ↗
        - link "Registration ↗" [ref=e69] [cursor=pointer]:
          - /url: /register
        - link "Privacy & your data" [ref=e70] [cursor=pointer]:
          - /url: /privacy
    - generic [ref=e71]:
      - img "B.S. Abdur Rahman Crescent Institute of Science & Technology" [ref=e72]
      - img "CSEA" [ref=e73]
      - img "ACM" [ref=e74]
      - paragraph [ref=e75]: School of Computer Information and Mathematical SciencesDepartment of Computer Science and Engineering
    - generic [ref=e76]:
      - generic [ref=e77]: TALENT HUNT 2K26 · Department of Computer Science and Engineering
      - button "Replay Opening Intro ↺" [ref=e78] [cursor=pointer]
      - generic [ref=e79]: For Crescent CSE students only ↗
```

# Test source

```ts
  1  | import { test, expect, type Page } from "@playwright/test";
  2  | 
  3  | const caption = "26 October · 9:00 AM IST";
  4  | const completion = "The countdown has ended. Explore Talent Hunt 2K26.";
  5  | 
  6  | async function pauseClock(page: Page, instant: string) {
  7  |   const time = new Date(instant);
  8  |   await page.clock.install({ time: new Date(time.getTime() - 1000) });
  9  |   await page.clock.pauseAt(time);
  10 | }
  11 | 
  12 | test.beforeEach(async ({ page }) => {
  13 |   await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
  14 |   await page.emulateMedia({ reducedMotion: "reduce" });
  15 | });
  16 | 
  17 | test("the India-time countdown ticks and survives a page refresh", async ({
  18 |   page,
  19 | }) => {
  20 |   await pauseClock(page, "2026-10-14T03:30:00Z");
  21 |   await page.goto("/");
  22 |   const timer = page.locator('.countdown[aria-label="Time until event"]');
  23 |   const digits = timer.locator("strong");
  24 |   await expect(digits).toHaveText(["12", "00", "00", "00"]);
  25 |   await expect(page.locator(".date-strip")).toContainText(caption);
  26 | 
  27 |   await page.clock.runFor(1000);
  28 |   await expect(digits).toHaveText(["11", "23", "59", "59"]);
  29 | 
  30 |   await page.reload();
  31 |   await expect(digits).toHaveText(["11", "23", "59", "59"]);
  32 |   await expect(page.locator(".date-strip")).toContainText(caption);
  33 | });
  34 | 
  35 | test("the timer ends exactly at 9 AM IST and the archive waits until the date ends", async ({
  36 |   page,
  37 | }) => {
  38 |   await pauseClock(page, "2026-10-26T03:29:58Z");
  39 |   await page.goto("/schedule");
  40 |   const strip = page.locator(".date-strip");
  41 |   const timer = strip.locator('.countdown[aria-label="Time until event"]');
> 42 |   await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "02"]);
     |                                         ^ Error: expect(locator).toHaveText(expected) failed
  43 | 
  44 |   await page.clock.runFor(1000);
  45 |   await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "01"]);
  46 |   await page.clock.runFor(1000);
  47 |   await expect(timer).toHaveCount(0);
  48 |   await expect(strip).toContainText(completion);
  49 | 
  50 |   await page.reload();
  51 |   await expect(timer).toHaveCount(0);
  52 |   await expect(strip).toContainText(completion);
  53 |   await page.clock.runFor(1000);
  54 |   await expect(strip).toContainText(completion);
  55 | 
  56 |   await page.clock.setFixedTime(new Date("2026-10-26T18:29:59Z"));
  57 |   await page.reload();
  58 |   await expect(strip).toContainText(completion);
  59 |   await page.clock.setFixedTime(new Date("2026-10-26T18:30:00Z"));
  60 |   await page.reload();
  61 |   await expect(strip).toContainText(
  62 |     "The 2026 edition has concluded. Explore the event archive.",
  63 |   );
  64 | });
  65 | 
  66 | test("all four countdown units fit the homepage and schedule on small phones", async ({
  67 |   page,
  68 | }) => {
  69 |   await pauseClock(page, "2026-10-14T03:30:00Z");
  70 |   for (const width of [320, 390]) {
  71 |     await page.setViewportSize({ width, height: 844 });
  72 |     for (const path of ["/", "/schedule"]) {
  73 |       await page.goto(path);
  74 |       const timer = page.locator('.countdown[aria-label="Time until event"]');
  75 |       const digits = timer.locator("strong");
  76 |       await expect(digits).toHaveText(["12", "00", "00", "00"]);
  77 |       await timer.scrollIntoViewIfNeeded();
  78 |       for (const digit of await digits.all()) {
  79 |         await expect(digit).toBeInViewport();
  80 |       }
  81 |       const strip = page.locator(".date-strip");
  82 |       await expect(strip).toContainText(caption);
  83 |       expect(
  84 |         await strip.evaluate(
  85 |           (element) => element.scrollWidth <= element.clientWidth,
  86 |         ),
  87 |         `${path} countdown at ${width}px`,
  88 |       ).toBe(true);
  89 |       expect(
  90 |         await page.evaluate(
  91 |           () => document.documentElement.scrollWidth <= innerWidth,
  92 |         ),
  93 |         `${path} page at ${width}px`,
  94 |       ).toBe(true);
  95 |     }
  96 |   }
  97 | });
  98 | 
```