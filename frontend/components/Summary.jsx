import React from "react";
import Reveal from "./Reveal";

/* ---------------------------------------------------------------
   SUMMARY / ABOUT ME
----------------------------------------------------------------*/
export default function Summary() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
      <Reveal>
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">About Me</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          I care about the ten milliseconds nobody notices
        </h2>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          Over the last couple of years I've moved from Laravel-flavored beginnings into
          a frontend-first, full-stack practice built around React, Next.js and
          TypeScript. I like owning a problem end to end — shaping the component
          system, wiring the API contracts, and then chasing performance numbers
          until the page feels instant. Clean state management, predictable
          authentication, and a UI that holds up under real traffic matter more
          to me than clever tricks.
        </p>
      </Reveal>
    </section>
  );
}
