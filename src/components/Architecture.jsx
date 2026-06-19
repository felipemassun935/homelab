import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Globe, Monitor } from "lucide-react";

const sectionReveal = {
  initial:  { opacity: 0, y: 28 },
  animate:  { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

function PhysicalDiagram() {
  return (
    <div
      className="relative w-full overflow-x-auto"
      role="img"
      aria-label="Diagrama de red física: ISP con CGNAT → switch Cisco 24p → host bandito, PC desktop, AP de testing y mesh WiFi"
    >
      <div className="min-w-[520px] py-8 px-2">
        <div className="flex flex-col items-center gap-0 mb-4">
          {/* ISP */}
          <div className="px-5 py-3 rounded-2xl border border-[#2A2A30] bg-[#0F0F12] flex items-center gap-3">
            <Globe size={15} className="text-[#46464C]" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-[#F0F0F5] font-medium">Router ISP</p>
              <p className="text-[10px] font-mono text-[#46464C] mt-0.5">CGNAT — sin IP pública directa</p>
            </div>
          </div>
          <div className="w-px h-6 bg-[#2A2A30]" aria-hidden="true" />
          {/* Switch */}
          <div className="px-5 py-3 rounded-2xl border border-[#FF9F0A]/20 bg-[#FF9F0A]/5 flex items-center gap-3">
            <Network size={15} className="text-[#FF9F0A]" aria-hidden="true" />
            <div>
              <p className="text-xs font-mono text-[#F0F0F5] font-medium">Switch Cisco</p>
              <p className="text-[10px] font-mono text-[#46464C] mt-0.5">24 puertos · capa 2</p>
            </div>
          </div>
          <div className="w-px h-4 bg-[#2A2A30]" aria-hidden="true" />
        </div>

        {/* Branch line */}
        <div className="relative flex justify-center mb-0" aria-hidden="true">
          <div className="w-[75%] h-px bg-[#2A2A30]" />
        </div>

        {/* Nodes */}
        <div className="grid grid-cols-4 gap-3 mt-0">
          {[
            { label: "bandito", sub: "Intel i3-2120 · 8 GB", sub2: "Proxmox VE", accent: true },
            { label: "PC Desktop", sub: "Cliente Tailscale", sub2: "uso personal", accent: false },
            { label: "AP Testing", sub: "Laboratorio WiFi", sub2: "SSID de prueba", accent: false },
            { label: "Mesh WiFi", sub: "Nodo principal", sub2: "cobertura doméstica", accent: false },
          ].map((node) => (
            <div key={node.label} className="flex flex-col items-center gap-0">
              <div className="w-px h-4 bg-[#2A2A30]" />
              <div
                className={`w-full px-3 py-3 rounded-xl border text-center ${
                  node.accent
                    ? "border-[#FF9F0A]/25 bg-[#FF9F0A]/5"
                    : "border-[#2A2A30] bg-[#0F0F12]"
                }`}
              >
                <p className={`text-xs font-mono font-semibold ${node.accent ? "text-[#FF9F0A]" : "text-[#F0F0F5]"}`}>
                  {node.label}
                </p>
                <p className="text-[10px] text-[#8A8A90] mt-0.5">{node.sub}</p>
                <p className="text-[10px] text-[#46464C]">{node.sub2}</p>
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
    { id: "host",    label: "bandito (host)", sub: "Proxmox VE",     x: 50, y: 50 },
    { id: "vm",      label: "VM Homelab",     sub: "Ubuntu 24.04",   x: 50, y: 78 },
    { id: "laptop",  label: "Laptop Linux",   sub: "trabajo remoto", x: 10, y: 18 },
    { id: "desktop", label: "PC Desktop",     sub: "en casa",        x: 90, y: 18 },
    { id: "phone",   label: "Teléfono",       sub: "monitor orbital",x: 10, y: 82 },
  ];

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Diagrama de red lógica: mesh Tailscale conectando bandito host, VM Homelab, laptop Linux, PC desktop y teléfono"
    >
      <div className="relative h-72 sm:h-80">
        {/* Center mesh */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full border border-[#FF9F0A]/15 bg-[#FF9F0A]/5 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,159,10,0.08)]">
              <div className="w-18 h-18 rounded-full border border-[#FF9F0A]/25 bg-[#FF9F0A]/8 flex items-center justify-center w-[72px] h-[72px]">
                <span className="text-[10px] font-mono text-[#FF9F0A] text-center leading-snug">
                  Tailscale<br />mesh
                </span>
              </div>
            </div>
            <p className="text-[10px] text-[#46464C] mt-2 font-mono">WireGuard cifrado</p>
          </div>
        </div>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="px-3 py-2 rounded-xl border border-[#2A2A30] bg-[#0F0F12] text-center whitespace-nowrap">
              <Monitor size={11} className="text-[#FF9F0A] mx-auto mb-1" aria-hidden="true" />
              <p className="text-[11px] font-mono text-[#F0F0F5] font-medium">{node.label}</p>
              <p className="text-[10px] text-[#46464C]">{node.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#46464C] text-center mt-2 font-mono">
        Todos los nodos del tailnet se resuelven por hostname — sin importar su ubicación.
      </p>
    </div>
  );
}

export function Architecture() {
  const [view, setView] = useState("fisica");

  return (
    <section
      id="arquitectura"
      className="py-28 px-5 sm:px-8 max-w-6xl mx-auto"
      aria-labelledby="arch-heading"
    >
      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
      >
        <p className="text-[11px] font-mono text-[#FF9F0A] uppercase tracking-[0.14em] mb-3">02</p>
        <h2 id="arch-heading" className="text-3xl sm:text-4xl font-bold text-[#F0F0F5] tracking-[-0.02em] mb-3">
          Arquitectura & Red
        </h2>
        <p className="text-[#8A8A90] max-w-xl mb-10 text-sm sm:text-base leading-relaxed">
          Dos vistas de la misma infraestructura: la topología física de cables y
          equipos, y la capa lógica que Tailscale aplana.
        </p>

        {/* Segmented control — iOS style with sliding pill */}
        <div
          className="inline-flex rounded-xl border border-[#2A2A30] bg-[#0F0F12] p-1 gap-1 mb-8"
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
              className="relative px-4 py-2 text-sm rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F0A]/50"
            >
              {view === id && (
                <motion.span
                  layoutId="arch-tab"
                  className="absolute inset-0 rounded-lg bg-[#FF9F0A]/10 border border-[#FF9F0A]/25"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative z-10 font-medium ${view === id ? "text-[#FF9F0A]" : "text-[#8A8A90]"}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-[#0F0F12] border border-[#2A2A30] rounded-2xl p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              {view === "fisica" ? <PhysicalDiagram /> : <LogicalDiagram />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
