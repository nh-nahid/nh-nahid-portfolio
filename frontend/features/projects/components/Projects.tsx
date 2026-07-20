import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Reveal from "@/components/Reveal";
import { getProjects } from "../api/project.api";
import { FaGithub } from "react-icons/fa";

export default async function Projects() {
  const projects = await getProjects();

  if (!projects.length) {
    return null;
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal className="mb-14 text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
          Featured Work
        </p>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Projects that shipped and stayed up
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project._id} delay={index * 150}>
            <Card className="group h-full overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40">
              {project.coverImage && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/projects/${project.coverImage}`}
                    alt={`${project.name} cover`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                </div>
              )}

              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono-custom text-xs uppercase tracking-widest text-zinc-500">
                      {project.tag}
                    </p>

                    <h3 className="font-display mt-1 text-2xl font-bold text-white">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center  gap-2">
  {project.github && (
    <Link
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.name} source code`}
      className="p-2 text-zinc-400 transition-colors hover:border-lime-400 hover:text-lime-400"
    >
      <FaGithub className="h-5 w-5" />
    </Link>
  )}

  {project.url && (
    <Link
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name}`}
      className="flex items-center gap-1 text-xs rounded-2xl border border-zinc-700 px-3 py-1 text-zinc-400 transition-colors hover:border-lime-400  hover:text-lime-400"
    >
      <span>Live</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  )}
</div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {project.desc}
                </p>

                {project.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {project.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {project.stack.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="font-mono-custom rounded-full border-zinc-700 bg-transparent text-xs font-normal text-zinc-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
