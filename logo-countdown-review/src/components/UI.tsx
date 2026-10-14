import {
  Component,
  useEffect,
  useId,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
  type ImgHTMLAttributes,
  type CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "./Experience";
import {
  siteData,
  type Announcement,
  type Coordinator,
  type EventRecord,
  type FAQ,
} from "../data/siteData";
import { assetExists, safeUrl } from "../lib/content";

export function Arrow({ back = false }: { back?: boolean }) {
  return <span aria-hidden="true">{back ? "↙" : "↗"}</span>;
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" className="signal" />
      {children}
    </p>
  );
}
export function SmartImage({
  src,
  alt,
  fallback = null,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { fallback?: ReactNode }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return !src || failed || !assetExists(src) ? (
    <>{fallback}</>
  ) : (
    <img {...props} src={src} alt={alt} onError={() => setFailed(true)} />
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [26, 0], opacity: [0.45, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.85, delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  return (
    <Link
      ref={ref}
      className={`button ${secondary ? "button-secondary" : ""}`}
      to={to}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduced || !ref.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.07}px ${(e.clientY - r.top - r.height / 2) * 0.1}px`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.translate = "0 0";
      }}
      onBlur={() => {
        if (ref.current) ref.current.style.translate = "0 0";
      }}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function BrochureLink({ small = false }: { small?: boolean }) {
  return assetExists(siteData.assets.brochurePdf) ? (
    <a
      className={small ? "text-link" : "button button-secondary"}
      href={siteData.assets.brochurePdf}
      download
    >
      Download Brochure <span aria-hidden="true">↓</span>
    </a>
  ) : assetExists(siteData.assets.brochureImage) ? (
    <a
      className={small ? "text-link" : "button button-secondary"}
      href={siteData.assets.brochureImage}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Official Brochure <Arrow />
    </a>
  ) : (
    <span className="muted">
      Brochure download will be available when supplied.
    </span>
  );
}

const drawings = [
  <path d="m75 76-40 44 40 44m90-88 40 44-40 44m-26-104-35 120" />,
  <>
    <rect x="32" y="55" width="176" height="130" rx="8" />
    <path d="M32 84h176M47 70h2m12 0h2m12 0h2M55 105h55v54H55zm72 2h58m-58 20h45m-45 20h58" />
  </>,
  <>
    <path d="m65 65 110 18-92 89 100-8M65 65l18 107m92-89 8 81M65 65l118 99M83 172l92-89" />
    {[
      [65, 65],
      [175, 83],
      [83, 172],
      [183, 164],
      [120, 118],
    ].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r="13" />
    ))}
  </>,
  <>
    <rect x="65" y="65" width="110" height="110" rx="15" />
    <rect x="89" y="89" width="62" height="62" rx="3" />
    {[85, 120, 155].map((n) => (
      <path key={n} d={`M${n} 40v25m0 110v25M40 ${n}h25m110 0h25`} />
    ))}
  </>,
  <>
    <path d="M70 80h100c22 0 44 91 26 99-16 8-40-28-46-28H90c-6 0-30 36-46 28-18-8 4-99 26-99Z" />
    <path d="M69 105v38m-19-19h38" />
    <circle cx="163" cy="113" r="6" />
    <circle cx="178" cy="135" r="6" />
  </>,
  <>
    <rect x="94" y="40" width="52" height="108" rx="26" />
    <path d="M73 118a47 47 0 0 0 94 0m-47 47v35m-30 0h60M95 69h50m-50 21h50" />
  </>,
  <>
    <path d="m120 30 77 30v62c0 39-77 88-77 88s-77-49-77-88V60Z" />
    <path d="m86 119 24 24 47-48" />
  </>,
  <>
    <path d="m120 34 22 63 64 23-64 23-22 63-23-63-63-23 63-23Z" />
    <path d="m185 24 8 20 20 8-20 8-8 20-8-20-20-8 20-8Z" />
  </>,
  <>
    <path d="M38 78h45l13-23h48l13 23h45v105H38Z" />
    <circle cx="120" cy="128" r="34" />
    <circle cx="120" cy="128" r="19" />
    <path d="M166 96h20" />
  </>,
  <>
    <circle cx="100" cy="100" r="60" />
    <path d="m143 143 60 60M85 80c5-20 35-20 35 0 0 14-20 14-20 30m0 14v3" />
  </>,
  <>
    <path d="M101 72c0-26 38-26 38-3 0 13-19 15-19 29v16l84 53c10 7 2 16-9 16H45c-11 0-19-9-9-16l84-53" />
  </>,
  <>
    <rect x="30" y="59" width="180" height="122" rx="30" />
    <path d="m101 91 49 30-49 30Z" />
  </>,
  <>
    <path d="M45 141v-23a75 75 0 0 1 150 0v39H85l-22 32-20-18 20-29m42-64h70m-78 48h103" />
    <path d="M120 42v35" />
  </>,
  <>
    <circle cx="120" cy="120" r="85" />
    <path d="m120 87 34 25-13 40H99l-13-40Zm0 0V35m34 77 47-21m-60 61 26 40m-68-40-26 40m13-80L39 91" />
  </>,
  <>
    <path d="m33 65 87 108 87-108M33 105l87 108 87-108" />
    <path d="m83 46 37 46 37-46" />
  </>,
  <>
    <path d="m86 42 64 64-32 32-64-64Zm33 95 67 67m-59-163 46 46M44 81l46 46M37 199h75v13H37Z" />
  </>,
];
export function EventArt({
  event,
  hero = false,
  shared = true,
}: {
  event: EventRecord;
  hero?: boolean;
  shared?: boolean;
}) {
  const reduced = useReducedMotion();
  const i = siteData.events.findIndex((e) => e.id === event.id);
  return (
    <motion.div
      layoutId={reduced || !shared ? undefined : `art-${event.id}`}
      transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
      className={`event-art art-${i % 4} ${event.category === "non-technical" ? "art-orange" : ""} ${hero ? "art-hero" : ""}`}
      aria-hidden="true"
    >
      <span className="art-grid" />
      <span className="art-light" />
      <span className="art-sculpture" />
      <span className="art-orbit" />
      <span className="art-orbit art-orbit-second" />
      <span className="art-type">{event.name}</span>
      <span className="art-number">{String(event.order).padStart(2, "0")}</span>
      {event.artwork && assetExists(event.artwork) ? (
        <SmartImage src={event.artwork} alt="" />
      ) : (
        <svg
          viewBox="0 0 240 240"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {drawings[i] || drawings[0]}
        </svg>
      )}
      <span className="art-caption">
        <span className="art-crosshair">+</span> TH / 26{" "}
        <span className="art-barcode" />
      </span>
    </motion.div>
  );
}
export function EventCard({ event }: { event: EventRecord }) {
  const reduced = useReducedMotion();
  const reset = (element: HTMLAnchorElement) => {
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  };
  return (
    <motion.article
      layout={!reduced}
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileInView={reduced ? {} : { y: [32, 0], opacity: [0.4, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : ((event.order - 1) % 3) * 0.09,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.35 },
      }}
      className={`event-card ${event.category === "non-technical" ? "card-orange" : ""}`}
      style={{ "--card-order": (event.order - 1) % 3 } as CSSProperties}
    >
      <Link
        to={`/events/${event.slug}`}
        aria-label={`Explore ${event.name}`}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          e.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
          e.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
          e.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
          e.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
        }}
        onPointerLeave={(e) => reset(e.currentTarget)}
        onBlur={(e) => reset(e.currentTarget)}
      >
        <div className="card-topline">
          <span className="card-category">
            <span className="card-category-dot" />
            {siteData.categories[event.category].short}
          </span>
          <span className="card-edition">
            <span className="card-edition-num">#0{event.order}</span>
          </span>
        </div>
        <EventArt event={event} />
        <div className="card-copy">
          <div className="card-badges-row">
            <span className="card-chip">2026 EDITION</span>
            <span className="card-chip">
              {event.category === "technical" ? "TECH ARENA" : "OPEN ARENA"}
            </span>
            <span className="card-chip card-venue-chip" title="Event Venue">
              📍 {event.venue || "VENUE TBA"}
            </span>
          </div>
          <motion.h3 layoutId={reduced ? undefined : `title-${event.id}`}>
            {event.name}
          </motion.h3>
          {event.description && <p>{event.description}</p>}
          <span className="card-action">
            <span className="card-action-label">
              <span>Explore Event</span>
              <span className="card-action-sub">Brochure Official</span>
            </span>
            <span className="card-arrow">
              <Arrow />
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
export function EventGrid({ events }: { events: EventRecord[] }) {
  return (
    <div className="event-grid">
      <AnimatePresence initial={false}>
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </AnimatePresence>
    </div>
  );
}
export function Accordion({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <div className="accordion">
      <h3>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {faq.question}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </h3>
      <motion.div
        id={id}
        hidden={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.25 }}
      >
        <p>{faq.answer}</p>
      </motion.div>
    </div>
  );
}
export function CoordinatorCard({ person }: { person: Coordinator }) {
  return (
    <article className="person">
      <span className="micro">{person.role}</span>
      <h3>{person.name}</h3>
      {person.phone && /^\+?[\d ()-]{7,20}$/.test(person.phone) && (
        <a href={`tel:${person.phone.replace(/[ ()-]/g, "")}`}>
          {person.phone}
        </a>
      )}
      {person.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) && (
        <a href={`mailto:${person.email}`}>{person.email}</a>
      )}
      {safeUrl(person.url) && (
        <a href={person.url} target="_blank" rel="noopener noreferrer">
          Contact <Arrow />
        </a>
      )}
    </article>
  );
}
const dismissedMemory = new Set<string>();
export function AnnouncementBanner({
  announcement,
}: {
  announcement: Announcement;
}) {
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    let value = dismissedMemory.has(announcement.id);
    try {
      value ||=
        localStorage.getItem(`th26:announcement:${announcement.id}`) ===
        "dismissed";
    } catch {
      /* In-memory fallback. */
    }
    setDismissed(value);
  }, [announcement.id]);
  if (dismissed) return null;
  return (
    <aside className="announcement">
      <p>
        {announcement.message}{" "}
        {safeUrl(announcement.url) && (
          <a href={announcement.url} target="_blank" rel="noopener noreferrer">
            Read more ↗
          </a>
        )}
      </p>
      <button
        aria-label="Dismiss announcement"
        onClick={() => {
          dismissedMemory.add(announcement.id);
          try {
            localStorage.setItem(
              `th26:announcement:${announcement.id}`,
              "dismissed",
            );
          } catch {
            /* Current-session dismissal still works. */
          }
          setDismissed(true);
        }}
      >
        ×
      </button>
    </aside>
  );
}
export function ShareActions() {
  const [message, setMessage] = useState("");
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Link copied.");
    } catch {
      setMessage("Copy was unavailable. Select and copy the link below.");
    }
  }
  return (
    <div className="share">
      <button className="text-link" onClick={copy}>
        Copy Link ↗
      </button>
      {canShare && (
        <button
          className="text-link"
          onClick={async () => {
            try {
              await navigator.share({
                title: document.title,
                url: window.location.href,
              });
              setMessage("Share dialog completed.");
            } catch (e) {
              setMessage(
                e instanceof Error && e.name === "AbortError"
                  ? "Sharing cancelled."
                  : "Sharing unavailable. Use Copy Link.",
              );
            }
          }}
        >
          Share ↗
        </button>
      )}
      <span role="status">{message}</span>
      {message.startsWith("Copy was") && (
        <input
          aria-label="Page link"
          readOnly
          value={window.location.href}
          onFocus={(e) => e.target.select()}
        />
      )}
    </div>
  );
}
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error(error, info);
  }
  render() {
    return this.state.failed ? (
      <main className="error-screen">
        <Eyebrow>TALENT HUNT 2K26</Eyebrow>
        <h1>
          LET’S RESET
          <br />
          THE STAGE.
        </h1>
        <p>Something interrupted this page. Please try again.</p>
        <button
          className="button"
          onClick={() => this.setState({ failed: false })}
        >
          Try Again
        </button>
        <a className="button button-secondary" href="/">
          Return Home
        </a>
      </main>
    ) : (
      this.props.children
    );
  }
}
