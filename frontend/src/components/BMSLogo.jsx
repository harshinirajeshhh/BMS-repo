import React from "react";

/**
 * Custom BMS logo — stylized isometric building glyph inside a rounded gradient tile,
 * paired with the wordmark. Not a generated placeholder.
 */
export default function BMSLogo({ size = 28, showWord = true, sub }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="relative flex items-center justify-center rounded-[10px]"
        style={{
          width: size, height: size,
          background: "linear-gradient(135deg, #2DD4BF 0%, #22c1a0 45%, #3B82F6 100%)",
          boxShadow: "0 6px 18px rgba(45,212,191,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none">
          {/* Isometric building base */}
          <path d="M4 18 L12 22 L20 18 L12 14 Z" fill="rgba(6,8,13,0.35)" />
          {/* Left tower face */}
          <path d="M4 8 L4 18 L12 22 L12 12 Z" fill="#06080D" fillOpacity="0.75" />
          {/* Right tower face */}
          <path d="M20 8 L20 18 L12 22 L12 12 Z" fill="#06080D" fillOpacity="0.55" />
          {/* Top ridge / roof */}
          <path d="M4 8 L12 4 L20 8 L12 12 Z" fill="#06080D" fillOpacity="0.9" />
          {/* Signal / node dot on top */}
          <circle cx="12" cy="4" r="1.2" fill="#2DD4BF" />
          {/* Windows glow */}
          <rect x="6.6" y="11.2" width="1.3" height="1.6" fill="#2DD4BF" opacity="0.85" />
          <rect x="9.2" y="12.6" width="1.3" height="1.6" fill="#2DD4BF" opacity="0.6" />
          <rect x="13.8" y="12.6" width="1.3" height="1.6" fill="#2DD4BF" opacity="0.6" />
          <rect x="16.4" y="11.2" width="1.3" height="1.6" fill="#2DD4BF" opacity="0.85" />
        </svg>
      </span>
      {showWord && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight">
            build<span className="text-[#2DD4BF]">iq</span>
          </span>
          {sub && <span className="font-mono-ui text-[8px] text-white/45 mt-0.5">{sub}</span>}
        </div>
      )}
    </div>
  );
}
