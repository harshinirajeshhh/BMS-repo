import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Wind, Users, Leaf, Cpu, Droplets, Bell } from "lucide-react";
import Building3D from "./Building3D";
import { useDemoDialog } from "../../pages/BMSLanding";

const KPI = ({ icon: Icon, label, value, sub, color, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
    className={`glass rounded-2xl p-3.5 min-w-[168px] pointer-events-auto ${className}`}
    style={{ boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${color}25` }}
  >
    <div className="flex items-center gap-2 mb-1.5">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
        <Icon size={12} style={{ color }} />
      </span>
      <span className="font-mono-ui text-[9px] text-white/60">{label}</span>
    </div>
    <div className="font-display text-xl font-semibold" style={{ color }}>{value}</div>
    {sub && <div className="text-[10px] text-white/50 mt-0.5">{sub}</div>}
  </motion.div>
);

export default function Hero() {
  const { open } = useDemoDialog();
  return (
    <section id="top" className="relative pt-40 pb-24 md:pt-44 md:pb-32 overflow-hidden" data-testid="hero-section">
      {/* Ambient background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[880px] h-[880px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(45,212,191,0.16), transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-6"
              data-testid="hero-badge"
            >
              <Sparkles size={12} className="text-[#2DD4BF]" />
              <span className="font-mono-ui text-[10px] text-white/70">AI‑POWERED BUILDING INTELLIGENCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight"
            >
              Smarter Buildings.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DD4BF] via-[#7dd3fc] to-[#93c5fd]">
                One Intelligent Platform.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-6 text-base md:text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Monitor, automate, and optimize every system — HVAC, lighting, energy, security, water, and IoT — from a single
              enterprise‑grade command center powered by AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => open("demo")}
                data-testid="hero-request-demo"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium bg-gradient-to-r from-[#2DD4BF] to-[#22c1a0] text-[#06080D] hover:brightness-110 glow-teal transition"
              >
                Request Demo
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="hero-explore-platform"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium glass hover:bg-white/10 text-white transition"
              >
                <Play size={14} />
                Explore Platform
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-10 flex items-center gap-6 text-xs text-white/50"
            >
              <span className="font-mono-ui text-[10px]">TRUSTED BY 23+ SMART BUILDINGS</span>
              <span className="h-4 w-px bg-white/10" />
              <span className="font-mono-ui text-[10px]">SOC 2 · ISO 27001</span>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="font-mono-ui text-[10px] hidden sm:inline">99.99% UPTIME</span>
            </motion.div>
          </div>

          {/* Right: 3D building + floating KPIs */}
          <div className="lg:col-span-6 relative h-[520px] md:h-[640px]">
            <div className="absolute inset-0 pointer-events-none">
              <Suspense fallback={<div className="w-full h-full" />}>
                <Building3D />
              </Suspense>
            </div>

            {/* Floating KPI cards */}
            <div className="absolute inset-0 pointer-events-none">
              <KPI icon={Zap} label="ENERGY USAGE" value="418 kWh" sub="↓ 18% vs last week" color="#2DD4BF" className="absolute top-6 left-0" delay={0.35} />
              <KPI icon={Wind} label="HVAC · ZONE 4" value="22.1°C" sub="Auto‑optimized" color="#3B82F6" className="absolute top-2 right-2" delay={0.45} />
              <KPI icon={Users} label="OCCUPANCY" value="1,284" sub="62% capacity" color="#8B5CF6" className="absolute top-1/2 left-4 -translate-y-1/2" delay={0.55} />
              <KPI icon={Leaf} label="AIR QUALITY" value="AQI 42" sub="Excellent" color="#2DD4BF" className="absolute bottom-24 right-0" delay={0.65} />
              <KPI icon={Cpu} label="DEVICES" value="1,037" sub="online" color="#00E5FF" className="absolute bottom-6 left-8" delay={0.75} />
              <KPI icon={Bell} label="ALARMS" value="0" sub="All clear" color="#2DD4BF" className="absolute bottom-2 right-6" delay={0.85} />
            </div>

            {/* Overlapping dashboard preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="hidden xl:block absolute -bottom-6 -left-16 w-64 glass-strong rounded-2xl p-3 gradient-border"
              data-testid="hero-mini-dashboard"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-ui text-[9px] text-white/60">CARBON REDUCTION</span>
                <span className="font-mono-ui text-[9px] text-[#2DD4BF]">↑ 33.1%</span>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[24,32,28,44,38,52,60,54,68,72,66,82,88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, #2DD4BF, #3B82F6)`,
                    opacity: 0.75 + (i/40),
                  }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
