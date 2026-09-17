"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * ENKRYX — HOW WE WORK
 * A compact, single-viewport composition: heading, paragraph, and a
 * gently curved dotted road with a solid teal progress line that
 * travels over it as the visitor scrolls.
 *
 * Scroll-progress architecture is unchanged from the previous version:
 * a raw scroll listener writes into a ref, and a requestAnimationFrame
 * loop eases toward that value and writes styles directly onto the SVG
 * path and node elements — no React state on scroll, no jank.
 */

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn your goals, users, and constraints before writing a line of code.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes and prototypes shaped around clarity and ease of use.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Clean, tested code shipped in focused, reviewable increments.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "A smooth release with monitoring and support already in place.",
  },
];

// Desktop: wide, gentle horizontal wave. viewBox units.
const DESKTOP_VIEWBOX = { w: 1160, h: 260 };
const DESKTOP_PATH =
  "M80,190 C 240,190 280,90 440,90 C 600,90 640,190 800,190 C 960,190 1000,90 1080,90";
const DESKTOP_NODES: { x: number; y: number }[] = [
  { x: 80, y: 190 },
  { x: 440, y: 90 },
  { x: 800, y: 190 },
  { x: 1080, y: 90 },
];

// Mobile: gentle vertical wave. viewBox units.
const MOBILE_VIEWBOX = { w: 360, h: 900 };
const MOBILE_PATH =
  "M100,70 C 100,180 260,210 260,320 C 260,430 100,460 100,570 C 100,680 260,710 260,820";
const MOBILE_NODES: { x: number; y: number }[] = [
  { x: 100, y: 70 },
  { x: 260, y: 320 },
  { x: 100, y: 570 },
  { x: 260, y: 820 },
];

const TEAL = "#006F87";
const LIGHT_PATH = "#DCEAF0";
const EASE = 0.1; // interpolation factor per frame — higher = snappier, lower = smoother
const ACTIVE_EPS = 0.015;

function findFractionAtCoord(
  path: SVGPathElement,
  total: number,
  axis: "x" | "y",
  target: number,
) {
  let lo = 0;
  let hi = total;
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    const pt = path.getPointAtLength(mid);
    const val = axis === "x" ? pt.x : pt.y;
    if (val < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2 / total;
}

export default function HowWeWork() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const desktopTealRef = useRef<SVGPathElement>(null);
  const mobileTealRef = useRef<SVGPathElement>(null);
  const desktopNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const desktopLengthRef = useRef(0);
  const mobileLengthRef = useRef(0);
  const desktopFractionsRef = useRef<number[]>([0, 0.33, 0.66, 1]);
  const mobileFractionsRef = useRef<number[]>([0, 0.33, 0.66, 1]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [ready, setReady] = useState(false);

  const applyProgress = (p: number) => {
    const dLen = desktopLengthRef.current;
    const mLen = mobileLengthRef.current;

    if (desktopTealRef.current && dLen) {
      desktopTealRef.current.style.strokeDashoffset = String(dLen * (1 - p));
    }
    if (mobileTealRef.current && mLen) {
      mobileTealRef.current.style.strokeDashoffset = String(mLen * (1 - p));
    }

    desktopFractionsRef.current.forEach((fraction, i) => {
      const active = p >= fraction - ACTIVE_EPS;
      const node = desktopNodeRefs.current[i];
      const num = desktopNumberRefs.current[i];
      if (node) {
        node.style.backgroundColor = active ? TEAL : "#FFFFFF";
        node.style.borderColor = active ? TEAL : LIGHT_PATH;
        node.style.transform = active ? "scale(1.08)" : "scale(1)";
      }
      if (num) num.style.color = active ? "#FFFFFF" : TEAL;
    });

    mobileFractionsRef.current.forEach((fraction, i) => {
      const active = p >= fraction - ACTIVE_EPS;
      const node = mobileNodeRefs.current[i];
      const num = mobileNumberRefs.current[i];
      if (node) {
        node.style.backgroundColor = active ? TEAL : "#FFFFFF";
        node.style.borderColor = active ? TEAL : LIGHT_PATH;
        node.style.transform = active ? "scale(1.08)" : "scale(1)";
      }
      if (num) num.style.color = active ? "#FFFFFF" : TEAL;
    });
  };

  // Measure paths once, set up scroll + rAF loop.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMotionChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener?.("change", onMotionChange);

    if (desktopTealRef.current) {
      const p = desktopTealRef.current;
      const total = p.getTotalLength();
      desktopLengthRef.current = total;
      p.style.strokeDasharray = String(total);
      desktopFractionsRef.current = DESKTOP_NODES.map((n) =>
        findFractionAtCoord(p, total, "x", n.x),
      );
    }
    if (mobileTealRef.current) {
      const p = mobileTealRef.current;
      const total = p.getTotalLength();
      mobileLengthRef.current = total;
      p.style.strokeDasharray = String(total);
      mobileFractionsRef.current = MOBILE_NODES.map((n) =>
        findFractionAtCoord(p, total, "y", n.y),
      );
    }
    setReady(true);

    const onScroll = () => {
      if (!wrapperRef.current) return;
      if (reducedMotionRef.current) {
        targetProgressRef.current = 1;
        return;
      }
      const el = wrapperRef.current;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetProgressRef.current = 1;
        return;
      }
      const scrolled = -rect.top;
      targetProgressRef.current = Math.min(
        Math.max(scrolled / scrollable, 0),
        1,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let rafId: number;
    const tick = () => {
      const target = reducedMotionRef.current ? 1 : targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      let next: number;
      if (reducedMotionRef.current || Math.abs(diff) < 0.0004) {
        next = target;
      } else {
        next = current + diff * EASE;
      }
      currentProgressRef.current = next;
      applyProgress(next);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
      mq.removeEventListener?.("change", onMotionChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative bg-white">
      {/* Tall scroll track — drives progress, does not affect visual composition */}
      <div ref={wrapperRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 py-10 md:py-14">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
            <h2 className="font-extrabold italic tracking-tight uppercase text-[#111111] text-2xl sm:text-3xl lg:text-4xl">
              How We Work
            </h2>
            <p className="mt-3 mb-8 text-[#5F7285] text-sm md:text-sm max-w-lg mx-auto">
              A simple 4-step process to bring your digital vision to life.
            </p>
          </div>

          {/* Roadmap */}
          <div className="max-w-6xl mx-auto w-full">
            {/* Desktop roadmap */}
            <div className="hidden md:block relative w-full">
              <svg
                viewBox={`0 0 ${DESKTOP_VIEWBOX.w} ${DESKTOP_VIEWBOX.h}`}
                className="w-full h-auto"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Dotted road (base) */}
                <path
                  d={DESKTOP_PATH}
                  stroke={LIGHT_PATH}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray="1 15"
                />
                {/* Solid teal progress, travels on top of the road */}
                <path
                  ref={desktopTealRef}
                  d={DESKTOP_PATH}
                  stroke={TEAL}
                  strokeWidth={6}
                  strokeLinecap="round"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              </svg>

              {STEPS.map((step, i) => {
                const node = DESKTOP_NODES[i];
                const leftPct = (node.x / DESKTOP_VIEWBOX.w) * 100;
                const topPct = (node.y / DESKTOP_VIEWBOX.h) * 100;
                const isCrest = node.y < DESKTOP_VIEWBOX.h / 2;

                return (
                  <div
                    key={step.number}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Node */}
                    <div
                      ref={(el) => (desktopNodeRefs.current[i] = el)}
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: LIGHT_PATH,
                        transition:
                          "background-color 350ms ease, border-color 350ms ease, transform 350ms ease",
                      }}
                    >
                      <span
                        ref={(el) => (desktopNumberRefs.current[i] = el)}
                        className="font-mono text-xs tracking-wide"
                        style={{ color: TEAL, transition: "color 350ms ease" }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content, close to the node */}
                    <div
                      className="absolute w-48 text-center"
                      style={{
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: isCrest ? "-118px" : "70px",
                      }}
                    >
                      <h3 className="font-bold uppercase tracking-wide text-[#111111] text-sm">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[#5F7285] text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile roadmap */}
            <div className="md:hidden relative w-full max-w-xs mx-auto">
              <svg
                viewBox={`0 0 ${MOBILE_VIEWBOX.w} ${MOBILE_VIEWBOX.h}`}
                className="w-full h-auto"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d={MOBILE_PATH}
                  stroke={LIGHT_PATH}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray="1 15"
                />
                <path
                  ref={mobileTealRef}
                  d={MOBILE_PATH}
                  stroke={TEAL}
                  strokeWidth={6}
                  strokeLinecap="round"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              </svg>

              {STEPS.map((step, i) => {
                const node = MOBILE_NODES[i];
                const leftPct = (node.x / MOBILE_VIEWBOX.w) * 100;
                const topPct = (node.y / MOBILE_VIEWBOX.h) * 100;
                const isLeft = node.x < MOBILE_VIEWBOX.w / 2;

                return (
                  <div
                    key={step.number}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      ref={(el) => (mobileNodeRefs.current[i] = el)}
                      className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: LIGHT_PATH,
                        transition:
                          "background-color 350ms ease, border-color 350ms ease, transform 350ms ease",
                      }}
                    >
                      <span
                        ref={(el) => (mobileNumberRefs.current[i] = el)}
                        className="font-mono text-[11px] tracking-wide"
                        style={{ color: TEAL, transition: "color 350ms ease" }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div
                      className="absolute w-32 top-1/2"
                      style={{
                        transform: "translateY(-50%)",
                        left: isLeft ? "44px" : "auto",
                        right: isLeft ? "auto" : "44px",
                        textAlign: isLeft ? "left" : "right",
                      }}
                    >
                      <h3 className="font-bold uppercase tracking-wide text-[#111111] text-xs">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[#5F7285] text-[11px] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
