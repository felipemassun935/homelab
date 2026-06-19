import { motion } from "framer-motion";
import { TECH_STACK } from "../data/homelab";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

const CATEGORY_COLORS = {
  Hipervisor:     "text-orange-400",
  Contenedores:   "text-blue-400",
  Red:            "text-[#FF9F0A]",
  OS:             "text-green-400",
  Almacenamiento: "text-yellow-400",
  Monitoreo:      "text-purple-400",
};

export function TechStack() {
  return (
    <section
      id="stack"
      className="py-28 px-5 sm:px-8 max-w-6xl mx-auto"
      aria-labelledby="stack-heading"
    >
      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <p className="text-[11px] font-mono text-[#FF9F0A] uppercase tracking-[0.14em] mb-3">05</p>
        <h2
          id="stack-heading"
          className="text-3xl sm:text-4xl font-bold text-[#F0F0F5] tracking-[-0.02em] mb-3"
        >
          Stack tecnológico
        </h2>
        <p className="text-[#8A8A90] max-w-xl mb-10 text-sm sm:text-base leading-relaxed">
          Las herramientas base que sostienen todo el homelab.
        </p>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          role="list"
          aria-label="Tecnologías del stack"
        >
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              role="listitem"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: i * 0.06 }}
              whileHover={{ y: -3, borderColor: "rgba(255,159,10,0.2)" }}
              whileTap={{ scale: 0.96 }}
              className="bg-[#0F0F12] border border-[#2A2A30] rounded-2xl p-4 text-center flex flex-col items-center gap-1.5 cursor-default shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-shadow duration-300"
            >
              <p className={`text-[10px] font-mono font-semibold uppercase tracking-[0.08em] ${CATEGORY_COLORS[tech.category] ?? "text-[#8A8A90]"}`}>
                {tech.category}
              </p>
              <p className="text-sm font-semibold text-[#F0F0F5] leading-tight">{tech.name}</p>
              <p className="text-[10px] text-[#46464C] leading-tight">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
