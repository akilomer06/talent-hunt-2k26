import { siteData } from "../data/siteData";

/** The original TH26 artwork, shared by the header, opening, and footer. */
export function BrandWordmark({
  size = "header",
}: {
  size?: "header" | "opening" | "footer";
}) {
  const logo = (
    <img
      className={`event-logo event-logo-${size}`}
      src={siteData.assets.event}
      alt=""
      aria-hidden="true"
      width="1254"
      height="1254"
      decoding="async"
      draggable={false}
    />
  );
  if (size === "header") {
    return (
      <span className="header-brand-lockup" aria-hidden="true">
        <span className="header-logo-frame">{logo}</span>
        <span className="header-brand-copy">
          <span className="header-brand-name">TALENT</span>
          <span className="header-brand-second-line">
            <span className="header-brand-name header-brand-hunt">HUNT</span>
            <span className="header-brand-year">2K26</span>
          </span>
        </span>
      </span>
    );
  }
  return logo;
}
