import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Cable, Cloud, Network, Radio, Server, Zap } from "lucide-react";

// Grouped protocols/platforms
const GROUPS = [
  {
    name: "Building Protocols",
    color: "#2DD4BF",
    icon: Radio,
    items: ["BACnet", "Modbus", "KNX", "OPC UA", "MQTT", "LoRaWAN"],
  },
  {
    name: "Cloud & Enterprise",
    color: "#7dd3fc",
    icon: Cloud,
    items: ["Azure", "AWS", "GCP", "Microsoft 365", "SAP", "ServiceNow"],
  },
  {
    name: "Data & APIs",
    color: "#a78bfa",
    icon: Network,
    items: ["REST API", "GraphQL", "Webhooks", "Kafka", "InfluxDB", "SDKs"],
  },
];

const R1 = 140;
const R2 = 230;
const R3 = 320;

const NODES = [
  { label: "BACnet", ring: 1, angle: 20, color: "#2DD4BF" },
  { label: "Modbus", ring: 1, angle: 90, color: "#2DD4BF" },
  { label: "MQTT", ring: 1, angle: 160, color: "#2DD4BF" },
  { label: "KNX", ring: 1, angle: 230, color: "#2DD4BF" },
  { label: "OPC UA", ring: 1, angle: 300, color: "#2DD4BF" },
  { label: "Azure", ring: 2, angle: 0, color: "#7dd3fc" },
  { label: "AWS", ring: 2, angle: 60, color: "#7dd3fc" },
  { label: "SAP", ring: 2, angle: 120, color: "#7dd3fc" },
  { label: "Microsoft", ring: 2, angle: 180, color: "#7dd3fc" },
  { label: "ServiceNow", ring: 2, angle: 240, color: "#7dd3fc" },
  { label: "Snowflake", ring: 2, angle: 300, color: "#7dd3fc" },
  { label: "REST API", ring: 3, angle: 40, color: "#a78bfa" },
  { label: "GraphQL", ring: 3, angle: 100, color: "#a78bfa" },
  { label: "Webhooks", ring: 3, angle: 160, color: "#a78bfa" },
  { label: "Kafka", ring: 3, angle: 220, color: "#a78bfa" },
  { label: "SDKs", ring: 3, angle: 280, color: "#a78bfa" },
  { label: "IoT", ring: 3, angle: 340, color: "#a78bfa" },
];

export default function Integrations() {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.8 + 0.4,
        d: Math.random() * 3,
      })),
    []
  );

  return (
    <section id="integrations" className="relative py-24 md:py-32 overflow-hidden" data-testid="integrations-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: headline + groups */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— INTEGRATIONS</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                The connective tissue <br className="hidden md:block" />
                <span className="text-white/50">for every building system.</span>
              </h2>
              <p className="mt-5 text-white/60 text-base md:text-lg leading-relaxed max-w-md">
                Native adapters for the protocols your buildings already speak, and open APIs for everything else. 200+ integrations, zero rip‑and‑replace.
              </p>
            </motion.div>

            <div className="mt-8 space-y-3">
              {GROUPS.map((g, gi) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.08, duration: 0.5 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${g.color}18`, boxShadow: `inset 0 0 16px ${g.color}12` }}>
                      <g.icon size={16} style={{ color: g.color }} />
                    </span>
                    <div className="flex-1">
                      <div className="font-display text-sm font-semibold text-white">{g.name}</div>
                      <div className="font-mono-ui text-[9px] text-white/40">{g.items.length} PROTOCOLS</div>
                    </div>
                    <span className="text-xs font-mono-ui" style={{ color: g.color }}>·</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full text-[11px] text-white/75 border border-white/8 bg-white/[0.02]">
                        {i}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              <div className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-[#2DD4BF]" />
                  <div className="text-sm text-white/80">Custom protocol needed?</div>
                </div>
                <span className="font-mono-ui text-[10px] text-[#2DD4BF]">2‑WEEK BUILD →</span>
              </div>
            </div>
          </div>

          {/* Right: visualization */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[640px] md:h-[720px] glass-strong gradient-border rounded-[28px] overflow-hidden">
              {/* Starfield */}
              {stars.map((s, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.s,
                    height: s.s,
                    opacity: 0.4,
                    animation: `pulse-dot ${2 + s.d}s ease-in-out infinite`,
                  }}
                />
              ))}
              <div className="absolute inset-0 blueprint-grid opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(45,212,191,0.10), transparent 55%)" }} />

              {/* Rings SVG (behind nodes) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="720" height="720" viewBox="-360 -360 720 720" className="max-w-full max-h-full">
                  <defs>
                    <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="0" cy="0" r={R1} fill="none" stroke="rgba(255,255,255,0.06)" />
                  <circle cx="0" cy="0" r={R2} fill="none" stroke="rgba(255,255,255,0.05)" />
                  <circle cx="0" cy="0" r={R3} fill="none" stroke="rgba(255,255,255,0.04)" />
                  <circle cx="0" cy="0" r="90" fill="url(#coreGrad)" />

                  {NODES.map((n) => {
                    const r = n.ring === 1 ? R1 : n.ring === 2 ? R2 : R3;
                    const x = Math.cos((n.angle * Math.PI) / 180) * r;
                    const y = Math.sin((n.angle * Math.PI) / 180) * r;
                    return (
                      <g key={`line-${n.label}`}>
                        <line x1="0" y1="0" x2={x} y2={y}
                          stroke={n.color} strokeOpacity="0.18" strokeWidth="1" />
                        <line x1="0" y1="0" x2={x} y2={y}
                          stroke={n.color} strokeOpacity="0.55" strokeWidth="1"
                          strokeDasharray="3 60" className="dashmove" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Rotating tick markers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] rounded-full spin-slow">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" style={{ boxShadow: "0 0 8px #2DD4BF" }} />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[460px] h-[460px] rounded-full spin-slow-reverse">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#a78bfa]" style={{ boxShadow: "0 0 8px #a78bfa" }} />
                </div>
              </div>

              {/* Center core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 glass-strong gradient-border rounded-3xl px-5 py-4 flex items-center gap-3 glow-teal"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#0b1220] border border-white/10 flex items-center justify-center">
                    <Building2 size={20} className="text-[#2DD4BF]" />
                  </span>
                  <div>
                    <div className="font-mono-ui text-[9px] text-white/50">BMS CORE</div>
                    <div className="font-display text-lg font-semibold">Intelligence Hub</div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-mono-ui text-[#2DD4BF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] pulse-dot" />
                      1,037 STREAMS · 12ms
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Node chips */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  {NODES.map((n, i) => {
                    const r = n.ring === 1 ? R1 : n.ring === 2 ? R2 : R3;
                    const x = Math.cos((n.angle * Math.PI) / 180) * r;
                    const y = Math.sin((n.angle * Math.PI) / 180) * r;
                    return (
                      <motion.div
                        key={n.label}
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 + i * 0.03, duration: 0.5 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                        style={{ left: x, top: y }}
                        data-testid={`integration-node-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono-ui text-white/85 hover:text-white hover:bg-white/10 transition"
                          style={{ borderColor: `${n.color}30` }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }} />
                          {n.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Corner tags */}
              <div className="absolute top-4 left-4 font-mono-ui text-[10px] text-white/40">INTEGRATION MESH · LIVE</div>
              <div className="absolute bottom-4 right-4 font-mono-ui text-[10px] text-white/40">17 PLATFORMS · 200+ ADAPTERS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
