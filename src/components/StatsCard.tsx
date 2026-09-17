import React, { Fragment } from "react";
import { Layers, Star, Zap } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: <Layers size={16} color="#006E87" />, value: "50+", label: "Projects Delivered" },
  { icon: <Star size={16} color="#006E87" />, value: "99%", label: "Client Satisfaction" },
  { icon: <Zap size={16} color="#006E87" />, value: "Fast", label: "On-Time Delivery" },
];

export default function StatsCard() {
  return (
    <div className="inline-flex items-stretch rounded-2xl bg-card px-6 py-4 gap-6 shadow-[0_8px_30px_rgba(7,24,39,0.06)] border border-border">
      {STATS.map((s, i) => (
        <Fragment key={s.label}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-grid">{s.icon}</div>
            <div>
              <div className="text-sm font-bold text-heading">{s.value}</div>
              <div className="text-[11px] text-muted">{s.label}</div>
            </div>
          </div>
          {i < STATS.length - 1 && <div className="w-px bg-border" />}
        </Fragment>
      ))}
    </div>
  );
}
