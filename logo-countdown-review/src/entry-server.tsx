import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
export { publicRoutes, metadata, validateSiteData } from "./lib/content";
export { siteData } from "./data/siteData";
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}
