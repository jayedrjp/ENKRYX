import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Handshake, BookOpen } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import FinalCTA from "../components/FinalCTA";

const PROGRAMS = [
  {
    icon: <GraduationCap size={28} strokeWidth={1.5} color="#006E87" />,
    title: "Internship Program",
    tagline: "Real work. Real growth.",
    description:
      "Join the ENKRYX team as an intern and work on live projects alongside our engineers and designers. You'll be mentored, challenged, and treated as a contributing member — not a shadow.",
    benefits: [
      "Work on real client projects",
      "Direct mentorship from co-founders",
      "Flexible remote-friendly schedule",
      "Performance-based conversion opportunities",
      "Reference letters & portfolio support",
    ],
  },
  {
    icon: <Handshake size={28} strokeWidth={1.5} color="#006E87" />,
    title: "Collaboration Program",
    tagline: "Agencies & Freelancers welcome.",
    description:
      "Are you an agency or independent developer looking for a reliable technical partner? We collaborate on white-label projects, overflow work, and co-built products with full transparency.",
    benefits: [
      "White-label development",
      "Revenue sharing models available",
      "Clear SLAs & communication",
      "Access to our full-stack team",
      "NDA protected by default",
    ],
  },
  {
    icon: <BookOpen size={28} strokeWidth={1.5} color="#006E87" />,
    title: "Training Program",
    tagline: "Sharpen your team's skills.",
    description:
      "We run focused, practical training sessions for development teams — covering modern web technologies, UI/UX fundamentals, and software delivery practices.",
    benefits: [
      "Custom curriculum design",
      "Hands-on project-based learning",
      "Group or 1-on-1 sessions",
      "React, Node, UI/UX, and more",
      "Post-training support included",
    ],
  },
];

function ProgramCard({ icon, title, tagline, description, benefits }: typeof PROGRAMS[0]) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-white border border-[#DCEAF0] shadow-[0_12px_40px_rgba(0,80,110,0.07)] transition-all duration-500 hover:border-[#007A9E]/30 hover:shadow-[0_18px_50px_rgba(0,80,110,0.12)] hover:-translate-y-1 flex flex-col">
      <div className="p-8 lg:p-10 flex-1">
        <div className="flex items-start gap-5 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-[16px] bg-[#EAF6FA] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#071827]">{title}</h3>
            <p className="text-sm text-[#006E87] font-medium mt-0.5">{tagline}</p>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-[#5F7285] mb-6">{description}</p>
        <ul className="space-y-2 mb-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-[#071827]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006E87] flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-8 pb-8 lg:px-10">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[#006E87] text-[#006E87] hover:bg-[#006E87] hover:text-white transition-colors duration-250">
          Apply Now →
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#006E87] to-[#21E6C1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export default function ProgramsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <section className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title={<>Our <span className="text-[#006e87]">Programs</span></>}
            description="Whether you're starting your career, running an agency, or scaling a team — there's a program designed for you."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {PROGRAMS.map((p) => <ProgramCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
