import { test, expect } from "@playwright/test";
import { siteData } from "../src/data/siteData";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
});

test("the event ticker includes all sixteen events and can pause and resume", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const ticker = page.getByRole("region", { name: "All 16 events" });
  await ticker.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(
    ticker.locator('.ticker-group[data-copy="0"] .ticker-event'),
  ).toHaveText(siteData.events.map((event) => `${event.name}✦`));
  const track = ticker.locator(".ticker-track");
  const position = () =>
    track.evaluate(
      (element) =>
        new DOMMatrixReadOnly(getComputedStyle(element).transform).m41,
    );
  const start = await position();
  await expect.poll(position).toBeLessThan(start - 2);
  await ticker.getByRole("button", { name: "Pause event ticker" }).click();
  await expect(
    ticker.getByRole("button", { name: "Resume event ticker" }),
  ).toHaveAttribute("aria-pressed", "true");
  const paused = await position();
  await page.waitForTimeout(250);
  expect(Math.abs((await position()) - paused)).toBeLessThan(0.5);
  await ticker.getByRole("button", { name: "Resume event ticker" }).click();
  await expect.poll(position).toBeLessThan(paused - 2);
});

test("reduced motion shows every event without a moving banner on small phones", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  const ticker = page.getByRole("region", { name: "All 16 events" });
  await expect(ticker.locator(".ticker-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(ticker.getByRole("button")).toBeDisabled();
  await expect(
    ticker.locator('.ticker-group[data-copy="0"] .ticker-event'),
  ).toHaveCount(16);
  await expect(ticker.locator('.ticker-group[data-copy="1"]')).toBeHidden();
  for (const item of await ticker
    .locator('.ticker-group[data-copy="0"] .ticker-event')
    .all()) {
    await expect(item).toBeVisible();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
