import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, Wifi, Eye, Brain, HardDrive,
  LayoutDashboard, Code2, Globe, Container,
} from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "../data/homelab";

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

const CATEGORY_ICONS = {
  "DNS & Red":    <Wifi size={12} />,
  Seguridad:      <Shield size={12} />,
  Monitoreo:      <Eye size={12} />,
  IA:             <Brain size={12} />,
  Almacenamiento: <HardDrive size={12} />,
  Gestión:        <LayoutDashboard size={12} />,
  Desarrollo:     <Code2 size={12} />,
  Proxy:          <Globe size={12} />,
};

const CATEGORY_COLORS = {
  "DNS & Red":    "text-blue-400   bg-blue-400/8   border-blue-400/20",
  Seguridad:      "text-yellow-400 bg-yellow-400/8 border-yellow-400/20",
  Monitoreo:      "text-orange-400 bg-orange-400/8 border-orange-400/20",
  IA:             "text-purple-400 bg-purple-400/8 border-purple-400/20",
  Almacenamiento: "text-green-400  bg-green-400/8  border-green-400/20",
  Gestión:        "text-[#FF9F0A]  bg-[#FF9F0A]/8  border-[#FF9F0A]/20",
  Desarrollo:     "text-pink-400   bg-pink-400/8   border-pink-400/20",
  Proxy:          "text-slate-400  bg-slate-400/8  border-slate-400/20",
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="servicios"
      className="py-28 px-5 sm:px-8 max-w-6xl mx-auto"
      aria-labelledby="services-heading"
    >
      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <p className="text-[11px] font-mono text-[#FF9F0A] uppercase tracking-[0.14em] mb-3">03</p>
        <h2
          id="services-heading"
          className="text-3xl sm:text-4xl font-bold text-[#F0F0F5] tracking-[-0.02em] mb-3"
        >
          Servicios
        </h2>
        <p className="text-[#8A8A90] max-w-xl mb-10 text-sm sm:text-base leading-relaxed">
          {SERVICES.length} servicios en total —{" "}
          {SERVICES.filter((s) => s.inDocker).length} en Docker, el resto gestionados por systemd.
        </p>

        {/* Filter — sliding pill indicator */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {["Todos", ...SERVICE_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-150"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="service-filter"
                  className="absolute inset-0 rounded-full bg-[#FF9F0A]/10 border border-[#FF9F0A]/25"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-150 ${
                  activeCategory === cat
                    ? "text-[#FF9F0A]"
                    : "text-[#8A8A90] hover:text-[#F0F0F5]"
                }`}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label={`Servicios: ${activeCategory}`}
        >
          {filtered.map((service, i) => (
            <motion.div
              key={service.name}
              role="listitem"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, delay: i * 0.04 }}
              whileHover={{ y: -3, borderColor: "rgba(42,42,48,0.9)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#0F0F12] border border-[#2A2A30] rounded-2xl p-5 flex flex-col gap-3 cursor-default shadow-[0_2px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-shadow duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#F0F0F5] leading-tight">{service.name}</h3>
                <span
                  className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border flex-shrink-0 ${CATEGORY_COLORS[service.category]}`}
                >
                  <span aria-hidden="true">{CATEGORY_ICONS[service.category]}</span>
                  {service.category}
                </span>
              </div>

              <p className="text-xs text-[#8A8A90] leading-relaxed flex-1">{service.role}</p>

              {service.notes && (
                <p className="text-[10px] font-mono text-[#46464C] border-t border-[#2A2A30] pt-2.5">
                  {service.notes}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1C1C21]">
                <span className="flex items-center gap-1 text-[10px] font-mono text-[#46464C]">
                  <Container size={9} aria-hidden="true" />
                  {service.inDocker ? "Docker" : "systemd"}
                </span>
                {service.stack.slice(1).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#16161A] text-[#46464C] border border-[#1C1C21]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
