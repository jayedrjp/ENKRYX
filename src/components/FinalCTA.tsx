import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#006e87] py-24 sm:py-32">
      {/* faded grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 30% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 30% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* aurora glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#21E6C1] opacity-20 blur-[120px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#00A8FF] opacity-10 blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* left — message */}
        <div className="max-w-xl text-left">
          <h2 className="mb-5 text-4xl font-extrabold italic tracking-tight uppercase text-white sm:text-5xl">
            Ready to build{" "}
            <span className="bg-gradient-to-r from-[#21E6C1] to-[#4FA8FF] bg-clip-text text-transparent">
              something great?
            </span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-sm">
            Get in touch with us today for a free consultation and quote.
          </p>
        </div>

        {/* right — action */}
        <div className="flex w-full max-w-xl shrink-0 items-center justify-center gap-3 lg:w-auto">
          <Link
            to="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#04141A] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(33,230,193,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_50px_-15px_rgba(33,230,193,0.7)]"
          >
            Start your project
            <svg width="34" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/contact"
            className="w-full whitespace-nowrap rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 text-center"
          >
            Book a call
          </Link>
        </div>
      </div>
    </section>
  );
}
