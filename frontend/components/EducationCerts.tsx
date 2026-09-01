import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";
import { getHome } from "@/features/home/api/home.api";

export default async function EducationCerts() {
  let home = null;
  try {
    home = await getHome();
  } catch {
    // API offline during build, fallback gracefully
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";
  const education = home?.education || [];
  const courses = home?.courses || [];
  const certifications = home?.certifications || [];

  return (
    <section className="py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 sm:px-8">
        {/* Education */}
        <Reveal>
          <p className="font-mono-custom mb-4 text-center text-xs uppercase tracking-widest text-lime-400">
            Education
          </p>

          <h2 className="font-display mb-6 text-center text-2xl font-bold text-white">
            Academic Background
          </h2>

          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <Card
                key={edu._id}
                className="border-zinc-800 bg-zinc-950/60 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {edu.degree}
                  </h3>

                  <p className="mt-1 text-lime-400">{edu.school}</p>

                  <p className="font-mono-custom mt-3 text-xs text-zinc-500">
                    {edu.period} · {edu.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>

        {/* Courses & Training */}
        <Reveal delay={300}>
          <p className="font-mono-custom mb-4 mt-8 text-center text-xs uppercase tracking-widest text-lime-400 md:mt-0">
            Courses & Training
          </p>

          <h2 className="font-display mb-6 text-center text-2xl font-bold text-white">
            Continuous Learning
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {courses.map((course) => {
              const logoSrc = course.logo
                ? `${serverUrl}/uploads/courses/${course.logo}`
                : "";

              return (
                <Card
                  key={course._id}
                  className="border-zinc-800 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40"
                >
                  <CardContent className="p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 flex-shrink-0">
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={`${course.platform} logo`}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span className="text-[9px] text-zinc-600 font-bold">Logo</span>
                        )}
                      </div>

                      <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-2.5 py-1 text-[10px] font-medium text-lime-400 truncate">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-semibold text-white">
                      {course.name}
                    </h3>

                    <p className="mt-1 text-sm text-lime-400">
                      {course.platform}
                    </p>

                    {course.description && (
                      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                        {course.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={150}>
          <p className="font-mono-custom mb-4 mt-8 text-center text-xs uppercase tracking-widest text-lime-400 md:mt-0">
            Certifications
          </p>

          <h2 className="font-display mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Verified Credentials
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => {
              const coverSrc = cert.coverImage
                ? `${serverUrl}/uploads/certifications/${cert.coverImage}`
                : "";

              return (
                <Card
                  key={cert._id}
                  className="group flex flex-col overflow-hidden border-zinc-800 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40"
                >
                  {/* Certificate Cover */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800/80">
                    {coverSrc ? (
                      <img
                        src={coverSrc}
                        alt={`${cert.name} cover`}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 text-center">
                        <CheckCircle2 className="h-10 w-10 text-lime-400/40" />
                        <span className="text-sm font-medium text-zinc-500">
                          {cert.name}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-lime-400/30 bg-zinc-950/85 px-2.5 py-1 text-[11px] font-medium text-lime-400 backdrop-blur-md">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <CardContent className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-lime-400">
                            {cert.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-lime-400/90">
                            {cert.issuer}
                          </p>
                        </div>

                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 rounded-full border border-zinc-700 bg-zinc-900/80 p-1.5 text-zinc-400 transition-all hover:border-lime-400 hover:bg-lime-400 hover:text-zinc-950"
                            aria-label={`View ${cert.name}`}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {cert.description && (
                        <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {cert.url && (
                      <div className="mt-5 pt-4 border-t border-zinc-900">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 transition-colors hover:text-lime-300"
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
