const LOGOS = [
  "/public/logos/logo1.png",
  "/public/logos/logo2.png",
  "/public/logos/logo3.png",
  "/public/logos/logo4.png",
  "/public/logos/logo5.png",
  "/public/logos/logo6.png",
  "/public/logos/logo7.png",
  "/public/logos/logo8.png",
  "/public/logos/logo9.png",
];

export default function TrustedBy() {
  return (
    <section className="relative py-12 bg-canvas overflow-hidden border-b border-black/5">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-canvas to-transparent z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 text-center mb-8">
        <p className="text-sm font-medium text-muted">
          TRUSTED BY GROWING BUSINESSES AND STARTUPS.
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="marquee-track gap-16 items-center whitespace-nowrap px-4">
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 w-36 relative grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={src}
                alt="Partner logo"
                className="object-contain h-full w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .marquee-track {
          width: max-content;
          display: flex;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
