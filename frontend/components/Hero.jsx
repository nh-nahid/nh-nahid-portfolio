"use client"

import React from "react";
import { Mail, Linkedin, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import PHOTO_SRC from "../assets/photo";
import { FaLinkedin } from "react-icons/fa";

/* ---------------------------------------------------------------
   HERO
   Requires shadcn components: button
----------------------------------------------------------------*/
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 md:grid-cols-2">
        <Reveal>
          <p className="font-mono-custom mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-lime-400">
            <Sparkles className="h-3.5 w-3.5" /> Full-Stack Developer · Dhaka, BD
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Nahid Hossain
          </h1>
          <p className="font-display mt-3 text-xl text-lime-400 sm:text-2xl">
            Frontend-Focused Product Engineer
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            I build fast, dependable interfaces with React, Next.js and TypeScript,
            and back them with clean Node.js APIs and well-modeled data. My work
            has carried multi-tenant SaaS products, e-commerce marketplaces and
            dashboards handling thousands of daily users — without the site
            slowing down or the code turning to spaghetti.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300"
            >
              View Projects
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button asChild variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-200 hover:border-lime-400 hover:bg-transparent hover:text-lime-400">
              <a href="mailto:nahid4510@gmail.com">
                <Mail className="mr-1 h-4 w-4" /> Email Me
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5 text-zinc-500">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-lime-400" aria-label="LinkedIn">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href="tel:+8801617121519" className="flex items-center gap-2 text-sm transition-colors hover:text-lime-400">
              <Phone className="h-4 w-4" /> +880 1617121519
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex justify-center">
          <div className="float-soft relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-lime-500 bg-opacity-20 blur-2xl" />
            <div className="h-72 w-64 overflow-hidden rounded-[2.5rem] border border-zinc-800 sm:h-96 sm:w-80">
              <img src={PHOTO_SRC} alt="Nahid Hossain portrait" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-xl">
              <p className="font-display text-lg font-semibold text-lime-400">4.2s → 0.9s</p>
              <p className="text-xs text-zinc-400">LCP improved</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
