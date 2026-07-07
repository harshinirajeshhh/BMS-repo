import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Bell, Building2, Filter, ChevronDown, Camera, Plus, Users, Wifi, WifiOff,
  CircleDot, Video, ShieldAlert, TrendingUp, TrendingDown, ArrowRight, Sparkles,
  Send, X, Lock, KeyRound, MoreHorizontal, FileText, Clock, MapPin, User, ScrollText,
  CheckCircle2, AlertTriangle, ArrowUpRight, Eye, ChevronRight, Loader2, ShieldCheck,
  Zap, PieChart as PieIcon, Play, Radio, Layers, ClipboardList, Wrench,
  LayoutGrid, Activity, History, BellRing, Settings, FileBarChart, PanelLeftClose, PanelLeft,
  MessageSquare, Check as CheckIcon, Paperclip,
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";

/* ------------------------------ Reusable pieces ----------------------------- */
const Chip = ({ label, value, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] hover:border-white/12 transition text-xs"
    data-testid={`filter-${label.toLowerCase().replace(/\s/g, "-")}`}
  >
    <span className="font-mono-ui text-[9px] text-white/45">{label.toUpperCase()}</span>
    <span className="text-white/85">{value}</span>
    <ChevronDown size={12} className="text-white/40" />
  </button>
);

const SeverityBadge = ({ level }) => {
  const map = {
    Critical: { c: "#f43f5e", bg: "rgba(244,63,94,0.12)" },
    High: { c: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    Medium: { c: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
    Low: { c: "#2DD4BF", bg: "rgba(45,212,191,0.12)" },
  };
  const s = map[level] || map.Low;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ color: s.c, background: s.bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
      {level}
    </span>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    Open: "text-[#f59e0b] bg-[#f59e0b]/10",
    Investigating: "text-[#7dd3fc] bg-[#7dd3fc]/10",
    Resolved: "text-[#2DD4BF] bg-[#2DD4BF]/10",
    Critical: "text-[#f43f5e] bg-[#f43f5e]/10",
  };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${map[status] || "text-white/60 bg-white/5"}`}>{status}</span>;
};

/* ---------------------------------- Data ---------------------------------- */
const KPIS = [
  { key: "critical", label: "Critical Incidents", value: 7, delta: "+2 vs yesterday", trend: "up", accent: "#f43f5e",
    sub: "Active incidents needing action", chart: [4,6,5,8,7,9,7] },
  { key: "open", label: "Open Investigations", value: 23, delta: "Avg. resolve 2h 14m", trend: "down", accent: "#7dd3fc",
    sub: "Cases across all sites", chart: [12,18,20,22,25,24,23] },
  { key: "violations", label: "Today's Violations", value: 148, delta: "98.4% detection accuracy", trend: "up", accent: "#2DD4BF",
    sub: "Detected by AI in last 24h", chart: [22,44,58,70,92,124,148] },
];

const CAMERAS = [
  { id: "CAM-04", zone: "Lobby · North Tower", alert: "Unauthorized Access", severity: "Critical", ai: "Face Recognition", live: true, count: 3,
    img: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=800&q=60" },
  { id: "CAM-09", zone: "Server Room · L3", alert: "Face Recognition Alert", severity: "High", ai: "Face Match", live: true, count: 2,
    img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=60" },
  { id: "CAM-11", zone: "Parking · P1", alert: "Motion Detection", severity: "Medium", ai: "Motion", live: true, count: 1,
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=60" },
  { id: "CAM-15", zone: "Rear Exit · Tower B", alert: "Camera Obstructed", severity: "High", ai: "Tamper", live: false, count: 1,
    img: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=800&q=60" },
];

const INCIDENTS = [
  { id: "INC-2841", time: "14:22", inc: "Unauthorized Access", cam: "CAM-04", zone: "Lobby · North Tower", sev: "Critical", to: "S. Alvarez", status: "Open" },
  { id: "INC-2840", time: "13:58", inc: "Face Recognition Alert", cam: "CAM-09", zone: "Server Room · L3", sev: "High", to: "M. Chen", status: "Investigating" },
  { id: "INC-2839", time: "13:41", inc: "Tailgating Detected", cam: "CAM-02", zone: "East Gate", sev: "High", to: "R. Ohta", status: "Investigating" },
  { id: "INC-2838", time: "12:17", inc: "Motion in Restricted Area", cam: "CAM-11", zone: "Parking · P1", sev: "Medium", to: "K. Patel", status: "Open" },
  { id: "INC-2837", time: "11:05", inc: "Camera Obstructed", cam: "CAM-15", zone: "Rear Exit · Tower B", sev: "High", to: "L. Bianchi", status: "Investigating" },
  { id: "INC-2836", time: "10:31", inc: "Loitering", cam: "CAM-06", zone: "Executive Floor", sev: "Low", to: "S. Alvarez", status: "Resolved" },
  { id: "INC-2835", time: "09:47", inc: "PPE Violation", cam: "CAM-22", zone: "Loading Bay", sev: "Medium", to: "R. Ohta", status: "Resolved" },
];

const TREND = Array.from({ length: 7 }).map((_, i) => ({
  d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  v: [88, 102, 96, 138, 121, 74, 148][i],
}));

const ZONES = [
  { z: "Lobby · North Tower", v: 42 },
  { z: "Parking · P1", v: 31 },
  { z: "Server Room · L3", v: 22 },
  { z: "East Gate", v: 18 },
  { z: "Loading Bay", v: 15 },
  { z: "Executive Floor", v: 9 },
];

const ACTIVITY = [
  { t: "14:22", cam: "CAM-04", e: "Unauthorized Access", z: "Lobby · N. Tower", sev: "Critical" },
  { t: "14:16", cam: "CAM-02", e: "Tailgating detected", z: "East Gate", sev: "High" },
  { t: "14:03", cam: "CAM-11", e: "Motion in restricted zone", z: "Parking · P1", sev: "Medium" },
  { t: "13:58", cam: "CAM-09", e: "Face Recognition match", z: "Server Room · L3", sev: "High" },
  { t: "13:44", cam: "CAM-22", e: "PPE Violation cleared", z: "Loading Bay", sev: "Low" },
  { t: "13:31", cam: "CAM-15", e: "Camera obstructed", z: "Rear Exit · Tower B", sev: "High" },
];

const NOTIFS = [
  { icon: ShieldAlert, cat: "Critical Alert", title: "Unauthorized access · Lobby", t: "2 min ago", color: "#f43f5e" },
  { icon: WifiOff, cat: "Camera Offline", title: "CAM-19 lost connection", t: "9 min ago", color: "#f59e0b" },
  { icon: Sparkles, cat: "AI Detection", title: "3 new violations classified", t: "14 min ago", color: "#7dd3fc" },
  { icon: Wrench, cat: "Maintenance", title: "Scheduled reboot · NVR-A", t: "1 h ago", color: "#a78bfa" },
  { icon: ShieldCheck, cat: "System", title: "Firmware patch applied", t: "3 h ago", color: "#2DD4BF" },
];

const AI_SUGGESTIONS = [
  "Summarize today's incidents",
  "Cameras needing attention",
  "Explain latest violation",
  "Generate shift report",
  "High-risk zones",
];

/* ------------------------------ Sub components ----------------------------- */
function TopBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06080D]/80 border-b border-white/8">
      <div className="max-w-[1500px] mx-auto px-6 h-14 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5" data-testid="dashboard-brand">
          <span className="w-8 h-8 rounded-xl bg-[#0b1220] border border-white/10 flex items-center justify-center">
            <Building2 size={14} className="text-[#2DD4BF]" />
          </span>
          <span className="font-display text-base font-semibold">BMS</span>
          <span className="font-mono-ui text-[10px] text-white/40 hidden md:inline">· SOC · OVERVIEW</span>
        </Link>
        <div className="flex-1 max-w-xl mx-auto relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            data-testid="global-search"
            placeholder="Search incidents, cameras, zones or ask AI…"
            className="w-full pl-9 pr-16 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#2DD4BF]/60 focus:ring-2 focus:ring-[#2DD4BF]/15 transition"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono-ui text-white/40">⌘K</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button data-testid="notifications-btn" className="relative w-9 h-9 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center hover:bg-white/[0.06] transition">
            <Bell size={14} className="text-white/80" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f43f5e] text-[9px] font-mono-ui text-white flex items-center justify-center">5</span>
          </button>
          <div className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-xl bg-white/[0.03] border border-white/8">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6]" />
            <span className="text-xs text-white/80 hidden sm:inline">Alex · Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function FilterBar() {
  const filters = [
    ["Site", "All Sites"], ["Building", "Tower A + B"], ["Floor", "All Floors"],
    ["Camera Status", "Online"], ["Severity", "All"], ["Time Range", "Today"], ["AI Detection", "All types"],
  ];
  return (
    <div className="flex items-center gap-2 flex-wrap" data-testid="filter-bar">
      <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/25 text-[11px] font-mono-ui text-[#2DD4BF]">
        <Filter size={12} /> FILTERS
      </span>
      {filters.map(([l, v]) => <Chip key={l} label={l} value={v} />)}
      <button className="ml-auto text-xs text-white/45 hover:text-white/80 transition">Reset</button>
    </div>
  );
}

function Spark({ data, color }) {
  const d = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={d} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`sk-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sk-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function KPIHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="kpi-hero">
      {KPIS.map((k, i) => (
        <motion.div
          key={k.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="relative glass rounded-[16px] p-6 overflow-hidden hover:border-white/15 transition"
          data-testid={`kpi-${k.key}`}
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15" style={{ background: k.accent }} />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="font-mono-ui text-[10px] text-white/50">{k.label.toUpperCase()}</div>
              <div className="mt-3 font-display text-5xl font-semibold tracking-tight" style={{ color: k.accent }}>{k.value}</div>
              <div className="mt-2 text-xs text-white/55">{k.sub}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono-ui" style={{ color: k.accent }}>
                {k.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {k.delta}
              </div>
            </div>
            <div className="w-24 h-16">
              <Spark data={k.chart} color={k.accent} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CameraManagement() {
  const actions = [
    { icon: Plus, label: "Add Camera", testid: "cam-add" },
    { icon: Layers, label: "Manage Cameras", testid: "cam-manage" },
  ];
  const stats = [
    { l: "Total", v: 248, c: "#fff" }, { l: "Online", v: 231, c: "#2DD4BF" },
    { l: "Offline", v: 6, c: "#f43f5e" }, { l: "Recording", v: 217, c: "#7dd3fc" },
  ];
  return (
    <div className="glass rounded-[16px] p-5" data-testid="camera-management">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center"><Camera size={14} className="text-[#2DD4BF]" /></span>
          <div>
            <div className="font-display text-sm font-semibold">Camera Management</div>
            <div className="font-mono-ui text-[9px] text-white/40">248 CAMERAS · 4 SITES</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {actions.map((a) => (
          <button key={a.label} data-testid={a.testid} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.07] hover:border-[#2DD4BF]/30 transition text-xs text-white/85 text-left">
            <a.icon size={13} className="text-[#2DD4BF]" />
            {a.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/8">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-xl font-semibold" style={{ color: s.c }}>{s.v}</div>
            <div className="font-mono-ui text-[9px] text-white/45 mt-0.5">{s.l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveCameras() {
  return (
    <div data-testid="live-cameras">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-display text-base font-semibold">Cameras Needing Attention</div>
          <div className="font-mono-ui text-[10px] text-white/45">4 FLAGGED · QUICK GLANCE</div>
        </div>
        <button className="text-xs text-[#2DD4BF] hover:text-white transition inline-flex items-center gap-1" data-testid="view-all-cameras">
          Live Monitoring <ArrowRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
        {CAMERAS.map((c) => (
          <motion.div key={c.id} whileHover={{ y: -2 }}
            className="group glass rounded-[14px] overflow-hidden hover:border-[#2DD4BF]/40 transition cursor-pointer flex flex-col"
            data-testid={`camera-card-${c.id.toLowerCase()}`}>
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={c.img} alt={c.id} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                {c.live ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#f43f5e]/25 border border-[#f43f5e]/50 text-[9px] font-mono-ui text-[#f43f5e]">
                    <span className="w-1 h-1 rounded-full bg-[#f43f5e] pulse-dot" /> LIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/10 text-[9px] font-mono-ui text-white/70">OFFLINE</span>
                )}
                <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-mono-ui text-white/90">{c.id}</span>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col gap-1.5">
              <div className="text-[12px] font-medium text-white leading-tight">{c.alert}</div>
              <div className="text-[10px] text-white/50 flex items-center gap-1"><MapPin size={9} /> {c.zone}</div>
              <div className="flex items-center justify-between mt-1">
                <SeverityBadge level={c.severity} />
                <span className="text-[10px] text-white/55">{c.count} alert{c.count !== 1 ? "s" : ""}</span>
              </div>
              <button className="mt-1 text-[11px] text-[#2DD4BF] inline-flex items-center gap-1 hover:text-white transition self-start" data-testid={`view-live-${c.id.toLowerCase()}`}>
                <Play size={10} /> View Live →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AIAssistantHidden() { return null; }


function AskAILauncher({ onOpen }) {
  return (
    <button onClick={onOpen} data-testid="ask-ai-button" className="w-full glass-strong gradient-border rounded-[16px] p-5 flex items-center gap-4 hover:bg-white/[0.05] transition group text-left">
      <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center shrink-0">
        <Sparkles size={20} className="text-[#06080D]" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-display text-sm font-semibold flex items-center gap-2">Ask AI Security Assistant <span className="font-mono-ui text-[9px] text-[#2DD4BF]">● ONLINE</span></div>
        <div className="text-xs text-white/55 mt-0.5 truncate">Summaries, shift reports, incident context — Claude 4.5</div>
      </div>
      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono-ui text-white/70 group-hover:bg-white/10 transition">Open<ArrowUpRight size={10} /></span>
    </button>
  );
}

function AIAssistantPanel({ open, onClose }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Good afternoon Alex. 7 critical incidents today — Lobby · North Tower needs immediate review. Want a shift briefing?" },
  ]);
  const send = (text) => {
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "ai", text: `Analyzing "${text}"… I found 3 relevant patterns across CAM-04, CAM-09 and CAM-11.` }]);
    setPrompt("");
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease: [0.2, 0.7, 0.3, 1], duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0d14] border-l border-white/10 z-50 flex flex-col" data-testid="ai-panel">
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center"><Sparkles size={14} className="text-[#06080D]" /></span>
                <div>
                  <div className="font-display text-sm font-semibold">AI Security Assistant</div>
                  <div className="font-mono-ui text-[9px] text-[#2DD4BF]">● CLAUDE 4.5</div>
                </div>
              </div>
              <button onClick={onClose} data-testid="ai-panel-close" className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"><X size={14} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.role === "user" ? "bg-[#2DD4BF] text-[#06080D]" : "bg-white/[0.04] border border-white/8 text-white/85"}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-3 flex flex-wrap gap-1.5">
              {AI_SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/8 text-[10px] text-white/70 hover:bg-white/[0.07] hover:text-white transition">{s}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(prompt); }} className="px-6 pb-6 relative">
              <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything…" data-testid="ai-panel-input" className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-sm focus:outline-none focus:border-[#2DD4BF]/50" />
              <button type="submit" className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#2DD4BF] text-[#06080D] flex items-center justify-center"><Send size={12} /></button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Sidebar({ collapsed, setCollapsed }) {
  const items = [
    { icon: LayoutGrid, label: "Overview", active: true, testid: "sidebar-overview" },
    { icon: Video, label: "Live Monitoring", testid: "sidebar-live" },
    { icon: History, label: "Violation History", testid: "sidebar-violations" },
    { icon: BellRing, label: "Camera Alerts", testid: "sidebar-alerts" },
    { icon: Camera, label: "Camera Management", testid: "sidebar-cameras" },
    { icon: Users, label: "User Management", testid: "sidebar-users" },
    { icon: FileBarChart, label: "Reports", testid: "sidebar-reports" },
    { icon: Settings, label: "Settings", testid: "sidebar-settings" },
  ];
  return (
    <aside className={`fixed left-0 top-14 bottom-0 z-30 border-r border-white/8 bg-[#07090F]/95 backdrop-blur-xl transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`} data-testid="sidebar">
      <div className="p-3 flex flex-col h-full">
        <button onClick={() => setCollapsed(!collapsed)} data-testid="sidebar-toggle" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] flex items-center justify-center mb-3 self-end">
          {collapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
        </button>
        <nav className="flex-1 space-y-1">
          {items.map((it) => (
            <button key={it.label} data-testid={it.testid}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition group relative ${it.active ? "bg-[#2DD4BF]/10 text-white" : "text-white/60 hover:text-white hover:bg-white/[0.04]"}`}>
              {it.active && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-[#2DD4BF]" />}
              <it.icon size={16} className={it.active ? "text-[#2DD4BF]" : "text-white/50 group-hover:text-white/80"} />
              {!collapsed && <span className="truncate">{it.label}</span>}
            </button>
          ))}
        </nav>
        {!collapsed && (
          <div className="glass rounded-xl p-3 text-[10px] text-white/45 font-mono-ui">
            <div className="text-[#2DD4BF]">● SYSTEM HEALTHY</div>
            <div className="mt-1">248 CAMS · 4 SITES</div>
          </div>
        )}
      </div>
    </aside>
  );
}

function NewIncidentDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease: [0.2, 0.7, 0.3, 1], duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0a0d14] border-l border-white/10 z-50 overflow-y-auto" data-testid="new-incident-drawer">
            <div className="sticky top-0 z-10 bg-[#0a0d14]/95 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-white/8">
              <div>
                <div className="font-mono-ui text-[10px] text-white/40">NEW INCIDENT</div>
                <div className="font-display text-lg font-semibold mt-0.5">Create incident report</div>
              </div>
              <button onClick={onClose} data-testid="new-incident-close" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                ["Camera", ["CAM-04", "CAM-09", "CAM-11", "CAM-15"]],
                ["Building", ["Tower A", "Tower B"]],
                ["Floor", ["L1", "L2", "L3"]],
                ["Zone", ["Lobby", "Server Room", "Parking"]],
                ["Incident Type", ["Unauthorized Access", "Motion", "Tailgating", "PPE Violation"]],
                ["Severity", ["Critical", "High", "Medium", "Low"]],
                ["Assigned To", ["S. Alvarez", "M. Chen", "R. Ohta"]],
                ["Priority", ["P0", "P1", "P2"]],
              ].map(([label, opts]) => (
                <label key={label} className="block">
                  <span className="font-mono-ui text-[10px] text-white/45">{label.toUpperCase()}</span>
                  <select data-testid={`ni-${label.toLowerCase().replace(/\s/g,"-")}`} className="mt-1.5 w-full bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#2DD4BF]/50">
                    <option value="">Select {label}…</option>
                    {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              ))}
              <label className="block">
                <span className="font-mono-ui text-[10px] text-white/45">DUE DATE</span>
                <input type="date" data-testid="ni-due" className="mt-1.5 w-full bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#2DD4BF]/50" />
              </label>
              <label className="block">
                <span className="font-mono-ui text-[10px] text-white/45">DESCRIPTION</span>
                <textarea rows={3} data-testid="ni-description" className="mt-1.5 w-full bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#2DD4BF]/50" placeholder="Describe what happened…" />
              </label>
              <label className="block">
                <span className="font-mono-ui text-[10px] text-white/45">NOTES</span>
                <textarea rows={2} data-testid="ni-notes" className="mt-1.5 w-full bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#2DD4BF]/50" />
              </label>
              <button data-testid="ni-attach" className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] border border-dashed border-white/15 text-sm text-white/70 hover:bg-white/[0.05] transition">
                <Paperclip size={12} /> Attach evidence
              </button>
              <div className="flex items-center gap-2 pt-2">
                <button onClick={onClose} data-testid="ni-cancel" className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
                <button data-testid="ni-draft" className="flex-1 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-sm">Save Draft</button>
                <button onClick={() => { toast.success("Incident created"); onClose(); }} data-testid="ni-create" className="flex-1 py-3 rounded-xl bg-[#2DD4BF] text-[#06080D] font-medium hover:brightness-110 text-sm">Create Incident</button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function IncidentsTable({ onOpen }) {
  const [tab, setTab] = useState("All");
  const counts = {
    All: INCIDENTS.length,
    Open: INCIDENTS.filter(i => i.status === "Open").length,
    Investigating: INCIDENTS.filter(i => i.status === "Investigating").length,
    Resolved: INCIDENTS.filter(i => i.status === "Resolved").length,
    Critical: INCIDENTS.filter(i => i.sev === "Critical").length,
  };
  const rows = useMemo(() => {
    if (tab === "All") return INCIDENTS;
    if (tab === "Critical") return INCIDENTS.filter(i => i.sev === "Critical");
    return INCIDENTS.filter(i => i.status === tab);
  }, [tab]);

  return (
    <div className="glass rounded-[16px] overflow-hidden" data-testid="incidents-table">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div>
          <div className="font-display text-sm font-semibold">Recent Incidents</div>
          <div className="font-mono-ui text-[9px] text-white/40">LAST 24 HOURS</div>
        </div>
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/8 rounded-xl p-1">
          {Object.keys(counts).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              data-testid={`incidents-tab-${t.toLowerCase()}`}
              className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 ${tab === t ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85"}`}
            >
              {t}
              <span className="text-[10px] font-mono-ui text-white/40">{counts[t]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-mono-ui text-white/40 border-b border-white/6">
              {["TIME","INCIDENT","CAMERA","ZONE","SEVERITY","ASSIGNED TO","STATUS",""].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                onClick={() => onOpen(r)}
                data-testid={`incident-row-${r.id.toLowerCase()}`}
                className="border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition"
              >
                <td className="px-5 py-3.5 font-mono-ui text-[11px] text-white/60">{r.time}</td>
                <td className="px-5 py-3.5 text-white/90">{r.inc}</td>
                <td className="px-5 py-3.5 font-mono-ui text-[11px] text-[#7dd3fc]">{r.cam}</td>
                <td className="px-5 py-3.5 text-white/60 text-xs">{r.zone}</td>
                <td className="px-5 py-3.5"><SeverityBadge level={r.sev} /></td>
                <td className="px-5 py-3.5 text-white/70 text-xs">{r.to}</td>
                <td className="px-5 py-3.5"><StatusPill status={r.status} /></td>
                <td className="px-5 py-3.5 text-right"><ChevronRight size={14} className="text-white/30 inline" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsSnapshot() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" data-testid="analytics-snapshot">
      <div className="glass rounded-[16px] p-5 lg:col-span-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-display text-sm font-semibold">7-Day Violation Trend</div>
            <div className="font-mono-ui text-[9px] text-white/40">TOTAL 767 · +14% WOW</div>
          </div>
          <TrendingUp size={14} className="text-[#2DD4BF]" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND}>
              <defs>
                <linearGradient id="trendG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="d" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#0b0f18", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
              <Area dataKey="v" stroke="#2DD4BF" strokeWidth={2} fill="url(#trendG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-[16px] p-5 lg:col-span-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-display text-sm font-semibold">Violations by Zone</div>
            <div className="font-mono-ui text-[9px] text-white/40">TOP 6 ZONES · TODAY</div>
          </div>
          <PieIcon size={14} className="text-[#7dd3fc]" />
        </div>
        <div className="space-y-2.5 mt-4">
          {ZONES.map((z) => (
            <div key={z.z}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white/80">{z.z}</span>
                <span className="font-mono-ui text-[10px] text-white/50">{z.v}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(z.v / 42) * 100}%`, background: "linear-gradient(90deg, #2DD4BF, #7dd3fc)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-[16px] p-5 lg:col-span-1">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-display text-sm font-semibold">Live Activity Feed</div>
            <div className="font-mono-ui text-[9px] text-[#2DD4BF]">● STREAMING</div>
          </div>
          <Radio size={14} className="text-[#2DD4BF]" />
        </div>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-1" data-testid="activity-feed">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex gap-3">
              <div className="pt-1">
                <span className="w-2 h-2 rounded-full block" style={{ background: a.sev === "Critical" ? "#f43f5e" : a.sev === "High" ? "#f59e0b" : a.sev === "Medium" ? "#3B82F6" : "#2DD4BF" }} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/85">{a.e}</div>
                <div className="text-[10px] text-white/45 font-mono-ui mt-0.5">{a.t} · {a.cam} · {a.z}</div>
              </div>
              <SeverityBadge level={a.sev} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const [read, setRead] = useState({});
  return (
    <div className="glass rounded-[16px] p-5" data-testid="notifications-panel">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-display text-sm font-semibold">Notification Center</div>
          <div className="font-mono-ui text-[9px] text-white/40">{NOTIFS.length - Object.keys(read).length} UNREAD</div>
        </div>
        <button onClick={() => setRead(Object.fromEntries(NOTIFS.map((_, i) => [i, true])))} className="text-[11px] text-white/50 hover:text-white transition" data-testid="mark-all-read">Mark all read</button>
      </div>
      <div className="space-y-2">
        {NOTIFS.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition ${read[i] ? "border-white/5 bg-white/[0.01] opacity-60" : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]"}`} data-testid={`notif-${i}`}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${n.color}18` }}>
              <n.icon size={14} style={{ color: n.color }} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono-ui text-[9px]" style={{ color: n.color }}>{n.cat.toUpperCase()}</div>
              <div className="text-xs text-white/85 truncate mt-0.5">{n.title}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{n.t}</div>
            </div>
            <div className="flex items-center gap-1">
              {!read[i] && <button onClick={() => setRead({ ...read, [i]: true })} className="text-[10px] px-2 py-1 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition">Ack</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Drawer + Resolve dialog --------------------------- */
function IncidentDrawer({ incident, onClose, onResolve }) {
  const [confirmed, setConfirmed] = useState(false);
  React.useEffect(() => { setConfirmed(false); }, [incident?.id]);
  return (
    <AnimatePresence>
      {incident && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease: [0.2, 0.7, 0.3, 1], duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0a0d14] border-l border-white/10 z-50 overflow-y-auto"
            data-testid="incident-drawer"
          >
            <div className="sticky top-0 z-10 bg-[#0a0d14]/95 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-white/8">
              <div>
                <div className="font-mono-ui text-[10px] text-white/40">{incident.id}</div>
                <div className="font-display text-lg font-semibold mt-0.5">{incident.inc}</div>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center" data-testid="drawer-close"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <SeverityBadge level={incident.sev} />
                <StatusPill status={incident.status} />
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono-ui text-white/70">{incident.cam}</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono-ui text-white/70">{incident.zone}</span>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 font-mono-ui text-[10px] text-[#a78bfa] mb-2"><Sparkles size={12} /> AI EXPLANATION</div>
                <p className="text-sm text-white/80 leading-relaxed">The system detected {incident.inc.toLowerCase()} on {incident.cam} in {incident.zone}. Correlated with 2 previous events in the last hour. Confidence: 96.4%.</p>
              </div>

              <div>
                <div className="font-mono-ui text-[10px] text-white/40 mb-2">CAMERA EVIDENCE</div>
                <img src={CAMERAS[0].img} className="w-full rounded-xl border border-white/8 aspect-video object-cover" alt="evidence" />
              </div>

              <div>
                <div className="font-mono-ui text-[10px] text-white/40 mb-3">EVENT TIMELINE</div>
                <div className="space-y-3">
                  {[
                    { t: incident.time, e: "Incident detected by AI", c: "#f43f5e" },
                    { t: "+00:22", e: "Auto-assigned to " + incident.to, c: "#7dd3fc" },
                    { t: "+01:10", e: "Officer acknowledged", c: "#a78bfa" },
                    { t: "+03:45", e: "On-site verification started", c: "#2DD4BF" },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full mt-1.5" style={{ background: s.c }} />
                      <div>
                        <div className="text-sm text-white/85">{s.e}</div>
                        <div className="font-mono-ui text-[10px] text-white/40">{s.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3"><div className="font-mono-ui text-[9px] text-white/40">ASSIGNED OFFICER</div><div className="text-sm text-white mt-1 flex items-center gap-2"><User size={12} /> {incident.to}</div></div>
                <div className="glass rounded-xl p-3"><div className="font-mono-ui text-[9px] text-white/40">AUDIT ENTRIES</div><div className="text-sm text-white mt-1 flex items-center gap-2"><ScrollText size={12} /> 4 entries</div></div>
              </div>

              <textarea placeholder="Add investigation note…" rows={2} className="w-full rounded-xl bg-white/[0.03] border border-white/8 p-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2DD4BF]/50 resize-none" data-testid="drawer-note" />

              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/8 cursor-pointer hover:bg-white/[0.04] transition" data-testid="drawer-confirm-label">
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} data-testid="drawer-confirm-checkbox" className="mt-0.5 w-4 h-4 rounded accent-[#2DD4BF]" />
                <span className="text-xs text-white/75 leading-relaxed">I confirm that I have reviewed the evidence and verified this incident.</span>
              </label>

              <button onClick={onResolve} disabled={!confirmed || incident.status === "Resolved"} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#22c1a0] text-[#06080D] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition" data-testid="drawer-resolve">
                <ShieldCheck size={14} /> {incident.status === "Resolved" ? "Already Resolved" : "Resolve Incident (Super Admin)"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ResolveDialog({ open, onClose, onDone }) {
  const [step, setStep] = useState("password"); // password | otp | notes | done
  const [pw, setPw] = useState("");
  const [otp, setOtp] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPw = (e) => {
    e.preventDefault();
    if (pw.length < 4) return toast.error("Password required");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 500);
  };
  const submitOtp = (e) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Enter 6-digit OTP");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("notes"); }, 500);
  };
  const submitNotes = (e) => {
    e.preventDefault();
    if (!notes) return toast.error("Add resolution notes");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Incident resolved & saved to audit log");
      onDone();
      setStep("password"); setPw(""); setOtp(""); setNotes("");
    }, 700);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" data-testid="resolve-dialog">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ scale: 0.95, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md glass-strong gradient-border rounded-[20px] p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#2DD4BF]/15 flex items-center justify-center"><ShieldCheck size={16} className="text-[#2DD4BF]" /></span>
              <div>
                <div className="font-display text-lg font-semibold">Resolve Incident</div>
                <div className="font-mono-ui text-[10px] text-white/45">SUPER ADMIN VERIFICATION</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              {["password","otp","notes"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <span className={`w-6 h-6 rounded-full text-[10px] font-mono-ui flex items-center justify-center ${step === s ? "bg-[#2DD4BF] text-[#06080D]" : ["password","otp","notes"].indexOf(step) > i ? "bg-[#2DD4BF]/30 text-[#2DD4BF]" : "bg-white/5 text-white/40"}`}>{i+1}</span>
                  {i < 2 && <div className="flex-1 h-px bg-white/10" />}
                </div>
              ))}
            </div>

            {step === "password" && (
              <form onSubmit={submitPw}>
                <label className="font-mono-ui text-[10px] text-white/45">CONFIRM PASSWORD</label>
                <div className="relative mt-1.5">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} data-testid="resolve-password" className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-sm focus:outline-none focus:border-[#2DD4BF]/50" />
                </div>
                <button type="submit" disabled={loading} data-testid="resolve-pw-continue" className="w-full mt-4 py-3 rounded-xl bg-[#2DD4BF] text-[#06080D] font-medium hover:brightness-110 disabled:opacity-60">{loading ? "Verifying…" : "Continue"}</button>
              </form>
            )}
            {step === "otp" && (
              <form onSubmit={submitOtp}>
                <label className="font-mono-ui text-[10px] text-white/45">6-DIGIT OTP · SENT TO AUTHENTICATOR</label>
                <div className="relative mt-1.5">
                  <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} data-testid="resolve-otp" placeholder="••••••" className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-sm tracking-[0.6em] focus:outline-none focus:border-[#2DD4BF]/50" />
                </div>
                <button type="submit" disabled={loading} data-testid="resolve-otp-continue" className="w-full mt-4 py-3 rounded-xl bg-[#2DD4BF] text-[#06080D] font-medium hover:brightness-110 disabled:opacity-60">{loading ? "Verifying…" : "Verify"}</button>
              </form>
            )}
            {step === "notes" && (
              <form onSubmit={submitNotes}>
                <label className="font-mono-ui text-[10px] text-white/45">RESOLUTION NOTES</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} data-testid="resolve-notes" className="w-full mt-1.5 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-sm resize-none focus:outline-none focus:border-[#2DD4BF]/50" placeholder="Describe how this incident was resolved…" />
                <button type="submit" disabled={loading} data-testid="resolve-finalize" className="w-full mt-4 py-3 rounded-xl bg-[#2DD4BF] text-[#06080D] font-medium hover:brightness-110 disabled:opacity-60 inline-flex items-center justify-center gap-2">
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                  Mark as Resolved & Save
                </button>
              </form>
            )}

            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center" data-testid="resolve-close"><X size={14} /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- Page --------------------------------- */
export default function OverviewDashboard() {
  const [selected, setSelected] = useState(null);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [newIncOpen, setNewIncOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080D] text-white" data-testid="overview-dashboard">
      <TopBar />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`transition-all duration-300 ${collapsed ? "pl-16" : "pl-60"}`}>
        <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="font-mono-ui text-[10px] text-[#2DD4BF]">— OVERVIEW</div>
              <h1 className="mt-1.5 font-display text-3xl md:text-4xl font-semibold tracking-tight">Security Operations Command</h1>
              <p className="mt-1 text-sm text-white/55">Live posture across 4 sites · 23 buildings · 248 cameras</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] text-xs" data-testid="export-report">
                <ClipboardList size={12} /> Export shift report
              </button>
              <button onClick={() => setNewIncOpen(true)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2DD4BF] text-[#06080D] font-medium text-xs hover:brightness-110" data-testid="new-incident">
                <Plus size={12} /> New incident
              </button>
            </div>
          </div>

          <FilterBar />
          <KPIHero />

          {/* Ask AI + Camera Management + Cameras row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 space-y-5">
              <AskAILauncher onOpen={() => setAiOpen(true)} />
              <CameraManagement />
            </div>
            <div className="lg:col-span-8"><LiveCameras /></div>
          </div>

          {/* Recent Incidents (moved above Analytics) */}
          <IncidentsTable onOpen={setSelected} />

          {/* Analytics — 3 in one row */}
          <AnalyticsSnapshot />

          {/* Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-12"><Notifications /></div>
          </div>
        </div>
      </main>

      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} onResolve={() => setResolveOpen(true)} />
      <ResolveDialog open={resolveOpen} onClose={() => setResolveOpen(false)} onDone={() => { setResolveOpen(false); setSelected(null); }} />
      <AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      <NewIncidentDrawer open={newIncOpen} onClose={() => setNewIncOpen(false)} />
    </div>
  );
}
