import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";
import { getProjects } from "../api/project.api";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../types/project.types";
import ProjectTechStack from "./ProjectTechStack";
import ProjectDescription from "./ProjectDescription";
import ProjectBulletList from "./ProjectBulletList";
import ExpandableProjectGrid from "./ExpandableProjectGrid";



export default async function Projects() {
  let projects: Project[] = [];
  try {
    projects = (await getProjects()) || [];
  } catch {
    // API offline during build, fallback gracefully
  }

  if (!projects.length) {
    return null;
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:py-24 sm:px-8">
      <Reveal className="mb-12 text-center">
        <p className="font-mono-custom mb-3 text-xs uppercase tracking-widest text-lime-400">
          Featured Work
        </p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Projects that shipped and stayed up
        </h2>
      </Reveal>

      {/* 2-col md, 3-col lg — compact grid; only the first 3 show on mobile until "Show more" */}
      <ExpandableProjectGrid mobileLimit={3}>
        {projects.map((project, index) => (
          <Reveal key={project._id} delay={index * 100} className="h-full">
            <Card className="group flex h-full flex-col overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40">

              {/* Cover image — fixed compact height */}
              {project.coverImage && (
                <div className="relative h-36 w-full flex-shrink-0 overflow-hidden border-b border-zinc-800 bg-zinc-950">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/projects/${project.coverImage}`}
                    alt={`${project.name} cover`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                </div>
              )}

              <CardContent className="flex flex-1 flex-col p-4 sm:p-5">

                {/* Header: tag + name + links */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono-custom truncate text-[10px] uppercase tracking-widest text-lime-400">
                      {project.tag}
                    </p>
                    <h3 className="font-display mt-0.5 line-clamp-2 text-base font-bold leading-snug text-white">
                      {project.name}
                    </h3>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-shrink-0 items-center gap-1.5">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} source code`}
                        className="p-1.5 text-zinc-400 transition-colors hover:text-lime-400"
                      >
                        <FaGithub className="h-4 w-4" />
                      </Link>
                    )}
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                        className="flex items-center gap-0.5 rounded-2xl border border-zinc-700 px-2.5 py-0.5 text-[11px] text-zinc-400 transition-colors hover:border-lime-400 hover:text-lime-400"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                    {!project.github && !project.url && (
                      <span className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-mono-custom text-zinc-500">
                        <Lock className="h-3 w-3 text-zinc-500" />
                        <span>Private</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Short description — clamped with a "more"/"less" toggle */}
                {project.desc && <ProjectDescription text={project.desc} />}

                {/* Bullet points — capped with a "more"/"less" toggle */}
                {project.points.length > 0 && (
                  <ProjectBulletList
                    points={project.points}
                    mobileLimit={2}
                    desktopLimit={3}
                  />
                )}

                {/* Tech stack — pushed to bottom; capped with a toggle on mobile only */}
                {project.stack.length > 0 && (
                  <ProjectTechStack stack={project.stack} mobileLimit={5} />
                )}

              </CardContent>
            </Card>
          </Reveal>
        ))}
      </ExpandableProjectGrid>
    </section>
  );
}
