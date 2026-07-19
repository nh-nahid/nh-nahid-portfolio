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
      className="group rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300"
    >
      View Projects
      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}