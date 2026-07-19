"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";
import type { IconType } from "react-icons";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiRedux,
  SiTailwindcss,
  SiAxios,
  SiFramer,
  SiFirebase,
  SiGraphql,
  SiSocketdotio,
  SiPrisma,
  SiVitest,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";

interface TechOrbitProps {
  tools: string[];
  image: string;
}

const ICON_MAP: Record<string, IconType> = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "JavaScript (ES6+)": SiJavascript,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Redux: SiRedux,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  Tailwind: SiTailwindcss,
  Axios: SiAxios,
  "Framer Motion": SiFramer,
  Firebase: SiFirebase,
  GraphQL: SiGraphql,
  "Socket.io": SiSocketdotio,
  "Prisma ORM": SiPrisma,
  Vitest: SiVitest,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
};

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
      className="relative mx-auto aspect-square w-64 sm:w-80 md:w-96"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700" />
      <div className="absolute inset-6 rounded-full border border-zinc-800" />

      {/* Center Image */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="float-soft h-28 w-28 overflow-hidden rounded-full ring-4 ring-lime-400/40 sm:h-36 sm:w-36 md:h-44 md:w-44">
          <Image
            src={image}
            alt="Profile"
            width={176}
            height={176}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Orbit */}
      <div className="orbit-ring absolute inset-0 z-10">
        {tools.map((tool, index) => {
          const angle = (360 / tools.length) * index;
          const Icon = ICON_MAP[tool];

          return (
            <div
              key={tool}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 sm:-ml-6 sm:-mt-6 sm:h-12 sm:w-12"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px)`,
              }}
            >
              <div className="orbit-counter flex h-full w-full items-center justify-center rounded-full border border-lime-400/30 bg-zinc-900/90 shadow-lg">
                {Icon ? (
                  <Icon className="h-5 w-5 text-lime-300" />
                ) : (
                  <Code2
                    className="h-5 w-5 text-lime-300"
                    strokeWidth={1.75}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}