import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource/barlow/latin-400.css";
import "@fontsource/barlow/latin-500.css";
import "@fontsource/barlow/latin-600.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "./styles/global.css";
import "./styles/event-posters.css";
import "./styles/experience.css";
import "./styles/brand-countdown.css";
import "./styles/poster-theme.css";
import "./styles/arena-motion.css";
const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);
