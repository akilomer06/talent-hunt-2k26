import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
  await page.clock.setFixedTime(new Date("2026-10-14T08:00:00Z"));
});

test("a failed QR does not expose either registration action", async ({
  page,
}) => {
  await page.route("**/assets/registration/official-qr.png", (route) =>
    route.abort(),
  );
  await page.goto("/register");
  await expect(
    page.getByText("Registration information is temporarily unavailable.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Open Registration Form/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Open registration form using QR code" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: "Official registration QR code" }),
  ).toHaveCount(0);
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: /View Official Brochure/ }),
  ).toHaveAttribute("href", "/assets/documents/brochure-crest-2026.png");
});

test("the archive closes published registration actions after the event date", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-27T13:00:00Z"));
  await page.goto("/register");
  await expect(page.locator(".status-pill")).toHaveText(/Registration Closed/);
  await expect(
    page.getByRole("link", { name: /Open Registration Form/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: "Official registration QR code" }),
  ).toHaveCount(0);
});
