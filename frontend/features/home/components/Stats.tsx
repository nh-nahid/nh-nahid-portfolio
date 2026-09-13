import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { getHome } from "@/features/home/api/home.api";
import Reveal from "@/components/Reveal";
import type { Stat } from "@/features/home/types/home.types";

export default async function Stats() {
  let stats: Stat[] = [];
  try {
    const home = await getHome();
    stats = home?.stats || [];
  } catch {
    // API offline during build, fallback gracefully
  }

  return (
    <section id="about" className="py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label || index}
            delay={index * 100}
            className="h-full"
          >
            <Card className="flex h-full flex-col justify-center border-zinc-800 bg-zinc-900/40 text-center backdrop-blur-sm transition-all duration-300 hover:border-lime-400/40">
              <CardContent className="flex h-full flex-col justify-center p-3.5 sm:p-5">
                <p className="font-display text-2xl font-bold tracking-tight text-lime-400 break-words sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-1.5 text-xs font-medium leading-snug text-zinc-400 break-words sm:mt-2 sm:text-sm">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
