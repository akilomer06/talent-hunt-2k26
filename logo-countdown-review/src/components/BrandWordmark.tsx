/** A crisp, native wordmark that stays legible at navigation sizes. */
export function BrandWordmark({
  size = "header",
}: {
  size?: "header" | "opening" | "footer";
}) {
  return (
    <span
      className={`talent-wordmark talent-wordmark-${size}`}
      aria-hidden="true"
    >
      <span className="talent-wordmark-top">TALENT</span>
      <span className="talent-wordmark-bottom">
        HUNT<span className="talent-wordmark-edition">2K26</span>
      </span>
      <span className="talent-wordmark-caption">CRESCENT / CSE</span>
    </span>
  );
}
