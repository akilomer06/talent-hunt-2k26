import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import {
  Accordion,
  AnnouncementBanner,
  ErrorBoundary,
  ShareActions,
  SmartImage,
} from "../components/UI";
import { Header } from "../components/Layout";
import { CategoryPage, Featured, Registration } from "../pages/Pages";
import { siteData } from "../data/siteData";
import App from "../App";
const wrap = (node: React.ReactNode, path = "/") =>
  render(<MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>);
describe("User interactions and fallbacks", () => {
  it("renders category competitions directly in official order", async () => {
    wrap(<CategoryPage category="technical" />);
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.getByRole("status")).toHaveTextContent("8 competitions");
    expect(screen.getByRole("link", { name: /Non-Technical/ })).toHaveAttribute(
      "href",
      "/events/non-technical",
    );
  });
  it("renders non-technical category competitions", () => {
    wrap(<CategoryPage category="non-technical" />, "/events/non-technical");
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.getByRole("link", { name: "Explore FIFA" })).toHaveAttribute(
      "href",
      "/events/fifa",
    );
  });
  it("announces accordion state and supports keyboard operation", async () => {
    const user = userEvent.setup();
    render(<Accordion faq={siteData.faqs[0]} />);
    const button = screen.getByRole("button");
    button.focus();
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "true");
    await waitFor(() =>
      expect(screen.getByText(siteData.faqs[0].answer)).toBeVisible(),
    );
    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
  it("hides missing images and falls back when an existing file fails", () => {
    const { rerender } = render(
      <SmartImage
        src="/missing.png"
        alt="Missing"
        fallback={<span>Event title</span>}
      />,
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText("Event title")).toBeVisible();
    rerender(
      <SmartImage
        src={siteData.assets.event}
        alt="Official logo"
        fallback={<span>Event title</span>}
      />,
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("Event title")).toBeVisible();
  });
  it("dismisses only the announcement ID and tolerates blocked storage", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    const { rerender } = render(
      <AnnouncementBanner
        announcement={{ id: "first", message: "First official update" }}
      />,
    );
    await user.click(
      await screen.findByRole("button", { name: "Dismiss announcement" }),
    );
    expect(localStorage.getItem("th26:announcement:first")).toBe("dismissed");
    expect(screen.queryByText("First official update")).toBeNull();
    rerender(
      <AnnouncementBanner
        announcement={{ id: "second", message: "Second official update" }}
      />,
    );
    expect(await screen.findByText("Second official update")).toBeVisible();
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Blocked");
      });
    await user.click(
      screen.getByRole("button", { name: "Dismiss announcement" }),
    );
    expect(screen.queryByText("Second official update")).toBeNull();
    spy.mockRestore();
  });
  it("continues to show announcements when reading storage fails", async () => {
    const spy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("Blocked");
      });
    render(
      <AnnouncementBanner
        announcement={{ id: "storage-failure", message: "Still accessible" }}
      />,
    );
    expect(await screen.findByText("Still accessible")).toBeVisible();
    spy.mockRestore();
  });
  it("opens and closes the mobile dialog and unlocks body scrolling", async () => {
    const user = userEvent.setup();
    wrap(<Header />);
    await user.click(screen.getByRole("button", { name: /Menu/ }));
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: /Close/ }));
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: /Menu/ })).toHaveFocus();
  });
  it("shows honest clipboard failure feedback and a manual URL fallback", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<ShareActions />);
    await user.click(screen.getByRole("button", { name: /Copy Link/ }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Copy was unavailable",
    );
    expect(screen.getByRole("textbox", { name: "Page link" })).toHaveValue(
      window.location.href,
    );
  });
  it("does not expose an external form or QR when registration is incomplete", () => {
    const original = siteData.registration.qrVerified;
    siteData.registration.qrVerified = false;
    try {
      wrap(<Registration />);
      expect(screen.getByText(siteData.copy.registrationPending)).toBeVisible();
      expect(
        screen.queryByRole("link", { name: /Open Registration Form/ }),
      ).toBeNull();
      expect(screen.queryByRole("img")).toBeNull();
    } finally {
      siteData.registration.qrVerified = original;
    }
  });
  it("shows custom 404 content for unknown event slugs", () => {
    wrap(<App />, "/events/does-not-exist");
    expect(
      screen.getByRole("heading", { name: "PAGE NOT FOUND." }),
    ).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Code Break" })).toBeNull();
  });
  it("can recover from a render error without exposing diagnostics", async () => {
    let shouldThrow = true;
    function Broken() {
      if (shouldThrow) throw new Error("private diagnostics");
      return <p>Recovered content</p>;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    );
    expect(screen.queryByText("private diagnostics")).toBeNull();
    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(screen.getByText("Recovered content")).toBeVisible();
    spy.mockRestore();
  });
  it("changes the featured event with controls without moving focus", async () => {
    const user = userEvent.setup();
    wrap(<Featured />);
    const next = screen.getByRole("button", { name: "Next featured event" });
    await user.click(next);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /Shutter Verse/ }),
      ).toBeVisible(),
    );
    expect(next).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByRole("button", { name: "Play" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
