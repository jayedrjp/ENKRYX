import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  initials: string;
}

export default function TestimonialCard({ quote, name, company, initials }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl bg-card p-8 flex-shrink-0 w-full border border-border">
      <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="#006E87" color="#006E87" />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-6 text-heading">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-azure">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-heading">{name}</p>
          <p className="text-xs text-muted">{company}</p>
        </div>
      </div>
    </div>
  );
}
