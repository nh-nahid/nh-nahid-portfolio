"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import TechIcon from "@/components/TechIcon";

interface ProjectTechStackProps {
  stack: string[];
  /** How many badges to show before collapsing into "+N" on small screens */
  mobileLimit?: number;
}

export default function ProjectTechStack({
  stack,
  mobileLimit = 5,
}: ProjectTechStackProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = stack.length > mobileLimit;
  const visibleOnMobile = expanded ? stack : stack.slice(0, mobileLimit);
  const hiddenCount = stack.length - mobileLimit;

  const badgeCls =
    "font-mono-custom flex items-center gap-1 rounded-full border-zinc-700 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-normal text-zinc-300 transition-colors hover:border-lime-400/40";

  return (
    <>
      {/* Mobile: capped list + toggle */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3 sm:hidden">
        {visibleOnMobile.map((tech) => (
          <Badge key={tech} variant="outline" className={badgeCls}>
            <TechIcon name={tech} className="h-2.5 w-2.5 flex-shrink-0" />
            <span>{tech}</span>
          </Badge>
        ))}

        {hasOverflow && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 rounded-full border border-dashed border-lime-400/40 bg-lime-400/5 px-2 py-0.5 text-[10px] font-medium text-lime-400 transition-colors hover:bg-lime-400/10"
          >
            {expanded ? (
              <>
                <Minus className="h-2.5 w-2.5" />
                less
              </>
            ) : (
              <>
                <Plus className="h-2.5 w-2.5" />
                {hiddenCount}
              </>
            )}
          </button>
        )}
      </div>

      {/* Tablet & up: full stack, no cap */}
      <div className="mt-auto hidden flex-wrap gap-1.5 pt-3 sm:flex">
        {stack.map((tech) => (
          <Badge key={tech} variant="outline" className={badgeCls}>
            <TechIcon name={tech} className="h-2.5 w-2.5 flex-shrink-0" />
            <span>{tech}</span>
          </Badge>
        ))}
      </div>
    </>
  );
}
