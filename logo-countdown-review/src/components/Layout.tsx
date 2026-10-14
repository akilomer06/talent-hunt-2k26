import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { siteData } from "../data/siteData";
import { metadata } from "../lib/content";
import { BrochureLink, Reveal, SmartImage } from "./UI";
import { BrandWordmark } from "./BrandWordmark";
import { ExplorerControls } from "./Explorer";
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    toggle.current?.focus();
  };
  const containMenuFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="brand" aria-label="Talent Hunt 2K26 home">
          <BrandWordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteData.nav.map((n) => (
            <NavLink end={n.to === "/"} key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <ExplorerControls />
        <Link to="/register" className="nav-register">
          Register <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="menu-heading"
        onKeyDown={containMenuFocus}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="menu-top">
          <span className="eyebrow">
            <span className="signal" aria-hidden="true" />
            TALENT HUNT 2K26
          </span>
          <button autoFocus onClick={close} aria-label="Close menu">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-intro">
          <h2 id="menu-heading">
            FIND YOUR <em>MOMENT.</em>
          </h2>
          <p>Explore the events. Meet the crew. Take the stage.</p>
        </div>
        <nav aria-label="Mobile navigation">
          {[...siteData.nav, { to: "/register", label: "Register" }].map(
            (n, i) => (
              <NavLink
                end={n.to === "/"}
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  [
                    isActive ? "menu-link-active" : "",
                    n.to === "/register" ? "menu-register" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
                onClick={close}
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className="micro" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="menu-link-label">{n.label}</span>
                <span className="menu-link-arrow" aria-hidden="true">
                  ↗
                </span>
              </NavLink>
            ),
          )}
        </nav>
        <p className="menu-footer">
          <span className="signal" aria-hidden="true" />
          {siteData.settings.eligibility}
        </p>
      </dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Reveal className="footer-top">
        <div>
          <p className="eyebrow">YOUR TALENT. YOUR MOMENT.</p>
          <Link
            to="/"
            className="footer-wordmark"
            aria-label="Talent Hunt 2K26 home"
          >
            <BrandWordmark size="footer" />
          </Link>
          <p>{siteData.copy.footerDescription}</p>
        </div>
        <div className="footer-nav">
          <h2>Explore</h2>
          {siteData.nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="footer-connect">
          <h2>Stay connected</h2>
          {siteData.socialLinks.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.handle} ↗
            </a>
          ))}
          <BrochureLink small />
          <Link to="/register">Registration ↗</Link>
          <Link to="/privacy">Privacy & your data</Link>
        </div>
      </Reveal>
      <div className="footer-logos">
        <SmartImage
          className="college-logo"
          src={siteData.assets.college}
          alt={siteData.settings.college}
          width="240"
          height="67"
          loading="lazy"
        />
        <SmartImage
          src={siteData.assets.csea}
          alt="CSEA"
          width="70"
          height="64"
          loading="lazy"
        />
        <SmartImage
          src={siteData.assets.acm}
          alt="ACM"
          width="57"
          height="57"
          loading="lazy"
        />
        <p>
          {siteData.settings.school}
          <br />
          {siteData.settings.department}
        </p>
      </div>
      <div className="footer-bottom">
        <span>{siteData.settings.copyright}</span>
        <button
          type="button"
          className="text-link replay-intro-link"
          onClick={() => window.dispatchEvent(new Event("replay-intro"))}
        >
          Replay Opening Intro ↺
        </button>
        <span>
          {siteData.settings.eligibility} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </footer>
  );
}
const scrollMemory = new Map<string, number>();
export function NavigationEffects() {
  const location = useLocation();
  const type = useNavigationType();
  const previous = useRef(location.pathname);
  useEffect(() => {
    const m = metadata(location.pathname);
    document.title = m.title;
    for (const [key, value, property] of [
      ["description", m.description, false],
      ["og:title", m.title, true],
      ["og:description", m.description, true],
      ["twitter:title", m.title, false],
      ["twitter:description", m.description, false],
    ] as const) {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${property ? "property" : "name"}="${key}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(property ? "property" : "name", key);
        document.head.appendChild(el);
      }
      el.content = value;
    }
    for (const key of ["og:image", "twitter:image"]) {
      document.head
        .querySelector(
          `meta[${key === "og:image" ? "property" : "name"}="${key}"]`,
        )
        ?.remove();
      if (m.image) {
        const el = document.createElement("meta");
        el.setAttribute(key === "og:image" ? "property" : "name", key);
        el.content = siteData.settings.productionUrl
          ? new URL(m.image, siteData.settings.productionUrl).href
          : m.image;
        document.head.appendChild(el);
      }
    }
    document.head.querySelector('meta[name="robots"]')?.remove();
    if (m.noindex) {
      const el = document.createElement("meta");
      el.name = "robots";
      el.content = "noindex";
      document.head.appendChild(el);
    }
    document.head.querySelector('link[rel="canonical"]')?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
    if (siteData.settings.productionUrl && !m.noindex) {
      const el = document.createElement("link");
      el.rel = "canonical";
      el.href = new URL(
        location.pathname,
        siteData.settings.productionUrl,
      ).href;
      document.head.appendChild(el);
      const og = document.createElement("meta");
      og.setAttribute("property", "og:url");
      og.content = el.href;
      document.head.appendChild(og);
    }
  }, [location.pathname]);
  useEffect(() => {
    history.scrollRestoration = "manual";
    const storageKey = location.pathname + location.search + "|" + location.key;
    const save = () => {
      scrollMemory.set(storageKey, window.scrollY);
      try {
        sessionStorage.setItem(
          `th26:scroll:${storageKey}`,
          String(window.scrollY),
        );
      } catch {
        /* Memory fallback. */
      }
    };
    let y = scrollMemory.get(storageKey) || 0;
    try {
      y = Number(sessionStorage.getItem(`th26:scroll:${storageKey}`)) || y;
    } catch {
      /* Memory fallback. */
    }
    const restore = () => {
      if (type === "POP") window.scrollTo(0, y);
      else if (location.hash)
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else if (previous.current !== location.pathname) window.scrollTo(0, 0);
      if (previous.current !== location.pathname) {
        document.getElementById("main")?.focus({ preventScroll: true });
        previous.current = location.pathname;
      }
    };
    let routeFinished = false;
    const finish = (event: Event) => {
      if (
        routeFinished ||
        (event as CustomEvent<string>).detail !== location.key
      )
        return;
      routeFinished = true;
      restore();
    };
    const id = requestAnimationFrame(restore);
    window.addEventListener("th26:route-ready", finish);
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("th26:route-ready", finish);
      window.removeEventListener("scroll", save);
    };
  }, [location.key, location.pathname, location.search, location.hash, type]);
  return null;
}
