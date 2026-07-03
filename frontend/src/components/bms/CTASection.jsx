import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useDemoDialog } from "../../pages/BMSLanding";

export default function CTASection() {
  const { open } = useDemoDialog();
  return (
    <section className="relative py-24 md:py-32" data-testid="cta-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative glass-strong gradient-border rounded-[28px] p-10 md:p-20 overflow-hidden text-center">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(45,212,191,0.25), transparent 60%)" }} />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight"
          >
            One Platform.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DD4BF] via-[#00E5FF] to-[#3B82F6]">
              Complete Building Intelligence.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative mt-6 text-white/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Join the enterprises transforming their portfolios into intelligent, sustainable ecosystems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative mt-10 flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => open("demo")}
              data-testid="cta-book-demo"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium bg-gradient-to-r from-[#2DD4BF] to-[#22c1a0] text-[#06080D] hover:brightness-110 glow-teal transition"
            >
              Book Demo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => open("sales")}
              data-testid="cta-contact-sales"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium glass hover:bg-white/10 text-white transition"
            >
              <Phone size={14} />
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
