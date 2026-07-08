import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BMSLogo from "../BMSLogo";
import { useDemoDialog } from "../../pages/BMSLanding";

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Security", href: "#security" },
  { label: "Integrations", href: "#integrations" },
];

export default function Navbar() {
  const { open } = useDemoDialog();
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-24px))]"
      data-testid="site-navbar"
    >
      <nav className="glass-strong rounded-full pl-3 pr-3 py-2 flex items-center justify-between gradient-border">
        <a href="#top" className="flex items-center pl-2" data-testid="brand-logo">
          <BMSLogo size={30} />
        </a>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            data-testid="nav-open-dashboard"
            className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            Live Dashboard
          </Link>
          <button
            onClick={() => open("sales")}
            data-testid="nav-contact-sales"
            className="hidden md:inline-flex px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            Contact Sales
          </button>
          <button
            onClick={() => open("demo")}
            data-testid="nav-request-demo"
            className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#2DD4BF] to-[#22c1a0] text-[#06080D] hover:brightness-110 transition"
          >
            Request Demo
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
