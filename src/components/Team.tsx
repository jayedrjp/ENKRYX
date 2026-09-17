import TeamCard from "./TeamCard";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Abdullah Al Noman Khan",
    role: "Co-Founder, Product & Engineering",
    bio: "Focused on system structure, architecture, and practical solutions. Works on turning ideas into stable and scalable products.",
    image: "/team/noman.webp",
    socials: {
      facebook: "https://www.facebook.com/md.noman.blz/",
      linkedin: "https://www.linkedin.com/in/noman1922",
      github: "https://github.com/noman1922",
      website: "https://noman1922.github.io/Portfolio",
    },
  },
  {
    name: "Md Junaid Hossain",
    role: "Co-Founder, Application Engineering",
    bio: "Builds application features and handles implementation across modern web technologies. Focused on clean and reliable execution.",
    image: "/team/junaid.webp",
    socials: {
      facebook: "https://www.facebook.com/junaid.hossain.33821",
      linkedin: "https://www.linkedin.com/in/md-junaid-hossain-dev/",
      github: "https://github.com/Junaid8217",
      website: "https://luminous-gecko-ece699.netlify.app/",
    },
  },
  {
    name: "Raisul Islam Rifat",
    role: "Co-Founder, Design & Research",
    bio: "Works on understanding user needs and shaping product experience through thoughtful design and research driven decisions.",
    image: "/team/raisul.webp",
    socials: {
      facebook: "https://www.facebook.com/raisulislam.rifat.792",
      linkedin: "https://www.linkedin.com/in/raisul-islam-rifat-6075b3292/",
      github: "https://github.com/Rasiul",
      website: "https://github.com/Rasiul",
    },
  },
  {
    name: "Md Marajus Salehin Anim",
    role: "Project Manager",
    bio: "Focused on structured execution, system planning, and practical implementation.",
    image: "/team/anim.webp",
    socials: {
      facebook: "https://www.facebook.com/maraj.net",
      linkedin: "https://www.linkedin.com/in/marajanim/",
      github: "https://github.com/marajanim",
      website: "https://www.maraj.net/",
    },
  },
];

export default function Team({ hideCTA = false }: { hideCTA?: boolean }) {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          title={
            <>
              MEET THE <span className="text-[#006e87] italic">TEAM</span>
            </>
          }
          description="Expert minds dedicated to building your vision."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        {!hideCTA && (
          <div className="mt-16 text-center">
            <Link
              to="/team"
              className="text-sm font-bold uppercase tracking-widest text-[#006E87] hover:underline inline-flex items-center gap-2"
            >
              Meet the full team →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
