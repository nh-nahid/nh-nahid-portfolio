"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectButton() {
  return (
    <Button
      onClick={() =>
        document
          .getElementById("projects")
          ?.scrollIntoView({
            behavior: "smooth",
          })
      }
      className="group inline-flex h-10 items-center justify-center rounded-lg bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300"
    >
      View Projects
      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}