import React from "react";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group rounded-card bg-card p-8 border border-border shadow-[0_2px_10px_rgba(7,24,39,0.03)] transition-transform duration-250 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-grid">
        {React.cloneElement(icon, { size: 22, color: "#006E87" })}
      </div>
      <h3 className="text-lg font-bold mb-2 text-heading">{title}</h3>
      <p className="text-sm leading-relaxed mb-6 text-muted">{description}</p>
      <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure">
        Learn More
        <ArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
      </a>
    </div>
  );
}
