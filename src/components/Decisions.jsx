import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Lightbulb, ChevronRight } from "lucide-react";
import { ARCH_DECISIONS } from "../data/homelab";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

const springContent = {
  type: "spring",
  stiffness: 280,
  damping: 28,
};

function DecisionCard({ decision, isOpen, onToggle }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      aria-labelledby={`dt-${decision.id}`}
      className="bg-[#0F0F12] border border-[#2A2A30] rounded-2xl overflow-hidden"
    >
      {/* Header — always visible */}
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Tags preview — visible when collapsed */}
          <div className="flex-1 min-w-0">
            <h3
              id={`dt-${decision.id}`}
              className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
                isOpen ? "text-[#FF9F0A]" : "text-[#F0F0F5] group-hover:text-[#FF9F0A]"
              }`}
            >
              {decision.title}
            </h3>
            {!isOpen && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {decision.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#16161A] text-[#46464C] border border-[#1C1C21]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-[#FF9F0A]" : "text-[#46464C] group-hover:text-[#8A8A90]"}`}
        >
          <ChevronRight size={16} />
        </motion.span>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: springContent,
              opacity: { duration: 0.18, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 border-t border-[#1C1C21]">
              <div className="pt-4 space-y-4">
                {/* Problem */}
                <div className="flex gap-3">
                  <AlertCircle size={13} className="text-orange-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-mono text-[#46464C] uppercase tracking-[0.1em] mb-1.5">
                      Problema
                    </p>
                    <p className="text-xs text-[#8A8A90] leading-relaxed">{decision.problem}</p>
                  </div>
                </div>

                {/* Decision */}
                <div className="flex gap-3">
                  <CheckCircle2 size={13} className="text-[#FF9F0A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-mono text-[#46464C] uppercase tracking-[0.1em] mb-1.5">
                      Decisión
                    </p>
                    <p className="text-xs text-[#F0F0F5] leading-relaxed font-medium">{decision.decision}</p>
                  </div>
                </div>

                {/* Why */}
                <div className="flex gap-3">
                  <Lightbulb size={13} className="text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-mono text-[#46464C] uppercase tracking-[0.1em] mb-1.5">
                      Por qué
                    </p>
                    <p className="text-xs text-[#8A8A90] leading-relaxed">{decision.why}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {decision.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#16161A] text-[#46464C] border border-[#1C1C21]"
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
    </motion.article>
  );
}

export function Decisions() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="decisiones"
      className="py-28 px-5 sm:px-8 max-w-6xl mx-auto"
      aria-labelledby="decisions-heading"
    >
      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <p className="text-[11px] font-mono text-[#FF9F0A] uppercase tracking-[0.14em] mb-3">04</p>
        <h2
          id="decisions-heading"
          className="text-3xl sm:text-4xl font-bold text-[#F0F0F5] tracking-[-0.02em] mb-3"
        >
          Decisiones de arquitectura
        </h2>
        <p className="text-[#8A8A90] max-w-xl mb-10 text-sm sm:text-base leading-relaxed">
          Lo que distingue "instalé cosas" de "diseñé infraestructura" son las
          decisiones y sus porqués. Tocá cada card para expandir.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {ARCH_DECISIONS.map((decision) => (
            <DecisionCard
              key={decision.id}
              decision={decision}
              isOpen={openId === decision.id}
              onToggle={() => toggle(decision.id)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
