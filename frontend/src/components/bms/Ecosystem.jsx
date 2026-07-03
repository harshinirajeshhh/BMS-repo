import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sun, BatteryCharging, ParkingCircle, Plug, Wind, ShieldAlert,
  Flame, Lightbulb, Droplets, Cloud, LineChart, Building2
} from "lucide-react";

// 12 nodes arranged in a full circle around the central building
const NODES = [
  { icon: Sun, label: "Solar", color: "#f59e0b", angle: -90 },
  { icon: BatteryCharging, label: "Battery", color: "#2DD4BF", angle: -60 },
  { icon: Plug, label: "EV Chargers", color: "#7dd3fc", angle: -30 },
  { icon: ParkingCircle, label: "Parking", color: "#3B82F6", angle: 0 },
  { icon: Wind, label: "HVAC", color: "#2DD4BF", angle: 30 },
  { icon: ShieldAlert, label: "Security", color: "#8B5CF6", angle: 60 },
  { icon: Flame, label: "Fire", color: "#ef4444", angle: 90 },
  { icon: Lightbulb, label: "Lighting", color: "#f59e0b", angle: 120 },
  { icon: Droplets, label: "Water", color: "#3B82F6", angle: 150 },
  { icon: Cloud, label: "Cloud", color: "#7dd3fc", angle: 180 },
  { icon: LineChart, label: "Analytics", color: "#8B5CF6", angle: 210 },
  { icon: Building2, label: "Elevators", color: "#a78bfa", angle: 240 },
];

// Responsive radius handled by SVG viewbox scaling
const RX = 300;
const RY = 220;

export default function Ecosystem() {
  const pulses = useMemo(() => NODES.map((_, i) => (i * 0.55) % 3.5), []);

  return (
    <section className="relative py-24 md:py-32" data-testid="ecosystem-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— BUILDING ECOSYSTEM</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            One building. <br />
            <span className="text-white/50">An entire ecosystem of intelligence.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-2xl">
            Every system, sensor and service flowing through a single intelligent core — orchestrated in real time.
          </p>
        </motion.div>

        <div className="relative glass-strong gradient-border rounded-[28px] p-6 md:p-10 overflow-hidden">
          {/* backdrop layers */}
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(45,212,191,0.08), transparent 55%)" }} />

          <div className="relative w-full h-[560px] md:h-[640px]">
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="-400 -320 800 640" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="ecoCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Core halo */}
              <circle cx="0" cy="0" r="130" fill="url(#ecoCore)" />

              {/* Elliptical guide rings */}
              <ellipse cx="0" cy="0" rx={RX * 0.55} ry={RY * 0.55} fill="none" stroke="rgba(255,255,255,0.05)" />
              <ellipse cx="0" cy="0" rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,0.06)" />

              {/* Connection lines from center to each node */}
              {NODES.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180;
                const x = Math.cos(rad) * RX;
                const y = Math.sin(rad) * RY;
                const delay = pulses[i];
                return (
                  <g key={n.label}>
                    <line x1="0" y1="0" x2={x} y2={y}
                      stroke={n.color} strokeOpacity="0.22" strokeWidth="1.1" />
                    {/* Traveling dashed segment */}
                    <line x1="0" y1="0" x2={x} y2={y}
                      stroke={n.color} strokeOpacity="0.85" strokeWidth="1.2"
                      strokeDasharray="4 80"
                      style={{ animation: `dashmove 3.6s linear ${delay}s infinite` }} />
                    {/* Endpoint spark */}
                    <circle cx={x} cy={y} r="3" fill={n.color} opacity="0.9" />
                  </g>
                );
              })}
            </svg>

            {/* Center building card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-[28px] blur-2xl bg-[#2DD4BF]/10 scale-[1.6]" />
                <div className="relative glass-strong gradient-border rounded-[24px] px-5 py-4 flex items-center gap-3 min-w-[220px]">
                  <span className="w-12 h-12 rounded-2xl bg-[#0b1220] border border-white/10 flex items-center justify-center">
                    <Building2 size={22} className="text-[#2DD4BF]" />
                  </span>
                  <div>
                    <div className="font-mono-ui text-[9px] text-white/45">SMART BUILDING</div>
                    <div className="font-display text-lg font-semibold">Tower One · HQ</div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-mono-ui text-[#2DD4BF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] pulse-dot" />
                      LIVE · 12 SUBSYSTEMS
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Nodes overlay (chips positioned in %) */}
            <div className="absolute inset-0 pointer-events-none">
              {NODES.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180;
                // Convert -400..400 x-range and -320..320 y-range to percent
                const x = Math.cos(rad) * RX;
                const y = Math.sin(rad) * RY;
                const leftPct = ((x + 400) / 800) * 100;
                const topPct = ((y + 320) / 640) * 100;
                return (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, scale: 0.6, y: 6 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.5 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    data-testid={`ecosystem-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="group flex flex-col items-center gap-1.5">
                      <div className="glass rounded-2xl w-14 h-14 flex items-center justify-center hover:bg-white/10 transition-all hover:-translate-y-0.5"
                        style={{ boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 0 0 1px ${n.color}22` }}>
                        <n.icon size={20} style={{ color: n.color }} />
                      </div>
                      <div className="text-[11px] font-medium text-white/85 whitespace-nowrap">{n.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Overlay corner metrics */}
            <div className="absolute top-2 left-2 font-mono-ui text-[10px] text-white/40">SITE MESH · LIVE</div>
            <div className="absolute bottom-2 right-2 font-mono-ui text-[10px] text-white/40">12 SUBSYSTEMS · 1,037 SIGNALS</div>
          </div>

          {/* Bottom KPI strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Subsystems", value: "12" },
              { label: "Live Signals", value: "1,037" },
              { label: "Automations", value: "284" },
              { label: "Response", value: "12 ms" },
            ].map((k) => (
              <div key={k.label} className="glass rounded-2xl px-4 py-3">
                <div className="font-mono-ui text-[10px] text-white/45">{k.label.toUpperCase()}</div>
                <div className="font-display text-2xl font-semibold text-white mt-0.5">{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
