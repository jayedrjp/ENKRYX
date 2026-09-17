import { Code2, Layers, Smartphone, Palette, Cpu, Wrench } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const SERVICES = [
  {
    icon: <Code2 />,
    title: "Custom Software",
    description:
      "Clean, reliable systems built around exactly how your business operates — no bloated off-the-shelf tools.",
  },
  {
    icon: <Layers />,
    title: "Web Development",
    description:
      "Marketing sites to complex web apps, built with modern frameworks optimized for speed, SEO, and growth.",
  },
  {
    icon: <Smartphone />,
    title: "Mobile Apps",
    description:
      "Cross-platform iOS and Android applications built for real-world use — smooth, intuitive, built to scale.",
  },
  {
    icon: <Palette />,
    title: "UI/UX Design",
    description:
      "Design that makes your product immediately understandable — research, user journeys, and interfaces that convert.",
  },
  {
    icon: <Cpu />,
    title: "Digital Solutions",
    description:
      "We remove the manual bottlenecks in your operations with smart automations and integrations.",
  },
  {
    icon: <Wrench />,
    title: "Maintenance & Support",
    description:
      "Ongoing monitoring, updates, and security patches so your product stays fast and secure after launch.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          title={
            <>
              Everything you need to <span className="text-[#006e87] italic">SCALE</span>.
            </>
          }
          description="We don't just write code; we build the logic that powers your business."
        />
      </div>

      <ScrollStack useWindowScroll className="max-w-3xl mx-auto px-6">
        {SERVICES.map((s) => (
          <ScrollStackItem key={s.title}>
            <ServiceCard icon={s.icon} title={s.title} description={s.description} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}