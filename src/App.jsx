import { MotionConfig, motion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { Nav }           from "./components/Nav";
import { IdentityCard }  from "./components/IdentityCard";
import { StatsCard }     from "./components/StatsCard";
import { Architecture }  from "./components/Architecture";
import { Services }      from "./components/Services";
import { Decisions }     from "./components/Decisions";
import { TechStack }     from "./components/TechStack";
import { Roadmap }       from "./components/Roadmap";

function Cell({ children, span, delay = 0 }) {
  return (
    <motion.div
      className={span}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28, delay }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const { theme, toggle } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <Nav theme={theme} onToggleTheme={toggle} />

      <main className="px-4 sm:px-6 pt-[72px] pb-6 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4">

          {/* Row 1 */}
          <Cell span="md:col-span-4" delay={0}>
            <IdentityCard />
          </Cell>
          <Cell span="md:col-span-8" delay={0.05}>
            <StatsCard />
          </Cell>

          {/* Row 2 */}
          <Cell span="md:col-span-5" delay={0.10}>
            <Architecture />
          </Cell>
          <Cell span="md:col-span-7" delay={0.14}>
            <Services />
          </Cell>

          {/* Row 3 */}
          <Cell span="md:col-span-7" delay={0.18}>
            <Decisions />
          </Cell>
          <Cell span="md:col-span-5" delay={0.22}>
            <TechStack />
          </Cell>

          {/* Row 4 — full width */}
          <Cell span="md:col-span-12" delay={0.26}>
            <Roadmap />
          </Cell>

        </div>

        {/* Inline footer */}
        <footer
          className="mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono"
          style={{ borderTop: "1px solid var(--bds)", color: "var(--t3)" }}
        >
          <span>bandito · homelab personal</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--a)", opacity: 0.6 }} aria-hidden="true" />
            0 puertos expuestos · todo cifrado
          </span>
        </footer>
      </main>
    </MotionConfig>
  );
}

export default App;
