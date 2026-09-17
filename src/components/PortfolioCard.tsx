interface PortfolioCardProps {
  title: string;
  description: string;
  liveUrl?: string;
  image: string;
}

export default function PortfolioCard({ title, description, liveUrl, image }: PortfolioCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Screenshot image */}
      <div className="relative overflow-hidden" style={{ height: "190px" }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-extrabold uppercase tracking-wide text-[#071827] mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-[#5F7285] leading-relaxed mb-5 flex-1">
          {description}
        </p>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-[#006E87] hover:text-[#005A70] transition-colors duration-200"
          >
            View Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}
