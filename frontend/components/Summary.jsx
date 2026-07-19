import { getProfile } from "@/features/profile/api/profile.api";
import Reveal from "./Reveal";

export default async function Summary() {
  const profile = await getProfile();

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
      <Reveal>
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
          About Me
        </p>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          I care about the ten milliseconds nobody notices
        </h2>

        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          {profile.about}
        </p>
      </Reveal>
    </section>
  );
}