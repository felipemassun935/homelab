import { motion } from "framer-motion";
import { TECH_STACK } from "../data/homelab";

const CATEGORY_COLORS = {
  Hipervisor:     "text-orange-500",
  Contenedores:   "text-blue-500",
  Red:            "text-amber-600",
  OS:             "text-green-600",
  Almacenamiento: "text-yellow-600",
  Monitoreo:      "text-purple-500",
};

export function TechStack() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      <h2 className="text-sm font-semibold tracking-tight mb-4" style={{ color: "var(--t1)" }}>
        Stack tecnológico
      </h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1"
        role="list"
        aria-label="Tecnologías del stack"
      >
        {TECH_STACK.map((tech, i) => (
          <motion.div
            key={tech.name}
            role="listitem"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl p-3 flex flex-col gap-1 cursor-default"
            style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
          >
            <p className={`text-[10px] font-mono uppercase tracking-[0.08em] font-semibold ${CATEGORY_COLORS[tech.category] ?? ""}`}
              style={!CATEGORY_COLORS[tech.category] ? { color: "var(--t3)" } : undefined}>
              {tech.category}
            </p>
            <p className="text-xs font-semibold leading-tight" style={{ color: "var(--t1)" }}>{tech.name}</p>
            <p className="text-[11px] leading-tight" style={{ color: "var(--t3)" }}>{tech.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
