import React from "react";
import { motion } from "framer-motion";
import { Compass, Cable, Rocket, BarChart3 } from "lucide-react";

const STEPS = [
  { icon: Compass, title: "Discover & Design", desc: "Kick‑off workshop maps your buildings, systems and KPIs. We ship a tailored deployment blueprint.", color: "#2DD4BF" },
  { icon: Cable, title: "Connect & Integrate", desc: "Non‑invasive gateways adopt BACnet, Modbus, MQTT, KNX and OPC UA — no rip‑and‑replace.", color: "#00E5FF" },
  { icon: Rocket, title: "Automate & Launch", desc: "Roll out AI playbooks: setpoints, schedules, alarms and reports go live in weeks, not months.", color: "#3B82F6" },
  { icon: BarChart3, title: "Optimize Continuously", desc: "Continuous ML tuning drives energy, comfort and reliability gains over time.", color: "#8B5CF6" },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— HOW IT WORKS</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Live in weeks. <span className="text-white/50">Optimizing forever.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <svg className="hidden md:block absolute top-8 left-0 right-0 pointer-events-none" height="60" width="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <line x1="80" y1="30" x2="1120" y2="30" stroke="#2DD4BF" strokeOpacity="0.5" strokeWidth="1.5" className="dashmove" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass rounded-[24px] p-6 hover-lift"
                data-testid={`how-step-${i}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${s.color}18`, boxShadow: `0 0 30px ${s.color}25` }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <span className="font-display text-4xl font-bold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
