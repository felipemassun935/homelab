import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Globe } from "lucide-react";

/* ── Diagrama físico ─────────────────────────────────────────────── */
function PhysicalDiagram() {
  return (
    <div
      className="w-full overflow-x-auto"
      role="img"
      aria-label="Diagrama de red física: ISP → switch Cisco → bandito, Desktop, AP, Mesh WiFi"
    >
      <div className="min-w-[380px] py-3 px-2">
        {/* ISP → Switch */}
        <div className="flex flex-col items-center">
          <div className="px-4 py-2.5 rounded-xl flex items-center gap-2.5"
            style={{ border: "1px solid var(--bd)", background: "var(--s3)" }}>
            <Globe size={13} style={{ color: "var(--t3)" }} aria-hidden="true" />
            <div>
              <p className="text-[11px] font-mono font-medium" style={{ color: "var(--t1)" }}>Router ISP</p>
              <p className="text-[9px] font-mono" style={{ color: "var(--t3)" }}>CGNAT — sin IP pública directa</p>
            </div>
          </div>

          <div className="w-px h-6" style={{ background: "var(--bd)" }} aria-hidden="true" />

          <div className="px-4 py-2.5 rounded-xl flex items-center gap-2.5"
            style={{ border: "1px solid var(--a25)", background: "var(--a10)" }}>
            <Network size={13} style={{ color: "var(--a)" }} aria-hidden="true" />
            <div>
              <p className="text-[11px] font-mono font-medium" style={{ color: "var(--t1)" }}>Switch Cisco 24p · capa 2</p>
            </div>
          </div>

          {/* Branch horizontal */}
          <div className="w-px h-5" style={{ background: "var(--bd)" }} aria-hidden="true" />
        </div>

        <div className="relative flex justify-center" aria-hidden="true">
          <div className="w-[85%] h-px" style={{ background: "var(--bd)" }} />
        </div>

        {/* Nodes */}
        <div className="grid grid-cols-4 gap-2 mt-0">
          {[
            { label: "bandito",   sub: "i3-2120 · 12 GB", sub2: "Proxmox VE",       accent: true  },
            { label: "PC Desktop",sub: "Cliente Tailscale", sub2: "uso personal",    accent: false },
            { label: "AP Testing",sub: "Laboratorio WiFi", sub2: "SSID de prueba",   accent: false },
            { label: "Mesh WiFi", sub: "Nodo principal",   sub2: "cobertura doméstica", accent: false },
          ].map((node) => (
            <div key={node.label} className="flex flex-col items-center">
              <div className="w-px h-5" style={{ background: "var(--bd)" }} aria-hidden="true" />
              <div
                className="w-full px-2.5 py-2 rounded-xl text-center"
                style={node.accent
                  ? { border: "1px solid var(--a25)", background: "var(--a10)" }
                  : { border: "1px solid var(--bd)", background: "var(--s3)" }
                }
              >
                <p className="text-[10px] font-mono font-semibold" style={{ color: node.accent ? "var(--a)" : "var(--t1)" }}>
                  {node.label}
                </p>
                <p className="text-[9px] mt-0.5" style={{ color: "var(--t2)" }}>{node.sub}</p>
                <p className="text-[9px]" style={{ color: "var(--t3)" }}>{node.sub2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Diagrama lógico ─────────────────────────────────────────────── */
const CENTER = { x: 50, y: 50 };

const NODES = [
  { id: "laptop",  label: "Laptop",          sub: "trabajo remoto",  x: 14,  y: 14 },
  { id: "desktop", label: "PC Desktop",      sub: "en casa",         x: 86,  y: 14 },
  { id: "host",    label: "bandito (host)",  sub: "Proxmox VE",      x: 50,  y: 82 },
  { id: "phone",   label: "Teléfono",        sub: "monitor orbital", x: 14,  y: 82 },
  { id: "vm",      label: "VM Homelab",      sub: "Ubuntu 24.04",    x: 86,  y: 82 },
];

function LogicalDiagram() {
  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Diagrama de red lógica: mesh Tailscale WireGuard conecta bandito host, VM Homelab, Laptop, PC Desktop y Teléfono"
    >
      <div className="relative" style={{ height: "220px" }}>

        {/* SVG lines — rendered behind everything */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
        >
          {NODES.map((node) => (
            <line
              key={node.id}
              x1={`${CENTER.x}%`} y1={`${CENTER.y}%`}
              x2={`${node.x}%`}   y2={`${node.y}%`}
              stroke="var(--a)"
              strokeWidth="1.5"
              strokeOpacity="0.22"
              strokeDasharray="5 5"
            />
          ))}
          {/* Extra line: bandito host ↔ VM (proxmox virtualización) */}
          <line
            x1="50%" y1="50%"
            x2="86%" y2="82%"
            stroke="var(--a)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          <line
            x1="50%" y1="50%"
            x2="50%" y2="82%"
            stroke="var(--a)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        </svg>

        {/* Centro: Tailscale mesh */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ border: "1px solid var(--a20)", background: "var(--a10)", boxShadow: "0 0 28px var(--a10)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-center"
              style={{ border: "1px solid var(--a25)", background: "var(--a15)" }}
            >
              <div>
                <p className="text-[9px] font-mono font-semibold leading-tight" style={{ color: "var(--a)" }}>
                  Tailscale
                </p>
                <p className="text-[9px] font-mono leading-tight" style={{ color: "var(--a)", opacity: 0.7 }}>
                  mesh
                </p>
                <p className="text-[8px] font-mono mt-0.5 leading-tight" style={{ color: "var(--t3)" }}>
                  WireGuard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nodos satélite */}
        {NODES.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className="px-2.5 py-1.5 rounded-lg text-center whitespace-nowrap"
              style={{
                border: "1px solid var(--bd)",
                background: "var(--s3)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p className="text-[10px] font-mono font-semibold leading-none" style={{ color: "var(--t1)" }}>
                {node.label}
              </p>
              <p className="text-[8px] mt-0.5" style={{ color: "var(--t3)" }}>
                {node.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-center font-mono mt-1" style={{ color: "var(--t3)" }}>
        Todos los nodos se resuelven por hostname · cifrado punto a punto
      </p>
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
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
          aria-label="Vista del diagrama"
        >
          {[
            { id: "fisica", label: "Física" },
            { id: "logica", label: "Lógica (Tailscale)" },
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

      {/* Diagram area */}
      <div
        className="flex-1 rounded-xl overflow-hidden p-4"
        style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === "logica" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: view === "logica" ? -10 : 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          >
            {view === "fisica" ? <PhysicalDiagram /> : <LogicalDiagram />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
