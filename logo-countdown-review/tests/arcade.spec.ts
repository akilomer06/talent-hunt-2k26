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

test("all sixteen cards animate automatically, pause off-screen, and support pause and resume", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.mouse.move(0, 0);
  const cards = page.locator(".event-card");
  await expect(cards).toHaveCount(16);
  for (const card of await cards.all()) {
    await card.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await expect(card).toHaveAttribute("data-motion-active", "true");
    const icon = card.locator(".event-art > svg");
    await expect(icon).toHaveCSS("animation-name", "arena-float");
    await expect(icon).toHaveCSS("animation-play-state", "running");
    const time = () =>
      icon.evaluate((element) =>
        Number(
          element
            .getAnimations()
            .find((animation) => animation instanceof CSSAnimation)
            ?.currentTime ?? 0,
        ),
      );
    const start = await time();
    await expect.poll(time).toBeGreaterThan(start + 25);
  }

  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(cards.last()).toHaveAttribute("data-motion-active", "false");
  await expect(cards.last().locator(".event-art > svg")).toHaveCSS(
    "animation-play-state",
    "paused",
  );

  const pause = page.getByRole("button", {
    name: "Pause technical card animations",
    exact: true,
  });
  await pause.click();
  const icon = cards.first().locator(".event-art > svg");
  await expect(icon).toHaveCSS("animation-play-state", "paused");
  const time = () =>
    icon.evaluate((element) =>
      Number(
        element
          .getAnimations()
          .find((animation) => animation instanceof CSSAnimation)
          ?.currentTime ?? 0,
      ),
    );
  // Let the pending pause apply before comparing the animation clock.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  const pausedTime = await time();
  await page.waitForTimeout(200);
  expect(await time()).toBeCloseTo(pausedTime, 0);
  await page
    .getByRole("button", {
      name: "Resume technical card animations",
      exact: true,
    })
    .click();
  await expect.poll(time).toBeGreaterThan(pausedTime + 25);
});

test("reduced motion disables card loops and leaves all event links available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const controls = page.locator(".grid-motion-tools button");
  await expect(controls).toHaveCount(2);
  for (const control of await controls.all())
    await expect(control).toBeDisabled();
  const icons = page.locator(".event-card .event-art > svg");
  await expect(icons).toHaveCount(16);
  for (const icon of await icons.all())
    await expect(icon).toHaveCSS("animation-name", "none");
  await expect(page.locator(".event-card > a")).toHaveCount(16);
});
