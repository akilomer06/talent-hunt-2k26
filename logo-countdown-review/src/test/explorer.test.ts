import { describe, expect, it } from "vitest";
import { siteData } from "../data/siteData";
import {
  explorerBadges,
  explorerScore,
  freshExplorer,
  restoreExplorer,
} from "../lib/explorer";

describe("Explorer pass integrity", () => {
  it("rejects invalid stored event identities and duplicate discoveries", () => {
    const id = siteData.events[0].id;
    const restored = restoreExplorer({
      visited: [id, id, "unknown", null],
      saved: [id, false, "missing"],
    });
    expect(restored.visited).toEqual([id]);
    expect(restored.saved).toEqual([id]);
    expect(explorerScore(restored)).toBe(25);
  });
  it("starts safely with missing or malformed data", () => {
    for (const input of [
      null,
      "garbage",
      12,
      [],
      { visited: "all", saved: {}, memoryBest: "4" },
    ]) {
      expect(restoreExplorer(input)).toEqual(freshExplorer());
    }
  });
  it("bounds stored game progress and does not treat truthy values as preferences", () => {
    expect(
      restoreExplorer({ memoryBest: 99, motionPaused: "yes" }).memoryBest,
    ).toBe(4);
    expect(restoreExplorer({ memoryBest: -4 }).memoryBest).toBe(0);
    expect(restoreExplorer({ memoryBest: 2.5 }).memoryBest).toBe(0);
    expect(restoreExplorer({ memoryBest: Infinity }).memoryBest).toBe(0);
    expect(restoreExplorer({ motionPaused: "yes" }).motionPaused).toBe(false);
  });
  it("requires discoveries in both categories for the dual explorer badge", () => {
    const technical = siteData.events.filter(
      (event) => event.category === "technical",
    );
    const open = siteData.events.find(
      (event) => event.category === "non-technical",
    )!;
    const state = {
      ...freshExplorer(),
      visited: technical.map((event) => event.id),
    };
    expect(
      explorerBadges(state).find((badge) => badge.id === "both")?.done,
    ).toBe(false);
    state.visited.push(open.id);
    expect(
      explorerBadges(state).find((badge) => badge.id === "both")?.done,
    ).toBe(true);
  });
  it("keeps shortlist progress separate from explorer XP", () => {
    const state = {
      ...freshExplorer(),
      saved: siteData.events.slice(0, 3).map((event) => event.id),
    };
    expect(
      explorerBadges(state).find((badge) => badge.id === "shortlist")?.done,
    ).toBe(true);
    expect(explorerScore(state)).toBe(0);
  });
  it("requires all events and all warm-up rounds for the corresponding badges", () => {
    const state = {
      ...freshExplorer(),
      visited: siteData.events.map((event) => event.id),
      memoryBest: 4,
    };
    expect(explorerScore(state)).toBe(560);
    expect(
      explorerBadges(state).find((badge) => badge.id === "all")?.done,
    ).toBe(true);
    expect(
      explorerBadges(state).find((badge) => badge.id === "memory")?.done,
    ).toBe(true);
  });
});
