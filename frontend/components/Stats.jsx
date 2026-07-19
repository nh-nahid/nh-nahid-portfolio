import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "./Reveal";
import { getHome } from "@/features/home/api/home.api";


export default async function Stats() {
  const { stats = [] } = await getHome();

  return (
    <section id="about" className="py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:px-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 100}
          >
            <Card className="border-zinc-800 bg-zinc-900/40 text-center backdrop-blur-sm">
              <CardContent className="p-5">
                <p className="font-display text-3xl font-bold text-lime-400 sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-zinc-400">
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