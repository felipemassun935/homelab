import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#arquitectura", label: "Arquitectura" },
  { href: "#servicios",    label: "Servicios"    },
  { href: "#decisiones",   label: "Decisiones"   },
  { href: "#stack",        label: "Stack"        },
  { href: "#roadmap",      label: "Roadmap"      },
];

const spring = { type: "spring", stiffness: 400, damping: 35 };

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(7,7,10,0.85)" : "rgba(7,7,10,0)",
          borderBottomColor: scrolled ? "rgba(42,42,48,0.7)" : "rgba(42,42,48,0)",
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
            <div className="w-7 h-7 rounded-lg bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 flex items-center justify-center">
              <Terminal size={14} className="text-[#FF9F0A]" aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-semibold text-[#F0F0F5] group-hover:text-[#FF9F0A] transition-colors duration-200">
              bandito
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm text-[#8A8A90] hover:text-[#F0F0F5] hover:bg-[#1C1C21] transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#8A8A90] hover:text-[#F0F0F5] hover:bg-[#1C1C21] transition-colors"
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
            className="md:hidden mx-4 mt-2 rounded-2xl bg-[#0F0F12]/95 backdrop-blur-xl border border-[#2A2A30] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
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
                    className="flex items-center px-4 py-3 rounded-xl text-sm text-[#8A8A90] hover:text-[#F0F0F5] hover:bg-[#1C1C21] transition-colors"
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
