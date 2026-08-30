import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";
import { getHome } from "@/features/home/api/home.api";

export default async function EducationCerts() {
  let home = null;
  try {
    home = await getHome();
  } catch (err) {
    console.error("Failed to load home details in EducationCerts:", err);
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

          <h2 className="font-display mb-6 text-center text-2xl font-bold text-white">
            Verified Credentials
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            {certifications.map((cert) => (
              <Card
                key={cert._id}
                className="w-full border-zinc-800 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 hover:border-lime-400/40 md:min-w-[280px] md:flex-1"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-lime-400" />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {cert.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 rounded-full border border-zinc-700 p-2 text-zinc-400 transition-colors hover:border-lime-400 hover:text-lime-400"
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

                  {cert.url && (
                    <span className="mt-4 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-2 py-1 text-[11px] font-medium text-lime-400">
                      ✓ Verified Credential
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
