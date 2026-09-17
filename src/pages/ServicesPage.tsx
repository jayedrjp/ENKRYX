import React from "react";
import { useEffect } from "react";
import { Code2, Layers, Smartphone, Palette, Cpu, Wrench } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import FinalCTA from "../components/FinalCTA";

const SERVICES = [
  {
    icon: <Code2 />,
    title: "Custom Software",
    tagline: "Built around your workflow",
    description:
      "We design and develop software tailored exactly to how your business operates — no bloated off-the-shelf tools, no unnecessary complexity. Just clean, reliable systems that solve real problems.",
    deliverables: ["Requirements analysis", "Architecture design", "Full-stack development", "Testing & QA", "Deployment & handover"],
  },
  {
    icon: <Layers />,
    title: "Web Development",
    tagline: "Fast, scalable, engineered for growth",
    description:
      "From marketing sites to complex web applications, we build with modern frameworks optimized for speed, SEO, and long-term maintainability.",
    deliverables: ["Responsive design", "Performance optimization", "CMS integration", "API development", "Ongoing support"],
  },
  {
    icon: <Smartphone />,
    title: "Mobile Apps",
    tagline: "Native-feel on any device",
    description:
      "Cross-platform iOS and Android applications built for real-world use — smooth, intuitive, and built to scale.",
    deliverables: ["UI/UX prototyping", "React Native / Flutter", "Backend integration", "Push notifications", "App Store deployment"],
  },
  {
    icon: <Palette />,
    title: "UI/UX Design",
    tagline: "Clarity, intuition, delight",
    description:
      "Design that makes your product immediately understandable. We research your users, map journeys, and build interfaces that convert.",
    deliverables: ["User research", "Wireframing", "Prototyping", "Design system", "Usability testing"],
  },
  {
    icon: <Cpu />,
    title: "Digital Solutions",
    tagline: "Automation that removes friction",
    description:
      "We identify the manual bottlenecks in your operations and build smart automations and integrations that save time and reduce errors.",
    deliverables: ["Process analysis", "API integrations", "Workflow automation", "Data pipelines", "Reporting dashboards"],
  },
  {
    icon: <Wrench />,
    title: "Maintenance & Support",
    tagline: "Peace of mind after launch",
    description:
      "We provide ongoing monitoring, updates, security patches, and feature iterations so your product stays fast and secure long after delivery.",
    deliverables: ["Bug fixes & patches", "Security updates", "Performance monitoring", "Feature iterations", "24/7 support plans"],
  },
];

function ServiceCard({ icon, title, tagline, description, deliverables }: typeof SERVICES[0]) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-white border border-[#DCEAF0] shadow-[0_12px_40px_rgba(0,80,110,0.07)] transition-all duration-500 hover:border-[#007A9E]/30 hover:shadow-[0_18px_50px_rgba(0,80,110,0.12)] hover:-translate-y-1 flex flex-col">
      <div className="p-8 lg:p-10 flex-1">
        <div className="flex items-start gap-5 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-[16px] bg-[#EAF6FA] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            {React.cloneElement(icon, { size: 26, strokeWidth: 1.5, color: "#006E87" })}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#071827]">{title}</h3>
            <p className="text-sm text-[#006E87] font-medium mt-0.5">{tagline}</p>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-[#5F7285] mb-6">{description}</p>
        <ul className="space-y-2">
          {deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm text-[#071827]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006E87] flex-shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#006E87] to-[#21E6C1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <section className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title={<>Everything you need to <span className="text-[#006e87]">scale</span>.</>}
            description="We don't just write code — we build the logic that powers your business."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
