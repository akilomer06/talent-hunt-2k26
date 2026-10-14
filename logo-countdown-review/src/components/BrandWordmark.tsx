import { siteData } from "../data/siteData";

/** The brochure's shield and laurels are the event's primary identity. */
export function BrandWordmark({
  size = "header",
}: {
  size?: "header" | "opening" | "footer" | "hero";
}) {
  const crest = (
    <img
      className={`talent-crest talent-crest-${size}`}
      src={siteData.assets.event}
      alt=""
      aria-hidden="true"
      width="1536"
      height="1024"
      decoding="async"
      draggable={false}
    />
  );
  if (size === "header") {
    return (
      <span className="header-brand-lockup" aria-hidden="true">
        <span className="header-crest-frame">{crest}</span>
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
  return crest;
}
