import React from "react";
import { motion } from "framer-motion";
import {
  Wind, Flame, Video, KeyRound, UserCheck, Lightbulb, Droplets, Zap,
  Wrench, Users, BrainCircuit, Smartphone, Building2, FileBarChart, Plug
} from "lucide-react";

const FEATURES = [
  { key: "hvac", icon: Wind, title: "HVAC Management", desc: "Adaptive zone control with AI setpoint optimization and predictive fault detection.", color: "#2DD4BF", span: "md:col-span-2 md:row-span-2" },
  { key: "fire", icon: Flame, title: "Fire Detection", desc: "Multi‑sensor fire, smoke and gas monitoring with drill logging.", color: "#00E5FF", span: "md:col-span-2" },
  { key: "cctv", icon: Video, title: "CCTV Monitoring", desc: "Unified NVR with anomaly detection and tamper alerts.", color: "#3B82F6", span: "md:col-span-2" },
  { key: "access", icon: KeyRound, title: "Access Control", desc: "Role‑based badge, PIN and mobile credentials.", color: "#8B5CF6", span: "md:col-span-2" },
  { key: "visitor", icon: UserCheck, title: "Visitor Management", desc: "Digital pre‑registration, host approvals and audit trails.", color: "#2DD4BF", span: "md:col-span-2" },
  { key: "lighting", icon: Lightbulb, title: "Lighting Automation", desc: "Circadian & occupancy‑aware scenes across floors.", color: "#00E5FF", span: "md:col-span-2" },
  { key: "water", icon: Droplets, title: "Water Management", desc: "Leak, flow and tank level intelligence — 24×7.", color: "#3B82F6", span: "md:col-span-2" },
  { key: "energy", icon: Zap, title: "Energy Analytics", desc: "Sub‑meter analytics, tariff optimization and carbon reporting.", color: "#2DD4BF", span: "md:col-span-2 md:row-span-2" },
  { key: "maint", icon: Wrench, title: "Predictive Maintenance", desc: "Vibration, thermal and runtime signatures to prevent failures.", color: "#8B5CF6", span: "md:col-span-2" },
  { key: "occ", icon: Users, title: "Occupancy Monitoring", desc: "Anonymous occupancy density and space utilization.", color: "#2DD4BF", span: "md:col-span-2" },
  { key: "ai", icon: BrainCircuit, title: "AI Alerts", desc: "Correlated alarms — no more alert storms.", color: "#8B5CF6", span: "md:col-span-2" },
  { key: "mobile", icon: Smartphone, title: "Mobile Notifications", desc: "Push, SMS, and email — with on‑call rotations.", color: "#3B82F6", span: "md:col-span-2" },
  { key: "multi", icon: Building2, title: "Multi‑site Management", desc: "Global portfolio view across regions and buildings.", color: "#2DD4BF", span: "md:col-span-2" },
  { key: "reports", icon: FileBarChart, title: "Reports", desc: "One‑click ESG, energy and compliance reports.", color: "#00E5FF", span: "md:col-span-2" },
  { key: "integ", icon: Plug, title: "Integrations", desc: "BACnet, Modbus, MQTT, KNX, OPC UA, and REST APIs.", color: "#8B5CF6", span: "md:col-span-4" },
];

const Card = ({ f, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: (i % 6) * 0.05, duration: 0.6 }}
    className={`group relative glass rounded-[24px] p-6 hover-lift overflow-hidden ${f.span}`}
    data-testid={`feature-${f.key}`}
  >
    <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity"
      style={{ background: f.color }} />
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
          style={{ background: `${f.color}18`, boxShadow: `inset 0 0 20px ${f.color}18` }}>
          <f.icon size={18} style={{ color: f.color }} />
        </span>
        <span className="font-mono-ui text-[10px] text-white/50">MODULE / {String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-tight">{f.title}</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
    </div>
  </motion.div>
);

export default function BentoFeatures() {
  return (
    <section id="features" className="relative py-24 md:py-32" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— FEATURE MODULES</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Every building system.
              <br /> <span className="text-white/50">One intelligent surface.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60">
            Fifteen deeply integrated modules replace a decade of stitched‑together tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-8 auto-rows-[180px] gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <Card f={f} i={i} key={f.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
