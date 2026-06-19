import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ROADMAP } from "../data/homelab";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="py-28 px-5 sm:px-8 max-w-6xl mx-auto"
      aria-labelledby="roadmap-heading"
    >
      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <p className="text-[11px] font-mono text-[#FF9F0A] uppercase tracking-[0.14em] mb-3">06</p>
        <h2
          id="roadmap-heading"
          className="text-3xl sm:text-4xl font-bold text-[#F0F0F5] tracking-[-0.02em] mb-3"
        >
          Roadmap
        </h2>
        <p className="text-[#8A8A90] max-w-xl mb-10 text-sm sm:text-base leading-relaxed">
          Lo que viene, con su justificación. No es una wishlist — es la evolución
          natural de las limitaciones actuales.
        </p>

        <div className="space-y-3" role="list" aria-label="Próximas mejoras del homelab">
          {ROADMAP.map((item, i) => (
            <motion.div
              key={item.title}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, delay: i * 0.08 }}
              whileHover={{ x: 4, borderColor: "rgba(255,159,10,0.2)" }}
              whileTap={{ scale: 0.99 }}
              className="group bg-[#0F0F12] border border-[#2A2A30] rounded-2xl p-5 flex gap-4 items-start cursor-default shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              {/* Index */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                <div className="w-7 h-7 rounded-full border border-[#2A2A30] bg-[#16161A] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-[#46464C]">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-sm font-semibold text-[#F0F0F5] leading-tight">{item.title}</h3>
                  <span className="flex-shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#2A2A30] text-[#46464C]">
                    pendiente
                  </span>
                </div>
                <p className="text-xs text-[#8A8A90] leading-relaxed mb-3">{item.description}</p>
                <p className="text-[11px] font-mono text-[#46464C] leading-relaxed">
                  <span className="text-[#FF9F0A]/80">motivo:</span> {item.reason}
                </p>
              </div>

              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex-shrink-0 mt-0.5"
              >
                <ArrowRight
                  size={15}
                  className="text-[#2A2A30] group-hover:text-[#FF9F0A] transition-colors duration-200"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
