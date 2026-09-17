import { Facebook, Linkedin, Github, Globe } from "lucide-react";

interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: SocialLinks;
}

export default function TeamCard({ name, role, bio, image, socials }: TeamCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 pt-10">
      {/* Avatar */}
      <div className="flex flex-col items-center px-8 pb-8">
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-[#006E87] shadow-xl transition-transform duration-500 group-hover:scale-105">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-[#071827]">{name}</h3>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006E87] mt-2">
            {role}
          </p>
          <p className="mt-4 text-sm text-[#5F7285] italic leading-relaxed line-clamp-2">
            "{bio}"
          </p>
        </div>
      </div>

      {/* Social links footer */}
      <div className="mt-auto bg-[#006E87]/10 border-t border-white/20 p-4 flex justify-center gap-5">
        {socials.facebook && (
          <a
            href={socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#006E87] transition-all hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
        )}
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#006E87] transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#006E87] transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        )}
        {socials.website && (
          <a
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#006E87] transition-all hover:scale-110"
            aria-label="Website"
          >
            <Globe size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
