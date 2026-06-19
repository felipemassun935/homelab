import { Terminal, ExternalLink } from "lucide-react";
import { HOST } from "../data/homelab";

export function IdentityCard() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col h-full"
      style={{ background: "var(--s1)", border: "1px solid var(--bd)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--a10)", border: "1px solid var(--a25)" }}
        >
          <Terminal size={16} style={{ color: "var(--a)" }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-lg font-bold tracking-tight leading-none" style={{ color: "var(--t1)" }}>
            bandito
          </p>
          <p className="text-xs font-mono mt-0.5" style={{ color: "var(--t3)" }}>
            {HOST.hypervisor} · {HOST.vm.os}
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono flex-shrink-0"
          style={{ background: "var(--a10)", border: "1px solid var(--a25)", color: "var(--a)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--a)" }} aria-hidden="true" />
          online
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--t2)" }}>
        Servidor de producción real en hardware modesto. El foco está en las{" "}
        <span className="font-medium" style={{ color: "var(--t1)" }}>decisiones de arquitectura</span>,
        no en el inventario de herramientas.
      </p>

      {/* Host specs */}
      <div className="mb-4">
        <p className="text-xs font-mono uppercase tracking-[0.08em] mb-2" style={{ color: "var(--t3)" }}>
          Host físico
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[HOST.cpu, HOST.ram + " RAM", HOST.storage.system, HOST.storage.nas].map((spec) => (
            <span
              key={spec}
              className="text-xs font-mono px-2.5 py-1 rounded-lg"
              style={{ background: "var(--s2)", border: "1px solid var(--bds)", color: "var(--t2)" }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* VM info */}
      <div
        className="rounded-xl p-3 mb-4"
        style={{ background: "var(--s2)", border: "1px solid var(--bds)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono uppercase tracking-[0.08em]" style={{ color: "var(--t3)" }}>VM</span>
          <span className="text-xs font-mono" style={{ color: "var(--a)" }}>vmid {HOST.vm.vmid}</span>
        </div>
        <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{HOST.vm.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--t2)" }}>{HOST.vm.os}</p>
      </div>

      {/* Links */}
      <div className="mt-auto flex items-center gap-4">
        {[
          { href: "https://github.com/felipemassun935", label: "GitHub" },
          { href: "https://linkedin.com/in/massunfelipe",  label: "LinkedIn" },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
            style={{ color: "var(--t3)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--t1)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--t3)"}
          >
            <ExternalLink size={12} />
            {label}
          </a>
        ))}
        <span className="ml-auto text-xs font-mono" style={{ color: "var(--t3)" }}>
          {HOST.tailnet}
        </span>
      </div>
    </div>
  );
}
