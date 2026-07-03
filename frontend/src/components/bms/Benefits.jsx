import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "35%", label: "Energy Savings", sub: "Across deployed portfolios", color: "#2DD4BF" },
  { value: "40%", label: "Maintenance Reduction", sub: "Predictive over reactive", color: "#3B82F6" },
  { value: "99.99%", label: "System Uptime", sub: "Enterprise SLA guaranteed", color: "#00E5FF" },
  { value: "24/7", label: "Real‑Time Monitoring", sub: "Global NOC coverage", color: "#8B5CF6" },
];

export default function Benefits() {
  return (
    <section className="relative py-24 md:py-32" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— CUSTOMER BENEFITS</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Outcomes that move <span className="text-white/50">the bottom line.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative glass rounded-[24px] p-8 overflow-hidden hover-lift"
              data-testid={`benefit-${s.label.toLowerCase().replace(/\s|‑/g, "-")}`}
            >
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-30" style={{ background: s.color }} />
              <div className="relative">
                <div className="font-display font-semibold text-6xl lg:text-7xl tracking-tighter" style={{ color: s.color }}>{s.value}</div>
                <div className="mt-3 font-display text-lg text-white">{s.label}</div>
                <div className="mt-1 text-sm text-white/50">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
