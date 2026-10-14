import { test, expect, type Page } from "@playwright/test";

const caption = "26 October · 9:00 AM IST";
const completion = "The countdown has ended. Explore Talent Hunt 2K26.";

async function pauseClock(page: Page, instant: string) {
  const time = new Date(instant);
  await page.clock.install({ time: new Date(time.getTime() - 1000) });
  await page.clock.pauseAt(time);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("the India-time countdown ticks and survives a page refresh", async ({
  page,
}) => {
  await pauseClock(page, "2026-10-14T03:30:00Z");
  await page.goto("/");
  const timer = page.locator('.countdown[aria-label="Time until event"]');
  const digits = timer.locator("strong");
  await expect(digits).toHaveText(["12", "00", "00", "00"]);
  await expect(page.locator(".date-strip")).toContainText(caption);

  await page.clock.runFor(1000);
  await expect(digits).toHaveText(["11", "23", "59", "59"]);

  await page.reload();
  await expect(digits).toHaveText(["11", "23", "59", "59"]);
  await expect(page.locator(".date-strip")).toContainText(caption);
});

test("the timer ends exactly at 9 AM IST and the archive waits until the date ends", async ({
  page,
}) => {
  await pauseClock(page, "2026-10-26T03:29:58Z");
  await page.goto("/schedule");
  const strip = page.locator(".date-strip");
  const timer = strip.locator('.countdown[aria-label="Time until event"]');
  await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "02"]);

  await page.clock.runFor(1000);
  await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "01"]);
  await page.clock.runFor(1000);
  await expect(timer).toHaveCount(0);
  await expect(strip).toContainText(completion);

  await page.reload();
  await expect(timer).toHaveCount(0);
  await expect(strip).toContainText(completion);
  await page.clock.runFor(1000);
  await expect(strip).toContainText(completion);

  await page.clock.setFixedTime(new Date("2026-10-26T18:29:59Z"));
  await page.reload();
  await expect(strip).toContainText(completion);
  await page.clock.setFixedTime(new Date("2026-10-26T18:30:00Z"));
  await page.reload();
  await expect(strip).toContainText(
    "The 2026 edition has concluded. Explore the event archive.",
  );
});

test("all four countdown units fit the homepage and schedule on small phones", async ({
  page,
}) => {
  await pauseClock(page, "2026-10-14T03:30:00Z");
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ["/", "/schedule"]) {
      await page.goto(path);
      const timer = page.locator('.countdown[aria-label="Time until event"]');
      const digits = timer.locator("strong");
      await expect(digits).toHaveText(["12", "00", "00", "00"]);
      await timer.scrollIntoViewIfNeeded();
      for (const digit of await digits.all()) {
        await expect(digit).toBeInViewport();
      }
      const strip = page.locator(".date-strip");
      await expect(strip).toContainText(caption);
      expect(
        await strip.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
        `${path} countdown at ${width}px`,
      ).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} page at ${width}px`,
      ).toBe(true);
    }
  }
});
