import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[#1C1C21] py-12 px-5 sm:px-8"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 flex items-center justify-center">
            <Terminal size={12} className="text-[#FF9F0A]" aria-hidden="true" />
          </div>
          <span className="font-mono text-sm font-medium text-[#8A8A90]">bandito</span>
          <span className="text-[#2A2A30] text-xs">·</span>
          <span className="text-xs text-[#46464C]">homelab personal</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          {[
            { href: "https://github.com/tu-usuario/homelab", label: "GitHub" },
            { href: "https://linkedin.com/in/tu-usuario",     label: "LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#46464C] hover:text-[#8A8A90] transition-colors duration-200"
              aria-label={`${label} (abre en nueva pestaña)`}
            >
              <ExternalLink size={12} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>

        {/* Status */}
        <p className="text-[10px] font-mono text-[#46464C] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F0A]/50 animate-pulse" aria-hidden="true" />
          0 puertos expuestos · todo cifrado
        </p>
      </div>
    </motion.footer>
  );
}
