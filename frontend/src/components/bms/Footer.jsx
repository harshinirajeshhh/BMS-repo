import React from "react";
import { Building2, Github, Linkedin, Twitter, Youtube } from "lucide-react";

const COLS = [
  {
    title: "Product",
    items: ["Platform Overview", "Features", "AI Automation", "Analytics", "Integrations", "Security"],
  },
  {
    title: "Resources",
    items: ["Documentation", "API Reference", "Case Studies", "Blog", "Whitepapers", "Roadmap"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Partners", "Press", "Contact", "Investors"],
  },
  {
    title: "Legal",
    items: ["Privacy", "Terms", "Cookies", "DPA", "Trust Center", "Compliance"],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-white/8 bg-[#05070C]" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center">
                <Building2 size={18} className="text-[#06080D]" />
              </span>
              <span className="font-display text-xl font-semibold">BMS</span>
            </div>
            <p className="mt-4 text-sm text-white/55 max-w-xs">
              The intelligent operating system for the world&apos;s smartest buildings.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="social link"
                >
                  <Icon size={14} className="text-white/70" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="font-mono-ui text-[10px] text-white/40 mb-4">{c.title.toUpperCase()}</div>
              <ul className="space-y-2.5">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors" data-testid={`footer-${c.title.toLowerCase()}-${i.toLowerCase().replace(/\s/g, "-")}`}>{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-white/50">© {new Date().getFullYear()} BMS. All rights reserved.</div>
          <div className="font-mono-ui text-[10px] text-white/40">SOC 2 · ISO 27001 · GDPR · HIPAA READY</div>
        </div>
      </div>
    </footer>
  );
}
