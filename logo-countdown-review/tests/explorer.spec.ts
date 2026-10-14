import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
  await page.emulateMedia({ reducedMotion: "reduce" });
});
test("approved coordinator groups fit desktop and mobile with accessible tabs", async ({ page }) => {
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/coordinators");
    await expect(page.getByRole("tab")).toHaveCount(5);
    for (const [id, count] of [["convenors", 2], ["faculty", 10], ["students", 11], ["technical-coords", 0], ["nontechnical-coords", 0]] as const) {
      await page.locator(`#tab-${id}`).click();
      const panel = page.locator(`#panel-${id}`);
      await expect(panel.locator(".person")).toHaveCount(count);
      if (count) await expect(panel.locator(".person").first()).toBeVisible();
      else await expect(panel.getByText("NAMES COMING SOON.")).toBeVisible();
      const audit = await new AxeBuilder({ page }).include(".coordinators-page").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(audit.violations).toEqual([]);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
test("discoveries are unique, shortlists survive refresh, and reset clears the pass", async ({
  page,
}) => {
  await page.goto("/events/code-break");
  await expect(page.locator(".player-pill small")).toHaveText("25 XP");
  await page.reload();
  await expect(page.locator(".player-pill small")).toHaveText("25 XP");
  await page
    .getByRole("button", { name: "Save Code Break to your shortlist" })
    .click();
  await page.goto("/events/shutter-verse");
  await expect(page.locator(".player-pill small")).toHaveText("50 XP");
  await page.goto("/#explorer-pass");
  await expect(page.locator(".quest-row.quest-done")).toHaveCount(2);
  await page.getByRole("tab", { name: "Saved events (1)" }).click();
  await expect(
    page.locator(".saved-list").getByText("Code Break", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("tab", { name: "Saved events (1)" }).click();
  await expect(
    page.locator(".saved-list").getByText("Code Break", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset my pass" }).click();
  await page.getByRole("button", { name: "Keep my pass" }).click();
  await expect(
    page.getByRole("tab", { name: "Saved events (1)" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset my pass" }).click();
  await page.getByRole("button", { name: "Yes, reset pass" }).click();
  await expect(page.locator(".player-pill small")).toHaveText("0 XP");
  await expect(
    page.getByRole("tab", { name: "Saved events (0)" }),
  ).toBeVisible();
});
test("memory game awards each best round once and supports failure and keyboard play", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/#explorer-pass");
  await page.getByRole("tab", { name: "Play warm-up" }).click();
  await page.getByRole("button", { name: "Start warm-up" }).click();
  for (let replay = 0; replay < 2; replay++) {
    if (replay) await page.getByRole("button", { name: "Play again" }).click();
    for (let round = 1; round <= 4; round++) {
      const sequence = await page
        .locator(".game-pattern-chip")
        .allTextContents();
      await page.clock.fastForward(sequence.length * 1050 + 250);
      await expect(page.locator(".game-message")).toContainText("Your turn");
      await page.getByRole("button", { name: "Up", exact: true }).focus();
      for (const signal of sequence)
        await page.keyboard.press(`Arrow${signal}`);
    }
    await expect(page.locator(".game-message")).toContainText("SIGNAL MASTER");
    await expect(page.locator(".player-pill small")).toHaveText("160 XP");
  }
  await page.getByRole("button", { name: "Play again" }).click();
  const first = await page.locator(".game-pattern-chip").first().textContent();
  await page.clock.fastForward(2400);
  await page
    .getByRole("button", { name: first === "Up" ? "Right" : "Up", exact: true })
    .click();
  await expect(page.locator(".game-message")).toContainText("Signal lost");
  await expect(page.locator(".player-pill small")).toHaveText("160 XP");
});
test("the pass and registration stay usable with blocked browser storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "getItem", {
      value: () => {
        throw Error("blocked");
      },
    });
    Object.defineProperty(Storage.prototype, "setItem", {
      value: () => {
        throw Error("blocked");
      },
    });
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/events/code-break");
  await expect(page.locator(".player-pill small")).toHaveText("25 XP");
  await page
    .getByRole("button", { name: "Save Code Break to your shortlist" })
    .click();
  await page.locator(".player-pill").click();
  await expect(page.locator(".pass-note")).toContainText(
    "Storage is unavailable",
  );
  await page.getByRole("tab", { name: "Saved events (1)" }).click();
  await expect(
    page.locator(".saved-list").getByText("Code Break", { exact: true }),
  ).toBeVisible();
  await page.goto("/register");
  await expect(
    page.getByRole("link", { name: /Open Registration Form/ }),
  ).toHaveAttribute("href", "https://forms.gle/mzuWoGeCKZWcVVZq5");
  expect(errors).toEqual([]);
});
test("motion preference survives refresh and explorer tabs are accessible on a small phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/#explorer-pass");
  await page.getByRole("button", { name: "Pause decorative motion" }).click();
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Resume decorative motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("tab", { name: "Side quests" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Saved events (0)" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Play warm-up" })).toBeFocused();
  await expect(page.locator(".signal-game")).toBeVisible();
  const audit = await new AxeBuilder({ page })
    .include("#explorer-pass")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
