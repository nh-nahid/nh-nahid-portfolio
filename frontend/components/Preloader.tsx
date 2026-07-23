"use client";

import React, { useEffect, useMemo, useState } from "react";

const STATUS_MESSAGES = [
  { at: 0, text: "Booting up" },
  { at: 20, text: "Compiling components" },
  { at: 45, text: "Warming up the mesh" },
  { at: 70, text: "Optimizing renders" },
  { at: 92, text: "Almost there" },
];

function statusFor(progress: number): string {
  let current = STATUS_MESSAGES[0].text;

  for (const message of STATUS_MESSAGES) {
    if (progress >= message.at) {
      current = message.text;
    }
  }

  return current;
}

interface PreloaderProps {
  minDuration?: number;
}

export default function Preloader({
  minDuration = 1100,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const done = progress >= 100;

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const id = requestAnimationFrame(() => {
        setProgress(100);
      });

      return () => cancelAnimationFrame(id);
    }

    const start = performance.now();

    let raf = 0;
    let loaded = document.readyState === "complete";

    const onLoad = () => {
      loaded = true;
    };

    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const elapsed = now - start;

      const t = Math.min(elapsed / minDuration, 1);

      const eased = 1 - Math.pow(1 - t, 3);

      let target = eased * 90;

      if (loaded && elapsed >= minDuration) {
        target = 100;
      }

      setProgress((previous) => Math.max(previous, target));

      if (target < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [minDuration]);

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => {
      setHidden(true);
    }, 550);

    return () => clearTimeout(timer);
  }, [done]);

  const shown = useMemo(
    () => Math.min(100, Math.floor(progress)),
    [progress]
  );

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-500 ${
        done
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${shown}%`}
    >
      <span className="absolute left-6 top-6 h-6 w-6 border-l border-t border-lime-400/40" />
      <span className="absolute right-6 top-6 h-6 w-6 border-r border-t border-lime-400/40" />
      <span className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-lime-400/40" />
      <span className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-lime-400/40" />

      <p className="font-mono-custom flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-zinc-500">
        {statusFor(shown)}
        <span className="preloader-blink text-lime-400">_</span>
      </p>

      <p className="font-display mt-5 text-6xl font-bold tabular-nums text-white sm:text-7xl">
        {shown}
        <span className="text-lime-400">%</span>
      </p>

      <div className="mt-8 h-px w-56 bg-zinc-800 sm:w-72">
        <div
          className="h-px bg-lime-400 transition-[width] duration-150 ease-out"
          style={{
            width: `${shown}%`,
          }}
        />
      </div>

      <p className="font-mono-custom mt-6 text-[10px] uppercase tracking-widest text-zinc-700">
        nahid.dev
      </p>

      
    </div>
  );
}