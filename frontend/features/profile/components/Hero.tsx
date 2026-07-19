import { Download, Mail, Phone, Sparkles } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import Reveal from "@/components/Reveal";
import Image from "next/image";
import ProjectButton from "./ProjectButton";
import { getProfile } from "../api/profile.api";

export default async function Hero() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${profile.avatar}`;
  const resumeUrl = profile.resume
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${profile.resume}`
    : "#";

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-24 pt-36 sm:pt-40"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 md:grid-cols-2">
        <Reveal>
          <p className="font-mono-custom mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-lime-400">
            <Sparkles className="h-3.5 w-3.5" />
            {profile.title} · {profile.location}
          </p>

          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <p className="font-display mt-3 text-xl text-lime-400 sm:text-2xl">
            Full-Stack Developer
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ProjectButton />

            {profile.resume && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-lime-400 hover:text-lime-400"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            )}
          </div>

          <div className="mt-10 flex items-center gap-5 text-zinc-500">
            {profile.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-lime-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}

            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-2 text-sm transition-colors hover:text-lime-400"
            >
              <Phone className="h-4 w-4" />
              {profile.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex justify-center">
          <div className="float-soft relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-zinc-500 bg-opacity-20 blur-2xl" />

            <div className="h-72 w-64 overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 sm:h-96 sm:w-80">
              <Image
                src={imageUrl}
                alt={profile.name}
                width={320}
                height={384}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-xl">
              <p className="font-display text-lg font-semibold text-lime-400">
                4.2s → 0.9s
              </p>

              <p className="text-xs text-zinc-400">LCP improved</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
