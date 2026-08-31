import {
  Cloud,
  Code2,
  Database,
  Server,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import TechOrbit from "@/components/TechOrbit";
import TechIcon from "@/components/TechIcon";

import { getHome } from "@/features/home/api/home.api";
import { getSkills } from "../api/skill.api";

const CATEGORY_ICONS = [
  Code2,
  Server,
  Database,
  Cloud,
];

export default async function Stack() {
  let home = null;
  let skillsData = null;
  try {
    const res = await Promise.all([
      getHome(),
      getSkills(),
    ]);
    home = res[0];
    skillsData = res[1];
  } catch {
    // API offline during build, fallback gracefully
  }

  const skills = skillsData?.[0];
  if (!skills) {
    return null;
  }

  const orbitTools = home?.skills?.[0]?.orbitTools ?? [];

  const avatar =
    home?.profile?.avatar
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${home.profile.avatar}`
      : "/nahid.jpeg";

  return (
    <section
      id="stack"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
          {skills.sectionTitle}
        </p>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {skills.heading}
        </h2>

        <p className="mt-4 text-base text-zinc-400">
          {skills.description}
        </p>
      </Reveal>

      <Reveal
        delay={200}
        className="mt-20"
      >
        <TechOrbit
          tools={orbitTools}
          image={avatar}
        />
      </Reveal>

      {!!skills.toolbox?.length && (
        <Reveal
          delay={300}
          className="mt-20"
        >
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max gap-3">
              {[...skills.toolbox, ...skills.toolbox].map(
                (tool, index) => (
                  <Badge
                    key={`${tool}-${index}`}
                    variant="outline"
                    className="font-mono-custom flex items-center gap-2 whitespace-nowrap rounded-full border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-normal text-zinc-300 transition-colors hover:border-lime-400/40"
                  >
                    <TechIcon name={tool} className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{tool}</span>
                  </Badge>
                )
              )}
            </div>
          </div>
        </Reveal>
      )}

      {/* Static Skill Set Toolbox */}
      {!!skills.toolbox?.length && (
        <Reveal
          delay={350}
          className="mt-14"
        >
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
              <div>
                <p className="font-mono-custom text-xs uppercase tracking-widest text-lime-400">
                  Skillset Toolbox
                </p>
                <h3 className="font-display mt-1 text-xl font-bold text-white">
                  Core Technologies &amp; Tools
                </h3>
              </div>
              <span className="font-mono-custom rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1 text-xs text-lime-400">
                {skills.toolbox.length} Technologies
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {skills.toolbox.map((tool, idx) => (
                <Badge
                  key={`${tool}-${idx}`}
                  variant="outline"
                  className="group flex items-center gap-2.5 rounded-xl border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-xs font-normal text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/50 hover:bg-zinc-800/90 hover:text-white hover:shadow-[0_0_15px_rgba(163,230,53,0.15)]"
                >
                  <TechIcon name={tool} className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-mono-custom font-medium">{tool}</span>
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {!!skills.categories?.length && (
        <Reveal
          delay={100}
          className="mt-20"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.categories.map(
              (category, index) => {
                const Icon =
                  CATEGORY_ICONS[
                    index %
                      CATEGORY_ICONS.length
                  ];

                return (
                  <article
                    key={category.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                        <Icon className="h-5 w-5" />
                      </span>

                      <h3 className="font-display text-lg font-semibold text-white">
                        {category.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {category.items.map(
                        (item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-relaxed text-zinc-400"
                          >
                            <span className="text-lime-400">
                              ▸
                            </span>

                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </article>
                );
              }
            )}
          </div>
        </Reveal>
      )}

    </section>
  );
}