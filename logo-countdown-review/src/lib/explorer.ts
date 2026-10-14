import { siteData } from "../data/siteData";

export const explorerKey = "th26:explorer:v1";
export interface ExplorerState {
  visited: string[];
  saved: string[];
  memoryBest: number;
  motionPaused: boolean;
}
export const freshExplorer = (): ExplorerState => ({
  visited: [],
  saved: [],
  memoryBest: 0,
  motionPaused: false,
});
const eventIds = new Set(siteData.events.map((event) => event.id));
export function restoreExplorer(value: unknown): ExplorerState {
  if (!value || typeof value !== "object") return freshExplorer();
  const record = value as Partial<ExplorerState>;
  const ids = (input: unknown) =>
    Array.isArray(input)
      ? [
          ...new Set(
            input.filter(
              (id): id is string => typeof id === "string" && eventIds.has(id),
            ),
          ),
        ]
      : [];
  return {
    visited: ids(record.visited),
    saved: ids(record.saved),
    memoryBest:
      typeof record.memoryBest === "number" &&
      Number.isInteger(record.memoryBest)
        ? Math.max(0, Math.min(4, record.memoryBest))
        : 0,
    motionPaused: record.motionPaused === true,
  };
}
export function explorerScore(state: ExplorerState) {
  return state.visited.length * 25 + state.memoryBest * 40;
}
export function explorerBadges(state: ExplorerState) {
  const categories = new Set(
    siteData.events
      .filter((event) => state.visited.includes(event.id))
      .map((event) => event.category),
  );
  return [
    {
      id: "first",
      title: "First contact",
      description: "Explore your first event",
      done: state.visited.length > 0,
      progress: Math.min(state.visited.length, 1),
      total: 1,
    },
    {
      id: "both",
      title: "Dual explorer",
      description: "Explore both event categories",
      done: categories.size === 2,
      progress: categories.size,
      total: 2,
    },
    {
      id: "shortlist",
      title: "Your squad",
      description: "Save three events to your pass",
      done: state.saved.length >= 3,
      progress: Math.min(state.saved.length, 3),
      total: 3,
    },
    {
      id: "memory",
      title: "Signal master",
      description: "Complete all four warm-up rounds",
      done: state.memoryBest === 4,
      progress: state.memoryBest,
      total: 4,
    },
    {
      id: "all",
      title: "Arena legend",
      description: "Discover all sixteen events",
      done: state.visited.length === siteData.events.length,
      progress: state.visited.length,
      total: siteData.events.length,
    },
  ];
}
