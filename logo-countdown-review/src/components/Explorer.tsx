import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { siteData, type EventRecord } from "../data/siteData";
import {
  explorerKey,
  explorerScore,
  freshExplorer,
  restoreExplorer,
} from "../lib/explorer";

const ExplorerContext = createContext({
  state: freshExplorer(),
  xp: 0,
  ready: false,
  storageAvailable: true,
  toggleSave: (_id: string) => {},
  completeMemory: (_rounds: number) => {},
  toggleMotion: () => {},
  reset: () => {},
});
export const useExplorer = () => useContext(ExplorerContext);

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(freshExplorer);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [toast, setToast] = useState("");
  const previousXp = useRef<number | null>(null);
  const location = useLocation();
  const xp = explorerScore(state);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(explorerKey);
      if (saved) {
        try {
          setState(restoreExplorer(JSON.parse(saved)));
        } catch {
          setState(freshExplorer());
        }
      }
    } catch {
      setStorageAvailable(false);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(explorerKey, JSON.stringify(state));
    } catch {
      setStorageAvailable(false);
    }
  }, [ready, state]);
  useEffect(() => {
    if (!ready) return;
    const event = siteData.events.find(
      (event) => location.pathname === `/events/${event.slug}`,
    );
    if (event)
      setState((current) =>
        current.visited.includes(event.id)
          ? current
          : { ...current, visited: [...current.visited, event.id] },
      );
  }, [ready, location.pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle(
      "motion-paused",
      state.motionPaused,
    );
    return () => document.documentElement.classList.remove("motion-paused");
  }, [state.motionPaused]);
  useEffect(() => {
    if (!ready) return;
    const previous = previousXp.current;
    previousXp.current = xp;
    if (previous !== null && xp > previous) {
      setToast(
        `+${xp - previous} explorer XP · Level ${Math.floor(xp / 100) + 1}`,
      );
      const timer = window.setTimeout(() => setToast(""), 3200);
      return () => window.clearTimeout(timer);
    }
    if (previous !== null && xp < previous) setToast("");
  }, [xp, ready]);
  const toggleSave = useCallback((id: string) => {
    if (!siteData.events.some((event) => event.id === id)) return;
    setState((current) => ({
      ...current,
      saved: current.saved.includes(id)
        ? current.saved.filter((saved) => saved !== id)
        : [...current.saved, id],
    }));
  }, []);
  const completeMemory = useCallback((rounds: number) => {
    if (!Number.isInteger(rounds) || rounds < 0 || rounds > 4) return;
    setState((current) => ({
      ...current,
      memoryBest: Math.max(current.memoryBest, rounds),
    }));
  }, []);
  return (
    <ExplorerContext.Provider
      value={{
        state,
        xp,
        ready,
        storageAvailable,
        toggleSave,
        completeMemory,
        toggleMotion: () =>
          setState((current) => ({
            ...current,
            motionPaused: !current.motionPaused,
          })),
        reset: () => {
          previousXp.current = 0;
          setState(freshExplorer());
          setToast("");
        },
      }}
    >
      {children}
      <div
        className={`xp-toast ${toast ? "xp-toast-visible" : ""}`}
        role="status"
        aria-atomic="true"
      >
        {toast && (
          <>
            <span aria-hidden="true">✦</span>
            {toast}
          </>
        )}
      </div>
    </ExplorerContext.Provider>
  );
}

export function ExplorerControls() {
  const { state, xp, toggleMotion } = useExplorer();
  return (
    <div className="explorer-controls">
      <Link
        to="/#explorer-pass"
        className="player-pill"
        aria-label={`Explorer pass, level ${Math.floor(xp / 100) + 1}, ${xp} XP`}
      >
        <span className="player-mark" aria-hidden="true">
          ✦
        </span>
        <span>
          <strong>
            LVL {String(Math.floor(xp / 100) + 1).padStart(2, "0")}
          </strong>
          <small>{xp} XP</small>
        </span>
      </Link>
      <button
        className="motion-toggle"
        onClick={toggleMotion}
        aria-pressed={state.motionPaused}
        aria-label={
          state.motionPaused
            ? "Resume decorative motion"
            : "Pause decorative motion"
        }
        title={state.motionPaused ? "Resume motion" : "Pause motion"}
      >
        <span aria-hidden="true">{state.motionPaused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}

export function SaveEventButton({
  event,
  detail = false,
}: {
  event: EventRecord;
  detail?: boolean;
}) {
  const { state, toggleSave } = useExplorer();
  const saved = state.saved.includes(event.id);
  return (
    <button
      type="button"
      className={detail ? "save-event-detail" : "save-event"}
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${event.name}${saved ? " from" : " to"} your shortlist`}
      onClick={() => toggleSave(event.id)}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M6 4h12v17l-6-4-6 4z" />
      </svg>
      {detail && <span>{saved ? "Saved to your pass" : "Save event"}</span>}
    </button>
  );
}
