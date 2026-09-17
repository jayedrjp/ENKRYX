import PortfolioCard from "./PortfolioCard";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    title: "Sinogems BD",
    description: "E-commerce platform for electronic accessories and gadgets across Bangladesh.",
    liveUrl: "https://sinogemsbd.com",
    image: "/projects/s.webp",
  },
  {
    title: "ToffeeToons Academy",
    description: "Online animation learning and enrollment platform for a 2D animation academy.",
    liveUrl: "https://toffeetoonsacademy.com",
    image: "/projects/to.webp",
  },
  {
    title: "Ticket Management System",
    description: "Issue tracking and support request management platform for internal teams.",
    liveUrl: "https://ticket-management-system-dusky.vercel.app/",
    image: "/projects/ticket.webp",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          title={
            <>
              SELECTED <span className="text-[#006e87] italic">WORKS</span>
            </>
          }
          description="A glimpse into the systems we've built."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {PROJECTS.map((p) => (
            <PortfolioCard key={p.title} {...p} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="flex justify-center">
          <Link
            to="/portfolio"
            className="inline-block bg-[#071827] text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#006E87] transition-colors duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}