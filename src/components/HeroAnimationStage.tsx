import { useEffect, useRef, useState } from "react";

interface Scene {
  src: string;
  alt: string;
}

// Same four recolored illustrations, now shown one at a time as sequential
// scenes instead of a simultaneous grid. tri-monitor-stack is first: center
// monitor straight, two side monitors tilted, tech badges arranged around —
// the "product system" hero shot.
const SCENES: Scene[] = [
  {
    src: "/illustrations/tri-monitor-stack.svg",
    alt: "Multi-monitor development setup with HTML, CSS, JS, PHP and C++ badges",
  },
  {
    src: "/illustrations/desktop-monitor.svg",
    alt: "Desktop application interface",
  },
  {
    src: "/illustrations/dev-coding.svg",
    alt: "Developer working across connected interfaces",
  },
  {
    src: "/illustrations/man-and-robot.svg",
    alt: "Engineer and automated assistant working side by side",
  },
];

const ENTER_MS = 650;
const HOLD_MS = 2600;
const EXIT_MS = 450;

type Phase = "enter" | "hold" | "exit";

export default function HeroAnimationStage() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const duration =
      phase === "enter" ? ENTER_MS : phase === "hold" ? HOLD_MS : EXIT_MS;
    timeoutRef.current = window.setTimeout(() => {
      if (phase === "enter") {
        setPhase("hold");
      } else if (phase === "hold") {
        setPhase("exit");
      } else {
        setIndex((i) => (i + 1) % SCENES.length);
        setPhase("enter");
      }
    }, duration);
    return () => window.clearTimeout(timeoutRef.current);
  }, [phase]);

  const scene = SCENES[index];

  return (
    <div className="w-full">
      {/* Static illustration — no animated SVG paths that bleed outside */}
      <div
        className="relative w-full aspect-[4/3]"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <img
          key={index}
          src={scene.src}
          alt={scene.alt}
          className={`absolute inset-0 m-auto max-w-[82%] max-h-[82%] object-contain ${
            phase === "exit" ? "hero-scene-exit" : "hero-scene-enter"
          }`}
          style={{ display: "block" }}
        />
      </div>

      <div className="mt-2 flex justify-end">
        <div
          className="flex items-center gap-1.5 mr-64"
          role="tablist"
          aria-label="Animation scenes"
        >
          {SCENES.map((_, i) => (
            <span
              key={i}
              role="tab"
              aria-selected={i === index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 6,
                background: i === index ? "#006E87" : "#D8DCE0",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
