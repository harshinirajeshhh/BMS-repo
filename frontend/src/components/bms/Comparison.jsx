import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const ROWS = [
  { feature: "Unified multi-system control", trad: "no", ours: "yes" },
  { feature: "AI-powered predictive maintenance", trad: "no", ours: "yes" },
  { feature: "Real-time cross-building portfolio view", trad: "partial", ours: "yes" },
  { feature: "Open protocol integrations (BACnet, Modbus, MQTT, KNX, OPC UA)", trad: "partial", ours: "yes" },
  { feature: "Native mobile alerts with on-call rotations", trad: "no", ours: "yes" },
  { feature: "ESG & carbon reporting one-click", trad: "no", ours: "yes" },
  { feature: "Occupancy-aware automation", trad: "no", ours: "yes" },
  { feature: "Zero Trust security & SOC2", trad: "partial", ours: "yes" },
  { feature: "24/7 real-time monitoring", trad: "partial", ours: "yes" },
  { feature: "Automated compliance audit trails", trad: "no", ours: "yes" },
];

const Cell = ({ value }) => {
  if (value === "yes") return <span className="inline-flex items-center gap-1.5 text-[#2DD4BF]"><Check size={14} /> Included</span>;
  if (value === "partial") return <span className="inline-flex items-center gap-1.5 text-[#f59e0b]"><Minus size={14} /> Partial</span>;
  return <span className="inline-flex items-center gap-1.5 text-white/40"><X size={14} /> Not available</span>;
};

export default function Comparison() {
  return (
    <section className="relative py-24 md:py-32" data-testid="comparison-section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— COMPARISON</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Traditional BMS vs <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DD4BF] to-[#7dd3fc]">BMS Platform</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-[24px] gradient-border overflow-hidden"
        >
          <div className="grid grid-cols-12 sticky top-0 z-10 backdrop-blur-xl bg-[#0b0f18]/80 border-b border-white/10">
            <div className="col-span-6 p-5 font-mono-ui text-[10px] text-white/50">CAPABILITY</div>
            <div className="col-span-3 p-5 font-mono-ui text-[10px] text-white/50 border-l border-white/10">TRADITIONAL BMS</div>
            <div className="col-span-3 p-5 font-mono-ui text-[10px] text-[#2DD4BF] border-l border-white/10">BMS PLATFORM</div>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.feature}
              className="grid grid-cols-12 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              data-testid={`compare-row-${i}`}
            >
              <div className="col-span-6 p-5 text-sm text-white/85">{r.feature}</div>
              <div className="col-span-3 p-5 text-sm border-l border-white/10"><Cell value={r.trad} /></div>
              <div className="col-span-3 p-5 text-sm border-l border-white/10"><Cell value={r.ours} /></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
