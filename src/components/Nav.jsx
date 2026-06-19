import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "#arquitectura", label: "Arquitectura" },
  { href: "#servicios",    label: "Servicios"    },
  { href: "#decisiones",   label: "Decisiones"   },
  { href: "#stack",        label: "Stack"        },
  { href: "#roadmap",      label: "Roadmap"      },
];

const spring = { type: "spring", stiffness: 400, damping: 35 };

export function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        animate={{
          backgroundColor: scrolled ? "var(--nav-scrolled-bg)" : "var(--nav-base-bg)",
          borderBottomColor: scrolled ? "var(--nav-scrolled-bd)" : "var(--nav-base-bd)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
        }}
        transition={spring}
        className="border-b"
      >
        <nav
          className="max-w-6xl mx-auto px-5 sm:px-8 h-[56px] flex items-center justify-between"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            aria-label="bandito homelab — inicio"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--a10)", border: "1px solid var(--a25)" }}>
              <Terminal size={14} style={{ color: "var(--a)" }} aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-semibold transition-colors duration-200"
              style={{ color: "var(--t1)" }}>
              bandito
            </span>
          </a>

          {/* Desktop links + toggle */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1 mr-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-3 py-1.5 rounded-lg text-sm transition-colors duration-150"
                    style={{ color: "var(--t2)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--t1)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--t2)"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme toggle — desktop */}
            <ThemeToggle isLight={isLight} onToggle={onToggleTheme} />
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isLight={isLight} onToggle={onToggleTheme} />
            <motion.button
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--t2)" }}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 600, damping: 30 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "var(--s1)",
              border: "1px solid var(--bd)",
              boxShadow: "var(--shadow-sheet)",
            }}
          >
            <ul className="p-2 flex flex-col" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35, delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center px-4 py-3 rounded-xl text-sm transition-colors"
                    style={{ color: "var(--t2)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--t1)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--t2)"}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle({ isLight, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      onClick={onToggle}
      className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
      style={{ color: "var(--t3)" }}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {isLight ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
