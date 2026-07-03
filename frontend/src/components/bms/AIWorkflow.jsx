import React from "react";
import { motion } from "framer-motion";
import { Radio, BrainCircuit, GitBranch, Zap, BellRing } from "lucide-react";

const STEPS = [
  { icon: Radio, title: "Sensor", desc: "IoT telemetry from HVAC, meters, cameras and controllers streams in real time.", color: "#2DD4BF" },
  { icon: BrainCircuit, title: "AI Engine", desc: "Correlates 10k+ signals, detects anomalies and forecasts failures.", color: "#00E5FF" },
  { icon: GitBranch, title: "Decision", desc: "Deterministic rules + ML policies choose the optimal response.", color: "#3B82F6" },
  { icon: Zap, title: "Action", desc: "Auto‑commands to controllers: setpoints, schedules, isolations.", color: "#8B5CF6" },
  { icon: BellRing, title: "Notification", desc: "Push to mobile, SMS, or ticket — with on‑call rotations.", color: "#2DD4BF" },
];

export default function AIWorkflow() {
  return (
    <section id="ai" className="relative py-24 md:py-32" data-testid="ai-workflow-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— AI AUTOMATION</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            From sensor to action <span className="text-white/50">in milliseconds.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">
            A closed‑loop pipeline that senses, decides and acts — with humans firmly in control.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <svg className="hidden lg:block absolute top-14 left-0 right-0 mx-auto pointer-events-none" width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flowLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="50%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <line x1="60" y1="30" x2="1140" y2="30" stroke="url(#flowLine)" strokeWidth="1.5" className="dashmove" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative glass rounded-2xl p-5 text-center"
                data-testid={`workflow-step-${s.title.toLowerCase()}`}
              >
                <div className="relative mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${s.color}18`, boxShadow: `0 0 30px ${s.color}30` }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <div className="font-mono-ui text-[9px] text-white/40 mb-1">STEP · {String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
