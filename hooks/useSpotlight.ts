 "use client";

import { useRef, useCallback } from "react";

// Zero-rerender cursor spotlight.Directly mutates the glow element's `background` and `opacity` style on every pointer-move — no React state, no CSS custom properties, no framer-motion. Just pure DOM manipulation for max performance and zero jank.
export function useSpotlight(color = "rgba(0,212,170,0.12)", radius = 400) {
  const glowRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = glowRef.current;
      if (!el) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 60%)`;
      el.style.opacity = "1";
    },
    [color, radius]
  );

  const onPointerLeave = useCallback(() => {
    const el = glowRef.current;
    if (el) el.style.opacity = "0";
  }, []);

  return { glowRef, onPointerMove, onPointerLeave };
}
