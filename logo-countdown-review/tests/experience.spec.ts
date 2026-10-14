import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("opening is modal, skippable by keyboard and remembered, with replay on other pages", async ({
  page,
}) => {
  await page.goto("/");
  const opening = page.getByRole("dialog", { name: "Opening animation" });
  const skip = opening.getByRole("button", { name: /Skip intro/i });
  await expect(opening).toBeVisible();
  await expect(skip).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Shift+Tab");
  await expect(
    opening.getByRole("button", { name: /Enter the experience/ }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opening).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  expect(await page.evaluate(() => sessionStorage.getItem("th26:intro"))).toBe(
    "seen",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(opening).toHaveCount(0);
  await page.goto("/coordinators");
  const replay = page.getByRole("button", { name: /Replay Opening Intro/ });
  await replay.click();
  await expect(opening).toBeVisible();
  await skip.click();
  await expect(opening).toHaveCount(0);
  await expect(replay).toBeFocused();
});

test("opening completes automatically, reveals the hero and fits phone and desktop screens", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/?intro");
    const opening = page.getByRole("dialog", { name: "Opening animation" });
    await expect(opening).toBeVisible();
    expect(
      await opening.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    const bounds = await opening.boundingBox();
    expect(bounds?.width).toBe(viewport.width);
    expect(bounds?.height).toBe(viewport.height);
    await expect(
      opening.getByRole("button", { name: /Skip intro/i }),
    ).toBeInViewport();
    await expect(
      opening.getByRole("button", { name: /Enter the experience/ }),
    ).toBeInViewport();
    await expect(opening).toHaveCount(0, { timeout: 7000 });
    await expect(
      page.locator(".hero-copy").getByRole("heading", { level: 1 }),
    ).toBeVisible();
    await expect(page.locator(".hero-copy > div").first()).toHaveCSS(
      "opacity",
      "1",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("reduced motion skips automatic opening and supports an accessible static replay", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Opening animation" }),
  ).toHaveCount(0);
  await expect(page.locator(".ticker-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.getByRole("button", { name: /Replay Opening Intro/ }).click();
  const opening = page.getByRole("dialog", { name: "Opening animation" });
  await expect(opening).toBeVisible();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await opening.getByRole("button", { name: /Enter the experience/ }).click();
  await expect(opening).toHaveCount(0);
});

test("opening and navigation work with unavailable browser storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage unavailable");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.goto("/");
  const opening = page.getByRole("dialog", { name: "Opening animation" });
  await opening.getByRole("button", { name: /Skip intro/i }).click();
  await expect(opening).toHaveCount(0);
  await page
    .locator(".hero")
    .getByRole("link", { name: "Explore Events" })
    .click();
  await expect(page).toHaveURL(/#competitions$/);
  await expect(
    page.getByRole("heading", { name: "TECHNICAL.", exact: true }),
  ).toBeInViewport();
  await page
    .locator("#competitions")
    .getByRole("link", { name: "Explore Code Break", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Code Break",
  );
});
