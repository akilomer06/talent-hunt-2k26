import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  siteData,
  type Category,
  type CoordinatorGroup,
  type EventRecord,
} from "../data/siteData";
import {
  assetExists,
  countdown,
  inCategory,
  isArchived,
  neighbours,
  registrationStatus,
} from "../lib/content";
import {
  Accordion,
  AnnouncementBanner,
  Arrow,
  BrochureLink,
  ButtonLink,
  CoordinatorCard,
  EventArt,
  EventGrid,
  Eyebrow,
  Reveal,
  ShareActions,
  SmartImage,
} from "../components/UI";
import { Entrance } from "../components/Experience";
import { ArcadeHero, ExplorerHub } from "../components/Arcade";
import { SaveEventButton, useExplorer } from "../components/Explorer";

export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
export function DateStrip() {
  const now = useNow();
  const value = now === null ? null : countdown(siteData.countdown, now);
  return (
    <section className="date-strip" aria-label="Event date">
      <div className="date-block">
        <span className="date-number">26</span>
        <div>
          <strong>OCTOBER 2026</strong>
          <span>MONDAY</span>
        </div>
      </div>
      {now !== null && isArchived(now) ? (
        <p>{siteData.settings.archiveMessage}</p>
      ) : value ? (
        value.remaining > 0 ? (
          <div className="countdown-panel">
            <span className="countdown-kicker">
              YOUR MOMENT IS GETTING CLOSER
            </span>
            <div
              className="countdown"
              aria-label="Time until event"
              role="timer"
            >
              {(["days", "hours", "minutes", "seconds"] as const).map((key) => (
                <div key={key}>
                  <motion.strong initial={false}>
                    {String(value[key]).padStart(2, "0")}
                  </motion.strong>
                  <span>{key}</span>
                </div>
              ))}
            </div>
            <span className="countdown-start">{siteData.countdown.label}</span>
          </div>
        ) : (
          <p>{siteData.settings.eventConcludedMessage}</p>
        )
      ) : (
        <div className="date-message">
          <span className="micro">MARK YOUR CALENDAR</span>
          <p>The date is set. Your moment is next.</p>
        </div>
      )}
      <div className="date-venue">
        <span aria-hidden="true">↗</span>
        <div>
          <strong>AUDITORIUM</strong>
          <span>B.S. Abdur Rahman Crescent</span>
        </div>
      </div>
    </section>
  );
}
function SectionHeading({
  number,
  title,
  link,
  label,
}: {
  number: string;
  title: string;
  link?: string;
  label?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">{number} / FIND YOUR ARENA</p>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" to={link}>
          {label || "View all events"} <Arrow />
        </Link>
      )}
    </Reveal>
  );
}
export function Featured() {
  const { state } = useExplorer();
  const list = siteData.featuredIds
    .map((id) => siteData.events.find((e) => e.id === id))
    .filter((e): e is EventRecord => !!e);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion() || state.motionPaused;
  useEffect(() => {
    if (list.length < 2 || hover || focus || paused || reduced) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [list.length, hover, focus, paused, reduced]);
  if (!list.length) return null;
  const event = list[index % list.length];
  return (
    <section
      className="featured"
      aria-roledescription="carousel"
      aria-label="Featured events"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      }}
    >
      <div className="featured-copy">
        <Eyebrow>IN THE SPOTLIGHT</Eyebrow>
        <h2>
          FIND YOUR
          <br />
          <em>MAIN EVENT.</em>
        </h2>
        <div className="carousel-controls">
          <button
            aria-label="Previous featured event"
            onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
          >
            ←
          </button>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(list.length).padStart(2, "0")}
          </span>
          <button
            aria-label="Next featured event"
            onClick={() => setIndex((i) => (i + 1) % list.length)}
          >
            →
          </button>
          <button
            className="carousel-pause"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <div
        className="featured-event"
        aria-live={paused || hover || focus ? "polite" : "off"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={event.id}
            initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 45 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : -35 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/events/${event.slug}`}>
              <div className="featured-art">
                <EventArt event={event} shared={false} />
              </div>
              <span className="micro">
                {siteData.categories[event.category].short}
              </span>
              <h3>
                {event.name}
                <Arrow />
              </h3>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
export function ScheduleContent({ preview = false }: { preview?: boolean }) {
  const entries = preview ? siteData.schedule.slice(0, 3) : siteData.schedule;
  return (
    <div className="timeline">
      {entries.length ? (
        entries
          .filter((e) => e.time && e.title)
          .map((e) => (
            <Reveal key={e.id} className="timeline-row">
              <span className="timeline-dot" />
              <time>{e.time}</time>
              <div>
                <h3>{e.title}</h3>
                {e.description && <p>{e.description}</p>}
                {e.eventId &&
                  siteData.events.find((v) => v.id === e.eventId) && (
                    <Link
                      className="text-link"
                      to={`/events/${siteData.events.find((v) => v.id === e.eventId)!.slug}`}
                    >
                      Explore Event ↗
                    </Link>
                  )}
              </div>
            </Reveal>
          ))
      ) : (
        <div className="timeline-row">
          <span className="timeline-dot" />
          <div className="timeline-date">
            <strong>26 OCT</strong>
            <span>MONDAY / 2026</span>
          </div>
          <div>
            <h3>A day for your talent.</h3>
            <p>{siteData.copy.schedulePending}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export function Home() {
  return (
    <>
      {siteData.announcements.map((a) => (
        <AnnouncementBanner key={a.id} announcement={a} />
      ))}
      <ArcadeHero />
      <Reveal>
        <DateStrip />
      </Reveal>
      <ExplorerHub />
      <section className="section intro-section">
        <Reveal>
          <Eyebrow>NOT JUST ANOTHER DAY ON CAMPUS</Eyebrow>
          <h2>{siteData.copy.introHeading}</h2>
        </Reveal>
        <Reveal className="intro-description">
          <span className="big-asterisk" aria-hidden="true">
            ✳
          </span>
          <p>{siteData.copy.intro}</p>
          <BrochureLink />
        </Reveal>
      </section>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <span key={copy}>THINK. CREATE. COMPETE. REPEAT. ↗&nbsp;</span>
          ))}
        </div>
      </div>
      <section className="section" id="competitions">
        <SectionHeading
          number="01"
          title="TECHNICAL."
          link="/events/technical"
        />
        <EventGrid events={inCategory("technical")} />
      </section>
      <section className="section nontechnical-section">
        <SectionHeading
          number="02"
          title="BEYOND THE CODE."
          link="/events/non-technical"
        />
        <EventGrid events={inCategory("non-technical")} />
      </section>
      <Reveal>
        <Featured />
      </Reveal>
      <section className="section">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>THE PROGRAMME</Eyebrow>
            <h2>
              A DATE WITH
              <br />
              POSSIBILITY.
            </h2>
          </div>
          <Link className="text-link" to="/schedule">
            View Schedule <Arrow />
          </Link>
        </Reveal>
        <ScheduleContent preview />
      </section>
      {/* registration callout removed per user request */}
      <section className="section venue-preview">
        <Reveal className="venue-graphic">
          <span className="venue-pin">↗</span>
          <div className="venue-lines" />
          <span className="micro">CRESCENT / AUDITORIUM</span>
        </Reveal>
        <Reveal delay={0.12}>
          <Eyebrow>MEET AT THE AUDITORIUM</Eyebrow>
          <h2>
            THIS IS
            <br />
            THE PLACE.
          </h2>
          <p>{siteData.settings.venue}</p>
          <ButtonLink to="/venue" secondary>
            Venue Details
          </ButtonLink>
        </Reveal>
      </section>
      <section className="section faq-preview">
        <Reveal>
          <Eyebrow>BEFORE YOU STEP IN</Eyebrow>
          <h2>
            GOOD
            <br />
            QUESTIONS.
          </h2>
          <Link to="/faqs" className="text-link">
            All FAQs <Arrow />
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          {siteData.faqs.slice(0, 3).map((f) => (
            <Accordion key={f.id} faq={f} />
          ))}
        </Reveal>
      </section>
    </>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Entrance className="page-heading" delay={0.06}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {children}
    </Entrance>
  );
}
export function CategoryPage({ category }: { category: Category }) {
  const list = inCategory(category);
  return (
    <section
      className={`section category-page ${category === "non-technical" ? "orange-page" : ""}`}
    >
      <PageHeading
        eyebrow={`${siteData.categories[category].title} / 08 COMPETITIONS`}
        title={siteData.categories[category].headline}
      >
        <p>{siteData.categories[category].intro}</p>
      </PageHeading>
      <div className="category-tabs">
        <Link
          aria-current={category === "technical" ? "page" : undefined}
          to="/events/technical"
        >
          Technical <span>08</span>
        </Link>
        <Link
          aria-current={category === "non-technical" ? "page" : undefined}
          to="/events/non-technical"
        >
          Non-Technical <span>08</span>
        </Link>
      </div>
      <p className="result-count" role="status">
        {list.length} competitions · Official brochure order
      </p>
      <EventGrid events={list} />
    </section>
  );
}
export function EventPage() {
  const { slug } = useParams();
  const event = siteData.events.find((e) => e.slug === slug);
  const reduced = useReducedMotion();
  if (!event) return <NotFound />;
  const { previous, next } = neighbours(event);
  const sections = [
    ["Rules & Regulations", event.rules],
    ["Participation Requirements", event.participation],
    ["Rounds & Format", event.rounds],
    ["Equipment & Software", event.equipment],
    ["Prizes & Judging Criteria", event.prizes],
  ] as const;
  return (
    <article
      className={`event-page ${event.category === "non-technical" ? "orange-page" : ""}`}
    >
      <section className="section event-hero">
        <Entrance delay={0.08}>
          <Link className="text-link" to={`/events/${event.category}`}>
            ← {siteData.categories[event.category].title}
          </Link>
          <Eyebrow>
            {siteData.categories[event.category].short} /{" "}
            {String(event.order).padStart(2, "0")}
          </Eyebrow>
          <motion.h1 layoutId={reduced ? undefined : `title-${event.id}`}>
            {event.name}
          </motion.h1>
          <p className="event-subtitle">
            {event.description ||
              `${siteData.settings.title} · ${siteData.settings.dateLabel}`}
          </p>
          <div className="event-venue-banner">
            <span className="venue-badge-pill">
              <span className="venue-badge-icon">📍</span>
              <span className="venue-badge-label">VENUE:</span>
              <strong className="venue-badge-name">
                {event.venue || "Venue TBA"}
              </strong>
            </span>
          </div>
          <div className="button-row">
            <ButtonLink to="/register">Register Now</ButtonLink>
            <SaveEventButton event={event} detail />
            <ShareActions />
          </div>
          <p className="eligibility">{siteData.settings.eligibility}</p>
        </Entrance>
        <Entrance delay={0.2}>
          <EventArt event={event} hero />
        </Entrance>
      </section>
      <section className="section event-content">
        <div>
          <Eyebrow>THE COMPETITION</Eyebrow>
          <h2>
            MAKE IT
            <br />
            YOUR MOMENT.
          </h2>
          <p>{event.overview || siteData.copy.eventDetailsPending}</p>
          {sections
            .filter(([, items]) => items.length)
            .map(([title, items]) => (
              <Reveal key={title} className="detail-section">
                <h2>{title}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          {event.faqs.length > 0 && (
            <div className="detail-section">
              <h2>Event FAQs</h2>
              {event.faqs.map((f) => (
                <Accordion key={f.id} faq={f} />
              ))}
            </div>
          )}
        </div>
        <aside className="event-facts">
          <span className="micro">AT A GLANCE</span>
          <dl>
            <dt>Category</dt>
            <dd>{siteData.categories[event.category].short}</dd>
            <dt>Date</dt>
            <dd>{siteData.settings.dateLabel}</dd>
            <dt>Venue</dt>
            <dd>
              <strong>{event.venue || "Venue TBA"}</strong>
              {event.venue && event.venue !== siteData.settings.venue ? (
                <span className="venue-campus-note">
                  {" "}
                  · {siteData.settings.venue}
                </span>
              ) : null}
            </dd>
            <dt>Eligibility</dt>
            <dd>{siteData.settings.eligibility}</dd>
          </dl>
          {event.faculty.map((p) => (
            <CoordinatorCard key={p.id} person={p} />
          ))}
          {event.students.map((p) => (
            <CoordinatorCard key={p.id} person={p} />
          ))}
        </aside>
      </section>
      <nav className="event-pagination" aria-label="Events in brochure order">
        {previous ? (
          <Link to={`/events/${previous.slug}`}>
            <span className="micro">← PREVIOUS EVENT</span>
            <strong>{previous.name}</strong>
          </Link>
        ) : (
          <Link to={`/events/${event.category}`}>
            <span className="micro">FIRST IN THIS CATEGORY</span>
            <strong>
              All {siteData.categories[event.category].short} Events
            </strong>
          </Link>
        )}
        {next ? (
          <Link to={`/events/${next.slug}`}>
            <span className="micro">NEXT EVENT →</span>
            <strong>{next.name}</strong>
          </Link>
        ) : (
          <Link to={`/events/${event.category}`}>
            <span className="micro">YOU’VE EXPLORED THE CATEGORY</span>
            <strong>Back to all events ↗</strong>
          </Link>
        )}
      </nav>
      {event.relatedIds.length > 0 && (
        <section className="section">
          <h2>KEEP EXPLORING.</h2>
          <EventGrid
            events={siteData.events.filter((e) =>
              event.relatedIds.includes(e.id),
            )}
          />
        </section>
      )}
    </article>
  );
}
export function Registration() {
  const now = useNow();
  const config = siteData.registration;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    if (!assetExists(config.qr)) return;
    const image = new Image();
    image.onload = () => setLoaded(true);
    image.onerror = () => setFailed(true);
    image.src = config.qr;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [config.qr]);
  const status =
    now === null
      ? "unconfigured"
      : registrationStatus(config, now, !failed && assetExists(config.qr));
  const archived = now !== null && isArchived(now);
  const canRegister =
    (status === "available" || status === "open") && !archived;
  const label = archived
    ? "Registration Closed"
    : status === "open"
      ? "Register Now"
      : status === "available"
        ? "Official registration"
        : status === "soon"
          ? "Registration Opens Soon"
          : status === "closed"
            ? "Registration Closed"
            : "STAY READY.";
  return (
    <section className="section registration-page">
      <PageHeading
        eyebrow="REGISTRATION / TALENT HUNT 2K26"
        title={"TAKE YOUR\nPLACE."}
      />
      <div className="registration-panel">
        <div className="registration-qr-panel">
          <span className="micro">SCAN TO REGISTER</span>
          {canRegister && loaded ? (
            <a
              href={config.url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open registration form using QR code"
            >
              <img
                src={config.qr!}
                alt="Official registration QR code"
                width="370"
                height="370"
                onError={() => {
                  setLoaded(false);
                  setFailed(true);
                }}
              />
            </a>
          ) : (
            <span aria-hidden="true">↗</span>
          )}
          <p>
            {canRegister
              ? "Scan with your phone camera to open the official form."
              : "Official registration information"}
          </p>
        </div>
        <div>
          <span className={`status-pill ${canRegister ? "status-open" : ""}`}>
            <span aria-hidden="true">●</span> {label}
          </span>
          <h2>
            {archived || status === "closed"
              ? "REGISTRATION\nHAS CLOSED."
              : canRegister
                ? "YOUR NEXT STEP."
                : "YOUR MOMENT\nIS COMING."}
          </h2>
          <p>
            {archived
              ? siteData.settings.archiveMessage
              : status === "unconfigured"
                ? siteData.copy.registrationPending
                : status === "soon"
                  ? "The official registration window has not opened yet."
                  : status === "closed"
                    ? "The official registration window has closed."
                    : "Scan the QR code or open the official Google Form to register."}
          </p>
          {canRegister && loaded && (
            <div className="registration-form-action">
              <a
                className="button"
                href={config.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Registration Form ↗
              </a>
            </div>
          )}
          {config.instructions.length > 0 && (
            <ul>
              {config.instructions.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          )}
          <div className="eligibility-box">
            <strong>{siteData.settings.eligibility}</strong>
            <p>{siteData.settings.eligibilityNote}</p>
          </div>
          <p className="small-print">
            Registration is completed externally. This website does not collect
            submissions or confirm registration.
          </p>
          <div className="registration-support">
            <Link className="text-link" to="/faqs">
              Registration questions? ↗
            </Link>
            <BrochureLink small />
          </div>
        </div>
      </div>
    </section>
  );
}
export function StandardPage({ page }: { page: string }) {
  const m = siteData.pages[page];
  return (
    <section className="section standard-page">
      <PageHeading
        eyebrow={`TALENT HUNT 2K26 / ${page.slice(1).toUpperCase()}`}
        title={m.title}
      />
      {page === "/schedule" && (
        <>
          <DateStrip />
          <ScheduleContent />
        </>
      )}
      {page === "/about" && (
        <>
          <div className="editorial-grid">
            <div>
              <h2>
                16 WAYS TO
                <br />
                <em>SHOW UP.</em>
              </h2>
              <p>{siteData.copy.about}</p>
              <p>{siteData.settings.eligibility}</p>
              <div className="button-row">
                <ButtonLink to="/events/technical">Technical Events</ButtonLink>
                <ButtonLink to="/events/non-technical" secondary>
                  Non-Technical Events
                </ButtonLink>
              </div>
            </div>
            <SmartImage
              className="about-brochure"
              src={siteData.assets.brochureImage}
              alt="Official Talent Hunt 2K26 brochure"
              width="1024"
              height="1536"
            />
          </div>
          <div className="organiser-block">
            <Eyebrow>PRESENTED BY</Eyebrow>
            <h2>{siteData.settings.department}</h2>
            <p>{siteData.settings.school}</p>
            <p>{siteData.settings.college}</p>
          </div>
        </>
      )}
      {page === "/venue" && (
        <div className="venue-full">
          <div className="venue-graphic" aria-hidden="true">
            <span className="venue-pin">↗</span>
            <div className="venue-lines" />
            <span className="micro">CRESCENT / AUDITORIUM</span>
          </div>
          <div>
            <Eyebrow>THE OFFICIAL VENUE</Eyebrow>
            <h2>AUDITORIUM.</h2>
            <p>{siteData.settings.college}</p>
            <p>
              {siteData.settings.dateLabel} · {siteData.settings.weekday}
            </p>
            {siteData.settings.address && (
              <address>{siteData.settings.address}</address>
            )}
            {siteData.settings.directions.length ? (
              siteData.settings.directions.map((d) => <p key={d}>{d}</p>)
            ) : (
              <p className="muted">{siteData.copy.venuePending}</p>
            )}
            <ButtonLink to="/schedule" secondary>
              View Programme
            </ButtonLink>
          </div>
        </div>
      )}
      {page === "/faqs" && (
        <div className="faq-groups">
          {[...new Set(siteData.faqs.map((f) => f.category))].map(
            (category) => (
              <div key={category}>
                <h2>{category}</h2>
                {siteData.faqs
                  .filter((f) => f.category === category)
                  .map((f) => (
                    <Accordion key={f.id} faq={f} />
                  ))}
              </div>
            ),
          )}
        </div>
      )}
      {page === "/contact" && (
        <>
          <p className="page-lead">
            {siteData.settings.department}
            <br />
            {siteData.settings.school}
          </p>
          <div className="people-grid">
            {siteData.coordinators.map((p) => (
              <CoordinatorCard key={p.id} person={p} />
            ))}
          </div>
          <div className="contact-social">
            <Eyebrow>FOLLOW THE EVENT</Eyebrow>
            {siteData.socialLinks.map((s) => (
              <a
                key={s.url}
                className="text-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.handle} ↗
              </a>
            ))}
            <p>
              Coordinator contact methods will be added when officially
              supplied.
            </p>
          </div>
        </>
      )}
      {page === "/privacy" && (
        <div className="prose">
          {siteData.copy.privacy.map((p) => (
            <section key={p.title}>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
export function NotFound() {
  return (
    <section className="section not-found">
      <Eyebrow>OFF THE PROGRAMME</Eyebrow>
      <div className="error-number" aria-hidden="true">
        4<span>0</span>4
      </div>
      <h1>PAGE NOT FOUND.</h1>
      <p>This link doesn’t lead to an event. Let’s find your way back.</p>
      <div className="button-row">
        <ButtonLink to="/">Return Home</ButtonLink>
        <ButtonLink to="/events/technical" secondary>
          Explore Events
        </ButtonLink>
      </div>
    </section>
  );
}
export function CoordinatorsPage() {
  const groups = siteData.coordinatorGroups as CoordinatorGroup[];
  const [activeTab, setActiveTab] = useState(groups[0]?.id ?? "");
  const current = groups.find((g) => g.id === activeTab) ?? groups[0];
  const reduced = useReducedMotion();
  return (
    <section className="section coordinators-page">
      <PageHeading eyebrow="TALENT HUNT 2K26 / THE TEAM" title="MEET THE CREW.">
        <p>
          Convenors, faculty, student, and event coordinators who make Talent
          Hunt happen.
        </p>
      </PageHeading>
      <div
        className="coord-tabs"
        role="tablist"
        aria-label="Coordinator groups"
      >
        {groups.map((g) => (
          <button
            key={g.id}
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={g.id === activeTab}
            aria-controls={`panel-${g.id}`}
            className={`coord-tab ${g.id === activeTab ? "coord-tab-active" : ""}`}
            onClick={() => setActiveTab(g.id)}
          >
            {g.label}
            {g.members.length > 0 && (
              <span className="coord-tab-count">{g.members.length}</span>
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="coord-grid"
        >
          {current?.members.length === 0 && (
            <div className="empty-state">
              <h2>NAMES COMING SOON.</h2>
              <p>The coordinator list will be announced soon.</p>
            </div>
          )}
          {current?.members.map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CoordinatorCard person={p} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
