import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "./Reveal";
import { PROJECTS } from "../data/portfolioData";

/* ---------------------------------------------------------------
   PROJECTS
   Requires shadcn components: card, badge
----------------------------------------------------------------*/
export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal className="mb-14 text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">Featured Work</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Projects that shipped and stayed up</h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((proj, i) => (
          <Reveal key={proj.name} delay={i * 150}>
            <Card className="group h-full border-zinc-800 bg-zinc-900 bg-opacity-40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:border-opacity-40">
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono-custom text-xs uppercase tracking-widest text-zinc-500">{proj.tag}</p>
                    <h3 className="font-display mt-1 text-2xl font-bold text-white">{proj.name}</h3>
                  </div>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-zinc-700 p-2 text-zinc-400 transition-colors group-hover:border-lime-400 group-hover:text-lime-400"
                    aria-label={`Visit ${proj.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{proj.desc}</p>
                <ul className="mt-4 space-y-2">
                  {proj.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {proj.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="font-mono-custom rounded-full border-zinc-700 bg-transparent text-xs font-normal text-zinc-300"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
