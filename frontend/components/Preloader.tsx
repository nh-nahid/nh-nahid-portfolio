"use client";

import React, { useEffect, useMemo, useState } from "react";

const STATUS_MESSAGES = [
  { at: 0, text: "Booting up" },
  { at: 25, text: "Compiling components" },
  { at: 55, text: "Optimizing renders" },
  { at: 85, text: "Almost there" },
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
  minDuration = 1000,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [quote] = useState("Code with clarity. Ship with confidence.");

  const done = progress >= 100;

  useEffect(() => {
    // Fire background keep-alive ping immediately
    const serverBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";
    fetch(`${serverBase}/ping`).catch(() => {});
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setProgress(100);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progressRatio = Math.min(elapsed / minDuration, 1);
      
      // Easing cubic out: fast smooth counter 0% -> 100% in exactly minDuration
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      const target = Math.min(100, Math.floor(eased * 100));

      setProgress(target);

      if (target < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [minDuration]);

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => {
      setHidden(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [done]);

  const shown = useMemo(
    () => Math.min(100, Math.floor(progress)),
    [progress]
  );

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-zinc-950 transition-all duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        done
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${shown}%`}
    >
      {/* glowing edge that leads the reveal as the panel slides away */}
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-lime-400 shadow-[0_0_24px_6px_rgba(163,230,53,0.55)]" />
      <span className="absolute left-6 top-6 h-6 w-6 border-l border-t border-lime-400/40" />
      <span className="absolute right-6 top-6 h-6 w-6 border-r border-t border-lime-400/40" />
      <span className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-lime-400/40" />
      <span className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-lime-400/40" />

      <div className="absolute inset-x-0 top-8 flex justify-center sm:top-10">
        <div className="font-display text-lg font-semibold tracking-tight text-white">
          <span className="text-lime-400">
            &lt;/&gt;
          </span>{" "}
          nahid
          <span className="text-lime-400">
            .dev
          </span>
        </div>
      </div>

      <p className="font-display max-w-md px-6 text-center text-2xl font-semibold leading-snug text-zinc-100 sm:max-w-xl sm:text-3xl">
        {quote}
      </p>

      <p className="font-mono-custom mt-6 flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-zinc-500">
        {statusFor(shown)}
        <span
          className="preloader-blink text-lime-400"
          style={{ animationPlayState: done ? "paused" : "running" }}
        >
          _
        </span>
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
    </div>
  );
}
