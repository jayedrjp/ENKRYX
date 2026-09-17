import { useEffect } from "react";
import FinalCTA from "../components/FinalCTA";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-white py-24 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold italic tracking-tight uppercase text-[#111111] mb-4">
              About ENKRYX
            </h1>
            <p className="mt-6 text-[12px] leading-relaxed text-[#5F7285] max-w-2xl mx-auto">
              We are a remote-first team of 4 expert minds, specialized in
              building smart, scalable, and affordable digital solutions. At
              ENKRYX, we deliver premium software quality without the
              traditional agency cost.
            </p>
          </div>

          {/* Mission + What We Do / Values */}
          <div className="mt-32 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight uppercase-[0.18em] uppercase text-[#071827] mb-5">
                  Our Mission
                </h2>
                <p className="text-[14px] leading-7 text-[#5F7285]">
                  Every great idea deserves a proper system. Our mission is to
                  bridge the gap between complex business problems and
                  simple, reliable digital solutions. We empower startups,
                  local businesses, and international agencies with
                  structured execution and high-performance software.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight uppercase-[0.18em] uppercase text-[#071827] mb-5">
                  What We Do
                </h2>
                <p className="text-[14px] leading-7 text-[#5F7285]">
                  We move fast and build smart. Our team multitasks across
                  Custom Web Development, SaaS Product Development, WordPress
                  Solutions, and Mobile Apps. From deep backend architecture
                  to pixel-perfect UI/UX design, we provide end-to-end
                  execution that keeps your business moving.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[2.5rem] p-12 lg:p-16">
              <h2 className="text-xl font-extrabold tracking-tight uppercase-[0.18em] uppercase text-[#071827] mb-5">
                Our Values
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-s font-bold tracking-tight [0.14em] uppercase text-[#006E87] mb-2">
                    Structured Execution
                  </h3>
                  <p className="text-[13px] leading-6 text-[#5F7285] italic">
                    "Speed matters a lot. But don't build on poor
                    foundations."
                  </p>
                </div>
                <div>
                  <h3 className="text-s font-bold tracking-tight [0.14em] uppercase text-[#006E87] mb-2">
                    Premium Minimalist Design
                  </h3>
                  <p className="text-[13px] leading-6 text-[#5F7285] italic">
                    "Clean, intuitive, and memorable interfaces that
                    convert."
                  </p>
                </div>
                <div>
                  <h3 className="text-s font-bold tracking-tight [0.14em] uppercase text-[#006E87] mb-2">
                    Long-Term Support
                  </h3>
                  <p className="text-[13px] leading-6 text-[#5F7285] italic">
                    "We stay beyond the launch, ensuring your system remains
                    stable."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-32 border-t border-gray-100 pt-32">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <h2 className="text-xl font-extrabold tracking-tight uppercase-[0.18em] uppercase text-[#071827] mb-5">
                Future Vision
              </h2>
              <p className="text-[14px] leading-7 text-[#5F7285]">
                Our goal is to grow into a leading, international software
                company and a global digital agency. We are committed to
                building impactful SaaS products and setting the standard
                for reliable, high-performance software engineering
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}