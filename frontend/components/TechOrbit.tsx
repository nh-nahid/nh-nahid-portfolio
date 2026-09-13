"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TechIcon from "@/components/TechIcon";

interface TechOrbitProps {
  tools: string[];
  image: string;
}

export default function TechOrbit({
  tools,
  image,
}: TechOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(120);

  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        setRadius(containerRef.current.offsetWidth / 2 - 26);
      }
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:w-80 sm:max-w-none md:w-96"
    >
      {/* Orbit Rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700" />
      <div className="absolute inset-6 rounded-full border border-zinc-800" />

      {/* Center Image */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="float-soft h-36 w-36 overflow-hidden rounded-full ring-4 ring-lime-400/40 md:h-44 md:w-44">
          <Image
            src={image}
            alt="Profile"
            width={176}
            height={176}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Orbit Icons */}
      <div className="orbit-ring absolute inset-0 z-10">
        {tools.map((tool, index) => {
          const angle = (360 / tools.length) * index;

          return (
            <div
              key={`${tool}-${index}`}
              className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px)`,
              }}
            >
              <div className="orbit-counter flex h-full w-full items-center justify-center rounded-full border border-lime-400/30 bg-zinc-900/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-125 hover:border-lime-400">
                <TechIcon
                  name={tool}
                  className="h-5 w-5 transition-transform"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}