import { describe, it, expect } from "vitest";
import { siteData, type RegistrationConfig } from "../data/siteData";
import {
  countdown,
  filterEvents,
  inCategory,
  isArchived,
  isGoogleForm,
  metadata,
  neighbours,
  publicRoutes,
  registrationStatus,
  validInstant,
  validateEvents,
} from "../lib/content";
describe("Verified event content", () => {
  it("keeps the exact sixteen names and brochure order", () => {
    expect(inCategory("technical").map((e) => e.name)).toEqual([
      "Code Break",
      "Code Canvas",
      "Neural Nexus",
      "Binary Battle",
      "Game Craft",
      "Tech Talks",
      "Cyber Breach",
      "Prompt Pop",
    ]);
    expect(inCategory("non-technical").map((e) => e.name)).toEqual([
      "Shutter Verse",
      "Clue Code",
      "Trashion",
      "The Voice Over",
      "BGMI",
      "FIFA",
      "Valorant",
      "Bid Wars",
    ]);
    expect(validateEvents(siteData.events)).toEqual([]);
    expect(new Date("2026-10-26T12:00:00Z").getUTCDay()).toBe(1);
  });
  it("rejects duplicate IDs, slugs, missing names, wrong categories and sequences", () => {
    const copy = structuredClone(siteData.events);
    copy[1].id = copy[0].id;
    copy[1].slug = copy[0].slug;
    copy[2].name = "";
    copy[3].category = "bad" as never;
    copy[4].order = 20;
    expect(validateEvents(copy).join(" ")).toMatch(/Duplicate ID/);
    expect(validateEvents(copy).join(" ")).toMatch(/Duplicate slug/);
    expect(validateEvents(copy).join(" ")).toMatch(/properties/);
    expect(validateEvents(copy).join(" ")).toMatch(/category/);
    expect(validateEvents(copy).join(" ")).toMatch(/sequence/);
  });
  it("rejects unknown and self-related event IDs", () => {
    const copy = structuredClone(siteData.events);
    copy[0].relatedIds = ["unknown", copy[0].id];
    expect(validateEvents(copy)).toHaveLength(2);
  });
  it("searches case-insensitively and preserves order", () => {
    expect(
      filterEvents(inCategory("technical"), " CODE ").map((e) => e.name),
    ).toEqual(["Code Break", "Code Canvas"]);
    expect(filterEvents(inCategory("technical"), "zz")).toEqual([]);
    expect(
      filterEvents(
        [{ ...siteData.events[0], tags: ["verified"] }],
        "",
        "verified",
      ),
    ).toHaveLength(1);
    expect(filterEvents(siteData.events, "", "unknown")).toHaveLength(0);
  });
  it("does not cross category boundaries with previous/next navigation", () => {
    expect(neighbours(siteData.events[0]).previous).toBeUndefined();
    expect(neighbours(siteData.events[7]).next).toBeUndefined();
    expect(neighbours(siteData.events[8]).previous).toBeUndefined();
    expect(neighbours(siteData.events[15]).next).toBeUndefined();
    expect(neighbours(siteData.events[1]).previous?.name).toBe("Code Break");
  });
  it("has unique routes and page-specific metadata, without invented social assets", () => {
    expect(new Set(publicRoutes).size).toBe(27);
    expect(new Set(publicRoutes.map((p) => metadata(p).title)).size).toBe(27);
    for (const event of siteData.events)
      expect(metadata(`/events/${event.slug}`).title).toContain(event.name);
    expect(metadata("/unknown").noindex).toBe(true);
    expect(metadata("/").image).toBeUndefined();
  });
});
describe("Explicit timezone and lifecycle", () => {
  const config: RegistrationConfig = {
    url: "https://forms.gle/official",
    qr: "/qr.png",
    qrVerified: true,
    opensAt: "2026-10-20T09:00:00+05:30",
    closesAt: "2026-10-25T17:00:00+05:30",
    timezone: "Asia/Kolkata",
    instructions: [],
  };
  it("validates timezone/offset consistency and rejects invalid or nonexistent dates", () => {
    expect(validInstant(config.opensAt, config.timezone)).toBe(true);
    expect(validInstant("2026-10-20T09:00:00+04:00", "Asia/Kolkata")).toBe(
      false,
    );
    expect(validInstant("2026-02-30T09:00:00Z", "UTC")).toBe(false);
    expect(validInstant("2026-10-20T09:00:00", "UTC")).toBe(false);
    expect(validInstant(config.opensAt, "invalid")).toBe(false);
  });
  it("requires complete validated registration configuration", () => {
    expect(registrationStatus({ ...config, url: null }, Date.now(), true)).toBe(
      "unconfigured",
    );
    for (const field of ["url", "opensAt", "closesAt", "timezone"] as const)
      expect(
        registrationStatus({ ...config, [field]: null }, Date.now(), true),
      ).toBe("unconfigured");
    expect(registrationStatus(config, Date.now(), false)).toBe("unconfigured");
    expect(
      registrationStatus({ ...config, qrVerified: false }, Date.now(), true),
    ).toBe("unconfigured");
    expect(
      registrationStatus(
        { ...config, closesAt: config.opensAt },
        Date.now(),
        true,
      ),
    ).toBe("unconfigured");
  });
  it("makes the verified brochure form available without invented dates", () => {
    expect(registrationStatus(siteData.registration, Date.now(), true)).toBe(
      "available",
    );
    expect(siteData.registration.url).toBe(
      "https://forms.gle/mzuWoGeCKZWcVVZq5",
    );
    expect(registrationStatus(siteData.registration, Date.now(), false)).toBe(
      "unconfigured",
    );
    expect(
      registrationStatus(
        { ...siteData.registration, qrVerified: false },
        Date.now(),
        true,
      ),
    ).toBe("unconfigured");
    expect(
      registrationStatus(
        { ...siteData.registration, url: "https://forms.gle.evil.test/abc" },
        Date.now(),
        true,
      ),
    ).toBe("unconfigured");
    expect(
      registrationStatus(
        { ...siteData.registration, opensAt: config.opensAt },
        Date.now(),
        true,
      ),
    ).toBe("unconfigured");
  });
  it("opens exactly at the start and closes exactly at the end", () => {
    expect(
      registrationStatus(config, Date.parse(config.opensAt!) - 1, true),
    ).toBe("soon");
    expect(registrationStatus(config, Date.parse(config.opensAt!), true)).toBe(
      "open",
    );
    expect(
      registrationStatus(config, Date.parse(config.closesAt!) - 1, true),
    ).toBe("open");
    expect(registrationStatus(config, Date.parse(config.closesAt!), true)).toBe(
      "closed",
    );
  });
  it("rejects deceptive or non-Google registration links", () => {
    expect(isGoogleForm("https://forms.gle.evil.test/abc")).toBe(false);
    expect(isGoogleForm("javascript:alert(1)")).toBe(false);
    expect(isGoogleForm("https://docs.google.com/forms/d/e/abc/viewform")).toBe(
      true,
    );
  });
  it("never invents a countdown time and clamps at zero", () => {
    expect(
      countdown({ ...siteData.countdown, enabled: false }, Date.now()),
    ).toBeNull();
    const cfg = {
      enabled: true,
      startsAt: "2026-10-26T09:00:00+05:30",
      timezone: "Asia/Kolkata",
    };
    const target = Date.parse(cfg.startsAt);
    expect(countdown(cfg, target - 90061000)).toMatchObject({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
    const ended = { remaining: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    expect(countdown(cfg, target - 1000)).toEqual({
      ...ended,
      remaining: 1000,
      seconds: 1,
    });
    expect(countdown(cfg, target)).toEqual(ended);
    expect(countdown(cfg, target + 1000)).toEqual(ended);
    expect(countdown({ ...cfg, startsAt: null }, target)).toBeNull();
    expect(countdown({ ...cfg, timezone: null }, target)).toBeNull();
    expect(
      countdown({ ...cfg, startsAt: "2026-10-26T09:00:00+04:00" }, target),
    ).toBeNull();
    expect(
      countdown({ ...cfg, startsAt: "2026-10-27T09:00:00+05:30" }, target),
    ).toBeNull();
  });
  it("counts down to the confirmed 9 AM India time independent of the visitor's zone", () => {
    expect(siteData.countdown).toMatchObject({
      enabled: true,
      startsAt: "2026-10-26T09:00:00+05:30",
      timezone: "Asia/Kolkata",
    });
    expect(
      countdown(siteData.countdown, Date.parse("2026-10-14T03:30:00Z")),
    ).toEqual({
      remaining: 12 * 86400000,
      days: 12,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(
      countdown(siteData.countdown, Date.parse("2026-10-26T03:29:59Z")),
    ).toEqual({
      remaining: 1000,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
    });
  });
  it("uses a conservative global archive boundary when the zone is unknown", () => {
    const timezone = siteData.countdown.timezone;
    siteData.countdown.timezone = null;
    try {
      expect(isArchived(Date.parse("2026-10-26T23:59:59Z"))).toBe(false);
      expect(isArchived(Date.parse("2026-10-27T11:59:59.999Z"))).toBe(false);
      expect(isArchived(Date.parse("2026-10-27T12:00:00Z"))).toBe(true);
    } finally {
      siteData.countdown.timezone = timezone;
    }
  });
  it("keeps the event available until its date ends in India", () => {
    const timezone = siteData.countdown.timezone;
    siteData.countdown.timezone = "Asia/Kolkata";
    try {
      expect(isArchived(Date.parse("2026-10-26T03:30:00Z"))).toBe(false);
      expect(isArchived(Date.parse("2026-10-26T18:29:59.999Z"))).toBe(false);
      expect(isArchived(Date.parse("2026-10-26T18:30:00Z"))).toBe(true);
    } finally {
      siteData.countdown.timezone = timezone;
    }
  });
});
