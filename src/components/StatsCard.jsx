import { motion } from "framer-motion";
import { Server, Lock, Cpu, HardDrive } from "lucide-react";
import { STATS } from "../data/homelab";

const ICONS = [Server, Lock, Cpu, HardDrive];

export function StatsCard() {
  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      <p className="text-xs font-mono uppercase tracking-[0.08em] mb-3" style={{ color: "var(--t3)" }}>
        Resumen del homelab
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {STATS.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="rounded-xl p-3 flex flex-col gap-2 cursor-default"
              style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
            >
              <Icon size={15} style={{ color: "var(--a)" }} aria-hidden="true" />
              <div className="text-2xl font-bold font-mono tracking-tight" style={{ color: "var(--t1)" }}>
                {stat.value}
              </div>
              <div className="text-xs leading-tight" style={{ color: "var(--t2)" }}>
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4" style={{ borderTop: "1px solid var(--bds)" }}>
        {[
          { name: "Proxmox VE",   dot: "#F97316" },
          { name: "Docker",       dot: "#3B82F6" },
          { name: "Tailscale",    dot: "var(--a)" },
          { name: "Ubuntu 24.04", dot: "#22C55E" },
          { name: "Samba",        dot: "#8B5CF6" },
        ].map(({ name, dot }) => (
          <span
            key={name}
            className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full"
            style={{ background: "var(--s2)", border: "1px solid var(--bds)", color: "var(--t2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} aria-hidden="true" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
