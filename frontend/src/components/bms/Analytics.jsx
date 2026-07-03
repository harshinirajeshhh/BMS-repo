import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar, ResponsiveContainer, XAxis } from "recharts";

const power = Array.from({ length: 30 }).map((_, i) => ({ t: i, v: 200 + Math.sin(i / 3) * 60 + Math.random() * 30 }));
const carbon = Array.from({ length: 12 }).map((_, i) => ({ t: i, v: 80 - i * 3 + Math.random() * 8 }));

const dist = [
  { name: "HVAC", value: 42, color: "#2DD4BF" },
  { name: "Lighting", value: 18, color: "#00E5FF" },
  { name: "Elevators", value: 12, color: "#3B82F6" },
  { name: "IT & Data", value: 15, color: "#8B5CF6" },
  { name: "Other", value: 13, color: "#f472b6" },
];

const perf = [{ name: "score", value: 92, fill: "#2DD4BF" }];

const RECS = [
  { title: "Shift chiller start to 06:15", impact: "-4.2% energy", color: "#2DD4BF" },
  { title: "Reduce Zone 3 setpoint by 1.5°C", impact: "-2.1% energy", color: "#3B82F6" },
  { title: "Predictive maintenance: AHU‑West", impact: "Prevent $2.4k failure", color: "#8B5CF6" },
];

export default function Analytics() {
  return (
    <section className="relative py-24 md:py-32" data-testid="analytics-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— ANALYTICS</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Holographic dashboards <br /><span className="text-white/50">for decision‑makers.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60">Energy, occupancy, carbon and predictive maintenance — beautifully quantified.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          <div className="col-span-12 lg:col-span-8 glass-strong rounded-[24px] gradient-border p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono-ui text-[10px] text-white/50">POWER CONSUMPTION · 30 DAY</div>
                <div className="font-display text-3xl font-semibold mt-1">284.6 <span className="text-base text-white/50">MWh</span></div>
              </div>
              <span className="font-mono-ui text-[10px] text-[#2DD4BF]">↓ 18.4% YOY</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={power}>
                  <defs>
                    <linearGradient id="pw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="v" stroke="#00E5FF" strokeWidth={2} fill="url(#pw)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 glass rounded-[24px] p-6">
            <div className="font-mono-ui text-[10px] text-white/50">BUILDING PERFORMANCE SCORE</div>
            <div className="h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={perf} startAngle={90} endAngle={-270}>
                  <RadialBar background={{ fill: "rgba(255,255,255,0.06)" }} dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-5xl font-semibold text-white">92</div>
                <div className="font-mono-ui text-[10px] text-[#2DD4BF] mt-1">EXCELLENT</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-white/60 text-center">Composite index across energy, comfort, uptime & safety.</div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4 glass rounded-[24px] p-6">
            <div className="font-mono-ui text-[10px] text-white/50">CARBON FOOTPRINT · TCO₂e</div>
            <div className="font-display text-2xl font-semibold mt-1">−33.1% <span className="text-white/50 text-sm">vs baseline</span></div>
            <div className="h-40 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbon}>
                  <Line dataKey="v" stroke="#2DD4BF" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4 glass rounded-[24px] p-6">
            <div className="font-mono-ui text-[10px] text-white/50">CONSUMPTION MIX</div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dist} innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                    {dist.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono-ui text-white/60">
              {dist.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.name} · {d.value}%
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 glass rounded-[24px] p-6">
            <div className="font-mono-ui text-[10px] text-[#8B5CF6] mb-3">AI RECOMMENDATIONS</div>
            <div className="space-y-2.5">
              {RECS.map((r) => (
                <div key={r.title} className="rounded-xl border border-white/8 p-3 hover:bg-white/[0.03] transition-colors">
                  <div className="text-sm text-white">{r.title}</div>
                  <div className="mt-1 font-mono-ui text-[10px]" style={{ color: r.color }}>{r.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
