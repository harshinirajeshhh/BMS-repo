import React from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const NODES = [
  { label: "BACnet", ring: 1, angle: 0 },
  { label: "Modbus", ring: 1, angle: 60 },
  { label: "MQTT", ring: 1, angle: 120 },
  { label: "KNX", ring: 1, angle: 180 },
  { label: "OPC UA", ring: 1, angle: 240 },
  { label: "REST API", ring: 1, angle: 300 },
  { label: "Azure", ring: 2, angle: 30 },
  { label: "AWS", ring: 2, angle: 90 },
  { label: "Microsoft", ring: 2, angle: 150 },
  { label: "SAP", ring: 2, angle: 210 },
  { label: "IoT Sensors", ring: 2, angle: 270 },
  { label: "Controllers", ring: 2, angle: 330 },
];

const R1 = 155;
const R2 = 240;

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-24 md:py-32 overflow-hidden" data-testid="integrations-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— INTEGRATIONS</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            The connective tissue <span className="text-white/50">for every building system.</span>
          </h2>
        </motion.div>

        <div className="relative w-full h-[560px] flex items-center justify-center">
          {/* Rings */}
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/8" />
          <div className="absolute w-[510px] h-[510px] rounded-full border border-white/6" />
          <div className="absolute w-[340px] h-[340px] rounded-full spin-slow">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2DD4BF]" style={{ boxShadow: "0 0 12px #2DD4BF" }} />
          </div>
          <div className="absolute w-[510px] h-[510px] rounded-full spin-slow-reverse">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8B5CF6]" style={{ boxShadow: "0 0 12px #8B5CF6" }} />
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-320 -320 640 640">
            {NODES.map((n) => {
              const r = n.ring === 1 ? R1 : R2;
              const x = Math.cos((n.angle * Math.PI) / 180) * r;
              const y = Math.sin((n.angle * Math.PI) / 180) * r;
              return (
                <line key={n.label} x1="0" y1="0" x2={x} y2={y}
                  stroke={n.ring === 1 ? "#2DD4BF" : "#3B82F6"}
                  strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
              );
            })}
          </svg>

          {/* Center core */}
          <div className="relative z-10 glass-strong gradient-border rounded-[24px] px-5 py-4 flex items-center gap-3 glow-teal">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center">
              <Building2 size={18} className="text-[#06080D]" />
            </span>
            <div>
              <div className="font-mono-ui text-[9px] text-white/50">BMS CORE</div>
              <div className="font-display text-lg font-semibold">Intelligence Hub</div>
            </div>
          </div>

          {/* Orbiting nodes */}
          {NODES.map((n) => {
            const r = n.ring === 1 ? R1 : R2;
            const x = Math.cos((n.angle * Math.PI) / 180) * r;
            const y = Math.sin((n.angle * Math.PI) / 180) * r;
            return (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * n.angle / 60, duration: 0.6 }}
                className="absolute glass rounded-full px-3 py-1.5 text-xs font-mono-ui text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                data-testid={`integration-node-${n.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {n.label}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
