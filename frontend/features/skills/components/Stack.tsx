import {
  Cloud,
  Code2,
  Database,
  Server,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import TechOrbit from "@/components/TechOrbit";

import { getHome } from "@/features/home/api/home.api";
import { getSkills } from "../api/skill.api";

const CATEGORY_ICONS = [
  Code2,
  Server,
  Database,
  Cloud,
];

export default async function Stack() {
  const [home, skillsData] = await Promise.all([
    getHome(),
    getSkills(),
  ]);

  const skills = skillsData?.[0];
console.log(skills)
  if (!skills) {
    return null;
  }

  const orbitTools = home.skills?.[0]?.orbitTools ?? [];

  const avatar =
    home.profile?.avatar
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
                    className="font-mono-custom whitespace-nowrap rounded-full border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-normal text-zinc-300"
                  >
                    {tool}
                  </Badge>
                )
              )}
            </div>
          </div>
        </Reveal>
      )}


       {!!skills.categories?.length && (
        <Reveal
          delay={100}
          className="mt-44"
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