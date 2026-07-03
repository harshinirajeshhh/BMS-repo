import React from "react";
import { motion } from "framer-motion";
import { Sun, BatteryCharging, ParkingCircle, Plug, Wind, ShieldAlert, Flame, Lightbulb, Droplets, Cloud, LineChart, Building2 } from "lucide-react";

const NODES = [
  { icon: Sun, label: "Solar", color: "#f59e0b" },
  { icon: BatteryCharging, label: "Battery", color: "#2DD4BF" },
  { icon: ParkingCircle, label: "Parking", color: "#3B82F6" },
  { icon: Plug, label: "EV Chargers", color: "#00E5FF" },
  { icon: Wind, label: "HVAC", color: "#2DD4BF" },
  { icon: ShieldAlert, label: "Security", color: "#8B5CF6" },
  { icon: Flame, label: "Fire", color: "#ef4444" },
  { icon: Lightbulb, label: "Lighting", color: "#f59e0b" },
  { icon: Droplets, label: "Water", color: "#3B82F6" },
  { icon: Cloud, label: "Cloud", color: "#00E5FF" },
  { icon: LineChart, label: "Analytics", color: "#8B5CF6" },
];

export default function Ecosystem() {
  return (
    <section className="relative py-24 md:py-32" data-testid="ecosystem-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— BUILDING ECOSYSTEM</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            An intelligent ecosystem <span className="text-white/50">around every asset.</span>
          </h2>
        </motion.div>

        <div className="relative glass-strong gradient-border rounded-[28px] p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-10">
            {/* Central building */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl bg-[#2DD4BF]/25 scale-150" />
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center glow-teal">
                <Building2 size={44} className="text-[#06080D]" strokeWidth={2} />
              </div>
              <div className="mt-3 text-center font-mono-ui text-[10px] text-white/60">SMART BUILDING</div>
            </div>

            {/* Connected nodes as chips */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 relative w-full max-w-4xl">
              {NODES.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover-lift"
                  data-testid={`ecosystem-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${n.color}18`, boxShadow: `0 0 24px ${n.color}25` }}>
                    <n.icon size={20} style={{ color: n.color }} />
                  </span>
                  <span className="text-xs text-white/80">{n.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
