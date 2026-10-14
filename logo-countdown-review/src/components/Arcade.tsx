import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { siteData } from "../data/siteData";
import { explorerBadges } from "../lib/explorer";
import { Entrance } from "./Experience";
import { useExplorer, SaveEventButton } from "./Explorer";
import { ButtonLink, Eyebrow, Reveal, SmartImage } from "./UI";

export function ArcadeHero() {
  const { state } = useExplorer();
  const reduced = useReducedMotion() || state.motionPaused;
  return (
    <section className="hero arcade-hero">
      <div className="arena-grid" aria-hidden="true" />
      <Entrance className="hero-top" delay={0.04}>
        <p>
          {siteData.settings.school}
          <br />
          <strong>{siteData.settings.department}</strong>
        </p>
        <SmartImage
          src={siteData.assets.college}
          alt={siteData.settings.college}
          className="college-logo"
          width="220"
          height="61"
        />
      </Entrance>
      <div className="arcade-hero-layout">
        <div className="hero-copy">
          <Entrance delay={0.1}>
            <Eyebrow>THE NEXT LEVEL IS YOURS</Eyebrow>
          </Entrance>
          <Entrance delay={0.2}>
            <h1>
              <span>TALENT</span>
              <span className="arcade-hunt">
                HUNT<span className="arcade-edition">2K26</span>
              </span>
            </h1>
          </Entrance>
          <Entrance delay={0.3}>
            <p className="arcade-hero-tagline">
              ONE CAMPUS.
              <br />
              <em>ENDLESS POSSIBILITIES.</em>
            </p>
            <p className="arcade-hero-description">
              Code it. Create it. Own it. Sixteen competitions, two arenas, and
              your next big moment.
            </p>
          </Entrance>
          <Entrance delay={0.4}>
            <div className="button-row">
              <ButtonLink to="/#competitions">Choose your challenge</ButtonLink>
              <ButtonLink to="/register" secondary>
                Register Now
              </ButtonLink>
            </div>
            <p className="eligibility">
              <span aria-hidden="true">◈</span> {siteData.settings.eligibility}
            </p>
          </Entrance>
        </div>
        <Entrance className="arena-console" delay={0.3}>
          <div className="console-topline">
            <span className="micro">TH / ARENA 026</span>
            <span className="console-label">
              <i /> EXPLORE MODE
            </span>
          </div>
          <div className="arena-orb">
            <div className="orb-ring orb-ring-one" aria-hidden="true" />
            <div className="orb-ring orb-ring-two" aria-hidden="true" />
            <div className="orb-crosshair" aria-hidden="true" />
            <motion.div
              className="orb-core"
              animate={reduced ? {} : { y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="micro">YOUR NEXT CHAPTER</span>
              <strong>
                26<span>OCT</span>
              </strong>
              <small>2026 / CRESCENT</small>
            </motion.div>
            <Link className="orb-node orb-node-code" to="/events/code-break">
              <span aria-hidden="true">⌘</span>CODE BREAK <b>↗</b>
            </Link>
            <Link className="orb-node orb-node-play" to="/events/valorant">
              <span aria-hidden="true">✦</span>VALORANT <b>↗</b>
            </Link>
            <Link
              className="orb-node orb-node-create"
              to="/events/shutter-verse"
            >
              <span aria-hidden="true">◈</span>SHUTTER VERSE <b>↗</b>
            </Link>
          </div>
          <div className="console-stats">
            <div>
              <strong>16</strong>
              <span>CHALLENGES</span>
            </div>
            <div>
              <strong>02</strong>
              <span>ARENAS</span>
            </div>
            <div>
              <strong>01</strong>
              <span>YOUR MOMENT</span>
            </div>
          </div>
          <a
            className="console-brochure"
            href={siteData.assets.brochureImage}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the official Talent Hunt brochure{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </Entrance>
      </div>
      <Entrance className="hero-bottom" delay={0.5}>
        <span>CREATE / COMPETE / EXPRESS</span>
        <a href="#explorer-pass">
          YOUR EXPLORER PASS <span aria-hidden="true">↓</span>
        </a>
      </Entrance>
    </section>
  );
}

const directions = ["Up", "Right", "Down", "Left"];
const arrows = ["↑", "→", "↓", "←"];
export function SignalGame() {
  const { completeMemory, state } = useExplorer();
  const [phase, setPhase] = useState<
    "idle" | "showing" | "input" | "won" | "lost"
  >("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const [cursor, setCursor] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  useEffect(() => {
    if (phase !== "showing") return;
    const timers: number[] = [];
    sequence.forEach((pad, index) => {
      timers.push(window.setTimeout(() => setLit(pad), index * 1050 + 100));
      timers.push(window.setTimeout(() => setLit(null), index * 1050 + 800));
    });
    timers.push(
      window.setTimeout(
        () => {
          setLit(null);
          setPhase("input");
        },
        sequence.length * 1050 + 150,
      ),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [phase, sequence]);
  const start = () => {
    setSequence([Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)]);
    setRound(1);
    setCursor(0);
    setHint(false);
    setLit(null);
    setPhase("showing");
  };
  const choose = (pad: number) => {
    if (phase !== "input") return;
    if (sequence[cursor] !== pad) {
      setPhase("lost");
      return;
    }
    if (cursor + 1 < sequence.length) {
      setCursor(cursor + 1);
      return;
    }
    completeMemory(round);
    if (round === 4) {
      setPhase("won");
      return;
    }
    setRound(round + 1);
    setCursor(0);
    setHint(false);
    setSequence([...sequence, Math.floor(Math.random() * 4)]);
    setPhase("showing");
  };
  const message =
    phase === "idle"
      ? "Watch the signal. Repeat the sequence. Four rounds to master."
      : phase === "showing"
        ? `Round ${round} · Watch: ${sequence.map((pad) => directions[pad]).join(", ")}`
        : phase === "input"
          ? `Your turn · ${cursor} of ${sequence.length} signals matched`
          : phase === "won"
            ? "SIGNAL MASTER. All four rounds complete!"
            : "Signal lost. Try a new pattern — you’ve got this.";
  return (
    <div
      className="signal-game"
      onKeyDown={(event) => {
        const index = [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
        ].indexOf(event.key);
        if (index >= 0 && phase === "input") {
          event.preventDefault();
          choose(index);
        }
      }}
    >
      <div className="game-header">
        <span className="micro">MINI GAME / SIGNAL SYNC</span>
        <span className="game-best">BEST {state.memoryBest}/4</span>
      </div>
      <h3>
        WARM UP
        <br />
        <em>YOUR INSTINCTS.</em>
      </h3>
      <p className="game-instructions">
        A memory challenge for your explorer pass. Use the buttons or arrow
        keys. +40 XP for each new round mastered.
      </p>
      <div className="game-rounds" aria-label={`Round ${round} of 4`}>
        {[1, 2, 3, 4].map((value) => (
          <span
            key={value}
            className={
              phase === "won" || round > value
                ? "round-done"
                : round === value && phase !== "idle"
                  ? "round-current"
                  : ""
            }
          >
            {value}
          </span>
        ))}
      </div>
      <div className="signal-pads">
        {directions.map((direction, index) => (
          <button
            key={direction}
            type="button"
            aria-label={direction}
            disabled={phase !== "input"}
            data-pad={index}
            className={`signal-pad signal-pad-${index} ${lit === index ? "pad-lit" : ""}`}
            onClick={() => choose(index)}
          >
            <span aria-hidden="true">{arrows[index]}</span>
            <small>{direction}</small>
          </button>
        ))}
      </div>
      <p className="game-message" role="status" aria-atomic="true">
        {message}
      </p>
      <div
        className="game-pattern"
        aria-label="Signal sequence"
        hidden={phase !== "showing" && !hint}
      >
        {sequence.map((pad, index) => (
          <span key={index} className="game-pattern-chip">
            {directions[pad]}
          </span>
        ))}
      </div>
      <div className="game-actions">
        <button className="button" onClick={start}>
          {phase === "idle"
            ? "Start warm-up"
            : phase === "won" || phase === "lost"
              ? "Play again"
              : "New pattern"}
          <span aria-hidden="true">↗</span>
        </button>
        {phase === "input" && (
          <button
            className="game-hint"
            aria-pressed={hint}
            onClick={() => setHint(!hint)}
          >
            {hint ? "Hide pattern" : "Show pattern"}
          </button>
        )}
      </div>
      <p className="game-note">
        Optional play. Explorer XP has no effect on official competition results
        or registration.
      </p>
    </div>
  );
}

export function ExplorerHub() {
  const { state, xp, reset, storageAvailable } = useExplorer();
  const [view, setView] = useState<"quests" | "saved" | "game">("quests");
  const [confirmReset, setConfirmReset] = useState(false);
  const badges = explorerBadges(state);
  const saved = siteData.events.filter((event) =>
    state.saved.includes(event.id),
  );
  const level = Math.floor(xp / 100) + 1;
  return (
    <section className="section explorer-hub" id="explorer-pass">
      <Reveal className="explorer-heading">
        <div>
          <Eyebrow>YOUR PERSONAL SIDE QUEST</Eyebrow>
          <h2>
            MORE THAN
            <br />
            <em>A SPECTATOR.</em>
          </h2>
        </div>
        <p>
          Discover your arena. Build your shortlist.
          <br />
          Collect a few bragging rights along the way.
        </p>
      </Reveal>
      <div className="explorer-layout">
        <Reveal className="explorer-pass">
          <div className="pass-top">
            <span className="micro">EXPLORER PASS / 2K26</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div className="pass-level">
            <div
              className="level-ring"
              style={
                {
                  "--level-progress": `${(xp % 100) * 3.6}deg`,
                } as CSSProperties
              }
            >
              <strong>{String(level).padStart(2, "0")}</strong>
              <span>LEVEL</span>
            </div>
            <div>
              <p className="micro">
                {level < 3
                  ? "THE CURIOUS ONE"
                  : level < 5
                    ? "ARENA EXPLORER"
                    : "THE NEXT LEGEND"}
              </p>
              <strong>
                {xp}
                <small> XP</small>
              </strong>
              <p>{100 - (xp % 100)} XP to the next level</p>
            </div>
          </div>
          <div
            className="pass-progress"
            role="progressbar"
            aria-label="Progress to next level"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={xp % 100}
          >
            <span style={{ width: `${xp % 100}%` }} />
          </div>
          <div className="pass-stats">
            <div>
              <strong>
                {state.visited.length}
                <small>/16</small>
              </strong>
              <span>DISCOVERED</span>
            </div>
            <div>
              <strong>{state.saved.length}</strong>
              <span>SAVED</span>
            </div>
            <div>
              <strong>
                {badges.filter((badge) => badge.done).length}
                <small>/5</small>
              </strong>
              <span>BADGES</span>
            </div>
          </div>
          <p className="pass-note">
            {storageAvailable
              ? "Your progress lives on this device. No account needed."
              : "Storage is unavailable. Your pass works for this visit."}
          </p>
          <Link to="/events/technical" className="pass-explore">
            Discover an event <span aria-hidden="true">↗</span>
          </Link>
          {confirmReset ? (
            <div className="reset-confirm">
              <p>Clear your saved events, XP, and badges?</p>
              <button
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
              >
                Yes, reset pass
              </button>
              <button onClick={() => setConfirmReset(false)}>
                Keep my pass
              </button>
            </div>
          ) : (
            <button
              className="pass-reset"
              onClick={() => setConfirmReset(true)}
            >
              Reset my pass
            </button>
          )}
        </Reveal>
        <div className="quest-panel">
          <div
            className="quest-tabs"
            role="tablist"
            aria-label="Explorer pass sections"
          >
            {(
              [
                ["quests", "Side quests"],
                ["saved", `Saved events (${saved.length})`],
                ["game", "Play warm-up"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                id={`explorer-tab-${id}`}
                aria-selected={view === id}
                aria-controls="explorer-panel"
                tabIndex={view === id ? 0 : -1}
                onClick={() => setView(id)}
                onKeyDown={(event) => {
                  const tabs = ["quests", "saved", "game"] as const;
                  const current = tabs.indexOf(view);
                  let next: number;
                  if (event.key === "ArrowRight") next = (current + 1) % 3;
                  else if (event.key === "ArrowLeft") next = (current + 2) % 3;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 2;
                  else return;
                  event.preventDefault();
                  setView(tabs[next]);
                  document
                    .getElementById(`explorer-tab-${tabs[next]}`)
                    ?.focus();
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            id="explorer-panel"
            role="tabpanel"
            aria-labelledby={`explorer-tab-${view}`}
            tabIndex={0}
            className="quest-content"
          >
            {view === "quests" && (
              <>
                <p className="quest-intro">
                  Every event you explore earns 25 XP. Discover, save, and play
                  at your own pace.
                </p>
                <div className="quest-list">
                  {badges.map((badge, index) => (
                    <div
                      className={`quest-row ${badge.done ? "quest-done" : ""}`}
                      key={badge.id}
                    >
                      <span className="quest-icon" aria-hidden="true">
                        {badge.done ? "✓" : ["↗", "◈", "⌘", "✦", "♜"][index]}
                      </span>
                      <div>
                        <h3>{badge.title}</h3>
                        <p>{badge.description}</p>
                      </div>
                      <span className="quest-count">
                        {badge.done
                          ? "UNLOCKED"
                          : `${badge.progress}/${badge.total}`}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {view === "saved" &&
              (saved.length ? (
                <div className="saved-list">
                  {saved.map((event) => (
                    <div className="saved-event" key={event.id}>
                      <span className="saved-category">
                        {event.category === "technical" ? "TECH" : "OPEN"}
                      </span>
                      <Link to={`/events/${event.slug}`}>
                        <strong>{event.name}</strong>
                        <span>{event.venue || siteData.settings.venue} ↗</span>
                      </Link>
                      <SaveEventButton event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="quest-empty">
                  <span aria-hidden="true">⌘</span>
                  <h3>BUILD YOUR LINE-UP.</h3>
                  <p>Tap the bookmark on any event to keep it here.</p>
                  <ButtonLink to="/events/technical">
                    Find your first event
                  </ButtonLink>
                </div>
              ))}
            {view === "game" && <SignalGame />}
          </div>
        </div>
      </div>
    </section>
  );
}
