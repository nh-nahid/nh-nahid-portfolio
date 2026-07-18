import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "./Reveal";
import { STATS } from "../data/portfolioData";

/* ---------------------------------------------------------------
   STATS STRIP
   Requires shadcn components: card
----------------------------------------------------------------*/
export default function Stats() {
  return (
    <section id="about" className="py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:px-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <Card className="border-zinc-800 bg-zinc-900 bg-opacity-40 text-center backdrop-blur-sm">
              <CardContent className="p-5">
                <p className="font-display text-3xl font-bold text-lime-400 sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-zinc-400">{s.label}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
