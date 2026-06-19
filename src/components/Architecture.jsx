import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Globe, Monitor } from "lucide-react";

function PhysicalDiagram() {
  return (
    <div
      className="w-full overflow-x-auto"
      role="img"
      aria-label="Diagrama de red física"
    >
      <div className="min-w-[360px] pt-2 pb-1">
        <div className="flex flex-col items-center">
          {/* ISP */}
          <div className="px-4 py-2 rounded-xl flex items-center gap-2"
            style={{ border: "1px solid var(--bd)", background: "var(--s2)" }}>
            <Globe size={13} style={{ color: "var(--t3)" }} aria-hidden="true" />
            <div>
              <p className="text-[11px] font-mono font-medium" style={{ color: "var(--t1)" }}>Router ISP</p>
              <p className="text-[9px] font-mono" style={{ color: "var(--t3)" }}>CGNAT — sin IP pública</p>
            </div>
          </div>
          <div className="w-px h-5" style={{ background: "var(--bd)" }} aria-hidden="true" />
          {/* Switch */}
          <div className="px-4 py-2 rounded-xl flex items-center gap-2"
            style={{ border: "1px solid var(--a25)", background: "var(--a10)" }}>
            <Network size={13} style={{ color: "var(--a)" }} aria-hidden="true" />
            <div>
              <p className="text-[11px] font-mono font-medium" style={{ color: "var(--t1)" }}>Switch Cisco 24p</p>
            </div>
          </div>
          <div className="w-px h-4" style={{ background: "var(--bd)" }} aria-hidden="true" />
        </div>

        {/* Branch */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-[80%] h-px" style={{ background: "var(--bd)" }} />
        </div>

        {/* Nodes */}
        <div className="grid grid-cols-4 gap-2 mt-0 pt-0">
          {[
            { label: "bandito", sub: "i3-2120 · 12GB", accent: true },
            { label: "Desktop", sub: "Tailscale", accent: false },
            { label: "AP Test", sub: "WiFi lab", accent: false },
            { label: "Mesh",    sub: "cobertura", accent: false },
          ].map((node) => (
            <div key={node.label} className="flex flex-col items-center">
              <div className="w-px h-4" style={{ background: "var(--bd)" }} />
              <div
                className="w-full px-2 py-2 rounded-lg text-center"
                style={node.accent
                  ? { border: "1px solid var(--a25)", background: "var(--a10)" }
                  : { border: "1px solid var(--bd)", background: "var(--s2)" }
                }
              >
                <p className="text-[10px] font-mono font-semibold" style={{ color: node.accent ? "var(--a)" : "var(--t1)" }}>
                  {node.label}
                </p>
                <p className="text-[9px]" style={{ color: "var(--t3)" }}>{node.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogicalDiagram() {
  const nodes = [
    { id: "host",    label: "bandito (host)", sub: "Proxmox VE",     x: 50, y: 45 },
    { id: "vm",      label: "VM Homelab",     sub: "Ubuntu 24.04",   x: 50, y: 75 },
    { id: "laptop",  label: "Laptop",         sub: "remoto",         x: 10, y: 18 },
    { id: "desktop", label: "Desktop",        sub: "casa",           x: 90, y: 18 },
    { id: "phone",   label: "Teléfono",       sub: "monitor",        x: 10, y: 80 },
  ];

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Diagrama de red lógica Tailscale"
    >
      <div className="relative h-52">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ border: "1px solid var(--a20)", background: "var(--a10)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ border: "1px solid var(--a25)", background: "var(--a15)" }}>
              <span className="text-[9px] font-mono text-center leading-snug" style={{ color: "var(--a)" }}>
                Tailscale<br/>mesh
              </span>
            </div>
          </div>
        </div>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="px-2 py-1.5 rounded-lg text-center whitespace-nowrap"
              style={{ border: "1px solid var(--bd)", background: "var(--s2)" }}>
              <Monitor size={9} className="mx-auto mb-0.5" style={{ color: "var(--a)" }} aria-hidden="true" />
              <p className="text-[9px] font-mono font-medium" style={{ color: "var(--t1)" }}>{node.label}</p>
              <p className="text-[8px]" style={{ color: "var(--t3)" }}>{node.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Architecture() {
  const [view, setView] = useState("fisica");

  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight" style={{ color: "var(--t1)" }}>
          Arquitectura & Red
        </h2>

        {/* Segmented control */}
        <div
          className="inline-flex rounded-lg p-0.5 gap-0.5"
          style={{ border: "1px solid var(--bd)", background: "var(--s2)" }}
          role="tablist"
        >
          {[
            { id: "fisica", label: "Física" },
            { id: "logica", label: "Lógica" },
          ].map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className="relative px-3 py-1 text-[11px] rounded-md font-medium focus-visible:outline-none"
              style={{ color: view === id ? "var(--a)" : "var(--t3)" }}
            >
              {view === id && (
                <motion.span
                  layoutId="arch-tab"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "var(--a10)", border: "1px solid var(--a25)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Diagram */}
      <div className="flex-1 rounded-xl overflow-hidden" style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}>
        <div className="p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              {view === "fisica" ? <PhysicalDiagram /> : <LogicalDiagram />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
