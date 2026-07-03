import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Activity, AlertCircle, CheckCircle2, Cpu, Users } from "lucide-react";

const energyData = Array.from({ length: 24 }).map((_, i) => ({
  t: `${i}h`,
  v: 380 + Math.sin(i / 2) * 60 + Math.random() * 20,
  saved: 60 + Math.cos(i / 3) * 20 + Math.random() * 10,
}));

const occData = Array.from({ length: 12 }).map((_, i) => ({
  t: `${8 + i}:00`,
  v: 200 + Math.sin(i / 2) * 400 + Math.random() * 80,
}));

const alertTimeline = [
  { time: "09:12", status: "resolved", label: "HVAC Zone 3 rebalanced", color: "#2DD4BF" },
  { time: "10:44", status: "info", label: "Water pump #2 auto-cycled", color: "#3B82F6" },
  { time: "13:02", status: "info", label: "Occupancy threshold reached · Tower B", color: "#8B5CF6" },
  { time: "15:30", status: "resolved", label: "CCTV feed 24 restored", color: "#2DD4BF" },
];

export default function ControlCenter() {
  return (
    <section id="platform" className="relative py-24 md:py-32" data-testid="control-center-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— PLATFORM OVERVIEW</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            An immersive command center for every building.
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
            Real‑time telemetry, floor maps, equipment health, alarm timelines and AI recommendations — unified in one glass surface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-[28px] glass-strong gradient-border p-6 md:p-8 overflow-hidden"
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

          <div className="grid grid-cols-12 gap-4 md:gap-5 relative">
            {/* Energy analytics */}
            <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-mono-ui text-[10px] text-white/50">ENERGY ANALYTICS · LAST 24H</div>
                  <div className="font-display text-2xl font-semibold text-white mt-1">9,842 kWh <span className="text-sm text-[#2DD4BF] font-mono-ui">↓ 18.4%</span></div>
                </div>
                <div className="hidden sm:flex gap-3 text-[10px] font-mono-ui text-white/60">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />CONSUMPTION</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />SAVED</span>
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gTeal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0b0f18", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                    <Area type="monotone" dataKey="v" stroke="#2DD4BF" strokeWidth={2} fill="url(#gTeal)" />
                    <Area type="monotone" dataKey="saved" stroke="#8B5CF6" strokeWidth={2} fill="url(#gPurple)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Equipment status */}
            <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-5">
              <div className="font-mono-ui text-[10px] text-white/50">EQUIPMENT HEALTH</div>
              <div className="mt-3 space-y-2.5">
                {[
                  { name: "Chiller · Unit A", pct: 96, color: "#2DD4BF" },
                  { name: "AHU · West Wing", pct: 88, color: "#2DD4BF" },
                  { name: "Boiler · Basement", pct: 74, color: "#3B82F6" },
                  { name: "Elevator #4", pct: 62, color: "#f59e0b" },
                  { name: "Solar Inverter", pct: 91, color: "#2DD4BF" },
                ].map((row) => (
                  <div key={row.name}>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/80">{row.name}</span>
                      <span className="font-mono-ui text-white/60">{row.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: `linear-gradient(90deg, ${row.color}, ${row.color}80)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor map / occupancy heatmap */}
            <div className="col-span-12 lg:col-span-5 glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono-ui text-[10px] text-white/50">OCCUPANCY HEATMAP · TOWER B · L12</div>
                <span className="font-mono-ui text-[10px] text-[#2DD4BF]">62% CAPACITY</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 96 }).map((_, i) => {
                  const intensity = Math.abs(Math.sin(i * 0.7) + Math.cos(i * 0.3)) / 2;
                  const hue = intensity > 0.7 ? "#f59e0b" : intensity > 0.4 ? "#2DD4BF" : "#3B82F6";
                  return <div key={i} className="aspect-square rounded" style={{ background: hue, opacity: 0.15 + intensity * 0.7 }} />;
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono-ui text-white/50">
                <span>ROOM 1201</span>
                <span>ROOM 1248</span>
              </div>
            </div>

            {/* Power consumption bars */}
            <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-5">
              <div className="font-mono-ui text-[10px] text-white/50">POWER · BY SYSTEM</div>
              <div className="mt-2 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { n: "HVAC", v: 42 },
                    { n: "Light", v: 18 },
                    { n: "Elev", v: 12 },
                    { n: "IT", v: 15 },
                    { n: "Other", v: 13 },
                  ]}>
                    <XAxis dataKey="n" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Bar dataKey="v" fill="#2DD4BF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alert timeline */}
            <div className="col-span-12 lg:col-span-3 glass rounded-2xl p-5">
              <div className="font-mono-ui text-[10px] text-white/50 mb-3">ALERT TIMELINE</div>
              <div className="space-y-2.5">
                {alertTimeline.map((a) => (
                  <div key={a.time} className="flex gap-2.5 items-start">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: a.color, boxShadow: `0 0 8px ${a.color}` }} />
                    <div className="text-[11px]">
                      <div className="text-white/80 leading-tight">{a.label}</div>
                      <div className="font-mono-ui text-white/40 mt-0.5">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom KPIs */}
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
              {[
                { icon: CheckCircle2, label: "System Uptime", value: "99.99%", color: "#2DD4BF" },
                { icon: Users, label: "Active Users", value: "3,428", color: "#3B82F6" },
                { icon: Cpu, label: "Devices Online", value: "1,037", color: "#00E5FF" },
                { icon: AlertCircle, label: "Open Alerts", value: "0", color: "#8B5CF6" },
              ].map((k) => (
                <div key={k.label} className="glass rounded-2xl p-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}18` }}>
                    <k.icon size={16} style={{ color: k.color }} />
                  </span>
                  <div>
                    <div className="font-mono-ui text-[9px] text-white/50">{k.label}</div>
                    <div className="font-display text-lg font-semibold text-white">{k.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
