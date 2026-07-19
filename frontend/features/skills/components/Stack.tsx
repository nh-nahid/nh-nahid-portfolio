import React from "react";

import { Badge } from "@/components/ui/badge";

import { getHome } from "@/features/home/api/home.api";
import Reveal from "@/components/Reveal";
import TechOrbit from "../../../components/TechOrbit";
import { getSkills } from "../api/skill.api";

export default async function Stack() {
  const home = await getHome();
  const allSkills = await getSkills();
  const skills = allSkills[0];

  if (!skills) return null;

  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
          {skills.sectionTitle}
        </p>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {skills.heading}
        </h2>

        <p className="mt-4 text-base text-zinc-400">{skills.description}</p>
      </Reveal>

      <Reveal delay={150} className="mt-16">
        <TechOrbit
          tools={home.skills?.[0]?.orbitTools ?? []}
          image={
            home.profile?.avatar
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${home.profile.avatar}`
              : "/nahid.jpeg"
          }
        />
      </Reveal>

      <Reveal delay={250} className="mt-20">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max gap-3">
            {[...skills.toolbox, ...skills.toolbox].map((tool, index) => (
              <Badge
                key={`${tool}-${index}`}
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
