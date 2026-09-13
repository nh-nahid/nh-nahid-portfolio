import Image from "next/image";
import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";
import TechIcon from "@/components/TechIcon";
import ExperienceBulletList from "./ExperienceBulletList";

import { getExperiences } from "@/features/experience/api/experience.api";
import type { Experience } from "../types/experience.types";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";

export default async function Experience() {
  let experiences: Experience[] = [];
  try {
    experiences = await getExperiences() || [];
  } catch {
    // API offline during build, fallback gracefully
  }

  if (!experiences.length) {
    return null;
  }

  return (
    <section
      id="experience"
      className="py-14 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-14 text-center">
          <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
            Where I&apos;ve worked
          </p>

          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Experience
          </h2>
        </Reveal>

        <div className="space-y-6">
          {experiences.map((job, index) => (
            <Reveal
              key={job._id}
              delay={index * 120}
            >
              <Card className="border-zinc-800 bg-zinc-950/60 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-lime-400/40">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                    {/* Left: Logo + Role + Company */}
                    <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">
                      {/* Company Logo — smaller on mobile so the text has more room */}
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-zinc-700 bg-zinc-900 sm:h-11 sm:w-11">
                        {job.companyLogo ? (
                          <Image
                            src={`${SERVER_URL}/uploads/company-logos/${job.companyLogo}`}
                            alt={`${job.company} logo`}
                            width={44}
                            height={44}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-xs font-bold text-zinc-400 sm:text-sm">
                            {job.company.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Role + Company name — full text, never cut off */}
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-xl">
                          {job.role}
                        </h3>

                        <p className="text-sm text-lime-400 sm:text-base">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Location — its own full-width row on mobile so it never has to squeeze or cut off */}
                    <div className="flex items-center gap-1 pl-[46px] text-xs text-zinc-500 sm:max-w-[45%] sm:justify-end sm:pl-0 sm:text-right">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <ExperienceBulletList points={job.points} limit={2} />

                  {job.technologies && job.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                        >
                          <TechIcon name={tech} className="h-3 w-3 flex-shrink-0" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}