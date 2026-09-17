import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

/** Returns the shared, app-wide Lenis instance (or null if not started yet). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Starts the single Lenis instance that drives smooth scrolling for the
 * whole app. Safe to call more than once — subsequent calls just return the
 * existing instance instead of creating a duplicate (duplicates fight over
 * the same scroll and cause jank).
 */
export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
    wheelMultiplier: 1,
    lerp: 0.1,
    syncTouch: true,
    syncTouchLerp: 0.075,
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

/** Stops and tears down the shared Lenis instance. */
export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}