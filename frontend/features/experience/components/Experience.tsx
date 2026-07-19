import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";

import { getExperiences } from "@/features/experience/api/experience.api";

export default async function Experience() {
  const experiences = await getExperiences();

  if (!experiences.length) {
    return null;
  }

  return (
    <section
      id="experience"
      className="py-24"
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
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {job.role}
                      </h3>

                      <p className="text-lime-400">
                        {job.company}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-mono-custom text-xs text-zinc-500">
                        {job.period}
                      </p>

                      <p className="flex items-center justify-end gap-1 text-xs text-zinc-500">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {job.technologies && job.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                        >
                          {tech}
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