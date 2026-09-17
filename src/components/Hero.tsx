import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroAnimationStage from "./HeroAnimationStage";
import { GridBackdrop } from "./BackgroundDecor";
import { useReveal } from "../lib/useReveal";

export default function Hero() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* extremely subtle technical grid — almost invisible, thin, light gray */}
      <GridBackdrop color="#F0F1F3" opacity={0.7} size={44} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-2 gap-16 lg:gap-14 items-center">
        {/* LEFT — headline, paragraph, CTA (unchanged) */}
        <div ref={revealRef} className="reveal order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-[#006E87]" />
            <span className="text-[11px] tracking-[0.16em] font-medium uppercase text-[#52575C]">
              Now accepting new projects
            </span>
          </div>

          <h1 className="text-[38px] sm:text-5xl lg:text-[54px] font-extrabold italic leading-[1.08] tracking-tight uppercase text-[#111111]">
            Your Idea Deserves
            <br />A <span className="text-[#006e87]">Proper</span> System.
          </h1>

          <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-[#52575C]">
            We design and build simple, reliable software that keeps your
            business moving. No bloat, no friction—just clean execution.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[#006E87] text-[#006E87] transition-colors duration-250 hover:bg-[#006E87] hover:text-white"
            >
              Build my project
              <ArrowRight
                size={15}
                className="transition-transform duration-250 group-hover:translate-x-0.5"
              />
            </button>

            <a
              href="#portfolio"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] transition-colors duration-250 hover:text-[#006E87]"
            >
              <span className="relative">
                See my work
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#006E87] transition-all duration-250 group-hover:w-full" />
              </span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* RIGHT — single borderless animation stage, ~50% of hero width */}
        <div className="order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full">
          <HeroAnimationStage />
        </div>
      </div>
    </section>
  );
}
