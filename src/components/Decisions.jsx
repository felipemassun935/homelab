import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Lightbulb, ChevronRight } from "lucide-react";
import { ARCH_DECISIONS } from "../data/homelab";

function DecisionRow({ decision, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--bds)", background: "var(--s2)" }}
    >
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <p
            className="text-[12px] font-semibold leading-tight"
            style={{ color: isOpen ? "var(--a)" : "var(--t1)" }}
          >
            {decision.title}
          </p>
          {!isOpen && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {decision.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: "var(--s3)", color: "var(--t3)", border: "1px solid var(--bds)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ color: isOpen ? "var(--a)" : "var(--t3)" }}
          className="flex-shrink-0"
        >
          <ChevronRight size={14} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 280, damping: 28 },
              opacity: { duration: 0.15 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4" style={{ borderTop: "1px solid var(--bds)" }}>
              <div className="pt-3 space-y-3">
                {[
                  { Icon: AlertCircle,  color: "#F97316", label: "Problema",  text: decision.problem,  muted: true },
                  { Icon: CheckCircle2, color: "var(--a)", label: "Decisión", text: decision.decision, muted: false },
                  { Icon: Lightbulb,    color: "#EAB308", label: "Por qué",   text: decision.why,     muted: true },
                ].map(({ Icon, color, label, text, muted }) => (
                  <div key={label} className="flex gap-2.5">
                    <Icon size={12} style={{ color, flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-[0.08em] mb-1" style={{ color: "var(--t3)" }}>
                        {label}
                      </p>
                      <p className="text-[11px] leading-relaxed" style={{ color: muted ? "var(--t2)" : "var(--t1)", fontWeight: muted ? 400 : 500 }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1 pt-1">
                  {decision.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: "var(--s3)", color: "var(--t3)", border: "1px solid var(--bds)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Decisions() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight" style={{ color: "var(--t1)" }}>
          Decisiones de arquitectura
        </h2>
        <span className="text-[10px] font-mono" style={{ color: "var(--t3)" }}>
          {openId ? "1" : "0"}/{ARCH_DECISIONS.length} expandida
        </span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {ARCH_DECISIONS.map((d) => (
          <DecisionRow
            key={d.id}
            decision={d}
            isOpen={openId === d.id}
            onToggle={() => toggle(d.id)}
          />
        ))}
      </div>
    </div>
  );
}
