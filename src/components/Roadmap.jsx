import { motion } from "framer-motion";
import { ROADMAP } from "../data/homelab";

export function Roadmap() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight" style={{ color: "var(--t1)" }}>
          Roadmap
        </h2>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{ background: "var(--s2)", border: "1px solid var(--bds)", color: "var(--t3)" }}>
          {ROADMAP.length} pendientes
        </span>
      </div>

      {/* Full-width: items as 3 columns on desktop, 1 column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ROADMAP.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="rounded-xl p-4 flex flex-col gap-2 cursor-default"
            style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-mono" style={{ color: "var(--t3)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: "var(--s3)", border: "1px solid var(--bds)", color: "var(--t3)" }}>
                pendiente
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-tight" style={{ color: "var(--t1)" }}>
              {item.title}
            </h3>

            <p className="text-[11px] leading-relaxed" style={{ color: "var(--t2)" }}>
              {item.description}
            </p>

            <p className="text-[10px] font-mono leading-relaxed mt-auto pt-2" style={{ color: "var(--t3)", borderTop: "1px solid var(--bds)" }}>
              <span style={{ color: "var(--a)", opacity: 0.85 }}>motivo:</span>{" "}
              {item.reason}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
