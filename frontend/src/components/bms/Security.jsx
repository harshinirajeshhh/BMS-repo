import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, ScrollText, ShieldCheck, BadgeCheck, FileCheck2, Network, Cable, Radio } from "lucide-react";

const CARDS = [
  { icon: Shield, title: "RBAC", desc: "Fine‑grained role permissions across sites and modules.", color: "#2DD4BF" },
  { icon: Lock, title: "Encryption", desc: "TLS 1.3 in transit, AES‑256 at rest, per‑tenant keys.", color: "#00E5FF" },
  { icon: ScrollText, title: "Audit Logs", desc: "Immutable, time‑stamped and exportable audit trails.", color: "#3B82F6" },
  { icon: ShieldCheck, title: "Zero Trust", desc: "Device, identity and policy verified on every request.", color: "#8B5CF6" },
  { icon: BadgeCheck, title: "Compliance", desc: "GDPR, HIPAA and SOX‑ready controls out of the box.", color: "#2DD4BF" },
  { icon: FileCheck2, title: "SOC 2 · ISO 27001", desc: "Independently audited security & privacy program.", color: "#00E5FF" },
  { icon: Network, title: "BACnet", desc: "Full read/write with ADR and native discovery.", color: "#3B82F6" },
  { icon: Cable, title: "Modbus", desc: "TCP/RTU support with fault‑tolerant gateways.", color: "#8B5CF6" },
  { icon: Radio, title: "KNX", desc: "Native KNX/IP router integration.", color: "#2DD4BF" },
];

export default function Security() {
  return (
    <section id="security" className="relative py-24 md:py-32" data-testid="security-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— SECURITY & PROTOCOLS</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Enterprise‑grade. <span className="text-white/50">By design.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">
            Built with the same rigor as bank‑grade systems, and open to the protocols your buildings already speak.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.6 }}
              className="glass rounded-[24px] p-6 hover-lift"
              data-testid={`security-card-${c.title.toLowerCase().replace(/\s|\./g, "-")}`}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${c.color}18`, boxShadow: `0 0 30px ${c.color}25` }}>
                <c.icon size={18} style={{ color: c.color }} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
