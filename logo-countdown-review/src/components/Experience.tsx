import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { BrandWordmark } from "./BrandWordmark";

export const editorialEase = [0.22, 1, 0.36, 1] as const;
const ExperienceContext = createContext({ ready: true });
export const useExperience = () => useContext(ExperienceContext);

function Opening({ dismiss }: { dismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (reduced || interacting) return;
    const timer = window.setTimeout(dismiss, 3800);
    return () => window.clearTimeout(timer);
  }, [dismiss, reduced, interacting]);

  return (
    <motion.dialog
      ref={dialog}
      className="opening"
      aria-label="Opening animation"
      aria-describedby="opening-description"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        setInteracting(true);
        const buttons =
          event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      initial={false}
      exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: reduced ? 0 : 0.85, ease: editorialEase }}
    >
      <div className="opening-grain" aria-hidden="true" />
      <div className="opening-frame" aria-hidden="true" />
      <div className="opening-top">
        <div className="opening-brand">
          <BrandWordmark size="opening" />
          <span>
            CRESCENT <span className="opening-brand-divider">/</span> CSE
          </span>
        </div>
        <button
          type="button"
          className="opening-skip"
          onClick={dismiss}
          autoFocus
        >
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="opening-main">
        <div className="opening-copy">
          <motion.p
            className="opening-kicker"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <span /> THE STAGE IS YOURS
          </motion.p>
          <h2 className="opening-title" aria-label="Talent Hunt 2K26">
            {["TALENT", "HUNT."].map((word, index) => (
              <span className="opening-mask" key={word} aria-hidden="true">
                <motion.span
                  initial={reduced ? false : { y: "110%", rotate: 3 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.22 + index * 0.16,
                    ease: editorialEase,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.div
            className="opening-caption"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: editorialEase }}
          >
            <span className="opening-edition">2K26</span>
            <p id="opening-description">
              Sixteen competitions.
              <br />
              One moment to make yours.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="opening-emblem"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.6, delay: 0.35, ease: editorialEase }}
        >
          <motion.svg
            viewBox="0 0 400 400"
            className="opening-orbit"
            fill="none"
            initial={reduced ? false : { rotate: 0 }}
            animate={reduced ? {} : { rotate: 65 }}
            transition={{ duration: 4.6, ease: "easeOut" }}
          >
            <circle cx="200" cy="200" r="181" />
            <circle cx="200" cy="200" r="155" strokeDasharray="1 15" />
            <motion.path
              d="M200 19a181 181 0 0 1 181 181"
              className="opening-orbit-accent"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: editorialEase }}
            />
            {[0, 90, 180, 270].map((angle) => (
              <path
                key={angle}
                d="M200 9v20"
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </motion.svg>
          <div className="opening-date">
            <span>26</span>
            <small>OCTOBER / 2026</small>
          </div>
          <motion.span
            className="opening-star"
            initial={reduced ? false : { rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 1.2, ease: editorialEase }}
          >
            ✳
          </motion.span>
          <span className="opening-emblem-label">
            CREATE. COMPETE. EXPRESS.
          </span>
        </motion.div>
      </div>

      <motion.div
        className="opening-bottom"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p>
          DEPARTMENT OF COMPUTER
          <br />
          SCIENCE & ENGINEERING
        </p>
        <button className="opening-enter" type="button" onClick={dismiss}>
          Enter the experience <span aria-hidden="true">↗</span>
        </button>
        <span className="opening-index" aria-hidden="true">
          TH — 026
        </span>
      </motion.div>
      <div className="opening-progress" aria-hidden="true">
        <motion.span
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0 : 3.8, ease: "linear" }}
        />
      </div>
    </motion.dialog>
  );
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<
    "pending" | "playing" | "leaving" | "ready"
  >("pending");
  const reduced = useReducedMotion();
  const seenInMemory = useRef(false);
  const dismiss = useCallback(() => {
    setStage("leaving");
    seenInMemory.current = true;
    try {
      sessionStorage.setItem("th26:intro", "seen");
    } catch {
      /* The current mount retains the dismissal. */
    }
  }, []);

  useEffect(() => {
    const forced =
      new URLSearchParams(window.location.search).has("intro") ||
      window.location.hash === "#intro";
    let seen = seenInMemory.current;
    try {
      seen ||=
        sessionStorage.getItem("th26:intro") === "seen" ||
        sessionStorage.getItem("th26:intro:dismissed") === "1";
    } catch {
      /* Browser storage is optional. */
    }
    setStage(reduced || (seen && !forced) ? "ready" : "playing");
    const replay = () => setStage("playing");
    window.addEventListener("replay-intro", replay);
    return () => window.removeEventListener("replay-intro", replay);
  }, [reduced]);

  return (
    <ExperienceContext.Provider
      value={{ ready: stage === "ready" || stage === "leaving" }}
    >
      {children}
      <AnimatePresence onExitComplete={() => setStage("ready")}>
        {stage === "playing" && <Opening key="opening" dismiss={dismiss} />}
      </AnimatePresence>
    </ExperienceContext.Provider>
  );
}

/** Content stays readable in static HTML; choreography begins after hydration. */
export function Entrance({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ready } = useExperience();
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  useEffect(() => {
    if (reduced) controls.set({ opacity: 1, y: 0 });
    else if (!ready) controls.set({ opacity: 0, y: 28 });
    else
      void controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.95, delay, ease: editorialEase },
      });
  }, [ready, reduced, controls, delay]);
  return (
    <motion.div
      data-entrance=""
      className={className}
      initial={false}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32 });
  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : progress }}
    />
  );
}
