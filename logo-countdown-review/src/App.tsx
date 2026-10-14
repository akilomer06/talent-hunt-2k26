import { Routes, Route, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  useIsPresent,
} from "framer-motion";
import type { ReactNode } from "react";
import { Header, Footer, NavigationEffects } from "./components/Layout";
import { ErrorBoundary } from "./components/UI";
import { ExperienceProvider, ReadingProgress } from "./components/Experience";
import { ExplorerProvider, useExplorer } from "./components/Explorer";
import {
  Home,
  CategoryPage,
  EventPage,
  Registration,
  StandardPage,
  NotFound,
  CoordinatorsPage,
} from "./pages/Pages";
function PresenceGuard({ children }: { children: ReactNode }) {
  const present = useIsPresent();
  return (
    <div aria-hidden={!present || undefined} inert={!present}>
      {children}
    </div>
  );
}
export default function App() {
  return (
    <ErrorBoundary>
      <ExplorerProvider>
        <ArcadeApp />
      </ExplorerProvider>
    </ErrorBoundary>
  );
}
function ArcadeApp() {
  const location = useLocation();
  const { state } = useExplorer();
  const reduced = useReducedMotion() || state.motionPaused;
  return (
    <MotionConfig reducedMotion={state.motionPaused ? "always" : "user"}>
      <ExperienceProvider>
        <LayoutGroup>
          <ReadingProgress />
          <Header />
          <NavigationEffects />
          <main id="main" tabIndex={-1}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                className="route-scene"
                onAnimationComplete={(definition) => {
                  if (
                    typeof definition === "object" &&
                    "opacity" in definition &&
                    definition.opacity === 1
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("th26:route-ready", {
                        detail: location.key,
                      }),
                    );
                  }
                }}
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: reduced ? 0 : -12,
                  scale: reduced ? 1 : 0.99,
                }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <PresenceGuard>
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/events/technical"
                      element={<CategoryPage category="technical" />}
                    />
                    <Route
                      path="/events/non-technical"
                      element={<CategoryPage category="non-technical" />}
                    />
                    <Route path="/events/:slug" element={<EventPage />} />
                    <Route path="/register" element={<Registration />} />
                    <Route
                      path="/coordinators"
                      element={<CoordinatorsPage />}
                    />
                    {[
                      "/schedule",
                      "/about",
                      "/venue",
                      "/faqs",
                      "/contact",
                      "/privacy",
                    ].map((path) => (
                      <Route
                        key={path}
                        path={path}
                        element={<StandardPage page={path} />}
                      />
                    ))}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PresenceGuard>
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </LayoutGroup>
      </ExperienceProvider>
    </MotionConfig>
  );
}
