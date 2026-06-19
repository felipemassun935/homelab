import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "../data/homelab";

const CATEGORY_COLORS = {
  "DNS & Red":    "text-blue-500   bg-blue-500/8   border-blue-500/20",
  Seguridad:      "text-yellow-600 bg-yellow-500/8 border-yellow-500/20",
  Monitoreo:      "text-orange-500 bg-orange-500/8 border-orange-500/20",
  IA:             "text-purple-500 bg-purple-500/8 border-purple-500/20",
  Almacenamiento: "text-green-600  bg-green-500/8  border-green-500/20",
  Gestión:        "text-amber-600  bg-amber-500/8  border-amber-500/20",
  Desarrollo:     "text-pink-500   bg-pink-500/8   border-pink-500/20",
  Proxy:          "text-slate-500  bg-slate-500/8  border-slate-500/20",
};

export function Services() {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos" ? SERVICES : SERVICES.filter((s) => s.category === active);

  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight" style={{ color: "var(--t1)" }}>
          Servicios
        </h2>
        <span className="text-[11px] font-mono" style={{ color: "var(--t3)" }}>
          {filtered.length}/{SERVICES.length}
        </span>
      </div>

      {/* Filter pills */}
      <div
        className="flex flex-wrap gap-1.5 mb-3 pb-3"
        style={{ borderBottom: "1px solid var(--bds)" }}
        role="group"
        aria-label="Filtrar por categoría"
      >
        {["Todos", ...SERVICE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className="relative px-2.5 py-1 rounded-full text-[10px] font-medium"
            style={{ color: active === cat ? "var(--a)" : "var(--t3)" }}
          >
            {active === cat && (
              <motion.span
                layoutId="svc-filter"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--a10)", border: "1px solid var(--a25)" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Service list — compact rows */}
      <motion.ul layout className="flex flex-col gap-1.5 flex-1" role="list" aria-label={`Servicios: ${active}`}>
        {filtered.map((svc, i) => (
          <motion.li
            key={svc.name}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: i * 0.03 }}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
          >
            {/* Runtime dot */}
            <span className="flex-shrink-0 mt-1.5 flex items-center gap-1 text-[9px] font-mono" style={{ color: "var(--t3)" }}>
              <Container size={9} aria-hidden="true" />
              {svc.inDocker ? "Docker" : "systemd"}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold leading-none" style={{ color: "var(--t1)" }}>
                  {svc.name}
                </span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border flex-shrink-0 ${CATEGORY_COLORS[svc.category]}`}>
                  {svc.category}
                </span>
              </div>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--t2)" }}>{svc.role}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
