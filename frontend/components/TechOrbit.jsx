"use client"

import React, { useEffect, useRef, useState } from "react";
import PHOTO_SRC from "../assets/photo";
import { ORBIT_TOOLS } from "../data/portfolioData";

/* ---------------------------------------------------------------
   SPINNING TECH ORBIT — the signature element of the "Stack"
   section. Icons continuously orbit the photo while staying
   upright (counter-rotation trick). Radius recalculates on resize
   so it stays proportional on every screen size.
----------------------------------------------------------------*/
export default function TechOrbit() {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(120);

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        setRadius(containerRef.current.offsetWidth / 2 - 26);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-64 sm:w-80 md:w-96"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700" />
      <div className="absolute inset-6 rounded-full border border-zinc-800" />

      {/* center photo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="float-soft h-28 w-28 overflow-hidden rounded-full ring-4 ring-lime-400 ring-opacity-40 sm:h-36 sm:w-36 md:h-44 md:w-44">
          <img
            src={PHOTO_SRC}
            alt="Nahid Hossain"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* orbiting icons */}
      <div className="orbit-ring absolute inset-0 z-10">
        {ORBIT_TOOLS.map((t, i) => {
          const angle = (360 / ORBIT_TOOLS.length) * i;
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 sm:-ml-6 sm:-mt-6 sm:h-12 sm:w-12"
              style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
            >
              <div className="orbit-counter flex h-full w-full items-center justify-center rounded-full border border-lime-400 border-opacity-30 bg-zinc-900 bg-opacity-90 shadow-lg">
                <Icon className="h-4 w-4 text-lime-300 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
