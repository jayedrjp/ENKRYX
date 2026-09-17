import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import SectionTitle from "./SectionTitle";

const REVIEWS = [
  {
    quote:
      "ENKRYX rebuilt our internal tools in a fraction of the time we expected, and everything just works.",
    name: "Imran Haque",
    company: "Operations Lead, Northpeak",
    initials: "IH",
  },
  {
    quote:
      "Clear communication from day one. No surprises, no scope creep — just steady, solid delivery.",
    name: "Tania Rahman",
    company: "Founder, Velora",
    initials: "TR",
  },
  {
    quote:
      "The team caught issues we hadn't even thought to ask about. That kind of care is rare.",
    name: "Omar Siddique",
    company: "CTO, Atlasgrid",
    initials: "OS",
  },
];

// Repeat the set enough times so the track is always wider than any screen,
// so the loop point never runs out of cards and the scroll reads as truly infinite.
const REPEAT = 6;
const ROW_ONE = Array.from({ length: REPEAT }, () => REVIEWS).flat();
const ROW_TWO = Array.from({ length: REPEAT }, () => REVIEWS)
  .flat()
  .reverse();
const LOOP_PERCENT = 100 / REPEAT; // translate by exactly one repeated block so the seam is invisible

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          title={
            <>
              WHAT OUR <span className="text-[#006e87]">CLIENTS </span>SAY
            </>
          }
          description="We measure success by how our clients describe working with us."
        />
      </div>

      {/* desktop/tablet: two bidirectional marquee rows, bleeding past the viewport edges */}
      <div className="hidden md:flex flex-col gap-8 mt-14">
        <div className="marquee-row">
          <div className="marquee-track marquee-ltr">
            {ROW_ONE.map((r, i) => (
              <div
                className="w-[380px] flex-shrink-0"
                key={`row1-${r.name}-${i}`}
              >
                <TestimonialCard {...r} />
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-row">
          <div className="marquee-track marquee-rtl">
            {ROW_TWO.map((r, i) => (
              <div
                className="w-[380px] flex-shrink-0"
                key={`row2-${r.name}-${i}`}
              >
                <TestimonialCard {...r} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* mobile: unchanged swipeable single card */}
      <div className="md:hidden max-w-7xl mx-auto px-6">
        <TestimonialCard {...REVIEWS[index]} />
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-2 rounded-full transition-all duration-250"
              style={{
                background: i === index ? "#006E87" : "#DCE6EB",
                width: i === index ? 20 : 8,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-row {
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 2rem;
          padding: 0 1rem;
          will-change: transform;
        }
        .marquee-ltr {
          animation: marquee-ltr 60s linear infinite;
        }
        .marquee-rtl {
          animation: marquee-rtl 60s linear infinite;
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-ltr {
          from { transform: translateX(-${LOOP_PERCENT}%); }
          to { transform: translateX(0%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(0%); }
          to { transform: translateX(-${LOOP_PERCENT}%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-ltr, .marquee-rtl {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
