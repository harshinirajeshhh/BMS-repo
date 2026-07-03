import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { api } from "../../lib/api";
import { Activity, Flame, Zap, Droplets, Building, Cpu, Users, Wind, Leaf, Thermometer, Bell } from "lucide-react";

const Dot = ({ color = "#2DD4BF" }) => (
  <span className="relative inline-flex items-center justify-center w-2 h-2">
    <span className="absolute inline-flex h-full w-full rounded-full opacity-60 pulse-dot" style={{ background: color }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
  </span>
);

const Item = ({ icon: Icon, label, value, color = "#2DD4BF" }) => (
  <div className="flex items-center gap-2 mx-6">
    <Dot color={color} />
    <Icon size={12} className="text-white/60" />
    <span className="font-mono-ui text-[10px] text-white/60">{label}</span>
    <span className="font-mono-ui text-[10px] text-white" style={{ color }}>{value}</span>
  </div>
);

export default function LiveTicker() {
  const [m, setM] = useState({
    hvac: "NOMINAL",
    fire_alarm: "HEALTHY",
    energy_saving_pct: 18.2,
    water_usage: "STABLE",
    active_buildings: 23,
    devices_connected: 999,
    occupancy_pct: 62.4,
    air_quality_index: 42,
    carbon_reduction_pct: 33.1,
    temperature_c: 22.4,
    alerts: 0,
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { data } = await api.get("/live-metrics");
        if (!cancelled) setM(data);
      } catch { /* keep defaults */ }
    };
    load();
    const t = setInterval(load, 6000);
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  return (
    <div className="fixed top-[86px] left-0 right-0 z-40 pointer-events-none" data-testid="live-ticker">
      <div className="max-w-[1180px] mx-auto px-3">
        <div className="glass rounded-full h-9 flex items-center overflow-hidden marquee-fade">
          <div className="pl-4 pr-2 h-full flex items-center gap-2 border-r border-white/10 bg-black/30">
            <Dot color="#2DD4BF" />
            <span className="font-mono-ui text-[10px] text-white/80">LIVE • BMS OPS</span>
          </div>
          <Marquee gradient={false} speed={38} className="h-full">
            <Item icon={Wind} label="HVAC" value={m.hvac} color="#2DD4BF" />
            <Item icon={Flame} label="Fire Alarm" value={m.fire_alarm} color="#00E5FF" />
            <Item icon={Zap} label="Energy Saving" value={`+${m.energy_saving_pct}%`} color="#2DD4BF" />
            <Item icon={Droplets} label="Water" value={m.water_usage} color="#3B82F6" />
            <Item icon={Building} label="Buildings" value={`${m.active_buildings} Active`} color="#8B5CF6" />
            <Item icon={Cpu} label="Devices" value={`${m.devices_connected} Online`} color="#00E5FF" />
            <Item icon={Users} label="Occupancy" value={`${m.occupancy_pct}%`} color="#2DD4BF" />
            <Item icon={Leaf} label="AQI" value={m.air_quality_index} color="#2DD4BF" />
            <Item icon={Thermometer} label="Temp" value={`${m.temperature_c}°C`} color="#3B82F6" />
            <Item icon={Activity} label="Carbon Down" value={`${m.carbon_reduction_pct}%`} color="#2DD4BF" />
            <Item icon={Bell} label="Alerts" value={m.alerts} color={m.alerts > 0 ? "#f59e0b" : "#2DD4BF"} />
          </Marquee>
        </div>
      </div>
    </div>
  );
}
