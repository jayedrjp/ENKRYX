import { useEffect, useRef } from "react";

/**
 * Adds a subtle fade-up-on-scroll effect to any element.
 * Attach the returned ref to a container and give it the `reveal` class.
 * Respects prefers-reduced-motion automatically via CSS in index.css.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
