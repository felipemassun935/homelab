import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Lock, Cpu, HardDrive } from "lucide-react";
import { STATS, HOST } from "../data/homelab";

const STAT_ICONS = [Server, Lock, Cpu, HardDrive];

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 28 } },
};

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 pt-28 pb-20 max-w-6xl mx-auto overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.12, 0.94, 1.06, 1], opacity: [0.14, 0.20, 0.12, 0.17, 0.14] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #FF9F0A 0%, transparent 68%)", filter: "blur(80px)" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10">
        <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-0">

          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9F0A]/8 border border-[#FF9F0A]/20 text-[#FF9F0A] text-xs font-mono tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F0A] animate-pulse" aria-hidden="true" />
              self-hosted · running
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            id="hero-heading"
            className="text-[clamp(3.5rem,12vw,8rem)] font-bold text-[#F0F0F5] tracking-[-0.04em] leading-none mb-5 font-mono"
          >
            bandito
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-lg sm:text-xl text-[#8A8A90] mb-4 font-light tracking-wide">
              Homelab personal autoalojado
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {["Proxmox VE", "Docker", "Tailscale"].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[#FF9F0A]/80 tracking-wider">{t}</span>
                  {i < 2 && <span className="text-[#2A2A30]">·</span>}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-[#8A8A90] max-w-lg leading-relaxed mb-12 text-sm sm:text-base"
          >
            Un servidor de producción real corriendo en hardware modesto. El foco no
            está en el inventario de herramientas sino en las{" "}
            <span className="text-[#F0F0F5] font-medium">decisiones de arquitectura</span>:
            por qué Tailscale y no un reverse proxy, por qué el monitor está en otro
            dispositivo, por qué Watchtower está excluido a propósito.
          </motion.p>

          {/* Host specs */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-[10px] font-mono text-[#46464C] uppercase tracking-[0.12em] mb-3">
              Host físico
            </p>
            <div className="flex flex-wrap gap-2">
              {[HOST.cpu, HOST.ram + " RAM", HOST.hypervisor, HOST.storage.system, HOST.storage.nas].map((spec) => (
                <span
                  key={spec}
                  className="font-mono text-xs px-3 py-1 rounded-lg border border-[#2A2A30] bg-[#0F0F12] text-[#8A8A90]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            aria-label="Estadísticas del homelab"
          >
            {STATS.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2, borderColor: "rgba(255,159,10,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="bg-[#0F0F12] border border-[#2A2A30] rounded-2xl p-4 flex flex-col gap-2.5 cursor-default"
                >
                  <Icon size={15} className="text-[#FF9F0A]" aria-hidden="true" />
                  <div
                    className="text-2xl font-bold font-mono text-[#F0F0F5] tracking-tight"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#46464C] leading-tight">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-transparent to-[#2A2A30]"
        />
      </motion.div>
    </section>
  );
}
