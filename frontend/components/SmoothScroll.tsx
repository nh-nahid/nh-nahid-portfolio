"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
  duration: 1.5,
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.3,
  autoRaf: true,
});

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}