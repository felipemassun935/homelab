import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Physical Diagram ─────────────────────────────────────────────── */
function PhysicalDiagram() {
  const ISP = { cx: 270, cy: 32, w: 172, h: 46 };
  const SW  = { cx: 270, cy: 106, w: 214, h: 46 };
  const BAR_Y   = 154;
  const NODE_Y  = 166;
  const NODE_H  = 60;
  const NODE_W  = 118;

  const nodes = [
    { cx: 68,  label: "bandito",    sub1: "i3-2120 · 12 GB",  sub2: "Proxmox VE",      accent: true,  wired: true  },
    { cx: 198, label: "PC Desktop", sub1: "uso personal",       sub2: "Cliente TS",      accent: false, wired: true  },
    { cx: 338, label: "AP Testing", sub1: "SSID de prueba",     sub2: "WiFi 5 GHz",      accent: false, wired: false },
    { cx: 468, label: "Mesh WiFi",  sub1: "cobertura hogar",    sub2: "WiFi 2.4 / 5 GHz",accent: false, wired: false },
  ];

  return (
    <svg viewBox="0 0 540 248" className="w-full" role="img"
      aria-label="Diagrama físico: ISP → Switch Cisco 24p → bandito, PC Desktop, AP Testing, Mesh WiFi">

      {/* ISP Router */}
      <rect x={ISP.cx - ISP.w/2} y={ISP.cy - ISP.h/2} width={ISP.w} height={ISP.h} rx="8"
        style={{ fill: "var(--s3)", stroke: "var(--bd)", strokeWidth: "1" }} />
      <text x={ISP.cx} y={ISP.cy - 7} textAnchor="middle" fontSize="11" fontWeight="600"
        fontFamily="monospace" style={{ fill: "var(--t1)" }}>Router ISP</text>
      <text x={ISP.cx} y={ISP.cy + 9} textAnchor="middle" fontSize="9"
        fontFamily="monospace" style={{ fill: "var(--t3)" }}>CGNAT · sin IP pública directa</text>

      {/* ISP → Switch connector */}
      <line x1={ISP.cx} y1={ISP.cy + ISP.h/2} x2={SW.cx} y2={SW.cy - SW.h/2}
        style={{ stroke: "var(--bd)", strokeWidth: "1.5" }} />
      <text x={ISP.cx + 5} y={(ISP.cy + ISP.h/2 + SW.cy - SW.h/2) / 2 + 4}
        fontSize="8" fontFamily="monospace" style={{ fill: "var(--t3)" }}>WAN</text>

      {/* Cisco Switch */}
      <rect x={SW.cx - SW.w/2} y={SW.cy - SW.h/2} width={SW.w} height={SW.h} rx="8"
        style={{ fill: "var(--a10)", stroke: "var(--a25)", strokeWidth: "1.5" }} />
      <text x={SW.cx} y={SW.cy - 7} textAnchor="middle" fontSize="11" fontWeight="600"
        fontFamily="monospace" style={{ fill: "var(--a)" }}>Switch Cisco 24p</text>
      <text x={SW.cx} y={SW.cy + 9} textAnchor="middle" fontSize="9"
        fontFamily="monospace" style={{ fill: "var(--t2)" }}>Capa 2 · Gigabit Ethernet</text>

      {/* Switch → horizontal bar */}
      <line x1={SW.cx} y1={SW.cy + SW.h/2} x2={SW.cx} y2={BAR_Y}
        style={{ stroke: "var(--bd)", strokeWidth: "1.5" }} />

      {/* Horizontal distribution bar */}
      <line x1={nodes[0].cx} y1={BAR_Y} x2={nodes[nodes.length - 1].cx} y2={BAR_Y}
        style={{ stroke: "var(--bd)", strokeWidth: "1.5" }} />

      {/* Vertical drops */}
      {nodes.map(n => (
        <line key={n.label} x1={n.cx} y1={BAR_Y} x2={n.cx} y2={NODE_Y}
          style={{
            stroke: n.wired ? "var(--bd)" : "var(--t3)",
            strokeWidth: "1.5",
            strokeDasharray: n.wired ? "0" : "5 3",
          }} />
      ))}

      {/* Node boxes */}
      {nodes.map(n => (
        <g key={n.label}>
          <rect x={n.cx - NODE_W / 2} y={NODE_Y} width={NODE_W} height={NODE_H} rx="8"
            style={{
              fill: n.accent ? "var(--a10)" : "var(--s3)",
              stroke: n.accent ? "var(--a25)" : "var(--bd)",
              strokeWidth: n.accent ? "1.5" : "1",
            }} />
          <text x={n.cx} y={NODE_Y + 18} textAnchor="middle" fontSize="11" fontWeight="600"
            fontFamily="monospace" style={{ fill: n.accent ? "var(--a)" : "var(--t1)" }}>{n.label}</text>
          <text x={n.cx} y={NODE_Y + 33} textAnchor="middle" fontSize="9"
            fontFamily="monospace" style={{ fill: "var(--t2)" }}>{n.sub1}</text>
          <text x={n.cx} y={NODE_Y + 48} textAnchor="middle" fontSize="8"
            fontFamily="monospace" style={{ fill: n.accent ? "var(--a)" : "var(--t3)", opacity: "0.85" }}>{n.sub2}</text>
        </g>
      ))}

      {/* Legend */}
      <line x1="8"  y1="240" x2="22" y2="240" style={{ stroke: "var(--bd)", strokeWidth: "1.5" }} />
      <text x="26" y="244" fontSize="8" fontFamily="monospace" style={{ fill: "var(--t3)" }}>Ethernet</text>
      <line x1="86" y1="240" x2="100" y2="240" style={{ stroke: "var(--t3)", strokeWidth: "1.5", strokeDasharray: "5 3" }} />
      <text x="104" y="244" fontSize="8" fontFamily="monospace" style={{ fill: "var(--t3)" }}>WiFi</text>
    </svg>
  );
}

/* ── Logical Diagram ─────────────────────────────────────────────── */
function LogicalDiagram() {
  const HUB = { x: 260, y: 124, rOut: 54, rIn: 40 };
  const NW = 112, NH = 50;

  const nodes = [
    { id: "laptop",  label: "Laptop",      sub: "trabajo remoto",  cx: 88,  cy: 58,  accent: false },
    { id: "desktop", label: "PC Desktop",  sub: "en casa",         cx: 432, cy: 58,  accent: false },
    { id: "phone",   label: "Teléfono",    sub: "monitor orbital", cx: 76,  cy: 216, accent: false },
    { id: "bandito", label: "bandito",     sub: "Proxmox VE",      cx: 260, cy: 226, accent: true  },
    { id: "vm",      label: "VM Homelab",  sub: "Ubuntu 24.04",    cx: 444, cy: 216, accent: true  },
  ];

  return (
    <svg viewBox="0 0 520 264" className="w-full" role="img"
      aria-label="Red lógica Tailscale: mesh WireGuard conecta bandito, VM, Laptop, PC y Teléfono">

      {/* Dashed WireGuard lines — behind everything */}
      {nodes.map(n => (
        <line key={n.id}
          x1={HUB.x} y1={HUB.y} x2={n.cx} y2={n.cy}
          style={{ stroke: "var(--a)", strokeOpacity: "0.20", strokeWidth: "1.5", strokeDasharray: "7 5" }} />
      ))}

      {/* Solid line: bandito ↔ VM (Proxmox local) */}
      <line x1={260} y1={226} x2={444} y2={216}
        style={{ stroke: "var(--a)", strokeOpacity: "0.55", strokeWidth: "2" }} />

      {/* Hub outer glow ring */}
      <circle cx={HUB.x} cy={HUB.y} r={HUB.rOut}
        style={{ fill: "var(--a10)", stroke: "var(--a20)", strokeWidth: "1" }} />
      {/* Hub inner ring */}
      <circle cx={HUB.x} cy={HUB.y} r={HUB.rIn}
        style={{ fill: "var(--a15)", stroke: "var(--a25)", strokeWidth: "1.5" }} />

      {/* Hub labels */}
      <text x={HUB.x} y={HUB.y - 10} textAnchor="middle" fontSize="12" fontWeight="700"
        fontFamily="monospace" style={{ fill: "var(--a)" }}>Tailscale</text>
      <text x={HUB.x} y={HUB.y + 5}  textAnchor="middle" fontSize="10"
        fontFamily="monospace" style={{ fill: "var(--a)", opacity: "0.85" }}>mesh</text>
      <text x={HUB.x} y={HUB.y + 20} textAnchor="middle" fontSize="8"
        fontFamily="monospace" style={{ fill: "var(--t3)" }}>WireGuard E2E</text>

      {/* Satellite nodes */}
      {nodes.map(n => (
        <g key={n.id}>
          <rect x={n.cx - NW / 2} y={n.cy - NH / 2} width={NW} height={NH} rx="8"
            style={{
              fill: n.accent ? "var(--a10)" : "var(--s3)",
              stroke: n.accent ? "var(--a25)" : "var(--bd)",
              strokeWidth: n.accent ? "1.5" : "1",
            }} />
          <text x={n.cx} y={n.cy - 7} textAnchor="middle" fontSize="11" fontWeight="600"
            fontFamily="monospace" style={{ fill: n.accent ? "var(--a)" : "var(--t1)" }}>{n.label}</text>
          <text x={n.cx} y={n.cy + 9} textAnchor="middle" fontSize="9"
            fontFamily="monospace" style={{ fill: "var(--t2)" }}>{n.sub}</text>
        </g>
      ))}

      {/* Legend */}
      <line x1="8"   y1="257" x2="24"  y2="257"
        style={{ stroke: "var(--a)", strokeOpacity: "0.28", strokeWidth: "1.5", strokeDasharray: "7 5" }} />
      <text x="28"  y="261" fontSize="8" fontFamily="monospace" style={{ fill: "var(--t3)" }}>Tailscale WireGuard</text>
      <line x1="158" y1="257" x2="174" y2="257"
        style={{ stroke: "var(--a)", strokeOpacity: "0.55", strokeWidth: "2" }} />
      <text x="178" y="261" fontSize="8" fontFamily="monospace" style={{ fill: "var(--t3)" }}>Red local (Proxmox)</text>
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
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
              className="relative px-3 py-1 text-xs rounded-md font-medium focus-visible:outline-none"
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
