import React from "react";
import { Badge } from "@/components/ui/badge";
import Reveal from "./Reveal";
import TechOrbit from "./TechOrbit";
import { TOOLBOX } from "../data/portfolioData";

/* ---------------------------------------------------------------
   STACK / "TECHNOLOGIES I WORK WITH" — the spinning signature
   section, plus an infinite marquee of the full toolbox.
   Requires shadcn components: badge
----------------------------------------------------------------*/
export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">Technologies I work with</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          The tools I reach for, on repeat
        </h2>
        <p className="mt-4 text-base text-zinc-400">
          A steady orbit of frontend, backend and infrastructure tools I use to take
          a product from a blank repo to something people rely on daily.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-16">
        <TechOrbit />
      </Reveal>

      <Reveal delay={250} className="mt-20">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max gap-3">
            {[...TOOLBOX, ...TOOLBOX].map((tool, i) => (
              <Badge
                key={`${tool}-${i}`}
                variant="outline"
                className="font-mono-custom whitespace-nowrap rounded-full border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-normal text-zinc-300"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
