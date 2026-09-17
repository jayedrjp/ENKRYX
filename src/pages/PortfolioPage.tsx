import { useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import PortfolioCard from "../components/PortfolioCard";

type Project = {
  title: string;
  description: string;
  liveUrl: string;
  image: string;
  tags: string[];
};

const ALL_PROJECTS: Project[] = [
  {
    title: "Sinogems BD",
    description: "A modern e-commerce platform developed for selling electronic accessories across Bangladesh. Includes product categorization, promotional campaigns, cart system, secure checkout flow, and order management features.",
    liveUrl: "https://sinogemsbd.com",
    image: "/projects/s.webp",
    tags: ["E-commerce", "Web Dev"],
  },
  {
    title: "ToffeeToons Academy",
    description: "A digital education platform created for a 2D animation academy. Features course promotion, student enrollment system, authentication, and structured content pages.",
    liveUrl: "https://toffeetoonsacademy.com",
    image: "/projects/to.webp",
    tags: ["EdTech", "Web Dev"],
  },
  {
    title: "Ticket Management System",
    description: "A web based system to manage support tickets, assign tasks and track resolution progress. Built for teams to organize client requests and internal workflow efficiently.",
    liveUrl: "https://ticket-management-system-dusky.vercel.app/",
    image: "/projects/ticket.webp",
    tags: ["SaaS", "Software"],
  },
  {
    title: "Nachtgrund",
    description: "A high-end fashion e-commerce website built for a German streetwear brand. Includes product collections, subscription integration, modern UI styling, and international shopping capability.",
    liveUrl: "https://www.nachtgrund.com/",
    image: "/projects/n.webp",
    tags: ["E-commerce", "UI/UX"],
  },
  {
    title: "Legend Sports Pro",
    description: "An advanced e-commerce platform for sports equipment and custom gloves. Includes product showcase sections, brand navigation, promotional banners, and custom configuration options.",
    liveUrl: "https://legendsportspro.com/",
    image: "/projects/le.webp",
    tags: ["E-commerce", "Web Dev"],
  },
  {
    title: "Think Socialism Network",
    description: "A structured community platform designed to connect members globally. Features login system, content pages, membership interaction, and scalable navigation architecture.",
    liveUrl: "https://thinksocialism.net/",
    image: "/projects/th.webp",
    tags: ["Community", "Web Dev"],
  },
  {
    title: "Gentle Journey Home Care LLC",
    description: "A professional healthcare service website designed to build trust and credibility. Highlights services, contact accessibility, and brand identity while maintaining a clean and approachable interface.",
    liveUrl: "https://gentlejourneyhcllc.com/",
    image: "/projects/ge.webp",
    tags: ["Healthcare", "Web Dev"],
  },
  {
    title: "EcomStack",
    description: "Full stack e-commerce solution including product management, cart system, order handling and admin dashboard. Designed for scalable online business operations.",
    liveUrl: "https://ecom-stack-five.vercel.app/",
    image: "/projects/ecomstack.webp",
    tags: ["E-commerce", "SaaS"],
  },
  {
    title: "Restaurant Management System",
    description: "Handles menu control, orders, billing and daily records through a centralized dashboard to simplify restaurant workflow.",
    liveUrl: "#",
    image: "/projects/restaurant.webp",
    tags: ["Software", "Coming Soon"],
  },
  {
    title: "PawMart",
    description: "A responsive e-commerce platform built for selling premium pet products. Includes product listings, shopping cart system, user authentication, and promotional hero sections.",
    liveUrl: "https://eloquent-gnome-9281de.netlify.app/",
    image: "/projects/p.webp",
    tags: ["E-commerce", "Web Dev"],
  },
  {
    title: "BloodDonate",
    description: "A web platform designed to connect blood donors with recipients. Features donor registration, blood request system, authentication, and awareness content sections.",
    liveUrl: "https://unique-bublanina-9b3ac2.netlify.app/",
    image: "/projects/b.webp",
    tags: ["Community", "Web Dev"],
  },
];

export default function PortfolioPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title={<>All <span className="text-[#006e87]">Projects</span></>}
            description="Every project is built with the same care — clean code, clear communication, and results that matter."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_PROJECTS.map((p) => (
              <div key={p.title} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="relative overflow-hidden" style={{ height: "190px" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-wide uppercase bg-white/90 text-[#006E87] px-2 py-0.5 rounded-full border border-[#DCE6EB]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-[#071827] mb-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-[#5F7285] leading-relaxed mb-5 flex-1">{p.description}</p>
                  {p.liveUrl && p.liveUrl !== "#" && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-[#006E87] hover:text-[#005A70] transition-colors duration-200">
                      View Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}